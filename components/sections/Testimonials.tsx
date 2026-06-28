"use client";

import { Testimonial } from "@/types";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: "1",
    name: "Ramesh Kumar",
    role: "Farmer",
    location: "Coimbatore, Tamil Nadu",
    message:
      "I bought a Power Weeder from all and it has transformed my farming completely. The quality is excellent and their support team is always available.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Suresh Patel",
    role: "Agricultural Contractor",
    location: "Salem, Tamil Nadu",
    message:
      "Best machinery dealer in the region. The Motor Pump I bought has been running for 3 years without any issues. Highly recommend Allwin to all farmers.",
    rating: 5,
  },
  {
    _id: "3",
    name: "Murugan S.",
    role: "Paddy Farmer",
    location: "Trichy, Tamil Nadu",
    message:
      "Very genuine products and fair pricing. The after-sales service is what makes Allwin stand out. They respond quickly to any technical queries.",
    rating: 5,
  },
  {
    _id: "4",
    name: "Karunakaran V.",
    role: "Small Scale Farmer",
    location: "Madurai, Tamil Nadu",
    message:
      "The Brush Cutter I bought is incredibly powerful and durable. Allwin's team helped me choose the right machine for my farm size.",
    rating: 4,
  },
];

export function Testimonials({ testimonials }: TestimonialsProps) {
  const data = testimonials?.length ? testimonials : FALLBACK_TESTIMONIALS;
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-brand-white py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionReveal>
            <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-2">
              Customer Testimonials
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[30px] lg:text-[40px] text-brand-text">
              What Our Farmers Say
            </h2>
          </SectionReveal>
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-xl bg-brand-light-gray hover:bg-brand-green hover:text-white flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-xl bg-brand-light-gray hover:bg-brand-green hover:text-white flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5">
            {data.map((t) => (
              <div
                key={t._id}
                className="flex-[0_0_calc(100%-0px)] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)] min-w-0"
              >
                <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col gap-4 hover:shadow-medium transition-shadow">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < t.rating ? "text-brand-gold fill-brand-gold" : "text-gray-300"}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-brand-text/80 text-sm leading-relaxed flex-1">
                    &ldquo;{t.message}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center font-heading font-black text-brand-green text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-brand-text">{t.name}</p>
                      <p className="text-xs text-gray-600">
                        {t.role} · {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
