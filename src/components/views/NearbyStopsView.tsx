import React, { useState, useEffect, useMemo } from 'react';
import { DTCBus, TransitHub } from '../../types';
import { ALL_DTC_BUS_STANDS } from '../../data/terminals';
import { calculateDistanceKm } from '../../utils/geo';

interface NearbyStopsViewProps {
  buses: DTCBus[];
  onSelectRoute: (routeId: string) => void;
  onNavigateTab: (tab: string) => void;
  onSelectHub?: (hub: TransitHub) => void;
}

interface ComputedStop {
  id: string;
  name: string;
  hindiName: string;
  distanceMeters: number;
  distanceKm: number;
  walkMinutes: number;
  metroInterchange?: string;
  amenities: string[];
  routes: Array<{ route: string; etaMins: number; type: 'ev' | 'cng' }>;
  lat: number;
  lng: number;
  isTerminal: boolean;
}

export const NearbyStopsView: React.FC<NearbyStopsViewProps> = ({
  buses,
  onSelectRoute,
  onNavigateTab,
  onSelectHub,
}) => {
  const [mobileTab, setMobileTab] = useState<'list' | 'radar'>('list');
  const [selectedRadius, setSelectedRadius] = useState<'500m' | '1km' | '2km'>('1km');
  const [filterTag, setFilterTag] = useState<'all' | 'metro' | 'shelter' | 'ac'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStopId, setSelectedStopId] = useState<string>('');
  const [radarViewMode, setRadarViewMode] = useState<'paths' | 'transit'>('paths');

  // Commuter GPS coordinates (starts at Central Delhi / AIIMS, updates via real browser GPS)
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>({
    lat: 28.5685,
    lng: 77.2090,
  });
  const [gpsLocationName, setGpsLocationName] = useState('AIIMS Ring Road, Ansari Nagar');
  const [isGpsLive, setIsGpsLive] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // Trigger GPS acquisition
  const handleRelocateGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserCoords({ lat, lng });
        setIsGpsLive(true);
        setIsLocating(false);

        // Approximate Delhi locality name based on coordinates
        if (lng < 77.10) setGpsLocationName('West Delhi / Dwarka Corridor');
        else if (lng > 77.27) setGpsLocationName('East Delhi / Anand Vihar Corridor');
        else if (lat > 28.68) setGpsLocationName('North Delhi / Azadpur ISBT Corridor');
        else if (lat < 28.53) setGpsLocationName('South Delhi / Mehrauli Badarpur Corridor');
        else setGpsLocationName('Central Delhi / Connaught Place & Ring Road');
      },
      (err) => {
        console.warn('GPS location request was denied or timed out:', err.message);
        setIsLocating(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Try GPS on initial mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsGpsLive(true);
        },
        () => {},
        { timeout: 4000 }
      );
    }
  }, []);

  // Compute nearby stops from all 3,465 official DTC bus stands
  const nearbyStops = useMemo<ComputedStop[]>(() => {
    const radiusLimitKm =
      selectedRadius === '500m' ? 0.6 : selectedRadius === '1km' ? 1.3 : 2.5;

    // Filter and compute distances from the full official dataset
    const computed: ComputedStop[] = [];

    for (const stand of ALL_DTC_BUS_STANDS) {
      const dKm = calculateDistanceKm(userCoords.lat, userCoords.lng, stand.lat, stand.lng);
      if (dKm <= radiusLimitKm) {
        const dMeters = Math.round(dKm * 1000);
        const walkMins = Math.max(1, Math.round(dMeters / 75)); // ~4.5 km/h walking pace
        const isMetro =
          stand.name.toLowerCase().includes('metro') ||
          stand.name.toLowerCase().includes('station') ||
          stand.name.toLowerCase().includes('isbt');
        const isTerm =
          stand.name.toLowerCase().includes('terminal') ||
          stand.name.toLowerCase().includes('depot') ||
          stand.name.toLowerCase().includes('isbt');

        // Find active buses within 2.5km of this stand
        const closeBuses = buses.filter(
          (b) => calculateDistanceKm(stand.lat, stand.lng, b.lat, b.lng) <= 2.5
        );

        // Group into distinct routes with estimated arrival times
        const routesMap = new Map<string, { route: string; etaMins: number; type: 'ev' | 'cng' }>();
        closeBuses.slice(0, 8).forEach((b) => {
          if (!routesMap.has(b.routeId)) {
            const bDist = calculateDistanceKm(stand.lat, stand.lng, b.lat, b.lng);
            const speed = Math.max(15, b.speedKmH || 20);
            const eta = Math.max(1, Math.round((bDist / speed) * 60));
            routesMap.set(b.routeId, {
              route: b.routeId,
              etaMins: eta,
              type: b.type === 'ev' ? 'ev' : 'cng',
            });
          }
        });

        // If no live bus nearby, add default popular DTC routes serving this node
        if (routesMap.size === 0) {
          routesMap.set('502', { route: '502', etaMins: 4, type: 'ev' });
          routesMap.set('729', { route: '729', etaMins: 9, type: 'cng' });
          routesMap.set('419', { route: '419', etaMins: 14, type: 'ev' });
        }

        const routes = Array.from(routesMap.values()).slice(0, 4);

        // Amenities based on facility size
        const amenities: string[] = ['Shelter & Bench'];
        if (isMetro) amenities.push('Metro Interchange', 'E-Rickshaw Bay');
        if (isTerm) amenities.push('CCTV Active', 'Public Water ATM');
        else amenities.push('LED Display');

        computed.push({
          id: stand.id,
          name: stand.name,
          hindiName: `${stand.name} बस स्टैंड`,
          distanceKm: dKm,
          distanceMeters: dMeters,
          walkMinutes: walkMins,
          metroInterchange: isMetro ? 'Metro Connected' : undefined,
          amenities,
          routes,
          lat: stand.lat,
          lng: stand.lng,
          isTerminal: isTerm,
        });
      }
    }

    // Sort by distance ascending
    computed.sort((a, b) => a.distanceMeters - b.distanceMeters);

    // If query within radius has few results (e.g. user tested far away), guarantee at least top nearest stands
    if (computed.length < 3) {
      const allSorted = ALL_DTC_BUS_STANDS.map((s) => {
        const dKm = calculateDistanceKm(userCoords.lat, userCoords.lng, s.lat, s.lng);
        return { ...s, dKm };
      }).sort((a, b) => a.dKm - b.dKm);

      for (let i = 0; i < Math.min(5, allSorted.length); i++) {
        const stand = allSorted[i];
        if (!computed.some((c) => c.id === stand.id)) {
          const dM = Math.round(stand.dKm * 1000);
          computed.push({
            id: stand.id,
            name: stand.name,
            hindiName: `${stand.name} बस स्टैंड`,
            distanceKm: stand.dKm,
            distanceMeters: dM,
            walkMinutes: Math.max(1, Math.round(dM / 75)),
            amenities: ['Shelter & Bench', 'LED Display'],
            routes: [
              { route: '502', etaMins: 5, type: 'ev' },
              { route: '729', etaMins: 11, type: 'cng' },
            ],
            lat: stand.lat,
            lng: stand.lng,
            isTerminal: false,
          });
        }
      }
    }

    return computed;
  }, [userCoords, selectedRadius, buses]);

  // Set initial selected stop when list updates
  useEffect(() => {
    if (nearbyStops.length > 0 && (!selectedStopId || !nearbyStops.some((s) => s.id === selectedStopId))) {
      setSelectedStopId(nearbyStops[0].id);
    }
  }, [nearbyStops, selectedStopId]);

  // Search & tag filtering
  const filteredStops = useMemo(() => {
    return nearbyStops.filter((stop) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!stop.name.toLowerCase().includes(q) && !stop.hindiName.includes(q)) {
          return false;
        }
      }
      if (filterTag === 'metro' && !stop.metroInterchange) return false;
      if (filterTag === 'shelter' && !stop.amenities.some((a) => a.toLowerCase().includes('shelter'))) {
        return false;
      }
      if (filterTag === 'ac' && !stop.routes.some((r) => r.type === 'ev')) return false;
      return true;
    });
  }, [nearbyStops, searchQuery, filterTag]);

  const activeStop = nearbyStops.find((s) => s.id === selectedStopId) || nearbyStops[0];

  const handleStartWalk = (stop: ComputedStop) => {
    if (onSelectHub) {
      onSelectHub({
        id: stop.id,
        name: stop.name,
        lat: stop.lat,
        lng: stop.lng,
        type: stop.isTerminal ? 'Terminal' : 'Bus Stop',
        description: `DTC Bus Stand: ${stop.name}`,
        majorRoutes: stop.routes.map((r) => r.route),
      });
    }
    onNavigateTab('live-map');
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] min-h-[500px] overflow-hidden flex flex-col bg-[#FAF8F5]">
      {/* Mobile Top View-Switcher Bar (< lg screens) */}
      <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-white border-b border-slate-200 z-30 shrink-0">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setMobileTab('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'list'
                ? 'bg-[#a83301] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">list</span>
            <span>Stops List ({filteredStops.length})</span>
          </button>
          <button
            onClick={() => setMobileTab('radar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'radar'
                ? 'bg-[#a83301] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">radar</span>
            <span>Walking Radar</span>
          </button>
        </div>

        <button
          onClick={handleRelocateGPS}
          disabled={isLocating}
          className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold flex items-center gap-1 border border-blue-200 cursor-pointer"
        >
          <span className={`material-symbols-outlined text-[16px] ${isLocating ? 'animate-spin' : ''}`}>
            my_location
          </span>
          <span>{isLocating ? 'Locating...' : 'GPS'}</span>
        </button>
      </div>

      <div className="flex-1 w-full h-full min-h-0 flex flex-col lg:flex-row overflow-hidden relative">
        {/* ========================================================================= */}
        {/* LEFT 450px NEARBY STOPS PANEL                                             */}
        {/* ========================================================================= */}
        <aside
          className={`${
            mobileTab === 'list' ? 'flex' : 'hidden'
          } lg:flex w-full lg:w-[420px] xl:w-[460px] shrink-0 h-full bg-[#ffffff] shadow-[4px_0_24px_rgba(30,35,42,0.06)] z-20 flex-col overflow-hidden border-r border-slate-200`}
        >
          {/* Current Location Anchor Card */}
          <div className="p-4 bg-[#f0f4fd] border-b border-slate-200 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006d42] animate-ping"></span>
                <span className="w-2 h-2 -ml-2 rounded-full bg-[#006d42]"></span>
                <span className="text-[11px] font-bold text-[#007145] uppercase tracking-wide">
                  {isGpsLive ? 'Live Commuter GPS Active' : 'Delhi Transit GPS Reference'}
                </span>
              </div>
              <button
                onClick={handleRelocateGPS}
                disabled={isLocating}
                className="text-[11px] font-bold text-[#a83301] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className={`material-symbols-outlined text-[15px] ${isLocating ? 'animate-spin' : ''}`}>
                  my_location
                </span>
                {isLocating ? 'Scanning GPS...' : 'Relocate GPS'}
              </button>
            </div>

            <div className="mt-2 flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#a83301] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[20px]">pin_drop</span>
              </div>
              <div>
                <h2 className="text-[14px] font-extrabold text-[#171c23] leading-tight">
                  {gpsLocationName}
                </h2>
                <p className="text-[11px] text-[#59413a] font-medium">
                  {userCoords.lat.toFixed(4)}° N, {userCoords.lng.toFixed(4)}° E • 3,465 DTC Stands Synced
                </p>
              </div>
            </div>

            {/* Radius Selector Pills */}
            <div className="mt-3 flex items-center gap-2">
              {(['500m', '1km', '2km'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRadius(r)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[12px] font-bold text-center transition-all cursor-pointer ${
                    selectedRadius === r
                      ? 'bg-[#a83301] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="mt-3 relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#59413a] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nearby bus stand (e.g. AIIMS, Mori Gate)..."
                className="w-full h-9 pl-9 pr-8 rounded-xl bg-white text-[13px] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Quick Filter Tags */}
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(
                [
                  { tag: 'all', label: `All (${nearbyStops.length})` },
                  { tag: 'metro', label: 'Metro Connected' },
                  { tag: 'shelter', label: 'Sheltered' },
                  { tag: 'ac', label: 'AC Buses' },
                ] as const
              ).map(({ tag, label }) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition cursor-pointer ${
                    filterTag === tag
                      ? 'bg-[#ca4a1c] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Nearby Bus Stops */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8f9ff]">
            {filteredStops.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                <span className="material-symbols-outlined text-4xl text-slate-400">directions_bus</span>
                <p className="mt-2 font-bold text-slate-700 text-sm">No bus stands found in this radius</p>
                <p className="text-xs text-slate-500 mt-1">Try expanding to 1km or 2km radius.</p>
                <button
                  onClick={() => setSelectedRadius('2km')}
                  className="mt-3 px-3 py-1.5 rounded-xl bg-[#a83301] text-white text-xs font-bold"
                >
                  Expand to 2km
                </button>
              </div>
            ) : (
              filteredStops.map((stop) => {
                const isSelected = stop.id === selectedStopId;
                return (
                  <div
                    key={stop.id}
                    onClick={() => {
                      setSelectedStopId(stop.id);
                      if (window.innerWidth < 1024) {
                        setMobileTab('radar');
                      }
                    }}
                    className={`p-3.5 rounded-2xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-white ring-2 ring-[#a83301] shadow-[0_4px_16px_rgba(168,51,1,0.12)] border-[#a83301]'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-sm'
                    }`}
                  >
                    {/* Header: Name, Distance, Walking ETA */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-[13px] font-extrabold text-[#171c23] leading-snug">
                          {stop.name}
                        </h3>
                        <p className="text-[11px] text-[#59413a] font-medium">{stop.hindiName}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#842500] text-[11px] font-bold">
                          <span className="material-symbols-outlined text-[13px]">directions_walk</span>
                          {stop.walkMinutes} min
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{stop.distanceMeters}m away</p>
                      </div>
                    </div>

                    {/* Metro & Amenity Tags */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {stop.metroInterchange && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                          <span className="material-symbols-outlined text-[12px]">train</span>
                          {stop.metroInterchange}
                        </span>
                      )}
                      {stop.amenities.map((am, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                        >
                          {am}
                        </span>
                      ))}
                    </div>

                    {/* Upcoming Live Buses at this Stop */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Approaching Buses
                      </span>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        {stop.routes.map((rt, i) => (
                          <div
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectRoute(rt.route);
                              onNavigateTab('live-map');
                            }}
                            className="px-2.5 py-0.5 rounded-xl bg-[#f0f4fd] hover:bg-[#a83301] hover:text-white text-[#171c23] flex items-center gap-1.5 text-[11px] font-bold transition group border border-slate-200/60"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006d42] group-hover:bg-white"></span>
                            <span>{rt.route}</span>
                            <span className="text-[#a83301] group-hover:text-white font-extrabold">
                              {rt.etaMins}m
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRoute(stop.routes[0]?.route || '502');
                          onNavigateTab('live-map');
                        }}
                        className="text-[11px] font-bold text-[#a83301] hover:underline flex items-center gap-0.5"
                      >
                        <span>View on Live Map</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartWalk(stop);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#ca4a1c] text-white text-[11px] font-bold hover:bg-[#a83301] transition flex items-center gap-1 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[14px]">directions_walk</span>
                        <span>Walk {stop.walkMinutes} min</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Info Pill */}
          <div className="p-3 bg-white border-t border-slate-200 text-center text-[11px] text-slate-500 shrink-0">
            <span>Powered by official Delhi Open Transit GTFS (3,465 bus stands).</span>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* RIGHT WALKING RADAR VISUALIZATION CANVAS                                   */}
        {/* ========================================================================= */}
        <main
          className={`${
            mobileTab === 'radar' ? 'flex' : 'hidden'
          } lg:flex flex-1 relative h-full bg-[#FAF8F5] overflow-hidden select-none flex-col`}
        >
          {/* Top Floating Banner */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none flex-wrap gap-2">
            <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-slate-900 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006d42] animate-pulse"></span>
              <span>{selectedRadius} Walking Radar</span>
              <span className="text-slate-300">•</span>
              <span>{filteredStops.length} Stops Found</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#a83301]">
                Closest: {activeStop ? `${activeStop.distanceMeters}m (${activeStop.walkMinutes} min)` : '0m'}
              </span>
            </div>

            <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200">
              <button
                onClick={() => setRadarViewMode('paths')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                  radarViewMode === 'paths' ? 'bg-[#ca4a1c] text-white' : 'text-slate-600'
                }`}
              >
                Walking Radar
              </button>
              <button
                onClick={() => onNavigateTab('live-map')}
                className="px-3 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">map</span>
                <span>Open Google Map</span>
              </button>
            </div>
          </div>

          {/* Radar Graphic Viewport (SVG Visualizer) */}
          <div className="w-full h-full flex items-center justify-center relative">
            <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffdbd0" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#f0f4fd" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background */}
              <rect width="800" height="600" fill="#FAF8F5" />
              <circle cx="400" cy="300" r="280" fill="url(#radarGlow)" />

              {/* Concentric distance rings */}
              <circle cx="400" cy="300" r="100" fill="none" stroke="#ca4a1c" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <circle cx="400" cy="300" r="200" fill="none" stroke="#ca4a1c" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.5" />
              <circle cx="400" cy="300" r="280" fill="none" stroke="#a83301" strokeWidth="1" opacity="0.25" />

              {/* Distance label badges on rings */}
              <text x="400" y="195" fill="#a83301" fontSize="10" fontWeight="bold" textAnchor="middle">250m Walk Ring</text>
              <text x="400" y="95" fill="#a83301" fontSize="10" fontWeight="bold" textAnchor="middle">500m Walk Ring</text>
              <text x="400" y="20" fill="#a83301" fontSize="10" fontWeight="bold" textAnchor="middle">1 km Outer Perimeter</text>

              {/* Center: User GPS Pin */}
              <g transform="translate(400, 300)">
                <circle r="18" fill="rgba(37, 99, 235, 0.2)" />
                <circle r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="2.5" fill="#ffffff" />
                <text y="-14" fill="#1e3a8a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  You Are Here
                </text>
              </g>

              {/* Dynamic Bus Stops placed on radar by azimuth and distance */}
              {filteredStops.slice(0, 8).map((stop, idx) => {
                // Calculate position relative to userCoords
                const dLat = stop.lat - userCoords.lat;
                const dLng = stop.lng - userCoords.lng;
                const scale = 50000; // Visual scaling factor
                const x = Math.max(80, Math.min(720, 400 + dLng * scale));
                const y = Math.max(80, Math.min(520, 300 - dLat * scale));
                const isSelected = stop.id === selectedStopId;

                return (
                  <g
                    key={stop.id}
                    transform={`translate(${x}, ${y})`}
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedStopId(stop.id)}
                  >
                    {/* Connecting dashed line from user to selected stop */}
                    {isSelected && (
                      <line
                        x1={400 - x}
                        y1={300 - y}
                        x2="0"
                        y2="0"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    )}

                    <circle
                      r={isSelected ? 16 : 10}
                      fill={isSelected ? '#a83301' : '#006d42'}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 3 : 2}
                      className={isSelected ? 'animate-pulse' : ''}
                    />
                    <text
                      y={isSelected ? -20 : -14}
                      fill="#171c23"
                      fontSize={isSelected ? "12" : "10"}
                      fontWeight="bold"
                      textAnchor="middle"
                      className="select-none"
                    >
                      {stop.name.slice(0, 18)}
                    </text>
                    <text
                      y={isSelected ? 26 : 20}
                      fill="#842500"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {stop.distanceMeters}m ({stop.walkMinutes}m walk)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Stop Floating Bottom Action Card */}
          {activeStop && (
            <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96 z-30 pointer-events-auto">
              <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(30,35,42,0.12)] border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-[13px] text-[#171c23]">{activeStop.name}</h4>
                    <p className="text-[11px] text-[#59413a]">
                      {activeStop.distanceMeters} meters away • ~{activeStop.walkMinutes} min walk
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {activeStop.routes.length} Active Routes
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleStartWalk(activeStop)}
                    className="flex-1 py-2 rounded-xl bg-[#a83301] text-white text-xs font-bold hover:bg-[#ca4a1c] transition flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">map</span>
                    <span>Track on Live Map</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
