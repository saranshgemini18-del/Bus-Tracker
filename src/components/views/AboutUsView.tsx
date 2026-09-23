import React from 'react';

interface AboutUsViewProps {
  onNavigateTab: (tab: string) => void;
  onOpenSOS: () => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onNavigateTab, onOpenSOS }) => {
  const leadershipMilestones = [
    {
      year: '1948',
      title: 'Delhi Road Transport Authority Established',
      description: 'The foundation for organised civic road transportation in Delhi NCR was formally inaugurated under the Delhi Road Transport Act.',
    },
    {
      year: '1971',
      title: 'Formation of Delhi Transport Corporation (DTC)',
      description: 'DTC was reconstituted under the administrative control of the Government of NCT of Delhi, expanding cross-city fleet operations.',
    },
    {
      year: '2002',
      title: 'World’s First 100% CNG Public Bus Fleet',
      description: 'Delhi DTC created global history by transitioning its entire public transit fleet from diesel to clean Compressed Natural Gas (CNG).',
    },
    {
      year: '2019',
      title: 'Introduction of Pink Ticket (Free Travel for Women)',
      description: 'Delhi Government launched 100% zero-fare travel for women across all DTC buses with round-the-clock Bus Marshals onboard.',
    },
    {
      year: '2022',
      title: 'Electric Bus Revolution (Zero Emissions)',
      description: 'Induction of state-of-the-art low-floor electric air-conditioned buses equipped with panic buttons, CCTV cameras, and live GPS.',
    },
    {
      year: 'Present',
      title: 'Open Transit Data & Live GPS Telemetry',
      description: 'Full real-time GTFS telematics integration allowing over 4.2 million daily commuters to track every bus with sub-minute precision.',
    },
  ];

  const keyFacts = [
    {
      stat: '6,400+',
      label: 'Operational Buses',
      sub: 'DTC & DIMTS Cluster combined fleet',
      icon: 'directions_bus',
      color: 'text-[#ca4a1c]',
      bg: 'bg-orange-50',
    },
    {
      stat: '1,800+',
      label: 'Zero-Emission Electric Buses',
      sub: 'One of the largest EV fleets in South Asia',
      icon: 'electric_bolt',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
    },
    {
      stat: '4.2M+',
      label: 'Daily Commuters Served',
      sub: 'Connecting residential, educational, and business nodes',
      icon: 'groups',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
    },
    {
      stat: '460+',
      label: 'Regulated Transit Corridors',
      sub: 'Spanning all 11 districts and NCR borders',
      icon: 'alt_route',
      color: 'text-purple-700',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#0b0f17] text-[#171c23] dark:text-[#f1f5f9] transition-colors">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#171c23] to-[#2a3443] text-white py-14 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#ca4a1c]/20 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-4">
            <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
            <span>Government of NCT of Delhi Enterprise</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            About Delhi Transport Corporation (DTC)
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-3 font-medium leading-relaxed">
            Committed to providing safe, dependable, eco-friendly, and technologically advanced public bus transit services to the citizens and visitors of Delhi NCR.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onNavigateTab('live-map')}
              className="px-5 py-2.5 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
              <span>Open Live Fleet Map</span>
            </button>
            <button
              onClick={() => onNavigateTab('fare-and-pass')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
              <span>Explore Fares & Passes</span>
            </button>
          </div>
        </div>
      </section>

      {/* Fleet Stats Overview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyFacts.map((f, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200/90 dark:border-slate-800 shadow-lg flex flex-col justify-between"
            >
              <div className={`w-10 h-10 rounded-2xl ${f.bg} dark:bg-slate-800 ${f.color} flex items-center justify-center mb-3`}>
                <span className="material-symbols-outlined text-[24px]">{f.icon}</span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{f.stat}</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">{f.label}</div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#ca4a1c]/10 dark:bg-[#ca4a1c]/20 text-[#ca4a1c] dark:text-[#ff7849] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[28px]">visibility</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Our Vision</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To be recognized as an accessible, high-efficiency, and carbon-neutral world-class public transportation system that bridges every corner of Delhi NCR with pride and citizen trust.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[28px]">flag</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Our Mission</h2>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px] shrink-0">check_circle</span>
                <span>Deliver reliable, punctual, and safe road transit across all socio-economic sectors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px] shrink-0">check_circle</span>
                <span>Accelerate zero-emission electric bus transition to curtail urban air pollution.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px] shrink-0">check_circle</span>
                <span>Ensure total commuter security through onboard marshals, CCTV, and panic buttons.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-14 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#0e141f] border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Evolution of Delhi Bus Transit
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              From colonial fleet beginnings to one of the world's most modern electric bus networks
            </p>
          </div>

          <div className="relative border-l-2 border-[#ca4a1c]/30 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-8">
            {leadershipMilestones.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Year tag on left for desktop */}
                <div className="hidden sm:block absolute -left-36 top-0 w-24 text-right">
                  <span className="text-base font-black text-[#ca4a1c] dark:text-[#ff7849]">{item.year}</span>
                </div>

                {/* Node pin */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#ca4a1c] border-4 border-white dark:border-[#0e141f] shadow-sm" />

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#151f2e] border border-slate-200/80 dark:border-slate-800 group-hover:bg-white dark:group-hover:bg-[#1a2538] group-hover:shadow-md transition">
                  <div className="sm:hidden text-xs font-black text-[#ca4a1c] dark:text-[#ff7849] mb-1">
                    {item.year}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Civic Inclusivity */}
      <section className="py-14 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-900 to-[#171c23] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Women Safety & Civic Priority</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Safe Journeys Guaranteed with On-Board Bus Marshals
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
              Every DTC bus is monitored via GPS telemetry and fitted with direct SOS buttons linked to the Delhi Police central command room.
            </p>
          </div>

          <button
            onClick={onOpenSOS}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg whitespace-nowrap cursor-pointer shrink-0 transition"
          >
            Emergency SOS Panel
          </button>
        </div>
      </section>
    </div>
  );
};
