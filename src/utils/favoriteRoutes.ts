import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'dtc_favorite_routes';
const FAVORITES_EVENT = 'dtc_favorites_updated';

// Popular default routes in Delhi for new users
export const DEFAULT_FAVORITE_ROUTES = ['502', '840', '73', '522', '100'];

/**
 * Retrieves the list of favorite route IDs from localStorage
 */
export function getFavoriteRoutes(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      // Initialize with defaults if first visit
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(DEFAULT_FAVORITE_ROUTES));
      return DEFAULT_FAVORITE_ROUTES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((r) => String(r).trim().toUpperCase()).filter(Boolean);
    }
    return DEFAULT_FAVORITE_ROUTES;
  } catch {
    return DEFAULT_FAVORITE_ROUTES;
  }
}

/**
 * Checks if a route is currently in favorites
 */
export function isFavoriteRoute(routeId: string): boolean {
  if (!routeId) return false;
  const clean = routeId.trim().toUpperCase();
  const list = getFavoriteRoutes();
  return list.includes(clean);
}

/**
 * Adds a route to favorites and broadcasts an update event
 */
export function addFavoriteRoute(routeId: string): boolean {
  if (!routeId) return false;
  const clean = routeId.trim().toUpperCase();
  const current = getFavoriteRoutes();
  if (current.includes(clean)) return false;

  const updated = [clean, ...current];
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: { favorites: updated } }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes a route from favorites and broadcasts an update event
 */
export function removeFavoriteRoute(routeId: string): boolean {
  if (!routeId) return false;
  const clean = routeId.trim().toUpperCase();
  const current = getFavoriteRoutes();
  const updated = current.filter((r) => r !== clean);
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: { favorites: updated } }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Toggles a route's favorite status
 */
export function toggleFavoriteRoute(routeId: string): boolean {
  if (isFavoriteRoute(routeId)) {
    removeFavoriteRoute(routeId);
    return false;
  } else {
    addFavoriteRoute(routeId);
    return true;
  }
}

/**
 * React Hook for reactive favorite routes state
 */
export function useFavoriteRoutes() {
  const [favorites, setFavorites] = useState<string[]>(() => getFavoriteRoutes());

  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(getFavoriteRoutes());
    };

    window.addEventListener(FAVORITES_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(FAVORITES_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const add = useCallback((routeId: string) => addFavoriteRoute(routeId), []);
  const remove = useCallback((routeId: string) => removeFavoriteRoute(routeId), []);
  const toggle = useCallback((routeId: string) => toggleFavoriteRoute(routeId), []);
  const check = useCallback((routeId: string) => isFavoriteRoute(routeId), []);

  return {
    favorites,
    addFavorite: add,
    removeFavorite: remove,
    toggleFavorite: toggle,
    isFavorite: check,
  };
}
