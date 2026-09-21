import React, { useState, useMemo } from 'react';
import { RouteItem } from '../types';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DELHI_ROUTE_REGISTRY } from '../data/delhiRouteRegistry';
import { Route as RouteIcon, Search, Zap, Bus, ArrowRight, X, MapPin } from 'lucide-react';

interface RoutesDirectoryProps {
  routes: RouteItem[];
  onSelectRoute: (routeId: string) => void;
  selectedRoute: string;
}

export const RoutesDirectory: React.FC<RoutesDirectoryProps> = ({
  routes,
  onSelectRoute,
  selectedRoute,
}) => {
  const [search, setSearch] = useState('');

  const filteredRoutes = useMemo(() => {
    if (!search.trim()) return routes;
    const q = search.trim().toLowerCase();
    return routes.filter((r) => {
      const matchId = r.routeId.toLowerCase().includes(q);
      const known = DTC_KNOWN_ROUTES[r.routeId];
      const registry = Object.values(DELHI_ROUTE_REGISTRY).find((v) => v.displayRoute === r.routeId);
      const matchStart =
        known?.startPoint.toLowerCase().includes(q) ||
        registry?.startPoint.toLowerCase().includes(q);
      const matchLast =
        known?.lastPoint.toLowerCase().includes(q) ||
        registry?.lastPoint.toLowerCase().includes(q);
      return matchId || matchStart || matchLast;
    });
  }, [routes, search]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <RouteIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Delhi DTC Bus Routes Directory</h2>
              <p className="text-xs text-slate-500">
                Browse {routes.length} active routes with starting terminal, key waypoints, and destination
              </p>
            </div>
          </div>
        </div>

        {/* Route Number & Terminal Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="routes-search-input"
            type="text"
            placeholder="Search route no or stand (e.g. 840, Uttam Nagar)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Route Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[65vh] overflow-y-auto pr-1">
        {filteredRoutes.map((r) => {
          const isSelected = selectedRoute === r.routeId;
          const hasEV = r.evCount > 0;
          const known = DTC_KNOWN_ROUTES[r.routeId];
          const registry = Object.values(DELHI_ROUTE_REGISTRY).find((v) => v.displayRoute === r.routeId);
          const start = known?.startPoint || registry?.startPoint;
          const last = known?.lastPoint || registry?.lastPoint;

          return (
            <div
              key={r.routeId}
              onClick={() => onSelectRoute(r.routeId)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Route
                    </span>
                    <div className="text-xl font-black text-slate-900 leading-tight">
                      {r.routeId}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {hasEV && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                        <Zap className="w-3 h-3 text-emerald-600" /> {r.evCount} EV
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                      {r.busCount} {r.busCount === 1 ? 'Bus' : 'Buses'}
                    </span>
                  </div>
                </div>

                {/* Starting Point & Last Point */}
                {start && last ? (
                  <div className="mt-2.5 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="text-[11px] font-medium truncate" title={start}>
                        {start.replace(' Terminal', '')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                      <span className="text-[11px] font-medium truncate" title={last}>
                        {last.replace(' Terminal', '')}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2.5 text-[11px] text-slate-400 italic">
                    DTC NCR Radial Route
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">Live GPS tracking</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1 hover:underline">
                  Track Route <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
