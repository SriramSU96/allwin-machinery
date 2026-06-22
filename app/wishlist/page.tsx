"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { sanityClient } from "@/lib/sanity";
import { PRODUCTS_BY_IDS_QUERY } from "@/lib/queries";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { ProductCard } from "@/components/cards/ProductCard";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { ids, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);

    sanityClient
      .fetch<Product[]>(PRODUCTS_BY_IDS_QUERY, { ids })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        console.error("Failed to load wishlist products:", err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ids]);

  return (
    <>
      <div className="bg-brand-light-gray border-b border-gray-200 px-4 py-10 md:py-14">
        <div className="max-w-container mx-auto text-center">
          <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
            Saved Items
          </p>
          <h1 className="font-heading font-black text-2xl md:text-4xl text-brand-text flex items-center justify-center gap-3">
            <Heart size={28} className="text-red-500" fill="currentColor" />
            Your Wishlist
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {ids.length > 0
              ? `${ids.length} product${ids.length === 1 ? "" : "s"} saved`
              : "Save products you're interested in to compare later"}
          </p>
        </div>
      </div>

      <section className="max-w-container mx-auto px-4 md:px-6 py-12">
        {ids.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="font-heading font-bold text-lg text-brand-text mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/products"
              className="btn bg-brand-green text-white px-6 py-3 text-sm inline-block hover:bg-brand-gold"
            >
              Browse Products →
            </Link>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: ids.length }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-xl bg-brand-light-gray animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm mb-4">
              Couldn&apos;t load your saved products right now. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn border-2 border-brand-green text-brand-green px-5 py-2.5 text-sm hover:bg-brand-green hover:text-white"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => ids.forEach((id) => toggleWishlist(id))}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {products.length < ids.length && (
              <p className="text-center text-xs text-gray-400 mt-8">
                Some saved items are no longer available and have been hidden.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}