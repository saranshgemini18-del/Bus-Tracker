/// <reference types="google.maps" />
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  APIProvider,
  Map,
  useMap,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { DTCBus, TransitHub, BreadcrumbPoint, BusProgression, RouteStopStep } from '../types';
import { DELHI_HUBS, ALL_DTC_BUS_STANDS, findNearestStandFromAll } from '../data/terminals';
import { calculateDistanceKm, formatDistance } from '../utils/geo';
import { resolveBusProgression, resolveRouteProgression, normalizeRouteId } from '../utils/routeResolver';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DELHI_ROUTE_REGISTRY } from '../data/delhiRouteRegistry';
import { BusStandDetailModal } from './BusStandDetailModal';
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
  Plus,
  Minus,
  ChevronRight,
} from 'lucide-react';

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBf83B3b113SldNBwwK-J4CX2jDgFSQP0s';

interface BusMapProps {
  buses: DTCBus[];
  selectedBus: DTCBus | null;
  onSelectBus: (bus: DTCBus | null) => void;
  flyToTarget: { lat: number; lng: number; zoom?: number } | null;
  busTrail: BreadcrumbPoint[];
  showHubs: boolean;
  onToggleHubs: () => void;
  selectedRoute?: string;
  onSelectRoute?: (routeId: string) => void;
  onSelectHub?: (hub: TransitHub) => void;
  triggerNearestStandCount?: number;
  mapType?: 'transit' | 'satellite';
  routeProgression?: BusProgression | null;
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
  nearbyBuses: DTCBus[];
  referenceName: string;
  userCoords?: { lat: number; lng: number };
}

interface RenderedBusItem {
  bus: DTCBus;
  cx: number;
  cy: number;
  radius: number;
}

interface RenderedHubItem {
  hub: TransitHub;
  cx: number;
  cy: number;
  radius: number;
}

interface RenderedRouteStopItem {
  stop: RouteStopStep;
  cx: number;
  cy: number;
  radius: number;
}

/**
 * High-performance Google Maps Canvas Overlay
 * Renders 3,500+ bus positions in a single 60fps canvas draw call
 * Features viewport coordinate culling & sub-millisecond screen-cache click detection
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
  onSelectHub,
  userLocation,
  routeProgression,
}: {
  buses: DTCBus[];
  selectedBus: DTCBus | null;
  onSelectBus: (bus: DTCBus | null) => void;
  showHubs: boolean;
  selectedRoute?: string;
  busTrail: BreadcrumbPoint[];
  setHoveredBus: (info: HoveredBusInfo | null) => void;
  nearestStand: NearestStandState | null;
  onSelectHub?: (hub: TransitHub) => void;
  userLocation?: { lat: number; lng: number } | null;
  routeProgression?: BusProgression | null;
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
  const userLocationRef = useRef<{ lat: number; lng: number } | null | undefined>(userLocation);
  const routeProgressionRef = useRef<BusProgression | null | undefined>(routeProgression);
  const animFrameRef = useRef<number | null>(null);

  // Cached screen positions populated during draw() for instant sub-millisecond hit-testing
  const renderedBusesRef = useRef<RenderedBusItem[]>([]);
  const renderedHubsRef = useRef<RenderedHubItem[]>([]);
  const renderedRouteStopsRef = useRef<RenderedRouteStopItem[]>([]);

  busesRef.current = buses;
  selectedBusRef.current = selectedBus;
  busTrailRef.current = busTrail;
  showHubsRef.current = showHubs;
  selectedRouteRef.current = selectedRoute;
  nearestStandRef.current = nearestStand;
  userLocationRef.current = userLocation;
  routeProgressionRef.current = routeProgression;

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
      // Crucial: pointerEvents none allows all native map gestures (pan, zoom, pinch, double-click)
      canvas.style.pointerEvents = 'none';
      canvas.style.cursor = 'default';
      canvasRef.current = canvas;

      ctx = canvas.getContext('2d', { alpha: true });

      const panes = this.getPanes();
      if (panes && panes.overlayLayer) {
        panes.overlayLayer.appendChild(canvas);
      }
    };

    // Sub-millisecond hit test against pre-calculated screen coordinates
    const findBusAtCanvasPixel = (x: number, y: number, hitRadius = 18): DTCBus | null => {
      const rendered = renderedBusesRef.current;
      let closest: DTCBus | null = null;
      let minDistSq = hitRadius * hitRadius;

      for (let i = 0; i < rendered.length; i++) {
        const item = rendered[i];
        const dx = item.cx - x;
        const dy = item.cy - y;
        const distSq = dx * dx + dy * dy;

        if (distSq < minDistSq) {
          minDistSq = distSq;
          closest = item.bus;
        }
      }
      return closest;
    };

    const findHubAtCanvasPixel = (x: number, y: number, hitRadius = 16): TransitHub | null => {
      const rendered = renderedHubsRef.current;
      let closest: TransitHub | null = null;
      let minDistSq = hitRadius * hitRadius;

      for (let i = 0; i < rendered.length; i++) {
        const item = rendered[i];
        const dx = item.cx - x;
        const dy = item.cy - y;
        const distSq = dx * dx + dy * dy;

        if (distSq < minDistSq) {
          minDistSq = distSq;
          closest = item.hub;
        }
      }
      return closest;
    };

    // Clean Google Maps native click listener
    const clickListener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (!e.latLng || !overlayRef.current || !canvasRef.current) return;
      const projection = overlayRef.current.getProjection();
      if (!projection) return;

      const minX = parseFloat(canvasRef.current.style.left) || 0;
      const minY = parseFloat(canvasRef.current.style.top) || 0;

      const divPixel = projection.fromLatLngToDivPixel(e.latLng);
      if (!divPixel) return;

      const canvasX = divPixel.x - minX;
      const canvasY = divPixel.y - minY;

      // 1. Check if user clicked directly on a bus icon
      const hitBus = findBusAtCanvasPixel(canvasX, canvasY, 18);
      if (hitBus) {
        onSelectBus(hitBus);
        return;
      }

      // 2. Check if user clicked directly on a hub / stand icon
      const hitHub = findHubAtCanvasPixel(canvasX, canvasY, 16);
      if (hitHub && onSelectHub) {
        onSelectHub(hitHub);
        return;
      }

      // 3. User clicked empty map space: dismiss any active bus / route modal
      onSelectBus(null);
    });

    let mouseMoveThrottled = false;
    const mouseMoveListener = map.addListener('mousemove', (e: google.maps.MapMouseEvent) => {
      if (mouseMoveThrottled) return;
      mouseMoveThrottled = true;
      requestAnimationFrame(() => {
        mouseMoveThrottled = false;
        if (!e.latLng || !overlayRef.current || !canvasRef.current) return;
        const projection = overlayRef.current.getProjection();
        if (!projection) return;

        const minX = parseFloat(canvasRef.current.style.left) || 0;
        const minY = parseFloat(canvasRef.current.style.top) || 0;

        const divPixel = projection.fromLatLngToDivPixel(e.latLng);
        if (!divPixel) return;

        const canvasX = divPixel.x - minX;
        const canvasY = divPixel.y - minY;

        const hitBus = findBusAtCanvasPixel(canvasX, canvasY, 14);
        if (hitBus) {
          const mapDiv = map.getDiv();
          const rect = mapDiv.getBoundingClientRect();
          const screenX = rect.left + canvasX;
          const screenY = rect.top + canvasY;

          map.setOptions({ draggableCursor: 'pointer' });
          setHoveredBus({ bus: hitBus, x: screenX, y: screenY });
        } else {
          const hitHub = findHubAtCanvasPixel(canvasX, canvasY, 14);
          if (hitHub) {
            map.setOptions({ draggableCursor: 'pointer' });
          } else {
            map.setOptions({ draggableCursor: null });
          }
          setHoveredBus(null);
        }
      });
    });

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

      // Fast coordinate bounding-box culling (skips 85-95% offscreen calculations instantly)
      const neLatLng = bounds.getNorthEast();
      const swLatLng = bounds.getSouthWest();
      const latPad = (neLatLng.lat() - swLatLng.lat()) * 0.15;
      const lngPad = (neLatLng.lng() - swLatLng.lng()) * 0.15;
      const minLat = swLatLng.lat() - latPad;
      const maxLat = neLatLng.lat() + latPad;
      const minLng = swLatLng.lng() - lngPad;
      const maxLng = neLatLng.lng() + lngPad;

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

      // 2. Draw User GPS Location & Nearest Stand Connector (if active)
      const currentUserPos = userLocationRef.current || (currentNearest ? currentNearest.userCoords : null);
      if (currentUserPos) {
        const uPos = projection.fromLatLngToDivPixel(
          new google.maps.LatLng(currentUserPos.lat, currentUserPos.lng)
        );
        if (uPos) {
          const ux = uPos.x - minX;
          const uy = uPos.y - minY;

          // Outer pulsing radar aura
          ctx.beginPath();
          ctx.arc(ux, uy, 18, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(37, 99, 235, 0.18)';
          ctx.fill();
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Inner solid GPS disc
          ctx.beginPath();
          ctx.arc(ux, uy, 6.5, 0, 2 * Math.PI);
          ctx.fillStyle = '#2563eb';
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Center micro dot
          ctx.beginPath();
          ctx.arc(ux, uy, 2, 0, 2 * Math.PI);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          // Label
          ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = '#1e3a8a';
          ctx.textAlign = 'center';
          ctx.fillText('Your Location', ux, uy - 12);
        }
      }

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

          // Connecting dashed line to nearest stand
          ctx.beginPath();
          ctx.strokeStyle = '#059669';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([6, 4]);
          ctx.moveTo(ux, uy);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          ctx.setLineDash([]);

          // Nearest stand pulse ring
          ctx.beginPath();
          ctx.arc(sx, sy, 18, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      // 2.5 Draw Active Route Corridor Polyline and Stops (when a route or bus is active)
      const currentProgression = routeProgressionRef.current;
      const newRenderedRouteStops: RenderedRouteStopItem[] = [];

      if (currentProgression && currentProgression.orderedStops && currentProgression.orderedStops.length > 1) {
        const stops = currentProgression.orderedStops.filter(
          (s: RouteStopStep) => typeof s.lat === 'number' && typeof s.lng === 'number' && !isNaN(s.lat) && !isNaN(s.lng)
        );

        if (stops.length > 1) {
          const isElectric = currentProgression.routeId.includes('EV') || (currentSelected && currentSelected.type === 'ev');
          const primaryColor = isElectric ? '#006d42' : '#ca4a1c';
          const glowColor = isElectric ? 'rgba(0, 109, 66, 0.22)' : 'rgba(202, 74, 28, 0.22)';

          // Outer route corridor glow
          ctx.beginPath();
          ctx.strokeStyle = glowColor;
          ctx.lineWidth = 10;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          let pathStarted = false;
          for (const stop of stops) {
            const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(stop.lat!, stop.lng!));
            if (!p) continue;
            const x = p.x - minX;
            const y = p.y - minY;
            if (!pathStarted) {
              ctx.moveTo(x, y);
              pathStarted = true;
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();

          // Sharp core transit route line
          ctx.beginPath();
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 4.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          pathStarted = false;
          for (const stop of stops) {
            const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(stop.lat!, stop.lng!));
            if (!p) continue;
            const x = p.x - minX;
            const y = p.y - minY;
            if (!pathStarted) {
              ctx.moveTo(x, y);
              pathStarted = true;
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();

          // Subtle dashed white center stripe
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([8, 8]);
          pathStarted = false;
          for (const stop of stops) {
            const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(stop.lat!, stop.lng!));
            if (!p) continue;
            const x = p.x - minX;
            const y = p.y - minY;
            if (!pathStarted) {
              ctx.moveTo(x, y);
              pathStarted = true;
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw stop nodes along corridor
          for (let i = 0; i < stops.length; i++) {
            const stop = stops[i];
            const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(stop.lat!, stop.lng!));
            if (!p) continue;
            const cx = p.x - minX;
            const cy = p.y - minY;

            const isTerminal = stop.isStart || stop.isLast;
            const r = isTerminal ? 7.5 : stop.isCurrentNext ? 6 : 4;
            newRenderedRouteStops.push({ stop, cx, cy, radius: r + 8 });

            if (isTerminal) {
              // Terminal halo
              ctx.beginPath();
              ctx.arc(cx, cy, 14, 0, 2 * Math.PI);
              ctx.fillStyle = stop.isStart ? 'rgba(0, 109, 66, 0.18)' : 'rgba(220, 38, 38, 0.18)';
              ctx.fill();

              // Terminal circle
              ctx.beginPath();
              ctx.arc(cx, cy, 7.5, 0, 2 * Math.PI);
              ctx.fillStyle = stop.isStart ? '#006d42' : '#dc2626';
              ctx.fill();
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 2.5;
              ctx.stroke();

              // Label
              ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
              const label = `${stop.isStart ? 'ORIGIN' : 'TERMINUS'}: ${stop.name}`;
              const metrics = ctx.measureText(label);
              const boxW = metrics.width + 12;
              const boxH = 18;
              const boxX = cx - boxW / 2;
              const boxY = cy - 24;

              ctx.fillStyle = stop.isStart ? '#006d42' : '#dc2626';
              ctx.beginPath();
              if (ctx.roundRect) {
                ctx.roundRect(boxX, boxY, boxW, boxH, 4);
              } else {
                ctx.rect(boxX, boxY, boxW, boxH);
              }
              ctx.fill();

              ctx.fillStyle = '#ffffff';
              ctx.textAlign = 'center';
              ctx.fillText(label, cx, boxY + 13);
            } else if (stop.isCurrentNext) {
              // Next approaching stop (pulsing golden aura)
              ctx.beginPath();
              ctx.arc(cx, cy, 12, 0, 2 * Math.PI);
              ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
              ctx.fill();

              ctx.beginPath();
              ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
              ctx.fillStyle = '#f59e0b';
              ctx.fill();
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 2;
              ctx.stroke();

              ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
              ctx.fillStyle = '#78350f';
              ctx.textAlign = 'center';
              ctx.fillText(`NEXT: ${stop.name}`, cx, cy - 9);
            } else {
              // Regular intermediate stop
              ctx.beginPath();
              ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
              ctx.strokeStyle = '#1e293b';
              ctx.lineWidth = 2;
              ctx.stroke();

              if (zoom >= 13) {
                ctx.font = '500 9px system-ui, -apple-system, sans-serif';
                ctx.fillStyle = '#334155';
                ctx.textAlign = 'center';
                ctx.fillText(stop.name, cx, cy - 7);
              }
            }
          }
        }
      }
      renderedRouteStopsRef.current = newRenderedRouteStops;

      // 3. Draw Transit Hubs / Bus Stands if toggled on
      const newRenderedHubs: RenderedHubItem[] = [];
      if (currentHubs) {
        const shouldShowLabels = zoom >= 13;
        for (const hub of DELHI_HUBS) {
          if (hub.lat < minLat || hub.lat > maxLat || hub.lng < minLng || hub.lng > maxLng) continue;

          const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(hub.lat, hub.lng));
          if (!p) continue;
          const cx = p.x - minX;
          const cy = p.y - minY;

          if (cx < -30 || cx > width + 30 || cy < -30 || cy > height + 30) continue;

          const isISBT = hub.type === 'ISBT';
          const isDepot = hub.type === 'Depot';
          const r = isISBT ? 6.5 : 4.5;
          newRenderedHubs.push({ hub, cx, cy, radius: r });

          // Outer pin dot
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, 2 * Math.PI);
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
      renderedHubsRef.current = newRenderedHubs;

      // 4. Draw Fleet Buses with Viewport Culling & Screen Cache
      const isFilteredRoute = Boolean(currentRoute);
      const isBusDense = currentBuses.length > 200;
      const baseRadius = zoom < 12 ? 3.5 : zoom < 14 ? 4.5 : 5.5;

      const newRenderedBuses: RenderedBusItem[] = [];
      let selectedBusPos: { x: number; y: number } | null = null;

      for (let i = 0; i < currentBuses.length; i++) {
        const bus = currentBuses[i];
        const isSelected = currentSelected?.id === bus.id;

        // Instant coordinate rejection without projection:
        if (bus.lat < minLat || bus.lat > maxLat || bus.lng < minLng || bus.lng > maxLng) {
          continue;
        }

        const p = projection.fromLatLngToDivPixel(new google.maps.LatLng(bus.lat, bus.lng));
        if (!p) continue;
        const cx = p.x - minX;
        const cy = p.y - minY;

        // Skip offscreen
        if (cx < -20 || cx > width + 20 || cy < -20 || cy > height + 20) continue;

        newRenderedBuses.push({ bus, cx, cy, radius: baseRadius });

        if (isSelected) {
          selectedBusPos = { x: cx, y: cy };
          continue; // render prominent highlight on top later
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

      renderedBusesRef.current = newRenderedBuses;

      // 5. Render Selected Bus Highlight on Top
      // If selected bus position wasn't caught by bounding box loop, project it directly
      if (!selectedBusPos && currentSelected) {
        const p = projection.fromLatLngToDivPixel(
          new google.maps.LatLng(currentSelected.lat, currentSelected.lng)
        );
        if (p) {
          selectedBusPos = { x: p.x - minX, y: p.y - minY };
        }
      }

      if (selectedBusPos && currentSelected) {
        const { x, y } = selectedBusPos;
        const isEV = currentSelected.type === 'ev';

        // Outer glowing pulse ring
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, 2 * Math.PI);
        ctx.fillStyle = isEV ? 'rgba(16, 185, 129, 0.28)' : 'rgba(99, 102, 241, 0.28)';
        ctx.fill();
        ctx.strokeStyle = isEV ? '#10b981' : '#6366f1';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(x, y, 7.5, 0, 2 * Math.PI);
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
        ctx.roundRect(x - badgeWidth / 2, y - 30, badgeWidth, badgeHeight, 5);
        ctx.fill();
        ctx.strokeStyle = isEV ? '#34d399' : '#818cf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, x, y - 21);
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
      google.maps.event.removeListener(clickListener);
      google.maps.event.removeListener(mouseMoveListener);
      map.setOptions({ draggableCursor: null });
      overlay.setMap(null);
      overlayRef.current = null;
    };
  }, [map, onSelectBus, onSelectHub, setHoveredBus]);

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
  const lastAppliedTarget = useRef<{ lat: number; lng: number; zoom?: number } | null>(null);

  useEffect(() => {
    if (!map || !flyToTarget) return;

    // Avoid overriding user's manual zoom or pan if flyToTarget coordinates haven't changed
    const prev = lastAppliedTarget.current;
    if (
      prev &&
      Math.abs(prev.lat - flyToTarget.lat) < 0.00001 &&
      Math.abs(prev.lng - flyToTarget.lng) < 0.00001 &&
      prev.zoom === flyToTarget.zoom
    ) {
      return;
    }
    lastAppliedTarget.current = flyToTarget;

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

/**
 * Interactive Toolbar placed directly inside Google Maps context.
 * Features dedicated Zoom-In (Enlarge) and Zoom-Out (Diminish) controls,
 * Center on Delhi, GPS Location, Hubs toggle, and Nearest Stand finder.
 */
function MapInteractiveToolbar({
  onFindNearestStand,
  isFindingNearest,
  showHubs,
  onToggleHubs,
  onCenterDelhi,
  onLocateMe,
}: {
  onFindNearestStand: () => void;
  isFindingNearest: boolean;
  showHubs: boolean;
  onToggleHubs: () => void;
  onCenterDelhi: () => void;
  onLocateMe: () => void;
}) {
  const map = useMap();

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!map) return;
    map.setZoom((map.getZoom() || 12) + 1);
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!map) return;
    map.setZoom((map.getZoom() || 12) - 1);
  };

  return (
    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex flex-col items-center gap-2 pointer-events-auto">
      {/* Nearest Bus Stand Action Button */}
      <button
        id="btn-nearest-bus-stand"
        onClick={(e) => {
          e.stopPropagation();
          onFindNearestStand();
        }}
        disabled={isFindingNearest}
        className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md border border-emerald-500 transition-all cursor-pointer flex items-center justify-center group"
        title="Find Nearest DTC Bus Stand"
      >
        {isFindingNearest ? (
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : (
          <MapPin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Map View & Zoom Helpers */}
      <div className="flex flex-col gap-0.5 bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200">
        <button
          id="map-zoom-in-btn"
          onClick={handleZoomIn}
          title="Enlarge Map (Zoom In +)"
          className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer flex items-center justify-center group"
        >
          <Plus className="w-4 h-4 text-slate-800 group-hover:scale-110 transition-transform" />
        </button>

        <button
          id="map-zoom-out-btn"
          onClick={handleZoomOut}
          title="Diminish Map (Zoom Out -)"
          className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer flex items-center justify-center group border-b border-slate-100"
        >
          <Minus className="w-4 h-4 text-slate-800 group-hover:scale-110 transition-transform" />
        </button>

        <button
          id="map-center-delhi-btn"
          onClick={(e) => {
            e.stopPropagation();
            onCenterDelhi();
          }}
          title="Center on Central Delhi (Connaught Place)"
          className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer flex items-center justify-center"
        >
          <Compass className="w-4 h-4 text-emerald-600" />
        </button>

        <button
          id="map-locate-me-btn"
          onClick={(e) => {
            e.stopPropagation();
            onLocateMe();
          }}
          title="Locate My GPS Position"
          className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer flex items-center justify-center"
        >
          <Navigation className="w-4 h-4 text-blue-600" />
        </button>

        <button
          id="map-toggle-hubs-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleHubs();
          }}
          title={showHubs ? 'Hide Bus Stands / Terminals' : 'Show All Bus Stands / Terminals'}
          className={`w-8 h-8 rounded-lg transition cursor-pointer flex items-center justify-center ${
            showHubs
              ? 'bg-amber-500 text-white shadow-xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Landmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
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
  mapType = 'transit',
  routeProgression,
}) => {
  const [hoveredBus, setHoveredBus] = useState<HoveredBusInfo | null>(null);
  const [nearestStand, setNearestStand] = useState<NearestStandState | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isFindingNearest, setIsFindingNearest] = useState<boolean>(false);
  const [selectedHubPopup, setSelectedHubPopup] = useState<TransitHub | null>(null);
  const [internalFlyTo, setInternalFlyTo] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);

  // Active flyTo target combines external (from parent) or internal (from nearest stand / center)
  const activeFlyTo = internalFlyTo || flyToTarget;

  // Find nearest bus stand from all 3,465+ official DTC stands
  const handleFindNearestStand = useCallback(() => {
    setIsFindingNearest(true);

    const computeNearest = (userLat: number, userLng: number, isGps: boolean) => {
      const { hub: closest, distanceKm: minDistance } = findNearestStandFromAll(userLat, userLng);

      const closeBusesList = buses.filter(
        (b) => calculateDistanceKm(closest.lat, closest.lng, b.lat, b.lng) <= 3.0
      );

      setUserLocation({ lat: userLat, lng: userLng });

      setNearestStand({
        hub: closest,
        distanceKm: minDistance,
        nearbyBusCount: closeBusesList.length,
        nearbyBuses: closeBusesList,
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
        { timeout: 7000, enableHighAccuracy: true }
      );
    } else {
      computeNearest(28.6297, 77.2142, false);
    }
  }, [buses]);

  // Group nearby buses at nearest stand by route for sequential numbered listing
  const nearestStandRoutes = useMemo<
    Array<{ routeId: string; buses: DTCBus[]; startPoint: string; lastPoint: string }>
  >(() => {
    if (!nearestStand) return [];
    const busesList = nearestStand.nearbyBuses || [];
    const grouped: Record<string, DTCBus[]> = {};
    busesList.forEach((b) => {
      const r = (b.routeId || 'Transit').trim().toUpperCase();
      if (!grouped[r]) grouped[r] = [];
      grouped[r].push(b);
    });

    // Also include majorRoutes of the hub if any were not in nearby buses
    if (nearestStand.hub.majorRoutes) {
      nearestStand.hub.majorRoutes.slice(0, 3).forEach((r) => {
        const cleanR = r.trim().toUpperCase();
        if (!grouped[cleanR]) {
          const sysBuses = buses.filter(
            (b) => b.routeId && b.routeId.trim().toUpperCase() === cleanR
          );
          if (sysBuses.length > 0) {
            grouped[cleanR] = sysBuses.slice(0, 4);
          }
        }
      });
    }

    return Object.entries(grouped)
      .map(([routeId, routeBuses]) => {
        const known = DTC_KNOWN_ROUTES[routeId];
        const registry = DELHI_ROUTE_REGISTRY[routeId];
        return {
          routeId,
          buses: routeBuses,
          startPoint: known?.startPoint || registry?.startPoint || 'Origin Terminal',
          lastPoint: known?.lastPoint || registry?.lastPoint || 'Destination Terminal',
        };
      })
      .slice(0, 5);
  }, [nearestStand, buses]);

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
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
        setInternalFlyTo({
          lat,
          lng,
          zoom: 16,
        });
      },
      (err) => {
        console.warn('Geolocation failed:', err.message);
        // Fallback to Central Secretariat with marker
        const fallback = { lat: 28.6186, lng: 77.2155 };
        setUserLocation(fallback);
        setInternalFlyTo({
          lat: fallback.lat,
          lng: fallback.lng,
          zoom: 15,
        });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const activeProgression = useMemo(() => {
    if (routeProgression) return routeProgression;
    if (selectedBus) return resolveBusProgression(selectedBus, buses);
    if (selectedRoute) return resolveRouteProgression(selectedRoute, buses);
    return null;
  }, [routeProgression, selectedBus, selectedRoute, buses]);

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-100 flex flex-col font-sans">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} solutionChannel="GMP_aistudio_transit">
        <Map
          defaultCenter={{ lat: 28.6297, lng: 77.2142 }}
          defaultZoom={12}
          minZoom={9}
          maxZoom={19}
          mapTypeId={mapType === 'satellite' ? 'hybrid' : 'roadmap'}
          gestureHandling="greedy"
          disableDefaultUI={false}
          zoomControl={false}
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
            onSelectHub={(hub) => {
              setSelectedHubPopup(hub);
              if (onSelectHub) onSelectHub(hub);
            }}
            userLocation={userLocation}
            routeProgression={activeProgression}
          />

          {/* Camera animator */}
          <MapCameraController
            flyToTarget={activeFlyTo}
            selectedRoute={selectedRoute}
            buses={buses}
          />

          {/* Interactive Map Toolbar (Zoom in/out, Center, GPS, Hubs, Nearest Stand) */}
          <MapInteractiveToolbar
            onFindNearestStand={handleFindNearestStand}
            isFindingNearest={isFindingNearest}
            showHubs={showHubs}
            onToggleHubs={onToggleHubs}
            onCenterDelhi={handleCenterDelhi}
            onLocateMe={handleLocateMe}
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
      {/* NEAREST BUS STAND FLOATING BANNER (WITH CLICKABLE BUS NUMBERS & ROUTES)   */}
      {/* ========================================================================= */}
      {nearestStand && (
        <div
          id="nearest-stand-banner"
          className="absolute top-20 left-3 right-16 sm:top-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:max-w-xl z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-300 shadow-xl flex flex-col gap-2.5 text-xs animate-in fade-in duration-200"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-black text-emerald-700 tracking-wider flex items-center gap-1.5">
                  <span>Nearest Bus Stand</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-normal">{nearestStand.referenceName}</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm leading-tight flex items-center gap-1.5 flex-wrap">
                  <span>{nearestStand.hub.name}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    {formatDistance(nearestStand.distanceKm)} away
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setSelectedHubPopup(nearestStand.hub)}
                className="px-2.5 py-1.5 rounded-lg bg-[#a83301] hover:bg-[#842500] text-white font-bold text-[11px] shadow-xs transition cursor-pointer flex items-center gap-1"
                title="View all routes and buses for this stand"
              >
                <span>Stand Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${nearestStand.hub.lat},${nearestStand.hub.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow-xs transition"
                title="Get Walking / Driving Directions"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                id="close-nearest-stand-banner-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setNearestStand(null);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 font-bold text-[11px] transition cursor-pointer flex items-center gap-1 border border-slate-200 shadow-2xs group shrink-0"
                title="Close Nearest Bus Stand"
              >
                <X className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-600 transition-colors" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Connected Routes & Live Buses List */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Bus className="w-3.5 h-3.5 text-[#a83301]" />
                <span>Approaching Buses by Route (Click bus to track):</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                {nearestStand.nearbyBuses?.length || nearestStand.nearbyBusCount} live nearby
              </span>
            </div>

            {/* List of routes with clickable bus numbers */}
            {nearestStandRoutes.length === 0 ? (
              <div className="p-2 bg-slate-50 rounded-xl text-slate-500 text-[11px] flex items-center justify-between">
                <span>DTC frequent service on this corridor</span>
                <button
                  onClick={() => setSelectedHubPopup(nearestStand.hub)}
                  className="font-bold text-[#a83301] underline ml-2 cursor-pointer"
                >
                  View Connected Routes
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-0.5 no-scrollbar">
                {nearestStandRoutes.map((group) => (
                  <div
                    key={group.routeId}
                    className="p-2 rounded-xl bg-slate-50/90 border border-slate-200/80 flex flex-col gap-1.5"
                  >
                    {/* Route line & endpoints */}
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          if (onSelectRoute) onSelectRoute(group.routeId);
                        }}
                        className="group inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-700 hover:bg-[#a83301] text-white font-extrabold text-[11px] transition cursor-pointer"
                        title={`Select Route ${group.routeId} to view details and full timeline on map`}
                      >
                        <span>Route {group.routeId}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <span className="text-[10px] text-slate-500 truncate max-w-[200px]">
                        {group.startPoint} ➔ {group.lastPoint}
                      </span>
                    </div>

                    {/* Buses in same route shown one by one in a line with numbers */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                      {group.buses.map((bus, bIdx) => (
                        <button
                          key={bus.id}
                          onClick={() => {
                            if (onSelectRoute) onSelectRoute(bus.routeId);
                            onSelectBus(bus);
                          }}
                          className="group inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 hover:border-[#a83301] shadow-2xs text-[11px] font-bold text-slate-800 transition cursor-pointer shrink-0"
                          title={`Click to track Bus ${bus.id} (${bus.speedKmH} km/h)`}
                        >
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center group-hover:bg-[#a83301]">
                            #{bIdx + 1}
                          </span>
                          <span className="font-mono text-slate-900 group-hover:text-[#a83301]">
                            {bus.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {bus.speedKmH} km/h
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Banner Dismiss / Close Footer Action */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 text-[10px]">
                Delhi Open Transit Data • Real-time Stand Info
              </span>
              <button
                id="close-nearest-stand-banner-footer-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setNearestStand(null);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 font-bold text-[11px] transition cursor-pointer flex items-center gap-1 border border-slate-200"
              >
                <X className="w-3 h-3 text-slate-500" />
                <span>Close Nearest Stand</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
              <button
                id="close-selected-bus-dock-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBus(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                title="Dismiss details"
              >
                <X className="w-3.5 h-3.5" />
              </button>
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
      {/* Bus Stand Details Modal */}
      {selectedHubPopup && (
        <BusStandDetailModal
          hub={selectedHubPopup}
          buses={buses}
          userCoords={userLocation}
          onClose={() => setSelectedHubPopup(null)}
          onSelectBus={(bus) => {
            onSelectBus(bus);
            if (onSelectRoute) onSelectRoute(bus.routeId);
            setInternalFlyTo({ lat: bus.lat, lng: bus.lng, zoom: 16 });
          }}
          onSelectRoute={(routeId) => {
            if (onSelectRoute) onSelectRoute(routeId);
            setSelectedHubPopup(null);
          }}
        />
      )}
    </div>
  );
};
