import React, { useState, useMemo } from 'react';
import { DTCBus } from '../types';
import { useFavoriteRoutes } from '../utils/favoriteRoutes';
import { DTC_KNOWN_ROUTES } from '../data/dtcRoutes';
import { DELHI_ROUTE_REGISTRY } from '../data/delhiRouteRegistry';
import { normalizeRouteId } from '../utils/routeResolver';

interface FavoriteRoutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  buses: DTCBus[];
  onSelectRoute: (routeId: string) => void;
  onSelectBus?: (bus: DTCBus) => void;
}

export const FavoriteRoutesModal: React.FC<FavoriteRoutesModalProps> = ({
  isOpen,
  onClose,
  buses,
  onSelectRoute,
}) => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteRoutes();
  const [newRouteInput, setNewRouteInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Group active buses by normalized route for live counts
  const busesByRoute = useMemo(() => {
    const map = new Map<string, DTCBus[]>();
    for (const b of buses) {
      const norm = normalizeRouteId(b.routeId).toUpperCase();
      if (!map.has(norm)) map.set(norm, []);
      map.get(norm)!.push(b);
    }
    return map;
  }, [buses]);

  // Suggested popular Delhi routes for quick addition
  const suggestedRoutes = useMemo(() => {
    const popular = ['502', '840', '73', '522', '100', '740', '971', '419', '85', '623'];
    return popular.filter((r) => !favorites.includes(r)).slice(0, 5);
  }, [favorites]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizeRouteId(newRouteInput).toUpperCase();
    if (!clean) {
      setErrorMsg('Please enter a valid route number (e.g. 502)');
      return;
    }
    if (favorites.includes(clean)) {
      setErrorMsg(`Route ${clean} is already in your favorites!`);
      return;
    }
    addFavorite(clean);
    setNewRouteInput('');
    setErrorMsg(null);
  };

  const handleTrackRoute = (routeId: string) => {
    onSelectRoute(routeId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#a83301] to-[#ca4a1c] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner">
              <span className="material-symbols-outlined text-[24px]">hotel_class</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">Favorite Bus Routes</h3>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-extrabold">
                  {favorites.length} Saved
                </span>
              </div>
              <p className="text-xs text-white/80 font-medium">
                पसंदीदा रूट • One-tap tracking on live map
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick Add Route Input */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0">
          <form onSubmit={handleAddSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                directions_bus
              </span>
              <input
                type="text"
                value={newRouteInput}
                onChange={(e) => {
                  setNewRouteInput(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Add route number (e.g. 502, 840, 73)..."
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#a83301] focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-4 h-10 rounded-xl bg-[#a83301] hover:bg-[#8c2a01] text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add</span>
            </button>
          </form>
          {errorMsg && (
            <p className="mt-1.5 text-xs text-rose-600 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {errorMsg}
            </p>
          )}

          {/* Quick Suggestion Pills */}
          {suggestedRoutes.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-slate-500 shrink-0">Suggested:</span>
              {suggestedRoutes.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => addFavorite(r)}
                  className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 hover:border-[#a83301] hover:bg-amber-50 text-[11px] font-bold text-slate-700 transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Route {r}</span>
                  <span className="text-amber-500 font-bold">+</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Saved Favorites List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {favorites.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                <span className="material-symbols-outlined text-[32px]">hotel_class</span>
              </div>
              <h4 className="text-sm font-bold text-slate-700">No favorite routes saved yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Add your daily commute routes above or tap the star icon ⭐ while viewing any bus to save it here.
              </p>
            </div>
          ) : (
            favorites.map((routeId) => {
              const norm = normalizeRouteId(routeId).toUpperCase();
              const activeRouteBuses = busesByRoute.get(norm) || [];
              const known = DTC_KNOWN_ROUTES[norm] || DTC_KNOWN_ROUTES[routeId];
              const reg = DELHI_ROUTE_REGISTRY[norm] || DELHI_ROUTE_REGISTRY[routeId];

              const origin = known?.startPoint || reg?.startPoint || 'Delhi City Transit';
              const terminus = known?.lastPoint || reg?.lastPoint || 'Central Terminal';
              const description = known?.description || reg?.description || `Delhi Bus Route ${routeId}`;
              const evCount = activeRouteBuses.filter((b) => b.type === 'ev').length;

              return (
                <div
                  key={routeId}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a83301] to-[#ca4a1c] text-white flex flex-col items-center justify-center font-black shadow-sm shrink-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">Route</span>
                      <span className="text-[15px] font-black leading-none">{routeId}</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">
                          {origin} ➔ {terminus}
                        </span>
                        {evCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[11px]">bolt</span>
                            {evCount} EV
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{description}</p>

                      <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="font-bold text-emerald-700">
                            {activeRouteBuses.length > 0
                              ? `${activeRouteBuses.length} Live Buses Active`
                              : 'Telemetry Standby'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handleTrackRoute(routeId)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#006d42] hover:bg-[#005232] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">navigation</span>
                      <span>Track Live</span>
                    </button>
                    <button
                      onClick={() => removeFavorite(routeId)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Remove from favorites"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Synced with your browser storage</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
