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
  onOpenApiKeyModal: () => void;
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
  onOpenApiKeyModal,
  activeTab,
  onTabChange,
}) => {
  return (
    <header className="bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md sticky top-0 z-30">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 text-white font-bold">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  DTC Bus Live Tracker
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  OTD Real-Time
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Delhi Transport Corporation & DIMTS Fleet • Live GPS Telemetry
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* API Key Pill */}
            <button
              id="header-api-key-btn"
              onClick={onOpenApiKeyModal}
              title="Click to view or edit DTC OTD API Key"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">API Key:</span>
              <span className="font-mono text-amber-300">{summary?.apiKeyMasked || 'qj4x...09m9'}</span>
            </button>

            {/* Auto-Refresh Toggle & Countdown */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
              <button
                id="toggle-auto-refresh-btn"
                onClick={onToggleAutoRefresh}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white"
                title={autoRefresh ? 'Click to pause auto-sync' : 'Click to enable 10s auto-sync'}
              >
                <Radio className={`w-3.5 h-3.5 ${autoRefresh ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                <span className="hidden sm:inline">{autoRefresh ? 'Auto-Sync' : 'Paused'}</span>
              </button>
              {autoRefresh && (
                <span className="text-[11px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 min-w-[24px] text-center border border-slate-700/60">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{loading ? 'Syncing...' : 'Sync Now'}</span>
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
