import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Download, FileText, Search, Phone, MessageCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Catalogs & Brochures | Allwin Machinery",
  description:
    "Download free product catalogs and brochures for Allwin Machinery — power weeders, sprayers, pumps, brush cutters and more.",
};

const FEATURED_CATALOGS = [
  { title: "Power Weeders Catalog", category: "Power Weeders", year: "2024-25", pages: "32 Pages", size: "3.2 MB", emoji: "⚙️", color: "bg-green-50 border-green-200" },
  { title: "Power Sprayers Catalog", category: "Power Sprayers", year: "2024-25", pages: "24 Pages", size: "2.1 MB", emoji: "💨", color: "bg-blue-50 border-blue-200" },
  { title: "Water Pumps Catalog", category: "Water Pumps", year: "2024-25", pages: "28 Pages", size: "2.8 MB", emoji: "💧", color: "bg-cyan-50 border-cyan-200" },
  { title: "Brush Cutters Catalog", category: "Brush Cutters", year: "2024-25", pages: "20 Pages", size: "1.9 MB", emoji: "🌿", color: "bg-emerald-50 border-emerald-200" },
  { title: "Spare Parts Catalog", category: "Spare Parts", year: "2024-25", pages: "48 Pages", size: "4.1 MB", emoji: "🔩", color: "bg-orange-50 border-orange-200" },
  { title: "Complete Product Catalog", category: "All Products", year: "2024-25", pages: "80 Pages", size: "8.4 MB", emoji: "📚", color: "bg-purple-50 border-purple-200" },
];

const CATEGORY_BROWSE = [
  { name: "Power Weeders", slug: "power-weeders", emoji: "⚙️", count: "02 Catalogs" },
  { name: "Power Sprayers", slug: "power-sprayers", emoji: "💨", count: "06 Catalogs" },
  { name: "Water Pumps", slug: "water-pumps", emoji: "💧", count: "50 Catalogs" },
  { name: "Brush Cutters", slug: "brush-cutters", emoji: "🌿", count: "08 Catalogs" },
  { name: "Generators", slug: "generators", emoji: "⚡", count: "05 Catalogs" },
  { name: "Spare Parts", slug: "spare-parts", emoji: "🔩", count: "07 Catalogs" },
  { name: "Complete Catalog", slug: "all", emoji: "📚", count: "01 Catalog" },
];

const BRAND_CATALOGS = [
  { name: "HONDA", desc: "Honda Power Equipment Catalog", emoji: "🏍️" },
  { name: "NEPTUNE", desc: "Neptune Sprayers Catalog", emoji: "🌊" },
  { name: "KIRLOSKAR", desc: "Kirloskar Pumps Catalog", emoji: "⚙️" },
  { name: "KAMA", desc: "Kama Power Weeders Catalog", emoji: "🌾" },
  { name: "HUSQVARNA", desc: "Husqvarna Brush Cutters Catalog", emoji: "✂️" },
];

const CATALOG_STATS = [
  { value: "1500+", label: "Catalog Downloads" },
  { value: "50+", label: "Product PDFs" },
  { value: "20+", label: "Top Brands" },
  { value: "5000+", label: "Happy Customers" },
];

const FAQS = [
  { q: "How can I download a catalog?", a: "Click the Download PDF button on any catalog card. The PDF will download instantly for free." },
  { q: "Are the catalogs free to download?", a: "Yes, all our product catalogs and brochures are completely free to download." },
  { q: "Are the product specifications updated?", a: "Yes, we update our catalogs regularly. All catalogs are for the current 2024-25 model year." },
  { q: "Can I get printed brochures?", a: "Yes, printed brochures are available at our showroom. You can also request them by WhatsApp." },
  { q: "How can I request dealer pricing?", a: "Contact us via WhatsApp or phone for dealer pricing and bulk order details." },
  { q: "Who can I contact for more information?", a: "Call us at +91 98765 43210 or WhatsApp us anytime. Our team will assist you." },
];

export default function CatalogPage() {
  return (
    <>
      <PageHero
        label="Catalogs"
        title="Product Catalogs"
        titleHighlight="& Brochures"
        description="Explore detailed specifications, features, and machinery information. Free & easy downloads."
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Catalogs" }]}
      />

      {/* ── Search bar ── */}
      <section className="bg-brand-white py-8 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search catalog name or product..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
              />
            </div>
            <select className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green bg-white text-gray-500 md:w-48">
              <option>All Categories</option>
              <option>Power Weeders</option>
              <option>Power Sprayers</option>
              <option>Water Pumps</option>
              <option>Brush Cutters</option>
              <option>Spare Parts</option>
            </select>
            <select className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green bg-white text-gray-500 md:w-40">
              <option>All Brands</option>
              <option>Honda</option>
              <option>Neptune</option>
              <option>Kirloskar</option>
              <option>Kama</option>
              <option>Husqvarna</option>
            </select>
            <button className="btn bg-brand-green text-white px-6 py-3 text-sm hover:bg-brand-gold flex items-center gap-2">
              <Search size={15} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ── Featured Catalogs ── */}
      <section className="bg-brand-white py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Featured Catalogs
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_CATALOGS.map((cat, i) => (
              <SectionReveal key={cat.title} delay={i * 0.06}>
                <div className={`border rounded-xl p-4 flex flex-col gap-3 hover:shadow-medium transition-shadow ${cat.color}`}>
                  {/* Logo area */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 bg-brand-green rounded flex items-center justify-center">
                      <span className="text-white text-[8px] font-black">AW</span>
                    </div>
                    <span className="font-heading font-bold text-[9px] text-brand-green uppercase tracking-wide">ALLWIN</span>
                  </div>

                  {/* Catalog image placeholder */}
                  <div className="aspect-[3/4] bg-white rounded-lg flex items-center justify-center text-4xl border border-white/50">
                    {cat.emoji}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="font-heading font-bold text-[11px] text-brand-text leading-tight mb-1">{cat.title}</p>
                    <p className="text-[10px] text-gray-500">{cat.year}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                      <span className="flex items-center gap-0.5"><FileText size={9} /> {cat.size}</span>
                      <span>·</span>
                      <span>{cat.pages}</span>
                    </div>
                  </div>

                  {/* Download button */}
                  <button className="btn w-full bg-brand-green text-white py-2 text-[11px] hover:bg-brand-gold flex items-center justify-center gap-1.5 mt-auto">
                    <Download size={12} /> Download PDF
                  </button>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Category ── */}
      <section className="bg-brand-light-gray py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Browse By Category
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {CATEGORY_BROWSE.map((cat, i) => (
              <SectionReveal key={cat.name} delay={i * 0.06}>
                <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:border-brand-green hover:shadow-soft border border-gray-200 transition-all cursor-pointer group">
                  <span className="text-3xl">{cat.emoji}</span>
                  <p className="font-heading font-bold text-xs text-brand-text group-hover:text-brand-green transition-colors leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-gray-400">{cat.count}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Catalogs ── */}
      <section className="bg-brand-white py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Brand Catalogs
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {BRAND_CATALOGS.map((brand, i) => (
              <SectionReveal key={brand.name} delay={i * 0.08}>
                <div className="border border-gray-200 rounded-xl p-5 text-center hover:border-brand-green hover:shadow-soft transition-all group">
                  <span className="text-4xl block mb-3">{brand.emoji}</span>
                  <p className="font-heading font-black text-sm text-brand-text group-hover:text-brand-green transition-colors mb-1">
                    {brand.name}
                  </p>
                  <p className="text-[11px] text-gray-500 mb-4">{brand.desc}</p>
                  <button className="btn w-full bg-brand-light-gray text-brand-green py-2 text-[11px] hover:bg-brand-green hover:text-white flex items-center justify-center gap-1.5">
                    <Download size={11} /> Download Brochure
                  </button>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-brand-dark py-12">
        <div className="max-w-container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {CATALOG_STATS.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1}>
              <p className="font-heading font-black text-white text-2xl md:text-3xl">{stat.value}</p>
              <p className="text-white/50 text-xs font-heading font-semibold mt-1">{stat.label}</p>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* ── Need Help CTA ── */}
      <section className="bg-brand-green py-12 px-4">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-1">
              Need Help Choosing the Right Product?
            </h2>
            <p className="text-white/70 text-sm">Our experts are here to help you find the best machinery for your needs.</p>
          </div>
          <div className="flex gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="btn bg-white text-brand-green px-5 py-3 text-sm hover:bg-brand-gold hover:text-white flex items-center gap-2"
            >
              <Phone size={15} /> Contact Support
            </a>
            <a
              href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I need help choosing the right product catalog.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25D366] text-white px-5 py-3 text-sm flex items-center gap-2"
            >
              <MessageCircle size={15} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-brand-white py-16 px-4">
        <div className="max-w-container mx-auto">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Frequently Asked Questions
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="border border-gray-200 rounded-xl p-5 hover:border-brand-green transition-colors">
                  <h4 className="font-heading font-bold text-sm text-brand-text mb-2 flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-brand-green flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed pl-5">{faq.a}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}