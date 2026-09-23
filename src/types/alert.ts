import { TransitHub, DTCBus } from '../types';

export type AlertTriggerType = 'distance' | 'time';

export interface BusArrivalAlert {
  id: string;
  busId: string;
  busRegNo: string;
  routeId: string;
  busType?: 'ev' | 'cng';
  stopId: string;
  stopName: string;
  stopHindiName?: string;
  stopLat: number;
  stopLng: number;
  triggerType: AlertTriggerType;
  triggerDistanceKm: number; // e.g. 0.5, 1.0, 2.0, 3.0
  triggerTimeMins: number; // e.g. 2, 5, 10, 15
  soundEnabled: boolean;
  pushEnabled: boolean;
  vibrateEnabled: boolean;
  triggered: boolean;
  triggeredAt?: number;
  createdAt: number;
  lastDistanceKm?: number;
  lastEtaMins?: number;
  currentBusLat?: number;
  currentBusLng?: number;
  currentBusSpeedKmH?: number;
}
