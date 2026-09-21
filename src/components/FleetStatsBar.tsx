import React from 'react';
import { Bus, Zap, Route, Activity, CheckCircle2, Clock } from 'lucide-react';
import { FleetSummary } from '../types';

interface FleetStatsBarProps {
  summary: FleetSummary | null;
  loading: boolean;
  onFilterType: (type: 'all' | 'ev' | 'cng') => void;
  selectedType: 'all' | 'ev' | 'cng';
}

export const FleetStatsBar: React.FC<FleetStatsBarProps> = ({
  summary,
  loading,
  onFilterType,
  selectedType,
}) => {
  if (!summary) return null;

  const evPercentage = summary.totalBuses > 0 ? Math.round((summary.evBuses / summary.totalBuses) * 100) : 0;
  const cngPercentage = 100 - evPercentage;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* Total Active Buses */}
      <button
        id="stat-card-total"
        onClick={() => onFilterType('all')}
        className={`text-left p-3.5 rounded-xl border transition cursor-pointer ${
          selectedType === 'all'
            ? 'bg-slate-900 border-slate-700 shadow-md ring-2 ring-emerald-500/50'
            : 'bg-white hover:bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold ${selectedType === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
            Total Active Fleet
          </span>
          <div className={`p-1.5 rounded-lg ${selectedType === 'all' ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-700'}`}>
            <Bus className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-2xl font-black ${selectedType === 'all' ? 'text-white' : 'text-slate-900'}`}>
            {summary.totalBuses.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-500 font-medium">Buses Tracked</span>
        </div>
      </button>

      {/* Electric Buses (EV) */}
      <button
        id="stat-card-ev"
        onClick={() => onFilterType('ev')}
        className={`text-left p-3.5 rounded-xl border transition cursor-pointer ${
          selectedType === 'ev'
            ? 'bg-emerald-950/80 border-emerald-600 shadow-md ring-2 ring-emerald-500/50'
            : 'bg-white hover:bg-emerald-50/50 border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold ${selectedType === 'ev' ? 'text-emerald-200' : 'text-slate-500'}`}>
            Electric Buses (EV)
          </span>
          <div className={`p-1.5 rounded-lg ${selectedType === 'ev' ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-100 text-emerald-700'}`}>
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-2xl font-black ${selectedType === 'ev' ? 'text-emerald-300' : 'text-emerald-700'}`}>
            {summary.evBuses.toLocaleString()}
          </span>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
            {evPercentage}% Fleet
          </span>
        </div>
      </button>

      {/* CNG / Standard Buses */}
      <button
        id="stat-card-cng"
        onClick={() => onFilterType('cng')}
        className={`text-left p-3.5 rounded-xl border transition cursor-pointer ${
          selectedType === 'cng'
            ? 'bg-indigo-950/80 border-indigo-600 shadow-md ring-2 ring-indigo-500/50'
            : 'bg-white hover:bg-indigo-50/50 border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold ${selectedType === 'cng' ? 'text-indigo-200' : 'text-slate-500'}`}>
            CNG / Standard Fleet
          </span>
          <div className={`p-1.5 rounded-lg ${selectedType === 'cng' ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-700'}`}>
            <Bus className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`text-2xl font-black ${selectedType === 'cng' ? 'text-indigo-300' : 'text-indigo-900'}`}>
            {summary.cngBuses.toLocaleString()}
          </span>
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded">
            {cngPercentage}% Fleet
          </span>
        </div>
      </button>

      {/* Active Routes & Server Status */}
      <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Live Routes & Link</span>
          <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
            <Route className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900">
              {summary.activeRoutesCount}
            </span>
            <span className="text-[11px] text-slate-500 ml-1.5">Routes Active</span>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <CheckCircle2 className="w-3 h-3" />
              {summary.latencyMs}ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
