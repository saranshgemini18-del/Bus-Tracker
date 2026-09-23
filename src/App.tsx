/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DTCBus, FleetSummary, RouteItem, TransitHub, BreadcrumbPoint } from './types';
import { CivicSidebar } from './components/CivicSidebar';
import { CivicFooter } from './components/CivicFooter';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { LiveMapView } from './components/views/LiveMapView';
import { NearbyStopsView } from './components/views/NearbyStopsView';
import { FareAndPassView } from './components/views/FareAndPassView';
import { HelpAndSupportView } from './components/views/HelpAndSupportView';
import { ContactAndGrievanceView } from './components/views/ContactAndGrievanceView';
import { HomeView } from './components/views/HomeView';
import { AboutUsView } from './components/views/AboutUsView';
import { RouteFinderModal } from './components/RouteFinderModal';
import { FavoritesModal } from './components/FavoritesModal';
import { ThemeToggle } from './components/ThemeToggle';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AlertProvider, useBusAlerts } from './context/AlertContext';
import { SetArrivalAlertModal } from './components/SetArrivalAlertModal';
import { TriggeredAlertModal } from './components/TriggeredAlertModal';
import { ActiveAlertsModal } from './components/ActiveAlertsModal';
import { ActiveAlertsIndicator } from './components/ActiveAlertsIndicator';
import { AlertCircle } from 'lucide-react';

const DEFAULT_API_KEY = 'qj4xC9Up9YmsSAbfywNyD0vdpubZ09m9';

function AppAlertsManager({
  buses,
  onTrackBus,
  isAlertsModalOpen,
  setIsAlertsModalOpen,
}: {
  buses: DTCBus[];
  onTrackBus: (busId: string, routeId: string) => void;
  isAlertsModalOpen: boolean;
  setIsAlertsModalOpen: (open: boolean) => void;
}) {
  const {
    isSetAlertModalOpen,
    closeSetAlertModal,
    modalInitialBus,
    modalInitialStop,
    modalInitialRouteId,
    openSetAlertModal,
  } = useBusAlerts();

  return (
    <>
      <SetArrivalAlertModal
        isOpen={isSetAlertModalOpen}
        onClose={closeSetAlertModal}
        buses={buses}
        initialBus={modalInitialBus}
        initialStop={modalInitialStop}
        initialRouteId={modalInitialRouteId}
      />
      <TriggeredAlertModal buses={buses} onTrackBus={onTrackBus} />
      <ActiveAlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        onOpenSetAlert={() => openSetAlertModal()}
        buses={buses}
      />
    </>
  );
}

export default function App() {
  // Navigation & Preferences State (sync with browser URL pathname)
  const getInitialPath = () => {
    if (typeof window === 'undefined') return 'home';
    const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const validPaths = [
      'home',
      'live-map',
      'nearby-bus-stops',
      'fare-and-pass',
      'about-us',
      'help-and-support',
      'contact-us-and-grievance',
    ];
    if (validPaths.includes(cleanPath)) {
      return cleanPath;
    }
    return 'home';
  };

  const [activePath, setActivePathState] = useState<string>(getInitialPath);
  const [fontScale, setFontScale] = useState<number>(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [isRouteFinderOpen, setIsRouteFinderOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Sync activePath with window URL and browser history
  const setActivePath = useCallback((newPath: string) => {
    setActivePathState(newPath);
    if (typeof window !== 'undefined') {
      const urlPath = newPath === 'home' ? '/' : `/${newPath}`;
      if (window.location.pathname !== urlPath) {
        window.history.pushState({ path: newPath }, '', urlPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      const path = cleanPath || 'home';
      setActivePathState(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document page title with active webpage
  useEffect(() => {
    const titles: Record<string, string> = {
      'home': 'Home • DTC Delhi Transit Portal • दिल्ली बस सेवा',
      'live-map': 'Live Bus Map & GTFS Telemetry • DTC Delhi',
      'nearby-bus-stops': 'Nearby Bus Stops & Interchanges • DTC Delhi',
      'fare-and-pass': 'Fares, Passes & Pink Tickets • DTC Delhi',
      'about-us': 'About Us • Delhi Transport Corporation (DTC)',
      'help-and-support': 'Help & Support • DTC Commuter Assistance',
      'contact-us-and-grievance': 'Contact & Grievance Redressal • DTC Delhi',
    };
    if (typeof document !== 'undefined') {
      document.title = titles[activePath] || 'DTC Live Bus Tracker • दिल्ली बस ट्रैकर';
    }
  }, [activePath]);

  // Telematics State
  const [apiKey] = useState<string>(DEFAULT_API_KEY);
  const [buses, setBuses] = useState<DTCBus[]>([]);
  const [summary, setSummary] = useState<FleetSummary | null>(null);
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Bus selection & route filters
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedBus, setSelectedBus] = useState<DTCBus | null>(null);
  const [busTrail, setBusTrail] = useState<BreadcrumbPoint[]>([]);
  const [isFollowingBus, setIsFollowingBus] = useState<boolean>(false);
  const [flyToTarget, setFlyToTarget] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);
  const [triggerNearestStandCount, setTriggerNearestStandCount] = useState<number>(0);

  // Refs for stable identity
  const selectedBusRef = useRef<DTCBus | null>(null);
  const isFollowingBusRef = useRef<boolean>(false);
  const busesRef = useRef<DTCBus[]>([]);
  selectedBusRef.current = selectedBus;
  isFollowingBusRef.current = isFollowingBus;
  busesRef.current = buses;

  // Fetch summary and routes
  const fetchSummary = useCallback(async () => {
    try {
      const res = await fetch(`/api/buses/summary?key=${encodeURIComponent(apiKey)}`);
      const data = await res.json();
      if (data.success && data.summary) {
        setSummary(data.summary);
      }
    } catch {
      // Background silent
    }
  }, [apiKey]);

  const fetchRoutes = useCallback(async () => {
    try {
      const res = await fetch(`/api/routes?key=${encodeURIComponent(apiKey)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setRoutes(data.data);
      }
    } catch {
      // Background silent
    }
  }, [apiKey]);

  // Main fetch buses function
  const fetchBuses = useCallback(
    async (force = false) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/buses?key=${encodeURIComponent(apiKey)}${force ? '&force=true' : ''}`);
        const data = await res.json();

        if (data.success && Array.isArray(data.buses) && data.buses.length > 0) {
          setBuses(data.buses);
          setError(null);

          const currentSelected = selectedBusRef.current;
          if (currentSelected) {
            const updated = data.buses.find((b: DTCBus) => b.id === currentSelected.id);
            if (updated) {
              setSelectedBus(updated);
              if (isFollowingBusRef.current) {
                setFlyToTarget({ lat: updated.lat, lng: updated.lng });
              }
            }
          }
        } else if (busesRef.current.length === 0) {
          setError(data.error || 'Connecting to Delhi Open Transit telemetry...');
        }
      } catch (err: any) {
        if (busesRef.current.length === 0) {
          setError(err.message || 'Connecting to Delhi Open Transit telemetry...');
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  // Initial load
  useEffect(() => {
    fetchBuses(true);
    fetchSummary();
    fetchRoutes();
  }, [fetchBuses, fetchSummary, fetchRoutes]);

  // Fetch bus trail when a specific bus is selected
  useEffect(() => {
    if (!selectedBus) {
      setBusTrail([]);
      setIsFollowingBus(false);
      return;
    }

    fetch(`/api/buses/${selectedBus.id}?key=${encodeURIComponent(apiKey)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.trail)) {
          setBusTrail(data.trail);
        }
      })
      .catch((e) => console.warn('Failed to fetch bus trail:', e));
  }, [selectedBus?.id, apiKey]);

  // Auto-refresh loop every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      fetchBuses(false);
      fetchSummary();
    }, 10000);
    return () => clearInterval(timer);
  }, [fetchBuses, fetchSummary]);

  // Global keyboard shortcut for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActivePath('live-map');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSelectBus = (bus: DTCBus | null) => {
    setSelectedBus(bus);
    if (bus) {
      setFlyToTarget({ lat: bus.lat, lng: bus.lng, zoom: 15 });
      if (activePath !== 'live-map') {
        setActivePath('live-map');
      }
    }
  };

  const handleSelectRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setSelectedBus(null);
    if (activePath !== 'live-map') {
      setActivePath('live-map');
    }
  };

  const handleSelectHub = (hub: TransitHub) => {
    setFlyToTarget({ lat: hub.lat, lng: hub.lng, zoom: 15 });
    if (activePath !== 'live-map') {
      setActivePath('live-map');
    }
  };

  const handleFollowBus = (bus: DTCBus) => {
    setIsFollowingBus((prev) => !prev);
    setFlyToTarget({ lat: bus.lat, lng: bus.lng, zoom: 16 });
  };

  const handleGlobalSearch = (query: string) => {
    if (query.trim()) {
      setSelectedRoute(query.trim());
      if (activePath !== 'live-map') {
        setActivePath('live-map');
      }
    }
  };

  return (
    <AlertProvider
      buses={buses}
      onSelectBus={(bus) => {
        setSelectedBus(bus);
        setSelectedRoute(bus.routeId);
        setActivePath('live-map');
      }}
      onSelectRoute={(routeId) => {
        setSelectedRoute(routeId);
        setActivePath('live-map');
      }}
    >
      <div
        className="min-h-screen flex flex-col lg:flex-row bg-[#f8f9ff] dark:bg-[#0b0f17] text-[#171c23] dark:text-[#f1f5f9] antialiased transition-colors"
        style={{ fontSize: `${fontScale}rem` }}
      >
        {/* Global Desktop Header Tools (Arrival Alerts, Install App & Dark Mode Toggle) */}
        <div className="hidden lg:flex fixed top-4 right-5 z-40 items-center gap-2.5">
          <ActiveAlertsIndicator onOpenModal={() => setIsAlertsModalOpen(true)} language={language} />
          <PWAInstallButton variant="compact" language={language} className="shadow-md" />
          <ThemeToggle size="md" showLabel={true} className="shadow-md" />
        </div>

        {/* Fixed Left Civic Sidebar */}
        <CivicSidebar
          activePath={activePath}
          onNavigate={setActivePath}
          busesCount={buses.length || summary?.totalBuses || 6420}
          onSearch={handleGlobalSearch}
          fontScale={fontScale}
          onFontScaleChange={setFontScale}
          language={language}
          onLanguageToggle={() => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'))}
          onOpenRouteFinder={() => setIsRouteFinderOpen(true)}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          onOpenSOS={() => setIsSOSOpen(true)}
          onOpenAlerts={() => setIsAlertsModalOpen(true)}
          isOpenMobile={isMobileSidebarOpen}
          onToggleMobile={() => setIsMobileSidebarOpen((p) => !p)}
          isCollapsedDesktop={isSidebarCollapsed}
          onToggleCollapseDesktop={() => setIsSidebarCollapsed((p) => !p)}
        />

      {/* Main Content Area (offset on desktop for sidebar, offset on mobile for top bar) */}
      <main
        className={`flex-1 flex flex-col min-w-0 pt-16 lg:pt-0 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        } transition-[padding] duration-300`}
      >
        {/* Telemetry Notice if offline */}
        {error && (
          <div className="mx-4 sm:mx-6 lg:mx-10 mt-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-center justify-between text-xs shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                <strong>Live Telemetry Notice: </strong>
                {error}. Serving cached Delhi transit data.
              </span>
            </div>
            <button
              onClick={() => fetchBuses(true)}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-sm"
            >
              Retry Sync
            </button>
          </div>
        )}

        {/* View 0: Home Page */}
        <div className={activePath === 'home' ? 'flex-1 block' : 'hidden'}>
          <HomeView
            buses={buses}
            summary={summary}
            onNavigateTab={setActivePath}
            onSelectRoute={handleSelectRoute}
            onSelectHub={handleSelectHub}
            onOpenSOS={() => setIsSOSOpen(true)}
            onOpenRouteFinder={() => setIsRouteFinderOpen(true)}
          />
        </div>

        {/* View 1: Live Map */}
        <div className={activePath === 'live-map' ? 'flex-1 flex flex-col min-h-0 h-[calc(100vh-64px)] lg:h-screen w-full' : 'hidden'}>
          <LiveMapView
            buses={buses}
            summary={summary}
            routes={routes}
            selectedBus={selectedBus}
            onSelectBus={handleSelectBus}
            onCloseBusDetail={() => setSelectedBus(null)}
            selectedRoute={selectedRoute}
            onSelectRoute={handleSelectRoute}
            flyToTarget={flyToTarget}
            busTrail={busTrail}
            isFollowingBus={isFollowingBus}
            onFollowBus={handleFollowBus}
            onSelectHub={handleSelectHub}
            triggerNearestStandCount={triggerNearestStandCount}
            onTriggerNearestStand={() => setTriggerNearestStandCount((p) => p + 1)}
          />
        </div>

        {/* View 2: Nearby Bus Stops */}
        <div className={activePath === 'nearby-bus-stops' ? 'flex-1 flex flex-col min-h-0 h-[calc(100vh-64px)] lg:h-screen w-full' : 'hidden'}>
          <NearbyStopsView
            buses={buses}
            onSelectRoute={handleSelectRoute}
            onNavigateTab={setActivePath}
            onSelectHub={handleSelectHub}
            onSelectBus={handleSelectBus}
          />
        </div>

        {/* View 3: Fare & Pass */}
        <div className={activePath === 'fare-and-pass' ? 'flex-1 block' : 'hidden'}>
          <FareAndPassView />
        </div>

        {/* View 4: About Us */}
        <div className={activePath === 'about-us' ? 'flex-1 block' : 'hidden'}>
          <AboutUsView
            onNavigateTab={setActivePath}
            onOpenSOS={() => setIsSOSOpen(true)}
          />
        </div>

        {/* View 5: Help & Support */}
        <div className={activePath === 'help-and-support' ? 'flex-1 block' : 'hidden'}>
          <HelpAndSupportView
            onNavigateTab={setActivePath}
            onOpenSOS={() => setIsSOSOpen(true)}
          />
        </div>

        {/* View 6: Contact Us & Grievance */}
        <div className={activePath === 'contact-us-and-grievance' ? 'flex-1 block' : 'hidden'}>
          <ContactAndGrievanceView />
        </div>

        {/* Civic Footer for scrollable views (inside main, not adjacent column!) */}
        {activePath !== 'live-map' && activePath !== 'nearby-bus-stops' && (
          <CivicFooter
            onOpenSOS={() => setIsSOSOpen(true)}
            onNavigateTab={setActivePath}
          />
        )}
      </main>

      {/* Emergency SOS Modal */}
      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />

      {/* Bus Stand Route Finder Modal */}
      <RouteFinderModal
        isOpen={isRouteFinderOpen}
        onClose={() => setIsRouteFinderOpen(false)}
        onSelectRoute={handleSelectRoute}
        buses={buses}
      />

      {/* Favorite Commuter Routes Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectRoute={handleSelectRoute}
        buses={buses}
      />

      {/* Bus Arrival Alerts Manager (Set Alert Modal, Triggered Alert Modal & Active Alerts Drawer) */}
      <AppAlertsManager
        buses={buses}
        onTrackBus={(busId, routeId) => {
          setSelectedRoute(routeId);
          const targetBus = buses.find((b) => b.id === busId);
          if (targetBus) setSelectedBus(targetBus);
          setActivePath('live-map');
        }}
        isAlertsModalOpen={isAlertsModalOpen}
        setIsAlertsModalOpen={setIsAlertsModalOpen}
      />

      {/* Global Offline Network Status Indicator */}
      <OfflineIndicator />
    </div>
    </AlertProvider>
  );
}

