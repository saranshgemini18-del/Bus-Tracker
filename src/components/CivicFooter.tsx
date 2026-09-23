import React from 'react';

interface CivicFooterProps {
  onOpenSOS?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const CivicFooter: React.FC<CivicFooterProps> = ({ onOpenSOS, onNavigateTab }) => {
  return (
    <footer className="w-full bg-[#ffffff] dark:bg-[#0f141c] border-t border-slate-200/80 dark:border-slate-800/80 shadow-[0_-1px_6px_rgba(30,35,42,0.03)] dark:shadow-[0_-1px_6px_rgba(0,0,0,0.3)] py-4 text-[#171c23] dark:text-[#f1f5f9] transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Official Attribution */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#171c23] dark:text-white">
            <span className="material-symbols-outlined text-[#a83301] dark:text-[#ff7849] text-[20px]">directions_bus</span>
            <span>Delhi Transport Corporation</span>
          </div>
          <span className="text-slate-400 dark:text-slate-600 font-semibold">•</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">Government of NCT of Delhi</span>
          <span className="hidden md:inline text-slate-400 dark:text-slate-600 font-semibold">•</span>
          <span className="hidden md:inline text-slate-600 dark:text-slate-400 font-semibold">
            24x7 Commuter Transit Helpline:{' '}
            <a href="tel:1800118181" className="text-[#a83301] dark:text-[#ff7849] hover:underline font-bold">
              1800-11-8181
            </a>
          </span>
        </div>

        {/* Right Civic Quick Links */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <button
            onClick={() => onNavigateTab && onNavigateTab('home')}
            className="hover:text-[#a83301] dark:hover:text-[#ff7849] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('about-us')}
            className="hover:text-[#a83301] dark:hover:text-[#ff7849] transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={onOpenSOS}
            className="text-rose-700 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">sos</span>
            Emergency SOS
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('fare-and-pass')}
            className="hover:text-[#a83301] dark:hover:text-[#ff7849] transition-colors cursor-pointer"
          >
            One Delhi Pass
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('fare-and-pass')}
            className="text-[#006d42] dark:text-[#93f3ba] hover:text-[#007145] font-bold transition-colors cursor-pointer"
          >
            Pink Ticket (Women Free)
          </button>
          <a
            href="https://otd.delhi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a83301] dark:hover:text-[#ff7849] transition-colors flex items-center gap-0.5"
          >
            GTFS Transit API
            <span className="material-symbols-outlined text-[14px]">north_east</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
