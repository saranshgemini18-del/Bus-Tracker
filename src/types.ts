export interface DTCBus {
  id: string; // vehicle plate e.g. "DL51EV2595"
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

export interface FleetSummary {
  totalBuses: number;
  evBuses: number;
  cngBuses: number;
  movingBuses: number;
  activeRoutesCount: number;
  lastUpdated: number;
  cacheAgeSeconds: number;
  latencyMs: number;
  source: 'live' | 'cache' | 'stale-cache';
  apiKeyMasked: string;
  topRoutes: { routeId: string; count: number }[];
  warning?: string;
}

export interface RouteItem {
  routeId: string;
  busCount: number;
  evCount: number;
  sampleTrip?: string;
}

export interface TransitHub {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
  zone?: string;
  majorRoutes?: string[];
  distanceKm?: number;
}

export interface BreadcrumbPoint {
  lat: number;
  lng: number;
  time: number;
}
