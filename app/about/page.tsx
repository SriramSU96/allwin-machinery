import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { CTABanner } from "@/components/sections/CTABanner";
import { Shield, Eye, Heart, Truck, Headphones, Award, Package, IndianRupee } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | all",
  description:
    "Learn about all — a leading supplier of agricultural machinery in Tamil Nadu, committed to quality and farmer success.",
};

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

const BRANDS = ["HONDA", "NEPTUNE", "★ KIRLOSKAR", "KAMA", "Husqvarna", "BALWAAN"];

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
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80"
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
              <h2 className="font-heading font-bold text-[26px] md:text-[32px] text-brand-text mb-4">
                Powering Growth. Enriching Lives.
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
      <section className="bg-brand-white py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-2">
              Brands We Deal In
            </p>
          </SectionReveal>
          <div className="flex flex-wrap gap-6 items-center">
            {BRANDS.map((brand) => (
              <div key={brand} className="px-5 py-3 border border-gray-200 rounded-xl hover:border-brand-green transition-colors">
                <span className="font-heading font-black text-brand-text/70 hover:text-brand-green transition-colors text-sm">
                  {brand}
                </span>
              </div>
            ))}
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
