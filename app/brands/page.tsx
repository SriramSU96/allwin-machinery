import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Shield, Award, Wrench, CheckCircle2, Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Brands | Trusted Agricultural Machinery Brands | Allwin Machinery",
  description:
    "Allwin Machinery is an authorized dealer for Honda, Neptune, Kirloskar, Kama, Husqvarna and more trusted agricultural machinery brands.",
};

const FEATURED_BRANDS = [
  {
    name: "HONDA",
    desc: "World-renowned engines and power equipment. Honda engines power the best agricultural machines.",
    products: "48+ Products",
    emoji: "🏍️",
    slug: "honda",
    color: "border-red-200 bg-red-50",
  },
  {
    name: "NEPTUNE",
    desc: "High quality sprayers, power weeders and agricultural solutions trusted by farmers.",
    products: "36+ Products",
    emoji: "🌊",
    slug: "neptune",
    color: "border-blue-200 bg-blue-50",
  },
  {
    name: "KIRLOSKAR",
    desc: "Trusted pumps and motors for agriculture, irrigation and water management.",
    products: "42+ Products",
    emoji: "⚙️",
    slug: "kirloskar",
    color: "border-orange-200 bg-orange-50",
  },
  {
    name: "KAMA",
    desc: "Durable diesel engines and power solutions for every farming need.",
    products: "38+ Products",
    emoji: "🌾",
    slug: "kama",
    color: "border-yellow-200 bg-yellow-50",
  },
  {
    name: "HUSQVARNA",
    desc: "Premium brush cutters, chainsaws and outdoor power tools for professionals.",
    products: "22+ Products",
    emoji: "✂️",
    slug: "husqvarna",
    color: "border-green-200 bg-green-50",
  },
  {
    name: "BALWAAN",
    desc: "Reliable power weeders, tillers and implements for Indian farming conditions.",
    products: "30+ Products",
    emoji: "💪",
    slug: "balwaan",
    color: "border-purple-200 bg-purple-50",
  },
];

const CATEGORY_BRANDS = [
  { name: "Power Equipment", slug: "power-equipment", count: "10 Brands", emoji: "⚡" },
  { name: "Water Pumps", slug: "water-pumps", count: "8 Brands", emoji: "💧" },
  { name: "Power Sprayers", slug: "power-sprayers", count: "7 Brands", emoji: "💨" },
  { name: "Brush Cutters", slug: "brush-cutters", count: "6 Brands", emoji: "✂️" },
  { name: "Power Weeders", slug: "power-weeders", count: "8 Brands", emoji: "🌿" },
  { name: "Engines", slug: "engines", count: "6 Brands", emoji: "🔧" },
  { name: "Spare Parts", slug: "spare-parts", count: "12 Brands", emoji: "🔩" },
];

const AUTHORIZED_BENEFITS = [
  "100% Genuine Products",
  "Official Warranty from Manufacturer",
  "Authorized Warranty Support",
  "Original Spare Parts Availability",
  "Expert Technical Assistance",
];

const BRAND_STATS = [
  { value: 20, suffix: "+", label: "Trusted Brands" },
  { value: 1500, suffix: "+", label: "Products Available" },
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

const FEATURED_PRODUCTS_BY_BRAND = [
  { brand: "Honda", product: "Honda GX200 Engine", type: "Power Engine", emoji: "🔧" },
  { brand: "Neptune", product: "Neptune HB500YT Pump", type: "Water Pump", emoji: "💧" },
  { brand: "Honda", product: "Honda UMK435 Brush Cutter", type: "Brush Cutter", emoji: "✂️" },
  { brand: "Honda", product: "Honda FJ500 Tiller", type: "Power Weeder", emoji: "⚙️" },
  { brand: "Honda", product: "Honda KUR025 Pressure Washer", type: "Pressure Washer", emoji: "🚿" },
];

const FAQS = [
  { q: "Are all the brands on this website genuine?", a: "Yes, 100%. We are an authorized dealer for all brands listed. Every product comes with official manufacturer warranty." },
  { q: "Do you provide warranty for all brands?", a: "Yes, all products come with manufacturer warranty. Warranty period varies by brand and product type." },
  { q: "Are spare parts available for all brands?", a: "Yes, we stock genuine spare parts for all brands we sell. Contact us for specific part availability." },
  { q: "Do you offer after-sales support for all brands?", a: "Yes, our trained technicians provide after-sales support for all brands we deal with." },
];

export default function BrandsPage() {
  return (
    <>
      <PageHero
        label="Our Brands"
        title="Trusted Agricultural"
        titleHighlight="Machinery Brands"
        description="We partner with industry-leading brands to deliver reliable farming equipment."
        backgroundImage="https://res.cloudinary.com/djocuy3qz/image/upload/v1780550327/g_xuprt5.png"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />

      {/* ── Trust badges ── */}
      <div className="bg-brand-white border-b border-gray-200 py-4">
        <div className="max-w-container mx-auto px-4 md:px-6 flex flex-wrap justify-center gap-8">
          {[
            { icon: Shield, label: "Genuine Products" },
            { icon: Award, label: "Authorized Dealer" },
            { icon: Wrench, label: "After Sales Support" },
            { icon: CheckCircle2, label: "Warranty Assurance" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-brand-text">
              <item.icon size={16} className="text-brand-green" />
              <span className="font-heading font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Brands ── */}
      <section className="bg-brand-white py-16">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center mb-10">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Featured Brands
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_BRANDS.map((brand, i) => (
              <SectionReveal key={brand.name} delay={i * 0.08}>
                <div className={`border rounded-xl p-5 flex flex-col gap-3 hover:shadow-medium transition-all group ${brand.color}`}>
                  {/* Brand logo */}
                  <div className="text-4xl text-center">{brand.emoji}</div>
                  <div>
                    <h3 className="font-heading font-black text-sm text-brand-text group-hover:text-brand-green transition-colors text-center">
                      {brand.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1 text-center leading-relaxed line-clamp-2">
                      {brand.desc}
                    </p>
                  </div>
                  <p className="text-[10px] text-brand-green font-heading font-bold text-center">
                    {brand.products}
                  </p>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="btn w-full bg-brand-green text-white py-2 text-[11px] hover:bg-brand-gold"
                  >
                    View Products →
                  </Link>
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
              Browse Brands By Category
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {CATEGORY_BRANDS.map((cat, i) => (
              <SectionReveal key={cat.name} delay={i * 0.06}>
                <div className="bg-white rounded-xl p-4 flex flex-col items-center text-center gap-2 border border-gray-200 hover:border-brand-green hover:shadow-soft transition-all cursor-pointer group">
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

      {/* ── Authorized Dealer section ── */}
      <section className="bg-brand-white py-16">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <SectionReveal>
              <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-3">
                Authorized Dealer
              </p>
              <h2 className="font-heading font-bold text-[26px] md:text-[32px] text-brand-text mb-4">
                Genuine Products.
                <br />
                <span className="text-brand-gold">Complete Peace of Mind.</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                We are an authorized dealer for top agricultural machinery brands. All products are genuine
                and come with official warranty and after-sales service.
              </p>
              <ul className="space-y-3">
                {AUTHORIZED_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5 text-sm text-brand-text">
                    <CheckCircle2 size={16} className="text-brand-green flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            {/* Right: stats */}
            <SectionReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {BRAND_STATS.map((stat) => (
                  <div key={stat.label} className="bg-brand-green rounded-xl p-6 text-center">
                    <CountUpStat value={stat.value} suffix={stat.suffix} className="text-3xl" />
                    <p className="text-white/60 text-xs font-heading font-semibold mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Featured products by brand ── */}
      <section className="bg-brand-light-gray py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Featured Products By Brand
            </p>
          </SectionReveal>

          {/* Brand tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {["Honda Products", "Neptune Products", "Kirloskar Products", "Kama Products", "Husqvarna Products"].map((tab, i) => (
              <button
                key={tab}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-heading font-semibold transition-colors ${i === 0 ? "bg-brand-green text-white" : "bg-white text-brand-text hover:bg-gray-100 border border-gray-200"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {FEATURED_PRODUCTS_BY_BRAND.map((product, i) => (
              <SectionReveal key={product.product} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-soft hover:border-brand-green transition-all group text-center">
                  <div className="h-24 flex items-center justify-center text-5xl mb-3">
                    {product.emoji}
                  </div>
                  <p className="text-[9px] text-brand-gold font-heading font-bold uppercase tracking-wide mb-1">
                    {product.type}
                  </p>
                  <p className="font-heading font-bold text-xs text-brand-text group-hover:text-brand-green transition-colors mb-3 line-clamp-2">
                    {product.product}
                  </p>
                  <Link href="/products" className="text-xs text-brand-green font-heading font-bold hover:text-brand-gold">
                    View Product →
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership CTA ── */}
      <section className="bg-brand-green py-12 px-4">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-1">
              Partnering With Trusted Agricultural Machinery Brands
            </h2>
            <p className="text-white/70 text-sm">
              We collaborate with the best to bring you innovative, reliable and high-performance farming solutions.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/products" className="btn bg-white text-brand-green px-5 py-3 text-sm hover:bg-brand-gold hover:text-white">
              Explore All Products →
            </Link>
            <a
              href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I want to know more about your brand partnerships.")}
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
