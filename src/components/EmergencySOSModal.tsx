import React from 'react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-rose-200 relative animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-3 text-rose-600 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-[30px] text-rose-600">emergency</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-rose-950">DTC Emergency SOS Assistance</h2>
            <p className="text-xs text-rose-700 font-semibold">आपातकालीन सहायता • Delhi Police & Bus Marshals</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-5">
          If you are facing an emergency, safety concern, or need urgent transit police assistance, tap any direct emergency hotline below.
        </p>

        {/* Hotlines */}
        <div className="space-y-2.5">
          <a
            href="tel:112"
            className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-between transition shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">local_police</span>
              <div>
                <strong className="block text-sm">Call 112 • All-India Emergency Police</strong>
                <span className="text-[11px] text-rose-150 opacity-90">Instant PCR vehicle dispatch</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px]">call</span>
          </a>

          <a
            href="tel:1091"
            className="p-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-between transition shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">shield</span>
              <div>
                <strong className="block text-sm">Call 1091 • Women Safety Helpline</strong>
                <span className="text-[11px] text-pink-150 opacity-90">Special Delhi Police Women Transit Cell</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px]">call</span>
          </a>

          <a
            href="tel:1800118181"
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-black text-white flex items-center justify-between transition shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">headset_mic</span>
              <div>
                <strong className="block text-sm">Call 1800-11-8181 • Central DTC Command</strong>
                <span className="text-[11px] text-slate-300">24x7 Scindia House Operations Room</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px]">call</span>
          </a>

          <a
            href="https://wa.me/918750871493?text=EMERGENCY%20ALERT:%20I%20need%20assistance%20on%20DTC%20Bus."
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-between transition shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">chat</span>
              <div>
                <strong className="block text-sm">WhatsApp Bus Marshal SOS: +91-8750871493</strong>
                <span className="text-[11px] text-emerald-150 opacity-90">Send live location to bus marshal squad</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          </a>
        </div>

        {/* Current Location Note */}
        <div className="mt-5 p-3 rounded-xl bg-slate-100 text-slate-700 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a83301] text-[18px]">location_on</span>
            <span>Current Anchor: AIIMS Ring Road (28.5685° N, 77.2090° E)</span>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
