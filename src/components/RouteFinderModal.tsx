import React, { useState, useMemo } from 'react';
import { ALL_DTC_BUS_STANDS, BusStandInfo } from '../data/terminals';
import { DELHI_ROUTE_REGISTRY } from '../data/delhiRouteRegistry';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DTCBus } from '../types';

interface RouteFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute: (routeId: string) => void;
  buses: DTCBus[];
}

export const RouteFinderModal: React.FC<RouteFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectRoute,
  buses,
}) => {
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState<BusStandInfo | null>(null);
  const [selectedDest, setSelectedDest] = useState<BusStandInfo | null>(null);

  // Filter bus stands
  const originMatches = useMemo(() => {
    if (!originQuery.trim() || selectedOrigin) return [];
    const q = originQuery.toLowerCase();
    return ALL_DTC_BUS_STANDS.filter(
      (s) => s.name.toLowerCase().includes(q) || (s.hindi && s.hindi.includes(q))
    ).slice(0, 6);
  }, [originQuery, selectedOrigin]);

  const destMatches = useMemo(() => {
    if (!destQuery.trim() || selectedDest) return [];
    const q = destQuery.toLowerCase();
    return ALL_DTC_BUS_STANDS.filter(
      (s) => s.name.toLowerCase().includes(q) || (s.hindi && s.hindi.includes(q))
    ).slice(0, 6);
  }, [destQuery, selectedDest]);

  // Find direct and matching connecting routes between the two stands
  const matchingRoutes = useMemo(() => {
    if (!selectedOrigin || !selectedDest) return [];

    const results: Array<{
      routeId: string;
      routeName: string;
      activeBusesCount: number;
      stopsCount: number;
      isElectric: boolean;
    }> = [];

    // Search in DELHI_ROUTE_REGISTRY
    Object.entries(DELHI_ROUTE_REGISTRY).forEach(([routeId, reg]) => {
      const stops = reg.stops || [reg.startPoint, reg.lastPoint];
      const originIdx = stops.findIndex(
        (s: string) => s.toLowerCase().includes(selectedOrigin.name.toLowerCase()) ||
               selectedOrigin.name.toLowerCase().includes(s.toLowerCase())
      );
      const destIdx = stops.findIndex(
        (s: string) => s.toLowerCase().includes(selectedDest.name.toLowerCase()) ||
               selectedDest.name.toLowerCase().includes(s.toLowerCase())
      );

      if (originIdx !== -1 && destIdx !== -1 && originIdx !== destIdx) {
        const activeCount = buses.filter((b) => b.routeId.toLowerCase() === routeId.toLowerCase()).length;
        const isElectric = buses.some((b) => b.routeId.toLowerCase() === routeId.toLowerCase() && b.type === 'ev');
        results.push({
          routeId,
          routeName: reg.name || `${reg.startPoint} ↔ ${reg.lastPoint}`,
          activeBusesCount: activeCount,
          stopsCount: Math.abs(destIdx - originIdx) + 1,
          isElectric,
        });
      }
    });

    // Also check known routes fallback
    Object.values(DTC_KNOWN_ROUTES).forEach((r) => {
      if (results.some((x) => x.routeId.toLowerCase() === r.routeId.toLowerCase())) return;
      const stops = [r.startPoint, ...(r.viaStops || []), r.lastPoint];
      const originIdx = stops.findIndex(
        (s: string) => s.toLowerCase().includes(selectedOrigin.name.toLowerCase()) ||
               selectedOrigin.name.toLowerCase().includes(s.toLowerCase())
      );
      const destIdx = stops.findIndex(
        (s: string) => s.toLowerCase().includes(selectedDest.name.toLowerCase()) ||
               selectedDest.name.toLowerCase().includes(s.toLowerCase())
      );
      if (originIdx !== -1 && destIdx !== -1 && originIdx !== destIdx) {
        const activeCount = buses.filter((b) => b.routeId.toLowerCase() === r.routeId.toLowerCase()).length;
        results.push({
          routeId: r.routeId,
          routeName: `${r.startPoint} ↔ ${r.lastPoint}`,
          activeBusesCount: activeCount,
          stopsCount: Math.abs(destIdx - originIdx) + 1,
          isElectric: false,
        });
      }
    });

    // If no direct registry match found, show routes operating through either stand
    if (results.length === 0) {
      const originRoutes = selectedOrigin.majorRoutes || selectedOrigin.routes || [];
      const destRoutes = selectedDest.majorRoutes || selectedDest.routes || [];
      const common = originRoutes.filter((r: string) => destRoutes.includes(r));
      common.forEach((r: string) => {
        const activeCount = buses.filter((b) => b.routeId.toLowerCase() === r.toLowerCase()).length;
        results.push({
          routeId: r,
          routeName: `Direct Route ${r}`,
          activeBusesCount: activeCount,
          stopsCount: 15,
          isElectric: false,
        });
      });
    }

    return results;
  }, [selectedOrigin, selectedDest, buses]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ca4a1c]/10 text-[#ca4a1c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">alt_route</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Delhi Bus Stand Route Finder</h2>
              <p className="text-xs text-slate-500 font-medium">Find direct DTC & DIMTS buses connecting any two stands</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Inputs */}
        <div className="py-4 space-y-3">
          {/* Origin */}
          <div className="relative">
            <label className="text-xs font-bold text-slate-700 block mb-1">
              From / प्रारंभिक स्टैंड:
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-emerald-600 text-[20px]">
                trip_origin
              </span>
              <input
                type="text"
                value={selectedOrigin ? selectedOrigin.name : originQuery}
                onChange={(e) => {
                  setSelectedOrigin(null);
                  setOriginQuery(e.target.value);
                }}
                placeholder="e.g. Anand Vihar, Nehru Place, Kashmere Gate..."
                className="w-full h-11 pl-10 pr-9 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#ca4a1c] focus:bg-white"
              />
              {selectedOrigin && (
                <button
                  onClick={() => {
                    setSelectedOrigin(null);
                    setOriginQuery('');
                  }}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[16px]">cancel</span>
                </button>
              )}
            </div>

            {/* Origin Autocomplete List */}
            {originMatches.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden divide-y divide-slate-100">
                {originMatches.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedOrigin(s);
                      setOriginQuery(s.name);
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{s.name}</span>
                      {s.hindi && <span className="text-slate-400 ml-1.5 font-medium">{s.hindi}</span>}
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      {s.category || 'Stand'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-1">
            <button
              onClick={() => {
                const tempOrigin = selectedOrigin;
                const tempOriginQ = originQuery;
                setSelectedOrigin(selectedDest);
                setOriginQuery(destQuery);
                setSelectedDest(tempOrigin);
                setDestQuery(tempOriginQ);
              }}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer shadow-xs"
              title="Swap origin and destination"
            >
              <span className="material-symbols-outlined text-[18px]">swap_vert</span>
            </button>
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="text-xs font-bold text-slate-700 block mb-1">
              To / गंतव्य स्टैंड:
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-rose-600 text-[20px]">
                location_on
              </span>
              <input
                type="text"
                value={selectedDest ? selectedDest.name : destQuery}
                onChange={(e) => {
                  setSelectedDest(null);
                  setDestQuery(e.target.value);
                }}
                placeholder="e.g. AIIMS, Central Secretariat, Dhaula Kuan..."
                className="w-full h-11 pl-10 pr-9 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#ca4a1c] focus:bg-white"
              />
              {selectedDest && (
                <button
                  onClick={() => {
                    setSelectedDest(null);
                    setDestQuery('');
                  }}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[16px]">cancel</span>
                </button>
              )}
            </div>

            {/* Destination Autocomplete List */}
            {destMatches.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden divide-y divide-slate-100">
                {destMatches.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedDest(s);
                      setDestQuery(s.name);
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{s.name}</span>
                      {s.hindi && <span className="text-slate-400 ml-1.5 font-medium">{s.hindi}</span>}
                    </div>
                    <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full font-bold">
                      {s.category || 'Stand'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto min-h-[160px] border-t border-slate-200 pt-3">
          {selectedOrigin && selectedDest ? (
            matchingRoutes.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 mb-2">
                  Found {matchingRoutes.length} connecting route{matchingRoutes.length > 1 ? 's' : ''}:
                </div>
                {matchingRoutes.map((r) => (
                  <div
                    key={r.routeId}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#ca4a1c] bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                          Route {r.routeId}
                        </span>
                        {r.isElectric && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            ⚡ EV
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {r.activeBusesCount} buses running live
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 truncate font-medium">
                        {r.routeName}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onSelectRoute(r.routeId);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-bold whitespace-nowrap cursor-pointer shadow-sm"
                    >
                      Track on Map
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <span className="material-symbols-outlined text-[36px] text-slate-300 mb-1">
                  directions_bus
                </span>
                <p className="text-xs font-semibold">No direct bus route between these two stands.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Try choosing a major interchange hub such as Kashmere Gate, Central Secretariat, or Anand Vihar.</p>
              </div>
            )
          ) : (
            <div className="text-center py-8 text-slate-400">
              <span className="material-symbols-outlined text-[32px] text-slate-300 mb-1">
                route
              </span>
              <p className="text-xs font-medium">Select both origin and destination bus stands above to view active direct buses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
