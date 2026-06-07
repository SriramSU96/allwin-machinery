import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { SectionReveal } from "@/components/animations/SectionReveal";
import type { Category } from "@/types";

interface CategoriesGridProps {
  categories: Category[];
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <section className="bg-brand-white py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionReveal>
            <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-2">
              Shop By Category
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[30px] lg:text-[40px] text-brand-text">
              Browse Our Product Categories
            </h2>
          </SectionReveal>
          <Link
            href="/products"
            className="btn border-2 border-brand-green text-brand-green px-5 py-2.5 text-sm hover:bg-brand-green hover:text-white self-start md:self-end flex-shrink-0"
          >
            View All Categories →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, index) => (
            <SectionReveal key={cat._id} delay={index * 0.05}>
              <Link
                href={`/categories/${cat.slug.current}`}
                className="group relative block bg-white rounded-xl border border-gray-200 hover:border-brand-green hover:shadow-medium transition-all duration-200 hover:-translate-y-1 text-center overflow-hidden aspect-square"
              >
                {/* Background Image */}
                <Image
                  src={
                    cat.image
                      ? urlFor(cat.image).width(640).height(640).format("webp").url()
                      : "/placeholder-category.png"
                  }
                  alt={cat.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300 p-3 pb-9"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 12.5vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
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
