import { Brand } from "@/types";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";

interface TrustedBrandsStripProps {
  brands: Brand[];
}

// Only used if Sanity has zero brands configured yet — keeps the section
// from looking empty during initial setup. Once real brands exist in
// Sanity, this is never shown.
const FALLBACK_BRAND_NAMES = [
  "Honda", "Neptune", "Kirloskar", "Kama", "Husqvarna", "Balwaan",
  "Stihl", "Makita", "Briggs & Stratton",
];

export function TrustedBrandsStrip({ brands }: TrustedBrandsStripProps) {
  const hasRealBrands = brands?.length > 0;
  // Duplicate the list so the marquee scrolls seamlessly in a loop
  const displayBrands = hasRealBrands ? [...brands, ...brands] : null;

  return (
    <section className="bg-brand-white border-y border-gray-200 py-8 overflow-hidden">
      <div className="max-w-container mx-auto px-4 mb-5">
        <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px]">
          Trusted Brands We Deal In
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-brand-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-white to-transparent z-10 pointer-events-none" />

        <div className="flex">
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
            {displayBrands
              ? displayBrands.map((brand, i) => (
                  <div
                    key={`${brand._id}-${i}`}
                    className="flex items-center justify-center h-10 px-4 transition-all cursor-pointer"
                  >
                    {brand.logo ? (
                      <div className="relative h-10 w-28 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
                        <Image
                          src={urlForImage(brand.logo, 160, 80)}
                          alt={brand.name}
                          fill
                          className="object-contain"
                          sizes="160px"
                        />
                      </div>
                    ) : (
                      <span className="font-heading font-black text-brand-dark text-lg uppercase tracking-wide opacity-70 hover:opacity-100 transition-opacity">
                        {brand.name}
                      </span>
                    )}
                  </div>
                ))
              : [...FALLBACK_BRAND_NAMES, ...FALLBACK_BRAND_NAMES].map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center h-10 px-4 cursor-pointer"
                  >
                    <span className="font-heading font-black text-brand-dark text-lg uppercase tracking-wide opacity-70 hover:opacity-100 transition-opacity">
                      {name}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}