export interface DTCBus {
  id: string; // vehicle plate e.g. "DL51EV2595"
  routeId: string; // commercial public display route e.g. "354", "502", "740", "840"
  rawRouteId?: string; // internal GTFS ID e.g. "1707"
  tripId: string;
  lat: number;
  lng: number;
  speedKmH: number;
  speed?: number; // In case raw speed property is passed or accessed in km/h
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
