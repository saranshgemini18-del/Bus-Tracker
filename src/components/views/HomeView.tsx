import React, { useState } from 'react';
import { DTCBus, FleetSummary, TransitHub } from '../../types';
import { DELHI_HUBS } from '../../data/terminals';
import { DTC_KNOWN_ROUTES } from '../../data/dtcRoutes';
import { PWAInstallButton } from '../PWAInstallButton';

interface HomeViewProps {
  buses: DTCBus[];
  summary: FleetSummary | null;
  onNavigateTab: (tab: string) => void;
  onSelectRoute: (routeId: string) => void;
  onSelectHub: (hub: TransitHub) => void;
  onOpenSOS: () => void;
  onOpenRouteFinder: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  buses,
  summary,
  onNavigateTab,
  onSelectRoute,
  onSelectHub,
  onOpenSOS,
  onOpenRouteFinder,
}) => {
  const [quickSearch, setQuickSearch] = useState('');

  const featuredRoutes = [
    {
      routeId: '502',
      name: 'Mehrauli ↔ Old Delhi Railway Station',
      via: 'Saket • Hauz Khas • AIIMS • Central Secretariat • Red Fort',
      category: 'Trunk Corridor',
      ev: true,
    },
    {
      routeId: '419',
      name: 'Ambedkar Nagar Terminal ↔ Old Delhi Railway Station',
      via: 'Pushp Vihar • BRT Corridor • Moolchand • Delhi Gate',
      category: 'High Frequency',
      ev: true,
    },
    {
      routeId: '729',
      name: 'Kapashera Border ↔ Mori Gate Terminal',
      via: 'Mahipalpur • Dhaula Kuan • Karol Bagh • Kashmiri Gate',
      category: 'Express Arterial',
      ev: false,
    },
    {
      routeId: '840',
      name: 'Uttam Nagar Terminal ↔ Shivaji Stadium (CP)',
      via: 'Janakpuri • Tilak Nagar • Moti Nagar • CP Regal',
      category: 'Metro Feeder',
      ev: true,
    },
    {
      routeId: '522',
      name: 'Ambedkar Nagar ↔ Shivaji Stadium',
      via: 'Lajpat Nagar • Lodhi Road • India Gate • CP',
      category: 'Ring Connector',
      ev: true,
    },
    {
      routeId: 'OMS (+)',
      name: 'Outer Mudrika Ring Road (Clockwise)',
      via: 'Dhaula Kuan • AIIMS • Ashram • Anand Vihar • Azadpur',
      category: 'Circular Trunk',
      ev: true,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearch.trim()) return;
    const clean = quickSearch.replace(/route\s*/i, '').trim();
    onSelectRoute(clean);
    onNavigateTab('live-map');
  };

  const activeEvCount = buses.filter((b) => b.type === 'ev').length || 1850;
  const totalLiveBuses = buses.length || summary?.totalBuses || 6420;

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#0b0f17] text-[#171c23] dark:text-[#f1f5f9] transition-colors">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b232e] via-[#2a3443] to-[#ca4a1c] text-white py-14 px-4 sm:px-6 lg:px-12">
        {/* Background decorative grid & glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,74,28,0.35),transparent_50%)] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Civic Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider mb-6 text-amber-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Official Transit Portal • Delhi Transport Corporation (DTC)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
            Smarter, Greener Public Transit for{' '}
            <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-white bg-clip-text text-transparent">
              Delhi NCR
            </span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium">
            Live Open GTFS satellite telemetry tracking 6,400+ DTC & DIMTS cluster buses, contactless ticketing, smart route finding, and round-the-clock commuter assistance.
          </p>

          {/* Quick Route Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-8">
            <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl p-1.5 shadow-2xl border border-white/20 dark:border-slate-700">
              <span className="material-symbols-outlined text-[#ca4a1c] dark:text-[#ff7849] ml-3 text-[22px]">
                search
              </span>
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Enter bus route number (e.g. 502, 419, 729, OMS)..."
                className="flex-1 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-semibold focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              >
                <span>Track Route</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-2">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-300">
                {totalLiveBuses.toLocaleString()}
              </div>
              <div className="text-[11px] font-bold text-slate-300 uppercase mt-0.5">
                Active Live Buses
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                {activeEvCount.toLocaleString()}
              </div>
              <div className="text-[11px] font-bold text-slate-300 uppercase mt-0.5">
                Zero-Emission EVs
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-sky-300">460+</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase mt-0.5">
                Regulated Routes
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-pink-300">100% Free</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase mt-0.5">
                Women Pink Pass
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Mobile App Install Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 -mt-6 relative z-10">
        <PWAInstallButton variant="banner" />
      </div>

      {/* Core Civic Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Delhi Transit Services & Quick Portals
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Everything you need for your daily commute across Delhi and the Capital Region
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Live Interactive Map */}
          <div
            onClick={() => onNavigateTab('live-map')}
            className="p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-[#ca4a1c]/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-[#ca4a1c] dark:text-[#ff7849] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">map</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#ca4a1c] dark:group-hover:text-[#ff7849] transition-colors">
                Live GTFS Transit Map
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                60 FPS interactive canvas tracking every operational DTC and cluster bus with real-time GPS coordinates, speed, and route path overlays.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-[#ca4a1c] dark:text-[#ff7849]">
              <span>Launch Live Map</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          {/* Card 2: Nearby Bus Stands */}
          <div
            onClick={() => onNavigateTab('nearby-bus-stops')}
            className="p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">explore</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Nearby Bus Stops & Hubs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Locate bus shelters, ISBTs, metro interchanges, and terminals nearest to your current GPS position with live arrival predictions.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
              <span>View Nearby Stands</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          {/* Card 3: Stand Route Finder */}
          <div
            onClick={onOpenRouteFinder}
            className="p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">alt_route</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                Bus Stand Route Finder
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Connect any two bus stops across Delhi to discover all operational direct DTC bus routes with live fleet counts and travel ETAs.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-blue-700 dark:text-blue-400">
              <span>Find Connecting Buses</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          {/* Card 4: Fares, Daily & Monthly Passes */}
          <div
            onClick={() => onNavigateTab('fare-and-pass')}
            className="p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">confirmation_number</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                Fares & Digital e-Passes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Calculate journey fares, book ₹40 / ₹50 daily passes, student concessions, or generate instant contactless One Delhi QR tickets.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-amber-700 dark:text-amber-400">
              <span>Fare Calculator & Passes</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          {/* Card 5: Women Free Pink Ticket */}
          <div
            onClick={() => onNavigateTab('fare-and-pass')}
            className="p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-pink-500/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">female</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-pink-700 dark:group-hover:text-pink-400 transition-colors">
                Pink Pass (Women Free Travel)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Empowering female commuters with 100% zero-fare travel across all DTC Non-AC and Air-Conditioned electric bus fleets.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-pink-700 dark:text-pink-400">
              <span>Learn About Pink Tickets</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>

          {/* Card 6: Emergency SOS & Help */}
          <div
            onClick={onOpenSOS}
            className="p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-rose-200/80 dark:border-rose-900/60 shadow-sm hover:shadow-xl hover:border-rose-400 transition-all cursor-pointer group flex flex-col justify-between bg-gradient-to-br from-white to-rose-50/30 dark:from-[#121a27] dark:to-rose-950/20"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">sos</span>
              </div>
              <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300">
                Emergency SOS & Women Safety
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Direct single-tap line to Delhi Police (112), Women Helpline (1091), and DTC Central Control Room for on-board assistance.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-rose-700 dark:text-rose-400">
              <span>Open Emergency SOS</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Commuter Routes Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#0e141f] border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Popular High-Frequency Corridors
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Key arterial routes connecting Ring Road, ISBTs, and Central Delhi
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('live-map')}
              className="px-4 py-2 rounded-xl bg-[#f0f4fd] dark:bg-slate-800 hover:bg-[#e4e8f2] dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore All 460+ Routes on Map</span>
              <span className="material-symbols-outlined text-[16px]">map</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRoutes.map((r) => {
              const liveCount = buses.filter((b) => b.routeId.toLowerCase() === r.routeId.toLowerCase()).length;
              return (
                <div
                  key={r.routeId}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151f2e] border border-slate-200/80 dark:border-slate-800/80 hover:border-[#ca4a1c]/40 hover:bg-white dark:hover:bg-[#1a2538] transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-lg bg-[#ca4a1c] text-white text-xs font-black tracking-wide">
                        Route {r.routeId}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {r.ev && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                            ⚡ Electric
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                          {liveCount > 0 ? `${liveCount} Live` : 'Active'}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {r.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      via {r.via}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {r.category}
                    </span>
                    <button
                      onClick={() => {
                        onSelectRoute(r.routeId);
                        onNavigateTab('live-map');
                      }}
                      className="px-3 py-1 rounded-lg bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-bold transition cursor-pointer"
                    >
                      Track Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Major Delhi Transit Terminals */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Major Inter-State Bus Terminals & Hubs
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Integrated multi-modal hubs linking DTC buses, Delhi Metro, and Indian Railways
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('nearby-bus-stops')}
            className="text-xs font-bold text-[#ca4a1c] dark:text-[#ff7849] hover:underline flex items-center gap-1"
          >
            <span>View All Terminals</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DELHI_HUBS.slice(0, 4).map((hub) => (
            <div
              key={hub.id}
              onClick={() => {
                onSelectHub(hub);
                onNavigateTab('live-map');
              }}
              className="p-4 rounded-2xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#ca4a1c]/40 transition cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-[#ca4a1c] dark:text-[#ff7849] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[22px]">departure_board</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{hub.name}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {hub.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                <span>{hub.majorRoutes?.length || 8} Routes</span>
                <span className="text-[#ca4a1c] dark:text-[#ff7849] font-bold flex items-center gap-0.5">
                  Inspect
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
