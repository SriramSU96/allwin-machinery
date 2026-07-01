import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { SectionReveal } from "@/components/animations/SectionReveal";
import type { Category } from "@/types";

interface CategoriesGridProps {
  categories: Category[];
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <section className="bg-brand-white py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-4 md:px-6">
        {/* Header — ✅ MOBILE FIXED: heading + button stay on one row, heading shrinks */}
        <div className="header-action-row md:flex-row md:items-end mb-8 md:mb-10">
          <SectionReveal className="min-w-0 flex-1">
            <p className="font-heading font-bold text-[10px] sm:text-xs text-brand-green uppercase tracking-[2px] sm:tracking-[3px] mb-1.5 sm:mb-2">
              Shop By Category
            </p>
            <h2 className="font-heading font-bold text-[19px] sm:text-[26px] md:text-[30px] lg:text-[40px] text-brand-text leading-tight">
              Browse Our Product Categories
            </h2>
          </SectionReveal>
          <Link
            href="/products"
            className="btn-compact btn border-2 border-brand-green text-brand-green px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-sm hover:bg-brand-green hover:text-white active:bg-brand-green active:text-white flex-shrink-0 whitespace-nowrap"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, index) => (
            <SectionReveal key={cat._id} delay={index * 0.05}>
              <Link
                href={`/categories/${cat.slug.current}`}
                className="group hover-lift relative block bg-white rounded-xl border border-gray-200 hover:border-brand-green active:border-brand-green hover:shadow-medium transition-all duration-200 hover:-translate-y-1 text-center overflow-hidden aspect-square"
              >
                {/* Background Image */}
                <Image
                  src={
                    cat.image
                      ? urlForImage(cat.image, 640, 640)
                      : "/placeholder-category.png"
                  }
                  alt={cat.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300 p-3 pb-9"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 12.5vw"
                />

                {/* Overlay — ✅ MOBILE FIXED: always visible on touch devices since
                    hover never fires there; only fades in on hover for mouse users */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content — ✅ MOBILE FIXED: always in resting position on touch,
                    slides up on hover for mouse users only */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
                  <p className="font-heading font-bold text-xs sm:text-sm text-white leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-300 mt-0.5">
                    {cat.productCount ? `${cat.productCount}+ Products` : "Browse products"}
                  </p>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}