import { DTCBus, TransitHub } from '../types';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DELHI_ROUTE_REGISTRY } from '../data/delhiRouteRegistry';
import { DELHI_HUBS, ALL_DTC_BUS_STANDS } from '../data/terminals';
import { calculateDistanceKm, formatDistance } from './geo';

export interface RouteStopStep {
  name: string;
  isPassed: boolean;
  isCurrentNext: boolean;
  isStart: boolean;
  isLast: boolean;
  distanceFromBusKm?: number;
  formattedDistance?: string;
  etaMins?: number;
  etaClockTime?: string; // e.g. "10:48 AM"
  speedKmH?: number; // live telemetry speed used
  servingBusId?: string; // vehicle plate e.g. "DL51EV2595"
  servingBusType?: 'ev' | 'cng';
  telemetryStatus?: 'approaching' | 'live_gps' | 'departed' | 'estimated';
  trafficCondition?: 'smooth' | 'moderate' | 'congested';
  dwellSeconds?: number;
  lat?: number;
  lng?: number;
  stopType?: 'terminal' | 'metro' | 'isbt' | 'stop';
}

export interface TelemetrySummary {
  activeBusesOnRoute: number;
  averageSpeedKmH: number;
  primaryVehicleId?: string;
  primaryVehicleType?: 'ev' | 'cng';
  primarySpeedKmH?: number;
  isMoving?: boolean;
  lastTelemetrySecondsAgo?: number;
  congestionLevel: 'smooth' | 'moderate' | 'congested';
  totalRouteDistanceKm: number;
  estimatedFullTripMinutes: number;
}

export interface BusProgression {
  routeId: string;
  startPoint: string;
  nextPoint: string;
  nextPointDistanceKm: number;
  nextPointFormattedDistance: string;
  nextPointEtaMins: number;
  nextPointClockTime?: string;
  lastPoint: string;
  currentDirection: string;
  orderedStops: RouteStopStep[];
  progressPercent: number; // 0 to 100
  routeDescription?: string;
  isReversed?: boolean;
  telemetrySummary?: TelemetrySummary;
}

// Pre-computed map of stands & hubs by lowercase name for O(1) coordinate lookups
const hubCoordsMap = new Map<string, { lat: number; lng: number }>();
ALL_DTC_BUS_STANDS.forEach((s) => {
  hubCoordsMap.set(s.name.toLowerCase().trim(), { lat: s.lat, lng: s.lng });
});
DELHI_HUBS.forEach((h) => {
  hubCoordsMap.set(h.name.toLowerCase().trim(), { lat: h.lat, lng: h.lng });
});

const stopCoordsCache = new Map<string, { lat: number; lng: number } | null>();

export function getStopCoords(stopName: string): { lat: number; lng: number } | null {
  if (!stopName) return null;
  const sLower = stopName.toLowerCase().trim();
  if (stopCoordsCache.has(sLower)) {
    return stopCoordsCache.get(sLower) || null;
  }

  // Exact match
  if (hubCoordsMap.has(sLower)) {
    const coords = hubCoordsMap.get(sLower)!;
    stopCoordsCache.set(sLower, coords);
    return coords;
  }

  // Normalized match (strip terminal/stand/metro suffix)
  const stripped = sLower.replace(/\b(terminal|\(t\)|isbt|metro|depot|bus stand)\b/gi, '').trim();
  if (stripped.length > 3) {
    for (const [key, coords] of hubCoordsMap.entries()) {
      if (key.includes(stripped) || stripped.includes(key)) {
        stopCoordsCache.set(sLower, coords);
        return coords;
      }
    }
  }

  stopCoordsCache.set(sLower, null);
  return null;
}

/**
 * Formats arrival minutes into human clock time (e.g. 10:48 AM)
 */
export function formatEtaClockTime(minutesFromNow: number): string {
  const safeMins = Math.max(0, Math.round(minutesFromNow));
  const date = new Date(Date.now() + safeMins * 60 * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Detects the stop classification (Terminal, Metro, ISBT, Regular Stop)
 */
function classifyStop(name: string): 'terminal' | 'metro' | 'isbt' | 'stop' {
  const lower = name.toLowerCase();
  if (lower.includes('isbt')) return 'isbt';
  if (lower.includes('terminal') || lower.includes('(t)')) return 'terminal';
  if (lower.includes('metro') || lower.includes('station')) return 'metro';
  return 'stop';
}

/**
 * Core Telemetry ETA Engine
 * Calculates arrival time and distance for every stop along a corridor
 * based on live bus telemetry (GPS, instantaneous speed, dwell time, traffic congestion).
 */
export function calculateTelemetryEtasForStopSequence(
  stopNames: string[],
  activeBusesOnRoute: DTCBus[],
  primaryBus?: DTCBus,
  isReversed: boolean = false
): {
  orderedStops: RouteStopStep[];
  nextStopName: string;
  nextStopDistanceKm: number;
  nextStopEtaMins: number;
  nextStopClockTime: string;
  progressPercent: number;
  telemetrySummary: TelemetrySummary;
} {
  const sequence = isReversed ? [...stopNames].reverse() : [...stopNames];
  const stopCount = sequence.length;

  // Resolve coordinates for each stop
  const stopsData = sequence.map((name, idx) => {
    const coords = getStopCoords(name);
    return {
      name,
      coords,
      isStart: idx === 0,
      isLast: idx === stopCount - 1,
      stopType: classifyStop(name),
    };
  });

  // Calculate segment distances between consecutive stops
  const segmentDistances: number[] = [];
  let totalRouteDistKm = 0;
  for (let i = 0; i < stopCount - 1; i++) {
    const c1 = stopsData[i].coords;
    const c2 = stopsData[i + 1].coords;
    let seg = 1.4; // fallback segment distance
    if (c1 && c2) {
      seg = Math.max(0.4, calculateDistanceKm(c1.lat, c1.lng, c2.lat, c2.lng));
    }
    segmentDistances.push(seg);
    totalRouteDistKm += seg;
  }

  // Determine primary active bus and corridor speeds
  const refBus = primaryBus || activeBusesOnRoute.find((b) => b.isMoving) || activeBusesOnRoute[0];
  const activeBusesCount = activeBusesOnRoute.length;

  const validSpeeds = activeBusesOnRoute
    .map((b) => (typeof b.speedKmH === 'number' && !isNaN(b.speedKmH) ? b.speedKmH : (b.speed || 0)))
    .filter((s) => s > 0);
  const avgCorridorSpeed =
    validSpeeds.length > 0
      ? Math.round(validSpeeds.reduce((a, b) => a + b, 0) / validSpeeds.length)
      : 22;

  const primaryRawSpeed =
    refBus && typeof refBus.speedKmH === 'number' && !isNaN(refBus.speedKmH)
      ? refBus.speedKmH
      : refBus?.speed || 0;
  const isPrimaryMoving = refBus ? refBus.isMoving && primaryRawSpeed > 2 : true;

  // Delhi urban transit effective speed:
  // If moving, blend live telemetry speed (70%) with corridor average (30%)
  // Capped between 12 km/h (heavy congestion) and 45 km/h (free flow flyover)
  const effectiveSpeedKmH = isPrimaryMoving
    ? Math.min(48, Math.max(12, primaryRawSpeed * 0.7 + avgCorridorSpeed * 0.3))
    : 18;

  // Congestion level
  let congestionLevel: 'smooth' | 'moderate' | 'congested' = 'moderate';
  if (effectiveSpeedKmH >= 26) congestionLevel = 'smooth';
  else if (effectiveSpeedKmH < 16) congestionLevel = 'congested';

  // Stop dwell time (seconds and minutes):
  // Crowded buses take longer to board/alight; EV buses have quicker acceleration
  const isCrowded = refBus?.crowdingStatus === 'crowded';
  const isLowOccupancy = refBus?.crowdingStatus === 'low';
  const dwellMinsPerStop = isCrowded ? 0.9 : isLowOccupancy ? 0.5 : 0.65; // ~30-54 seconds per stop

  // Find position of primary bus along the stop sequence
  let nextIndex = 1;
  let distToNextKm = 1.2;

  if (refBus && stopsData.length > 1) {
    let closestIdx = 0;
    let closestDist = Infinity;

    stopsData.forEach((s, idx) => {
      if (s.coords) {
        const d = calculateDistanceKm(refBus.lat, refBus.lng, s.coords.lat, s.coords.lng);
        if (d < closestDist) {
          closestDist = d;
          closestIdx = idx;
        }
      }
    });

    // Check if bus is approaching closest stop or has already passed it
    if (closestDist < 0.25) {
      // Practically at this stop
      nextIndex = Math.min(stopCount - 1, closestIdx);
      distToNextKm = Math.max(0.1, closestDist);
    } else if (closestIdx < stopCount - 1) {
      // Check distance to the following stop
      const nextCoords = stopsData[closestIdx + 1].coords;
      if (nextCoords) {
        const distToFollowing = calculateDistanceKm(refBus.lat, refBus.lng, nextCoords.lat, nextCoords.lng);
        const segmentLen = segmentDistances[closestIdx] || 1.5;
        if (distToFollowing < segmentLen || closestDist > segmentLen * 0.6) {
          nextIndex = closestIdx + 1;
          distToNextKm = distToFollowing;
        } else {
          nextIndex = closestIdx;
          distToNextKm = closestDist;
        }
      } else {
        nextIndex = Math.min(stopCount - 1, closestIdx + 1);
        distToNextKm = Math.max(0.5, closestDist);
      }
    } else {
      nextIndex = stopCount - 1;
      distToNextKm = Math.max(0.3, closestDist);
    }

    if (nextIndex <= 0) nextIndex = 1;
  }

  // Initial leg ETA to the immediate next stop
  const initialSignalDelayMins = !isPrimaryMoving ? 1.2 : 0;
  const nextEtaMins = Math.max(
    1,
    Math.round((distToNextKm / effectiveSpeedKmH) * 60 + initialSignalDelayMins)
  );

  // Compute ETA, distance, and telemetry status for EVERY stop in the sequence
  const orderedStops: RouteStopStep[] = stopsData.map((stop, idx) => {
    // 1. Passed stops
    if (idx < nextIndex) {
      return {
        name: stop.name,
        isStart: stop.isStart,
        isLast: stop.isLast,
        isPassed: true,
        isCurrentNext: false,
        lat: stop.coords?.lat,
        lng: stop.coords?.lng,
        stopType: stop.stopType,
        telemetryStatus: 'departed',
      };
    }

    // 2. Immediate next upcoming stop
    if (idx === nextIndex) {
      return {
        name: stop.name,
        isStart: stop.isStart,
        isLast: stop.isLast,
        isPassed: false,
        isCurrentNext: true,
        distanceFromBusKm: distToNextKm,
        formattedDistance: formatDistance(distToNextKm),
        etaMins: nextEtaMins,
        etaClockTime: formatEtaClockTime(nextEtaMins),
        speedKmH: Math.round(primaryRawSpeed),
        servingBusId: refBus?.id,
        servingBusType: refBus?.type,
        telemetryStatus: distToNextKm < 0.35 ? 'approaching' : 'live_gps',
        trafficCondition: congestionLevel,
        dwellSeconds: Math.round(dwellMinsPerStop * 60),
        lat: stop.coords?.lat,
        lng: stop.coords?.lng,
        stopType: stop.stopType,
      };
    }

    // 3. Subsequent upcoming stops along the corridor
    // Sum segment distances from nextIndex to this stop
    let cumulativeDist = distToNextKm;
    for (let s = nextIndex; s < idx; s++) {
      cumulativeDist += segmentDistances[s] || 1.3;
    }

    const stopsBetween = idx - nextIndex;
    const dwellTotalMins = stopsBetween * dwellMinsPerStop;
    const travelTimeMins = (cumulativeDist / effectiveSpeedKmH) * 60 + dwellTotalMins;

    // Minimum sensible progression buffer (each subsequent stop is at least +2 mins)
    const etaMins = Math.max(nextEtaMins + stopsBetween * 2, Math.round(travelTimeMins));

    // Multi-bus fleet dispatch:
    // If there is another active bus ahead of primary bus that will reach this stop earlier,
    // we check if a secondary bus serves this stop sooner!
    let servingBus = refBus;
    let stopEta = etaMins;
    let stopDist = cumulativeDist;

    if (!primaryBus && activeBusesOnRoute.length > 1) {
      // Find any bus that is closer to stop idx in the forward direction
      for (const otherBus of activeBusesOnRoute) {
        if (otherBus.id === refBus?.id) continue;
        if (stop.coords) {
          const dToStop = calculateDistanceKm(otherBus.lat, otherBus.lng, stop.coords.lat, stop.coords.lng);
          const oSpeed = Math.max(15, otherBus.speedKmH || 20);
          const oEta = Math.max(1, Math.round((dToStop / oSpeed) * 60));
          if (oEta < stopEta && dToStop < stopDist) {
            servingBus = otherBus;
            stopEta = oEta;
            stopDist = dToStop;
          }
        }
      }
    }

    return {
      name: stop.name,
      isStart: stop.isStart,
      isLast: stop.isLast,
      isPassed: false,
      isCurrentNext: false,
      distanceFromBusKm: stopDist,
      formattedDistance: formatDistance(stopDist),
      etaMins: stopEta,
      etaClockTime: formatEtaClockTime(stopEta),
      speedKmH: Math.round(servingBus?.speedKmH || effectiveSpeedKmH),
      servingBusId: servingBus?.id,
      servingBusType: servingBus?.type,
      telemetryStatus: refBus ? 'live_gps' : 'estimated',
      trafficCondition: congestionLevel,
      dwellSeconds: Math.round(dwellMinsPerStop * 60),
      lat: stop.coords?.lat,
      lng: stop.coords?.lng,
      stopType: stop.stopType,
    };
  });

  const nextStop = orderedStops[nextIndex] || orderedStops[0];
  const progressPercent = Math.min(
    95,
    Math.max(5, Math.round((nextIndex / (stopCount - 1 || 1)) * 100))
  );

  const fullTripMinutes = Math.round((totalRouteDistKm / effectiveSpeedKmH) * 60 + stopCount * dwellMinsPerStop);

  const telemetrySummary: TelemetrySummary = {
    activeBusesOnRoute: activeBusesCount,
    averageSpeedKmH: avgCorridorSpeed,
    primaryVehicleId: refBus?.id,
    primaryVehicleType: refBus?.type,
    primarySpeedKmH: Math.round(primaryRawSpeed),
    isMoving: isPrimaryMoving,
    lastTelemetrySecondsAgo: refBus?.ageSeconds || 5,
    congestionLevel,
    totalRouteDistanceKm: Math.round(totalRouteDistKm * 10) / 10,
    estimatedFullTripMinutes: fullTripMinutes,
  };

  return {
    orderedStops,
    nextStopName: nextStop.name,
    nextStopDistanceKm: distToNextKm,
    nextStopEtaMins: nextEtaMins,
    nextStopClockTime: formatEtaClockTime(nextEtaMins),
    progressPercent,
    telemetrySummary,
  };
}

/**
 * Resolves full route timeline, stops, and live telemetry ETAs for any selected route
 */
export function resolveRouteProgression(
  routeId: string,
  buses: DTCBus[] = [],
  isReversed: boolean = false
): BusProgression {
  const clean = (routeId || '').trim();
  const routeBuses = buses.filter((b) => b.routeId.toLowerCase() === clean.toLowerCase());

  // 1. Check verified DTC known routes
  const known = DTC_KNOWN_ROUTES[clean];
  if (known) {
    const rawSequence = [known.startPoint, ...known.viaStops, known.lastPoint];
    const {
      orderedStops,
      nextStopName,
      nextStopDistanceKm,
      nextStopEtaMins,
      nextStopClockTime,
      progressPercent,
      telemetrySummary,
    } = calculateTelemetryEtasForStopSequence(rawSequence, routeBuses, undefined, isReversed);

    const origin = isReversed ? known.lastPoint : known.startPoint;
    const terminus = isReversed ? known.startPoint : known.lastPoint;

    return {
      routeId: clean,
      startPoint: origin,
      nextPoint: nextStopName,
      nextPointDistanceKm: nextStopDistanceKm,
      nextPointFormattedDistance: formatDistance(nextStopDistanceKm),
      nextPointEtaMins: nextStopEtaMins,
      nextPointClockTime: nextStopClockTime,
      lastPoint: terminus,
      currentDirection: `Towards ${terminus}`,
      orderedStops,
      progressPercent,
      routeDescription: known.description,
      isReversed,
      telemetrySummary,
    };
  }

  // 2. Check master Delhi Route Registry (thousands of mapped routes)
  const registryEntry = Object.values(DELHI_ROUTE_REGISTRY).find(
    (r) => r.displayRoute.toLowerCase() === clean.toLowerCase()
  );

  if (registryEntry) {
    const origin = isReversed ? registryEntry.lastPoint : registryEntry.startPoint;
    const terminus = isReversed ? registryEntry.startPoint : registryEntry.lastPoint;

    // Build intermediate sequence between origin and terminus using nearby DTC bus stands
    const oCoords = getStopCoords(origin);
    const tCoords = getStopCoords(terminus);
    const viaStops: string[] = [];

    if (oCoords && tCoords) {
      // Find 3-5 stands that lie geographically between origin and terminus
      const minLat = Math.min(oCoords.lat, tCoords.lat);
      const maxLat = Math.max(oCoords.lat, tCoords.lat);
      const minLng = Math.min(oCoords.lng, tCoords.lng);
      const maxLng = Math.max(oCoords.lng, tCoords.lng);

      const candidates = ALL_DTC_BUS_STANDS.filter(
        (s) =>
          s.lat >= minLat - 0.02 &&
          s.lat <= maxLat + 0.02 &&
          s.lng >= minLng - 0.02 &&
          s.lng <= maxLng + 0.02 &&
          s.name !== origin &&
          s.name !== terminus
      );

      // Sort by proximity along vector
      candidates.sort((a, b) => {
        const dA = calculateDistanceKm(oCoords.lat, oCoords.lng, a.lat, a.lng);
        const dB = calculateDistanceKm(oCoords.lat, oCoords.lng, b.lat, b.lng);
        return dA - dB;
      });

      // Sample evenly
      const step = Math.max(1, Math.floor(candidates.length / 5));
      for (let i = 0; i < candidates.length && viaStops.length < 5; i += step) {
        viaStops.push(candidates[i].name);
      }
    }

    const rawSequence = [origin, ...viaStops, terminus];
    const {
      orderedStops,
      nextStopName,
      nextStopDistanceKm,
      nextStopEtaMins,
      nextStopClockTime,
      progressPercent,
      telemetrySummary,
    } = calculateTelemetryEtasForStopSequence(rawSequence, routeBuses, undefined, false);

    return {
      routeId: clean,
      startPoint: origin,
      nextPoint: nextStopName,
      nextPointDistanceKm: nextStopDistanceKm,
      nextPointFormattedDistance: formatDistance(nextStopDistanceKm),
      nextPointEtaMins: nextStopEtaMins,
      nextPointClockTime: nextStopClockTime,
      lastPoint: terminus,
      currentDirection: `Towards ${terminus}`,
      orderedStops,
      progressPercent,
      routeDescription: registryEntry.description || `Delhi Bus Route ${clean} (${registryEntry.operator || 'DTC'})`,
      isReversed,
      telemetrySummary,
    };
  }

  // 3. Dynamic Auto-Resolver fallback for arbitrary routes
  const origin = isReversed ? 'Nehru Place Bus Terminal' : 'Kashmere Gate ISBT';
  const terminus = isReversed ? 'Kashmere Gate ISBT' : 'Nehru Place Bus Terminal';
  const intermediate = ['Delhi Gate', 'ITO / Vikas Minar', 'Sarai Kale Khan ISBT', 'Ashram Chowk'];

  const rawSequence = [origin, ...intermediate, terminus];
  const {
    orderedStops,
    nextStopName,
    nextStopDistanceKm,
    nextStopEtaMins,
    nextStopClockTime,
    progressPercent,
    telemetrySummary,
  } = calculateTelemetryEtasForStopSequence(rawSequence, routeBuses, undefined, false);

  return {
    routeId: clean || 'Transit',
    startPoint: origin,
    nextPoint: nextStopName,
    nextPointDistanceKm: nextStopDistanceKm,
    nextPointFormattedDistance: formatDistance(nextStopDistanceKm),
    nextPointEtaMins: nextStopEtaMins,
    nextPointClockTime: nextStopClockTime,
    lastPoint: terminus,
    currentDirection: `Towards ${terminus}`,
    orderedStops,
    progressPercent,
    routeDescription: `Delhi City Bus Corridor ${clean}`,
    isReversed,
    telemetrySummary,
  };
}

/**
 * Resolves the Starting Point, Next Point, Last Point, and Stop-by-Stop Live ETAs for any clicked DTC bus
 */
export function resolveBusProgression(
  bus: DTCBus,
  allBuses: DTCBus[] = [],
  forceReversed?: boolean
): BusProgression {
  const cleanRouteId = (bus.routeId || '').trim();
  const routeBuses = allBuses.filter((b) => b.routeId.toLowerCase() === cleanRouteId.toLowerCase());
  const known = DTC_KNOWN_ROUTES[cleanRouteId];

  if (known) {
    const forwardSequence = [known.startPoint, ...known.viaStops, known.lastPoint];
    const startCoords = getStopCoords(known.startPoint);
    const lastCoords = getStopCoords(known.lastPoint);

    let isForward = true;
    if (forceReversed !== undefined) {
      isForward = !forceReversed;
    } else if (startCoords && lastCoords) {
      const distToStart = calculateDistanceKm(bus.lat, bus.lng, startCoords.lat, startCoords.lng);
      const distToLast = calculateDistanceKm(bus.lat, bus.lng, lastCoords.lat, lastCoords.lng);

      if (bus.bearing > 0) {
        const dLatLast = lastCoords.lat - bus.lat;
        const dLngLast = lastCoords.lng - bus.lng;
        const angleToLast = (Math.atan2(dLngLast, dLatLast) * 180) / Math.PI;
        const normAngleToLast = (angleToLast + 360) % 360;

        const dLatStart = startCoords.lat - bus.lat;
        const dLngStart = startCoords.lng - bus.lng;
        const angleToStart = (Math.atan2(dLngStart, dLatStart) * 180) / Math.PI;
        const normAngleToStart = (angleToStart + 360) % 360;

        const diffStart = Math.abs(bus.bearing - normAngleToStart);
        const diffLast = Math.abs(bus.bearing - normAngleToLast);
        isForward = diffLast <= diffStart;
      } else {
        isForward = distToStart <= distToLast;
      }
    }

    const activeSequence = isForward ? forwardSequence : [...forwardSequence].reverse();
    const origin = activeSequence[0];
    const destination = activeSequence[activeSequence.length - 1];

    const {
      orderedStops,
      nextStopName,
      nextStopDistanceKm,
      nextStopEtaMins,
      nextStopClockTime,
      progressPercent,
      telemetrySummary,
    } = calculateTelemetryEtasForStopSequence(activeSequence, routeBuses, bus, false);

    return {
      routeId: cleanRouteId,
      startPoint: origin,
      nextPoint: nextStopName,
      nextPointDistanceKm: nextStopDistanceKm,
      nextPointFormattedDistance: formatDistance(nextStopDistanceKm),
      nextPointEtaMins: nextStopEtaMins,
      nextPointClockTime: nextStopClockTime,
      lastPoint: destination,
      currentDirection: `Towards ${destination}`,
      orderedStops,
      progressPercent,
      routeDescription: known.description,
      isReversed: !isForward,
      telemetrySummary,
    };
  }

  // Fallback: Dynamic Auto-Resolver for any other route
  let originName = bus.originTerminal || '';
  let destName = bus.destinationTerminal || '';

  if (!originName || !destName) {
    const hubsWithRoute = DELHI_HUBS.filter(
      (h) => h.majorRoutes?.includes(cleanRouteId) || (bus.rawRouteId && h.majorRoutes?.includes(bus.rawRouteId))
    );

    if (hubsWithRoute.length >= 2) {
      originName = hubsWithRoute[0].name;
      destName = hubsWithRoute[1].name;
    } else if (hubsWithRoute.length === 1) {
      originName = hubsWithRoute[0].name;
      destName = originName.includes('ISBT') ? 'Shivaji Stadium Terminal' : 'Kashmere Gate ISBT';
    } else {
      if (bus.lng < 77.10) {
        originName = 'Uttam Nagar Terminal';
        destName = 'Shivaji Stadium Terminal';
      } else if (bus.lng > 77.26) {
        originName = 'Anand Vihar ISBT';
        destName = 'Shivaji Stadium Terminal';
      } else if (bus.lat > 28.68) {
        originName = 'Azadpur Terminal';
        destName = 'Central Secretariat Terminal';
      } else {
        originName = 'Kashmere Gate ISBT';
        destName = 'Nehru Place Bus Terminal';
      }
    }
  }

  // Find 2-3 closest bus stands to form an itinerary
  const sortedStands = [...ALL_DTC_BUS_STANDS].sort((a, b) => {
    const dA = calculateDistanceKm(bus.lat, bus.lng, a.lat, a.lng);
    const dB = calculateDistanceKm(bus.lat, bus.lng, b.lat, b.lng);
    return dA - dB;
  });

  const nextStand = sortedStands[0]?.name || 'Connaught Place';
  const intermediateStand = sortedStands[1]?.name || 'ITO';

  const rawSequence = [originName, nextStand, intermediateStand, destName];
  // Deduplicate
  const uniqueSequence = Array.from(new Set(rawSequence));
  if (uniqueSequence.length < 3) {
    uniqueSequence.splice(1, 0, 'AIIMS / Safdarjung');
  }

  const {
    orderedStops,
    nextStopName,
    nextStopDistanceKm,
    nextStopEtaMins,
    nextStopClockTime,
    progressPercent,
    telemetrySummary,
  } = calculateTelemetryEtasForStopSequence(uniqueSequence, routeBuses, bus, false);

  return {
    routeId: cleanRouteId || 'Delhi Transit',
    startPoint: originName,
    nextPoint: nextStopName,
    nextPointDistanceKm: nextStopDistanceKm,
    nextPointFormattedDistance: formatDistance(nextStopDistanceKm),
    nextPointEtaMins: nextStopEtaMins,
    nextPointClockTime: nextStopClockTime,
    lastPoint: destName,
    currentDirection: `Towards ${destName}`,
    orderedStops,
    progressPercent,
    routeDescription: `Delhi City Bus Route ${cleanRouteId}`,
    isReversed: false,
    telemetrySummary,
  };
}

