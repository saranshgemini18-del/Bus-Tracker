import React, { useState } from 'react';
import { DTCBus } from '../types';

interface CivicHeaderProps {
  activePath: string;
  onNavigate: (path: string) => void;
  busesCount: number;
  onSearch?: (query: string) => void;
  fontScale: number;
  onFontScaleChange: (scale: number) => void;
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
  onOpenRouteFinder?: () => void;
  onOpenFavorites?: () => void;
}

export const CivicHeader: React.FC<CivicHeaderProps> = ({
  activePath,
  onNavigate,
  busesCount,
  onSearch,
  fontScale,
  onFontScaleChange,
  language,
  onLanguageToggle,
  onOpenRouteFinder,
  onOpenFavorites,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const navItems = [
    { path: 'home', en: 'Home', hi: 'मुख्य पृष्ठ' },
    { path: 'live-map', en: 'Live Map', hi: 'लाइव मैप' },
    { path: 'nearby-bus-stops', en: 'Nearby Bus Stops', hi: 'पास के बस स्टॉप' },
    { path: 'fare-and-pass', en: 'Fare & Pass', hi: 'किराया व पास' },
    { path: 'about-us', en: 'About Us', hi: 'हमारे बारे में' },
    { path: 'help-and-support', en: 'Help & Support', hi: 'सहायता' },
    { path: 'contact-us-and-grievance', en: 'Contact Us & Grievance', hi: 'संपर्क व शिकायत' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(30,35,42,0.06)] border-b border-slate-200/70">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Section */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            {/* SVG Logo from PRD */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a83301] to-[#ca4a1c] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-7 h-7">
                <rect x="5" y="5" width="30" height="30" rx="8" fill="#a83301" />
                <path
                  d="M12 14C12 12.3431 13.3431 11 15 11H25C26.6569 11 28 12.3431 28 14V26C28 27.6569 26.6569 29 25 29H15C13.3431 29 12 27.6569 12 26V14Z"
                  fill="white"
                />
                <rect x="14" y="14" width="12" height="6" rx="2" fill="#a83301" />
                <circle cx="16" cy="24" r="1.5" fill="#a83301" />
                <circle cx="24" cy="24" r="1.5" fill="#a83301" />
                <circle cx="15" cy="28" r="1.5" fill="white" />
                <circle cx="25" cy="28" r="1.5" fill="white" />
                <path d="M28 9L32 6" stroke="#006d42" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[20px] tracking-tight text-[#171c23]">DTC Live</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#a83301] text-white font-extrabold tracking-wider uppercase">
                  Transit
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#a83301] tracking-wide">
                दिल्ली बस ट्रैकर
              </span>
            </div>
          </button>

          <div className="h-8 w-px bg-slate-200 hidden 2xl:block"></div>

          {/* Active GPS Telematics Pill */}
          <div className="hidden 2xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#93f3ba]/50 text-[#006d42] border border-[#006d42]/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006d42] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006d42]"></span>
            </span>
            <span className="text-[12px] font-bold text-[#007145]">
              GPS Live: {busesCount > 0 ? `${busesCount.toLocaleString()} Active DTC Buses` : '6,420 Active DTC Buses'}
            </span>
          </div>
        </div>

        {/* Global Search Bar (with ⌘K indicator) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden xl:flex flex-1 max-w-sm mx-2"
        >
          <div className="relative w-full flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#59413a] pointer-events-none text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search route 502, 419, ISBT or bus stop..."
              className="w-full h-11 pl-10 pr-14 rounded-xl bg-[#f0f4fd] text-[#171c23] placeholder:text-[#59413a]/60 text-[14px] focus:outline-none focus:bg-[#ffffff] focus:ring-2 focus:ring-[#a83301] shadow-[0_1px_4px_rgba(30,35,42,0.04)] transition-all"
            />
            <div className="absolute right-2.5 flex items-center pointer-events-none">
              <kbd className="px-1.5 py-0.5 rounded bg-[#dee2ec] text-[11px] font-bold text-[#59413a]">
                ⌘K
              </kbd>
            </div>
          </div>
        </form>

        {/* Civic Navigation Menu Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`px-3 py-1.5 rounded-xl text-[13px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#ca4a1c] text-white shadow-sm'
                    : 'text-[#59413a] hover:bg-[#e4e8f2] hover:text-[#171c23]'
                }`}
              >
                {language === 'hi' ? item.hi : item.en}
              </button>
            );
          })}

          {/* Quick Route Finder by Stands */}
          {onOpenRouteFinder && (
            <button
              type="button"
              onClick={onOpenRouteFinder}
              className="px-2.5 py-1.5 rounded-xl text-[12px] font-extrabold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ml-1 shadow-xs"
              title="Search buses connecting two bus stands"
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-700">alt_route</span>
              <span>{language === 'hi' ? 'स्टैंड खोजें' : 'Stand Finder'}</span>
            </button>
          )}

          {/* Favorites Button */}
          {onOpenFavorites && (
            <button
              type="button"
              onClick={onOpenFavorites}
              className="px-2.5 py-1.5 rounded-xl text-[12px] font-extrabold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs"
              title="Saved favorite routes"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-600">hotel_class</span>
              <span>{language === 'hi' ? 'पसंदीदा' : 'Favorites'}</span>
            </button>
          )}
        </nav>

        {/* Accessibility Tools: Font Scaler, Language Switcher, Profile */}
        <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
          {/* Font Scaler */}
          <div className="hidden sm:flex items-center bg-[#f0f4fd] rounded-xl p-0.5 border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => onFontScaleChange(Math.max(0.9, fontScale - 0.05))}
              className="px-2 py-1 rounded-lg text-[12px] font-bold text-[#59413a] hover:bg-[#e4e8f2] hover:text-[#171c23] transition-colors"
              title="Smaller text"
            >
              A-
            </button>
            <div className="w-px h-3 bg-slate-300"></div>
            <button
              type="button"
              onClick={() => onFontScaleChange(Math.min(1.25, fontScale + 0.05))}
              className="px-2 py-1 rounded-lg text-[12px] font-bold text-[#59413a] hover:bg-[#e4e8f2] hover:text-[#171c23] transition-colors"
              title="Larger text"
            >
              A+
            </button>
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onLanguageToggle}
            className="px-2.5 py-1.5 rounded-xl bg-[#f0f4fd] text-[#171c23] text-[12px] font-bold hover:bg-[#e4e8f2] transition-colors flex items-center gap-1 border border-slate-200 cursor-pointer shrink-0"
          >
            <span className={language === 'en' ? 'text-[#a83301] font-black' : 'text-slate-600'}>EN</span>
            <span className="text-slate-300">|</span>
            <span className={language === 'hi' ? 'text-[#a83301] font-black' : 'text-slate-600'}>हिंदी</span>
          </button>

          {/* Profile Emblem */}
          <div className="w-8 h-8 rounded-full bg-[#a83301] flex items-center justify-center text-white shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Strip (below lg screens: 1024px) */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200 gap-1.5 no-scrollbar">
        {navItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`px-3 py-1 rounded-full text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                isActive ? 'bg-[#ca4a1c] text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {language === 'hi' ? item.hi : item.en}
            </button>
          );
        })}

        {/* Mobile Stand Finder */}
        {onOpenRouteFinder && (
          <button
            type="button"
            onClick={onOpenRouteFinder}
            className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 transition-all shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">alt_route</span>
            <span>{language === 'hi' ? 'स्टैंड खोजें' : 'Stand Finder'}</span>
          </button>
        )}

        {/* Mobile Favorites */}
        {onOpenFavorites && (
          <button
            type="button"
            onClick={onOpenFavorites}
            className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 transition-all shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">hotel_class</span>
            <span>{language === 'hi' ? 'पसंदीदा' : 'Favorites'}</span>
          </button>
        )}
      </div>
    </header>
  );
};
