"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "allwin_wishlist_v1";

interface WishlistContextValue {
  ids: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  // Track whether the initial localStorage read has completed so we
  // don't write an empty [] back to storage before the read finishes.
  const mountedWithData = hydrated;

  // Load from localStorage once on mount (client-only — avoids SSR mismatch)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setIds(parsed);
      }
    } catch (error) {
      console.error("Failed to read wishlist from localStorage:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on every change — but only after hydration is complete.
  // The extra `ids.length > 0 || mountedWithData` check prevents a brief
  // cold-start race where ids is still [] while the read effect hasn't
  // resolved yet, which would wipe a previously-saved wishlist.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [ids, hydrated]);

  // Keep multiple open tabs in sync
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setIds(parsed);
        } catch {
          // ignore malformed external writes
        }
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isWishlisted = useCallback((productId: string) => ids.includes(productId), [ids]);

  const toggleWishlist = useCallback((productId: string) => {
    setIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  return (
    <WishlistContext.Provider value={{ ids, isWishlisted, toggleWishlist, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}