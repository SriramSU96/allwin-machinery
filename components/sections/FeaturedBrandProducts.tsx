"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { urlForImage } from "@/lib/sanity";
import type { Product } from "@/types";

interface FeaturedBrandProductsProps {
  products: Product[];
}

export function FeaturedBrandProducts({ products }: FeaturedBrandProductsProps) {
  const brandNames = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((product) => product.brand?.name)
            .filter((name): name is string => Boolean(name))
        )
      ).slice(0, 5),
    [products]
  );

  const [selectedBrand, setSelectedBrand] = useState<string>(brandNames[0] || "");
  const [visibleCount, setVisibleCount] = useState(5);

  const filteredProducts = useMemo(
    () =>
      selectedBrand
        ? products.filter((product) => product.brand?.name === selectedBrand)
        : products,
    [products, selectedBrand]
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = filteredProducts.length > visibleCount;

  return (
    <section className="bg-brand-light-gray py-14">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <SectionReveal className="mb-8">
          <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
            Featured Products By Brand
          </p>
        </SectionReveal>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {brandNames.map((brandName, i) => (
            <button
              key={brandName}
              type="button"
              onClick={() => {
                setSelectedBrand(brandName);
                setVisibleCount(5);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-heading font-semibold transition-colors ${
                selectedBrand === brandName
                  ? "bg-brand-green text-white"
                  : "bg-white text-brand-text hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {brandName} Products
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {visibleProducts.map((product, i) => (
            <SectionReveal key={product._id} delay={i * 0.06}>
              <Link
                href={`/products/${product.slug.current}`}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-soft hover:border-brand-green transition-all group"
              >
                <div className="relative h-24 w-full mb-3 overflow-hidden rounded-xl bg-gray-50">
                  {product.images?.[0] ? (
                    <Image
                      src={urlForImage(product.images[0], 360, 220)}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 20vw, 40vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-3xl text-gray-300">📦</div>
                  )}
                </div>
                <p className="text-[9px] text-[#8B6914] font-heading font-bold uppercase tracking-wide mb-1">
                  {product.brand?.name || "Brand"}
                </p>
                <h3 className="font-heading font-bold text-xs text-brand-text group-hover:text-brand-green transition-colors mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-[11px] font-semibold text-gray-600 mb-3">
                  {product.price ? `₹${product.price.toLocaleString()}` : "Contact for price"}
                </p>
                <span className="text-xs text-brand-green font-heading font-bold">
                  View Product →
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 5)}
              className="btn bg-brand-green text-white px-6 py-3 text-sm font-semibold hover:bg-brand-gold"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
