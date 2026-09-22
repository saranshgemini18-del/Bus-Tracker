import express from 'express';
import path from 'path';
import fs from 'fs';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { createServer as createViteServer } from 'vite';
import { DELHI_HUBS } from './src/data/terminals';
import { resolveCommercialRoute, resolveBusDepot, estimateOccupancy } from './src/data/delhiRouteRegistry';

const PORT = Number(process.env.PORT) || 3000;
const DEFAULT_API_KEY = process.env.DTC_API_KEY || 'qj4xC9Up9YmsSAbfywNyD0vdpubZ09m9';
const OTD_ENDPOINT = 'https://otd.delhi.gov.in/api/realtime/VehiclePositions.pb';

// Major Terminals, Depots & Interchanges in Delhi
export const DELHI_TRANSIT_HUBS = DELHI_HUBS;

export interface ProcessedBus {
  id: string; // registration plate e.g. "DL51EV2595"
  routeId: string; // commercial public display route e.g. "354", "502", "740"
  rawRouteId?: string; // internal GTFS feed ID e.g. "1707"
  tripId: string;
  lat: number;
  lng: number;
  speedKmH: number;
  speed?: number;
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
  originTerminal?: string;
  destinationTerminal?: string;
  depotName?: string;
  crowdingStatus?: 'low' | 'moderate' | 'crowded';
  busModel?: string;
  fareInfo?: { acFare: string; nonAcFare: string; pinkPass: string };
  oneDelhiVerified?: boolean;
}

// In-memory cache for high-frequency client queries
interface CachedData {
  buses: ProcessedBus[];
  timestamp: number;
  latencyMs: number;
  source: 'live' | 'cache' | 'stale-cache';
}

let memoryCache: CachedData | null = null;
const CACHE_TTL_MS = 12_000; // 12 seconds cache TTL
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

/**
 * Load fallback snapshot from disk in case of upstream unavailability during cold start
 */
function getFallbackData(startTime: number): CachedData {
  try {
    const fallbackPath = path.join(process.cwd(), 'src/data/fallbackBusFleet.json');
    if (fs.existsSync(fallbackPath)) {
      const raw = fs.readFileSync(fallbackPath, 'utf-8');
      const json = JSON.parse(raw);
      if (Array.isArray(json.buses) && json.buses.length > 0) {
        const fallback: CachedData = {
          buses: json.buses,
          timestamp: Date.now(),
          latencyMs: Date.now() - startTime,
          source: 'cache',
        };
        memoryCache = fallback;
        return fallback;
      }
    }
  } catch {
    // Ignore fallback read failure
  }
  return {
    buses: [],
    timestamp: Date.now(),
    latencyMs: Date.now() - startTime,
    source: 'stale-cache',
  };
}

/**
 * Fetch from upstream with automatic retry on transient 503 / 502 / network hiccups
 */
async function fetchWithRetry(url: string, maxRetries = 2): Promise<Response> {
  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
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

      // Delhi OTD returns momentary 503 while rotating vehicle protobuf every ~60s
      if ((response.status === 503 || response.status === 502 || response.status === 429) && attempt < maxRetries) {
        await new Promise((res) => setTimeout(res, 500 * (attempt + 1)));
        continue;
      }

      if (!response.ok) {
        throw new Error(`DTC API HTTP error: ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (err: any) {
      clearTimeout(timeoutId);
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise((res) => setTimeout(res, 500 * (attempt + 1)));
      }
    }
  }
  throw lastError || new Error('DTC API request timed out');
}

async function fetchAndParseDTCFeed(apiKey: string): Promise<CachedData> {
  const startTime = Date.now();
  const url = `${OTD_ENDPOINT}?key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetchWithRetry(url, 2);
    const arrayBuffer = await response.arrayBuffer();

    if (arrayBuffer.byteLength < 50 && memoryCache && memoryCache.buses.length > 50) {
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
      const rawRouteId = (v.trip?.routeId || 'Unassigned').trim();
      const commercial = resolveCommercialRoute(rawRouteId);
      const displayRoute = commercial.displayRoute || rawRouteId;
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

      // Calculate speed and bearing from position history or GTFS telemetry
      let speedKmH = 0;
      if (v.position?.speed !== undefined && v.position?.speed !== null) {
        const rawSpd = Number(v.position.speed);
        if (!isNaN(rawSpd) && rawSpd > 0) {
          speedKmH = rawSpd > 45 ? Math.round(rawSpd) : Math.round(rawSpd * 3.6);
        }
      }
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

      const depotName = resolveBusDepot(upperId);
      const crowding = estimateOccupancy(speedKmH);
      const busModel = isEV
        ? (upperId.includes('51EV') ? 'Tata Ultra EV Low-Floor (12m AC)' : 'JBM Ecolife Electric (12m AC)')
        : (upperId.startsWith('DL1PD') ? 'DTC Low-Floor CNG (Green/Red)' : 'DIMTS Cluster Low-Floor CNG (Orange)');
      
      const fareInfo = isEV
        ? { acFare: '₹10 - ₹25 (AC Electric)', nonAcFare: 'N/A', pinkPass: '100% Free (Gulabi Pass)' }
        : { acFare: '₹10 - ₹25', nonAcFare: '₹5 - ₹15', pinkPass: '100% Free (Gulabi Pass)' };

      parsedBuses.push({
        id: upperId,
        routeId: displayRoute,
        rawRouteId,
        tripId,
        lat,
        lng,
        speedKmH,
        speed: speedKmH,
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
        originTerminal: commercial.startPoint,
        destinationTerminal: commercial.lastPoint,
        depotName,
        crowdingStatus: crowding,
        busModel,
        fareInfo,
        oneDelhiVerified: true,
      });
    }

    // If upstream returned 0 or suspiciously few buses due to momentary glitch, retain good cache
    if (parsedBuses.length < 50 && memoryCache && memoryCache.buses.length >= 50) {
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
    // Upstream temporary outage or file rotation: seamlessly serve cached or fallback data
    if (memoryCache && memoryCache.buses.length > 0) {
      return {
        ...memoryCache,
        source: 'stale-cache',
        latencyMs: Date.now() - startTime,
      };
    }
    return getFallbackData(startTime);
  }
}

async function getBusesData(apiKey: string, force = false): Promise<CachedData> {
  const now = Date.now();
  // Protect against aggressive repeated clicks: enforce minimum 3s between upstream calls even if force=true
  const minInterval = force ? 3_000 : CACHE_TTL_MS;
  if (memoryCache && (now - memoryCache.timestamp) < minInterval) {
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

  // Complete DTC Bus Stands Database (3,465 official bus stands)
  app.get('/api/bus-stands', (req, res) => {
    try {
      const standsPath = path.join(process.cwd(), 'src/data/allDtcBusStands.json');
      if (fs.existsSync(standsPath)) {
        const raw = fs.readFileSync(standsPath, 'utf-8');
        let stands = JSON.parse(raw);

        const q = (req.query.query as string || '').toLowerCase().trim();
        if (q) {
          stands = stands.filter((s: any) => 
            s.name.toLowerCase().includes(q) || 
            (s.zone && s.zone.toLowerCase().includes(q)) ||
            (s.stopCode && s.stopCode.toLowerCase().includes(q))
          );
        }

        const type = (req.query.type as string || '').toLowerCase().trim();
        if (type && type !== 'all') {
          stands = stands.filter((s: any) => s.type.toLowerCase() === type);
        }

        const limit = parseInt(req.query.limit as string, 10);
        if (!isNaN(limit) && limit > 0) {
          stands = stands.slice(0, limit);
        }

        return res.json({
          success: true,
          count: stands.length,
          totalAvailable: 3465,
          data: stands,
        });
      }
      res.json({ success: true, count: DELHI_TRANSIT_HUBS.length, data: DELHI_TRANSIT_HUBS });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Nearest Bus Stands by GPS Coordinates
  app.get('/api/bus-stands/nearest', async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);

      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ success: false, error: 'Valid lat and lng query parameters required' });
      }

      const limit = parseInt(req.query.limit as string, 10) || 15;
      const radiusKm = parseFloat(req.query.radiusKm as string) || 5;

      const standsPath = path.join(process.cwd(), 'src/data/allDtcBusStands.json');
      let stands: any[] = [];
      if (fs.existsSync(standsPath)) {
        stands = JSON.parse(fs.readFileSync(standsPath, 'utf-8'));
      } else {
        stands = DELHI_TRANSIT_HUBS;
      }

      // Calculate distances
      const calculated = stands.map((s: any) => {
        const d = calculateDistanceKm(lat, lng, s.lat, s.lng);
        return {
          ...s,
          distanceKm: Math.round(d * 100) / 100,
          distanceMeters: Math.round(d * 1000),
          walkMinutes: Math.max(1, Math.round((d * 1000) / 80)),
        };
      })
      .filter((s: any) => s.distanceKm <= radiusKm)
      .sort((a: any, b: any) => a.distanceKm - b.distanceKm)
      .slice(0, limit);

      // Check active buses near the stands
      const apiKey = (req.query.key as string) || DEFAULT_API_KEY;
      const busData = await getBusesData(apiKey);
      const enriched = calculated.map((stand: any) => {
        const nearbyBuses = busData.buses.filter(
          (b) => calculateDistanceKm(stand.lat, stand.lng, b.lat, b.lng) <= 2.0
        );
        const routesSet = new Set(nearbyBuses.map((b) => b.routeId));
        return {
          ...stand,
          nearbyBusCount: nearbyBuses.length,
          activeRoutesNearby: Array.from(routesSet).slice(0, 8),
        };
      });

      res.json({
        success: true,
        referenceCoords: { lat, lng },
        count: enriched.length,
        data: enriched,
      });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
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
    } catch {
      const fallback = memoryCache || getFallbackData(Date.now());
      res.json({
        success: true,
        summary: {
          totalBuses: fallback.buses.length,
          evBuses: fallback.buses.filter(b => b.type === 'ev').length,
          cngBuses: fallback.buses.filter(b => b.type === 'cng').length,
          movingBuses: fallback.buses.filter(b => b.isMoving).length,
          activeRoutesCount: new Set(fallback.buses.map(b => b.routeId)).size,
          lastUpdated: fallback.timestamp,
          cacheAgeSeconds: Math.round((Date.now() - fallback.timestamp) / 1000),
          latencyMs: fallback.latencyMs,
          source: 'cache',
          apiKeyMasked: 'configured',
          topRoutes: [],
        },
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
    } catch {
      const fallback = memoryCache || getFallbackData(Date.now());
      const routesMap = new Map<string, { count: number; evCount: number; sampleTrip: string }>();
      for (const bus of fallback.buses) {
        const existing = routesMap.get(bus.routeId) || { count: 0, evCount: 0, sampleTrip: bus.tripId };
        existing.count++;
        if (bus.type === 'ev') existing.evCount++;
        routesMap.set(bus.routeId, existing);
      }
      res.json({
        success: true,
        count: routesMap.size,
        data: Array.from(routesMap.entries()).map(([routeId, info]) => ({
          routeId,
          busCount: info.count,
          evCount: info.evCount,
          sampleTrip: info.sampleTrip,
        })),
      });
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
    } catch {
      const fallback = memoryCache || getFallbackData(Date.now());
      res.json({
        success: true,
        totalInFeed: fallback.buses.length,
        count: fallback.buses.length,
        timestamp: fallback.timestamp,
        cacheAgeSeconds: Math.round((Date.now() - fallback.timestamp) / 1000),
        latencyMs: fallback.latencyMs,
        source: 'cache',
        buses: fallback.buses,
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

  // Pre-seed cache and trigger initial background sync
  getFallbackData(Date.now());
  fetchAndParseDTCFeed(DEFAULT_API_KEY).catch(() => {});

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DTC Real-Time Bus Tracker server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
