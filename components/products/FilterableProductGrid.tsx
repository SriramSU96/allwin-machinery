"use client";

import { useState, useMemo } from "react";
import { Product, Brand } from "@/types";
import { ProductCard } from "@/components/cards/ProductCard";
import { X, LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

type SortOption = "latest" | "price-asc" | "price-desc" | "name-asc";

interface FilterableProductGridProps {
  products: Product[];
  brands?: Brand[];
  emptyMessage?: string;
  /** Number of columns on desktop. Default 2 (xl:4). Pass 4 for category pages. */
  desktopCols?: 2 | 4;
}

export function FilterableProductGrid({
  products,
  brands,
  emptyMessage = "No products match your search.",
  desktopCols = 2,
}: FilterableProductGridProps) {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.name?.toLowerCase().includes(q) ||
          p.specs?.some((s) => s.value.toLowerCase().includes(q))
      );
    }
    if (selectedBrands.length > 0) {
      result = result.filter(
        (p) =>
          p.brand?.slug?.current &&
          selectedBrands.includes(p.brand.slug.current)
      );
    }
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return result;
  }, [products, search, selectedBrands, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSortBy("latest");
  };

  const hasFilters = search || selectedBrands.length > 0;

  const availableBrands = brands?.filter((b) =>
    products.some((p) => p.brand?.slug?.current === b.slug.current)
  );

  return (
    <div>
      {/* ✅ MOBILE FIXED: filter row — single row on all screen sizes
          Search fills available space, sort select is compact,
          view-toggle hidden on mobile (default grid is fine) */}
      <div className="flex flex-row items-center gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search machinery..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-brand-green bg-white"
          />
        </div>

        {/* Sort */}
        <label htmlFor="sortBy" className="sr-only">Sort products</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          aria-label="Sort products"
          className="flex-shrink-0 px-2.5 py-2 rounded-xl border border-gray-200 text-[12px] sm:text-sm focus:outline-none focus:border-brand-green bg-white text-gray-600"
        >
          <option value="latest">Latest</option>
          <option value="name-asc">A–Z</option>
          <option value="price-asc">Low–High</option>
          <option value="price-desc">High–Low</option>
        </select>

        {/* View toggle — desktop only */}
        <div className="hidden sm:flex gap-1 border border-gray-200 rounded-xl p-1 flex-shrink-0">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              viewMode === "grid"
                ? "bg-brand-green text-white"
                : "text-gray-400 hover:text-brand-green active:text-brand-green"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              viewMode === "list"
                ? "bg-brand-green text-white"
                : "text-gray-400 hover:text-brand-green active:text-brand-green"
            )}
            aria-label="List view"
          >
            <LayoutList size={15} />
          </button>
        </div>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex-shrink-0 flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 active:text-red-700"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {/* Brand filter chips — horizontal scroll row, mobile-friendly */}
      {availableBrands && availableBrands.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2 mb-4">
          <button
            onClick={() => setSelectedBrands([])}
            className={cn(
              "flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border transition-colors",
              selectedBrands.length === 0
                ? "bg-brand-green text-white border-brand-green"
                : "bg-white text-gray-600 border-gray-200 hover:border-brand-green active:border-brand-green"
            )}
          >
            All
          </button>
          {availableBrands.map((b) => {
            const active = selectedBrands.includes(b.slug.current);
            return (
              <button
                key={b._id}
                onClick={() =>
                  setSelectedBrands(
                    active
                      ? selectedBrands.filter((s) => s !== b.slug.current)
                      : [...selectedBrands, b.slug.current]
                  )
                }
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border transition-colors whitespace-nowrap",
                  active
                    ? "bg-brand-green text-white border-brand-green"
                    : "bg-white text-gray-600 border-gray-200 hover:border-brand-green active:border-brand-green"
                )}
              >
                {b.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Result count */}
      <p className="text-[12px] sm:text-sm text-gray-500 mb-4">
        Showing{" "}
        <span className="font-semibold text-brand-text">{filtered.length}</span>{" "}
        of {products.length} products
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
          <p className="text-3xl mb-3">🔍</p>
          {emptyMessage}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="btn mt-4 bg-brand-green text-white px-5 py-2.5 text-sm"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-3 sm:gap-6",
            desktopCols === 4
              ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-2 xl:grid-cols-4"
          )}
        >
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
