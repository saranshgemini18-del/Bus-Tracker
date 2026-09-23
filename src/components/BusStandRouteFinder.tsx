import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DTCBus, TransitHub } from '../types';
import { ALL_DTC_BUS_STANDS, findNearestStandFromAll, DELHI_HUBS } from '../data/terminals';
import { calculateDistanceKm, formatDistance } from '../utils/geo';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DELHI_ROUTE_REGISTRY } from '../data/delhiRouteRegistry';
import { normalizeRouteId, formatEtaClockTime } from '../utils/routeResolver';
import { useFavoriteRoutes } from '../utils/favoriteRoutes';

interface BusStandRouteFinderProps {
  buses: DTCBus[];
  onSelectRoute: (routeId: string) => void;
  onSelectBus: (bus: DTCBus) => void;
  onClose?: () => void;
}

export interface MatchingRouteResult {
  routeId: string;
  normalizedRouteId: string;
  startPoint: string;
  lastPoint: string;
  description: string;
  operator: string;
  hasElectricBuses: boolean;
  distanceKm: number;
  estMinutes: number;
  activeBusesCount: number;
  buses: DTCBus[];
  nextBusEtaMins?: number;
  fare: { ac: string; nonAc: string; womenPass: string };
  matchType: 'direct' | 'corridor' | 'hub';
}

export const BusStandRouteFinder: React.FC<BusStandRouteFinderProps> = ({
  buses,
  onSelectRoute,
  onSelectBus,
  onClose,
}) => {
  const { isFavorite, toggleFavorite } = useFavoriteRoutes();

  // Search state
  const [startQuery, setStartQuery] = useState('Kashmere Gate ISBT');
  const [destQuery, setDestQuery] = useState('Central Secretariat Terminal');
  const [selectedStartStand, setSelectedStartStand] = useState<TransitHub | null>(null);
  const [selectedDestStand, setSelectedDestStand] = useState<TransitHub | null>(null);

  // Autocomplete dropdowns
  const [showStartSuggestions, setShowStartSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);

  // Selected route for expanded bus roster details
  const [expandedRouteId, setExpandedRouteId] = useState<string | null>(null);

  const startInputRef = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);

  // Quick preset hubs for one-tap selection
  const popularStartHubs = [
    'Kashmere Gate ISBT',
    'Anand Vihar ISBT',
    'Shivaji Stadium Terminal',
    'Uttam Nagar Terminal',
    'Nehru Place Terminal',
    'AIIMS / Safdarjung',
  ];

  const popularDestHubs = [
    'Central Secretariat Terminal',
    'Connaught Place',
    'Old Delhi Railway Station',
    'Mehrauli Terminal',
    'Dhaula Kuan',
    'Sarai Kale Khan ISBT',
  ];

  // Initialize starting stands
  useEffect(() => {
    const sStand = ALL_DTC_BUS_STANDS.find(
      (s) => s.name.toLowerCase() === startQuery.toLowerCase()
    ) || ALL_DTC_BUS_STANDS[0];
    const dStand = ALL_DTC_BUS_STANDS.find(
      (s) => s.name.toLowerCase() === destQuery.toLowerCase()
    ) || ALL_DTC_BUS_STANDS[4];
    setSelectedStartStand(sStand);
    setSelectedDestStand(dStand);
  }, []);

  // Filter start stand suggestions
  const startSuggestions = useMemo(() => {
    if (!startQuery.trim()) return ALL_DTC_BUS_STANDS.slice(0, 8);
    const q = startQuery.toLowerCase();
    return ALL_DTC_BUS_STANDS.filter(
      (s) => s.name.toLowerCase().includes(q) || (s.zone && s.zone.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [startQuery]);

  // Filter destination stand suggestions
  const destSuggestions = useMemo(() => {
    if (!destQuery.trim()) return ALL_DTC_BUS_STANDS.slice(0, 8);
    const q = destQuery.toLowerCase();
    return ALL_DTC_BUS_STANDS.filter(
      (s) => s.name.toLowerCase().includes(q) || (s.zone && s.zone.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [destQuery]);

  // Group active buses by normalized route ID
  const busesByNormalizedRoute = useMemo(() => {
    const map = new Map<string, DTCBus[]>();
    for (const b of buses) {
      const norm = normalizeRouteId(b.routeId).toUpperCase();
      if (!map.has(norm)) map.set(norm, []);
      map.get(norm)!.push(b);
    }
    return map;
  }, [buses]);

  // Reverse Start and Destination stands
  const handleSwapStands = () => {
    const prevStartQ = startQuery;
    const prevStartS = selectedStartStand;
    setStartQuery(destQuery);
    setSelectedStartStand(selectedDestStand);
    setDestQuery(prevStartQ);
    setSelectedDestStand(prevStartS);
  };

  // Locate User GPS and set nearest bus stand as Start Stand
  const handleUseGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { hub, distanceKm } = findNearestStandFromAll(pos.coords.latitude, pos.coords.longitude);
        setSelectedStartStand(hub);
        setStartQuery(hub.name);
        setIsLocatingUser(false);
      },
      () => {
        setIsLocatingUser(false);
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  };

  // Find all routes that connect Start Stand and Destination Stand
  const matchingRoutes: MatchingRouteResult[] = useMemo(() => {
    if (!selectedStartStand || !selectedDestStand) return [];

    const startLat = selectedStartStand.lat;
    const startLng = selectedStartStand.lng;
    const destLat = selectedDestStand.lat;
    const destLng = selectedDestStand.lng;
    const sName = selectedStartStand.name.toLowerCase();
    const dName = selectedDestStand.name.toLowerCase();

    const directDistKm = Math.max(1, calculateDistanceKm(startLat, startLng, destLat, destLng));
    const results: MatchingRouteResult[] = [];
    const seenRoutes = new Set<string>();

    // 1. Check DTC_KNOWN_ROUTES
    for (const [rId, route] of Object.entries(DTC_KNOWN_ROUTES)) {
      const allStops = [route.startPoint, ...route.viaStops, route.lastPoint].map((s) => s.toLowerCase());
      const hasStart = allStops.some((s) => s.includes(sName) || sName.includes(s));
      const hasDest = allStops.some((s) => s.includes(dName) || dName.includes(s));

      const norm = normalizeRouteId(rId).toUpperCase();
      const activeBuses = busesByNormalizedRoute.get(norm) || [];

      if ((hasStart && hasDest) || (hasStart && directDistKm < 15) || (hasDest && directDistKm < 15)) {
        if (!seenRoutes.has(norm)) {
          seenRoutes.add(norm);

          // Calculate next arriving bus ETA to start stand
          let minEtaMins = 999;
          activeBuses.forEach((b) => {
            const distToStart = calculateDistanceKm(b.lat, b.lng, startLat, startLng);
            const speed = Math.max(15, b.speedKmH || 20);
            const eta = Math.max(1, Math.round((distToStart / speed) * 60));
            if (eta < minEtaMins) minEtaMins = eta;
          });

          const estMin = Math.round((directDistKm / 22) * 60 + 6);
          results.push({
            routeId: rId,
            normalizedRouteId: norm,
            startPoint: route.startPoint,
            lastPoint: route.lastPoint,
            description: route.description || '',
            operator: 'Delhi Transport Corporation (DTC)',
            hasElectricBuses: activeBuses.some((b) => b.type === 'ev'),
            distanceKm: Math.round(directDistKm * 10) / 10,
            estMinutes: estMin,
            activeBusesCount: activeBuses.length,
            buses: activeBuses,
            nextBusEtaMins: minEtaMins === 999 ? undefined : minEtaMins,
            fare: {
              ac: '₹10 - ₹25',
              nonAc: '₹5 - ₹15',
              womenPass: 'Free Gulabi Ticket (गुलाबी पास)',
            },
            matchType: hasStart && hasDest ? 'direct' : 'corridor',
          });
        }
      }
    }

    // 2. Check majorRoutes on Start and Destination stands
    const startMajor = (selectedStartStand.majorRoutes || []).map((r) => normalizeRouteId(r).toUpperCase());
    const destMajor = (selectedDestStand.majorRoutes || []).map((r) => normalizeRouteId(r).toUpperCase());
    const commonRoutes = startMajor.filter((r) => destMajor.includes(r));

    for (const rId of commonRoutes) {
      if (!seenRoutes.has(rId)) {
        seenRoutes.add(rId);
        const activeBuses = busesByNormalizedRoute.get(rId) || [];
        const reg = DELHI_ROUTE_REGISTRY[rId];

        let minEtaMins = 999;
        activeBuses.forEach((b) => {
          const distToStart = calculateDistanceKm(b.lat, b.lng, startLat, startLng);
          const speed = Math.max(15, b.speedKmH || 20);
          const eta = Math.max(1, Math.round((distToStart / speed) * 60));
          if (eta < minEtaMins) minEtaMins = eta;
        });

        const estMin = Math.round((directDistKm / 22) * 60 + 8);
        results.push({
          routeId: rId,
          normalizedRouteId: rId,
          startPoint: reg?.startPoint || selectedStartStand.name,
          lastPoint: reg?.lastPoint || selectedDestStand.name,
          description: reg?.description || `High-frequency Delhi transit route connecting ${selectedStartStand.name} and ${selectedDestStand.name}`,
          operator: reg?.operator || 'DTC Electric / Cluster',
          hasElectricBuses: activeBuses.some((b) => b.type === 'ev'),
          distanceKm: Math.round(directDistKm * 10) / 10,
          estMinutes: estMin,
          activeBusesCount: activeBuses.length,
          buses: activeBuses,
          nextBusEtaMins: minEtaMins === 999 ? undefined : minEtaMins,
          fare: {
            ac: '₹10 - ₹25',
            nonAc: '₹5 - ₹15',
            womenPass: 'Free Gulabi Ticket (गुलाबी पास)',
          },
          matchType: 'direct',
        });
      }
    }

    // 3. Check DELHI_ROUTE_REGISTRY for matching terminal corridors
    for (const [key, reg] of Object.entries(DELHI_ROUTE_REGISTRY)) {
      if (results.length >= 8) break;
      const norm = normalizeRouteId(reg.displayRoute || key).toUpperCase();
      if (seenRoutes.has(norm)) continue;

      const rStart = reg.startPoint.toLowerCase();
      const rLast = reg.lastPoint.toLowerCase();
      const connects =
        (rStart.includes(sName) && rLast.includes(dName)) ||
        (rStart.includes(dName) && rLast.includes(sName));

      if (connects) {
        seenRoutes.add(norm);
        const activeBuses = busesByNormalizedRoute.get(norm) || [];
        let minEtaMins = 999;
        activeBuses.forEach((b) => {
          const distToStart = calculateDistanceKm(b.lat, b.lng, startLat, startLng);
          const speed = Math.max(15, b.speedKmH || 20);
          const eta = Math.max(1, Math.round((distToStart / speed) * 60));
          if (eta < minEtaMins) minEtaMins = eta;
        });

        results.push({
          routeId: reg.displayRoute || key,
          normalizedRouteId: norm,
          startPoint: reg.startPoint,
          lastPoint: reg.lastPoint,
          description: reg.description || `Delhi Bus Route ${reg.displayRoute}`,
          operator: reg.operator || 'DTC',
          hasElectricBuses: activeBuses.some((b) => b.type === 'ev'),
          distanceKm: Math.round(directDistKm * 10) / 10,
          estMinutes: Math.round((directDistKm / 22) * 60 + 6),
          activeBusesCount: activeBuses.length,
          buses: activeBuses,
          nextBusEtaMins: minEtaMins === 999 ? undefined : minEtaMins,
          fare: {
            ac: '₹10 - ₹25',
            nonAc: '₹5 - ₹15',
            womenPass: 'Free Gulabi Ticket (गुलाबी पास)',
          },
          matchType: 'direct',
        });
      }
    }

    // Sort: routes with active live buses first, then by next arrival ETA
    results.sort((a, b) => {
      if (a.activeBusesCount > 0 && b.activeBusesCount === 0) return -1;
      if (b.activeBusesCount > 0 && a.activeBusesCount === 0) return 1;
      return (a.nextBusEtaMins || 999) - (b.nextBusEtaMins || 999);
    });

    return results;
  }, [selectedStartStand, selectedDestStand, busesByNormalizedRoute]);

  return (
    <div className="w-full h-full flex flex-col bg-[#FAF8F5] overflow-hidden">
      {/* Header Bar */}
      <div className="px-4 sm:px-6 py-4 bg-white border-b border-slate-200 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#a83301] to-[#ca4a1c] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[24px]">alt_route</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Search Routes by Bus Stands</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#006d42] text-white font-extrabold uppercase">
                Live DTC Telemetry
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              प्रारंभिक व गंतव्य बस स्टैंड द्वारा बस रूट और बसों का विवरण
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            title="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Origin & Destination Inputs Card */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-200/80 shadow-xs shrink-0">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Start Bus Stand Input */}
          <div className="flex-1 relative">
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Start Bus Stand (प्रारंभिक स्टैंड)</span>
              </span>
              <button
                type="button"
                onClick={handleUseGpsLocation}
                disabled={isLocatingUser}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-0.5 normal-case cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">my_location</span>
                <span>{isLocatingUser ? 'Locating...' : 'Use My GPS'}</span>
              </button>
            </label>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-emerald-600 text-[18px]">
                location_on
              </span>
              <input
                ref={startInputRef}
                type="text"
                value={startQuery}
                onFocus={() => setShowStartSuggestions(true)}
                onChange={(e) => {
                  setStartQuery(e.target.value);
                  setShowStartSuggestions(true);
                }}
                placeholder="Search start stand (e.g. Kashmere Gate, AIIMS, Rohini)..."
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-300 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006d42] transition"
              />
            </div>

            {/* Start Stand Autocomplete Dropdown */}
            {showStartSuggestions && startSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-40 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-60 overflow-y-auto">
                <div className="p-2 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  DTC Bus Stands ({startSuggestions.length})
                </div>
                {startSuggestions.map((stand) => (
                  <button
                    key={stand.id}
                    type="button"
                    onClick={() => {
                      setSelectedStartStand(stand);
                      setStartQuery(stand.name);
                      setShowStartSuggestions(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-emerald-50 transition flex items-center justify-between gap-2 border-b border-slate-50 last:border-0 cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800">{stand.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {stand.zone || 'Delhi Transit'} • {stand.type}
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold shrink-0">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="self-center md:mt-5">
            <button
              type="button"
              onClick={handleSwapStands}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 flex items-center justify-center transition shadow-xs cursor-pointer active:rotate-180 duration-200"
              title="Reverse Start and Destination Stands"
            >
              <span className="material-symbols-outlined text-[20px]">swap_vert</span>
            </button>
          </div>

          {/* Destination Bus Stand Input */}
          <div className="flex-1 relative">
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Destination Bus Stand (गंतव्य स्टैंड)</span>
            </label>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-rose-600 text-[18px]">
                flag
              </span>
              <input
                ref={destInputRef}
                type="text"
                value={destQuery}
                onFocus={() => setShowDestSuggestions(true)}
                onChange={(e) => {
                  setDestQuery(e.target.value);
                  setShowDestSuggestions(true);
                }}
                placeholder="Search destination stand (e.g. Connaught Place, Dhaula Kuan)..."
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-300 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#a83301] transition"
              />
            </div>

            {/* Destination Stand Autocomplete Dropdown */}
            {showDestSuggestions && destSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-40 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-60 overflow-y-auto">
                <div className="p-2 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  DTC Bus Stands ({destSuggestions.length})
                </div>
                {destSuggestions.map((stand) => (
                  <button
                    key={stand.id}
                    type="button"
                    onClick={() => {
                      setSelectedDestStand(stand);
                      setDestQuery(stand.name);
                      setShowDestSuggestions(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-rose-50 transition flex items-center justify-between gap-2 border-b border-slate-50 last:border-0 cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800">{stand.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {stand.zone || 'Delhi Transit'} • {stand.type}
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold shrink-0">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Hub Shortcut Chips */}
        <div className="max-w-4xl mx-auto mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Popular:</span>
          {popularStartHubs.map((hub) => (
            <button
              key={hub}
              type="button"
              onClick={() => {
                const found = ALL_DTC_BUS_STANDS.find((s) => s.name.toLowerCase().includes(hub.toLowerCase()));
                if (found) {
                  setSelectedStartStand(found);
                  setStartQuery(found.name);
                }
              }}
              className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-bold text-slate-600 transition shrink-0 cursor-pointer"
            >
              From {hub.split(' ')[0]}
            </button>
          ))}
          {popularDestHubs.map((hub) => (
            <button
              key={hub}
              type="button"
              onClick={() => {
                const found = ALL_DTC_BUS_STANDS.find((s) => s.name.toLowerCase().includes(hub.toLowerCase()));
                if (found) {
                  setSelectedDestStand(found);
                  setDestQuery(found.name);
                }
              }}
              className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-800 text-[11px] font-bold text-slate-600 transition shrink-0 cursor-pointer"
            >
              To {hub.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Summary Banner */}
          <div className="flex items-center justify-between flex-wrap gap-2 px-1">
            <div className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-black text-xs">
                {matchingRoutes.length}
              </span>
              <span>Available Bus Routes Connecting Stands</span>
            </div>
            {selectedStartStand && selectedDestStand && (
              <div className="text-xs text-slate-500 font-medium">
                Corridor Distance: ~{Math.round(calculateDistanceKm(selectedStartStand.lat, selectedStartStand.lng, selectedDestStand.lat, selectedDestStand.lng))} km
              </div>
            )}
          </div>

          {/* No Routes Found */}
          {matchingRoutes.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined text-[36px]">directions_bus</span>
              </div>
              <h3 className="text-base font-bold text-slate-800">No direct bus routes found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                No direct bus service operates between "{selectedStartStand?.name}" and "{selectedDestStand?.name}".
                Try choosing a major transit hub such as <strong>Central Secretariat</strong>, <strong>Kashmere Gate ISBT</strong>, or <strong>Shivaji Stadium</strong> as a transfer point.
              </p>
            </div>
          ) : (
            matchingRoutes.map((route) => {
              const isExpanded = expandedRouteId === route.normalizedRouteId;
              const isFav = isFavorite(route.normalizedRouteId);

              return (
                <div
                  key={route.normalizedRouteId}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Route Header Card */}
                  <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      {/* Route Number Badge */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a83301] to-[#ca4a1c] text-white flex flex-col items-center justify-center font-black shadow-md shrink-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">Route</span>
                        <span className="text-lg font-black leading-none">{route.routeId}</span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm sm:text-base font-black text-slate-900">
                            {route.startPoint} ➔ {route.lastPoint}
                          </h4>
                          {route.hasElectricBuses && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">electric_bolt</span>
                              <span>EV Active</span>
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {route.operator}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{route.description}</p>

                        {/* Live Telemetry Metrics */}
                        <div className="mt-2.5 flex items-center gap-3 flex-wrap text-xs font-semibold text-slate-600">
                          {/* Live buses running */}
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="font-bold text-emerald-800">
                              {route.activeBusesCount > 0
                                ? `${route.activeBusesCount} Live Buses Active`
                                : 'Scheduled Route'}
                            </span>
                          </div>

                          {/* Next bus arrival */}
                          {route.nextBusEtaMins !== undefined && (
                            <div className="flex items-center gap-1 text-slate-700">
                              <span className="material-symbols-outlined text-[16px] text-amber-600">
                                schedule
                              </span>
                              <span>
                                Next Bus to Start: <strong className="text-slate-900 font-extrabold">{route.nextBusEtaMins} mins</strong>
                              </span>
                            </div>
                          )}

                          {/* Trip duration */}
                          <div className="flex items-center gap-1 text-slate-500">
                            <span className="material-symbols-outlined text-[16px]">timer</span>
                            <span>~{route.estMinutes} mins full trip</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                      {/* Toggle Bus Details */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedRouteId((prev) => (prev === route.normalizedRouteId ? null : route.normalizedRouteId))
                        }
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isExpanded
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isExpanded ? 'expand_less' : 'directions_bus'}
                        </span>
                        <span>{isExpanded ? 'Hide Bus Details' : `Bus Details (${route.buses.length})`}</span>
                      </button>

                      {/* Track Route on Map */}
                      <button
                        type="button"
                        onClick={() => onSelectRoute(route.normalizedRouteId)}
                        className="px-4 py-2 rounded-xl bg-[#006d42] hover:bg-[#005232] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">map</span>
                        <span>Track Route</span>
                      </button>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(route.normalizedRouteId)}
                        className={`p-2 rounded-xl border transition cursor-pointer ${
                          isFav
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-slate-50'
                        }`}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isFav ? 'star' : 'star_border'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Bus Details Roster */}
                  {isExpanded && (
                    <div className="bg-slate-50 border-t border-slate-200/80 p-4 sm:p-5 animate-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-[#a83301]">
                            commute
                          </span>
                          <span>Active Buses on Route {route.routeId} ({route.buses.length} Vehicles)</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-semibold">
                          Fare: AC {route.fare.ac} • Non-AC {route.fare.nonAc} • {route.fare.womenPass}
                        </div>
                      </div>

                      {route.buses.length === 0 ? (
                        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500 font-medium">
                          No active GPS transponders currently broadcasting for this route. Scheduled frequency is approximately every 8-12 minutes.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {route.buses.map((bus) => {
                            const distToStart = calculateDistanceKm(
                              bus.lat,
                              bus.lng,
                              selectedStartStand!.lat,
                              selectedStartStand!.lng
                            );
                            const busSpeed = bus.speedKmH || 20;
                            const busEtaMins = Math.max(1, Math.round((distToStart / busSpeed) * 60));

                            return (
                              <div
                                key={bus.id}
                                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between gap-2.5"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                        {bus.id}
                                      </span>
                                      <span
                                        className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                          bus.type === 'ev'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-indigo-100 text-indigo-800'
                                        }`}
                                      >
                                        {bus.type === 'ev' ? 'Electric AC' : 'CNG Low-Floor'}
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-slate-500 mt-1">
                                      Model: {bus.busModel || (bus.type === 'ev' ? 'Tata Ultra 9/12m EV' : 'DTC Low-Floor CNG')}
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-xs font-black text-emerald-700">
                                      ~{busEtaMins} mins away
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      {formatDistance(distToStart)} from stand
                                    </div>
                                  </div>
                                </div>

                                {/* Bus Live Stats */}
                                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                                  <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px] text-slate-400">
                                      speed
                                    </span>
                                    <span>{bus.speedKmH ? `${Math.round(bus.speedKmH)} km/h` : 'Moving'}</span>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px] text-slate-400">
                                      group
                                    </span>
                                    <span>
                                      {bus.crowdingStatus === 'crowded'
                                        ? 'Crowded 🔴'
                                        : bus.crowdingStatus === 'moderate'
                                        ? 'Moderate 🟡'
                                        : 'Seats Available 🟢'}
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => onSelectBus(bus)}
                                    className="px-2.5 py-1 rounded-lg bg-[#a83301] hover:bg-[#8c2a01] text-white text-[10px] font-bold transition cursor-pointer flex items-center gap-1 shadow-xs"
                                  >
                                    <span className="material-symbols-outlined text-[12px]">gps_fixed</span>
                                    <span>Track Bus</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
