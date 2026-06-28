"use client";

import { useState, useMemo } from "react";
import { Product, Category, Brand } from "@/types";
import { ProductCard } from "@/components/cards/ProductCard";
import { SlidersHorizontal, X, LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchWithDropdown } from "@/components/ui/SearchWithDropdown";

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

  const searchSuggestions = useMemo(() => {
    if (!search.trim()) return [];
    const seen = new Set<string>();
    const results: { label: string; sublabel?: string }[] = [];
    const q = search.toLowerCase();
    for (const p of initialProducts) {
      if (p.name.toLowerCase().includes(q) && !seen.has(p.name)) {
        seen.add(p.name);
        results.push({ label: p.name, sublabel: p.brand?.name });
      }
    }
    return results.slice(0, 8);
  }, [search, initialProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          p.brand?.name?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category?.slug?.current === selectedCategory);
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand?.slug?.current));
    }

    // Sort
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
  }, [initialProducts, search, selectedCategory, selectedBrands, sortBy]);

  const toggleBrand = (slug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedBrands([]);
    setSortBy("latest");
  };

  const hasFilters = search || selectedCategory || selectedBrands.length > 0;

  return (
    <section className="py-10 px-4 md:px-6 max-w-container mx-auto">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm hover:border-brand-green transition-colors md:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-brand-text">{filteredProducts.length}</span> of{" "}
            {initialProducts.length} products
          </p>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Search with live suggestions */}
          <SearchWithDropdown
            value={search}
            onChange={setSearch}
            suggestions={searchSuggestions}
            placeholder="Search machinery..."
            className="w-64"
          />

          {/* Sort */}
          <label htmlFor="sortBy" className="sr-only">Sort products</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green bg-white text-gray-600"
          >
            <option value="latest">Sort: Latest</option>
            <option value="name-asc">Sort: Name A–Z</option>
            <option value="price-asc">Sort: Price Low–High</option>
            <option value="price-desc">Sort: Price High–Low</option>
          </select>

          {/* View toggle */}
          <div className="hidden md:flex gap-1 border border-gray-200 rounded-xl p-1">
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
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters — desktop always visible, mobile drawer */}
        <aside className={cn(
          "w-60 flex-shrink-0 space-y-6",
          "hidden md:block",
          sidebarOpen && "block fixed inset-y-0 left-0 z-50 bg-white shadow-large p-6 w-72 overflow-y-auto md:relative md:shadow-none md:p-0 md:w-60"
        )}>
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden absolute top-4 right-4"
            >
              <X size={20} />
            </button>
          )}

          {/* Categories */}
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-text mb-3 flex items-center justify-between">
              Categories
              {selectedCategory && (
                <button onClick={() => setSelectedCategory(null)} className="text-xs text-brand-green">
                  Clear
                </button>
              )}
            </h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat.slug.current ? null : cat.slug.current
                      )
                    }
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left",
                      selectedCategory === cat.slug.current
                        ? "bg-brand-green text-white"
                        : "hover:bg-brand-light-gray text-brand-text"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className={cn(
                      "text-xs",
                      selectedCategory === cat.slug.current ? "text-white/70" : "text-gray-400"
                    )}>
                      {cat.productCount || 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-text mb-3 flex items-center justify-between">
              Brands
              {selectedBrands.length > 0 && (
                <button onClick={() => setSelectedBrands([])} className="text-xs text-brand-green">
                  Clear
                </button>
              )}
            </h3>
            <ul className="space-y-1">
              {brands.slice(0, 8).map((brand) => (
                <li key={brand._id}>
                  <label className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-brand-light-gray cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.slug.current)}
                      onChange={() => toggleBrand(brand.slug.current)}
                      className="w-4 h-4 rounded accent-brand-green"
                    />
                    <span className="text-sm text-brand-text">{brand.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {brand.productCount || 0}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply on mobile */}
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
              <h3 className="font-heading font-bold text-lg text-brand-text mb-2">
                No products found
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={clearFilters}
                className="btn bg-brand-green text-white px-6 py-2.5 text-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-4",
                viewMode === "grid"
                  ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              )}
            >
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
