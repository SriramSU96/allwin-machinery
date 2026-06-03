import { Brand } from "@/types";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";

interface TrustedBrandsStripProps {
  brands: Brand[];
}

const FALLBACK_BRANDS = [
  "Honda", "Neptune", "Kirloskar", "Kama", "Husqvarna", "Balwaan",
  "Stihl", "Makita", "Briggs & Stratton", "Honda",
];

export function TrustedBrandsStrip({ brands }: TrustedBrandsStripProps) {
  const displayBrands = brands?.length > 0 ? brands : [];

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
            {/* Duplicate for seamless loop */}
            {[...FALLBACK_BRANDS, ...FALLBACK_BRANDS].map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-10 px-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-pointer"
              >
                <span className="font-heading font-black text-brand-text text-lg uppercase tracking-wide">
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
