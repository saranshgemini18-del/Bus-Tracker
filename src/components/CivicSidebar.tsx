import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { PWAInstallButton } from './PWAInstallButton';
import { useBusAlerts } from '../context/AlertContext';

interface CivicSidebarProps {
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
  onOpenSOS?: () => void;
  onOpenAlerts?: () => void;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
  isCollapsedDesktop?: boolean;
  onToggleCollapseDesktop?: () => void;
}

export const CivicSidebar: React.FC<CivicSidebarProps> = ({
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
  onOpenSOS,
  onOpenAlerts,
  isOpenMobile,
  onToggleMobile,
  isCollapsedDesktop = false,
  onToggleCollapseDesktop,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const { alerts } = useBusAlerts();
  const activeAlertsCount = alerts.filter((a) => !a.triggered).length;

  const handleToggleCollapse = () => {
    if (onToggleCollapseDesktop) {
      onToggleCollapseDesktop();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue);
      onNavigate('live-map');
    }
  };

  const navItems = [
    {
      path: 'home',
      en: 'Home',
      hi: 'मुख्य पृष्ठ',
      icon: 'home',
      desc: 'Overview & Services',
    },
    {
      path: 'live-map',
      en: 'Live Map',
      hi: 'लाइव मैप',
      icon: 'map',
      desc: 'Real-Time Bus GPS',
      badge: `${busesCount.toLocaleString()}`,
    },
    {
      path: 'nearby-bus-stops',
      en: 'Nearby Bus Stops',
      hi: 'पास के बस स्टॉप',
      icon: 'near_me',
      desc: 'Stands & Terminals',
    },
    {
      path: 'fare-and-pass',
      en: 'Fare & Pass',
      hi: 'किराया व पास',
      icon: 'confirmation_number',
      desc: 'e-Pass & Tickets',
    },
    {
      path: 'about-us',
      en: 'About Us',
      hi: 'हमारे बारे में',
      icon: 'corporate_fare',
      desc: 'DTC Heritage & Fleet',
    },
    {
      path: 'help-and-support',
      en: 'Help & Support',
      hi: 'सहायता',
      icon: 'support_agent',
      desc: 'Helplines & FAQs',
    },
    {
      path: 'contact-us-and-grievance',
      en: 'Contact Us',
      hi: 'संपर्क व शिकायत',
      icon: 'contact_support',
      desc: 'Depots & Grievances',
    },
  ];

  return (
    <>
      {/* Mobile Top App Bar with hamburger trigger */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 dark:bg-[#0f141c]/95 backdrop-blur-md z-40 border-b border-slate-200/80 dark:border-slate-800/80 px-4 flex items-center justify-between shadow-xs transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobile}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer transition"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isOpenMobile ? 'close' : 'menu'}
            </span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a83301] to-[#ca4a1c] flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[18px]">directions_bus</span>
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white block leading-tight">
                DTC Live
              </span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block -mt-0.5">
                Delhi Transit
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Quick Action Buttons & Top-Right Theme Toggle */}
        <div className="flex items-center gap-1.5">
          {onOpenRouteFinder && (
            <button
              onClick={onOpenRouteFinder}
              className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center cursor-pointer"
              title="Bus Stand Route Finder"
            >
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
            </button>
          )}

          {onOpenFavorites && (
            <button
              onClick={onOpenFavorites}
              className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center cursor-pointer"
              title="Favorite Routes"
            >
              <span className="material-symbols-outlined text-[18px]">hotel_class</span>
            </button>
          )}

          <button
            onClick={onLanguageToggle}
            className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            {language === 'en' ? 'HI' : 'EN'}
          </button>

          {/* Top-Right Dark Mode Toggle for Mobile View */}
          <ThemeToggle size="sm" />
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onToggleMobile}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        />
      )}

      {/* Primary Sidebar (Fixed Left Navigation) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white dark:bg-[#0f141c] border-r border-slate-200/90 dark:border-slate-800/90 shadow-[4px_0_24px_rgba(30,35,42,0.06)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-300 ${
          /* Mobile handling */
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          /* Desktop width handling */
          isCollapsedDesktop ? 'lg:w-20' : 'lg:w-72'
        } w-72`}
      >
        {/* Brand Header */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 shrink-0">
          <button
            onClick={() => {
              onNavigate('home');
              if (isOpenMobile) onToggleMobile();
            }}
            className="flex items-center gap-3 cursor-pointer group text-left min-w-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#a83301] to-[#ca4a1c] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <span className="material-symbols-outlined text-[24px]">directions_bus</span>
            </div>
            {!isCollapsedDesktop && (
              <div className="min-w-0">
                <span className="text-base font-black tracking-tight text-slate-900 dark:text-white block leading-tight truncate">
                  DTC Delhi
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block truncate">
                  Delhi Transport Corp.
                </span>
              </div>
            )}
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={handleToggleCollapse}
            className="hidden lg:flex w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white items-center justify-center transition cursor-pointer"
            title={isCollapsedDesktop ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCollapsedDesktop ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onToggleMobile}
            className="lg:hidden w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Global Route Search in Sidebar */}
        {!isCollapsedDesktop && (
          <div className="p-3 border-b border-slate-100 dark:border-slate-800/60 shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 dark:text-slate-500 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search route (e.g. 502, 729)..."
                className="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ca4a1c] focus:bg-white dark:focus:bg-slate-800"
              />
            </form>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
            {!isCollapsedDesktop ? (language === 'hi' ? 'नेविगेशन' : 'Menu') : '•••'}
          </div>

          {navItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  if (isOpenMobile) onToggleMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ca4a1c] text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={language === 'hi' ? item.hi : item.en}
              >
                <span
                  className={`material-symbols-outlined text-[20px] shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.icon}
                </span>

                {!isCollapsedDesktop && (
                  <div className="flex-1 text-left min-w-0 flex items-center justify-between">
                    <div>
                      <div className="truncate font-black">
                        {language === 'hi' ? item.hi : item.en}
                      </div>
                      <div
                        className={`text-[10px] font-medium truncate ${
                          isActive ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {item.desc}
                      </div>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}

          {/* Quick Utility Tools Section */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-2 space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
              {!isCollapsedDesktop ? (language === 'hi' ? 'त्वरित साधन' : 'Commuter Tools') : '•••'}
            </div>

            {onOpenRouteFinder && (
              <button
                onClick={() => {
                  onOpenRouteFinder();
                  if (isOpenMobile) onToggleMobile();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition cursor-pointer"
                title="Bus Stand Route Finder"
              >
                <span className="material-symbols-outlined text-[20px] text-emerald-700 dark:text-emerald-400 shrink-0">
                  alt_route
                </span>
                {!isCollapsedDesktop && (
                  <span className="truncate">
                    {language === 'hi' ? 'स्टैंड खोजें' : 'Stand Route Finder'}
                  </span>
                )}
              </button>
            )}

            {onOpenFavorites && (
              <button
                onClick={() => {
                  onOpenFavorites();
                  if (isOpenMobile) onToggleMobile();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-bold text-amber-800 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition cursor-pointer"
                title="Favorite Commuter Routes"
              >
                <span className="material-symbols-outlined text-[20px] text-amber-600 dark:text-amber-400 shrink-0">
                  hotel_class
                </span>
                {!isCollapsedDesktop && (
                  <span className="truncate">
                    {language === 'hi' ? 'पसंदीदा रूट्स' : 'Saved Favorites'}
                  </span>
                )}
              </button>
            )}

            {onOpenAlerts && (
              <button
                onClick={() => {
                  onOpenAlerts();
                  if (isOpenMobile) onToggleMobile();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition cursor-pointer"
                title={language === 'hi' ? 'आगमन अलर्ट' : 'Bus Arrival Alerts'}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <span className="material-symbols-outlined text-[20px] text-amber-500">
                      notifications
                    </span>
                    {activeAlertsCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                    )}
                  </div>
                  {!isCollapsedDesktop && (
                    <span className="truncate">
                      {language === 'hi' ? 'आगमन अलर्ट' : 'Arrival Alerts'}
                    </span>
                  )}
                </div>
                {!isCollapsedDesktop && activeAlertsCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px]">
                    {activeAlertsCount}
                  </span>
                )}
              </button>
            )}

            {onOpenSOS && (
              <button
                onClick={() => {
                  onOpenSOS();
                  if (isOpenMobile) onToggleMobile();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-black text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                title="Emergency SOS"
              >
                <span className="material-symbols-outlined text-[20px] text-rose-600 dark:text-rose-400 shrink-0">
                  sos
                </span>
                {!isCollapsedDesktop && (
                  <span className="truncate">Emergency SOS (112)</span>
                )}
              </button>
            )}

            {/* PWA Mobile & Desktop Install Button */}
            <div className="pt-1">
              {!isCollapsedDesktop ? (
                <PWAInstallButton variant="sidebar" language={language} />
              ) : null}
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Font scale, Language & System Status */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/90 shrink-0">
          {!isCollapsedDesktop ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-1.5">
                {/* Font Scaling */}
                <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => onFontScaleChange(Math.max(0.9, fontScale - 0.05))}
                    className="px-2 py-0.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="Smaller Text"
                  >
                    A-
                  </button>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <button
                    onClick={() => onFontScaleChange(Math.min(1.25, fontScale + 0.05))}
                    className="px-2 py-0.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="Larger Text"
                  >
                    A+
                  </button>
                </div>

                {/* Language Switch */}
                <button
                  onClick={onLanguageToggle}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  <span className={language === 'en' ? 'text-[#ca4a1c] font-black' : 'text-slate-500 dark:text-slate-400'}>
                    EN
                  </span>
                  <span className="text-slate-300 dark:text-slate-600 mx-1">|</span>
                  <span className={language === 'hi' ? 'text-[#ca4a1c] font-black' : 'text-slate-500 dark:text-slate-400'}>
                    हिंदी
                  </span>
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate">Delhi Open Transit GTFS Telemetry</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ThemeToggle size="sm" />
              <button
                onClick={onLanguageToggle}
                className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 text-[11px] font-black text-[#ca4a1c] border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer"
                title="Toggle Language"
              >
                {language === 'en' ? 'HI' : 'EN'}
              </button>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Telemetry Live" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
