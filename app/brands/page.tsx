import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Shield, Award, Wrench, CheckCircle2, Phone, MessageCircle, ArrowUpRight } from "lucide-react";

const CLD = "https://res.cloudinary.com/djocuy3qz/image/upload/w_400,q_auto,f_auto";

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
    logo: `${CLD}/v1780557392/hondo_o1jhwc.png`,
    slug: "honda",
  },
  {
    name: "NEPTUNE",
    desc: "High quality sprayers, power weeders and agricultural solutions trusted by farmers.",
    products: "36+ Products",
    logo: `${CLD}/v1780557415/Neptune_logo_uh4yko.png`,
    slug: "neptune",
  },
  {
    name: "KIRLOSKAR",
    desc: "Trusted pumps and motors for agriculture, irrigation and water management.",
    products: "42+ Products",
    logo: `${CLD}/v1780557621/kirloskar_pumps_sdhd7w.png`,
    slug: "kirloskar",
  },
  {
    name: "KAMA",
    desc: "Durable diesel engines and power solutions for every farming need.",
    products: "38+ Products",
    logo: `${CLD}/v1780557614/kama_zrjteb.png`,
    slug: "kama",
  },
  {
    name: "HUSQVARNA",
    desc: "Premium brush cutters, chainsaws and outdoor power tools for professionals.",
    products: "22+ Products",
    logo: `${CLD}/v1780557628/husqvarna_ono7jj.png`,
    slug: "husqvarna",
  },
  {
    name: "BALWAAN",
    desc: "Reliable power weeders, tillers and implements for Indian farming conditions.",
    products: "30+ Products",
    logo: `${CLD}/v1780557614/kama_zrjteb.png`,
    slug: "balwaan",
  },
];

const CATEGORY_BRANDS = [
  { name: "Power Equipment", slug: "power-equipment", image: `${CLD}/v1780557453/walk-behind_tiller_i0y4xz.png`, count: "10 Brands" },
  { name: "Water Pumps", slug: "water-pumps", image: `${CLD}/v1780557375/Compact_water_pump_engine_in_frame_eyxdfu.png`, count: "8 Brands" },
  { name: "Power Sprayers", slug: "power-sprayers", image: `${CLD}/v1780557442/power_sprayer_machine_zlfuni.png`, count: "7 Brands" },
  { name: "Brush Cutters", slug: "brush-cutters", image: `${CLD}/v1780557384/Gas-powered_brush_cutter_oxdshx.png`, count: "6 Brands" },
  { name: "Power Weeders", slug: "power-weeders", image: `${CLD}/v1780557453/walk-behind_tiller_i0y4xz.png`, count: "8 Brands" },
  { name: "Engines", slug: "engines", image: `${CLD}/v1780557429/Portable_generator_sjhgdl.png`, count: "6 Brands" },
  { name: "Spare Parts", slug: "spare-parts", image: `${CLD}/v1780557405/Metal_ball_bearings_arrangement_kublo2.png`, count: "12 Brands" },
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {FEATURED_BRANDS.map((brand, i) => (
              <SectionReveal key={brand.name} delay={i * 0.08}>
                <div className="flex h-full flex-col justify-between rounded-[22px] border border-slate-200/60 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/80 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]">
                  <div className="space-y-4 text-center">
                    <div className="relative mx-auto h-14 w-full max-w-[150px]">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        sizes="150px"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
                        {brand.name}
                      </h3>
                      <p className="mx-auto mt-2 max-w-[220px] text-[12px] leading-5 text-slate-600 line-clamp-3">
                        {brand.desc}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col items-center gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-green whitespace-nowrap">
                      {brand.products}
                    </p>
                    <Link
                      href={`/brands/${brand.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-full border border-brand-green bg-brand-green text-white px-4 py-3 text-[12px] font-semibold shadow-sm transition hover:bg-white hover:text-brand-green"
                    >
                      View Products →
                    </Link>
                  </div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-5">
            {CATEGORY_BRANDS.map((cat, i) => (
              <SectionReveal key={cat.name} delay={i * 0.06}>
                <Link
                  href={`/brands/${cat.slug}`}
                  className="group relative flex h-[180px] flex-col items-center rounded-[14px] border border-gray-200 bg-white px-4 pb-4 pt-5 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/50 hover:shadow-[0_16px_34px_rgba(15,23,42,0.10)]"
                >
                  <span className="absolute right-3 top-3 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full border border-brand-green/20 bg-white text-brand-green opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={15} strokeWidth={2.25} />
                  </span>

                  <div className="relative h-[96px] w-full bg-white">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="scale-[1.45] object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="180px"
                    />
                  </div>
                  <p className="mt-3 flex min-h-[34px] items-end justify-center font-heading text-[15px] font-black leading-[1.05] text-brand-text transition-colors group-hover:text-brand-green">
                    {cat.name}
                  </p>
                  <p className="mt-2 text-xs font-medium text-gray-500">
                    <span className="font-bold text-brand-green">{cat.count.split(" ")[0]}</span>{" "}
                    {cat.count.replace(cat.count.split(" ")[0], "").trim()}
                  </p>
                </Link>
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
