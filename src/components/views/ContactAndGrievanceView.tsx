import React, { useState } from 'react';

export const ContactAndGrievanceView: React.FC = () => {
  // Grievance Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [category, setCategory] = useState('bus_not_stopping');
  const [routeNumber, setRouteNumber] = useState('502');
  const [busRegistration, setBusRegistration] = useState('DL 1PC 9824');
  const [dateTime, setDateTime] = useState('2025-09-22T10:30');
  const [stopLocation, setStopLocation] = useState('AIIMS Bus Stop, Ring Road');
  const [description, setDescription] = useState('');
  const [declarationAgreed, setDeclarationAgreed] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Track Complaint State
  const [trackTokenInput, setTrackTokenInput] = useState('DTC-2025-84920');
  const [trackedStatus, setTrackedStatus] = useState<string | null>('active');

  // Depot directory accordion
  const [openRegion, setOpenRegion] = useState<string>('south');

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!fullName.trim()) {
      setFormError('Please enter your full name (Complainant Full Name is required).');
      return;
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!description.trim()) {
      setFormError('Please provide details in the incident description narrative.');
      return;
    }
    if (!declarationAgreed) {
      setFormError('Please agree to the statutory declaration checkbox before submitting.');
      return;
    }

    const token = `DTC-2025-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedToken(token);
  };

  const handleResetForm = () => {
    setFullName('');
    setMobileNumber('');
    setCategory('bus_not_stopping');
    setRouteNumber('');
    setBusRegistration('');
    setDescription('');
    setDeclarationAgreed(false);
    setSubmittedToken(null);
    setFormError(null);
  };

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-[#0b0f17] text-[#171c23] dark:text-[#f1f5f9] py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10 transition-colors">
      {/* Top Banner with Official SLA Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbd0] dark:bg-[#ca4a1c]/25 text-[#842500] dark:text-[#ff9d7d] text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            Official Citizen Assistance & Redressal Desk
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171c23] dark:text-white tracking-tight">
            Contact DTC & Grievance Redressal
          </h1>
          <p className="text-xs text-[#59413a] dark:text-slate-400 mt-1 font-medium">
            दिल्ली परिवहन निगम नागरिक सहायता एवं शिकायत निवारण पोर्टल • Direct communication with Depot Supervisors, Central Telematics Command, and Women Safety Marshals.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-[#f0f4fd] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center min-w-[130px]">
            <span className="text-xl font-black text-[#006d42] dark:text-[#52e89f]">94.2%</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Resolution SLA</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#f0f4fd] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center min-w-[130px]">
            <span className="text-xl font-black text-[#a83301] dark:text-[#ff7849]">28.4 Hrs</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Avg Turnaround</p>
          </div>
        </div>
      </div>

      {/* Emergency & Direct Assistance Bento (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#ffdbd0] dark:bg-[#ca4a1c]/25 text-[#a83301] dark:text-[#ff7849] flex items-center justify-center font-bold mb-3">
              <span className="material-symbols-outlined">headset_mic</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">24x7 Commuter Toll-Free</span>
            <h3 className="font-extrabold text-[#171c23] dark:text-white text-lg mt-0.5">1800-11-8181</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              General inquiries, route timetables, and live GPS bus tracking support.
            </p>
          </div>
          <a
            href="tel:1800118181"
            className="mt-4 text-xs font-bold text-[#a83301] dark:text-[#ff7849] hover:underline flex items-center gap-1"
          >
            <span>Dial Toll-Free</span>
            <span className="material-symbols-outlined text-[14px]">call</span>
          </a>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-white dark:from-pink-950/40 dark:to-[#121a27] border border-pink-200 dark:border-pink-900/60 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center font-bold mb-3 shadow-md shadow-pink-600/20">
              <span className="material-symbols-outlined">shield</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-pink-700 dark:text-pink-400">Women & Commuter Safety</span>
            <h3 className="font-extrabold text-pink-950 dark:text-pink-200 text-lg mt-0.5">SOS 1091 / 112</h3>
            <p className="text-xs text-pink-800 dark:text-pink-300 mt-1">
              Immediate bus marshal dispatch & direct link to Delhi Police Transit Unit.
            </p>
          </div>
          <a
            href="tel:1091"
            className="mt-4 text-xs font-bold text-pink-700 dark:text-pink-400 hover:underline flex items-center gap-1"
          >
            <span>Trigger Safety SOS</span>
            <span className="material-symbols-outlined text-[14px]">emergency</span>
          </a>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#93f3ba] dark:bg-emerald-950/70 text-[#006d42] dark:text-[#52e89f] flex items-center justify-center font-bold mb-3">
              <span className="material-symbols-outlined">apartment</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Headquarters</span>
            <h3 className="font-extrabold text-[#171c23] dark:text-white text-base mt-0.5">Scindia House, CP</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Central Control Command, K.G. Marg, Connaught Place, New Delhi - 110001.
            </p>
          </div>
          <span className="mt-4 text-xs font-bold text-[#006d42] dark:text-[#52e89f] flex items-center gap-1">
            <span>Open 09:30 - 18:00</span>
            <span className="w-2 h-2 rounded-full bg-[#006d42] dark:bg-[#52e89f]"></span>
          </span>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/70 text-[#1a637c] dark:text-[#58c7f2] flex items-center justify-center font-bold mb-3">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Email Escalation</span>
            <h3 className="font-extrabold text-[#171c23] dark:text-white text-sm mt-0.5 break-all">
              grievance@dtc.delhi.gov.in
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Official citizen grievance desk with statutory tracking token.
            </p>
          </div>
          <a
            href="mailto:grievance@dtc.delhi.gov.in"
            className="mt-4 text-xs font-bold text-[#1a637c] dark:text-[#58c7f2] hover:underline flex items-center gap-1"
          >
            <span>Send Formal Email</span>
            <span className="material-symbols-outlined text-[14px]">send</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2-COLUMN MAIN BODY: FORM (7 cols) + TRACKER & DIRECTORY (5 cols)           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Full Lodge Grievance Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121a27] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-[#171c23] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a83301] dark:text-[#ff7849]">edit_note</span>
              Lodge a Citizen Grievance or Feedback
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Fill in the specifics below. Your complaint will be automatically routed to the corresponding depot manager and telematics log.
            </p>
          </div>

          {formError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{formError}</span>
            </div>
          )}

          {submittedToken ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#006d42] text-white flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-[36px]">check</span>
              </div>
              <h3 className="text-xl font-black text-[#006d42] dark:text-[#52e89f]">Grievance Formally Registered!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you for bringing this to our attention. Your official complaint reference token has been generated:
              </p>
              <div className="p-4 bg-white dark:bg-[#182334] rounded-xl border border-emerald-300 dark:border-emerald-700 font-mono text-xl font-black text-[#171c23] dark:text-white tracking-widest inline-block shadow-sm">
                {submittedToken}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                An SMS confirmation has been dispatched to +91 {mobileNumber}. You can monitor the resolution status anytime using the complaint tracker on the right.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-xl bg-[#006d42] text-white font-bold text-xs shadow hover:bg-[#007145] transition cursor-pointer"
                >
                  Submit Another Grievance
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitGrievance} noValidate className="space-y-4">
              {/* Row 1: Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Complainant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Mobile Number (10 Digits) *
                  </label>
                  <div className="flex">
                    <span className="h-11 px-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl flex items-center text-xs font-bold text-slate-600 dark:text-slate-300">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full h-11 px-3.5 rounded-r-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Grievance Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Grievance Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                >
                  <option value="bus_not_stopping">Bus did not stop at designated bus stand (स्टॉप पर बस न रोकना)</option>
                  <option value="rude_crew">Rude or inappropriate behavior of Driver / Conductor (चालक/परिचालक का अभद्र व्यवहार)</option>
                  <option value="overcrowding_rash">Rash driving or extreme overcrowding (लापरवाही से वाहन चलाना)</option>
                  <option value="ac_not_working">Air conditioning not functioning in AC bus (एसी बस में कूलिंग न होना)</option>
                  <option value="overcharging">Overcharging or ticket machine ETM dispute (किराया विवाद)</option>
                  <option value="delay_missing">Extreme schedule delay or route skipping (रूट छोड़ना या अत्यधिक देरी)</option>
                  <option value="accessibility">Wheelchair ramp not deployed / senior citizen issue (दिव्यांग सुविधा न मिलना)</option>
                </select>
              </div>

              {/* Row 3: Vehicle specifics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Route Number</label>
                  <input
                    type="text"
                    value={routeNumber}
                    onChange={(e) => setRouteNumber(e.target.value)}
                    placeholder="e.g. 502 or 419"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Bus Plate Reg. No.
                  </label>
                  <input
                    type="text"
                    value={busRegistration}
                    onChange={(e) => setBusRegistration(e.target.value)}
                    placeholder="e.g. DL 1PC 9824"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                  />
                </div>
              </div>

              {/* Row 4: Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Date & Approx Time</label>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Bus Stop / Landmark</label>
                  <input
                    type="text"
                    value={stopLocation}
                    onChange={(e) => setStopLocation(e.target.value)}
                    placeholder="e.g. AIIMS Metro Gate 2, Ring Road"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                  />
                </div>
              </div>

              {/* Row 5: Detailed Description */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Incident Description & Narrative *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide precise details of the incident. Note driver badge number or conductor name if observed..."
                  className="w-full p-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a83301]"
                ></textarea>
              </div>

              {/* Legal Declaration */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="declaration"
                  checked={declarationAgreed}
                  onChange={(e) => setDeclarationAgreed(e.target.checked)}
                  className="mt-0.5 accent-[#a83301] cursor-pointer"
                />
                <label htmlFor="declaration" className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight cursor-pointer">
                  I solemnly declare that the facts mentioned above are true to my knowledge and submitted for official grievance redressal under GNCTD Public Transport Citizen Charter.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition cursor-pointer"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#ca4a1c] text-white font-black text-xs hover:bg-[#a83301] shadow-md shadow-[#ca4a1c]/25 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Submit Grievance / शिकायत दर्ज करें</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column (5 cols): Complaint Tracker & Depot Directory */}
        <div className="lg:col-span-5 space-y-6">
          {/* Box 1: Track Existing Complaint */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#171c23] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006d42] dark:text-[#52e89f]">track_changes</span>
              Track Existing Complaint Status
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter your grievance reference token (e.g. DTC-2025-84920) to inspect telematics verification.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={trackTokenInput}
                onChange={(e) => setTrackTokenInput(e.target.value)}
                placeholder="DTC-2025-XXXXX"
                className="flex-1 h-10 px-3 rounded-xl bg-[#f8f9ff] dark:bg-[#182334] text-xs font-bold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006d42]"
              />
              <button
                type="button"
                onClick={() => setTrackedStatus('active')}
                className="px-4 py-2 rounded-xl bg-[#006d42] text-white text-xs font-bold hover:bg-[#007145] transition cursor-pointer"
              >
                Track
              </button>
            </div>

            {/* Stepper progress */}
            {trackedStatus && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Token: #{trackTokenInput}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold">
                    Under Investigation
                  </span>
                </div>

                <div className="relative pl-6 space-y-3.5 pt-1">
                  <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

                  <div className="relative flex items-start gap-2">
                    <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#006d42] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#171c23] dark:text-white">Complaint Registered & Dispatched</p>
                      <span className="text-[10px] text-slate-400">Sep 21, 04:15 PM</span>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-2">
                    <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#006d42] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#171c23] dark:text-white">Vehicle Telematics & GPS Analyzed</p>
                      <span className="text-[10px] text-slate-400">Sep 21, 07:30 PM • OTD Server</span>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-2">
                    <div className="absolute -left-6 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] animate-pulse">
                      ●
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300">In Progress: Inquiry with Depot Manager</p>
                      <span className="text-[10px] text-slate-400">Sarojini Nagar Depot No. 2</span>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-2 opacity-50">
                    <div className="absolute -left-6 w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Corrective Action & Closure Notice</p>
                      <span className="text-[10px] text-slate-400">Estimated resolution within 18 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Box 2: Depot Direct Phone Directory Accordion */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121a27] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#171c23] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a83301] dark:text-[#ff7849]">call</span>
              Depot Direct Phone Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct hotlines for Delhi Transport Corporation depot supervisors across zones.
            </p>

            <div className="space-y-2 pt-1">
              {[
                {
                  id: 'south',
                  name: 'Central & South Delhi Depots',
                  numbers: [
                    { name: 'Sarojini Nagar Depot', phone: '011-24673891' },
                    { name: 'Ambedkar Nagar Depot', phone: '011-26051120' },
                    { name: 'BBM Depot (Ring Road)', phone: '011-27461821' },
                  ],
                },
                {
                  id: 'north',
                  name: 'North & North-West Depots',
                  numbers: [
                    { name: 'Kashmere Gate ISBT Depot', phone: '011-23868844' },
                    { name: 'Rohini Sector 16 Depot', phone: '011-27891244' },
                    { name: 'Wazirpur Depot', phone: '011-27372201' },
                  ],
                },
                {
                  id: 'east',
                  name: 'East & Trans-Yamuna Depots',
                  numbers: [
                    { name: 'Anand Vihar ISBT Depot', phone: '011-22148811' },
                    { name: 'Hasanpur Terminal Depot', phone: '011-22378901' },
                    { name: 'Nand Nagri Depot', phone: '011-22581021' },
                  ],
                },
                {
                  id: 'west',
                  name: 'West & South-West Depots',
                  numbers: [
                    { name: 'Hari Nagar Depot', phone: '011-25124488' },
                    { name: 'Dwarka Sector 22 Depot', phone: '011-28051211' },
                    { name: 'Mayapuri Depot', phone: '011-28114422' },
                  ],
                },
              ].map((group) => {
                const isOpen = openRegion === group.id;
                return (
                  <div key={group.id} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenRegion(isOpen ? '' : group.id)}
                      className="w-full p-3 bg-slate-50 dark:bg-[#182334] hover:bg-slate-100 dark:hover:bg-[#1e2c40] flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-slate-200 transition cursor-pointer"
                    >
                      <span>{group.name}</span>
                      <span
                        className={`material-symbols-outlined text-[16px] text-slate-500 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-white dark:bg-[#121a27] space-y-2 text-xs border-t border-slate-100 dark:border-slate-800">
                        {group.numbers.map((num, i) => (
                          <div key={i} className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                            <span>{num.name}</span>
                            <a
                              href={`tel:${num.phone}`}
                              className="font-mono font-bold text-[#a83301] dark:text-[#ff7849] hover:underline"
                            >
                              {num.phone}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Box 3: Lost Baggage Guidance */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs">
              <span className="material-symbols-outlined text-[18px] text-amber-700 dark:text-amber-400">luggage</span>
              <span>Misplaced or Lost Baggage on DTC Bus?</span>
            </div>
            <p className="text-[11px] text-amber-900 dark:text-amber-300 leading-relaxed">
              Conductors and bus marshals submit all unclaimed articles to the destination terminal depot control room. Call <strong>1800-11-8181</strong> with your travel route and date to check custody registers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
