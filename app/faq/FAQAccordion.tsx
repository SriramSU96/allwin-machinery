"use client";

import { useState, useMemo } from "react";
import { FAQ } from "@/types";
import { cn } from "@/lib/utils";
import { Plus, Minus, Search } from "lucide-react";

interface FAQAccordionProps {
  faqs: FAQ[];
  categories: string[];
}

// Fallback FAQ data for when Sanity is not yet populated
const FALLBACK_FAQS: FAQ[] = [
  { _id: "1", category: "Products", question: "Which power weeder is best for small farms?", answer: "For small farms, 5HP to 7HP power weeders are ideal. They are lightweight, easy to operate, fuel-efficient, and perfect for inter-cultivation, weeding, and soil preparation." },
  { _id: "2", category: "Products", question: "What is the difference between petrol and diesel power weeders?", answer: "Petrol weeders are lighter and easier to start, suitable for smaller farms. Diesel weeders offer more torque and fuel efficiency, ideal for larger farms with heavy-duty work." },
  { _id: "3", category: "Warranty", question: "Do your products come with warranty?", answer: "Yes, all our products come with manufacturer warranty. Typically 1 year on manufacturing defects. Warranty terms vary by brand and product category." },
  { _id: "4", category: "Warranty", question: "What is covered under the warranty?", answer: "Manufacturing defects in materials and workmanship are covered. Wear and tear, misuse, accidental damage, and consumable parts are generally not covered." },
  { _id: "5", category: "Delivery", question: "Do you deliver products all over India?", answer: "Yes, we offer Pan India delivery. Orders are typically dispatched within 2-3 business days and delivered within 5-7 working days depending on your location." },
  { _id: "6", category: "Delivery", question: "How long does delivery take?", answer: "Standard delivery takes 5-7 working days. Express delivery is available in select cities. You will receive tracking details once your order is dispatched." },
  { _id: "7", category: "Spare Parts", question: "Are spare parts available for all machines?", answer: "Yes, we stock genuine spare parts for all machines we sell. Parts can be ordered online or purchased from our showroom. Most common parts are available in stock." },
  { _id: "8", category: "Technical Support", question: "Do you provide installation support?", answer: "Yes, we provide installation guidance for all products. For complex machinery, our technicians can visit your farm for setup and initial training." },
  { _id: "9", category: "Payments", question: "What payment methods do you accept?", answer: "We accept all major payment methods including bank transfer, UPI, credit/debit cards, and cash on delivery for select locations. EMI options are available." },
  { _id: "10", category: "Payments", question: "Do you offer EMI options?", answer: "Yes, EMI options are available through major banks and NBFCs. 0% EMI is available on select products. Contact us for current EMI offers." },
];

export function FAQAccordion({ faqs, categories }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const data = faqs?.length ? faqs : FALLBACK_FAQS;

  const grouped = useMemo(() => {
    let filtered = data;

    if (activeCategory !== "All Categories") {
      filtered = filtered.filter((f) => f.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
    }

    // Group by category
    const groups: Record<string, FAQ[]> = {};
    filtered.forEach((f) => {
      if (!groups[f.category]) groups[f.category] = [];
      groups[f.category].push(f);
    });
    return groups;
  }, [data, activeCategory, search]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search your questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-heading font-semibold transition-colors",
              activeCategory === cat
                ? "bg-brand-green text-white"
                : "bg-brand-light-gray text-brand-text hover:bg-gray-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion groups */}
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">🔍</p>
          <p>No questions found. Try a different search term.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h3 className="font-heading font-bold text-base text-brand-text mb-4 flex items-center gap-2">
              <span className="text-brand-green">📂</span>
              {category}
            </h3>
            <div className="space-y-2">
              {items.map((faq) => (
                <div
                  key={faq._id}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-brand-light-gray transition-colors"
                    aria-expanded={openId === faq._id}
                  >
                    <span className="font-heading font-semibold text-sm text-brand-text pr-4">
                      {faq.question}
                    </span>
                    {openId === faq._id ? (
                      <Minus size={16} className="text-brand-green flex-shrink-0" />
                    ) : (
                      <Plus size={16} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openId === faq._id && (
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
