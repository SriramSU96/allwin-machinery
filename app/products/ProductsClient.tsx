"use client";

import { useState, useMemo } from "react";
import { Product, Category, Brand } from "@/types";
import { ProductCard } from "@/components/cards/ProductCard";
import { SlidersHorizontal, X, LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
  brands: Brand[];
}

type SortOption = "latest" | "price-asc" | "price-desc" | "name-asc";

export function ProductsClient({ initialProducts, categories, brands }: ProductsClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          p.brand?.name?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category?.slug?.current === selectedCategory);
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand?.slug?.current));
    }
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case "price-desc": result.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [initialProducts, search, selectedCategory, selectedBrands, sortBy]);

  const toggleBrand = (slug: string) =>
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]
    );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedBrands([]);
    setSortBy("latest");
  };

  const hasFilters = search || selectedCategory || selectedBrands.length > 0;

  return (
    <section className="py-6 sm:py-10 px-4 md:px-6 max-w-container mx-auto">

      {/* ── Top bar — ✅ MOBILE FIXED: single row with compact controls ── */}
      <div className="flex flex-row items-center gap-2 mb-4">
        {/* Filter toggle (mobile only) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-[12px] font-semibold hover:border-brand-green active:border-brand-green transition-colors md:hidden"
          aria-label="Open filters"
        >
          <SlidersHorizontal size={14} />
          Filters
          {hasFilters && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[9px] text-white font-bold">
              {(selectedCategory ? 1 : 0) + selectedBrands.length}
            </span>
          )}
        </button>

        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search machinery..."
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-[12px] sm:text-sm focus:outline-none focus:border-brand-green bg-white"
          />
        </div>

        {/* Sort */}
        <label htmlFor="sortBy" className="sr-only">Sort products</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          aria-label="Sort products"
          className="flex-shrink-0 px-2 py-2 rounded-xl border border-gray-200 text-[11px] sm:text-sm focus:outline-none focus:border-brand-green bg-white text-gray-600"
        >
          <option value="latest">Latest</option>
          <option value="name-asc">A–Z</option>
          <option value="price-asc">Low–High</option>
          <option value="price-desc">High–Low</option>
        </select>

        {/* View toggle — desktop only */}
        <div className="hidden md:flex gap-1 border border-gray-200 rounded-xl p-1 flex-shrink-0">
          <button onClick={() => setViewMode("grid")} className={cn("p-1.5 rounded-lg transition-colors", viewMode === "grid" ? "bg-brand-green text-white" : "text-gray-400 hover:text-brand-green")} aria-label="Grid view"><LayoutGrid size={15} /></button>
          <button onClick={() => setViewMode("list")} className={cn("p-1.5 rounded-lg transition-colors", viewMode === "list" ? "bg-brand-green text-white" : "text-gray-400 hover:text-brand-green")} aria-label="List view"><LayoutList size={15} /></button>
        </div>

        {hasFilters && (
          <button onClick={clearFilters} className="flex-shrink-0 flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 active:text-red-700"><X size={11} /> Clear</button>
        )}
      </div>

      {/* Result count */}
      <p className="text-[11px] sm:text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-brand-text">{filteredProducts.length}</span> of {initialProducts.length} products
      </p>

      <div className="flex gap-8">
        {/* ── Sidebar — desktop always visible, mobile: overlay drawer ── */}

        {/* ✅ MOBILE FIXED: tap-outside overlay closes the filter drawer */}
        {sidebarOpen && (
          <div
            className="filter-overlay md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside className={cn(
          "flex-shrink-0 space-y-6 transition-transform duration-300",
          "md:block md:static md:w-60 md:translate-x-0 md:shadow-none md:bg-transparent md:p-0 md:z-auto md:overflow-visible",
          sidebarOpen
            ? "block fixed inset-y-0 left-0 z-50 bg-white shadow-large p-5 w-72 overflow-y-auto translate-x-0"
            : "hidden md:block"
        )}>

          {/* Close button (mobile) */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <span className="font-heading font-bold text-sm">Filters</span>
            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 active:bg-gray-100" aria-label="Close filters">
              <X size={18} />
            </button>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-heading font-bold text-sm text-brand-text mb-3 flex items-center justify-between">
              Categories
              {selectedCategory && (
                <button onClick={() => setSelectedCategory(null)} className="text-xs text-brand-green">Clear</button>
              )}
            </h2>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === cat.slug.current ? null : cat.slug.current)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left",
                      selectedCategory === cat.slug.current
                        ? "bg-brand-green text-white"
                        : "hover:bg-brand-light-gray active:bg-brand-light-gray text-brand-text"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className={cn("text-xs", selectedCategory === cat.slug.current ? "text-white/70" : "text-gray-400")}>
                      {cat.productCount || 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h2 className="font-heading font-bold text-sm text-brand-text mb-3 flex items-center justify-between">
              Brands
              {selectedBrands.length > 0 && (
                <button onClick={() => setSelectedBrands([])} className="text-xs text-brand-green">Clear</button>
              )}
            </h2>
            <ul className="space-y-1">
              {brands.slice(0, 8).map((brand) => (
                <li key={brand._id}>
                  <label className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-brand-light-gray active:bg-brand-light-gray cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.slug.current)}
                      onChange={() => toggleBrand(brand.slug.current)}
                      className="w-4 h-4 rounded accent-brand-green"
                    />
                    <span className="text-sm text-brand-text">{brand.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">{brand.productCount || 0}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply — mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn w-full bg-brand-green text-white py-3 text-sm md:hidden"
          >
            Apply Filters
          </button>
        </aside>

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-heading font-bold text-lg text-brand-text mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="btn bg-brand-green text-white px-6 py-2.5 text-sm">Clear Filters</button>
            </div>
          ) : (
            <div className={cn("grid gap-3 sm:gap-4", viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
