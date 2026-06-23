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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionReveal>
            <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-2">
              Featured Products
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[30px] lg:text-[40px] text-brand-text">
              Our Best Machines
            </h2>
          </SectionReveal>
          <div className="flex items-center gap-3">
            {/* Nav arrows */}
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-brand-green hover:bg-brand-green hover:text-white flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-brand-green hover:bg-brand-green hover:text-white flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
            <Link
              href="/products"
              className="btn border-2 border-brand-green text-brand-green px-5 py-2.5 text-sm hover:bg-brand-green hover:text-white ml-2"
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
