/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { DTCBus, FleetSummary, RouteItem, TransitHub, BreadcrumbPoint } from './types';
import { DELHI_HUBS } from './data/terminals';
import { calculateDistanceKm } from './utils/geo';
import { Header } from './components/Header';
import { FleetStatsBar } from './components/FleetStatsBar';
import { FilterBar } from './components/FilterBar';
import { BusMap } from './components/BusMap';
import { BusDetailModal } from './components/BusDetailModal';
import { BusListView } from './components/BusListView';
import { RoutesDirectory } from './components/RoutesDirectory';
import { ApiKeyModal } from './components/ApiKeyModal';
import { AlertCircle, RefreshCw } from 'lucide-react';

const DEFAULT_API_KEY = 'qj4xC9Up9YmsSAbfywNyD0vdpubZ09m9';

export default function App() {
  // State
  const [apiKey, setApiKey] = useState<string>(DEFAULT_API_KEY);
  const [activeTab, setActiveTab] = useState<'map' | 'fleet' | 'routes'>('map');
  const [buses, setBuses] = useState<DTCBus[]>([]);
  const [summary, setSummary] = useState<FleetSummary | null>(null);
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'all' | 'ev' | 'cng'>('all');
  const [showHubs, setShowHubs] = useState<boolean>(true);

  // Bus selection & tracking
  const [selectedBus, setSelectedBus] = useState<DTCBus | null>(null);
  const [busTrail, setBusTrail] = useState<BreadcrumbPoint[]>([]);
  const [isFollowingBus, setIsFollowingBus] = useState<boolean>(false);
  const [flyToTarget, setFlyToTarget] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);

  // Refs to prevent unnecessary re-creations of fetchBuses
  const selectedBusRef = useRef<DTCBus | null>(null);
  const isFollowingBusRef = useRef<boolean>(false);
  selectedBusRef.current = selectedBus;
  isFollowingBusRef.current = isFollowingBus;

  // Auto-refresh timer
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(10);

  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  // Fetch summary and routes
  const fetchSummary = useCallback(async () => {
    try {
      const res = await fetch(`/api/buses/summary?key=${encodeURIComponent(apiKey)}`);
      const data = await res.json();
      if (data.success && data.summary) {
        setSummary(data.summary);
      }
    } catch (err: any) {
      console.warn('Failed to load fleet summary:', err.message);
    }
  }, [apiKey]);

  const fetchRoutes = useCallback(async () => {
    try {
      const res = await fetch(`/api/routes?key=${encodeURIComponent(apiKey)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setRoutes(data.data);
      }
    } catch (err: any) {
      console.warn('Failed to load routes:', err.message);
    }
  }, [apiKey]);

  // Main fetch buses function (stable identity using refs)
  const fetchBuses = useCallback(
    async (force = false) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/buses?key=${encodeURIComponent(apiKey)}${force ? '&force=true' : ''}`);
        const data = await res.json();

        if (data.success && Array.isArray(data.buses)) {
          setBuses(data.buses);

          // If tracking a bus, update its position smoothly
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
        } else {
          setError(data.error || 'Unable to fetch DTC live bus stream');
        }
      } catch (err: any) {
        setError(err.message || 'Network error connecting to DTC tracker server');
      } finally {
        setLoading(false);
        setCountdown(10);
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

  // Auto-refresh countdown loop
  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchBuses(false);
          fetchSummary();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRefresh, fetchBuses, fetchSummary]);

  // Client-side filtering
  const filteredBuses = useMemo(() => {
    return buses.filter((bus) => {
      // Type filter
      if (selectedType !== 'all' && bus.type !== selectedType) {
        return false;
      }

      // Route filter
      if (selectedRoute && bus.routeId.toLowerCase() !== selectedRoute.toLowerCase()) {
        return false;
      }

      // Search query (matches plate or route)
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toUpperCase();
        const matchesPlate = bus.id.includes(q);
        const matchesRoute = bus.routeId.toUpperCase().includes(q);
        if (!matchesPlate && !matchesRoute) {
          return false;
        }
      }

      return true;
    });
  }, [buses, selectedType, selectedRoute, searchQuery]);

  // Handlers
  const handleSelectBus = (bus: DTCBus) => {
    setSelectedBus(bus);
    setFlyToTarget({ lat: bus.lat, lng: bus.lng, zoom: 15 });
    if (activeTab !== 'map') {
      setActiveTab('map');
    }
  };

  const handleFilterRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    setSelectedBus(null);
    setActiveTab('map');
  };

  const handleSelectHub = (hub: TransitHub) => {
    setFlyToTarget({ lat: hub.lat, lng: hub.lng, zoom: 15 });
    if (activeTab !== 'map') {
      setActiveTab('map');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedRoute('');
    setSelectedType('all');
    setSelectedBus(null);
  };

  const handleFollowBus = (bus: DTCBus) => {
    setIsFollowingBus((prev) => !prev);
    setFlyToTarget({ lat: bus.lat, lng: bus.lng, zoom: 16 });
  };

  const handleFindNearestStand = () => {
    setActiveTab('map');
    setShowHubs(true);

    const locateClosest = (lat: number, lng: number) => {
      let closest: TransitHub = DELHI_HUBS[0];
      let min = Infinity;
      DELHI_HUBS.forEach((hub) => {
        const d = calculateDistanceKm(lat, lng, hub.lat, hub.lng);
        if (d < min) {
          min = d;
          closest = hub;
        }
      });
      setFlyToTarget({ lat: closest.lat, lng: closest.lng, zoom: 16 });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          locateClosest(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          locateClosest(28.6297, 77.2142); // Default to Central Delhi
        },
        { timeout: 6000 }
      );
    } else {
      locateClosest(28.6297, 77.2142);
    }
  };

  const hasActiveFilters = Boolean(searchQuery || selectedRoute || selectedType !== 'all');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <Header
        summary={summary}
        loading={loading}
        onRefresh={() => {
          fetchBuses(true);
          fetchSummary();
        }}
        countdown={countdown}
        autoRefresh={autoRefresh}
        onToggleAutoRefresh={() => setAutoRefresh((p) => !p)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 space-y-4">
        {/* Error / Offline Notice */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <span className="font-bold">Live Telemetry Notice: </span>
              <span>{error}</span>
              <p className="text-xs text-rose-700 mt-1">
                The application will automatically use cached fleet telemetry and retry connecting.
              </p>
            </div>
            <button
              onClick={() => fetchBuses(true)}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
            >
              Retry Sync
            </button>
          </div>
        )}

        {/* Fleet Metrics Overview */}
        <FleetStatsBar
          summary={summary}
          loading={loading}
          selectedType={selectedType}
          onFilterType={setSelectedType}
        />

        {/* Global Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedRoute={selectedRoute}
          onRouteChange={setSelectedRoute}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          topRoutes={summary?.topRoutes || []}
          allRoutes={routes}
          onSelectHub={handleSelectHub}
          onFindNearestStand={handleFindNearestStand}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          totalFilteredBuses={filteredBuses.length}
        />

        {/* Persistent Content Views */}
        <div className="flex-1">
          {/* Map View (kept mounted to preserve Leaflet cache and zoom state) */}
          <div className={activeTab === 'map' ? 'relative h-[650px] w-full block' : 'hidden'}>
            <BusMap
              buses={filteredBuses}
              selectedBus={selectedBus}
              onSelectBus={handleSelectBus}
              flyToTarget={flyToTarget}
              busTrail={busTrail}
              showHubs={showHubs}
              onToggleHubs={() => setShowHubs((p) => !p)}
              selectedRoute={selectedRoute}
              onSelectRoute={handleFilterRoute}
              onSelectHub={handleSelectHub}
            />

            {/* Selected Bus Modal */}
            <BusDetailModal
              bus={selectedBus}
              onClose={() => setSelectedBus(null)}
              onFilterRoute={handleFilterRoute}
              onFollowBus={handleFollowBus}
              isFollowing={isFollowingBus}
              allBuses={buses}
            />
          </div>

          {/* Fleet Directory Tab */}
          <div className={activeTab === 'fleet' ? 'min-h-[550px] block' : 'hidden'}>
            <BusListView
              buses={filteredBuses}
              onSelectBus={handleSelectBus}
              selectedBusId={selectedBus?.id}
              onFilterRoute={handleFilterRoute}
            />
          </div>

          {/* Routes Directory Tab */}
          <div className={activeTab === 'routes' ? 'min-h-[550px] block' : 'hidden'}>
            <RoutesDirectory
              routes={routes}
              onSelectRoute={handleFilterRoute}
              selectedRoute={selectedRoute}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>DTC Bus Live Real-Time Tracking</strong> • Powered by Delhi Open Transit Data (OTD)
          </div>
          <div className="flex items-center gap-3">
            <span>Official GTFS-RT Telemetry</span>
            <span>•</span>
            <span className="font-mono text-slate-600">Key: {DEFAULT_API_KEY.slice(0, 4)}...{DEFAULT_API_KEY.slice(-4)}</span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentKey={apiKey}
        onSaveKey={(newKey) => {
          setApiKey(newKey);
          fetchBuses(true);
          fetchSummary();
        }}
      />
    </div>
  );
}
