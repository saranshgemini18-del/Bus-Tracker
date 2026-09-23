import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 text-white px-4 py-2.5 text-xs font-semibold shadow-2xl border border-slate-700/80 backdrop-blur-md animate-in slide-in-from-bottom duration-200"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="font-bold text-amber-300">Offline Mode:</span> Using cached Delhi transit routes and schedules.
      </div>
    </div>
  );
};
