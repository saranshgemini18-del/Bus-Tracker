import React, { useState, useEffect } from 'react';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DTCBus } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute: (routeId: string) => void;
  buses: DTCBus[];
}

const STORAGE_KEY = 'dtc_favorite_routes';

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  onSelectRoute,
  buses,
}) => {
  const [favoriteRoutes, setFavoriteRoutes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['502', '419', '729', 'OMS (+)'];
  });

  const [addInput, setAddInput] = useState('');

  const saveFavorites = (list: string[]) => {
    setFavoriteRoutes(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = addInput.trim().toUpperCase();
    if (!clean) return;
    if (!favoriteRoutes.includes(clean)) {
      const updated = [...favoriteRoutes, clean];
      saveFavorites(updated);
    }
    setAddInput('');
  };

  const handleRemove = (routeId: string) => {
    const updated = favoriteRoutes.filter((r) => r !== routeId);
    saveFavorites(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">hotel_class</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Saved Routes / पसंदीदा रूट</h2>
              <p className="text-xs text-slate-500 font-medium">Quick 1-tap live map tracking for your regular commutes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Add route form */}
        <form onSubmit={handleAdd} className="py-4 flex gap-2">
          <input
            type="text"
            value={addInput}
            onChange={(e) => setAddInput(e.target.value)}
            placeholder="Add route (e.g. 505, 427, 260)..."
            className="flex-1 h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
          <button
            type="submit"
            className="px-4 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add
          </button>
        </form>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2 min-h-[140px] pr-1">
          {favoriteRoutes.length > 0 ? (
            favoriteRoutes.map((routeId) => {
              const activeCount = buses.filter((b) => b.routeId.toLowerCase() === routeId.toLowerCase()).length;
              const known = DTC_KNOWN_ROUTES[routeId] || Object.values(DTC_KNOWN_ROUTES).find((r) => r.routeId.toLowerCase() === routeId.toLowerCase());

              return (
                <div
                  key={routeId}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:bg-slate-100/80 transition"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#ca4a1c] bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                        Route {routeId}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {activeCount} live
                      </span>
                    </div>
                    {known && (
                      <p className="text-[11px] text-slate-500 truncate mt-1">
                        {known.startPoint} ↔ {known.lastPoint}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onSelectRoute(routeId);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#ca4a1c] hover:bg-[#a83301] text-white text-xs font-bold cursor-pointer shadow-xs"
                    >
                      Track
                    </button>
                    <button
                      onClick={() => handleRemove(routeId)}
                      className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 cursor-pointer transition"
                      title="Remove from favorites"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              No saved routes yet. Add your daily routes above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
