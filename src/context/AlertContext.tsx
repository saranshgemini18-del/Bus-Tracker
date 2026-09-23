import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { BusArrivalAlert } from '../types/alert';
import { DTCBus, TransitHub } from '../types';
import { calculateDistanceKm, formatDistance } from '../utils/geo';
import { playTransitAlertChime } from '../utils/alertSound';
import {
  sendBrowserNotification,
  triggerDeviceVibration,
  requestNotificationPermission,
  getNotificationPermission,
} from '../utils/notificationManager';

interface AlertContextType {
  alerts: BusArrivalAlert[];
  activeTriggeredAlert: BusArrivalAlert | null;
  dismissTriggeredAlert: () => void;
  createAlert: (newAlert: Omit<BusArrivalAlert, 'id' | 'createdAt' | 'triggered'>) => BusArrivalAlert;
  deleteAlert: (id: string) => void;
  clearTriggeredAlerts: () => void;
  toggleAlertSound: (id: string) => void;
  toggleAlertPush: (id: string) => void;
  // Modal controllers
  isSetAlertModalOpen: boolean;
  modalInitialBus: DTCBus | null;
  modalInitialStop: TransitHub | null;
  modalInitialRouteId: string | undefined;
  openSetAlertModal: (bus?: DTCBus | null, stop?: TransitHub | null, routeId?: string) => void;
  closeSetAlertModal: () => void;
  // Utilities
  testChime: () => void;
  requestPush: () => Promise<NotificationPermission>;
  isBusAlerted: (busId: string) => boolean;
  isRouteAlerted: (routeId: string) => boolean;
}

const STORAGE_KEY = 'dtc_bus_arrival_alerts_v1';

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider: React.FC<{
  children: React.ReactNode;
  buses: DTCBus[];
  onSelectBus?: (bus: DTCBus) => void;
  onSelectRoute?: (routeId: string) => void;
}> = ({ children, buses, onSelectBus, onSelectRoute }) => {
  const [alerts, setAlerts] = useState<BusArrivalAlert[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTriggeredAlert, setActiveTriggeredAlert] = useState<BusArrivalAlert | null>(null);

  // Set alert modal state
  const [isSetAlertModalOpen, setIsSetAlertModalOpen] = useState(false);
  const [modalInitialBus, setModalInitialBus] = useState<DTCBus | null>(null);
  const [modalInitialStop, setModalInitialStop] = useState<TransitHub | null>(null);
  const [modalInitialRouteId, setModalInitialRouteId] = useState<string | undefined>(undefined);

  // Keep a ref to latest alerts for the evaluation loop
  const alertsRef = useRef<BusArrivalAlert[]>(alerts);
  useEffect(() => {
    alertsRef.current = alerts;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
    } catch (e) {
      console.warn('Could not persist alerts to localStorage', e);
    }
  }, [alerts]);

  const openSetAlertModal = useCallback((bus?: DTCBus | null, stop?: TransitHub | null, routeId?: string) => {
    setModalInitialBus(bus || null);
    setModalInitialStop(stop || null);
    setModalInitialRouteId(routeId || bus?.routeId);
    setIsSetAlertModalOpen(true);
  }, []);

  const closeSetAlertModal = useCallback(() => {
    setIsSetAlertModalOpen(false);
    setModalInitialBus(null);
    setModalInitialStop(null);
    setModalInitialRouteId(undefined);
  }, []);

  const dismissTriggeredAlert = useCallback(() => {
    setActiveTriggeredAlert(null);
  }, []);

  const createAlert = useCallback(
    (newAlertData: Omit<BusArrivalAlert, 'id' | 'createdAt' | 'triggered'>): BusArrivalAlert => {
      const id = `alert_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const created: BusArrivalAlert = {
        ...newAlertData,
        id,
        createdAt: Date.now(),
        triggered: false,
      };

      setAlerts((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  const deleteAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    setActiveTriggeredAlert((curr) => (curr?.id === id ? null : curr));
  }, []);

  const clearTriggeredAlerts = useCallback(() => {
    setAlerts((prev) => prev.filter((a) => !a.triggered));
  }, []);

  const toggleAlertSound = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, soundEnabled: !a.soundEnabled } : a))
    );
  }, []);

  const toggleAlertPush = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pushEnabled: !a.pushEnabled } : a))
    );
  }, []);

  const testChime = useCallback(() => {
    playTransitAlertChime();
    triggerDeviceVibration([150, 80, 150]);
  }, []);

  const requestPush = useCallback(async () => {
    return await requestNotificationPermission();
  }, []);

  const isBusAlerted = useCallback(
    (busId: string) => {
      return alerts.some((a) => !a.triggered && a.busId === busId);
    },
    [alerts]
  );

  const isRouteAlerted = useCallback(
    (routeId: string) => {
      return alerts.some(
        (a) => !a.triggered && a.routeId.toLowerCase() === routeId.toLowerCase()
      );
    },
    [alerts]
  );

  // Proximity Alert Evaluation Engine: Runs on every `buses` telemetry update
  useEffect(() => {
    if (!buses || buses.length === 0 || alertsRef.current.length === 0) return;

    let hasUpdates = false;
    const updatedAlerts = alertsRef.current.map((alert) => {
      // Find matching live bus
      const liveBus =
        buses.find(
          (b) =>
            b.id === alert.busId ||
            b.id === alert.busRegNo ||
            (b.vehicle_id && b.vehicle_id === alert.busRegNo)
        ) ||
        (alert.routeId
          ? buses.find((b) => b.routeId.toLowerCase() === alert.routeId.toLowerCase())
          : undefined);

      if (!liveBus) return alert;

      const distanceKm = calculateDistanceKm(
        liveBus.lat,
        liveBus.lng,
        alert.stopLat,
        alert.stopLng
      );

      // Estimate speed & ETA (assume min 16 km/h if bus is stopped at a traffic light)
      const rawSpeed = liveBus.speedKmH || liveBus.speed || 18;
      const speedKmH = rawSpeed > 3 ? rawSpeed : 18;
      const etaMins = Math.max(1, Math.round((distanceKm / speedKmH) * 60));

      const updated: BusArrivalAlert = {
        ...alert,
        lastDistanceKm: Math.round(distanceKm * 100) / 100,
        lastEtaMins: etaMins,
        currentBusLat: liveBus.lat,
        currentBusLng: liveBus.lng,
        currentBusSpeedKmH: Math.round(speedKmH),
      };

      // Check if threshold condition is triggered
      if (!alert.triggered) {
        let conditionMet = false;
        if (alert.triggerType === 'distance') {
          conditionMet = distanceKm <= alert.triggerDistanceKm;
        } else if (alert.triggerType === 'time') {
          conditionMet = etaMins <= alert.triggerTimeMins;
        }

        if (conditionMet) {
          updated.triggered = true;
          updated.triggeredAt = Date.now();

          // 1. Play synthesized transit chime
          if (alert.soundEnabled) {
            playTransitAlertChime();
          }

          // 2. Trigger vibration on supported mobile devices
          if (alert.vibrateEnabled) {
            triggerDeviceVibration([300, 150, 300, 150, 450]);
          }

          // 3. Send Web Browser Push Notification
          if (alert.pushEnabled && getNotificationPermission() === 'granted') {
            const formattedDist = formatDistance(distanceKm);
            sendBrowserNotification(`🚌 Bus Approaching: Route ${alert.routeId}`, {
              body: `Bus ${alert.busRegNo} is now ${formattedDist} (~${etaMins} mins) away from ${alert.stopName}.`,
              tag: `bus-alert-${alert.id}`,
              onClick: () => {
                if (onSelectBus) onSelectBus(liveBus);
                else if (onSelectRoute) onSelectRoute(alert.routeId);
              },
            });
          }

          // 4. Activate in-app alert banner/modal
          setActiveTriggeredAlert(updated);
        }
      }

      hasUpdates = true;
      return updated;
    });

    if (hasUpdates) {
      setAlerts(updatedAlerts);
    }
  }, [buses, onSelectBus, onSelectRoute]);

  return (
    <AlertContext.Provider
      value={{
        alerts,
        activeTriggeredAlert,
        dismissTriggeredAlert,
        createAlert,
        deleteAlert,
        clearTriggeredAlerts,
        toggleAlertSound,
        toggleAlertPush,
        isSetAlertModalOpen,
        modalInitialBus,
        modalInitialStop,
        modalInitialRouteId,
        openSetAlertModal,
        closeSetAlertModal,
        testChime,
        requestPush,
        isBusAlerted,
        isRouteAlerted,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export function useBusAlerts(): AlertContextType {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('useBusAlerts must be used within an AlertProvider');
  }
  return ctx;
}
