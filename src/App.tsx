/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DTCBus, FleetSummary, RouteItem, TransitHub, BreadcrumbPoint } from './types';
import { CivicHeader } from './components/CivicHeader';
import { CivicFooter } from './components/CivicFooter';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { LiveMapView } from './components/views/LiveMapView';
import { NearbyStopsView } from './components/views/NearbyStopsView';
import { FareAndPassView } from './components/views/FareAndPassView';
import { HelpAndSupportView } from './components/views/HelpAndSupportView';
import { ContactAndGrievanceView } from './components/views/ContactAndGrievanceView';
import { AlertCircle } from 'lucide-react';

const DEFAULT_API_KEY = 'qj4xC9Up9YmsSAbfywNyD0vdpubZ09m9';

export default function App() {
  // Navigation & Preferences State
  const [activePath, setActivePath] = useState<string>('live-map');
  const [fontScale, setFontScale] = useState<number>(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);

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
  const handleSelectBus = (bus: DTCBus) => {
    setSelectedBus(bus);
    setFlyToTarget({ lat: bus.lat, lng: bus.lng, zoom: 15 });
    if (activePath !== 'live-map') {
      setActivePath('live-map');
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
    <div
      className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#171c23] antialiased"
      style={{ fontSize: `${fontScale}rem` }}
    >
      {/* 80px Civic Header */}
      <CivicHeader
        activePath={activePath}
        onNavigate={setActivePath}
        busesCount={buses.length || summary?.totalBuses || 6420}
        onSearch={handleGlobalSearch}
        fontScale={fontScale}
        onFontScaleChange={setFontScale}
        language={language}
        onLanguageToggle={() => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'))}
      />

      {/* Main Content Area (padded top for 80px fixed header) */}
      <div className="pt-20 flex-1 flex flex-col">
        {/* Telemetry Notice if offline */}
        {error && (
          <div className="mx-4 sm:mx-6 lg:mx-10 mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
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

        {/* View 1: Live Map */}
        <div className={activePath === 'live-map' ? 'flex-1 flex flex-col min-h-0 h-[calc(100vh-80px)] w-full' : 'hidden'}>
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
        <div className={activePath === 'nearby-bus-stops' ? 'flex-1 flex flex-col min-h-0 h-[calc(100vh-80px)] w-full' : 'hidden'}>
          <NearbyStopsView
            buses={buses}
            onSelectRoute={handleSelectRoute}
            onNavigateTab={setActivePath}
            onSelectHub={handleSelectHub}
          />
        </div>

        {/* View 3: Fare & Pass */}
        <div className={activePath === 'fare-and-pass' ? 'flex-1 block' : 'hidden'}>
          <FareAndPassView />
        </div>

        {/* View 4: Help & Support */}
        <div className={activePath === 'help-and-support' ? 'flex-1 block' : 'hidden'}>
          <HelpAndSupportView
            onNavigateTab={setActivePath}
            onOpenSOS={() => setIsSOSOpen(true)}
          />
        </div>

        {/* View 5: Contact Us & Grievance */}
        <div className={activePath === 'contact-us-and-grievance' ? 'flex-1 block' : 'hidden'}>
          <ContactAndGrievanceView />
        </div>
      </div>

      {/* Persistent Civic Footer */}
      <CivicFooter
        onOpenSOS={() => setIsSOSOpen(true)}
        onNavigateTab={setActivePath}
      />

      {/* Emergency SOS Modal */}
      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
      />
    </div>
  );
}

