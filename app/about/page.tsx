import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { CTABanner } from "@/components/sections/CTABanner";
import { Shield, Eye, Heart, Truck, Headphones, Award, Package, IndianRupee } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Allwin Machinery",
  description:
    "Learn about Allwin Machinery — a leading supplier of agricultural machinery in Tamil Nadu, committed to quality and farmer success.",
};

const CLD = "https://res.cloudinary.com/djocuy3qz/image/upload/w_400,q_auto,f_auto";

const ABOUT_BRANDS = [
  { name: "HONDA", slug: "honda", logo: `${CLD}/v1780557392/hondo_o1jhwc.png` },
  { name: "NEPTUNE", slug: "neptune", logo: `${CLD}/v1780557415/Neptune_logo_uh4yko.png` },
  { name: "KIRLOSKAR", slug: "kirloskar", logo: `${CLD}/v1780557621/kirloskar_pumps_sdhd7w.png` },
  { name: "KAMA", slug: "kama", logo: `${CLD}/v1780557614/kama_zrjteb.png` },
  { name: "HUSQVARNA", slug: "husqvarna", logo: `${CLD}/v1780557628/husqvarna_ono7jj.png` },
  { name: "BALWAAN", slug: "balwaan", logo: `${CLD}/v1780557614/balwaan_logo.png` },
];

const STATS = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 1500, suffix: "+", label: "Products" },
  { value: 20, suffix: "+", label: "Top Brands" },
  { value: 50, suffix: "+", label: "Dealer Network" },
  { value: 10, suffix: "+", label: "Years of Experience" },
];

const WHY_CHOOSE = [
  { icon: Shield, title: "100% Genuine Products", desc: "Original & authentic products from top brands." },
  { icon: Package, title: "Top Quality Brands", desc: "We deal with reliable and reputed brands." },
  { icon: Truck, title: "Fast & Safe Delivery", desc: "Pan India delivery with safe packaging." },
  { icon: Headphones, title: "Expert Support", desc: "Dedicated support from our expert team." },
  { icon: Award, title: "After Sales Service", desc: "Reliable after sales support and spare parts." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Best quality machinery at competitive prices." },
];

const PREMISES = [
  { label: "Our Showroom", emoji: "🏬" },
  { label: "Warehouse", emoji: "🏭" },
  { label: "Service Center", emoji: "🔧" },
  { label: "Spare Parts Section", emoji: "⚙️" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About all"
        title="Trusted Agricultural"
        titleHighlight="Machinery Partner"
        description="all is a leading supplier of high performance agricultural machinery, tools and equipment for modern farmers."
        backgroundImage="https://res.cloudinary.com/djocuy3qz/image/upload/v1781410609/ChatGPT_Image_Jun_14_2026_09_46_13_AM_pvi2et.png"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Company intro */}
      <section className="py-[60px] md:py-[80px] lg:py-[120px] bg-brand-white">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <SectionReveal>
              <div className="relative rounded-2xl overflow-hidden bg-brand-light-gray aspect-video flex items-center justify-center text-6xl">
                🏭
                {/* Replace with actual Cloudinary image */}
              </div>
            </SectionReveal>

            {/* Text */}
            <SectionReveal delay={0.1}>
              <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-3">
                Our Company
              </p>

              <h2 className="font-heading font-black text-[26px] md:text-[32px] leading-[1.1] text-brand-text">
                Powering Growth{" "}
                <span className="text-brand-green">Enriching Lives.</span>
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Since our inception, all has been dedicated to providing farmers
                with innovative, durable and efficient agricultural machinery. From power weeders
                to water pumps, brush cutters to sprayers — we offer a complete range of solutions
                to make farming easier and more productive.
              </p>

              {/* Mission / Vision / Values */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  {
                    icon: Shield,
                    title: "Our Mission",
                    desc: "To empower farmers with reliable and affordable machinery that enhances productivity.",
                  },
                  {
                    icon: Eye,
                    title: "Our Vision",
                    desc: "To be the most trusted agricultural machinery brand across India and beyond.",
                  },
                  {
                    icon: Heart,
                    title: "Our Values",
                    desc: "Quality, integrity, innovation and customer satisfaction in everything we do.",
                  },
                ].map((item) => (
                  <div key={item.title} className="text-center p-4 rounded-xl bg-brand-light-gray">
                    <item.icon size={22} className="text-brand-green mx-auto mb-2" />
                    <h4 className="font-heading font-bold text-xs text-brand-text mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Allwin */}
      <section className="py-[60px] md:py-[80px] bg-brand-light-gray">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center mb-10">
            <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-2">
              Why Choose Allwin?
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[32px] text-brand-text">
              Built for Performance. Backed by Trust.
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {WHY_CHOOSE.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-5 flex gap-4 items-start hover:shadow-medium transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-brand-text mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-dark py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {STATS.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1}>
                <CountUpStat value={stat.value} suffix={stat.suffix} />
                <p className="text-white/50 text-xs font-heading font-semibold mt-1">{stat.label}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-gradient-to-b from-brand-white to-brand-light-gray/40 py-16 md:py-20">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[4px] mb-3">
                  Brands We Deal In
                </p>

                <h2 className="font-heading font-black text-[26px] md:text-[32px] leading-[1.1] text-brand-text">
                  Powered By{" "}
                  <span className="text-brand-green">World-Class Brands</span>
                </h2>
              </div>
              <Link
                href="/brands"
                className="hidden md:inline-flex items-center justify-center rounded-full border-2 border-brand-green bg-white px-6 py-3 text-[13px] font-heading font-bold text-brand-green transition-all duration-300 hover:bg-brand-green hover:text-white hover:shadow-[0_8px_24px_rgba(13,107,58,0.25)] flex-shrink-0"
              >
                View All Brands
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
            {ABOUT_BRANDS.map((brand, i) => (
              <SectionReveal key={brand.name} delay={i * 0.06}>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group relative flex h-[110px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/50 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-brand-green/40 via-brand-green to-brand-green/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative h-12 w-full max-w-[120px] px-4">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain transition-transform duration-300 grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-105"
                      sizes="120px"
                    />
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/brands"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-green bg-white px-6 py-3 text-sm font-heading font-bold text-brand-green transition hover:bg-brand-green hover:text-white"
            >
              View All Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Premises */}
      <section className="bg-brand-light-gray py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-2">
              Our Premises
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PREMISES.map((p, i) => (
              <SectionReveal key={p.label} delay={i * 0.1}>
                <div className="aspect-video bg-brand-dark/10 rounded-xl flex flex-col items-center justify-center gap-2 hover:shadow-medium transition-shadow">
                  <span className="text-5xl">{p.emoji}</span>
                  <span className="font-heading font-bold text-sm text-brand-text">{p.label}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}