"use client";

import { useState } from "react";
import {
  Settings, Wrench, Package, Headphones, Shield, Truck,
  X, MessageCircle, Phone, CheckCircle2, ArrowRight,
} from "lucide-react";
import { buildWhatsAppUrl, SITE_CONFIG } from "@/lib/utils";

const SERVICES = [
  {
    icon: Settings,
    title: "Machine Installation",
    description: "Professional installation and setup support with complete usage guidance for all machinery.",
    details: [
      "Free installation guidance for all products",
      "On-site visit available in Trichy & nearby areas",
      "Complete demo and user training provided",
      "Setup checklist provided with every machine",
      "Follow-up support for 30 days after installation",
    ],
    cta: "Book Installation",
    whatsappMsg: "Hi! I need machine installation support.",
  },
  {
    icon: Wrench,
    title: "Repair & Maintenance",
    description: "Regular servicing, inspection and repairs to keep your machines running at best performance.",
    details: [
      "All brand machinery serviced by trained technicians",
      "Regular oil change, filter clean, blade sharpening",
      "Doorstep pickup available in select areas",
      "Turnaround time: 2–5 working days",
      "100% genuine spare parts used in all repairs",
    ],
    cta: "Book Service",
    whatsappMsg: "Hi! I need repair and maintenance service for my machine.",
  },
  {
    icon: Package,
    title: "Spare Parts Supply",
    description: "Genuine spare parts and accessories available for all machines and models.",
    details: [
      "1000+ spare parts always in stock",
      "Honda, Neptune, Kirloskar, Kama parts available",
      "Order by phone, WhatsApp or showroom visit",
      "Pan India shipping — 3–5 days delivery",
      "100% genuine and original parts guaranteed",
    ],
    cta: "Order Parts",
    whatsappMsg: "Hi! I need spare parts for my machine. Can you help?",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Expert consultation and remote troubleshooting for all technical queries and issues.",
    details: [
      "Phone & WhatsApp support — Mon to Sat 9AM–6PM",
      "Remote troubleshooting via video call",
      "Expert technicians with 10+ years experience",
      "Free consultation for all existing customers",
      "On-site technical visit for complex issues",
    ],
    cta: "Get Support",
    whatsappMsg: "Hi! I need technical support for my machine.",
  },
  {
    icon: Shield,
    title: "Warranty Support",
    description: "Warranty assistance and claim processing to ensure peace of mind for our customers.",
    details: [
      "1 year warranty on all machines",
      "Claim process: Call → Visit → Replace / Repair",
      "Manufacturing defects fully covered",
      "Warranty card provided with every product",
      "No hidden charges for valid warranty claims",
    ],
    cta: "Claim Warranty",
    whatsappMsg: "Hi! I want to make a warranty claim for my machine.",
  },
  {
    icon: Truck,
    title: "Delivery Service",
    description: "Pan India delivery with safe packaging and fast logistics for on-time service.",
    details: [
      "Pan India delivery — all 28 states covered",
      "Delivery time: 5–7 working days",
      "Safe wooden crate packaging for heavy machines",
      "Insurance available for high-value products",
      "Real-time tracking number provided after dispatch",
    ],
    cta: "Track Order",
    whatsappMsg: "Hi! I want to know about delivery for my order.",
  },
];

export function ServicesGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? SERVICES[activeIndex] : null;

  return (
    <>
      {/* ── Cards grid — all equal height ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-brand-green hover:shadow-medium transition-all duration-200 group flex flex-col"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-brand-green/10 group-hover:bg-brand-green flex items-center justify-center mb-5 transition-colors flex-shrink-0">
              <service.icon
                size={22}
                className="text-brand-green group-hover:text-white transition-colors"
              />
            </div>

            {/* Text */}
            <h3 className="font-heading font-bold text-base text-brand-text mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed flex-1">
              {service.description}
            </p>

            {/* Learn More button */}
            <button
              onClick={() => setActiveIndex(i)}
              className="mt-5 flex items-center gap-1.5 font-heading font-bold text-sm text-brand-green hover:text-brand-gold transition-colors self-start"
            >
              Learn More
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* ── Modal overlay ── */}
      {active && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal box */}
          <div
            className="relative bg-white rounded-2xl shadow-large w-full max-w-md mx-auto z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Modal header ── */}
            <div className="bg-brand-green px-6 py-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <active.icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-lg leading-tight">
                    {active.title}
                  </h3>
                  <p className="text-white/70 text-xs mt-0.5">
                    Allwin Machinery Services
                  </p>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={() => setActiveIndex(null)}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-colors"
                aria-label="Close"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* ── Modal body ── */}
            <div className="px-6 py-5">
              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed mb-5 pb-5 border-b border-gray-100">
                {active.description}
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-6">
                {active.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-brand-text">
                    <CheckCircle2
                      size={16}
                      className="text-brand-green flex-shrink-0 mt-0.5"
                    />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="flex gap-3">
                <a
                  href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, active.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn flex-1 bg-brand-green text-white py-3 text-sm hover:bg-brand-gold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={15} />
                  {active.cta}
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="btn bg-brand-light-gray text-brand-text py-3 px-5 text-sm hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <Phone size={15} />
                  Call Us
                </a>
              </div>
            </div>

            {/* ── Navigation dots ── */}
            <div className="px-6 pb-5 flex items-center justify-center gap-2">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "bg-brand-green w-5"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Service ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}