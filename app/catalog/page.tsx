import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { sanityClient, urlForImage } from "@/lib/sanity";
import { CATEGORIES_QUERY, BRANDS_QUERY } from "@/lib/queries";
import type { Category, Brand } from "@/types";
import { ArrowUpRight, Download, FileText, Search, Phone, MessageCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Catalogs & Brochures | Allwin Machinery",
  description:
    "Download free product catalogs and brochures for Allwin Machinery — power weeders, sprayers, pumps, brush cutters and more.",
};

// ── Cloudinary base URL with optimization
const CLD = "https://res.cloudinary.com/djocuy3qz/image/upload/w_400,q_auto,f_auto";

const FEATURED_CATALOGS = [
  {
    title: "POWER WEEDERS CATALOG",
    year: "2024-25",
    pages: "38 Pages",
    size: "52.1 MB",
    image: `${CLD}/v1780557453/walk-behind_tiller_i0y4xz.png`,
    downloadUrl: "#",
  },
  {
    title: "POWER SPRAYERS CATALOG",
    year: "2024-25",
    pages: "24 Pages",
    size: "41.6 MB",
    image: `${CLD}/v1780557442/power_sprayer_machine_zlfuni.png`,
    downloadUrl: "#",
  },
  {
    title: "WATER PUMPS CATALOG",
    year: "2024-25",
    pages: "22 Pages",
    size: "33.8 MB",
    image: `${CLD}/v1780557375/Compact_water_pump_engine_in_frame_eyxdfu.png`,
    downloadUrl: "#",
  },
  {
    title: "BRUSH CUTTERS CATALOG",
    year: "2024-25",
    pages: "20 Pages",
    size: "18.3 MB",
    image: `${CLD}/v1780557384/Gas-powered_brush_cutter_oxdshx.png`,
    downloadUrl: "#",
  },
  {
    title: "SPARE PARTS CATALOG",
    year: "2024-25",
    pages: "32 Pages",
    size: "6.7 MB",
    image: `${CLD}/v1780557405/Metal_ball_bearings_arrangement_kublo2.png`,
    downloadUrl: "#",
  },
  {
    title: "GENERATORS CATALOG",
    year: "2024-25",
    pages: "28 Pages",
    size: "28.4 MB",
    image: `${CLD}/v1780557429/Portable_generator_sjhgdl.png`,
    downloadUrl: "#",
  },
  {
    title: "COMPLETE PRODUCT CATALOG",
    year: "2024-25",
    pages: "60 Pages",
    size: "83.9 MB",
    image: `${CLD}/v1780557453/walk-behind_tiller_i0y4xz.png`,
    downloadUrl: "#",
  },
  {
    title: "COMPLETE BROCHURE CATALOG",
    year: "2024-25",
    pages: "16 Pages",
    size: "25.6 MB",
    image: `${CLD}/v1780557363/agricultural_catalogus_indeling_lnmzbi.png`,
    downloadUrl: "#",
  },
];


const CATALOG_STATS = [
  { value: 1500, suffix: "+", label: "Catalog Downloads" },
  { value: 50, suffix: "+", label: "Product PDFs" },
  { value: 20, suffix: "+", label: "Top Brands" },
  { value: 5000, suffix: "+", label: "Happy Customers" },
];

const FAQS = [
  { q: "How can I download a catalog?", a: "Click the Download PDF button on any catalog card. The PDF will download instantly for free." },
  { q: "Are the catalogs free to download?", a: "Yes, all our product catalogs and brochures are completely free to download." },
  { q: "Are the product specifications updated?", a: "Yes, we update our catalogs regularly. All catalogs are for the current 2024-25 model year." },
  { q: "Can I get printed brochures?", a: "Yes, printed brochures are available at our showroom. You can also request them by WhatsApp." },
  { q: "How can I request dealer pricing?", a: "Contact us via WhatsApp or phone for dealer pricing and bulk order details." },
  { q: "Who can I contact for more information?", a: "Call us at +91 98765 43210 or WhatsApp us anytime. Our team will assist you." },
];

export default async function CatalogPage() {
  const [categories, brands]: [Category[], Brand[]] = await Promise.all([
    sanityClient.fetch(CATEGORIES_QUERY),
    sanityClient.fetch(BRANDS_QUERY),
  ]);

  return (
    <>
      <PageHero
        label="Catalogs"
        title="Product Catalogs"
        titleHighlight="& Brochures"
        description="Explore detailed specifications, features, and machinery information. Free & easy downloads."
        backgroundImage={`https://res.cloudinary.com/djocuy3qz/image/upload/v1780550299/catalog_cmvanj.png`}
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
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug.current}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green bg-white text-gray-500 md:w-40">
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.slug.current}>
                  {brand.name}
                </option>
              ))}
            </select>
            <button className="btn bg-brand-green text-white px-6 py-3 text-sm hover:bg-brand-gold flex items-center gap-2">
              <Search size={15} /> Search
            </button>
          </div>
        </div>
      </section>
      {/* ── Featured Catalogs ── */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-10">
            <p className="font-heading font-black text-[11px] text-brand-green uppercase tracking-[4px]">
              Featured Catalogs
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {FEATURED_CATALOGS.map((cat, i) => (
              <SectionReveal key={cat.title} delay={i * 0.05}>
                <div className="group flex h-full min-h-[345px] flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/60 hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-green text-brand-green">
                        <span className="font-heading text-[10px] font-black leading-none">A</span>
                        <span className="absolute -right-0.5 top-1 h-2 w-2 rounded-full bg-brand-green" />
                      </div>
                      <span className="font-heading text-xs font-black uppercase leading-none text-brand-text">
                        ALLWIN
                      </span>
                    </div>
                    <span className="font-heading text-xs font-black leading-none text-brand-green">
                      {cat.year}
                    </span>
                  </div>

                  <div className="min-h-[52px]">
                    <h3 className="font-heading text-base font-black uppercase leading-[1.1] text-brand-text">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="relative my-0 h-[175px] overflow-hidden rounded-lg bg-white">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-contain p-0 transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText size={14} className="text-red-500" />
                      PDF
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-400 text-[8px] leading-none">A</span>
                      {cat.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText size={14} className="text-gray-400" />
                      {cat.pages}
                    </span>
                  </div>

                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-brand-green bg-white px-4 py-2.5 font-heading text-xs font-black text-brand-green transition-colors hover:bg-brand-green hover:text-white">
                    <Download size={15} /> Download PDF
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
            <p className="inline-flex bg-black/15 px-1.5 py-0.5 font-heading text-[11px] font-black uppercase tracking-[4px] text-brand-text">
              Browse By Category
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-5">
            {categories.map((cat, i) => {
              const imageUrl = cat.image
                ? urlForImage(cat.image, 420, 280)
                : `${CLD}/v1780557453/walk-behind_tiller_i0y4xz.png`;

              return (
                <SectionReveal key={cat._id} delay={i * 0.06}>
                  <Link
                    href={`/categories/${cat.slug.current}`}
                    className="group relative flex h-[180px] flex-col items-center rounded-[14px] border border-gray-200 bg-white px-4 pb-4 pt-5 text-center shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/50 hover:shadow-[0_16px_34px_rgba(15,23,42,0.10)]"
                  >
                    <span className="absolute right-3 top-3 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full border border-brand-green/20 bg-white text-brand-green opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={15} strokeWidth={2.25} />
                    </span>

                    <div className="relative h-[96px] w-full bg-white">
                      <Image
                        src={imageUrl}
                        alt={cat.name}
                        fill
                        className="scale-[1.45] object-contain transition-transform duration-300"
                        sizes="180px"
                      />
                    </div>
                    <p className="mt-3 flex min-h-[34px] items-end justify-center font-heading text-[15px] font-black leading-[1.05] text-brand-text transition-colors group-hover:text-brand-green">
                      {cat.name}
                    </p>
                    <p className="mt-2 text-xs font-medium text-gray-500">
                      <span className="font-bold text-brand-green">{cat.productCount || 0}</span>{" "}
                      Catalogs
                    </p>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Brand Catalogs — matches Image 3 exactly ── */}
      <section className="bg-white py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px]">
              Brand Catalogs
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {brands.map((brand, i) => {
              const logoUrl = brand.logo
                ? urlForImage(brand.logo, 160, 80)
                : "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?w=400&h=300&q=80";

              return (
                <SectionReveal key={brand._id} delay={i * 0.08}>
                  <div className="border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-medium hover:border-brand-green transition-all group">
                    <div className="relative w-full h-16 mb-4">
                      <Image
                        src={logoUrl}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        sizes="200px"
                      />
                    </div>

                    <p className="text-xs text-gray-500 mb-4 leading-snug">
                      {brand.description || `${brand.name} product catalog`}
                    </p>

                    <Link
                      href={`/brands/${brand.slug.current}`}
                      className="btn w-full bg-white border border-brand-green text-brand-green py-2 text-[11px] hover:bg-brand-green hover:text-white flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Download size={11} /> View Catalog
                    </Link>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-brand-dark py-12">
        <div className="max-w-container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {CATALOG_STATS.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1}>
              <CountUpStat value={stat.value} suffix={stat.suffix} />
              <p className="text-white/50 text-xs font-heading font-semibold mt-1">{stat.label}</p>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="bg-white py-16 px-4">
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
