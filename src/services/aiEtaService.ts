import { DTCBus, StopAiEta, AiEtaResult } from '../types';
import { RouteStopStep, TelemetrySummary } from '../utils/routeResolver';

const cache = new Map<string, { result: AiEtaResult; timestamp: number }>();
const CACHE_TTL_MS = 25_000; // 25 seconds cache

export async function fetchAiEtaPrediction(
  bus: DTCBus,
  routeId: string,
  orderedStops: RouteStopStep[],
  telemetrySummary?: TelemetrySummary,
  force: boolean = false
): Promise<AiEtaResult | null> {
  const cacheKey = `${bus.id}_${routeId}_${orderedStops.length}`;
  const now = Date.now();

  if (!force && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    if (now - cached.timestamp < CACHE_TTL_MS) {
      return cached.result;
    }
  }

  // Filter only upcoming stops (stops that haven't been passed yet)
  const upcomingStops = orderedStops.filter((s) => !s.isPassed);
  if (upcomingStops.length === 0) {
    return null;
  }

  const payload = {
    busId: bus.id,
    routeId: routeId,
    busType: bus.type,
    speedKmH: bus.speedKmH,
    isMoving: bus.isMoving,
    crowdingStatus: bus.crowdingStatus || 'moderate',
    ageSeconds: bus.ageSeconds,
    stops: upcomingStops.map((s) => ({
      name: s.name,
      distanceKm: s.distanceFromBusKm || 1.2,
      stopType: s.stopType || 'stop',
      baselineEtaMins: s.etaMins || 2,
    })),
    corridorTelemetry: telemetrySummary
      ? {
          activeBuses: telemetrySummary.activeBusesOnRoute,
          avgSpeedKmH: telemetrySummary.averageSpeedKmH,
          congestionLevel: telemetrySummary.congestionLevel,
        }
      : undefined,
    clientLocalTime: new Date().toISOString(),
  };

  try {
    const res = await fetch('/api/ai/predict-eta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`AI ETA prediction error: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.success && json.data) {
      cache.set(cacheKey, { result: json.data, timestamp: now });
      return json.data;
    }
    return null;
  } catch {
    return null;
  }
}
