import React, { useState, useEffect, useMemo } from 'react';
import { DTCBus, FleetSummary, RouteItem, TransitHub, BreadcrumbPoint } from '../../types';
import { BusMap } from '../BusMap';
import { BusDetailModal } from '../BusDetailModal';
import { resolveBusProgression, resolveRouteProgression, getStopCoords, RouteStopStep } from '../../utils/routeResolver';
import { ALL_DTC_BUS_STANDS, findNearestStandFromAll } from '../../data/terminals';

interface LiveMapViewProps {
  buses: DTCBus[];
  summary: FleetSummary | null;
  routes: RouteItem[];
  selectedBus: DTCBus | null;
  onSelectBus: (bus: DTCBus) => void;
  onCloseBusDetail: () => void;
  selectedRoute: string;
  onSelectRoute: (routeId: string) => void;
  flyToTarget: { lat: number; lng: number; zoom?: number } | null;
  busTrail: BreadcrumbPoint[];
  isFollowingBus: boolean;
  onFollowBus: (bus: DTCBus) => void;
  onSelectHub: (hub: TransitHub) => void;
  triggerNearestStandCount: number;
  onTriggerNearestStand?: () => void;
}

export const LiveMapView: React.FC<LiveMapViewProps> = ({
  buses,
  summary,
  routes,
  selectedBus,
  onSelectBus,
  onCloseBusDetail,
  selectedRoute,
  onSelectRoute,
  flyToTarget,
  busTrail,
  isFollowingBus,
  onFollowBus,
  onSelectHub,
  triggerNearestStandCount,
  onTriggerNearestStand,
}) => {
  // Mobile tab state: 'map' is default so map is ALWAYS visible instantly!
  const [mobileTab, setMobileTab] = useState<'map' | 'timeline'>('map');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'ev' | 'ladies' | 'lowfloor'>('all');
  const [mapType, setMapType] = useState<'transit' | 'satellite'>('transit');
  const [currentTime, setCurrentTime] = useState('10:42 AM');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [activeStopTarget, setActiveStopTarget] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [alarmSetStop, setAlarmSetStop] = useState<string | null>(null);
  const [localFlyTo, setLocalFlyTo] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);
  const [etaDisplayMode, setEtaDisplayMode] = useState<'both' | 'clock' | 'mins'>('both');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Sync search input when selected bus or route changes
  useEffect(() => {
    if (selectedBus) {
      setSearchInput(`Bus ${selectedBus.id} (Route ${selectedBus.routeId})`);
    } else if (selectedRoute) {
      setSearchInput(`Route ${selectedRoute}`);
    }
  }, [selectedBus?.id, selectedRoute]);

  // Dynamic Route Progression calculation with live telemetry
  const currentProgression = useMemo(() => {
    if (selectedBus) {
      return resolveBusProgression(selectedBus, buses, isReversed);
    }
    const routeToResolve = selectedRoute || (summary?.topRoutes?.[0]?.routeId) || '502';
    return resolveRouteProgression(routeToResolve, buses, isReversed);
  }, [selectedBus, selectedRoute, buses, summary?.topRoutes, isReversed]);

  // Dynamic Timeline Stops with live telemetry ETAs
  const timelineStops = useMemo(() => {
    return currentProgression.orderedStops || [];
  }, [currentProgression]);

  // Combined flyTo target
  const effectiveFlyTo = localFlyTo || flyToTarget;

  // Filtered buses count on current route
  const activeRouteId = selectedRoute || currentProgression.routeId || '502';
  const routeBuses = useMemo(() => {
    return buses.filter((b) => b.routeId.toLowerCase() === activeRouteId.toLowerCase());
  }, [buses, activeRouteId]);

  // Quick route select handler
  const handleQuickRoute = (route: string) => {
    onSelectRoute(route);
    setSearchInput(`Route ${route}`);
    // If on mobile and in timeline, switch to map to see buses
    // or let user stay in timeline if desired
  };

  // Click on a stop in the timeline
  const handleStopClick = (stop: RouteStopStep) => {
    setActiveStopTarget(stop.name);
    const coords = getStopCoords(stop.name) || (stop.lat && stop.lng ? { lat: stop.lat, lng: stop.lng } : null);

    if (coords) {
      setLocalFlyTo({ lat: coords.lat, lng: coords.lng, zoom: 16 });
      onSelectHub({
        id: `stop_${stop.name}`,
        name: stop.name,
        lat: coords.lat,
        lng: coords.lng,
        type: stop.isStart || stop.isLast ? 'Terminal' : 'Bus Stop',
        description: `DTC Bus Stand: ${stop.name}`,
        majorRoutes: [activeRouteId],
      });
    }

    // On mobile, switch to map view so the user immediately sees the focused stop
    if (window.innerWidth < 1024) {
      setMobileTab('map');
    }
  };

  // Find Nearest Stand button
  const handleFindNearest = () => {
    if (onTriggerNearestStand) {
      onTriggerNearestStand();
    }
    if (window.innerWidth < 1024) {
      setMobileTab('map');
    }
  };

  // Locate User GPS
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocalFlyTo({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            zoom: 16,
          });
          if (window.innerWidth < 1024) {
            setMobileTab('map');
          }
        },
        () => {
          // Fallback
          setLocalFlyTo({ lat: 28.6186, lng: 77.2155, zoom: 15 });
        },
        { timeout: 7000, enableHighAccuracy: true }
      );
    }
  };

  // Filter buses based on current map filter
  const activeBuses = useMemo(() => {
    return buses.filter((b) => {
      if (filterType === 'ev') return b.type === 'ev';
      if (filterType === 'lowfloor') return b.type === 'ev' || b.id.includes('DL 1P');
      if (selectedRoute) return b.routeId.toLowerCase() === selectedRoute.toLowerCase();
      return true;
    });
  }, [buses, filterType, selectedRoute]);

  const handleShareBus = () => {
    const clockInfo = currentProgression.nextPointClockTime ? ` (${currentProgression.nextPointClockTime})` : '';
    const text = `Live DTC Bus Update: Tracking Route ${activeRouteId} approaching ${currentProgression.nextPoint} in ${currentProgression.nextPointEtaMins} mins${clockInfo}. Track live on Delhi Transit: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: 'DTC Live Bus Tracker', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      showToast('Live tracking status copied to clipboard!');
    }
  };

  const handleToggleStopAlarm = (stopName: string) => {
    if (alarmSetStop === stopName) {
      setAlarmSetStop(null);
      showToast(`Stop alert cancelled for ${stopName}`);
    } else {
      setAlarmSetStop(stopName);
      showToast(`Arrival alert active for ${stopName}!`);
    }
  };

  const handleSetAlarm = () => {
    handleToggleStopAlarm(currentProgression.nextPoint);
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] min-h-[500px] overflow-hidden flex flex-col bg-[#FAF8F5]">
      {/* Mobile Top View-Switcher Bar (< lg screens) */}
      <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-white border-b border-slate-200 z-30 shrink-0">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setMobileTab('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'map'
                ? 'bg-[#a83301] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span>Live Map (नक्शा)</span>
          </button>
          <button
            onClick={() => setMobileTab('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'timeline'
                ? 'bg-[#a83301] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">timeline</span>
            <span>Route Timeline ({timelineStops.length} stops)</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleFindNearest}
            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 border border-emerald-200 cursor-pointer"
            title="Nearest Bus Stand"
          >
            <span className="material-symbols-outlined text-[18px]">near_me</span>
          </button>
          <button
            onClick={handleLocateMe}
            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold flex items-center gap-1 border border-blue-200 cursor-pointer"
            title="My GPS Location"
          >
            <span className="material-symbols-outlined text-[18px]">my_location</span>
          </button>
        </div>
      </div>

      <div className="flex-1 w-full h-full min-h-0 flex flex-col lg:flex-row overflow-hidden relative">
        {/* ========================================================================= */}
        {/* COMMUTER CONTROL PANEL & ROUTE TIMELINE (LEFT)                            */}
        {/* ========================================================================= */}
        <aside
          className={`${
            mobileTab === 'timeline' ? 'flex' : 'hidden'
          } lg:flex ${
            isPanelCollapsed ? 'lg:hidden' : 'lg:w-[420px] xl:w-[450px]'
          } shrink-0 h-full bg-[#ffffff] shadow-[4px_0_24px_rgba(30,35,42,0.06)] z-20 flex-col overflow-hidden border-r border-slate-200/80 transition-all`}
        >
          {/* Top Welcoming Bar */}
          <div className="p-4 bg-[#f0f4fd] pb-3 border-b border-slate-200 shrink-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006d42] animate-ping"></span>
                <span className="w-2 h-2 -ml-2 rounded-full bg-[#006d42]"></span>
                <span className="text-[11px] font-bold text-[#007145] tracking-wider uppercase">
                  Live GTFS GPS Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full font-semibold">
                  {currentTime}
                </span>
                <button
                  onClick={() => setIsPanelCollapsed(true)}
                  className="hidden lg:flex p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
                  title="Collapse Panel for Fullscreen Map"
                >
                  <span className="material-symbols-outlined text-[18px]">first_page</span>
                </button>
              </div>
            </div>

            <h1 className="text-[17px] text-[#171c23] font-extrabold tracking-tight">
              Namaste, where are you travelling?
            </h1>
            <p className="text-[12px] text-[#59413a] font-medium">
              आज आप कहाँ की यात्रा कर रहे हैं?
            </p>

            {/* Search Input with quick clear */}
            <div className="mt-3 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#a83301]">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchInput.trim()) {
                    const clean = searchInput.replace(/route\s*/i, '').trim();
                    onSelectRoute(clean);
                  }
                }}
                className="w-full h-10 pl-9 pr-9 rounded-xl bg-white text-[#171c23] text-[13px] shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#a83301] transition-all"
                placeholder="Search Route 502, 729, AIIMS, Kashmere Gate..."
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput('');
                    onSelectRoute('502');
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#a83301]"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Quick Route Shortcut Chips */}
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {['502', '419', '729', '840', 'EXP-4', 'TMS'].map((route) => {
                const isActive = activeRouteId.toUpperCase() === route.toUpperCase();
                return (
                  <button
                    key={route}
                    onClick={() => handleQuickRoute(route)}
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#a83301] text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {route}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable Route Live Timeline & ETAs */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#f8f9ff]">
            {/* Selected Active Route Badge Card */}
            <div className="p-3.5 rounded-2xl bg-[#ffffff] shadow-[0_2px_12px_rgba(30,35,42,0.05)] border border-slate-200/80">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#006d42] flex flex-col items-center justify-center text-white shadow-md shadow-[#006d42]/20 shrink-0">
                    <span className="font-extrabold text-[20px] tracking-tight leading-none">
                      {activeRouteId}
                    </span>
                    <span className="text-[8px] tracking-wider uppercase font-black opacity-90">
                      Electric
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[13px] font-bold text-[#171c23]">
                        {isReversed ? currentProgression.lastPoint : currentProgression.startPoint}
                      </span>
                      <span className="material-symbols-outlined text-[#a83301] text-[15px]">arrow_forward</span>
                      <span className="text-[13px] font-bold text-[#171c23]">
                        {isReversed ? currentProgression.startPoint : currentProgression.lastPoint}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#59413a]">
                      {currentProgression.currentDirection} • {routeBuses.length} active buses
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isBookmarked
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-[#f0f4fd] text-slate-400 hover:text-amber-600'
                  }`}
                  title="Bookmark Route"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    bookmark
                  </span>
                </button>
              </div>

              {/* Live Bus Progress Tracker */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-[#006d42] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">directions_bus</span>
                    Next Stop: {currentProgression.nextPoint}
                  </span>
                  <span className="font-extrabold text-[#a83301] flex items-center gap-1">
                    {currentProgression.nextPointClockTime && (
                      <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-mono text-[10px]">
                        {currentProgression.nextPointClockTime}
                      </span>
                    )}
                    <span>{currentProgression.nextPointEtaMins} mins ({currentProgression.nextPointFormattedDistance})</span>
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#006d42] to-[#a83301] rounded-full transition-all duration-500"
                    style={{ width: `${currentProgression.progressPercent}%` }}
                  ></div>
                </div>

                {/* Corridor Live Telemetry Status Strip */}
                {currentProgression.telemetrySummary && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600 flex-wrap gap-1">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-bold text-slate-800">
                        {currentProgression.telemetrySummary.activeBusesOnRoute} Active GPS Buses
                      </span>
                      <span>•</span>
                      <span>Avg Speed: <strong>{currentProgression.telemetrySummary.averageSpeedKmH} km/h</strong></span>
                    </div>

                    <span
                      className={`px-1.5 py-0.5 rounded font-bold text-[9px] ${
                        currentProgression.telemetrySummary.congestionLevel === 'smooth'
                          ? 'bg-emerald-100 text-emerald-800'
                          : currentProgression.telemetrySummary.congestionLevel === 'congested'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {currentProgression.telemetrySummary.congestionLevel === 'smooth'
                        ? 'Traffic: Smooth'
                        : currentProgression.telemetrySummary.congestionLevel === 'congested'
                        ? 'Heavy Traffic'
                        : 'Moderate Traffic'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Bar (Find Nearest, GPS, Share) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleFindNearest}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 flex items-center justify-center gap-2 text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-600">near_me</span>
                <span>Nearest Stand (3,465)</span>
              </button>

              <button
                onClick={handleLocateMe}
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/80 flex items-center justify-center gap-2 text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-blue-600">my_location</span>
                <span>Locate My GPS</span>
              </button>
            </div>

            {/* Route Stop Stepper Progression (Interactive Timeline) */}
            <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-[14px] font-bold text-[#171c23]">
                    Route Timeline / स्टॉप विवरण
                  </h2>
                  <span className="text-[11px] text-slate-500">
                    Live telemetry calculated ETAs
                  </span>
                </div>
                <button
                  onClick={() => setIsReversed(!isReversed)}
                  className="text-[11px] font-bold text-[#a83301] flex items-center gap-0.5 hover:underline cursor-pointer bg-slate-50 px-2 py-1 rounded-lg border border-slate-200"
                >
                  <span className="material-symbols-outlined text-[15px]">swap_vert</span>
                  Reverse
                </button>
              </div>

              {/* ETA Display Mode Toggle Pills */}
              <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl mb-3 text-[10px] font-bold">
                <span className="text-slate-500 pl-1.5">ETA Format:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEtaDisplayMode('both')}
                    className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                      etaDisplayMode === 'both' ? 'bg-white text-slate-900 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Both (10:48 AM / 4m)
                  </button>
                  <button
                    onClick={() => setEtaDisplayMode('clock')}
                    className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                      etaDisplayMode === 'clock' ? 'bg-white text-slate-900 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Clock
                  </button>
                  <button
                    onClick={() => setEtaDisplayMode('mins')}
                    className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                      etaDisplayMode === 'mins' ? 'bg-white text-slate-900 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Minutes
                  </button>
                </div>
              </div>

              {/* Stepper Nodes */}
              <div className="relative pl-6 space-y-3">
                {/* Vertical Track Line */}
                <div className="absolute left-[11px] top-2 bottom-4 w-1 bg-slate-200 rounded-full">
                  <div
                    className="w-full bg-[#006d42] rounded-full transition-all duration-300"
                    style={{ height: `${Math.min(100, currentProgression.progressPercent)}%` }}
                  ></div>
                </div>

                {timelineStops.map((stop, idx) => {
                  const isTarget = activeStopTarget === stop.name;
                  const isCurrent = stop.isCurrentNext;
                  const isPassed = stop.isPassed;
                  const isAlarmSet = alarmSetStop === stop.name;

                  return (
                    <div
                      key={idx}
                      className={`relative flex items-start justify-between p-2 rounded-xl transition-all ${
                        isTarget
                          ? 'bg-[#f0f4fd] border border-[#a83301]/40 shadow-sm'
                          : isCurrent
                          ? 'bg-emerald-50/80 border border-emerald-300 shadow-xs'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Node Bullet */}
                      {isCurrent ? (
                        <div className="absolute -left-[28px] mt-0.5 flex items-center">
                          <span className="w-5 h-5 rounded-full bg-[#006d42] text-white flex items-center justify-center shadow-md animate-pulse">
                            <span className="material-symbols-outlined text-[11px]">directions_bus</span>
                          </span>
                        </div>
                      ) : isTarget ? (
                        <div className="absolute -left-6 mt-1 w-3.5 h-3.5 rounded-full bg-[#a83301] ring-4 ring-[#ffdbd0]"></div>
                      ) : (
                        <div
                          className={`absolute -left-6 mt-1 w-3.5 h-3.5 rounded-full ring-4 ring-white ${
                            isPassed ? 'bg-[#006d42]' : 'bg-slate-300'
                          }`}
                        ></div>
                      )}

                      <div
                        onClick={() => handleStopClick(stop)}
                        className="pl-1 flex-1 cursor-pointer min-w-0 pr-2"
                      >
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p
                            className={`text-[12px] font-bold ${
                              isTarget ? 'text-[#a83301]' : isCurrent ? 'text-[#006d42]' : 'text-[#171c23]'
                            }`}
                          >
                            {stop.name}
                          </p>
                          {stop.isStart && (
                            <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[9px] font-bold">
                              Origin
                            </span>
                          )}
                          {stop.isLast && (
                            <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[9px] font-bold">
                              Terminus
                            </span>
                          )}
                          {stop.stopType === 'metro' && (
                            <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 text-[9px] font-bold">
                              Metro
                            </span>
                          )}
                          {stop.stopType === 'isbt' && (
                            <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 text-[9px] font-bold">
                              ISBT
                            </span>
                          )}
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 rounded bg-[#006d42] text-white text-[9px] font-bold animate-pulse">
                              Approaching
                            </span>
                          )}
                        </div>

                        <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                          <span>
                            {stop.formattedDistance
                              ? `${stop.formattedDistance} from bus`
                              : stop.distanceFromBusKm
                              ? `${stop.distanceFromBusKm.toFixed(1)} km from bus`
                              : isPassed
                              ? 'Departed'
                              : 'Upcoming'}
                          </span>
                          {stop.dwellSeconds && !isPassed && (
                            <>
                              <span>•</span>
                              <span>~{stop.dwellSeconds}s dwell</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right ETA column with Stop Alarm trigger */}
                      <div className="flex items-center gap-1.5 shrink-0 pl-1 text-right">
                        <div>
                          {isPassed ? (
                            <span className="text-[11px] font-bold text-slate-400">
                              Departed
                            </span>
                          ) : (
                            <div className="flex flex-col items-end">
                              {etaDisplayMode === 'both' ? (
                                <>
                                  <span className={`text-[11px] font-mono font-extrabold ${isCurrent ? 'text-[#006d42]' : 'text-slate-900'}`}>
                                    {stop.etaClockTime || (stop.etaMins ? `${stop.etaMins}m` : '--')}
                                  </span>
                                  {stop.etaMins !== undefined && (
                                    <span className="text-[10px] font-semibold text-slate-500">
                                      +{stop.etaMins} min
                                    </span>
                                  )}
                                </>
                              ) : etaDisplayMode === 'clock' ? (
                                <span className={`text-[11px] font-mono font-extrabold ${isCurrent ? 'text-[#006d42]' : 'text-slate-900'}`}>
                                  {stop.etaClockTime || (stop.etaMins ? `${stop.etaMins}m` : '--')}
                                </span>
                              ) : (
                                <span className={`text-[11px] font-mono font-extrabold ${isCurrent ? 'text-[#006d42]' : 'text-slate-900'}`}>
                                  {stop.etaMins !== undefined ? `+${stop.etaMins}m` : '--'}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Stop Alarm Trigger */}
                        {!isPassed && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStopAlarm(stop.name);
                            }}
                            className={`p-1 rounded-lg transition-colors cursor-pointer ${
                              isAlarmSet
                                ? 'bg-amber-100 text-amber-700 shadow-xs'
                                : 'text-slate-300 hover:text-amber-600 hover:bg-slate-100'
                            }`}
                            title={isAlarmSet ? `Alarm active for ${stop.name}` : `Set arrival alarm for ${stop.name}`}
                          >
                            <span
                              className="material-symbols-outlined text-[16px]"
                              style={{ fontVariationSettings: isAlarmSet ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              notifications
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Toolkit Action Bar */}
            <div className="grid grid-cols-3 gap-2 pt-1 pb-4">
              <button
                onClick={handleSetAlarm}
                className="p-2.5 rounded-xl bg-[#f0f4fd] hover:bg-[#a83301] hover:text-white text-[#171c23] flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-slate-200/80 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#a83301] group-hover:text-white">
                  notifications_active
                </span>
                <span className="text-[10px] font-bold mt-1">Set Stop Alarm</span>
              </button>

              <button
                onClick={handleShareBus}
                className="p-2.5 rounded-xl bg-[#f0f4fd] hover:bg-[#006d42] hover:text-white text-[#171c23] flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-slate-200/80 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#006d42] group-hover:text-white">
                  share
                </span>
                <span className="text-[10px] font-bold mt-1">Share Bus</span>
              </button>

              <button
                onClick={() => setShowQRModal(true)}
                className="p-2.5 rounded-xl bg-[#f0f4fd] hover:bg-[#1a637c] hover:text-white text-[#171c23] flex flex-col items-center justify-center text-center transition-all cursor-pointer group border border-slate-200/80 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#1a637c] group-hover:text-white">
                  qr_code_scanner
                </span>
                <span className="text-[10px] font-bold mt-1">Chartr QR</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* INTERACTIVE MAP CANVAS (RIGHT)                                            */}
        {/* ========================================================================= */}
        <main
          className={`${
            mobileTab === 'map' ? 'flex' : 'hidden'
          } lg:flex flex-1 relative h-full bg-[#FAF8F5] overflow-hidden select-none flex-col`}
        >
          {/* Panel Expand Button (visible when sidebar is collapsed on desktop) */}
          {isPanelCollapsed && (
            <button
              onClick={() => setIsPanelCollapsed(false)}
              className="hidden lg:flex absolute top-4 left-4 z-40 p-2.5 rounded-xl bg-white shadow-lg border border-slate-200 text-slate-700 hover:text-[#a83301] transition items-center gap-1.5 text-xs font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">last_page</span>
              <span>Show Timeline & Controls</span>
            </button>
          )}

          {/* Real Live Google Map & 60fps Canvas Engine */}
          <div className="absolute inset-0 w-full h-full">
            <BusMap
              buses={activeBuses}
              selectedBus={selectedBus}
              onSelectBus={onSelectBus}
              flyToTarget={effectiveFlyTo}
              busTrail={busTrail}
              showHubs={true}
              onToggleHubs={() => {}}
              selectedRoute={selectedRoute}
              onSelectRoute={onSelectRoute}
              onSelectHub={onSelectHub}
              triggerNearestStandCount={triggerNearestStandCount}
            />
          </div>

          {/* Selected Bus Detail Modal */}
          <BusDetailModal
            bus={selectedBus}
            onClose={onCloseBusDetail}
            onFilterRoute={onSelectRoute}
            onFollowBus={onFollowBus}
            isFollowing={isFollowingBus}
            allBuses={buses}
          />

          {/* Top Floating Filter Pills Strip */}
          <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-2 pointer-events-none">
            <div className="pointer-events-auto hidden sm:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-[#a83301] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">done</span>
                All Active ({buses.length.toLocaleString()})
              </button>

              <button
                onClick={() => setFilterType('ev')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  filterType === 'ev'
                    ? 'bg-[#006d42] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-emerald-600 text-[15px]">electric_bolt</span>
                AC Electric Only
              </button>

              <button
                onClick={() => setFilterType('ladies')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  filterType === 'ladies'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-pink-600 text-[15px]">female</span>
                Ladies Special
              </button>

              <button
                onClick={() => setFilterType('lowfloor')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  filterType === 'lowfloor'
                    ? 'bg-[#1a637c] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-cyan-700 text-[15px]">accessible</span>
                Low-Floor
              </button>
            </div>

            {/* Map Layer Mode Toggle */}
            <div className="pointer-events-auto flex items-center gap-2">
              <div className="p-1 rounded-2xl bg-white/95 backdrop-blur-md shadow-md flex items-center border border-slate-200">
                <button
                  onClick={() => setMapType('transit')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition ${
                    mapType === 'transit' ? 'bg-slate-200 text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Transit / नक्शा
                </button>
                <button
                  onClick={() => setMapType('satellite')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition ${
                    mapType === 'satellite' ? 'bg-slate-200 text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Satellite
                </button>
              </div>
            </div>
          </div>

          {/* Top Real-Time Dispatch Notice */}
          <div className="hidden md:flex absolute top-4 left-4 z-30 items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/80 text-slate-800 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#006d42] animate-pulse"></span>
            <span className="text-[11px] font-bold">Delhi TransGov Live API</span>
            <span className="text-slate-300">|</span>
            <span className="text-[11px] text-slate-500">
              {routeBuses.length} active buses on Route {activeRouteId}
            </span>
          </div>

          {/* Floating Live Corridor Card at Bottom */}
          <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-auto max-w-xl z-30 pointer-events-auto">
            <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(30,35,42,0.12)] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-[#93f3ba] text-[#006d42] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">traffic</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#171c23]">
                      Route {activeRouteId} Corridor
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#006d42]"></span>
                    <span className="text-[11px] text-[#006d42] font-bold">Normal Flow</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Next: <strong>{currentProgression.nextPoint}</strong> • ETA: <strong>{currentProgression.nextPointEtaMins} mins</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setMobileTab('timeline')}
                  className="lg:hidden px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold border border-slate-200 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">format_list_bulleted</span>
                  <span>Stops</span>
                </button>

                <button
                  onClick={handleFindNearest}
                  className="px-3.5 py-2 rounded-xl bg-[#a83301] text-white text-[12px] font-bold shadow-md shadow-[#a83301]/20 hover:bg-[#ca4a1c] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">near_me</span>
                  <span>Nearest Stand</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Chartr QR Pay Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="w-12 h-12 rounded-xl bg-[#1a637c]/10 text-[#1a637c] mx-auto flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
            </div>
            <h3 className="font-extrabold text-[18px] text-[#171c23]">Chartr & One Delhi Pay</h3>
            <p className="text-xs text-slate-600 mt-1">
              Scan conductor QR code to get 10% instant rebate on bus ticket.
            </p>
            <div className="my-4 p-4 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center">
              <div className="w-36 h-36 bg-white p-2 rounded-lg shadow-inner flex items-center justify-center border border-slate-300">
                <span className="material-symbols-outlined text-slate-800 text-[96px]">qr_code_2</span>
              </div>
              <span className="text-[11px] font-bold text-[#006d42] mt-2">DTC Verified Merchant Terminal</span>
            </div>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#a83301] text-white font-bold text-sm shadow cursor-pointer hover:bg-[#ca4a1c]"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
      {/* In-app Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[700] px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white text-xs font-bold shadow-2xl backdrop-blur-md border border-slate-700/80 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-[18px] text-amber-400">notifications_active</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white p-0.5"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
