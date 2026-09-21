import { DTCBus, TransitHub } from '../types';
import { DTC_KNOWN_ROUTES, KnownRouteInfo } from '../data/dtcRoutes';
import { DELHI_HUBS } from '../data/terminals';
import { calculateDistanceKm, formatDistance } from './geo';

export interface RouteStopStep {
  name: string;
  isPassed: boolean;
  isCurrentNext: boolean;
  isStart: boolean;
  isLast: boolean;
  distanceFromBusKm?: number;
}

export interface BusProgression {
  routeId: string;
  startPoint: string;
  nextPoint: string;
  nextPointDistanceKm: number;
  nextPointFormattedDistance: string;
  nextPointEtaMins: number;
  lastPoint: string;
  currentDirection: string;
  orderedStops: RouteStopStep[];
  progressPercent: number; // 0 to 100
  routeDescription?: string;
}

/**
 * Resolves the Starting Point, Next Point, and Last Point for any clicked DTC bus
 */
export function resolveBusProgression(bus: DTCBus, allBuses: DTCBus[] = []): BusProgression {
  const cleanRouteId = (bus.routeId || '').trim();
  const known = DTC_KNOWN_ROUTES[cleanRouteId];

  // Map of hubs by name for coordinate lookups
  const hubCoordsMap = new Map<string, { lat: number; lng: number }>();
  DELHI_HUBS.forEach((h) => {
    hubCoordsMap.set(h.name.toLowerCase(), { lat: h.lat, lng: h.lng });
  });

  const getStopCoords = (stopName: string): { lat: number; lng: number } | null => {
    const sLower = stopName.toLowerCase();
    for (const hub of DELHI_HUBS) {
      if (hub.name.toLowerCase().includes(sLower) || sLower.includes(hub.name.toLowerCase())) {
        return { lat: hub.lat, lng: hub.lng };
      }
    }
    return null;
  };

  if (known) {
    // We have verified DTC route itinerary
    const forwardSequence = [known.startPoint, ...known.viaStops, known.lastPoint];
    const reverseSequence = [...forwardSequence].reverse();

    // Determine direction: Is the bus travelling Start -> Last, or Last -> Start?
    const startCoords = getStopCoords(known.startPoint);
    const lastCoords = getStopCoords(known.lastPoint);

    let isForward = true;
    if (startCoords && lastCoords) {
      const distToStart = calculateDistanceKm(bus.lat, bus.lng, startCoords.lat, startCoords.lng);
      const distToLast = calculateDistanceKm(bus.lat, bus.lng, lastCoords.lat, lastCoords.lng);

      // Bearing hint:
      // If bearing is defined, check if bearing vector points towards lastCoords or startCoords
      if (bus.bearing > 0) {
        // approximate direction
        const dLatStart = startCoords.lat - bus.lat;
        const dLngStart = startCoords.lng - bus.lng;
        const angleToStart = (Math.atan2(dLngStart, dLatStart) * 180) / Math.PI;
        const normAngleToStart = (angleToStart + 360) % 360;

        const dLatLast = lastCoords.lat - bus.lat;
        const dLngLast = lastCoords.lng - bus.lng;
        const angleToLast = (Math.atan2(dLngLast, dLatLast) * 180) / Math.PI;
        const normAngleToLast = (angleToLast + 360) % 360;

        const diffStart = Math.abs(bus.bearing - normAngleToStart);
        const diffLast = Math.abs(bus.bearing - normAngleToLast);

        if (diffLast < diffStart) {
          isForward = true;
        } else {
          isForward = false;
        }
      } else {
        // Fallback: If bus is closer to start than last, it's forward, else reverse
        isForward = distToStart <= distToLast;
      }
    }

    const activeSequence = isForward ? forwardSequence : reverseSequence;
    const origin = activeSequence[0];
    const destination = activeSequence[activeSequence.length - 1];

    // Find the next upcoming stop along the active sequence
    let nextIndex = 1;
    let minUpcomingDist = Infinity;

    // Check each stop in sequence
    let closestIndex = 0;
    let closestDist = Infinity;

    activeSequence.forEach((stopName, idx) => {
      const coords = getStopCoords(stopName);
      if (coords) {
        const d = calculateDistanceKm(bus.lat, bus.lng, coords.lat, coords.lng);
        if (d < closestDist) {
          closestDist = d;
          closestIndex = idx;
        }
      }
    });

    // Next point is typically the stop ahead of closest stop, or closest stop if bus is arriving
    if (closestDist > 0.4 && closestIndex < activeSequence.length - 1) {
      nextIndex = closestIndex;
    } else {
      nextIndex = Math.min(activeSequence.length - 1, closestIndex + 1);
    }

    // Safety check: Next stop cannot be behind the bus if bus is at start
    if (nextIndex <= 0) nextIndex = 1;

    const nextStopName = activeSequence[nextIndex];
    const nextCoords = getStopCoords(nextStopName);
    const nextDistKm = nextCoords
      ? calculateDistanceKm(bus.lat, bus.lng, nextCoords.lat, nextCoords.lng)
      : 0.8;

    // Estimate ETA (at city speed of 22 km/h or current speed)
    const effectiveSpeed = Math.max(15, bus.speedKmH || 20);
    const etaMins = Math.max(1, Math.round((nextDistKm / effectiveSpeed) * 60));

    // Progress percentage
    const progressPercent = Math.min(
      95,
      Math.max(5, Math.round((nextIndex / (activeSequence.length - 1)) * 100))
    );

    const orderedStops: RouteStopStep[] = activeSequence.map((name, idx) => ({
      name,
      isStart: idx === 0,
      isLast: idx === activeSequence.length - 1,
      isPassed: idx < nextIndex,
      isCurrentNext: idx === nextIndex,
      distanceFromBusKm: idx === nextIndex ? nextDistKm : undefined,
    }));

    return {
      routeId: cleanRouteId,
      startPoint: origin,
      nextPoint: nextStopName,
      nextPointDistanceKm: nextDistKm,
      nextPointFormattedDistance: formatDistance(nextDistKm),
      nextPointEtaMins: etaMins,
      lastPoint: destination,
      currentDirection: `Towards ${destination}`,
      orderedStops,
      progressPercent,
      routeDescription: known.description,
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
      // Geographical deduction based on bus position
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

  // Find the closest upcoming bus stand from DELHI_HUBS in front of the bus
  let closestHub: TransitHub = DELHI_HUBS[0];
  let minDistance = Infinity;

  DELHI_HUBS.forEach((hub) => {
    const d = calculateDistanceKm(bus.lat, bus.lng, hub.lat, hub.lng);
    if (d > 0.05 && d < minDistance) {
      minDistance = d;
      closestHub = hub;
    }
  });

  const nextStopName = closestHub.name;
  const effectiveSpeed = Math.max(15, bus.speedKmH || 20);
  const etaMins = Math.max(1, Math.round((minDistance / effectiveSpeed) * 60));

  const intermediate = [originName, nextStopName, destName];
  // eliminate duplicate if nextStopName is same as origin or dest
  const uniqueStops = Array.from(new Set(intermediate));
  if (uniqueStops.length < 3) {
    uniqueStops.splice(1, 0, closestHub.name);
  }

  const orderedStops: RouteStopStep[] = [
    { name: originName, isStart: true, isLast: false, isPassed: true, isCurrentNext: false },
    {
      name: nextStopName,
      isStart: false,
      isLast: false,
      isPassed: false,
      isCurrentNext: true,
      distanceFromBusKm: minDistance,
    },
    { name: destName, isStart: false, isLast: true, isPassed: false, isCurrentNext: false },
  ];

  return {
    routeId: cleanRouteId || 'Delhi Transit',
    startPoint: originName,
    nextPoint: nextStopName,
    nextPointDistanceKm: minDistance,
    nextPointFormattedDistance: formatDistance(minDistance),
    nextPointEtaMins: etaMins,
    lastPoint: destName,
    currentDirection: `Towards ${destName}`,
    orderedStops,
    progressPercent: 50,
    routeDescription: `Delhi City Bus Route ${cleanRouteId}`,
  };
}
