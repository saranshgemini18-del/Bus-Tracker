import React, { useState, useMemo } from 'react';
import {
  X,
  Bus,
  Navigation,
  ExternalLink,
  Zap,
  Fuel,
  ArrowRight,
  Clock,
  MapPin,
  ChevronRight,
  ChevronDown,
  Route as RouteIcon,
  Radio,
  Gauge,
  Info,
} from 'lucide-react';
import { DTCBus, TransitHub } from '../types';
import { calculateDistanceKm, formatDistance } from '../utils/geo';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DELHI_ROUTE_REGISTRY } from '../data/delhiRouteRegistry';

interface BusStandDetailModalProps {
  hub: TransitHub;
  buses: DTCBus[];
  userCoords?: { lat: number; lng: number } | null;
  onClose: () => void;
  onSelectBus: (bus: DTCBus) => void;
  onSelectRoute: (routeId: string) => void;
}

interface RouteGroup {
  routeId: string;
  startPoint: string;
  lastPoint: string;
  description?: string;
  viaStops: string[];
  activeBuses: DTCBus[];
  closestEtaMins?: number;
  closestDistanceKm?: number;
}

export const BusStandDetailModal: React.FC<BusStandDetailModalProps> = ({
  hub,
  buses,
  userCoords,
  onClose,
  onSelectBus,
  onSelectRoute,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);

  // Distance from user to this stand
  const distanceFromUser = useMemo(() => {
    if (!userCoords) return null;
    const distKm = calculateDistanceKm(userCoords.lat, userCoords.lng, hub.lat, hub.lng);
    const walkMins = Math.max(1, Math.round((distKm * 1000) / 75)); // ~4.5 km/h walking speed
    return {
      distKm,
      formatted: formatDistance(distKm),
      walkMins,
    };
  }, [userCoords, hub.lat, hub.lng]);

  // Aggregate and group routes connected to this stand
  const routeGroups = useMemo<RouteGroup[]>(() => {
    // 1. Gather all candidate routes from hub.majorRoutes and nearby live buses within 4km
    const candidateRouteSet = new Set<string>();

    if (hub.majorRoutes && hub.majorRoutes.length > 0) {
      hub.majorRoutes.forEach((r) => candidateRouteSet.add(r.trim().toUpperCase()));
    }

    // Include routes of any buses located within 4.0 km of this stand
    buses.forEach((b) => {
      const dist = calculateDistanceKm(hub.lat, hub.lng, b.lat, b.lng);
      if (dist <= 4.0 && b.routeId) {
        candidateRouteSet.add(b.routeId.trim().toUpperCase());
      }
    });

    // Fallback if set is empty
    if (candidateRouteSet.size === 0) {
      candidateRouteSet.add('502');
      candidateRouteSet.add('729');
      candidateRouteSet.add('419');
    }

    const groups: RouteGroup[] = [];

    candidateRouteSet.forEach((routeId) => {
      // Find all live buses belonging to this route across the system
      const matchingBuses = buses.filter(
        (b) => b.routeId && b.routeId.trim().toUpperCase() === routeId
      );

      // Sort matching buses by proximity to this bus stand
      matchingBuses.sort((a, b) => {
        const distA = calculateDistanceKm(hub.lat, hub.lng, a.lat, a.lng);
        const distB = calculateDistanceKm(hub.lat, hub.lng, b.lat, b.lng);
        return distA - distB;
      });

      // Calculate closest bus ETA to this stand
      let closestEtaMins: number | undefined;
      let closestDistanceKm: number | undefined;

      if (matchingBuses.length > 0) {
        const closestBus = matchingBuses[0];
        closestDistanceKm = calculateDistanceKm(hub.lat, hub.lng, closestBus.lat, closestBus.lng);
        const speed = Math.max(15, closestBus.speedKmH || 20);
        closestEtaMins = Math.max(1, Math.round((closestDistanceKm / speed) * 60));
      }

      // Lookup official route details
      const known = DTC_KNOWN_ROUTES[routeId];
      const registry = DELHI_ROUTE_REGISTRY[routeId];

      const startPoint =
        known?.startPoint ||
        registry?.startPoint ||
        (matchingBuses[0]?.originTerminal) ||
        'Delhi Terminal';

      const lastPoint =
        known?.lastPoint ||
        registry?.lastPoint ||
        (matchingBuses[0]?.destinationTerminal) ||
        'Central Delhi';

      const viaStops = known?.viaStops || ['Key Transit Interchange', 'Ring Road Corridor'];
      const description = known?.description || registry?.description;

      groups.push({
        routeId,
        startPoint,
        lastPoint,
        description,
        viaStops,
        activeBuses: matchingBuses,
        closestEtaMins,
        closestDistanceKm,
      });
    });

    // Sort: routes with active buses first, then by closest ETA, then alphabetically
    groups.sort((a, b) => {
      if (a.activeBuses.length > 0 && b.activeBuses.length === 0) return -1;
      if (a.activeBuses.length === 0 && b.activeBuses.length > 0) return 1;
      if (a.closestEtaMins && b.closestEtaMins) return a.closestEtaMins - b.closestEtaMins;
      return a.routeId.localeCompare(b.routeId, undefined, { numeric: true });
    });

    return groups;
  }, [hub, buses]);

  // Filter routes by search query
  const filteredRouteGroups = useMemo(() => {
    if (!searchQuery.trim()) return routeGroups;
    const q = searchQuery.toLowerCase().trim();
    return routeGroups.filter(
      (rg) =>
        rg.routeId.toLowerCase().includes(q) ||
        rg.startPoint.toLowerCase().includes(q) ||
        rg.lastPoint.toLowerCase().includes(q) ||
        rg.activeBuses.some((b) => b.id.toLowerCase().includes(q))
    );
  }, [routeGroups, searchQuery]);

  // Total active buses connected to this stand
  const totalActiveBuses = useMemo(() => {
    return routeGroups.reduce((acc, rg) => acc + rg.activeBuses.length, 0);
  }, [routeGroups]);

  return (
    <div
      id="bus-stand-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[88vh] rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden text-slate-900 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* MODAL HEADER: Stand Information & Coordinates                             */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-[#1e293b] text-white shrink-0 relative">
          <button
            id="close-stand-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-red-500/80 text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-white/20 shadow-xs"
            title="Close Bus Stand Details"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>

          <div className="flex items-start gap-3.5 pr-10">
            <div className="w-11 h-11 rounded-2xl bg-[#ca4a1c] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#ca4a1c]/30 mt-0.5">
              <Bus className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-white/15 text-slate-200 text-[10px] font-extrabold uppercase tracking-wider">
                  {hub.type || 'DTC Bus Stand'}
                </span>
                {hub.zone && (
                  <span className="text-[11px] text-slate-300 font-medium">
                    {hub.zone}
                  </span>
                )}
                {distanceFromUser && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    <Navigation className="w-2.5 h-2.5" />
                    {distanceFromUser.formatted} away ({distanceFromUser.walkMins} min walk)
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white mt-1 leading-tight">
                {hub.name}
              </h2>

              {hub.description && (
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">
                  {hub.description}
                </p>
              )}

              <div className="mt-2.5 flex items-center gap-3 text-[11px] text-slate-300 flex-wrap">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {hub.lat.toFixed(4)}°N, {hub.lng.toFixed(4)}°E
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>{totalActiveBuses} Live GPS Buses Available</span>
                </div>
                <span>•</span>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hub.lat},${hub.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 underline font-semibold transition cursor-pointer"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SEARCH & FILTER BAR                                                       */}
        {/* ========================================================================= */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search route (e.g. 502, 729) or bus number (e.g. DL1PD)..."
              className="w-full h-8 pl-8 pr-8 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ca4a1c]"
            />
            <span className="absolute left-2.5 top-2 text-slate-400">
              <Bus className="w-3.5 h-3.5" />
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-[11px] font-bold text-slate-600 shrink-0">
            {filteredRouteGroups.length} Routes
          </span>
        </div>

        {/* ========================================================================= */}
        {/* ROUTES & ACTIVE BUSES LIST                                                */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f8fafc]">
          {filteredRouteGroups.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-xl border border-slate-200">
              <Bus className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700 text-sm mt-2">No matching routes found</p>
              <p className="text-xs text-slate-500 mt-0.5">Try searching with a different route number.</p>
            </div>
          ) : (
            filteredRouteGroups.map((rg) => {
              const hasActiveBuses = rg.activeBuses.length > 0;
              const isExpanded = expandedRouteId === rg.routeId;

              return (
                <div
                  key={rg.routeId}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                >
                  {/* Route Header Row */}
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                    {/* Route badge & start/last point */}
                    <div className="flex items-start sm:items-center gap-3">
                      {/* Clickable Route Number Badge */}
                      <button
                        onClick={() => {
                          onSelectRoute(rg.routeId);
                          onClose();
                        }}
                        className="group flex flex-col items-center justify-center px-3 py-1.5 rounded-xl bg-gradient-to-br from-[#006d42] to-[#004f30] text-white shadow-sm hover:from-[#a83301] hover:to-[#842500] transition cursor-pointer shrink-0"
                        title={`Click to view Route ${rg.routeId} details and full timeline on map`}
                      >
                        <span className="text-sm font-black tracking-tight leading-none group-hover:scale-105 transition-transform">
                          {rg.routeId}
                        </span>
                        <span className="text-[8px] font-bold opacity-80 uppercase mt-0.5 tracking-wider">
                          Route
                        </span>
                      </button>

                      <div>
                        {/* Origin -> Destination */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 flex-wrap">
                          <span>{rg.startPoint}</span>
                          <ArrowRight className="w-3 h-3 text-[#ca4a1c] shrink-0" />
                          <span>{rg.lastPoint}</span>
                        </div>

                        {/* Status Strip: Active buses count & ETA */}
                        <div className="flex items-center gap-2 mt-1 text-[11px] flex-wrap">
                          {hasActiveBuses ? (
                            <>
                              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                                {rg.activeBuses.length === 1
                                  ? '1 Bus Running'
                                  : `${rg.activeBuses.length} Buses in this Route`}
                              </span>

                              {rg.closestEtaMins !== undefined && (
                                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  Nearest: <strong>~{rg.closestEtaMins} min</strong> ({rg.closestDistanceKm?.toFixed(1)} km)
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-slate-500 italic bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">
                              Scheduled DTC service • Next dispatch ~10-15 mins
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: View Route Details & Toggle */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => setExpandedRouteId(isExpanded ? null : rg.routeId)}
                        className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                        title="Show/Hide route stops and details"
                      >
                        <Info className="w-3.5 h-3.5 text-slate-500" />
                        <span className="hidden sm:inline">Route Info</span>
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          onSelectRoute(rg.routeId);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <RouteIcon className="w-3.5 h-3.5" />
                        <span>View on Map</span>
                      </button>
                    </div>
                  </div>

                  {/* =============================================================== */}
                  {/* MULTIPLE BUSES ON SAME ROUTE: SHOW ONE BY ONE IN A LINE         */}
                  {/* =============================================================== */}
                  {hasActiveBuses && (
                    <div className="px-3.5 py-2.5 bg-slate-50/80 border-t border-slate-100">
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
                        <span>
                          {rg.activeBuses.length === 1
                            ? 'Live Bus Active on this Route (Click bus to track):'
                            : `All ${rg.activeBuses.length} Buses Operating on Route ${rg.routeId} (Click any bus to inspect):`}
                        </span>
                        <span className="text-[9px] text-slate-400 font-normal">
                          Numbered Sequence #1 to #{rg.activeBuses.length}
                        </span>
                      </div>

                      {/* Display buses one by one in a numbered line / row */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {rg.activeBuses.map((bus, idx) => {
                          const distToStand = calculateDistanceKm(hub.lat, hub.lng, bus.lat, bus.lng);
                          const speed = Math.max(15, bus.speedKmH || 20);
                          const etaMins = Math.max(1, Math.round((distToStand / speed) * 60));
                          const isEv = bus.type === 'ev';

                          return (
                            <button
                              key={bus.id}
                              onClick={() => {
                                onSelectRoute(bus.routeId);
                                onSelectBus(bus);
                                onClose();
                              }}
                              className="group shrink-0 p-2 sm:p-2.5 rounded-xl bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-[#ca4a1c] shadow-xs hover:shadow-md transition-all text-left flex items-center gap-2.5 cursor-pointer min-w-[210px]"
                              title={`Click to inspect and follow Bus ${bus.id} on Live Map`}
                            >
                              {/* Number Badge: #1, #2, #3... */}
                              <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-[#ca4a1c] text-white flex items-center justify-center font-black text-xs shrink-0 transition-colors shadow-xs">
                                #{idx + 1}
                              </div>

                              <div className="flex-1 min-w-0">
                                {/* Plate / Vehicle ID & EV/CNG */}
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono font-black text-xs text-slate-900 group-hover:text-[#ca4a1c] truncate">
                                    {bus.id}
                                  </span>
                                  {isEv ? (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold shrink-0">
                                      <Zap className="w-2.5 h-2.5 text-emerald-600" />
                                      EV
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[9px] font-bold shrink-0">
                                      <Fuel className="w-2.5 h-2.5 text-indigo-600" />
                                      CNG
                                    </span>
                                  )}
                                </div>

                                {/* Live speed & distance */}
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5 font-medium">
                                  <span className="flex items-center gap-0.5">
                                    <Gauge className="w-2.5 h-2.5 text-slate-400" />
                                    {bus.speedKmH} km/h
                                  </span>
                                  <span>•</span>
                                  <span className="text-emerald-700 font-bold">
                                    ~{etaMins}m ({distToStand.toFixed(1)} km)
                                  </span>
                                </div>
                              </div>

                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ca4a1c] group-hover:translate-x-0.5 transition-all shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Expanded Route Details Panel */}
                  {isExpanded && (
                    <div className="p-3.5 bg-slate-100/70 border-t border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">
                          Route Corridor Overview / मार्ग विवरण
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {rg.viaStops.length + 2} Total Key Stops
                        </span>
                      </div>

                      {rg.description && (
                        <p className="text-slate-600 text-[11px]">
                          {rg.description}
                        </p>
                      )}

                      {/* Route Path Stops Chips */}
                      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
                        <span className="px-2 py-1 rounded-md bg-white border border-slate-200 font-bold text-[10px] text-[#006d42] shrink-0">
                          {rg.startPoint}
                        </span>
                        {rg.viaStops.slice(0, 4).map((stop, i) => (
                          <React.Fragment key={i}>
                            <ArrowRight className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-700 shrink-0">
                              {stop}
                            </span>
                          </React.Fragment>
                        ))}
                        <ArrowRight className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                        <span className="px-2 py-1 rounded-md bg-white border border-slate-200 font-bold text-[10px] text-[#ca4a1c] shrink-0">
                          {rg.lastPoint}
                        </span>
                      </div>

                      <div className="flex items-center justify-end pt-1">
                        <button
                          onClick={() => {
                            onSelectRoute(rg.routeId);
                            onClose();
                          }}
                          className="text-[11px] font-bold text-[#ca4a1c] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Full Stop Timeline on Live Map</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ========================================================================= */}
        {/* FOOTER                                                                    */}
        {/* ========================================================================= */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span>Official Delhi DTC & DIMTS Live Open Transit Network</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
