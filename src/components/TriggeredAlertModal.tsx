import React from 'react';
import { useBusAlerts } from '../context/AlertContext';
import { formatDistance } from '../utils/geo';
import { Bell, MapPin, Navigation, Clock, X, Bus, CheckCircle2 } from 'lucide-react';
import { DTCBus } from '../types';

interface TriggeredAlertModalProps {
  onTrackBus?: (busId: string, routeId: string) => void;
  buses: DTCBus[];
}

export const TriggeredAlertModal: React.FC<TriggeredAlertModalProps> = ({
  onTrackBus,
  buses,
}) => {
  const { activeTriggeredAlert, dismissTriggeredAlert } = useBusAlerts();

  if (!activeTriggeredAlert) return null;

  const currentDistance = activeTriggeredAlert.lastDistanceKm
    ? formatDistance(activeTriggeredAlert.lastDistanceKm)
    : 'within proximity';

  const currentEta = activeTriggeredAlert.lastEtaMins
    ? `~${activeTriggeredAlert.lastEtaMins} min`
    : 'approaching';

  const handleTrack = () => {
    if (onTrackBus) {
      onTrackBus(activeTriggeredAlert.busId, activeTriggeredAlert.routeId);
    }
    dismissTriggeredAlert();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#121a27] shadow-2xl border-2 border-amber-500 overflow-hidden text-slate-900 dark:text-white">
        {/* Urgent Header Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-[#ca4a1c] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-bounce">
              <Bell className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                Live Arrival Proximity Alert
              </span>
              <h3 className="text-base font-black leading-tight mt-0.5">
                Bus Approaching Your Stop!
              </h3>
            </div>
          </div>
          <button
            onClick={dismissTriggeredAlert}
            className="p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Proximity Body Details */}
        <div className="p-5 space-y-4">
          {/* Bus & Route Badges */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-[#ca4a1c] text-white font-black text-sm shadow-xs">
                Route {activeTriggeredAlert.routeId}
              </div>
              <div>
                <div className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
                  {activeTriggeredAlert.busRegNo}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {activeTriggeredAlert.busType === 'ev' ? '⚡ Electric EV Bus' : 'CNG Bus'}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live GPS
              </span>
            </div>
          </div>

          {/* Proximity Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
              <div className="text-xs text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                <Navigation className="w-3.5 h-3.5" />
                Distance Away
              </div>
              <div className="text-2xl font-black text-amber-950 dark:text-amber-100 mt-0.5">
                {currentDistance}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-center">
              <div className="text-xs text-orange-800 dark:text-orange-300 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Estimated Arrival
              </div>
              <div className="text-2xl font-black text-orange-950 dark:text-orange-100 mt-0.5">
                {currentEta}
              </div>
            </div>
          </div>

          {/* Target Stop */}
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Arriving At Stop
              </span>
              <div className="font-extrabold text-slate-800 dark:text-slate-100">
                {activeTriggeredAlert.stopName}
              </div>
              {activeTriggeredAlert.stopHindiName && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activeTriggeredAlert.stopHindiName}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center gap-2.5">
          <button
            onClick={dismissTriggeredAlert}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-extrabold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Dismiss
          </button>

          <button
            onClick={handleTrack}
            className="flex-1 py-2.5 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
          >
            <Bus className="w-4 h-4" />
            Track on Live Map
          </button>
        </div>
      </div>
    </div>
  );
};
