import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { FeaturedBrandProducts } from "@/components/sections/FeaturedBrandProducts";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { sanityClient, urlForImage } from "@/lib/sanity";
import { BRANDS_QUERY, CATEGORIES_QUERY, FEATURED_PRODUCTS_QUERY } from "@/lib/queries";
import type { Brand, Category, Product } from "@/types";
import { Shield, Award, Wrench, CheckCircle2, Phone, MessageCircle, ArrowUpRight } from "lucide-react";

const CLD = "https://res.cloudinary.com/djocuy3qz/image/upload/w_400,q_auto,f_auto";

export const metadata: Metadata = {
  title: "Brands | Trusted Agricultural Machinery Brands | Allwin Machinery",
  description:
    "Allwin Machinery is an authorized dealer for Honda, Neptune, Kirloskar, Kama, Husqvarna and more trusted agricultural machinery brands.",
};

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

const FAQS = [
  { q: "Are all the brands on this website genuine?", a: "Yes, 100%. We are an authorized dealer for all brands listed. Every product comes with official manufacturer warranty." },
  { q: "Do you provide warranty for all brands?", a: "Yes, all products come with manufacturer warranty. Warranty period varies by brand and product type." },
  { q: "Are spare parts available for all brands?", a: "Yes, we stock genuine spare parts for all brands we sell. Contact us for specific part availability." },
  { q: "Do you offer after-sales support for all brands?", a: "Yes, our trained technicians provide after-sales support for all brands we deal with." },
];

export default async function BrandsPage() {
  const [brands, categories, featuredProducts]: [Brand[], Category[], Product[]] = await Promise.all([
    sanityClient.fetch(BRANDS_QUERY),
    sanityClient.fetch(CATEGORIES_QUERY),
    sanityClient.fetch(FEATURED_PRODUCTS_QUERY),
  ]);

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
            {brands.map((brand, i) => {
              const logoUrl = brand.logo
                ? urlForImage(brand.logo, 150, 60)
                : `${CLD}/v1780557453/walk-behind_tiller_i0y4xz.png`;

              return (
                <SectionReveal key={brand._id} delay={i * 0.08}>
                  <div className="flex h-full flex-col justify-between rounded-[22px] border border-slate-200/60 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/80 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]">
                    <div className="space-y-4 text-center">
                      <div className="relative mx-auto h-14 w-full max-w-[150px]">
                        <Image
                          src={logoUrl}
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
                          {brand.description || "Explore our selection of products from this brand."}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-green whitespace-nowrap">
                        {brand.productCount || 0}+ Products
                      </p>
                      <Link
                        href={`/brands/${brand.slug.current}`}
                        className="inline-flex w-full items-center justify-center rounded-full border border-brand-green bg-brand-green text-white px-4 py-3 text-[12px] font-semibold shadow-sm transition hover:bg-white hover:text-brand-green"
                      >
                        View Products →
                      </Link>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Browse by Category ── */}
      <section className="bg-brand-light-gray py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Browse Products By Category
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
                        className="scale-[1.45] object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="180px"
                      />
                    </div>
                    <p className="mt-3 flex min-h-[34px] items-end justify-center font-heading text-[15px] font-black leading-[1.05] text-brand-text transition-colors group-hover:text-brand-green">
                      {cat.name}
                    </p>
                    <p className="mt-2 text-xs font-medium text-gray-500">
                      <span className="font-bold text-brand-green">{cat.productCount || 0}</span>{" "}
                      Products
                    </p>
                  </Link>
                </SectionReveal>
              );
            })}
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

      <FeaturedBrandProducts products={featuredProducts} />

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
