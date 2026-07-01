"use client";

import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/cards/ProductCard";
import { SectionReveal } from "@/components/animations/SectionReveal";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!products?.length) return null;

  return (
    <section className="bg-brand-light-gray pt-[60px] pb-[30px] md:pt-[80px] md:pb-[40px] lg:pt-[120px] lg:pb-[60px]">
      <div className="max-w-container mx-auto px-4 md:px-6">
        {/* Header — ✅ MOBILE FIXED: heading shrinks, controls wrap to fit row */}
        <div className="flex flex-row items-start sm:items-end justify-between gap-3 mb-8 md:mb-10">
          <SectionReveal className="min-w-0 flex-1">
            <p className="font-heading font-bold text-[10px] sm:text-xs text-brand-green uppercase tracking-[2px] sm:tracking-[3px] mb-1.5 sm:mb-2">
              Featured Products
            </p>
            <h2 className="font-heading font-bold text-[19px] sm:text-[26px] md:text-[30px] lg:text-[40px] text-brand-text leading-tight">
              Our Best Machines
            </h2>
          </SectionReveal>
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Nav arrows */}
            <button
              onClick={scrollPrev}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-brand-green hover:bg-brand-green hover:text-white active:bg-brand-green active:text-white flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={scrollNext}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-brand-green hover:bg-brand-green hover:text-white active:bg-brand-green active:text-white flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
            <Link
              href="/products"
              className="btn border-2 border-brand-green text-brand-green px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-sm hover:bg-brand-green hover:text-white active:bg-brand-green active:text-white ml-1 sm:ml-2 whitespace-nowrap flex-shrink-0"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden py-3 -my-3">
          <div className="flex gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex-[0_0_calc(50%-8px)] min-w-0 sm:flex-[0_0_calc(33.333%-11px)] lg:flex-[0_0_calc(25%-12px)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
