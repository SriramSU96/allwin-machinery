"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  gridClassName?: string;
}

/**
 * Desktop: all answers visible (open by default) — no accordion, just a clean grid.
 * Mobile (<768px): accordion — only one answer visible at a time.
 * This matches the PDF requirement: "Open all the faq in desktop page".
 */
export function FaqAccordion({
  faqs,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4",
}: FaqAccordionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className={gridClassName}>
      {faqs.map((faq, i) => {
        // Desktop: always open. Mobile: accordion (one at a time).
        const isOpen = isMobile ? openIndex === i : true;
        return (
          <SectionReveal key={i} delay={i * 0.06}>
            <div className="border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-brand-green transition-colors">
              <button
                type="button"
                onClick={() => {
                  if (isMobile) setOpenIndex(isOpen ? null : i);
                }}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-2 text-left cursor-default md:cursor-default"
              >
                <h3 className="font-heading font-bold text-[13px] sm:text-sm text-brand-text flex items-start gap-2 flex-1">
                  <CheckCircle2 size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                {/* Chevron only on mobile */}
                <ChevronDown
                  size={16}
                  className={`md:hidden text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {/* Answer — always visible on desktop, toggled on mobile */}
              <div
                className={`pl-5 sm:pl-6 overflow-hidden transition-all duration-300 ${
                  isMobile
                    ? isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                    : "max-h-96 opacity-100 mt-2"
                }`}
              >
                <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </SectionReveal>
        );
      })}
    </div>
  );
}
