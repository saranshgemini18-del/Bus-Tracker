import React from 'react';
import { useBusAlerts } from '../context/AlertContext';
import { Bell } from 'lucide-react';

interface ActiveAlertsIndicatorProps {
  onOpenModal: () => void;
  className?: string;
  variant?: 'compact' | 'sidebar' | 'pill';
  language?: 'en' | 'hi';
}

export const ActiveAlertsIndicator: React.FC<ActiveAlertsIndicatorProps> = ({
  onOpenModal,
  className = '',
  variant = 'compact',
  language = 'en',
}) => {
  const { alerts } = useBusAlerts();
  const activeCount = alerts.filter((a) => !a.triggered).length;

  if (variant === 'sidebar') {
    return (
      <button
        onClick={onOpenModal}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer ${className}`}
        title={language === 'hi' ? 'बस अलर्ट' : 'Arrival Alerts'}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined text-[20px] text-amber-500">
              notifications
            </span>
            {activeCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </div>
          <span className="truncate">
            {language === 'hi' ? 'आगमन अलर्ट' : 'Arrival Alerts'}
          </span>
        </div>
        {activeCount > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px]">
            {activeCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onOpenModal}
      className={`relative p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer flex items-center gap-1.5 ${className}`}
      title={language === 'hi' ? 'बस आगमन अलर्ट' : 'Bus Arrival Alerts'}
    >
      <Bell className={`w-4 h-4 text-amber-500 ${activeCount > 0 ? 'animate-bounce' : ''}`} />
      {activeCount > 0 && (
        <span className="px-1.5 py-0.2 rounded-full bg-[#ca4a1c] text-white font-black text-[10px]">
          {activeCount}
        </span>
      )}
    </button>
  );
};
