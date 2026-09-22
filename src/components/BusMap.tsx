/// <reference types="google.maps" />
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  APIProvider,
  Map,
  useMap,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { DTCBus, TransitHub, BreadcrumbPoint } from '../types';
import { DELHI_HUBS } from '../data/terminals';
import { calculateDistanceKm, formatDistance } from '../utils/geo';
import { resolveBusProgression } from '../utils/routeResolver';
import {
  Compass,
  Navigation,
  Landmark,
  MapPin,
  Loader2,
  X,
  Bus,
  CheckCircle2,
  Zap,
  Gauge,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBf83B3b113SldNBwwK-J4CX2jDgFSQP0s';

interface BusMapProps {
  buses: DTCBus[];
  selectedBus: DTCBus | null;
  onSelectBus: (bus: DTCBus) => void;
  flyToTarget: { lat: number; lng: number; zoom?: number } | null;
  busTrail: BreadcrumbPoint[];
  showHubs: boolean;
  onToggleHubs: () => void;
  selectedRoute?: string;
  onSelectRoute?: (routeId: string) => void;
  onSelectHub?: (hub: TransitHub) => void;
  triggerNearestStandCount?: number;
}

interface HoveredBusInfo {
  bus: DTCBus;
  x: number;
  y: number;
}

interface NearestStandState {
  hub: TransitHub;
  distanceKm: number;
  nearbyBusCount: number;
  referenceName: string;
  userCoords?: { lat: number; lng: number };
}

/**
 * High-performance Google Maps Canvas Overlay
 * Renders 3,500+ bus positions in a single 60fps canvas draw call
 * Eliminates DOM thrashing and completely removes map lag
 */
function HighPerformanceBusCanvas({
  buses,
  selectedBus,
  onSelectBus,
  showHubs,
  selectedRoute,
  busTrail,
  setHoveredBus,
  nearestStand,
}: {
  buses: DTCBus[];
  selectedBus: DTCBus | null;
  onSelectBus: (bus: DTCBus) => void;
  showHubs: boolean;
  selectedRoute?: string;
  busTrail: BreadcrumbPoint[];
  setHoveredBus: (info: HoveredBusInfo | null) => void;
  nearestStand: NearestStandState | null;
}) {
  const map = useMap();
  const overlayRef = useRef<google.maps.OverlayView | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const busesRef = useRef<DTCBus[]>(buses);
  const selectedBusRef = useRef<DTCBus | null>(selectedBus);
  const busTrailRef = useRef<BreadcrumbPoint[]>(busTrail);
  const showHubsRef = useRef<boolean>(showHubs);
  const selectedRouteRef = useRef<string | undefined>(selectedRoute);
  const nearestStandRef = useRef<NearestStandState | null>(nearestStand);
  const animFrameRef = useRef<number | null>(null);

  busesRef.current = buses;
  selectedBusRef.current = selectedBus;
  busTrailRef.current = busTrail;
  showHubsRef.current = showHubs;
  selectedRouteRef.current = selectedRoute;
  nearestStandRef.current = nearestStand;

  // Redraw trigger
  const requestRedraw = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      if (overlayRef.current) {
        overlayRef.current.draw();
      }
    });
  }, []);

  useEffect(() => {
    if (!map) return;

    // Create custom OverlayView
    const overlay = new google.maps.OverlayView();
    overlayRef.current = overlay;

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = null;

    overlay.onAdd = function () {
      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'auto'; // allow mouse/touch events for click & hover
      canvas.style.cursor = 'default';
      canvasRef.current = canvas;

      ctx = canvas.getContext('2d', { alpha: true });

      const panes = this.getPanes();
      if (panes && panes.overlayMouseTarget) {
        panes.overlayMouseTarget.appendChild(canvas);
      }

      // Event listeners on canvas for instant click & hover
      const getEventCoords = (e: MouseEvent | Touch) => {
        const rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          clientX: e.clientX,
          clientY: e.clientY,
        };
      };

      const findBusAtPixel = (x: number, y: number, hitRadius = 22): DTCBus | null => {
        const projection = overlay.getProjection();
        if (!projection) return null;

        const currentBuses = busesRef.current;
        let closest: DTCBus | null = null;
        let minDistSq = hitRadius * hitRadius;

        for (let i = 0; i < currentBuses.length; i++) {
          const b = currentBuses[i];
          const pos = projection.fromLatLngToDivPixel(new google.maps.LatLng(b.lat, b.lng));
          if (!pos) continue;

          const dx = pos.x - x;
          const dy = pos.y - y;
          const distSq = dx * dx + dy * dy;

          if (distSq < minDistSq) {
            minDistSq = distSq;
            closest = b;
          }
        }
        return closest;
      };

      canvas.addEventListener('click', (e) => {
        const { x, y } = getEventCoords(e);
        const hit = findBusAtPixel(x, y);
        if (hit) {
          onSelectBus(hit);
        }
      });

      canvas.addEventListener('mousemove', (e) => {
        const { x, y, clientX, clientY } = getEventCoords(e);
        const hit = findBusAtPixel(x, y, 18);
        if (hit) {
          canvas.style.cursor = 'pointer';
          setHoveredBus({ bus: hit, x: clientX, y: clientY });
        } else {
          canvas.style.cursor = 'default';
          setHoveredBus(null);
        }
      });

      canvas.addEventListener('mouseleave', () => {
        setHoveredBus(null);
      });
    };

    overlay.draw = function () {
      const projection = this.getProjection();
      if (!projection || !canvas || !ctx) return;

      const mapDiv = map.getDiv();
      const width = mapDiv.clientWidth;
      const height = mapDiv.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      // Ensure canvas matches screen resolution
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      // Convert origin to top-left of the projection
      const bounds = map.getBounds();
      if (!bounds) return;

      const ne = projection.fromLatLngToDivPixel(bounds.getNorthEast());
      const sw = projection.fromLatLngToDivPixel(bounds.getSouthWest());
      if (!ne || !sw) return;

      const minX = Math.min(ne.x, sw.x);
      const minY = Math.min(ne.y, sw.y);

      canvas.style.left = `${minX}px`;
      canvas.style.top = `${minY}px`;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const currentBuses = busesRef.current;
      const currentSelected = selectedBusRef.current;
      const currentTrail = busTrailRef.current;
      const currentRoute = selectedRouteRef.current;
      const currentHubs = showHubsRef.current;
      const currentNearest = nearestStandRef.current;

      const zoom = map.getZoom() || 12;

      // 1. Draw Breadcrumb Trail for selected bus
      if (currentSelected && currentTrail.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = currentSelected.type === 'ev' ? '#10b981' : '#6366f1';
        ctx.lineWidth = 3.5;
        ctx.setLineDash([5, 5]);

        let hasStarted = false;
        for (const pt of currentTrail) {
          const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(pt.lat, pt.lng));
          if (!p) continue;
          const canvasX = p.x - minX;
          const canvasY = p.y - minY;
          if (!hasStarted) {
            ctx.moveTo(canvasX, canvasY);
            hasStarted = true;
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. Draw Nearest Stand Connector Line & User Pin (if active)
      if (currentNearest && currentNearest.userCoords) {
        const uPos = projection.fromLatLngToDivPixel(
          new google.maps.LatLng(currentNearest.userCoords.lat, currentNearest.userCoords.lng)
        );
        const sPos = projection.fromLatLngToDivPixel(
          new google.maps.LatLng(currentNearest.hub.lat, currentNearest.hub.lng)
        );

        if (uPos && sPos) {
          const ux = uPos.x - minX;
          const uy = uPos.y - minY;
          const sx = sPos.x - minX;
          const sy = sPos.y - minY;

          // Connecting dashed line
          ctx.beginPath();
          ctx.strokeStyle = '#059669';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([6, 4]);
          ctx.moveTo(ux, uy);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          ctx.setLineDash([]);

          // User location circle
          ctx.beginPath();
          ctx.arc(ux, uy, 7, 0, 2 * Math.PI);
          ctx.fillStyle = '#2563eb';
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Nearest stand pulse ring
          ctx.beginPath();
          ctx.arc(sx, sy, 18, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      // 3. Draw Transit Hubs / Bus Stands if toggled on
      if (currentHubs) {
        const shouldShowLabels = zoom >= 13;
        for (const hub of DELHI_HUBS) {
          const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(hub.lat, hub.lng));
          if (!p) continue;
          const cx = p.x - minX;
          const cy = p.y - minY;

          if (cx < -30 || cx > width + 30 || cy < -30 || cy > height + 30) continue;

          const isISBT = hub.type === 'ISBT';
          const isDepot = hub.type === 'Depot';

          // Outer pin dot
          ctx.beginPath();
          ctx.arc(cx, cy, isISBT ? 6.5 : 4.5, 0, 2 * Math.PI);
          ctx.fillStyle = isISBT ? '#ea580c' : isDepot ? '#334155' : '#0284c7';
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          if (shouldShowLabels && (isISBT || zoom >= 14)) {
            ctx.font = '600 10px system-ui, sans-serif';
            ctx.fillStyle = '#0f172a';
            ctx.textAlign = 'center';
            ctx.fillText(hub.name, cx, cy - 8);
          }
        }
      }

      // 4. Draw Fleet Buses
      const isFilteredRoute = Boolean(currentRoute);
      const isBusDense = currentBuses.length > 200;
      const baseRadius = zoom < 12 ? 3.5 : zoom < 14 ? 4.5 : 5.5;

      // Group buses into: normal dots, selected bus on top
      let selectedBusPos: { x: number; y: number } | null = null;

      for (let i = 0; i < currentBuses.length; i++) {
        const bus = currentBuses[i];
        const isSelected = currentSelected?.id === bus.id;

        const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(bus.lat, bus.lng));
        if (!p) continue;
        const cx = p.x - minX;
        const cy = p.y - minY;

        // Skip offscreen
        if (cx < -20 || cx > width + 20 || cy < -20 || cy > height + 20) continue;

        if (isSelected) {
          selectedBusPos = { x: cx, y: cy };
          continue; // render on top later
        }

        const isEV = bus.type === 'ev';
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, 2 * Math.PI);
        ctx.fillStyle = isEV ? '#10b981' : '#4f46e5';
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // If zoomed in or filtered by route, draw route number pill
        if (isFilteredRoute || (!isBusDense && zoom >= 14)) {
          ctx.font = '700 9px system-ui, monospace';
          const text = bus.routeId;
          const textWidth = ctx.measureText(text).width;
          const pillW = textWidth + 8;
          const pillH = 14;

          ctx.fillStyle = isEV ? 'rgba(6, 78, 59, 0.9)' : 'rgba(30, 27, 75, 0.9)';
          ctx.beginPath();
          ctx.roundRect(cx - pillW / 2, cy + 6, pillW, pillH, 3);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, cx, cy + 13);
        }
      }

      // 5. Render Selected Bus Highlight on Top
      if (selectedBusPos && currentSelected) {
        const { x, y } = selectedBusPos;
        const isEV = currentSelected.type === 'ev';

        // Outer glowing pulse ring
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, 2 * Math.PI);
        ctx.fillStyle = isEV ? 'rgba(16, 185, 129, 0.25)' : 'rgba(99, 102, 241, 0.25)';
        ctx.fill();
        ctx.strokeStyle = isEV ? '#10b981' : '#6366f1';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 2 * Math.PI);
        ctx.fillStyle = isEV ? '#059669' : '#4338ca';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Top prominent route badge
        ctx.font = '800 11px system-ui, monospace';
        const badgeText = `${isEV ? '⚡ ' : '🚌 '}${currentSelected.routeId}`;
        const badgeWidth = ctx.measureText(badgeText).width + 12;
        const badgeHeight = 18;

        ctx.fillStyle = '#09090b';
        ctx.beginPath();
        ctx.roundRect(x - badgeWidth / 2, y - 28, badgeWidth, badgeHeight, 5);
        ctx.fill();
        ctx.strokeStyle = isEV ? '#34d399' : '#818cf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, x, y - 19);
      }

      ctx.restore();
    };

    overlay.onRemove = function () {
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      canvasRef.current = null;
    };

    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
      overlayRef.current = null;
    };
  }, [map, onSelectBus, setHoveredBus]);

  // Redraw when buses, selectedBus, or filters change
  useEffect(() => {
    requestRedraw();
  }, [buses, selectedBus, showHubs, selectedRoute, busTrail, nearestStand, requestRedraw]);

  return null;
}

/**
 * Controller Component to smoothly animate Google Map flyTo & route auto-fit
 */
function MapCameraController({
  flyToTarget,
  selectedRoute,
  buses,
}: {
  flyToTarget: { lat: number; lng: number; zoom?: number } | null;
  selectedRoute?: string;
  buses: DTCBus[];
}) {
  const map = useMap();
  const lastFittedRoute = useRef<string | null>(null);

  useEffect(() => {
    if (!map || !flyToTarget) return;
    map.panTo({ lat: flyToTarget.lat, lng: flyToTarget.lng });
    if (flyToTarget.zoom && map.getZoom() !== flyToTarget.zoom) {
      map.setZoom(flyToTarget.zoom);
    }
  }, [map, flyToTarget]);

  useEffect(() => {
    if (!map || !selectedRoute || selectedRoute === lastFittedRoute.current) return;
    lastFittedRoute.current = selectedRoute;

    if (buses.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      buses.forEach((b) => bounds.extend({ lat: b.lat, lng: b.lng }));
      map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
    }
  }, [map, selectedRoute, buses]);

  return null;
}

export const BusMap: React.FC<BusMapProps> = ({
  buses,
  selectedBus,
  onSelectBus,
  flyToTarget,
  busTrail,
  showHubs,
  onToggleHubs,
  selectedRoute,
  onSelectRoute,
  onSelectHub,
  triggerNearestStandCount,
}) => {
  const [hoveredBus, setHoveredBus] = useState<HoveredBusInfo | null>(null);
  const [nearestStand, setNearestStand] = useState<NearestStandState | null>(null);
  const [isFindingNearest, setIsFindingNearest] = useState<boolean>(false);
  const [selectedHubPopup, setSelectedHubPopup] = useState<TransitHub | null>(null);
  const [internalFlyTo, setInternalFlyTo] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);

  // Active flyTo target combines external (from parent) or internal (from nearest stand / center)
  const activeFlyTo = internalFlyTo || flyToTarget;

  // Find nearest bus stand
  const handleFindNearestStand = useCallback(() => {
    setIsFindingNearest(true);

    const computeNearest = (userLat: number, userLng: number, isGps: boolean) => {
      let closest: TransitHub = DELHI_HUBS[0];
      let minDistance = Infinity;

      DELHI_HUBS.forEach((hub) => {
        const dist = calculateDistanceKm(userLat, userLng, hub.lat, hub.lng);
        if (dist < minDistance) {
          minDistance = dist;
          closest = hub;
        }
      });

      const nearbyBuses = buses.filter(
        (b) => calculateDistanceKm(closest.lat, closest.lng, b.lat, b.lng) <= 2.5
      ).length;

      setNearestStand({
        hub: closest,
        distanceKm: minDistance,
        nearbyBusCount: nearbyBuses,
        referenceName: isGps ? 'Your GPS Location' : 'Central Delhi',
        userCoords: { lat: userLat, lng: userLng },
      });

      // Fly Google Maps directly to the nearest stand
      setInternalFlyTo({
        lat: closest.lat,
        lng: closest.lng,
        zoom: 16,
      });

      setIsFindingNearest(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          computeNearest(pos.coords.latitude, pos.coords.longitude, true);
        },
        () => {
          // Fallback to Central Delhi (Shivaji Stadium / Connaught Place)
          computeNearest(28.6297, 77.2142, false);
        },
        { timeout: 6000, enableHighAccuracy: true }
      );
    } else {
      computeNearest(28.6297, 77.2142, false);
    }
  }, [buses]);

  // Listen for trigger from parent (e.g. FilterBar button)
  useEffect(() => {
    if (triggerNearestStandCount && triggerNearestStandCount > 0) {
      handleFindNearestStand();
    }
  }, [triggerNearestStandCount, handleFindNearestStand]);

  // Center on Delhi
  const handleCenterDelhi = () => {
    setInternalFlyTo({ lat: 28.6297, lng: 77.2142, zoom: 12 });
  };

  // Locate User GPS
  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setInternalFlyTo({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          zoom: 15,
        });
      },
      (err) => {
        console.warn('Geolocation failed:', err.message);
      }
    );
  };

  const activeProgression = selectedBus ? resolveBusProgression(selectedBus, buses) : null;

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-100 flex flex-col font-sans">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} solutionChannel="GMP_aistudio_transit">
        <Map
          defaultCenter={{ lat: 28.6297, lng: 77.2142 }}
          defaultZoom={12}
          minZoom={9}
          maxZoom={19}
          gestureHandling="greedy"
          disableDefaultUI={false}
          zoomControl={true}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          className="w-full h-full flex-1"
        >
          {/* High-Performance Canvas Bus Rendering Layer */}
          <HighPerformanceBusCanvas
            buses={buses}
            selectedBus={selectedBus}
            onSelectBus={onSelectBus}
            showHubs={showHubs}
            selectedRoute={selectedRoute}
            busTrail={busTrail}
            setHoveredBus={setHoveredBus}
            nearestStand={nearestStand}
          />

          {/* Camera animator */}
          <MapCameraController
            flyToTarget={activeFlyTo}
            selectedRoute={selectedRoute}
            buses={buses}
          />
        </Map>
      </APIProvider>

      {/* ========================================================================= */}
      {/* HOVER TOOLTIP ON CANVAS                                                   */}
      {/* ========================================================================= */}
      {hoveredBus && (
        <div
          id="bus-hover-tooltip"
          style={{
            position: 'fixed',
            left: `${hoveredBus.x + 12}px`,
            top: `${hoveredBus.y - 36}px`,
            pointerEvents: 'none',
          }}
          className="z-[999] bg-slate-900/95 text-white px-3 py-1.5 rounded-lg shadow-xl border border-slate-700 text-xs flex items-center gap-2 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-150"
        >
          <span className="font-mono font-bold text-amber-400 bg-black/40 px-1.5 py-0.5 rounded border border-amber-400/30">
            {hoveredBus.bus.routeId}
          </span>
          <span className="font-mono text-slate-200">{hoveredBus.bus.id}</span>
          <span className="text-slate-400">•</span>
          <span className="text-emerald-400 font-semibold">{hoveredBus.bus.speedKmH} km/h</span>
          <span className="text-slate-400 text-[10px]">Click to inspect</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NEAREST BUS STAND FLOATING BANNER                                         */}
      {/* ========================================================================= */}
      {nearestStand && (
        <div
          id="nearest-stand-banner"
          className="absolute top-3 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:max-w-lg z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-emerald-300 shadow-xl flex items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider flex items-center gap-1.5">
                <span>Nearest Bus Stand</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-normal">{nearestStand.referenceName}</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">{nearestStand.hub.name}</div>
              <div className="text-slate-600 text-[11px] flex flex-wrap items-center gap-2 mt-0.5">
                <span>Distance: <strong className="text-slate-900">{formatDistance(nearestStand.distanceKm)}</strong></span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{nearestStand.nearbyBusCount} active buses within 2.5 km</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${nearestStand.hub.lat},${nearestStand.hub.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-sm transition"
            >
              <span>Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              id="close-nearest-stand-banner-btn"
              onClick={() => setNearestStand(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAP CONTROLS (TOP RIGHT)                                                 */}
      {/* ========================================================================= */}
      <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2">
        {/* Nearest Bus Stand Action Button */}
        <button
          id="btn-nearest-bus-stand"
          onClick={handleFindNearestStand}
          disabled={isFindingNearest}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs shadow-md border border-emerald-500 transition-all cursor-pointer group"
          title="Find closest DTC bus stand to your location"
        >
          {isFindingNearest ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Locating Stand...</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>Nearest Bus Stand</span>
            </>
          )}
        </button>

        {/* Map View Helpers */}
        <div className="flex flex-col gap-1 bg-white/95 backdrop-blur p-1 rounded-xl shadow-md border border-slate-200">
          <button
            id="map-center-delhi-btn"
            onClick={handleCenterDelhi}
            title="Center on Central Delhi (Connaught Place)"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
          </button>

          <button
            id="map-locate-me-btn"
            onClick={handleLocateMe}
            title="Locate My GPS Position"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
          </button>

          <button
            id="map-toggle-hubs-btn"
            onClick={onToggleHubs}
            title={showHubs ? 'Hide Bus Stands / Terminals' : 'Show All Bus Stands / Terminals'}
            className={`p-2 rounded-lg transition cursor-pointer ${
              showHubs
                ? 'bg-amber-500 text-white shadow-sm'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Landmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAP LEGEND (BOTTOM LEFT)                                                 */}
      {/* ========================================================================= */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-md text-xs space-y-1.5 hidden sm:block">
        <div className="font-bold text-slate-800 text-[10px] uppercase tracking-wider flex items-center justify-between gap-3 border-b border-slate-100 pb-1">
          <span>Delhi Google Map</span>
          <span className="font-mono text-emerald-600 font-bold">{buses.length.toLocaleString()} online</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white shadow-xs inline-block"></span>
          <span className="text-slate-700 text-[11px] font-medium">Electric Bus (EV ⚡)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 border border-white shadow-xs inline-block"></span>
          <span className="text-slate-700 text-[11px] font-medium">CNG Fleet</span>
        </div>

        {showHubs && (
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-100 text-[10px]">
            <div className="flex items-center gap-1">
              <span>🚏</span>
              <span className="text-slate-600 font-medium">Bus Stands & ISBTs</span>
            </div>
            <span className="font-bold text-amber-700">{DELHI_HUBS.length}</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SELECTED BUS QUICK PREVIEW DOCK (AT MAP BOTTOM)                          */}
      {/* ========================================================================= */}
      {selectedBus && activeProgression && (
        <div
          id="bus-map-selected-dock"
          className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-96 z-10 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-xl text-xs space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm bg-slate-900 text-amber-400 px-2 py-0.5 rounded border border-amber-400/40">
                {selectedBus.routeId}
              </span>
              <span className="font-mono font-bold text-slate-800 text-xs">
                {selectedBus.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] border border-emerald-200">
                <Gauge className="w-3 h-3" />
                {selectedBus.speedKmH} km/h
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 space-y-1">
            <div className="flex items-center gap-1 text-slate-800 font-semibold truncate">
              <span>{activeProgression.startPoint}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{activeProgression.lastPoint}</span>
            </div>
            <div className="text-emerald-700 font-medium flex items-center justify-between">
              <span>Next: <strong>{activeProgression.nextPoint}</strong></span>
              <span>{activeProgression.nextPointFormattedDistance}</span>
            </div>
          </div>

          {onSelectRoute && (
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <button
                onClick={() => onSelectRoute(selectedBus.routeId)}
                className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline cursor-pointer"
              >
                Filter all Route {selectedBus.routeId} buses
              </button>
              <span className="text-slate-400">{selectedBus.type === 'ev' ? '⚡ Low-Floor EV' : 'CNG Bus'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
