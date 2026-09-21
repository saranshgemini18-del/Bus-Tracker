import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TransitHub, RouteItem } from '../types';
import { DELHI_HUBS } from '../data/terminals';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DELHI_ROUTE_REGISTRY } from '../data/delhiRouteRegistry';
import {
  Search,
  X,
  Zap,
  Bus,
  Filter,
  ChevronDown,
  MapPin,
  Route as RouteIcon,
  Navigation,
  ArrowRight,
} from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRoute: string;
  onRouteChange: (routeId: string) => void;
  selectedType: 'all' | 'ev' | 'cng';
  onTypeChange: (type: 'all' | 'ev' | 'cng') => void;
  topRoutes: { routeId: string; count: number }[];
  allRoutes?: RouteItem[];
  onSelectHub: (hub: TransitHub) => void;
  onFindNearestStand?: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalFilteredBuses: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedRoute,
  onRouteChange,
  selectedType,
  onTypeChange,
  topRoutes,
  allRoutes = [],
  onSelectHub,
  onFindNearestStand,
  onClearFilters,
  hasActiveFilters,
  totalFilteredBuses,
}) => {
  const [routeSearchInput, setRouteSearchInput] = useState(selectedRoute);
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);
  const routeDropdownRef = useRef<HTMLDivElement>(null);

  // Sync route input when selectedRoute changes externally
  useEffect(() => {
    setRouteSearchInput(selectedRoute);
  }, [selectedRoute]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (routeDropdownRef.current && !routeDropdownRef.current.contains(e.target as Node)) {
        setIsRouteDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter routes matching user input
  const routeSuggestions = useMemo(() => {
    const q = routeSearchInput.trim().toLowerCase();
    const routeIdsSet = new Set<string>();
    allRoutes.forEach((r) => routeIdsSet.add(r.routeId));
    topRoutes.forEach((r) => routeIdsSet.add(r.routeId));
    Object.keys(DTC_KNOWN_ROUTES).forEach((id) => routeIdsSet.add(id));
    Object.values(DELHI_ROUTE_REGISTRY).forEach((val) => {
      if (val.displayRoute) routeIdsSet.add(val.displayRoute);
    });

    const allList = Array.from(routeIdsSet);
    if (!q) {
      return allList.slice(0, 15);
    }
    return allList
      .filter((id) => id.toLowerCase().includes(q))
      .slice(0, 15);
  }, [routeSearchInput, allRoutes, topRoutes]);

  const activeRouteInfo = useMemo(() => {
    if (!selectedRoute) return null;
    if (DTC_KNOWN_ROUTES[selectedRoute]) return DTC_KNOWN_ROUTES[selectedRoute];
    // Find matching displayRoute in DELHI_ROUTE_REGISTRY
    const found = Object.values(DELHI_ROUTE_REGISTRY).find((v) => v.displayRoute === selectedRoute);
    if (found) {
      return {
        id: selectedRoute,
        displayNumber: selectedRoute,
        name: `Route ${selectedRoute}`,
        startPoint: found.startPoint,
        lastPoint: found.lastPoint,
        viaStops: [],
        description: found.description || `${found.startPoint} to ${found.lastPoint}`,
        frequencyMins: 10,
        fareSlab: '₹10 - ₹25',
      };
    }
    return null;
  }, [selectedRoute]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-sm space-y-3">
      {/* Primary Row: Plate Search + Dedicated Route Number Search + Stand Fly-To */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* 1. General Plate Number / Bus Search */}
        <div className="relative md:col-span-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="bus-search-input"
            type="text"
            placeholder="Search bus plate (e.g. DL51EV...)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. DEDICATED ROUTE NUMBER SEARCH WITH AUTOCOMPLETE */}
        <div className="relative md:col-span-4" ref={routeDropdownRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600">
              <RouteIcon className="w-4 h-4" />
            </div>
            <input
              id="route-number-search-input"
              type="text"
              placeholder="Search Route No (e.g. 840, 502, 73...)"
              value={routeSearchInput}
              onFocus={() => setIsRouteDropdownOpen(true)}
              onChange={(e) => {
                setRouteSearchInput(e.target.value);
                setIsRouteDropdownOpen(true);
              }}
              className="w-full pl-9 pr-8 py-2 bg-emerald-50/40 border border-emerald-300 rounded-lg text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {selectedRoute ? (
              <button
                id="clear-selected-route-btn"
                onClick={() => {
                  onRouteChange('');
                  setRouteSearchInput('');
                  setIsRouteDropdownOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Clear route filter"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>

          {/* Autocomplete Dropdown Panel */}
          {isRouteDropdownOpen && (
            <div
              id="route-search-dropdown-menu"
              className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-72 overflow-y-auto p-1 text-xs divide-y divide-slate-100 animate-in fade-in zoom-in-95"
            >
              <div className="px-3 py-1.5 font-bold uppercase tracking-wider text-[10px] text-slate-400 flex items-center justify-between bg-slate-50">
                <span>Select Route Number</span>
                <span>Terminals & Live Buses</span>
              </div>

              {selectedRoute && (
                <button
                  onClick={() => {
                    onRouteChange('');
                    setRouteSearchInput('');
                    setIsRouteDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 font-bold flex items-center justify-between"
                >
                  <span>✕ Clear Route Filter</span>
                  <span className="text-[10px]">Show All Routes</span>
                </button>
              )}

              {routeSuggestions.length === 0 ? (
                <div className="p-3 text-center text-slate-500">
                  No routes matching "{routeSearchInput}"
                </div>
              ) : (
                routeSuggestions.map((rId) => {
                  const info =
                    DTC_KNOWN_ROUTES[rId] ||
                    Object.values(DELHI_ROUTE_REGISTRY).find((v) => v.displayRoute === rId);
                  const liveCount = topRoutes.find((t) => t.routeId === rId)?.count;
                  const isCur = selectedRoute === rId;

                  return (
                    <button
                      key={rId}
                      onClick={() => {
                        onRouteChange(rId);
                        setRouteSearchInput(rId);
                        setIsRouteDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 hover:bg-emerald-50 transition flex items-center justify-between group cursor-pointer ${
                        isCur ? 'bg-emerald-100/60 font-bold text-emerald-900' : 'text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 font-black text-sm text-slate-900">
                          <span className="px-1.5 py-0.5 rounded bg-zinc-950 text-amber-400 font-mono text-[11px] border border-amber-500/30">
                            Route {rId}
                          </span>
                          {liveCount !== undefined && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              {liveCount} live
                            </span>
                          )}
                        </div>
                        {info && (
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                            <span className="text-emerald-700 font-medium truncate max-w-[120px]">
                              {info.startPoint.replace(' Terminal', '')}
                            </span>
                            <span>➔</span>
                            <span className="text-rose-700 font-medium truncate max-w-[120px]">
                              {info.lastPoint.replace(' Terminal', '')}
                            </span>
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* 3. DTC Bus Stands / Terminals / Depots Fly-To Dropdown & Nearest Button */}
        <div className="md:col-span-4 flex items-center gap-2">
          <div className="relative flex-1">
            <select
              id="terminal-select-dropdown"
              onChange={(e) => {
                const hub = DELHI_HUBS.find((h) => h.id === e.target.value);
                if (hub) onSelectHub(hub);
              }}
              defaultValue=""
              className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer truncate"
            >
              <option value="" disabled>
                All Bus Stands, Terminals & Depots ({DELHI_HUBS.length})...
              </option>
              <optgroup label="Inter-State Bus Terminals (ISBT)">
                {DELHI_HUBS.filter((h) => h.type === 'ISBT').map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    🏢 {hub.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="DTC Terminals">
                {DELHI_HUBS.filter((h) => h.type === 'Terminal').map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    🚏 {hub.name} {hub.zone ? `(${hub.zone})` : ''}
                  </option>
                ))}
              </optgroup>
              <optgroup label="DTC Fleet Depots">
                {DELHI_HUBS.filter((h) => h.type === 'Depot').map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    🏬 {hub.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Major Bus Stands & Junctions">
                {DELHI_HUBS.filter((h) => h.type === 'Bus Stand' || h.type === 'Interchange').map(
                  (hub) => (
                    <option key={hub.id} value={hub.id}>
                      📍 {hub.name}
                    </option>
                  )
                )}
              </optgroup>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {onFindNearestStand && (
            <button
              id="filter-nearest-stand-btn"
              onClick={onFindNearestStand}
              title="Find the closest bus stand to you"
              className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition whitespace-nowrap cursor-pointer shrink-0"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Nearest Stand</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Route Summary Banner (if a route is searched / selected) */}
      {selectedRoute && (
        <div
          id="active-route-banner"
          className="p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-xl border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <div className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-sm tracking-tight shadow">
              Route {selectedRoute}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs">
                {activeRouteInfo ? (
                  <span>
                    {activeRouteInfo.startPoint} ➔ {activeRouteInfo.lastPoint}
                  </span>
                ) : (
                  <span>Delhi Transit Route {selectedRoute}</span>
                )}
              </div>
              <div className="text-slate-600 text-[11px] flex items-center gap-1.5 mt-0.5">
                <span>Showing <strong>{totalFilteredBuses} active buses</strong> on this route</span>
                {activeRouteInfo && activeRouteInfo.viaStops.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="truncate max-w-xs text-slate-500">
                      Via {activeRouteInfo.viaStops.slice(0, 3).join(', ')}...
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            id="clear-route-filter-badge"
            onClick={() => {
              onRouteChange('');
              setRouteSearchInput('');
            }}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-300 transition text-[11px] self-end sm:self-center cursor-pointer"
          >
            Clear Route
          </button>
        </div>
      )}

      {/* Filter Chips & Quick Route Picks */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Fleet Type:
          </span>

          <button
            id="filter-chip-all"
            onClick={() => onTypeChange('all')}
            className={`px-2.5 py-1 rounded-full font-medium transition cursor-pointer ${
              selectedType === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Buses
          </button>

          <button
            id="filter-chip-ev"
            onClick={() => onTypeChange('ev')}
            className={`px-2.5 py-1 rounded-full font-semibold transition flex items-center gap-1 cursor-pointer ${
              selectedType === 'ev'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Zap className="w-3 h-3 text-emerald-300" />
            Electric (EV)
          </button>

          <button
            id="filter-chip-cng"
            onClick={() => onTypeChange('cng')}
            className={`px-2.5 py-1 rounded-full font-medium transition flex items-center gap-1 cursor-pointer ${
              selectedType === 'cng'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bus className="w-3 h-3 text-indigo-500" />
            CNG Fleet
          </button>
        </div>

        {/* Quick Route Shortcut Chips */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
          <span className="text-slate-400 text-[11px] whitespace-nowrap">Popular Routes:</span>
          {['840', '502', '73', '85', '100', '522', '764', '901', '1551', '2561'].map((rId) => (
            <button
              key={rId}
              onClick={() => {
                onRouteChange(rId);
                setRouteSearchInput(rId);
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-bold border transition whitespace-nowrap cursor-pointer ${
                selectedRoute === rId
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {rId}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
