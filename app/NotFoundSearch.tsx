"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NotFoundSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-4">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, blogs, catalogs..."
          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green pr-24"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 btn bg-brand-green text-white px-4 py-2 text-xs"
        >
          Search
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Popular: Power Weeders · Water Pumps · Brush Cutters · Sprayers · Generators
      </p>
    </form>
  );
}
