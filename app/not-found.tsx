import Link from "next/link";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";
import { NotFoundSearch } from "./NotFoundSearch";

const POPULAR_LINKS = [
  { icon: "⚙️", label: "Power Weeders", desc: "High performance power weeders", href: "/categories/power-weeders" },
  { icon: "💧", label: "Sprayers", desc: "Manual, Battery & Power Sprayers", href: "/categories/power-sprayers" },
  { icon: "🔧", label: "Water Pumps", desc: "Reliable pumps for every need", href: "/categories/water-pumps" },
  { icon: "📚", label: "Catalogs", desc: "Download our latest product catalogs", href: "/catalog" },
  { icon: "🛠", label: "Services", desc: "Installation & after sales support", href: "/services" },
  { icon: "📞", label: "Contact Us", desc: "Get in touch with our team", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen bg-brand-white flex flex-col">
        <main className="flex-1">
          {/* Hero 404 */}
          <section className="relative bg-brand-white py-16 px-4 overflow-hidden">
            <div className="max-w-container mx-auto text-center">
              {/* Decorative cogs */}
              <div className="absolute top-8 left-12 text-6xl opacity-10 animate-spin" style={{ animationDuration: "8s" }}>⚙️</div>
              <div className="absolute top-8 right-12 text-6xl opacity-10 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }}>⚙️</div>

              {/* 404 */}
              <h1 className="font-heading font-black text-[96px] md:text-[140px] text-brand-green/20 leading-none mb-2">
                404
              </h1>
              <h2 className="font-heading font-black text-2xl md:text-3xl text-brand-text mb-3 -mt-4">
                Oops! Page Not Found
              </h2>
              <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
                The page you are looking for may have been moved, deleted, or does not exist.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <Link href="/" className="btn bg-brand-green text-white px-6 py-3 text-sm hover:bg-brand-gold flex items-center gap-2">
                  🏠 Back to Homepage
                </Link>
                <Link href="/products" className="btn border-2 border-brand-green text-brand-green px-6 py-3 text-sm hover:bg-brand-green hover:text-white flex items-center gap-2">
                  ⚙️ Explore Products
                </Link>
                <Link href="/contact" className="btn bg-brand-dark text-white px-6 py-3 text-sm flex items-center gap-2">
                  📞 Contact Support
                </Link>
              </div>

              <NotFoundSearch />
            </div>
          </section>

          {/* Popular Links */}
          <section className="bg-brand-light-gray py-12 px-4">
            <div className="max-w-container mx-auto">
              <h3 className="font-heading font-bold text-lg text-brand-text text-center mb-8">
                Popular Links
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {POPULAR_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col items-center text-center gap-2 p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-green hover:shadow-soft transition-all"
                  >
                    <span className="text-3xl">{link.icon}</span>
                    <p className="font-heading font-bold text-xs text-brand-text group-hover:text-brand-green transition-colors">
                      {link.label}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-snug">{link.desc}</p>
                    <span className="text-brand-green text-xs font-bold">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Immediate help banner */}
          <section className="bg-brand-dark py-10 px-4">
            <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-2xl mb-2">🎧</p>
                <h3 className="font-heading font-bold text-white text-lg">Need Immediate Assistance?</h3>
                <p className="text-white/60 text-sm">Our support team is ready to help you find the right solution.</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I need help finding a product.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#25D366] text-white px-6 py-3 text-sm flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="btn bg-white/10 text-white border border-white/20 px-6 py-3 text-sm flex items-center gap-2 hover:bg-white hover:text-brand-dark"
                >
                  <Phone size={16} />
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
}
