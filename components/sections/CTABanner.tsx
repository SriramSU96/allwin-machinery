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

        {/* ✅ MOBILE FIXED: 3 buttons in one row, compact size on mobile */}
        <div className="btn-row-mobile sm:flex sm:flex-row sm:gap-3 flex-shrink-0 w-full sm:w-auto">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="btn bg-white text-brand-green hover:bg-brand-gold hover:text-white active:bg-brand-gold active:text-white flex items-center justify-center gap-1.5"
          >
            <Phone size={14} className="flex-shrink-0" />
            <span className="truncate sm:inline hidden">{SITE_CONFIG.phone}</span>
            <span className="sm:hidden">Call Us</span>
          </a>
          <a
            href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I want to inquire about your machinery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#0d7a3a] text-white flex items-center justify-center gap-1.5"
          >
            <MessageCircle size={14} className="flex-shrink-0" />
            <span>WhatsApp</span>
          </a>
          <Link
            href="/catalog"
            className="btn bg-brand-dark/50 text-white border border-white/20 hover:bg-brand-dark active:bg-brand-dark flex items-center justify-center gap-1.5"
          >
            <Download size={14} className="flex-shrink-0" />
            <span>Catalog</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
