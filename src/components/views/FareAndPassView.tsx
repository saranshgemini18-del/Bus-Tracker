import React, { useState } from 'react';

export const FareAndPassView: React.FC = () => {
  // Calculator state
  const [calcFleetType, setCalcFleetType] = useState<'non-ac' | 'ac'>('ac');
  const [originStop, setOriginStop] = useState('AIIMS / Ansari Nagar');
  const [destStop, setDestStop] = useState('Connaught Place (Outer Circle)');
  const [calculatedDistance, setCalculatedDistance] = useState(8.6);

  // Pass filter tab
  const [passFilter, setPassFilter] = useState<'all' | 'daily' | 'monthly' | 'concession'>('all');

  // e-Pass Modal
  const [showPassModal, setShowPassModal] = useState(false);
  const [passCategory, setPassCategory] = useState('Monthly General AC Pass (₹1,000)');
  const [applicantMobile, setApplicantMobile] = useState('');
  const [applicantId, setApplicantId] = useState('');
  const [passGeneratedToken, setPassGeneratedToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Handle calculate fare
  const getFare = () => {
    if (calcFleetType === 'non-ac') {
      if (calculatedDistance <= 4) return { base: 5, digital: 4.5 };
      if (calculatedDistance <= 10) return { base: 10, digital: 9 };
      return { base: 15, digital: 13.5 };
    } else {
      if (calculatedDistance <= 4) return { base: 10, digital: 9 };
      if (calculatedDistance <= 8) return { base: 15, digital: 13.5 };
      if (calculatedDistance <= 12) return { base: 20, digital: 18 };
      return { base: 25, digital: 22.5 };
    }
  };

  const currentFare = getFare();

  const handleApplyPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantMobile || applicantMobile.trim().length < 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    setFormError(null);
    const token = `DTC-EPASS-${Math.floor(100000 + Math.random() * 900000)}`;
    setPassGeneratedToken(token);
  };

  const passes = [
    {
      id: 'p-daily-nonac',
      category: 'daily',
      name: 'Daily General Pass (Non-AC)',
      hindiName: 'दैनिक सामान्य पास (साधारण बस)',
      price: '₹40',
      validity: '1 Day (Until 11:59 PM)',
      perks: ['Unlimited boarding on all Green DTC buses', 'Instant QR on mobile or from conductor'],
      badge: 'Bestseller Daily',
    },
    {
      id: 'p-daily-ac',
      category: 'daily',
      name: 'Daily General Pass (AC & Electric)',
      hindiName: 'दैनिक सामान्य पास (वातानुकूलित बस)',
      price: '₹50',
      validity: '1 Day (Until 11:59 PM)',
      perks: ['All AC Low-Floor Electric & Red Buses', 'Includes Ring Road & Express lines'],
      badge: 'Commuter Pick',
    },
    {
      id: 'p-monthly-nonac',
      category: 'monthly',
      name: 'Monthly General Pass (Non-AC)',
      hindiName: 'मासिक सामान्य पास (साधारण)',
      price: '₹800',
      validity: '30 Consecutive Days',
      perks: ['Over 300+ city non-AC routes', 'Photo e-Pass stored on One Delhi App'],
      badge: 'Economy',
    },
    {
      id: 'p-monthly-ac',
      category: 'monthly',
      name: 'Monthly General Pass (AC All Route)',
      hindiName: 'मासिक सामान्य पास (सभी वातानुकूलित)',
      price: '₹1,000',
      validity: '30 Consecutive Days',
      perks: ['Unrestricted access to all DTC & Cluster fleets', 'Zero surge, priority QR check-in'],
      badge: 'Most Popular',
    },
    {
      id: 'p-student',
      category: 'concession',
      name: 'Student Concession Pass',
      hindiName: 'विद्यार्थी रियायती पास',
      price: '₹100 / mo',
      validity: 'Quarterly / Monthly Renewal',
      perks: ['Available for school & Delhi University students', 'Institution verification required'],
      badge: '90% Govt Subsidy',
    },
    {
      id: 'p-senior',
      category: 'concession',
      name: 'Senior Citizen Pass (60+ yrs)',
      hindiName: 'वरिष्ठ नागरिक रियायती पास',
      price: '₹250 / mo',
      validity: 'Monthly / Annual',
      perks: ['Subsidized senior mobility', 'Valid with Aadhaar/Age verification'],
      badge: 'Honour Concession',
    },
  ];

  const filteredPasses = passes.filter((p) => {
    if (passFilter === 'all') return true;
    return p.category === passFilter;
  });

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#0b0f17] text-[#171c23] dark:text-[#f1f5f9] py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10 transition-colors">
      {/* Official GNCTD Notification Strip */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#ca4a1c]/10 via-[#93f3ba]/20 to-[#ca4a1c]/10 dark:from-[#ca4a1c]/20 dark:via-[#006d42]/20 dark:to-[#ca4a1c]/20 border border-[#ca4a1c]/20 dark:border-[#ca4a1c]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#171c23] dark:text-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-[#006d42] dark:bg-[#52e89f] shrink-0"></span>
          <span className="font-extrabold text-[#a83301] dark:text-[#ff7849] uppercase tracking-wide">
            GNCTD Transit Gazette:
          </span>
          <span className="font-medium text-[#171c23] dark:text-slate-200">
            100% Free Travel for Women via Pink Passes across all DTC & Cluster buses. 10% instant discount on digital ticketing!
          </span>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#006d42] dark:bg-[#008f57] text-white font-bold text-[11px] shrink-0 shadow-sm">
          Govt. Subsidized
        </span>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbd0] dark:bg-[#ca4a1c]/25 text-[#842500] dark:text-[#ff9d7d] text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-[15px]">confirmation_number</span>
            Official DTC Transit Fares & Passes 2025
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#171c23] dark:text-white tracking-tight">
            DTC Fares, Passes & Digital Ticketing
          </h1>
          <p className="text-base text-[#59413a] dark:text-slate-400 mt-1.5 font-medium">
            दिल्ली परिवहन निगम किराया एवं पास प्रणाली • Simple, transparent transit tariffs with instant cashless rebates.
          </p>
        </div>

        {/* Highlight Metrics */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm border border-slate-200 dark:border-slate-800 text-center min-w-[120px]">
            <span className="text-xl font-black text-[#006d42] dark:text-[#52e89f]">1.50B+</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Free Pink Rides</p>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm border border-slate-200 dark:border-slate-800 text-center min-w-[120px]">
            <span className="text-xl font-black text-[#a83301] dark:text-[#ff7849]">10% OFF</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">One Delhi & QR</p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 01: FARE TARIFF SLABS & CALCULATOR                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Tariff Cards (Non-AC, AC, Pink) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-extrabold text-[#171c23] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a83301] dark:text-[#ff7849]">payments</span>
              Standard Single-Journey Fares
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">Fixed Distance Slabs</span>
          </div>

          {/* Non-AC Ordinary Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#006d42] dark:text-[#52e89f] flex items-center justify-center font-black">
                  <span className="material-symbols-outlined">directions_bus</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[#171c23] dark:text-white text-base">Non-AC Ordinary Buses</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Green DTC & Orange Cluster Vehicles</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                Max ₹15
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Up to 4 km</span>
                <strong className="text-lg font-black text-[#171c23] dark:text-white">₹5</strong>
                <span className="text-[10px] text-[#006d42] dark:text-[#52e89f] block font-bold">₹4.50 Digital</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">4 to 10 km</span>
                <strong className="text-lg font-black text-[#171c23] dark:text-white">₹10</strong>
                <span className="text-[10px] text-[#006d42] dark:text-[#52e89f] block font-bold">₹9.00 Digital</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Above 10 km</span>
                <strong className="text-lg font-black text-[#171c23] dark:text-white">₹15</strong>
                <span className="text-[10px] text-[#006d42] dark:text-[#52e89f] block font-bold">₹13.50 Digital</span>
              </div>
            </div>
          </div>

          {/* AC Low-Floor Electric & Red Buses Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm border border-[#ca4a1c]/30 dark:border-[#ca4a1c]/50 ring-1 ring-[#ca4a1c]/20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdbd0] dark:bg-[#ca4a1c]/25 text-[#a83301] dark:text-[#ff7849] flex items-center justify-center font-black">
                  <span className="material-symbols-outlined">electric_bolt</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[#171c23] dark:text-white text-base">AC Low-Floor & Electric Buses</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#ca4a1c] text-white text-[10px] font-extrabold">
                      Air Conditioned
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Blue Electric, Red AC & Express Corridors</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#a83301] dark:text-[#ff9d7d] bg-[#ffdbd0] dark:bg-[#ca4a1c]/25 px-2.5 py-1 rounded-full">
                Max ₹25
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4 text-center">
              <div className="p-2 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Up to 4 km</span>
                <strong className="text-base font-black text-[#171c23] dark:text-white">₹10</strong>
                <span className="text-[9px] text-[#006d42] dark:text-[#52e89f] block font-bold">₹9 Digital</span>
              </div>
              <div className="p-2 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">4 to 8 km</span>
                <strong className="text-base font-black text-[#171c23] dark:text-white">₹15</strong>
                <span className="text-[9px] text-[#006d42] dark:text-[#52e89f] block font-bold">₹13.50 Digital</span>
              </div>
              <div className="p-2 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">8 to 12 km</span>
                <strong className="text-base font-black text-[#171c23] dark:text-white">₹20</strong>
                <span className="text-[9px] text-[#006d42] dark:text-[#52e89f] block font-bold">₹18 Digital</span>
              </div>
              <div className="p-2 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Above 12 km</span>
                <strong className="text-base font-black text-[#171c23] dark:text-white">₹25</strong>
                <span className="text-[9px] text-[#006d42] dark:text-[#52e89f] block font-bold">₹22.50 Digital</span>
              </div>
            </div>
          </div>

          {/* Pink Ticket Universal Free Travel */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 via-white to-pink-50 dark:from-pink-950/30 dark:via-[#121a27] dark:to-pink-950/20 shadow-sm border border-pink-200 dark:border-pink-900/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center font-black">
                  <span className="material-symbols-outlined">female</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-pink-950 dark:text-pink-300 text-base">
                    Pink Ticket Scheme (गुलाबी टिकट)
                  </h3>
                  <p className="text-xs text-pink-800 dark:text-pink-400">
                    100% Free Travel for all Female Commuters across Delhi NCR
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-pink-700 dark:text-pink-400">₹0.00</span>
                <span className="text-[10px] text-pink-600 dark:text-pink-400 block font-bold">Zero Paperwork</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-pink-100 dark:border-pink-900/40">
              Conductors issue the physical single-journey Pink Pass upon boarding without requiring age or domicile certificate. Valid on both AC and Non-AC city fleets.
            </p>
          </div>
        </div>

        {/* Right Column (5 cols): Interactive Fare Estimator & Digital Payment */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121a27] shadow-md border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-extrabold text-[#171c23] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a83301] dark:text-[#ff7849]">calculate</span>
              Calculate My Journey Fare
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select origin and destination to check exact tariff & discount.
            </p>

            {/* Fleet Type Selector */}
            <div className="mt-4 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center">
              <button
                type="button"
                onClick={() => setCalcFleetType('ac')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  calcFleetType === 'ac' ? 'bg-white dark:bg-[#1a2538] text-[#a83301] dark:text-[#ff7849] shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                AC Electric / Red
              </button>
              <button
                type="button"
                onClick={() => setCalcFleetType('non-ac')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  calcFleetType === 'non-ac' ? 'bg-white dark:bg-[#1a2538] text-[#a83301] dark:text-[#ff7849] shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Non-AC Ordinary
              </button>
            </div>

            {/* Inputs */}
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Boarding Stop</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    trip_origin
                  </span>
                  <input
                    type="text"
                    value={originStop}
                    onChange={(e) => setOriginStop(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Destination Stop</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    location_on
                  </span>
                  <input
                    type="text"
                    value={destStop}
                    onChange={(e) => setDestStop(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                  />
                </div>
              </div>

              {/* Distance Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Transit Distance</span>
                  <strong className="text-[#a83301] dark:text-[#ff7849]">{calculatedDistance} km</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="28"
                  step="0.5"
                  value={calculatedDistance}
                  onChange={(e) => setCalculatedDistance(parseFloat(e.target.value))}
                  className="w-full accent-[#a83301]"
                />
              </div>
            </div>

            {/* Calculated Outcome */}
            <div className="mt-5 p-4 rounded-xl bg-[#f0f4fd] dark:bg-[#182334] border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Standard Cash Ticket</span>
                <div className="text-2xl font-black text-[#171c23] dark:text-white">₹{currentFare.base}</div>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="text-right">
                <span className="text-xs text-[#006d42] dark:text-[#52e89f] font-bold">One Delhi Digital Pay</span>
                <div className="text-2xl font-black text-[#006d42] dark:text-[#52e89f]">₹{currentFare.digital.toFixed(2)}</div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">10% Instant Rebate</span>
              </div>
            </div>

            {bookingSuccess && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between">
                <span>{bookingSuccess}</span>
                <button onClick={() => setBookingSuccess(null)} className="text-emerald-600 hover:text-emerald-800 ml-2">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setBookingSuccess(`Fare confirmed: ₹${currentFare.digital.toFixed(2)} for ${calculatedDistance} km on Route 502/Direct.`)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#ca4a1c] text-white font-bold text-xs shadow hover:bg-[#a83301] transition cursor-pointer"
            >
              Book One Delhi QR Ticket
            </button>
          </div>

          {/* Smart Payment Channels Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Accepted Cashless Modes
            </h3>
            <div className="flex items-center justify-between text-xs text-[#171c23] dark:text-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-[#1a2538]">
              <div className="flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-[#a83301] dark:text-[#ff7849]">qr_code_2</span>
                One Delhi App QR
              </div>
              <span className="text-[#006d42] dark:text-[#52e89f] font-bold">10% Off</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#171c23] dark:text-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-[#1a2538]">
              <div className="flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">contactless</span>
                DMRC Metro Smart Card Tap
              </div>
              <span className="text-slate-500 dark:text-slate-400">Accepted on-board</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#171c23] dark:text-slate-200 p-2 rounded-lg bg-slate-50 dark:bg-[#1a2538]">
              <div className="flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">sound_detection_loud_sound</span>
                Soundbox UPI QR (GPay, PhonePe, Paytm)
              </div>
              <span className="text-slate-500 dark:text-slate-400">Live Audio Chime</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 02: DAILY & MONTHLY PASS SUBSCRIPTIONS                             */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#171c23] dark:text-white tracking-tight">
              DTC Transit Passes & Subscriptions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cost-effective daily, monthly, and student concessional travel passes.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            {(['all', 'daily', 'monthly', 'concession'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPassFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition cursor-pointer ${
                  passFilter === tab ? 'bg-[#ca4a1c] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Passes' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Pass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPasses.map((pass) => (
            <div
              key={pass.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#121a27] shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbd0] dark:bg-[#ca4a1c]/25 text-[#842500] dark:text-[#ff9d7d] text-[10px] font-extrabold uppercase tracking-wide">
                    {pass.badge}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{pass.validity}</span>
                </div>

                <h3 className="text-lg font-black text-[#171c23] dark:text-white mt-2 leading-snug">{pass.name}</h3>
                <p className="text-xs text-[#59413a] dark:text-slate-400 font-medium">{pass.hindiName}</p>

                <div className="my-3">
                  <span className="text-2xl font-black text-[#a83301] dark:text-[#ff7849]">{pass.price}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">/ commuter</span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {pass.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[#006d42] dark:text-[#52e89f] text-[15px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setPassCategory(pass.name);
                    setShowPassModal(true);
                  }}
                  className="w-full py-2 rounded-xl bg-[#f0f4fd] dark:bg-[#1a2538] hover:bg-[#ca4a1c] dark:hover:bg-[#ca4a1c] hover:text-white dark:hover:text-white text-[#171c23] dark:text-slate-200 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">add_card</span>
                  <span>Apply e-Pass Online</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online e-Pass Application Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#121a27] text-[#171c23] dark:text-slate-100 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setShowPassModal(false);
                setPassGeneratedToken(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-[#a83301] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">badge</span>
              </span>
              <div>
                <h3 className="font-extrabold text-base text-[#171c23] dark:text-white">Instant e-Pass Application</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Government of NCT of Delhi e-Governance</p>
              </div>
            </div>

            {passGeneratedToken ? (
              <div className="my-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[48px]">
                  verified
                </span>
                <h4 className="font-extrabold text-[#006d42] dark:text-[#52e89f] text-lg">Application Registered!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Your e-Pass dispatch token has been generated:
                </p>
                <div className="p-3 bg-white dark:bg-[#0b0f17] rounded-lg border border-emerald-300 dark:border-emerald-700 font-mono font-black text-[#171c23] dark:text-emerald-300 text-lg tracking-wider">
                  {passGeneratedToken}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Verification SMS has been triggered to +91 {applicantMobile}. Your QR e-Pass will appear in the One Delhi App within 15 minutes.
                </p>
                <button
                  onClick={() => {
                    setShowPassModal(false);
                    setPassGeneratedToken(null);
                  }}
                  className="mt-3 w-full py-2 bg-[#006d42] hover:bg-[#008f57] text-white font-bold text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPass} className="space-y-3 mt-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Selected Pass Category</label>
                  <input
                    type="text"
                    disabled
                    value={passCategory}
                    className="w-full h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Mobile Number (10 Digits) *
                  </label>
                  <div className="flex">
                    <span className="h-10 px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl flex items-center text-xs font-bold text-slate-600 dark:text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={applicantMobile}
                      onChange={(e) => setApplicantMobile(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full h-10 px-3 rounded-r-xl bg-[#f8f9ff] dark:bg-[#1a2538] text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Aadhaar / Student Enrollment No.
                  </label>
                  <input
                    type="text"
                    value={applicantId}
                    onChange={(e) => setApplicantId(e.target.value)}
                    placeholder="XXXX-XXXX-XXXX"
                    className="w-full h-10 px-3 rounded-xl bg-[#f8f9ff] dark:bg-[#1a2538] text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                  />
                </div>

                {formError && (
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#ca4a1c] text-white font-bold text-xs hover:bg-[#a83301] shadow"
                  >
                    Generate e-Pass
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
