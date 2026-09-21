import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { DTCBus, TransitHub, BreadcrumbPoint } from '../types';
import { DELHI_HUBS } from '../data/terminals';
import { calculateDistanceKm, formatDistance } from '../utils/geo';
import { resolveBusProgression } from '../utils/routeResolver';
import { Compass, Navigation, Landmark, MapPin, Loader2, X, Bus, CheckCircle2 } from 'lucide-react';

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
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const busLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const hubLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const trailLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const nearestPulseRef = useRef<L.CircleMarker | null>(null);
  const hubMarkersMapRef = useRef<Map<string, L.Marker>>(new Map());
  const lastFittedRouteRef = useRef<string | null>(null);

  // Nearest bus stand state
  const [nearestStand, setNearestStand] = useState<{
    hub: TransitHub;
    distanceKm: number;
    nearbyBusCount: number;
    referenceName: string;
  } | null>(null);
  const [isFindingNearest, setIsFindingNearest] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    if ((mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

    // Delhi center coordinates [lat, lng]
    const map = L.map(mapContainerRef.current, {
      center: [28.6297, 77.2142], // Shivaji Stadium / Connaught Place
      zoom: 12,
      minZoom: 8,
      maxZoom: 18,
      zoomControl: false,
      preferCanvas: true, // Silky smooth 60fps rendering for thousands of fleet points
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Esri World Street Map: Clean, detailed Delhi street network, transit stops, 100% free with NO API key required
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, TomTom | Delhi OTD GTFS-RT',
      maxZoom: 19,
    }).addTo(map);

    const busGroup = L.layerGroup().addTo(map);
    const hubGroup = L.layerGroup().addTo(map);
    const trailGroup = L.layerGroup().addTo(map);

    busLayerGroupRef.current = busGroup;
    hubLayerGroupRef.current = hubGroup;
    trailLayerGroupRef.current = trailGroup;
    mapInstanceRef.current = map;

    // Resize Observer to keep map tiles aligned
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle fly-to targets
  useEffect(() => {
    if (!mapInstanceRef.current || !flyToTarget) return;
    mapInstanceRef.current.flyTo([flyToTarget.lat, flyToTarget.lng], flyToTarget.zoom || 15, {
      animate: true,
      duration: 1.0,
    });
  }, [flyToTarget]);

  // Handle route auto-fit bounds
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedRoute) {
      lastFittedRouteRef.current = null;
      return;
    }

    if (selectedRoute === lastFittedRouteRef.current) return;
    lastFittedRouteRef.current = selectedRoute;

    if (buses.length > 0) {
      const bounds = L.latLngBounds(buses.map((b) => [b.lat, b.lng]));
      if (bounds.isValid()) {
        mapInstanceRef.current.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 15,
          animate: true,
        });
      }
    }
  }, [selectedRoute, buses]);

  // Count buses near a given coordinate
  const countBusesNear = useCallback(
    (lat: number, lng: number, radiusKm = 2.5): number => {
      return buses.filter((b) => calculateDistanceKm(lat, lng, b.lat, b.lng) <= radiusKm).length;
    },
    [buses]
  );

  // Render Transit Hubs & Bus Stands
  useEffect(() => {
    if (!hubLayerGroupRef.current || !mapInstanceRef.current) return;
    hubLayerGroupRef.current.clearLayers();
    hubMarkersMapRef.current.clear();

    if (!showHubs) return;

    DELHI_HUBS.forEach((hub) => {
      const isISBT = hub.type === 'ISBT';
      const isDepot = hub.type === 'Depot';
      const isInterchange = hub.type === 'Interchange';

      let markerColorClass = 'bg-amber-500 text-white';
      let iconEmoji = '🚏';

      if (isISBT) {
        markerColorClass = 'bg-amber-600 text-white';
        iconEmoji = '🏢';
      } else if (isDepot) {
        markerColorClass = 'bg-slate-700 text-white';
        iconEmoji = '🏬';
      } else if (isInterchange) {
        markerColorClass = 'bg-emerald-600 text-white';
        iconEmoji = '🚇';
      } else {
        markerColorClass = 'bg-blue-600 text-white';
        iconEmoji = '🚏';
      }

      const hubIcon = L.divIcon({
        className: 'custom-hub-marker',
        html: `
          <div class="relative flex flex-col items-center justify-center group cursor-pointer" id="hub-marker-${hub.id}">
            <div class="w-8 h-8 rounded-full ${markerColorClass} shadow-lg border-2 border-white flex items-center justify-center font-bold text-xs hover:scale-125 transition-transform">
              ${iconEmoji}
            </div>
            <div class="bg-slate-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
              ${hub.name}
            </div>
          </div>
        `,
        iconSize: [36, 46],
        iconAnchor: [18, 20],
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: hubIcon });

      // Calculate nearby active buses
      const nearbyCount = countBusesNear(hub.lat, hub.lng, 2.5);

      const routesBadgesHtml =
        hub.majorRoutes && hub.majorRoutes.length > 0
          ? `<div class="mt-2">
              <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Major Serving Routes:</div>
              <div class="flex flex-wrap gap-1">
                ${hub.majorRoutes
                  .map(
                    (r) =>
                      `<span class="px-1.5 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-800 text-[10px] font-bold rounded border border-slate-200 cursor-pointer transition">
                        ${r}
                      </span>`
                  )
                  .join('')}
              </div>
            </div>`
          : '';

      const popupHtml = `
        <div class="p-3 text-slate-800 font-sans max-w-[260px]">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[10px] uppercase tracking-wider text-amber-700 font-extrabold px-1.5 py-0.5 bg-amber-50 rounded">
              ${hub.type}
            </span>
            ${hub.zone ? `<span class="text-[10px] text-slate-500 font-medium">${hub.zone}</span>` : ''}
          </div>
          <div class="font-bold text-sm text-slate-900 mt-1">${hub.name}</div>
          <div class="text-xs text-slate-600 mt-1 leading-relaxed">${hub.description}</div>
          
          <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-500 font-medium">Buses within 2.5 km:</span>
            <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ${nearbyCount} active
            </span>
          </div>

          ${routesBadgesHtml}

          <div class="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
            GPS: ${hub.lat.toFixed(4)}, ${hub.lng.toFixed(4)}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 280 });
      marker.on('click', () => {
        if (onSelectHub) onSelectHub(hub);
      });

      hubMarkersMapRef.current.set(hub.id, marker);
      hubLayerGroupRef.current?.addLayer(marker);
    });
  }, [showHubs, buses, countBusesNear, onSelectHub]);

  // Render Trail for selected bus
  useEffect(() => {
    if (!trailLayerGroupRef.current) return;
    trailLayerGroupRef.current.clearLayers();

    if (selectedBus && busTrail && busTrail.length > 1) {
      const latlngs = busTrail.map((p) => [p.lat, p.lng] as [number, number]);
      const polyline = L.polyline(latlngs, {
        color: selectedBus.type === 'ev' ? '#10b981' : '#6366f1',
        weight: 4,
        dashArray: '4, 6',
        opacity: 0.85,
      });
      trailLayerGroupRef.current.addLayer(polyline);
    }
  }, [selectedBus, busTrail]);

  // Render Buses
  useEffect(() => {
    if (!busLayerGroupRef.current || !mapInstanceRef.current) return;
    busLayerGroupRef.current.clearLayers();

    const isFiltered = buses.length < 250;

    buses.forEach((bus) => {
      const isSelected = selectedBus?.id === bus.id;
      const isEV = bus.type === 'ev';
      const prog = resolveBusProgression(bus, buses);

      const tooltipContent = `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; font-size: 11px; line-height: 1.4; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <strong style="font-size: 12px; color: #0f172a;">${bus.id}</strong>
            <span style="background: ${isEV ? '#ecfdf5' : '#eef2ff'}; color: ${isEV ? '#065f46' : '#3730a3'}; font-weight: 700; padding: 1px 6px; border-radius: 4px; font-size: 10px;">
              Route ${bus.routeId}
            </span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 2px; margin-top: 2px; border-top: 1px solid #f1f5f9; padding-top: 4px;">
            <div style="color: #047857; font-weight: 600;">🟢 Origin: <span style="color: #1e293b; font-weight: 500;">${prog.startPoint}</span></div>
            <div style="background: #fffbeb; padding: 2px 4px; border-radius: 4px; border: 1px solid #fde68a; color: #92400e; font-weight: 700;">
              ⚡ Next: <span style="color: #0f172a;">${prog.nextPoint}</span> (${prog.nextPointFormattedDistance}, ~${prog.nextPointEtaMins}m)
            </div>
            <div style="color: #b91c1c; font-weight: 600;">🏁 Destination: <span style="color: #1e293b; font-weight: 500;">${prog.lastPoint}</span></div>
          </div>
          <div style="margin-top: 4px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between;">
            <span>Speed: ${bus.speedKmH} km/h</span>
            <span style="color: #059669; font-weight: 600;">Click to inspect ➔</span>
          </div>
        </div>
      `;

      if (isSelected || isFiltered) {
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer select-none group" id="marker-${bus.id}">
            ${
              isSelected
                ? '<div class="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping"></div>'
                : ''
            }
            <div class="px-2 py-1 rounded-md text-[11px] font-bold shadow-md border flex items-center gap-1 transition-transform group-hover:scale-110 ${
              isEV
                ? isSelected
                  ? 'bg-emerald-600 text-white border-emerald-300 ring-2 ring-emerald-400'
                  : 'bg-emerald-700 text-emerald-50 border-emerald-500'
                : isSelected
                ? 'bg-indigo-600 text-white border-indigo-300 ring-2 ring-indigo-400'
                : 'bg-slate-800 text-slate-100 border-slate-600'
            }">
              <span>${isEV ? '⚡' : '🚌'}</span>
              <span>${bus.routeId}</span>
            </div>
            ${
              isSelected
                ? `<div class="absolute top-full mt-1 bg-slate-900 text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow whitespace-nowrap z-50">
                    ${bus.id}
                   </div>`
                : ''
            }
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-bus-div-icon',
          html: iconHtml,
          iconSize: [44, 24],
          iconAnchor: [22, 12],
        });

        const marker = L.marker([bus.lat, bus.lng], { icon });
        marker.bindTooltip(tooltipContent, {
          direction: 'top',
          offset: [0, -12],
          className: 'custom-leaflet-tooltip',
        });
        marker.on('click', () => {
          onSelectBus(bus);
        });

        busLayerGroupRef.current?.addLayer(marker);
      } else {
        const marker = L.circleMarker([bus.lat, bus.lng], {
          radius: 5,
          fillColor: isEV ? '#10b981' : '#4f46e5',
          color: '#ffffff',
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.85,
        });

        marker.bindTooltip(tooltipContent, {
          direction: 'top',
          offset: [0, -6],
          className: 'custom-leaflet-tooltip',
        });

        marker.on('click', () => {
          onSelectBus(bus);
        });

        busLayerGroupRef.current?.addLayer(marker);
      }
    });
  }, [buses, selectedBus, onSelectBus]);

  // Find Nearest Bus Stand Function
  const handleFindNearestStand = useCallback(() => {
    setIsFindingNearest(true);
    setLocationError(null);

    const locateAndFind = (userLat: number, userLng: number, isGps = true) => {
      // Find closest bus stand from DELHI_HUBS
      let closestHub: TransitHub = DELHI_HUBS[0];
      let minDistance = Infinity;

      DELHI_HUBS.forEach((hub) => {
        const dist = calculateDistanceKm(userLat, userLng, hub.lat, hub.lng);
        if (dist < minDistance) {
          minDistance = dist;
          closestHub = hub;
        }
      });

      const nearbyBuses = countBusesNear(closestHub.lat, closestHub.lng, 2.5);

      setNearestStand({
        hub: closestHub,
        distanceKm: minDistance,
        nearbyBusCount: nearbyBuses,
        referenceName: isGps ? 'Your Location' : 'Map Center',
      });

      // Fly map smoothly to the nearest bus stand
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([closestHub.lat, closestHub.lng], 16, {
          animate: true,
          duration: 1.2,
        });

        // Add animated pulse ring around the nearest stand
        if (nearestPulseRef.current) {
          nearestPulseRef.current.remove();
        }

        const pulseRing = L.circleMarker([closestHub.lat, closestHub.lng], {
          radius: 28,
          color: '#10b981',
          weight: 3,
          fillColor: '#10b981',
          fillOpacity: 0.2,
          className: 'animate-pulse',
        }).addTo(mapInstanceRef.current);
        nearestPulseRef.current = pulseRing;

        // Auto open popup after flyTo completes
        setTimeout(() => {
          const marker = hubMarkersMapRef.current.get(closestHub.id);
          if (marker) {
            marker.openPopup();
          }
        }, 1300);
      }

      setIsFindingNearest(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // Mark user on map
          if (mapInstanceRef.current) {
            if (userMarkerRef.current) {
              userMarkerRef.current.setLatLng([latitude, longitude]);
            } else {
              const userIcon = L.divIcon({
                className: 'user-loc-icon',
                html: `
                  <div class="relative flex items-center justify-center">
                    <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg"></div>
                    <div class="absolute w-8 h-8 rounded-full bg-blue-500/40 animate-ping"></div>
                  </div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              });
              userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon }).addTo(
                mapInstanceRef.current
              );
            }
          }
          locateAndFind(latitude, longitude, true);
        },
        (err) => {
          console.warn('Geolocation unavailable/denied, falling back to map center:', err.message);
          // Fallback to current map center
          if (mapInstanceRef.current) {
            const center = mapInstanceRef.current.getCenter();
            locateAndFind(center.lat, center.lng, false);
          } else {
            locateAndFind(28.6297, 77.2142, false);
          }
        },
        { timeout: 6000, enableHighAccuracy: true }
      );
    } else {
      if (mapInstanceRef.current) {
        const center = mapInstanceRef.current.getCenter();
        locateAndFind(center.lat, center.lng, false);
      } else {
        locateAndFind(28.6297, 77.2142, false);
      }
    }
  }, [countBusesNear]);

  // Geolocation Button Handler
  const handleLocateMe = () => {
    if (!navigator.geolocation || !mapInstanceRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 15);

          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          } else {
            const userIcon = L.divIcon({
              className: 'user-loc-icon',
              html: `
                <div class="relative flex items-center justify-center">
                  <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg"></div>
                  <div class="absolute w-8 h-8 rounded-full bg-blue-500/40 animate-ping"></div>
                </div>
              `,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            });
            userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon }).addTo(
              mapInstanceRef.current
            );
          }
        }
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
      }
    );
  };

  const handleCenterDelhi = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([28.6297, 77.2142], 12);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '520px' }} />

      {/* Floating Nearest Stand Banner when located */}
      {nearestStand && (
        <div
          id="nearest-stand-banner"
          className="absolute top-3 left-1/2 -translate-x-1/2 z-[450] max-w-md w-[92%] sm:w-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-emerald-300 shadow-xl flex items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                Nearest Bus Stand ({nearestStand.referenceName})
              </div>
              <div className="font-bold text-slate-900 text-sm">{nearestStand.hub.name}</div>
              <div className="text-slate-600 text-[11px] flex items-center gap-2">
                <span>Distance: <strong>{formatDistance(nearestStand.distanceKm)}</strong></span>
                <span>•</span>
                <span>{nearestStand.nearbyBusCount} active buses within 2.5 km</span>
              </div>
            </div>
          </div>
          <button
            id="close-nearest-stand-banner"
            onClick={() => {
              setNearestStand(null);
              if (nearestPulseRef.current) nearestPulseRef.current.remove();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Action Controls (Top Right) */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col items-end gap-2">
        {/* Nearest Bus Stand Action Button */}
        <button
          id="btn-nearest-bus-stand"
          onClick={handleFindNearestStand}
          disabled={isFindingNearest}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs shadow-lg border border-emerald-500 transition-all cursor-pointer group"
          title="Find the closest bus stand to your location"
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
        <div className="flex flex-col gap-1.5 bg-white/95 backdrop-blur p-1 rounded-xl shadow-md border border-slate-200">
          <button
            id="map-center-delhi-btn"
            onClick={handleCenterDelhi}
            title="Center on Delhi (Connaught Place)"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
          >
            <Compass className="w-5 h-5 text-emerald-600" />
          </button>

          <button
            id="map-locate-me-btn"
            onClick={handleLocateMe}
            title="Locate My GPS Position"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition"
          >
            <Navigation className="w-5 h-5 text-blue-600" />
          </button>

          <button
            id="map-toggle-hubs-btn"
            onClick={onToggleHubs}
            title={showHubs ? 'Hide Bus Stands / Terminals' : 'Show All Bus Stands / Terminals'}
            className={`p-2 rounded-lg transition ${
              showHubs
                ? 'bg-amber-500 text-white shadow-sm'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Landmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map Legend & Stand Counter Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1.5">
        <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center justify-between gap-3 border-b border-slate-100 pb-1">
          <span>Delhi Transit Map</span>
          <span className="font-mono text-emerald-600 font-bold">{buses.length.toLocaleString()} buses</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-sm inline-block"></span>
          <span className="text-slate-700 font-medium">Electric Bus (EV ⚡)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-600 border border-white shadow-sm inline-block"></span>
          <span className="text-slate-700 font-medium">CNG / DTC Fleet</span>
        </div>

        {showHubs && (
          <div className="flex items-center justify-between gap-3 pt-0.5 border-t border-slate-100 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="text-xs">🚏</span>
              <span className="text-slate-700 font-semibold">Bus Stands & ISBTs</span>
            </div>
            <span className="font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              {DELHI_HUBS.length} plotted
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
