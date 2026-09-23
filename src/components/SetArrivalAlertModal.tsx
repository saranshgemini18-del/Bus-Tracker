import React, { useState, useEffect, useMemo } from 'react';
import { DTCBus, TransitHub } from '../types';
import { BusArrivalAlert, AlertTriggerType } from '../types/alert';
import { useBusAlerts } from '../context/AlertContext';
import { ALL_DTC_BUS_STANDS, findNearestStandFromAll } from '../data/terminals';
import { calculateDistanceKm, formatDistance } from '../utils/geo';
import { getNotificationPermission } from '../utils/notificationManager';
import {
  Bell,
  X,
  Bus,
  MapPin,
  Clock,
  Navigation,
  Volume2,
  Smartphone,
  Check,
  AlertCircle,
  Radio,
  Sparkles,
  Search,
} from 'lucide-react';

interface SetArrivalAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  buses: DTCBus[];
  initialBus?: DTCBus | null;
  initialStop?: TransitHub | null;
  initialRouteId?: string;
  onSelectBus?: (bus: DTCBus) => void;
}

export const SetArrivalAlertModal: React.FC<SetArrivalAlertModalProps> = ({
  isOpen,
  onClose,
  buses,
  initialBus,
  initialStop,
  initialRouteId,
  onSelectBus,
}) => {
  const { createAlert, testChime, requestPush } = useBusAlerts();

  // Selected Bus State
  const [selectedBusId, setSelectedBusId] = useState<string>(initialBus?.id || '');
  const [routeQuery, setRouteQuery] = useState<string>(initialRouteId || initialBus?.routeId || '');

  // Target Stop State
  const [selectedStop, setSelectedStop] = useState<TransitHub | null>(initialStop || null);
  const [stopSearchQuery, setStopSearchQuery] = useState<string>('');
  const [isLocatingNearest, setIsLocatingNearest] = useState<boolean>(false);
  const [userLocationName, setUserLocationName] = useState<string>('');

  // Proximity Threshold State
  const [triggerType, setTriggerType] = useState<AlertTriggerType>('distance');
  const [triggerDistanceKm, setTriggerDistanceKm] = useState<number>(1.0);
  const [triggerTimeMins, setTriggerTimeMins] = useState<number>(5);

  // Channels
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);
  const [vibrateEnabled, setVibrateEnabled] = useState<boolean>(true);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  // Success Confirmation
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Sync initial props
  useEffect(() => {
    if (initialBus) {
      setSelectedBusId(initialBus.id);
      setRouteQuery(initialBus.routeId);
    } else if (initialRouteId) {
      setRouteQuery(initialRouteId);
    }
    if (initialStop) {
      setSelectedStop(initialStop);
    }
  }, [initialBus, initialStop, initialRouteId]);

  // Check notification permission
  useEffect(() => {
    setPermissionStatus(getNotificationPermission());
  }, [isOpen]);

  // Auto-detect nearest stop on first open if none selected
  useEffect(() => {
    if (isOpen && !selectedStop && typeof window !== 'undefined' && 'geolocation' in navigator) {
      setIsLocatingNearest(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const nearest = findNearestStandFromAll(latitude, longitude);
          if (nearest && nearest.hub) {
            setSelectedStop(nearest.hub);
            setUserLocationName(`Nearest to your GPS (${formatDistance(nearest.distanceKm)})`);
          }
          setIsLocatingNearest(false);
        },
        () => {
          // Default fallback to AIIMS / Central Delhi
          const fallback = ALL_DTC_BUS_STANDS.find((s) => s.id === 'hub_aiims') || ALL_DTC_BUS_STANDS[0];
          setSelectedStop(fallback || null);
          setIsLocatingNearest(false);
        },
        { timeout: 4000, enableHighAccuracy: true }
      );
    }
  }, [isOpen, selectedStop]);

  // Active buses matching route
  const matchingBuses = useMemo(() => {
    if (!routeQuery.trim()) return buses.slice(0, 15);
    const q = routeQuery.trim().toLowerCase();
    return buses.filter(
      (b) =>
        b.routeId.toLowerCase().includes(q) ||
        (b.vehicle_id && b.vehicle_id.toLowerCase().includes(q)) ||
        b.id.toLowerCase().includes(q)
    );
  }, [buses, routeQuery]);

  // Active selected bus object
  const currentBus = useMemo(() => {
    if (selectedBusId) {
      return buses.find((b) => b.id === selectedBusId) || matchingBuses[0] || null;
    }
    return matchingBuses[0] || null;
  }, [buses, selectedBusId, matchingBuses]);

  // Stop Search Results
  const filteredStops = useMemo(() => {
    if (!stopSearchQuery.trim()) return [];
    const q = stopSearchQuery.toLowerCase();
    return ALL_DTC_BUS_STANDS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.hindi && s.hindi.includes(q)) ||
        (s.zone && s.zone.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [stopSearchQuery]);

  // Calculate live current distance & ETA from selected bus to target stop
  const currentLiveProximity = useMemo(() => {
    if (!currentBus || !selectedStop) return null;
    const distKm = calculateDistanceKm(currentBus.lat, currentBus.lng, selectedStop.lat, selectedStop.lng);
    const speed = (currentBus.speedKmH && currentBus.speedKmH > 3) ? currentBus.speedKmH : 18;
    const etaMins = Math.max(1, Math.round((distKm / speed) * 60));
    return {
      distKm: Math.round(distKm * 10) / 10,
      etaMins,
      distFormatted: formatDistance(distKm),
    };
  }, [currentBus, selectedStop]);

  const handleRequestPushPermission = async () => {
    const perm = await requestPush();
    setPermissionStatus(perm);
    if (perm === 'granted') {
      setPushEnabled(true);
    }
  };

  const handleSaveAlert = () => {
    if (!currentBus || !selectedStop) return;

    createAlert({
      busId: currentBus.id,
      busRegNo: currentBus.vehicle_id || currentBus.id,
      routeId: currentBus.routeId,
      busType: currentBus.type,
      stopId: selectedStop.id,
      stopName: selectedStop.name,
      stopHindiName: selectedStop.hindi,
      stopLat: selectedStop.lat,
      stopLng: selectedStop.lng,
      triggerType,
      triggerDistanceKm,
      triggerTimeMins,
      soundEnabled,
      pushEnabled: pushEnabled && permissionStatus === 'granted',
      vibrateEnabled,
      lastDistanceKm: currentLiveProximity?.distKm,
      lastEtaMins: currentLiveProximity?.etaMins,
      currentBusLat: currentBus.lat,
      currentBusLng: currentBus.lng,
      currentBusSpeedKmH: currentBus.speedKmH || 18,
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#121a27] shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Set Bus Arrival Alert • बस आगमन अलर्ट
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Get notified when your bus is approaching your stop
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Section 1: Select Bus */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-[#ca4a1c]" /> 1. Select Live Bus to Track
              </label>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                {buses.length} active in Delhi
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={routeQuery}
                    onChange={(e) => setRouteQuery(e.target.value)}
                    placeholder="Search route (e.g. 502, 419, 729) or bus reg..."
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#ca4a1c]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Active Matching Bus Cards */}
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {matchingBuses.length > 0 ? (
                  matchingBuses.slice(0, 4).map((b) => {
                    const isSelected = currentBus?.id === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBusId(b.id)}
                        className={`w-full p-2 rounded-xl text-left text-xs transition cursor-pointer border flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/40'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="px-2 py-0.5 rounded-lg bg-[#ca4a1c] text-white font-black text-xs shrink-0">
                            {b.routeId}
                          </span>
                          <div className="min-w-0">
                            <div className="font-extrabold text-slate-800 dark:text-slate-100 truncate">
                              {b.vehicle_id || b.id}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {b.type === 'ev' ? '⚡ Electric EV' : 'CNG Standard'} • {b.speedKmH ? `${b.speedKmH} km/h` : 'In transit'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                            Live GPS
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 py-2 text-center">No active buses matching "{routeQuery}"</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Destination Stop */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> 2. Your Bus Stop (Destination)
              </label>
              {isLocatingNearest && (
                <span className="text-[10px] text-amber-600 font-semibold animate-pulse">
                  Detecting nearest stop...
                </span>
              )}
            </div>

            {selectedStop ? (
              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-900 dark:text-emerald-200 truncate">
                      {selectedStop.name}
                    </span>
                    {selectedStop.hindi && (
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                        ({selectedStop.hindi})
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {userLocationName || selectedStop.description || 'DTC Bus Stop'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStop(null)}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 cursor-pointer shrink-0"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="space-y-2 relative">
                <input
                  type="text"
                  value={stopSearchQuery}
                  onChange={(e) => setStopSearchQuery(e.target.value)}
                  placeholder="Type bus stop name (e.g. AIIMS, Connaught Place, Lajpat Nagar)..."
                  className="w-full h-10 pl-3 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                {filteredStops.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredStops.map((stop) => (
                      <button
                        key={stop.id}
                        type="button"
                        onClick={() => {
                          setSelectedStop(stop);
                          setStopSearchQuery('');
                        }}
                        className="w-full px-3.5 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-xs cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{stop.name}</div>
                          {stop.hindi && <div className="text-[10px] text-slate-400">{stop.hindi}</div>}
                        </div>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-bold">
                          Select
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Live Distance Preview */}
            {currentLiveProximity && (
              <div className="mt-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  Live Bus Distance:
                </span>
                <span className="font-extrabold text-slate-800 dark:text-slate-100">
                  {currentLiveProximity.distFormatted} (~{currentLiveProximity.etaMins} mins away)
                </span>
              </div>
            )}
          </div>

          {/* Section 3: Proximity Trigger Configuration */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              3. Trigger Alert When Bus Is Within:
            </label>

            {/* Toggle Distance vs Time */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setTriggerType('distance')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer border ${
                  triggerType === 'distance'
                    ? 'bg-[#ca4a1c] text-white border-[#ca4a1c]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                Distance Trigger
              </button>
              <button
                type="button"
                onClick={() => setTriggerType('time')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer border ${
                  triggerType === 'time'
                    ? 'bg-[#ca4a1c] text-white border-[#ca4a1c]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Time (ETA) Trigger
              </button>
            </div>

            {/* Trigger Options */}
            {triggerType === 'distance' ? (
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '500 m', value: 0.5 },
                  { label: '1.0 km', value: 1.0 },
                  { label: '2.0 km', value: 2.0 },
                  { label: '3.0 km', value: 3.0 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTriggerDistanceKm(opt.value)}
                    className={`py-2 rounded-xl text-xs font-black transition cursor-pointer border ${
                      triggerDistanceKm === opt.value
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 border-amber-400 dark:border-amber-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '2 mins', value: 2 },
                  { label: '5 mins', value: 5 },
                  { label: '10 mins', value: 10 },
                  { label: '15 mins', value: 15 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTriggerTimeMins(opt.value)}
                    className={`py-2 rounded-xl text-xs font-black transition cursor-pointer border ${
                      triggerTimeMins === opt.value
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 border-amber-400 dark:border-amber-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Notification Channels */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              4. Alert Channels:
            </label>

            <div className="space-y-2">
              {/* Sound Chime */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">Transit Sound Chime</span>
                    <p className="text-[10px] text-slate-500">Pleasant audio chime when bus arrives</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={testChime}
                    className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-[10px] font-bold hover:bg-slate-300 text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    Test
                  </button>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#ca4a1c] cursor-pointer"
                  />
                </div>
              </div>

              {/* Browser Push */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">Browser / Push Notification</span>
                    <p className="text-[10px] text-slate-500">
                      {permissionStatus === 'granted'
                        ? 'Notifications enabled'
                        : permissionStatus === 'denied'
                        ? 'Permission blocked in browser settings'
                        : 'Requires permission prompt'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {permissionStatus !== 'granted' && (
                    <button
                      type="button"
                      onClick={handleRequestPushPermission}
                      className="px-2 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 cursor-pointer shadow-xs"
                    >
                      Enable
                    </button>
                  )}
                  <input
                    type="checkbox"
                    checked={pushEnabled && permissionStatus === 'granted'}
                    disabled={permissionStatus !== 'granted'}
                    onChange={(e) => setPushEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#ca4a1c] cursor-pointer"
                  />
                </div>
              </div>

              {/* Vibration */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <div>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">Phone Haptic Vibration</span>
                    <p className="text-[10px] text-slate-500">Vibrate mobile phone when bus approaches</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={vibrateEnabled}
                  onChange={(e) => setVibrateEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#ca4a1c] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5 bg-slate-50/80 dark:bg-slate-900/60 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveAlert}
            disabled={!currentBus || !selectedStop || isSaved}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition cursor-pointer shadow-md ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#ca4a1c] hover:bg-[#a83301] text-white disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                Alert Activated!
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                Activate Arrival Alert
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
