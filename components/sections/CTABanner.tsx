import Link from "next/link";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle, Download } from "lucide-react";

export function CTABanner() {
  return (
    <section className="bg-brand-green py-10 sm:py-16 px-4">
      <div className="max-w-container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8">
        <div className="flex-1 min-w-0">
          <h2 className="font-heading font-black text-[20px] sm:text-2xl md:text-3xl text-white mb-1.5 sm:mb-2 leading-tight">
            Ready to Power Your Farm?
          </h2>
          <p className="text-white/70 text-[12px] sm:text-sm">
            Contact us for quotes, demos, or technical guidance. We&apos;re here to help.
          </p>
        </div>

        {/* Desktop: full text, proper spacing. Mobile: compact 3 buttons in one row */}
        <div className="hidden sm:flex sm:flex-row sm:gap-3 sm:flex-shrink-0">
          {/* Desktop buttons — full text, no truncation */}
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="btn bg-white text-brand-green hover:bg-brand-gold hover:text-white flex items-center gap-2 px-5 py-3 whitespace-nowrap"
          >
            <Phone size={15} className="flex-shrink-0" />
            {SITE_CONFIG.phone}
          </a>
          <a
            href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I want to inquire about your machinery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#0d7a3a] text-white flex items-center gap-2 px-5 py-3 whitespace-nowrap"
          >
            <MessageCircle size={15} className="flex-shrink-0" />
            WhatsApp Us
          </a>
          <Link
            href="/catalog"
            className="btn bg-brand-dark/50 text-white border border-white/20 hover:bg-brand-dark flex items-center gap-2 px-5 py-3 whitespace-nowrap"
          >
            <Download size={15} className="flex-shrink-0" />
            Download Catalog
          </Link>
        </div>

        {/* Mobile: 3 compact buttons in one row — PDF: "remove Catalog btn on mobile" → keep only Call + WhatsApp */}
        <div className="sm:hidden btn-row-mobile w-full">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="btn bg-white text-brand-green flex items-center justify-center gap-1.5 active:bg-brand-gold active:text-white"
          >
            <Phone size={14} className="flex-shrink-0" />
            Call Us
          </a>
          <a
            href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I want to inquire about your machinery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#0d7a3a] text-white flex items-center justify-center gap-1.5"
          >
            <MessageCircle size={14} className="flex-shrink-0" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
