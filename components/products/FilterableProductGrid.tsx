"use client";

import { useState, useMemo } from "react";
import { Product, Brand } from "@/types";
import { ProductCard } from "@/components/cards/ProductCard";
import { Search, X, LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

type SortOption = "latest" | "price-asc" | "price-desc" | "name-asc";

interface FilterableProductGridProps {
  products: Product[];
  /** Pass available brands to show a brand filter (used on category pages).
   * Omit on brand pages, since brand is already fixed there. */
  brands?: Brand[];
  emptyMessage?: string;
}

export function FilterableProductGrid({
  products,
  brands,
  emptyMessage = "No products match your search.",
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
      result = result.filter((p) => p.brand?.slug?.current && selectedBrands.includes(p.brand.slug.current));
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

  const toggleBrand = (slug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedBrands([]);
    setSortBy("latest");
  };

  const hasFilters = search || selectedBrands.length > 0;

  // Only show brands that actually have products in this list
  const availableBrands = brands?.filter((b) =>
    products.some((p) => p.brand?.slug?.current === b.slug.current)
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search by name or spec..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {availableBrands && availableBrands.length > 0 && (
            <select
              value={selectedBrands[0] || ""}
              onChange={(e) => setSelectedBrands(e.target.value ? [e.target.value] : [])}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green bg-white text-gray-600"
            >
              <option value="">All Brands</option>
              {availableBrands.map((brand) => (
                <option key={brand._id} value={brand.slug.current}>
                  {brand.name}
                </option>
              ))}
            </select>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green bg-white text-gray-600"
          >
            <option value="latest">Sort: Latest</option>
            <option value="name-asc">Sort: Name A–Z</option>
            <option value="price-asc">Sort: Price Low–High</option>
            <option value="price-desc">Sort: Price High–Low</option>
          </select>

          <div className="hidden sm:flex gap-1 border border-gray-200 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-lg transition-colors", viewMode === "grid" ? "bg-brand-green text-white" : "text-gray-400 hover:text-brand-green")}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-lg transition-colors", viewMode === "list" ? "bg-brand-green text-white" : "text-gray-400 hover:text-brand-green")}
              aria-label="List view"
            >
              <LayoutList size={16} />
            </button>
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-brand-text">{filtered.length}</span> of {products.length} products
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
            "grid gap-6",
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" : "grid-cols-1"
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