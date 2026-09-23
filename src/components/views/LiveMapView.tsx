import React, { useState, useEffect, useMemo } from 'react';
import { DTCBus, FleetSummary, RouteItem, TransitHub, BreadcrumbPoint, AiEtaResult } from '../../types';
import { BusMap } from '../BusMap';
import { BusDetailModal } from '../BusDetailModal';
import { resolveBusProgression, resolveRouteProgression, getStopCoords, RouteStopStep } from '../../utils/routeResolver';
import { ALL_DTC_BUS_STANDS, findNearestStandFromAll } from '../../data/terminals';
import { fetchAiEtaPrediction } from '../../services/aiEtaService';
import { DTC_KNOWN_ROUTES } from '../../data/dtcRoutes';
import { DELHI_ROUTE_REGISTRY } from '../../data/delhiRouteRegistry';
import { useBusAlerts } from '../../context/AlertContext';

interface LiveMapViewProps {
  buses: DTCBus[];
  summary: FleetSummary | null;
  routes: RouteItem[];
  selectedBus: DTCBus | null;
  onSelectBus: (bus: DTCBus | null) => void;
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
  const [isBottomTrackerMinimised, setIsBottomTrackerMinimised] = useState(false);
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
  const [showRoutePickerInTracker, setShowRoutePickerInTracker] = useState(false);
  const [trackerRouteQuery, setTrackerRouteQuery] = useState('');
  const { openSetAlertModal, isRouteAlerted } = useBusAlerts();

  // AI-Based ETA Prediction states
  const [aiEtaResult, setAiEtaResult] = useState<AiEtaResult | null>(null);
  const [isAiEtaLoading, setIsAiEtaLoading] = useState(false);
  const [isAiEtaEnabled, setIsAiEtaEnabled] = useState(true);
  const [aiEtaRefreshKey, setAiEtaRefreshKey] = useState(0);

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

  // Dynamic set of all operating routes (from live buses and known registries)
  const availableAllRoutes = useMemo(() => {
    const routeMap = new Map<string, { routeId: string; liveCount: number; name?: string }>();

    // Add all routes from live buses
    buses.forEach((b) => {
      const rid = b.routeId.trim();
      if (!rid) return;
      const key = rid.toUpperCase();
      const existing = routeMap.get(key);
      if (existing) {
        existing.liveCount += 1;
      } else {
        routeMap.set(key, { routeId: rid, liveCount: 1 });
      }
    });

    // Populate route names from registry
    Object.entries(DELHI_ROUTE_REGISTRY).forEach(([rid, reg]) => {
      const key = rid.toUpperCase();
      const existing = routeMap.get(key);
      const name = reg.name || (reg.startPoint && reg.lastPoint ? `${reg.startPoint} ↔ ${reg.lastPoint}` : `Route ${rid}`);
      if (existing) {
        existing.name = name;
      } else {
        routeMap.set(key, { routeId: rid, liveCount: 0, name });
      }
    });

    // Populate from DTC_KNOWN_ROUTES
    Object.entries(DTC_KNOWN_ROUTES).forEach(([rid, kr]) => {
      const key = rid.toUpperCase();
      const existing = routeMap.get(key);
      if (existing && !existing.name) {
        existing.name = `${kr.startPoint} ↔ ${kr.lastPoint}`;
      } else if (!existing) {
        routeMap.set(key, { routeId: rid, liveCount: 0, name: `${kr.startPoint} ↔ ${kr.lastPoint}` });
      }
    });

    return Array.from(routeMap.values()).sort((a, b) => {
      if (b.liveCount !== a.liveCount) return b.liveCount - a.liveCount;
      return a.routeId.localeCompare(b.routeId, undefined, { numeric: true });
    });
  }, [buses]);

  // Target bus for AI ETA predictions: explicitly selected bus or leading active route bus
  const currentTargetBus = useMemo(() => {
    if (selectedBus) return selectedBus;
    return routeBuses[0] || null;
  }, [selectedBus, routeBuses]);

  // Fetch AI-based ETA predictions using live telemetry and historical traffic models
  useEffect(() => {
    if (!isAiEtaEnabled || !currentTargetBus) {
      return;
    }

    let isMounted = true;
    setIsAiEtaLoading(true);

    fetchAiEtaPrediction(
      currentTargetBus,
      activeRouteId,
      timelineStops,
      currentProgression.telemetrySummary,
      aiEtaRefreshKey > 0
    )
      .then((res) => {
        if (isMounted && res) {
          setAiEtaResult(res);
        }
      })
      .catch(() => {
        // Fall back gracefully
      })
      .finally(() => {
        if (isMounted) {
          setIsAiEtaLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [
    currentTargetBus?.id,
    activeRouteId,
    timelineStops.length,
    isAiEtaEnabled,
    aiEtaRefreshKey,
  ]);

  // Fast O(1) map of AI predicted stop ETAs by normalized name
  const aiStopsMap = useMemo(() => {
    if (!isAiEtaEnabled || !aiEtaResult?.predictedStops) return new Map();
    const m = new Map();
    aiEtaResult.predictedStops.forEach((p) => {
      m.set(p.name.toLowerCase().trim(), p);
    });
    return m;
  }, [isAiEtaEnabled, aiEtaResult]);

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
    <div className="relative w-full h-full min-h-[500px] overflow-hidden flex flex-col bg-[#FAF8F5] dark:bg-[#0b0f17]">
      {/* Mobile Top View-Switcher Bar (< lg screens) */}
      <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-white dark:bg-[#121a27] border-b border-slate-200 dark:border-slate-800 z-30 shrink-0">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setMobileTab('map')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'map'
                ? 'bg-[#a83301] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">timeline</span>
            <span>Route Timeline ({timelineStops.length} stops)</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleFindNearest}
            className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 border border-emerald-200 dark:border-emerald-800 cursor-pointer"
            title="Nearest Bus Stand"
          >
            <span className="material-symbols-outlined text-[18px]">near_me</span>
          </button>
          <button
            onClick={handleLocateMe}
            className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-xs font-bold flex items-center gap-1 border border-blue-200 dark:border-blue-800 cursor-pointer"
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
          } shrink-0 h-full bg-[#ffffff] dark:bg-[#121a27] shadow-[4px_0_24px_rgba(30,35,42,0.06)] z-20 flex-col overflow-hidden border-r border-slate-200/80 dark:border-slate-800 transition-all`}
        >
          {/* Top Welcoming Bar */}
          <div className="p-4 bg-[#f0f4fd] dark:bg-[#162133] pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006d42] animate-ping"></span>
                <span className="w-2 h-2 -ml-2 rounded-full bg-[#006d42]"></span>
                <span className="text-[11px] font-bold text-[#007145] dark:text-[#52e89f] tracking-wider uppercase">
                  Live GTFS GPS Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full font-semibold hidden sm:inline">
                  {currentTime}
                </span>
                <button
                  id="btn-minimise-route-tracker"
                  onClick={() => {
                    setIsPanelCollapsed(true);
                    if (window.innerWidth < 1024) {
                      setMobileTab('map');
                    }
                    showToast('Route tracker minimised • Floating tracker is permanently active on map');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#1a2538] hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#a83301] text-xs font-bold transition shadow-xs border border-slate-200 dark:border-slate-700 cursor-pointer"
                  title="Minimise Route Tracker (compact bar stays permanently visible on screen)"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#a83301]">unfold_less</span>
                  <span>Minimise</span>
                </button>
              </div>
            </div>

            <h1 className="text-[17px] text-[#171c23] dark:text-white font-extrabold tracking-tight">
              Namaste, where are you travelling?
            </h1>
            <p className="text-[12px] text-[#59413a] dark:text-slate-400 font-medium">
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
                className="w-full h-10 pl-9 pr-9 rounded-xl bg-white dark:bg-[#1a2538] text-[#171c23] dark:text-white text-[13px] shadow-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301] transition-all"
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
                        : 'bg-white dark:bg-[#1a2538] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
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

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setIsPanelCollapsed(true);
                      if (window.innerWidth < 1024) {
                        setMobileTab('map');
                      }
                      showToast('Route tracker minimised • Floating tracker is permanently active on map');
                    }}
                    className="h-8 px-2.5 rounded-xl bg-[#f0f4fd] hover:bg-slate-200 text-slate-700 hover:text-[#a83301] transition cursor-pointer flex items-center gap-1 text-xs font-bold border border-slate-200"
                    title="Minimise to permanently visible floating tracker"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#a83301]">close_fullscreen</span>
                    <span className="hidden sm:inline text-[11px]">Minimise</span>
                  </button>

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

                  <button
                    onClick={() =>
                      openSetAlertModal(
                        selectedBus || routeBuses[0] || null,
                        null,
                        activeRouteId
                      )
                    }
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                      isRouteAlerted(activeRouteId)
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-[#f0f4fd] dark:bg-slate-800 text-slate-500 hover:text-amber-600 border-slate-200 dark:border-slate-700'
                    }`}
                    title={
                      isRouteAlerted(activeRouteId)
                        ? 'Arrival alert active for this route'
                        : 'Set arrival proximity alert for this route'
                    }
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      notifications_active
                    </span>
                  </button>
                </div>
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

                {/* Fleet of Buses on this Route: Show all one by one in a line with numbers */}
                {routeBuses.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-[#a83301]">directions_bus</span>
                        <span>Buses on Route {activeRouteId} ({routeBuses.length}):</span>
                      </span>
                      <span className="text-[10px] text-[#a83301] font-semibold">click to track</span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                      {routeBuses.map((b, idx) => {
                        const isSelected = selectedBus?.id === b.id;
                        return (
                          <button
                            key={b.id}
                            onClick={() => {
                              onSelectBus(b);
                              setLocalFlyTo({ lat: b.lat, lng: b.lng, zoom: 16 });
                              if (window.innerWidth < 1024) {
                                setMobileTab('map');
                              }
                            }}
                            className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer shrink-0 border ${
                              isSelected
                                ? 'bg-[#a83301] text-white border-[#a83301] shadow-xs'
                                : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-200 hover:border-[#a83301]'
                            }`}
                            title={`Focus Bus ${b.id} (${b.speedKmH} km/h, ${b.type.toUpperCase()})`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center ${
                                isSelected
                                  ? 'bg-white text-[#a83301]'
                                  : 'bg-slate-800 text-white group-hover:bg-[#a83301]'
                              }`}
                            >
                              #{idx + 1}
                            </span>
                            <span className="font-mono">{b.id}</span>
                            <span
                              className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : b.type === 'ev'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {b.type.toUpperCase()}
                            </span>
                            <span className={isSelected ? 'text-white/80' : 'text-slate-400 font-normal'}>
                              {b.speedKmH} km/h
                            </span>
                          </button>
                        );
                      })}
                    </div>
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

            {/* ========================================================================= */}
            {/* AI-BASED ETA PREDICTIONS PANEL (TRAFFIC + HISTORICAL TRANSIT TIMES)       */}
            {/* ========================================================================= */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border border-indigo-500/30">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[12px] font-black tracking-wide text-white">
                        AI Traffic & Transit ETA
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Gemini 3.8
                      </span>
                      {aiEtaResult?.overallConfidencePercent && isAiEtaEnabled && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                          {aiEtaResult.overallConfidencePercent}% Confidence
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-indigo-200 truncate">
                      {currentTargetBus
                        ? `Live predictions for ${currentTargetBus.id} (${currentTargetBus.type.toUpperCase()})`
                        : `Corridor Route ${activeRouteId} Transit Model`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setAiEtaRefreshKey((k) => k + 1);
                      showToast('Recalculating AI ETA predictions with latest telemetry...');
                    }}
                    disabled={isAiEtaLoading || !currentTargetBus}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer disabled:opacity-50"
                    title="Recalculate AI ETA with Gemini"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] block ${
                        isAiEtaLoading ? 'animate-spin text-amber-300' : ''
                      }`}
                    >
                      sync
                    </span>
                  </button>

                  <button
                    onClick={() => setIsAiEtaEnabled(!isAiEtaEnabled)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer border ${
                      isAiEtaEnabled
                        ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                        : 'bg-white/5 border-white/20 text-slate-400'
                    }`}
                  >
                    {isAiEtaEnabled ? 'AI Active' : 'AI Paused'}
                  </button>
                </div>
              </div>

              {isAiEtaEnabled && aiEtaResult && (
                <div className="space-y-2 pt-2 border-t border-white/10 text-[11px]">
                  {/* Traffic Summary & Corridor Assessment */}
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    {aiEtaResult.trafficSummary}
                  </p>

                  {/* Historical Factors Applied Badges */}
                  {aiEtaResult.historicalFactorsApplied && aiEtaResult.historicalFactorsApplied.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      {aiEtaResult.historicalFactorsApplied.slice(0, 3).map((factor, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2 py-0.5 rounded-full bg-white/10 text-indigo-100 text-[9px] font-medium border border-white/5"
                        >
                          ✓ {factor}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Next Stop AI Comparison Strip */}
                  {aiEtaResult.predictedStops?.[0] && (
                    <div className="mt-1.5 p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[10px] flex-wrap gap-1">
                      <span className="text-indigo-200 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-amber-300">timer</span>
                        <span>Next Stop: <strong>{aiEtaResult.predictedStops[0].name}</strong></span>
                      </span>
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-white">
                          {aiEtaResult.predictedStops[0].predictedClockTime} ({aiEtaResult.predictedStops[0].predictedEtaMins}m)
                        </span>
                        {aiEtaResult.predictedStops[0].delayDeltaMinutes !== 0 && (
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] ${
                              aiEtaResult.predictedStops[0].delayDeltaMinutes > 0
                                ? 'bg-amber-400/20 text-amber-300'
                                : 'bg-emerald-400/20 text-emerald-300'
                            }`}
                          >
                            {aiEtaResult.predictedStops[0].delayDeltaMinutes > 0
                              ? `+${aiEtaResult.predictedStops[0].delayDeltaMinutes}m traffic`
                              : `${aiEtaResult.predictedStops[0].delayDeltaMinutes}m fast`}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isAiEtaLoading && !aiEtaResult && (
                <div className="py-2 flex items-center gap-2 text-indigo-200 text-[11px]">
                  <span className="w-3.5 h-3.5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin"></span>
                  <span>Synthesizing live telemetry and historical traffic models...</span>
                </div>
              )}
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
                          ) : (() => {
                            const aiStop = aiStopsMap.get(stop.name.toLowerCase().trim());
                            const displayMins = aiStop ? aiStop.predictedEtaMins : stop.etaMins;
                            const displayClock = aiStop ? aiStop.predictedClockTime : stop.etaClockTime;

                            return (
                              <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1">
                                  {aiStop && isAiEtaEnabled && (
                                    <span
                                      className="material-symbols-outlined text-[12px] text-amber-500"
                                      title={`AI ETA predicted with historical traffic model (${aiStop.delayReason || 'On-time'})`}
                                    >
                                      auto_awesome
                                    </span>
                                  )}
                                  {etaDisplayMode === 'both' ? (
                                    <>
                                      <span
                                        className={`text-[11px] font-mono font-extrabold ${
                                          isCurrent ? 'text-[#006d42]' : 'text-slate-900'
                                        }`}
                                      >
                                        {displayClock || (displayMins ? `${displayMins}m` : '--')}
                                      </span>
                                    </>
                                  ) : etaDisplayMode === 'clock' ? (
                                    <span
                                      className={`text-[11px] font-mono font-extrabold ${
                                        isCurrent ? 'text-[#006d42]' : 'text-slate-900'
                                      }`}
                                    >
                                      {displayClock || (displayMins ? `${displayMins}m` : '--')}
                                    </span>
                                  ) : (
                                    <span
                                      className={`text-[11px] font-mono font-extrabold ${
                                        isCurrent ? 'text-[#006d42]' : 'text-slate-900'
                                      }`}
                                    >
                                      {displayMins !== undefined ? `+${displayMins}m` : '--'}
                                    </span>
                                  )}
                                </div>

                                {/* ETA Minute delta and Delay Factor */}
                                {etaDisplayMode === 'both' && displayMins !== undefined && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-semibold text-slate-500">
                                      +{displayMins} min
                                    </span>
                                    {aiStop && aiStop.delayDeltaMinutes !== 0 && (
                                      <span
                                        className={`text-[8px] font-bold px-1 rounded ${
                                          aiStop.delayDeltaMinutes > 0
                                            ? 'bg-amber-100 text-amber-800'
                                            : 'bg-emerald-100 text-emerald-800'
                                        }`}
                                        title={aiStop.delayReason}
                                      >
                                        {aiStop.delayDeltaMinutes > 0
                                          ? `+${aiStop.delayDeltaMinutes}m`
                                          : `${aiStop.delayDeltaMinutes}m`}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })()}
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
              mapType={mapType}
              routeProgression={currentProgression}
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

          {/* Top Floating Filter & Dispatch Bar (Top Left) */}
          <div className="absolute top-3 left-3 right-16 sm:right-auto z-30 flex flex-wrap items-center gap-2 pointer-events-none">
            {/* Real-time dispatch notice */}
            <div className="pointer-events-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#121a27]/95 backdrop-blur-md shadow-sm border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#006d42] animate-pulse shrink-0"></span>
              <span className="text-[11px] font-bold">Delhi Live API</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                {routeBuses.length} on Route {activeRouteId}
              </span>
            </div>

            {/* Filter Pills */}
            <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-white/95 dark:bg-[#121a27]/95 backdrop-blur-md shadow-sm border border-slate-200/90 dark:border-slate-800">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  filterType === 'all'
                    ? 'bg-[#a83301] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>All</span>
                <span className="text-[10px] opacity-75">({buses.length.toLocaleString()})</span>
              </button>

              <button
                onClick={() => setFilterType('ev')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  filterType === 'ev'
                    ? 'bg-[#006d42] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-emerald-600 dark:text-emerald-400">electric_bolt</span>
                <span>EV</span>
              </button>

              <button
                onClick={() => setFilterType('ladies')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap hidden sm:flex ${
                  filterType === 'ladies'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-pink-600 dark:text-pink-400">female</span>
                <span>Ladies</span>
              </button>

              <button
                onClick={() => setFilterType('lowfloor')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap hidden sm:flex ${
                  filterType === 'lowfloor'
                    ? 'bg-[#1a637c] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-cyan-700 dark:text-cyan-400">accessible</span>
                <span>Low-Floor</span>
              </button>
            </div>

            {/* Map Layer Mode Toggle (Transit / Satellite) */}
            <div className="pointer-events-auto p-1 rounded-xl bg-white/95 dark:bg-[#121a27]/95 backdrop-blur-md shadow-sm flex items-center border border-slate-200/90 dark:border-slate-800">
              <button
                onClick={() => setMapType('transit')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition whitespace-nowrap ${
                  mapType === 'transit' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Transit
              </button>
              <button
                onClick={() => setMapType('satellite')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition whitespace-nowrap ${
                  mapType === 'satellite' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Satellite
              </button>
            </div>
          </div>

          {/* Permanently Visible Floating Route Tracker Dock at Screen Bottom */}
          <div className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-auto max-w-xl z-30 pointer-events-auto">
            {isBottomTrackerMinimised ? (
              /* Minimized Compact View (Permanently visible pill on screen) */
              <div
                id="permanent-minimized-route-tracker"
                onClick={() => setIsBottomTrackerMinimised(false)}
                className="p-2.5 px-3.5 rounded-2xl bg-white/95 dark:bg-[#121a27]/95 backdrop-blur-md shadow-[0_8px_30px_rgba(30,35,42,0.14)] border border-slate-200/90 dark:border-slate-800 flex items-center justify-between gap-3 text-xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all animate-in fade-in duration-150 group"
                title="Click to expand Route Tracker"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006d42] animate-pulse shrink-0"></span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRoutePickerInTracker((p) => !p);
                      setIsBottomTrackerMinimised(false);
                    }}
                    className="px-2 py-0.5 rounded-lg bg-[#a83301] text-white font-extrabold text-[11px] shrink-0 hover:bg-[#ca4a1c] transition flex items-center gap-1"
                    title="Change tracked route"
                  >
                    <span>Route {activeRouteId}</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_drop_down</span>
                  </button>
                  <span className="text-[11px] text-slate-700 dark:text-slate-200 font-bold truncate">
                    Next: <span className="text-[#006d42] dark:text-[#52e89f]">{currentProgression.nextPoint}</span>
                  </span>
                  <span className="text-[11px] font-extrabold text-[#a83301] dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200/80 dark:border-amber-800 shrink-0">
                    {currentProgression.nextPointEtaMins}m
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    id="btn-expand-permanent-tracker"
                    onClick={() => setIsBottomTrackerMinimised(false)}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#a83301] hover:text-white text-slate-700 dark:text-slate-300 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs"
                    title="Maximise Route Tracker"
                  >
                    <span className="material-symbols-outlined text-[15px]">expand_less</span>
                    <span>Maximise</span>
                  </button>

                  <button
                    onClick={handleFindNearest}
                    className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800 transition cursor-pointer"
                    title="Find Nearest Bus Stand"
                  >
                    <span className="material-symbols-outlined text-[16px]">near_me</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Expanded View with Specific Route Selector & Controls */
              <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-[#121a27]/95 backdrop-blur-md shadow-[0_8px_30px_rgba(30,35,42,0.12)] border border-slate-200 dark:border-slate-800 flex flex-col gap-2.5 text-xs animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-xl bg-[#93f3ba] text-[#006d42] flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">traffic</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Interactive Route Switcher Badge */}
                        <div className="relative">
                          <button
                            onClick={() => setShowRoutePickerInTracker((p) => !p)}
                            className="px-2.5 py-1 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white text-[12px] font-black tracking-wide flex items-center gap-1 cursor-pointer shadow-xs transition"
                            title="Click to select another bus route to track"
                          >
                            <span>Route {activeRouteId}</span>
                            <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                          </button>
                        </div>

                        <span className="text-[13px] font-bold text-[#171c23] dark:text-white">
                          Tracker
                        </span>
                        <span className="inline-block w-2 h-2 rounded-full bg-[#006d42] animate-pulse"></span>
                        <span className="text-[11px] text-[#006d42] dark:text-[#52e89f] font-bold">
                          {routeBuses.length} active live
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Next Stop: <strong className="text-slate-800 dark:text-slate-200">{currentProgression.nextPoint}</strong> • ETA:{' '}
                        <strong className="text-[#a83301] dark:text-amber-400">{currentProgression.nextPointEtaMins} mins</strong>
                        {currentProgression.nextPointClockTime && (
                          <span className="ml-1 text-slate-400 dark:text-slate-500 font-mono">({currentProgression.nextPointClockTime})</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-end">
                    {/* Switch Route Button */}
                    <button
                      onClick={() => setShowRoutePickerInTracker((p) => !p)}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-900 dark:text-amber-300 text-[11px] font-extrabold border border-amber-200 dark:border-amber-800 transition-all flex items-center gap-1 cursor-pointer"
                      title="Switch to track any specific bus route"
                    >
                      <span className="material-symbols-outlined text-[15px] text-amber-700 dark:text-amber-400">tune</span>
                      <span>Change Route</span>
                    </button>

                    {/* Timeline / Stops Button */}
                    <button
                      onClick={() => {
                        setIsPanelCollapsed(false);
                        setMobileTab('timeline');
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
                      title="View all stops and timeline"
                    >
                      <span className="material-symbols-outlined text-[15px]">format_list_bulleted</span>
                      <span>Stops ({timelineStops.length})</span>
                    </button>

                    {/* Nearest Stand Button */}
                    <button
                      onClick={handleFindNearest}
                      className="px-2.5 py-1.5 rounded-xl bg-[#a83301] text-white text-[11px] font-bold shadow-sm shadow-[#a83301]/20 hover:bg-[#ca4a1c] transition-all flex items-center gap-1 cursor-pointer"
                      title="Find Nearest Bus Stand"
                    >
                      <span className="material-symbols-outlined text-[15px]">near_me</span>
                      <span className="hidden sm:inline">Nearest Stand</span>
                    </button>

                    {/* Minimise Button */}
                    <button
                      id="btn-minimise-bottom-tracker"
                      onClick={() => setIsBottomTrackerMinimised(true)}
                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-[11px] font-bold border border-slate-200 transition-all flex items-center cursor-pointer"
                      title="Minimise route tracker to compact bar"
                    >
                      <span className="material-symbols-outlined text-[16px]">expand_more</span>
                    </button>
                  </div>
                </div>

                {/* Specific Route Quick Selector Popover / Drawer */}
                {showRoutePickerInTracker && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-[#ca4a1c]">alt_route</span>
                        Select specific bus route to track:
                      </span>
                      <button
                        onClick={() => setShowRoutePickerInTracker(false)}
                        className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        Close
                      </button>
                    </div>

                    {/* Filter input */}
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={trackerRouteQuery}
                        onChange={(e) => setTrackerRouteQuery(e.target.value)}
                        placeholder="Type route number (e.g. 729, 419, 840, OMS, 505)..."
                        className="w-full h-8 pl-8 pr-3 rounded-lg bg-slate-50 dark:bg-[#1a2538] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ca4a1c] focus:bg-white dark:focus:bg-[#1a2538]"
                        autoFocus
                      />
                      <span className="material-symbols-outlined absolute left-2 top-2 text-slate-400 text-[16px]">
                        search
                      </span>
                    </div>

                    {/* Fast Route Chips Grid */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-h-32 flex-wrap">
                      {availableAllRoutes
                        .filter((r) => !trackerRouteQuery.trim() || r.routeId.toLowerCase().includes(trackerRouteQuery.toLowerCase().trim()))
                        .slice(0, 16)
                        .map((r) => {
                          const isCurrent = r.routeId.toLowerCase() === activeRouteId.toLowerCase();
                          return (
                            <button
                              key={r.routeId}
                              onClick={() => {
                                onSelectRoute(r.routeId);
                                setShowRoutePickerInTracker(false);
                                setTrackerRouteQuery('');
                                showToast(`Now tracking Route ${r.routeId} with ${r.liveCount} live buses`);
                              }}
                              className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold transition cursor-pointer flex items-center gap-1 shrink-0 ${
                                isCurrent
                                  ? 'bg-[#ca4a1c] text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                              }`}
                              title={r.name || `Route ${r.routeId}`}
                            >
                              <span>{r.routeId}</span>
                              {r.liveCount > 0 && (
                                <span className={`text-[9px] px-1 rounded-full ${isCurrent ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                                  {r.liveCount}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}
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
