import Link from "next/link";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle, Download } from "lucide-react";

export function CTABanner() {
  return (
    <section className="bg-brand-green py-16 px-4">
      <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl text-white mb-2">
            Ready to Power Your Farm?
          </h2>
          <p className="text-white/70 text-sm">
            Contact us for quotes, demos, or technical guidance. We&apos;re here to help.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="btn bg-white text-brand-green px-6 py-3 text-sm hover:bg-brand-gold hover:text-white flex items-center gap-2"
          >
            <Phone size={16} />
            {SITE_CONFIG.phone}
          </a>
          <a
            href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I want to inquire about your machinery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#0d7a3a] text-white px-6 py-3 text-sm flex items-center gap-2"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
          <Link
            href="/catalog"
            className="btn bg-brand-dark/50 text-white border border-white/20 px-6 py-3 text-sm hover:bg-brand-dark flex items-center gap-2"
          >
            <Download size={16} />
            Download Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
