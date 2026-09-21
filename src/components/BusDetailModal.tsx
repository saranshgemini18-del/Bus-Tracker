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

  // Compute live route progression: Starting Point, Next Point, and Last Point
  const progression = useMemo(() => {
    if (!bus) return null;
    return resolveBusProgression(bus, allBuses);
  }, [bus, allBuses]);

  if (!bus || !progression) return null;

  const isEV = bus.type === 'ev';

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${bus.lat.toFixed(6)}, ${bus.lng.toFixed(6)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${bus.lat},${bus.lng}`;

  return (
    <div
      id="bus-detail-panel"
      className="fixed inset-x-3 bottom-3 md:inset-auto md:right-6 md:top-20 md:w-[420px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 z-[500] overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 md:slide-in-from-right-6 max-h-[88vh] flex flex-col"
    >
      {/* Header Banner */}
      <div
        className={`px-5 py-3.5 text-white flex items-center justify-between shrink-0 ${
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
              <span>{isEV ? '100% Electric Low Floor' : `${bus.agency} Fleet Bus`}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            </div>
            <h3 className="font-mono font-black text-xl tracking-tight leading-none text-white mt-0.5">
              {bus.id}
            </h3>
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
      <div className="p-4 space-y-3.5 overflow-y-auto text-slate-800 text-sm flex-1">
        {/* Route Badge & Actions */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Assigned Route
            </span>
            <div className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Route {bus.routeId}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Live DTC
              </span>
            </div>
          </div>
          <button
            id="filter-this-route-btn"
            onClick={() => onFilterRoute(bus.routeId)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            Filter Route
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CORE USER REQUIREMENT: STARTING POINT, NEXT POINT, AND LAST POINT OF BUS */}
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
                  Starting Point (Origin)
                </div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  {progression.startPoint}
                </div>
              </div>
            </div>

            {/* 2. NEXT POINT (PROMINENT HIGHLIGHT) */}
            <div className="flex items-start gap-3 relative z-10 bg-amber-50/90 border border-amber-200 p-2.5 rounded-xl shadow-sm">
              <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-amber-600 text-amber-900 flex items-center justify-center shrink-0 font-bold text-xs shadow-md animate-pulse">
                <Radio className="w-4 h-4 text-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
                    Next Point (Upcoming Stand)
                  </span>
                  <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded">
                    ~{progression.nextPointEtaMins} min ETA
                  </span>
                </div>
                <div className="text-sm font-black text-slate-900 leading-snug mt-0.5">
                  {progression.nextPoint}
                </div>
                <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-2">
                  <span>Distance: <strong>{progression.nextPointFormattedDistance}</strong></span>
                  <span>•</span>
                  <span>Speed: {bus.speedKmH} km/h</span>
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
                  Last Point (Destination)
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

          {/* Complete Waypoint Sequence Chips */}
          {progression.orderedStops.length > 3 && (
            <div className="pt-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Intermediate Waypoints on this Route:
              </div>
              <div className="flex flex-wrap gap-1">
                {progression.orderedStops.map((st, i) => (
                  <span
                    key={i}
                    className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                      st.isCurrentNext
                        ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold ring-1 ring-amber-400'
                        : st.isPassed
                        ? 'bg-slate-100 text-slate-400 line-through border-slate-200'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {st.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Speed */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Gauge className="w-3.5 h-3.5 text-indigo-600" /> Current Speed
            </div>
            <div className="mt-1 font-black text-lg text-slate-900">
              {bus.speedKmH > 0 ? `${bus.speedKmH} km/h` : 'At Stop / Idling'}
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

        {/* Live GPS Coordinates & Maps Link */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" /> Live GPS Ping
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

        {/* Operating Agency & Trip Info */}
        <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Operating Agency:</span>
            <span className="font-bold text-slate-800">{bus.agency} (Govt of NCT Delhi)</span>
          </div>
          {bus.tripId && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400">GTFS Trip ID:</span>
              <span className="font-mono text-slate-800 text-[11px]">{bus.tripId}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
