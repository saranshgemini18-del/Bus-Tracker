import React from 'react';
import { useBusAlerts } from '../context/AlertContext';
import { formatDistance } from '../utils/geo';
import {
  Bell,
  X,
  Volume2,
  VolumeX,
  Trash2,
  Plus,
  Bus,
  MapPin,
  Clock,
  Radio,
  CheckCircle,
} from 'lucide-react';
import { DTCBus } from '../types';

interface ActiveAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSetAlert: () => void;
  onSelectBus?: (bus: DTCBus) => void;
  buses: DTCBus[];
}

export const ActiveAlertsModal: React.FC<ActiveAlertsModalProps> = ({
  isOpen,
  onClose,
  onOpenSetAlert,
  onSelectBus,
  buses,
}) => {
  const { alerts, deleteAlert, toggleAlertSound, toggleAlertPush, testChime, clearTriggeredAlerts } = useBusAlerts();

  if (!isOpen) return null;

  const activeAlerts = alerts.filter((a) => !a.triggered);
  const triggeredAlerts = alerts.filter((a) => a.triggered);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#121a27] shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Bus Arrival Alerts • आगमन सूचनाएं
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {activeAlerts.length} active proximity watcher{activeAlerts.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={testChime}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold cursor-pointer"
              title="Test Sound Chime"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Active Watchers */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Active Proximity Watchers
              </h4>
              <button
                onClick={() => {
                  onClose();
                  onOpenSetAlert();
                }}
                className="inline-flex items-center gap-1 text-xs font-extrabold text-[#ca4a1c] hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Set New Alert
              </button>
            </div>

            {activeAlerts.length > 0 ? (
              <div className="space-y-2.5">
                {activeAlerts.map((alert) => {
                  const distFormatted = alert.lastDistanceKm
                    ? formatDistance(alert.lastDistanceKm)
                    : 'Calculating...';
                  const etaFormatted = alert.lastEtaMins ? `~${alert.lastEtaMins} min` : 'estimating';

                  return (
                    <div
                      key={alert.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded-xl bg-[#ca4a1c] text-white font-black text-xs">
                            Route {alert.routeId}
                          </span>
                          <div>
                            <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                              {alert.busRegNo}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              Target: <strong className="text-slate-700 dark:text-slate-300">{alert.stopName}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleAlertSound(alert.id)}
                            className={`p-1.5 rounded-lg transition cursor-pointer ${
                              alert.soundEnabled
                                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                                : 'text-slate-400 bg-slate-100 dark:bg-slate-700'
                            }`}
                            title={alert.soundEnabled ? 'Mute Chime' : 'Enable Chime'}
                          >
                            {alert.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => deleteAlert(alert.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                            title="Remove Alert"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Live Proximity Gauge */}
                      <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                            Current: <strong>{distFormatted}</strong> ({etaFormatted})
                          </span>
                        </div>

                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                          Triggers at {alert.triggerType === 'distance' ? `${alert.triggerDistanceKm} km` : `${alert.triggerTimeMins} min`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <Bell className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  No active arrival alerts running
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 mb-3">
                  Set an alert to receive audio and push notifications when your bus approaches
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSetAlert();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Set Arrival Alert
                </button>
              </div>
            )}
          </div>

          {/* Recently Triggered Alerts */}
          {triggeredAlerts.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Completed / Triggered Alerts
                </h4>
                <button
                  onClick={clearTriggeredAlerts}
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold cursor-pointer"
                >
                  Clear history
                </button>
              </div>

              <div className="space-y-2">
                {triggeredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-emerald-900 dark:text-emerald-200">
                        Route {alert.routeId} • {alert.busRegNo}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Arrived at {alert.stopName}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
