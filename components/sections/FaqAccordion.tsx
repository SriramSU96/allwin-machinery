"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  /** Tailwind grid-cols classes for the wrapper grid (default: 1 col mobile, 2 col desktop) */
  gridClassName?: string;
  /** Index of the FAQ open by default. Pass -1 for none open. Default: 0 (first one open). */
  defaultOpenIndex?: number;
}

/**
 * Accordion-style FAQ list. Only one answer is visible at a time —
 * tapping a question toggles it open/closed and closes any other
 * open item. Replaces the old layout where every answer was always
 * expanded, which made FAQ sections very long on mobile.
 */
export function FaqAccordion({
  faqs,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4",
  defaultOpenIndex = 0,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex >= 0 ? defaultOpenIndex : null
  );

  return (
    <div className={gridClassName}>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <SectionReveal key={i} delay={i * 0.06}>
            <div
              className="faq-item border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-brand-green transition-colors"
              data-open={isOpen}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-start justify-between gap-2 text-left"
              >
                <h3 className="font-heading font-bold text-[13px] sm:text-sm text-brand-text flex items-start gap-2 flex-1">
                  <CheckCircle2 size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <ChevronDown
                  size={16}
                  className="faq-chevron text-gray-400 flex-shrink-0 mt-0.5"
                />
              </button>
              <div className="faq-answer pl-5 sm:pl-6">
                <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </SectionReveal>
        );
      })}
    </div>
  );
}
