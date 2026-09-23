import React, { useState } from 'react';

interface HelpAndSupportViewProps {
  onNavigateTab: (tab: string) => void;
  onOpenSOS?: () => void;
}

export const HelpAndSupportView: React.FC<HelpAndSupportViewProps> = ({
  onNavigateTab,
  onOpenSOS,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(1);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  const faqs = [
    {
      id: 1,
      category: 'tracking',
      q: 'How accurate is the live bus arrival ETA?',
      qHindi: 'लाइव बस आगमन का समय (ETA) कितना सटीक है?',
      a: 'The DTC Live Tracker pulls direct GPS telemetry every 10 seconds from on-board vehicle location tracking units (VLTD) provided by Delhi Open Transit Data (OTD). Estimated arrival times factor in live traffic bottlenecks along Delhi corridors (Ring Road, Mathura Road, Outer Ring Road) and are typically accurate within ±1 to 2 minutes.',
    },
    {
      id: 2,
      category: 'tickets',
      q: 'Who is eligible for the Pink Ticket (Free Women Travel)?',
      qHindi: 'पिंक टिकट (महिलाओं की मुफ्त यात्रा) के लिए कौन पात्र है?',
      a: 'All women commuters travelling on Delhi Transport Corporation (DTC) and Cluster (DIMTS) buses are eligible for 100% free travel without restriction on distance or age. Pink Single Journey Tickets are issued by the bus conductor directly upon boarding. No prior registration or residence certificate is required.',
    },
    {
      id: 3,
      category: 'tickets',
      q: 'Can I pay bus fares using UPI or Delhi Metro Smart Card?',
      qHindi: 'क्या मैं यूपीआई या दिल्ली मेट्रो कार्ड से किराया दे सकता हूँ?',
      a: 'Yes! All DTC buses are equipped with Electronic Ticketing Machines (ETMs) and on-board Soundbox QR terminals. You can tap your Delhi Metro Smart Card for automatic contactless fare deduction, or scan the conductor QR code via the One Delhi App or any UPI application (PhonePe, Google Pay, Paytm) to receive an automatic 10% digital ticketing rebate.',
    },
    {
      id: 4,
      category: 'routes',
      q: 'What should I do if a bus does not stop at a designated bus stop?',
      qHindi: 'यदि कोई बस बस स्टॉप पर नहीं रुकती है तो मुझे क्या करना चाहिए?',
      a: 'Skipping designated bus stops is a punishable violation under DTC operating guidelines. Note down the bus registration number (e.g. DL 1PC 9824), route number, stop name, and time of occurrence. You can immediately report this via our 24x7 Helpline (1800-11-8181) or lodge a formal complaint on the Grievance Redressal tab for depot investigation.',
    },
    {
      id: 5,
      category: 'routes',
      q: 'How do I identify 100% Electric Low-Floor buses?',
      qHindi: '100% इलेक्ट्रिक लो-फ्लोर बसों की पहचान कैसे करें?',
      a: 'Electric buses in Delhi feature distinct Blue and Green liveries with the "Electric" branding on front and sides. They feature pneumatic kneeling suspensions, zero tailpipe emissions, wheelchair boarding ramps, automated route displays in Hindi & English, and live CCTV monitored by the Central Command Centre.',
    },
    {
      id: 6,
      category: 'safety',
      q: 'How do I retrieve an item misplaced or forgotten inside a DTC bus?',
      qHindi: 'बस में छूटा हुआ सामान वापस पाने के लिए क्या प्रक्रिया है?',
      a: 'If you left an item in a bus, contact the Central DTC Control Room at 1800-11-8181 or visit the destination terminal depot of that route. Bus marshals and conductors deposit unclaimed baggage at the depot terminal at the end of each round trip under safe custody register.',
    },
    {
      id: 7,
      category: 'safety',
      q: 'What accommodations exist for wheelchair users and senior citizens?',
      qHindi: 'दिव्यांगों और वरिष्ठ नागरिकों के लिए क्या सुविधाएं हैं?',
      a: 'All Low-Floor DTC and EV buses feature fold-out mechanical wheelchair ramps at the center door, wide entry doors, dedicated wheelchair anchor bays with seatbelts, and reserved priority seating for senior citizens and persons with disabilities.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        faq.q.toLowerCase().includes(q) ||
        faq.qHindi.includes(q) ||
        faq.a.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#0b0f17] text-[#171c23] dark:text-[#f1f5f9] py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10 transition-colors">
      {/* Ambient Glow Header with Search & Trending Tags */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#171c23] via-[#2c3138] to-[#171c23] text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#a83301]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-80 h-80 bg-[#006d42]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ffdbd0] text-xs font-bold backdrop-blur-md">
            <span className="material-symbols-outlined text-[15px]">support_agent</span>
            DTC Commuter Knowledge Base
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            How can we assist your Delhi transit journey today?
          </h1>
          <p className="text-slate-300 text-sm">
            दिल्ली परिवहन निगम सहायता केंद्र • Search guides, ticketing policies, live GPS telematics, and passenger safety.
          </p>

          {/* Search Box */}
          <div className="relative pt-2">
            <span className="material-symbols-outlined absolute left-3.5 top-5 text-slate-400 text-[22px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask a question (e.g. Pink ticket rules, bus delay, lost item)..."
              className="w-full h-12 pl-11 pr-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#ca4a1c] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-5 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Trending Search Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-semibold">Trending:</span>
            {['Pink Ticket', 'GPS Delay', 'UPI/QR Payment', 'EV Charging Corridor'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-bold transition cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Photographic & Stat Anchors (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#006d42] dark:text-[#52e89f] flex items-center justify-center font-black shrink-0">
              <span className="material-symbols-outlined text-[26px]">cell_tower</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase">Telematics</span>
              <h3 className="font-extrabold text-[#171c23] dark:text-white text-base">6,400+ GPS Buses</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
            Live telemetry synced with Delhi Open Transit Data (OTD) for sub-second tracking.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#006d42] dark:text-[#52e89f]">
            <span>OTD Gateway Online</span>
            <span className="w-2 h-2 rounded-full bg-[#006d42] dark:bg-[#52e89f] animate-pulse"></span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 flex items-center justify-center font-black shrink-0">
              <span className="material-symbols-outlined text-[26px]">volunteer_activism</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase">Women Safety</span>
              <h3 className="font-extrabold text-[#171c23] dark:text-white text-base">Universal Pink Ticket</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
            Over 1.5 billion zero-cost rides safely completed with trained bus marshals on duty.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-pink-700 dark:text-pink-400">
            <span>Free On-Board Pass</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbd0] dark:bg-[#ca4a1c]/25 text-[#a83301] dark:text-[#ff7849] flex items-center justify-center font-black shrink-0">
              <span className="material-symbols-outlined text-[26px]">contactless</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase">Smart Transit</span>
              <h3 className="font-extrabold text-[#171c23] dark:text-white text-base">Metro Card & UPI</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
            Integrated multi-modal ticketing. Use DMRC Smart Cards or One Delhi QR on any route.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-[#a83301] dark:text-[#ff7849]">
            <span>10% Instant Rebate</span>
          </div>
        </div>
      </div>

      {/* Knowledge Pillars (5 Cards) */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-[#171c23] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#a83301] dark:text-[#ff7849]">menu_book</span>
          Knowledge Pillars
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {[
            { id: 'tracking', label: 'Live Tracking & GPS', count: '7 Articles', icon: 'radar' },
            { id: 'tickets', label: 'Tickets & Passes', count: '9 Articles', icon: 'confirmation_number' },
            { id: 'routes', label: 'Routes & Schedules', count: '12 Articles', icon: 'alt_route' },
            { id: 'safety', label: 'Safety & Marshals', count: '5 Articles', icon: 'security' },
            { id: 'lost', label: 'Lost & Found Depot', count: '4 Articles', icon: 'luggage' },
          ].map((pillar) => {
            const isSelected = activeCategory === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveCategory(isSelected ? 'all' : pillar.id)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#ca4a1c] text-white border-[#ca4a1c] shadow-md'
                    : 'bg-white dark:bg-[#121a27] hover:bg-slate-50 dark:hover:bg-[#1a2538] text-[#171c23] dark:text-white border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <span className={`material-symbols-outlined text-[24px] ${isSelected ? 'text-white' : 'text-[#a83301] dark:text-[#ff7849]'}`}>
                  {pillar.icon}
                </span>
                <h4 className="font-extrabold text-xs mt-2 leading-tight">{pillar.label}</h4>
                <span className={`text-[10px] mt-1 block font-semibold ${isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                  {pillar.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#171c23] dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">अक्सर पूछे जाने वाले सवाल</p>
          </div>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-xs font-bold text-[#a83301] dark:text-[#ff7849] hover:underline cursor-pointer"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-[#162132] transition cursor-pointer"
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-[#171c23] dark:text-white">{faq.q}</h3>
                    <p className="text-xs text-[#59413a] dark:text-slate-400 font-medium mt-0.5">{faq.qHindi}</p>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[#a83301] dark:text-[#ff7849] transition-transform duration-200 shrink-0 mt-1 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-[#f8f9ff]/60 dark:bg-[#162030]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency & Direct Escalation Banner */}
      <div className="p-6 rounded-3xl bg-[#ca4a1c] text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px]">phone_in_talk</span>
            24x7 Dedicated Assistance
          </div>
          <h3 className="text-xl font-black">Need instant commuter support or immediate help?</h3>
          <p className="text-xs text-white/90">
            DTC round-the-clock helpline is available for schedule inquiries, emergency marshals, and lost property.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="tel:1800118181"
            className="px-4 py-2.5 rounded-xl bg-white text-[#a83301] font-black text-xs shadow hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call 1800-11-8181</span>
          </a>

          <button
            onClick={() => onNavigateTab('contact-us-and-grievance')}
            className="px-4 py-2.5 rounded-xl bg-black/30 hover:bg-black/40 text-white font-bold text-xs border border-white/30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">report_problem</span>
            <span>Lodge Grievance</span>
          </button>
        </div>
      </div>

      {/* Interactive Helpful Feedback */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Did you find what you were looking for? (क्या यह जानकारी उपयोगी थी?)
        </span>
        {feedbackGiven ? (
          <span className="text-xs font-bold text-[#006d42] dark:text-[#52e89f] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Thank you for your feedback!
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedbackGiven('yes')}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 hover:text-[#006d42] dark:hover:text-[#52e89f] text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">thumb_up</span> Yes
            </button>
            <button
              onClick={() => setFeedbackGiven('no')}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/80 hover:text-rose-700 dark:hover:text-rose-400 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">thumb_down</span> No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
