import React, { useState, useMemo } from 'react';
import { DTCBus, BreadcrumbPoint } from '../types';
import { resolveBusProgression } from '../utils/routeResolver';
import {
  X,
  Zap,
  Bus,
  MapPin,
  Gauge,
  Compass,
  Share2,
  Check,
  ExternalLink,
  Filter,
  ArrowRight,
  Navigation,
  Clock,
  Radio,
  CheckCircle2,
  Ticket,
  Users,
  Building2,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Activity,
} from 'lucide-react';

interface BusDetailModalProps {
  bus: DTCBus | null;
  onClose: () => void;
  onFilterRoute: (routeId: string) => void;
  onFollowBus?: (bus: DTCBus) => void;
  isFollowing?: boolean;
  allBuses?: DTCBus[];
}

export const BusDetailModal: React.FC<BusDetailModalProps> = ({
  bus,
  onClose,
  onFilterRoute,
  onFollowBus,
  isFollowing = false,
  allBuses = [],
}) => {
  const [copied, setCopied] = useState(false);
  const [showStopsList, setShowStopsList] = useState(false);

  // Compute live route progression: Starting Point, Next Point, and Last Point with real-time telemetry
  const progression = useMemo(() => {
    if (!bus) return null;
    return resolveBusProgression(bus, allBuses);
  }, [bus?.id, bus?.routeId, bus?.lat, bus?.lng, bus?.speedKmH, bus?.speed, allBuses]);

  if (!bus || !progression) return null;

  const isEV = bus.type === 'ev';

  // Check and extract current speed in kilometers per hour (km/h) if available in the bus data object
  const busRecord = bus as unknown as Record<string, unknown>;
  const rawSpeed =
    typeof bus.speedKmH === 'number' && !isNaN(bus.speedKmH)
      ? bus.speedKmH
      : typeof bus.speed === 'number' && !isNaN(bus.speed)
      ? bus.speed
      : typeof busRecord['speed_kmh'] === 'number' && !isNaN(busRecord['speed_kmh'] as number)
      ? (busRecord['speed_kmh'] as number)
      : null;

  const isSpeedAvailable = rawSpeed !== null;
  const currentSpeedKmH = isSpeedAvailable ? Math.round(rawSpeed) : null;
  const speedFormatted = isSpeedAvailable ? `${currentSpeedKmH} km/h` : null;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${bus.lat.toFixed(6)}, ${bus.lng.toFixed(6)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${bus.lat},${bus.lng}`;

  // Crowding configuration
  const crowding = bus.crowdingStatus || 'moderate';
  const crowdingConfig = {
    low: { label: 'Seats Available', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' },
    moderate: { label: 'Moderate Load', color: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' },
    crowded: { label: 'Heavy Rush / Standing Only', color: 'bg-rose-100 text-rose-800 border-rose-300', dot: 'bg-rose-500' },
  }[crowding];

  return (
    <div
      id="bus-detail-panel"
      className="fixed inset-x-3 bottom-3 md:inset-auto md:right-6 md:top-20 md:w-[440px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 z-[500] overflow-hidden transition-all duration-150 animate-in fade-in slide-in-from-bottom-3 md:slide-in-from-right-4 max-h-[88vh] flex flex-col"
    >
      {/* Header Banner */}
      <div
        className={`px-5 py-3 text-white flex items-center justify-between shrink-0 ${
          isEV
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
            : 'bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-bold text-lg shadow-inner">
            {isEV ? <Zap className="w-6 h-6 text-emerald-200" /> : <Bus className="w-6 h-6 text-indigo-200" />}
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
              <span>{isEV ? 'Delhi EV Low-Floor AC' : `${bus.agency} Fleet`}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <h3 className="font-mono font-black text-xl tracking-tight leading-none text-white">
                {bus.id}
              </h3>
              {isSpeedAvailable && (
                <span
                  id="bus-header-speed-badge"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20 shadow-sm"
                  title={`Current Speed: ${speedFormatted}`}
                >
                  <Gauge className="w-3 h-3 text-emerald-200" />
                  {speedFormatted}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          id="close-bus-detail-btn"
          onClick={onClose}
          aria-label="Close bus details"
          className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="p-4 space-y-3 overflow-y-auto text-slate-800 text-sm flex-1">
        {/* ========================================================================= */}
        {/* DIGITAL AMBER LED DESTINATION DISPLAY BOARD (AS SEEN ON DELHI BUSES)      */}
        {/* ========================================================================= */}
        <div className="p-3.5 rounded-xl bg-zinc-950 border-2 border-zinc-800 text-amber-400 font-mono shadow-inner space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
              BUS FRONT LED BOARD
            </span>
            {bus.rawRouteId && bus.rawRouteId !== bus.routeId && (
              <span className="text-[10px] text-zinc-500 font-sans font-medium">
                Feed ID: #{bus.rawRouteId}
              </span>
            )}
          </div>
          
          <div className="flex items-baseline justify-between pt-0.5">
            <div className="text-2xl font-black tracking-wider text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">
              {bus.routeId}
            </div>
            <button
              id="filter-this-route-btn"
              onClick={() => onFilterRoute(bus.routeId)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-sans font-bold transition border border-amber-400/40 cursor-pointer"
            >
              <Filter className="w-3 h-3" />
              Filter Route
            </button>
          </div>

          <div className="text-xs text-amber-200/90 font-medium truncate pt-1 border-t border-zinc-800/80 flex items-center gap-1.5">
            <span>{progression.startPoint}</span>
            <span className="text-amber-500">➔</span>
            <span>{progression.lastPoint}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DELHI ONE APP VERIFIED TELEMETRY BADGE & OCCUPANCY                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 gap-2">
          {/* Live Crowding / Occupancy */}
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${crowdingConfig.color}`}>
            <Users className="w-4 h-4 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">Occupancy</div>
              <div className="text-xs font-extrabold truncate">{crowdingConfig.label}</div>
            </div>
          </div>

          {/* Delhi One Verified Status */}
          <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Delhi One App</div>
              <div className="text-xs font-extrabold truncate">Verified OTD GPS</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CORE REQUIREMENT: STARTING POINT, NEXT POINT, AND LAST POINT OF BUS       */}
        {/* ========================================================================= */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              Live Route Progression
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {progression.currentDirection}
            </span>
          </div>

          {/* 3 Key Stops: Starting Point -> Next Point -> Last Point */}
          <div className="space-y-2.5 relative">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-slate-200 -z-0"></div>

            {/* 1. STARTING POINT */}
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                🟢
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  Starting Point (Origin Terminal)
                </div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  {progression.startPoint}
                </div>
              </div>
            </div>

            {/* 2. NEXT POINT (PROMINENT HIGHLIGHT WITH LIVE TELEMETRY ETA & CLOCK TIME) */}
            <div className="flex items-start gap-3 relative z-10 bg-amber-50/95 border-2 border-amber-300 p-2.5 rounded-xl shadow-sm">
              <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-amber-600 text-amber-900 flex items-center justify-center shrink-0 font-bold text-xs shadow-md animate-pulse">
                <Radio className="w-4 h-4 text-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
                    Next Stop (Live Telemetry)
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-black bg-amber-200 text-amber-950 px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-800" />
                      {progression.nextPointClockTime ? `${progression.nextPointClockTime} (${progression.nextPointEtaMins}m)` : `~${progression.nextPointEtaMins} min`}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-black text-slate-900 leading-snug mt-0.5">
                  {progression.nextPoint}
                </div>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-2 flex-wrap">
                  <span>Distance: <strong className="text-slate-800">{progression.nextPointFormattedDistance}</strong></span>
                  {isSpeedAvailable && (
                    <>
                      <span>•</span>
                      <span>Speed: <strong className="text-slate-800">{speedFormatted}</strong></span>
                    </>
                  )}
                  {progression.telemetrySummary?.congestionLevel && (
                    <>
                      <span>•</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                          progression.telemetrySummary.congestionLevel === 'smooth'
                            ? 'bg-emerald-100 text-emerald-800'
                            : progression.telemetrySummary.congestionLevel === 'congested'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {progression.telemetrySummary.congestionLevel === 'smooth'
                          ? 'Traffic: Smooth'
                          : progression.telemetrySummary.congestionLevel === 'congested'
                          ? 'Traffic: Congested'
                          : 'Traffic: Moderate'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 3. LAST POINT */}
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-7 h-7 rounded-full bg-rose-100 border-2 border-rose-500 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                🏁
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                  Last Point (Destination Terminal)
                </div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  {progression.lastPoint}
                </div>
              </div>
            </div>
          </div>

          {/* Route Progress Bar */}
          <div className="pt-2 border-t border-emerald-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Journey Completion</span>
              <span className="font-bold font-mono text-emerald-700">
                {progression.progressPercent}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progression.progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Real-time Telemetry Stats Pill Strip */}
          {progression.telemetrySummary && (
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-emerald-100 text-[11px]">
              <div className="p-1.5 rounded-lg bg-white/80 border border-emerald-100 text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Route Buses</span>
                <span className="font-extrabold text-slate-800">{progression.telemetrySummary.activeBusesOnRoute} Active</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/80 border border-emerald-100 text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Corridor Speed</span>
                <span className="font-extrabold text-slate-800">{progression.telemetrySummary.averageSpeedKmH} km/h</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/80 border border-emerald-100 text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Trip Est.</span>
                <span className="font-extrabold text-slate-800">~{progression.telemetrySummary.estimatedFullTripMinutes}m</span>
              </div>
            </div>
          )}

          {/* Interactive Stop-by-Stop Live ETAs Accordion */}
          {progression.orderedStops && progression.orderedStops.length > 0 && (
            <div className="pt-2 border-t border-emerald-100">
              <button
                type="button"
                onClick={() => setShowStopsList((p) => !p)}
                className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-100/70 hover:bg-emerald-200/80 text-emerald-900 text-xs font-bold flex items-center justify-between transition cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Stop-by-Stop Live ETAs ({progression.orderedStops.length} Stops)</span>
                </span>
                {showStopsList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showStopsList && (
                <div className="mt-2 space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {progression.orderedStops.map((stop, sIdx) => {
                    const isNext = stop.isCurrentNext;
                    const isPassed = stop.isPassed;
                    return (
                      <div
                        key={sIdx}
                        className={`p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isNext
                            ? 'bg-amber-100/90 border border-amber-300 font-medium'
                            : isPassed
                            ? 'bg-slate-100/60 opacity-60'
                            : 'bg-white border border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isNext
                                ? 'bg-amber-500 animate-ping'
                                : isPassed
                                ? 'bg-emerald-600'
                                : 'bg-slate-400'
                            }`}
                          />
                          <div className="truncate">
                            <div className="flex items-center gap-1">
                              <span className={`truncate font-semibold ${isNext ? 'text-amber-950 font-bold' : 'text-slate-800'}`}>
                                {stop.name}
                              </span>
                              {stop.stopType === 'metro' && (
                                <span className="text-[9px] px-1 py-0.2 rounded bg-purple-100 text-purple-700 font-bold shrink-0">Metro</span>
                              )}
                              {stop.stopType === 'isbt' && (
                                <span className="text-[9px] px-1 py-0.2 rounded bg-blue-100 text-blue-700 font-bold shrink-0">ISBT</span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 block">
                              {stop.formattedDistance ? `${stop.formattedDistance} away` : isPassed ? 'Departed' : 'Scheduled'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          {isPassed ? (
                            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5 justify-end">
                              <Check className="w-3 h-3" /> Passed
                            </span>
                          ) : (
                            <div>
                              <span className={`font-mono text-xs font-black block ${isNext ? 'text-amber-950' : 'text-slate-900'}`}>
                                {stop.etaClockTime || (stop.etaMins ? `${stop.etaMins}m` : '--')}
                              </span>
                              {stop.etaMins && (
                                <span className="text-[10px] text-slate-500 block">
                                  +{stop.etaMins} min
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* DELHI GOVT FARE & PINK TICKET INFO (FROM ONE DELHI APP)                   */}
        {/* ========================================================================= */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center font-black shadow-sm">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-pink-700">
                Delhi Pink Ticket (Gulabi Pass)
              </div>
              <div className="text-xs font-extrabold text-pink-950">
                100% Free Travel for Women & Transgender
              </div>
            </div>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-200/80 text-pink-900 border border-pink-300">
            ₹0 Fare
          </span>
        </div>

        {/* Depot & Vehicle Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1 text-slate-400 font-medium text-[10px] uppercase tracking-wider">
              <Building2 className="w-3 h-3 text-indigo-500" /> Assigned Home Depot
            </div>
            <div className="font-bold text-slate-800 mt-0.5 truncate">
              {bus.depotName || 'Delhi DTC Depot'}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1 text-slate-400 font-medium text-[10px] uppercase tracking-wider">
              <Bus className="w-3 h-3 text-emerald-500" /> Bus Specification
            </div>
            <div className="font-bold text-slate-800 mt-0.5 truncate">
              {bus.busModel || (isEV ? 'Electric AC Low-Floor' : 'CNG Low-Floor')}
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Speed */}
          <div id="bus-current-speed-card" className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-indigo-600" /> Current Speed
              </span>
              {isSpeedAvailable && currentSpeedKmH !== null && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    currentSpeedKmH > 0
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {currentSpeedKmH > 0 ? 'Moving' : 'At Stop'}
                </span>
              )}
            </div>
            <div className="mt-1 font-black text-lg text-slate-900 flex items-baseline gap-1.5">
              {isSpeedAvailable ? (
                <>
                  <span id="bus-speed-kmh-value" className="font-mono text-xl font-black text-slate-900">
                    {speedFormatted}
                  </span>
                  {currentSpeedKmH === 0 && (
                    <span className="text-xs font-normal text-slate-500">
                      (Idling)
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm font-semibold text-slate-400">
                  Not available
                </span>
              )}
            </div>
          </div>

          {/* Heading */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Compass className="w-3.5 h-3.5 text-emerald-600" /> Bearing / Heading
            </div>
            <div className="mt-1 font-black text-lg text-slate-900">
              {bus.bearing > 0 ? `${bus.bearing}°` : 'Nominal'}
            </div>
          </div>
        </div>

        {/* Live GPS Coordinates & Google Maps Link */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" /> Live GPS Coordinates
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {bus.ageSeconds < 5 ? 'Live ping' : `${bus.ageSeconds}s ago`}
            </span>
          </div>

          <div className="font-mono text-xs font-semibold text-slate-700 bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
            <span>
              {bus.lat.toFixed(5)}, {bus.lng.toFixed(5)}
            </span>
            <button
              id="copy-coords-btn"
              onClick={handleCopyCoords}
              className="text-emerald-600 hover:text-emerald-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : 'Copy'}
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <a
              id="open-google-maps-link"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> View in Google Maps
            </a>

            {onFollowBus && (
              <button
                id="follow-bus-btn"
                onClick={() => onFollowBus(bus)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md transition cursor-pointer ${
                  isFollowing ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {isFollowing ? 'Tracking Bus ✓' : 'Follow on Map'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
