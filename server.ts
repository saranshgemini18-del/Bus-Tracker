import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { createServer as createViteServer } from 'vite';
import { DELHI_HUBS } from './src/data/terminals.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DEFAULT_API_KEY = process.env.DTC_API_KEY || 'qj4xC9Up9YmsSAbfywNyD0vdpubZ09m9';
const OTD_ENDPOINT = 'https://otd.delhi.gov.in/api/realtime/VehiclePositions.pb';

// Major Terminals, Depots & Interchanges in Delhi
export const DELHI_TRANSIT_HUBS = DELHI_HUBS;

export interface ProcessedBus {
  id: string; // registration plate e.g. "DL51EV2595"
  routeId: string;
  tripId: string;
  lat: number;
  lng: number;
  speedKmH: number;
  bearing: number;
  timestamp: number;
  recordedAt: string;
  ageSeconds: number;
  type: 'ev' | 'cng';
  agency: 'DTC' | 'DIMTS';
  startTime?: string;
  startDate?: string;
  scheduleRelationship?: string;
  isMoving: boolean;
}

// In-memory cache for high-frequency client queries
interface CachedData {
  buses: ProcessedBus[];
  timestamp: number;
  latencyMs: number;
  source: 'live' | 'cache' | 'stale-cache';
}

let memoryCache: CachedData | null = null;
const CACHE_TTL_MS = 10_000; // 10 seconds matches Delhi OTD GPS interval
let fetchInProgress: Promise<CachedData> | null = null;

// Track historical positions for speed, bearing and breadcrumbs (up to 6 points per vehicle)
const positionHistory = new Map<string, { lat: number; lng: number; time: number }[]>();

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
  const x =
    Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
    Math.sin(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.cos(dLon);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return Math.round((brng + 360) % 360);
}

async function fetchAndParseDTCFeed(apiKey: string): Promise<CachedData> {
  const startTime = Date.now();
  const url = `${OTD_ENDPOINT}?key=${encodeURIComponent(apiKey)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DTC-Live-Tracker/1.0',
        'Accept': 'application/octet-stream',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`DTC API HTTP error: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength < 50 && memoryCache && memoryCache.buses.length > 50) {
      console.warn(`Upstream OTD feed returned only ${arrayBuffer.byteLength} bytes. Retaining previous cache.`);
      return {
        ...memoryCache,
        source: 'stale-cache',
        latencyMs: Date.now() - startTime,
      };
    }

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(arrayBuffer));
    const now = Date.now();
    const parsedBuses: ProcessedBus[] = [];

    for (const entity of feed.entity) {
      const v = entity.vehicle;
      if (!v || !v.position) continue;

      const lat = v.position.latitude;
      const lng = v.position.longitude;

      // Filter out invalid 0,0 coordinates or non-Delhi NCR region
      if (!lat || !lng || lat < 28.0 || lat > 29.2 || lng < 76.5 || lng > 77.7) {
        continue;
      }

      const id = (v.vehicle?.id || entity.id || '').trim();
      if (!id) continue;

      const upperId = id.toUpperCase();
      const isEV = upperId.includes('EV');
      const routeId = v.trip?.routeId || 'Unassigned';
      const tripId = v.trip?.tripId || '';

      // Extract timestamp
      let tsEpoch = now;
      if (v.timestamp) {
        const low = typeof v.timestamp === 'object' && 'low' in v.timestamp ? (v.timestamp as { low: number }).low : Number(v.timestamp);
        if (low > 0) {
          tsEpoch = low * 1000;
        }
      }

      const ageSeconds = Math.max(0, Math.round((now - tsEpoch) / 1000));

      // Calculate speed and bearing from position history
      let speedKmH = 0;
      let bearing = v.position.bearing || 0;

      const prevHistory = positionHistory.get(upperId) || [];
      if (prevHistory.length > 0) {
        const lastPoint = prevHistory[prevHistory.length - 1];
        const distKm = calculateDistanceKm(lastPoint.lat, lastPoint.lng, lat, lng);
        const timeDiffHours = (now - lastPoint.time) / (1000 * 3600);

        if (timeDiffHours > 0.0005 && distKm > 0.01) {
          // Bus moved at least 10 meters
          const computedSpeed = distKm / timeDiffHours;
          if (computedSpeed > 0.5 && computedSpeed < 90) {
            speedKmH = Math.round(computedSpeed);
            bearing = calculateBearing(lastPoint.lat, lastPoint.lng, lat, lng);
          }
        }
      }

      // Update history (keep last 6 points)
      const newHistory = [...prevHistory.slice(-5), { lat, lng, time: now }];
      positionHistory.set(upperId, newHistory);

      parsedBuses.push({
        id: upperId,
        routeId,
        tripId,
        lat,
        lng,
        speedKmH,
        bearing,
        timestamp: tsEpoch,
        recordedAt: new Date(tsEpoch).toISOString(),
        ageSeconds,
        type: isEV ? 'ev' : 'cng',
        agency: upperId.startsWith('DL1PD') || upperId.startsWith('DL51EV') ? 'DTC' : 'DIMTS',
        startTime: v.trip?.startTime || undefined,
        startDate: v.trip?.startDate || undefined,
        scheduleRelationship: v.trip?.scheduleRelationship !== undefined ? String(v.trip.scheduleRelationship) : undefined,
        isMoving: speedKmH > 2,
      });
    }

    // If upstream returned 0 or suspiciously few buses due to momentary glitch, retain good cache
    if (parsedBuses.length < 50 && memoryCache && memoryCache.buses.length >= 50) {
      console.warn(`Upstream OTD parsed only ${parsedBuses.length} buses. Retaining good cache.`);
      return {
        ...memoryCache,
        source: 'stale-cache',
        latencyMs: Date.now() - startTime,
      };
    }

    const latencyMs = Date.now() - startTime;
    const result: CachedData = {
      buses: parsedBuses,
      timestamp: now,
      latencyMs,
      source: 'live',
    };

    memoryCache = result;
    return result;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (memoryCache && memoryCache.buses.length > 0) {
      console.warn(`Error fetching OTD feed: ${err.message}. Serving cached data.`);
      return {
        ...memoryCache,
        source: 'stale-cache',
        latencyMs: Date.now() - startTime,
      };
    }
    throw err;
  }
}

async function getBusesData(apiKey: string, force = false): Promise<CachedData> {
  const now = Date.now();
  if (!force && memoryCache && (now - memoryCache.timestamp) < CACHE_TTL_MS) {
    return {
      ...memoryCache,
      source: 'cache',
    };
  }

  if (fetchInProgress) {
    return fetchInProgress;
  }

  fetchInProgress = fetchAndParseDTCFeed(apiKey)
    .finally(() => {
      fetchInProgress = null;
    });

  return fetchInProgress;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'DTC Real-Time Bus Tracker',
      time: new Date().toISOString(),
      cachedBuses: memoryCache?.buses.length || 0,
    });
  });

  // Transit Hubs & Depots
  app.get('/api/terminals', (req, res) => {
    res.json({
      success: true,
      data: DELHI_TRANSIT_HUBS,
    });
  });

  // Summary Metrics Endpoint (lightweight)
  app.get('/api/buses/summary', async (req, res) => {
    try {
      const apiKey = (req.query.key as string) || DEFAULT_API_KEY;
      const data = await getBusesData(apiKey, req.query.force === 'true');

      let evCount = 0;
      let cngCount = 0;
      let movingCount = 0;
      const routesMap = new Map<string, number>();

      for (const bus of data.buses) {
        if (bus.type === 'ev') evCount++;
        else cngCount++;
        if (bus.isMoving) movingCount++;
        routesMap.set(bus.routeId, (routesMap.get(bus.routeId) || 0) + 1);
      }

      const topRoutes = Array.from(routesMap.entries())
        .map(([routeId, count]) => ({ routeId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      const maskedKey = apiKey.length > 8 ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}` : '******';

      res.json({
        success: true,
        summary: {
          totalBuses: data.buses.length,
          evBuses: evCount,
          cngBuses: cngCount,
          movingBuses: movingCount,
          activeRoutesCount: routesMap.size,
          lastUpdated: data.timestamp,
          cacheAgeSeconds: Math.round((Date.now() - data.timestamp) / 1000),
          latencyMs: data.latencyMs,
          source: data.source,
          apiKeyMasked: maskedKey,
          topRoutes,
        },
      });
    } catch (error: any) {
      console.error('Error fetching summary:', error);
      if (memoryCache) {
        return res.json({
          success: true,
          summary: {
            totalBuses: memoryCache.buses.length,
            evBuses: memoryCache.buses.filter(b => b.type === 'ev').length,
            cngBuses: memoryCache.buses.filter(b => b.type === 'cng').length,
            movingBuses: memoryCache.buses.filter(b => b.isMoving).length,
            activeRoutesCount: new Set(memoryCache.buses.map(b => b.routeId)).size,
            lastUpdated: memoryCache.timestamp,
            cacheAgeSeconds: Math.round((Date.now() - memoryCache.timestamp) / 1000),
            latencyMs: memoryCache.latencyMs,
            source: 'stale-cache',
            apiKeyMasked: 'configured',
            topRoutes: [],
            warning: error.message,
          },
        });
      }
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch DTC bus data',
      });
    }
  });

  // Distinct Active Routes
  app.get('/api/routes', async (req, res) => {
    try {
      const apiKey = (req.query.key as string) || DEFAULT_API_KEY;
      const data = await getBusesData(apiKey);
      const routesMap = new Map<string, { count: number; evCount: number; sampleTrip: string }>();

      for (const bus of data.buses) {
        const existing = routesMap.get(bus.routeId) || { count: 0, evCount: 0, sampleTrip: bus.tripId };
        existing.count++;
        if (bus.type === 'ev') existing.evCount++;
        routesMap.set(bus.routeId, existing);
      }

      const routes = Array.from(routesMap.entries())
        .map(([routeId, info]) => ({
          routeId,
          busCount: info.count,
          evCount: info.evCount,
          sampleTrip: info.sampleTrip,
        }))
        .sort((a, b) => b.busCount - a.busCount);

      res.json({
        success: true,
        count: routes.length,
        data: routes,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Single Bus Details with Breadcrumb Trail
  app.get('/api/buses/:id', async (req, res) => {
    try {
      const apiKey = (req.query.key as string) || DEFAULT_API_KEY;
      const data = await getBusesData(apiKey);
      const targetId = req.params.id.toUpperCase();
      const bus = data.buses.find(b => b.id.toUpperCase() === targetId);

      if (!bus) {
        return res.status(404).json({
          success: false,
          error: `Bus with registration ${req.params.id} not found in current active telemetry feed`,
        });
      }

      const trail = positionHistory.get(targetId) || [{ lat: bus.lat, lng: bus.lng, time: bus.timestamp }];

      res.json({
        success: true,
        bus,
        trail,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Real-time Buses List with Filters
  app.get('/api/buses', async (req, res) => {
    try {
      const apiKey = (req.query.key as string) || DEFAULT_API_KEY;
      const force = req.query.force === 'true';
      const data = await getBusesData(apiKey, force);

      let results = data.buses;

      // Filter by route
      const routeFilter = req.query.route as string;
      if (routeFilter && routeFilter.trim()) {
        const rLower = routeFilter.trim().toLowerCase();
        results = results.filter(b => b.routeId.toLowerCase() === rLower);
      }

      // Filter by type: 'ev' | 'cng'
      const typeFilter = req.query.type as string;
      if (typeFilter && (typeFilter === 'ev' || typeFilter === 'cng')) {
        results = results.filter(b => b.type === typeFilter);
      }

      // Filter by query (matches plate number or route)
      const searchQuery = req.query.query as string;
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.trim().toUpperCase();
        results = results.filter(b => b.id.includes(q) || b.routeId.toUpperCase().includes(q));
      }

      // Optional limit
      const limit = parseInt(req.query.limit as string, 10);
      if (!isNaN(limit) && limit > 0) {
        results = results.slice(0, limit);
      }

      res.json({
        success: true,
        totalInFeed: data.buses.length,
        count: results.length,
        timestamp: data.timestamp,
        cacheAgeSeconds: Math.round((Date.now() - data.timestamp) / 1000),
        latencyMs: data.latencyMs,
        source: data.source,
        buses: results,
      });
    } catch (error: any) {
      console.error('Error fetching buses:', error);
      if (memoryCache) {
        return res.json({
          success: true,
          totalInFeed: memoryCache.buses.length,
          count: memoryCache.buses.length,
          timestamp: memoryCache.timestamp,
          cacheAgeSeconds: Math.round((Date.now() - memoryCache.timestamp) / 1000),
          latencyMs: memoryCache.latencyMs,
          source: 'stale-cache',
          warning: error.message,
          buses: memoryCache.buses,
        });
      }
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch DTC bus data',
      });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DTC Real-Time Bus Tracker server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
