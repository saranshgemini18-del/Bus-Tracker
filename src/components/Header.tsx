import React from 'react';
import { Bus, Zap, RefreshCw, Key, Radio, Layers, List, MapPin } from 'lucide-react';
import { FleetSummary } from '../types';

interface HeaderProps {
  summary: FleetSummary | null;
  loading: boolean;
  onRefresh: () => void;
  countdown: number;
  autoRefresh: boolean;
  onToggleAutoRefresh: () => void;
  activeTab: 'map' | 'fleet' | 'routes';
  onTabChange: (tab: 'map' | 'fleet' | 'routes') => void;
}

export const Header: React.FC<HeaderProps> = ({
  summary,
  loading,
  onRefresh,
  countdown,
  autoRefresh,
  onToggleAutoRefresh,
  activeTab,
  onTabChange,
}) => {
  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 shadow-sm sticky top-0 z-30">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-950/40 text-white font-bold shrink-0">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  DTC Bus Live
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Telemetry
                </span>
                {summary && (
                  <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                    <span className="font-semibold text-white">{summary.totalBuses.toLocaleString()}</span> buses online
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden xs:block">
                Delhi Transport Corporation & DIMTS Fleet • Real-Time Tracking
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
            {/* Auto-Refresh Toggle & Countdown */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700/80 text-xs">
              <button
                id="toggle-auto-refresh-btn"
                onClick={onToggleAutoRefresh}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer"
                title={autoRefresh ? 'Click to pause auto-sync' : 'Click to enable 10s auto-sync'}
              >
                <Radio className={`w-3.5 h-3.5 ${autoRefresh ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                <span className="text-xs">{autoRefresh ? 'Auto-Sync' : 'Paused'}</span>
              </button>
              {autoRefresh && (
                <span className="text-[11px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 min-w-[22px] text-center border border-slate-700/60">
                  {countdown}s
                </span>
              )}
            </div>

            {/* Manual Refresh Button */}
            <button
              id="manual-refresh-btn"
              onClick={onRefresh}
              disabled={loading}
              title="Refresh live DTC feed now"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Syncing...' : 'Sync'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              id="tab-map-btn"
              onClick={() => onTabChange('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === 'map'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Live Map
            </button>
            <button
              id="tab-fleet-btn"
              onClick={() => onTabChange('fleet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === 'fleet'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              Fleet Directory ({summary ? summary.totalBuses.toLocaleString() : '...'})
            </button>
            <button
              id="tab-routes-btn"
              onClick={() => onTabChange('routes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
                activeTab === 'routes'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Routes ({summary ? summary.activeRoutesCount : '...'})
            </button>
          </nav>

          {/* Quick telemetry summary */}
          {summary && (
            <div className="hidden lg:flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Zap className="w-3.5 h-3.5" />
                {summary.evBuses} EVs Active
              </span>
              <span className="text-slate-500">•</span>
              <span>{summary.cngBuses} CNG / Standard</span>
              <span className="text-slate-500">•</span>
              <span>{summary.latencyMs}ms API Latency</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
