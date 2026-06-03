import { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { DealerForm } from "./DealerForm";
import {
  TrendingUp, Tag, Megaphone, Package, GraduationCap, Truck,
  CheckCircle2, Users, Award, ShoppingBag, Building2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Become an Authorized Dealer | Allwin Machinery",
  description:
    "Partner with Allwin Machinery and become an authorized dealer. Distribute trusted agricultural machinery and grow your business.",
};

const DEALER_BENEFITS = [
  {
    icon: TrendingUp,
    title: "High Demand Products",
    desc: "Wide range of high-quality agricultural machinery with strong market demand.",
  },
  {
    icon: Tag,
    title: "Attractive Dealer Pricing",
    desc: "Competitive dealer pricing and excellent margins to maximize your profit.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support",
    desc: "We provide marketing materials, branding support and promotional assistance.",
  },
  {
    icon: Package,
    title: "Spare Parts Support",
    desc: "Easy availability of genuine spare parts with reliable supply chain support.",
  },
  {
    icon: GraduationCap,
    title: "Technical Training",
    desc: "Product training and technical knowledge to help you serve customers better.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    desc: "Timely delivery across India with safe packaging and logistics support.",
  },
];

const WHY_PARTNER = [
  { value: "5000+", label: "Happy Customers", icon: Users },
  { value: "20+",   label: "Trusted Brands",  icon: Award },
  { value: "1500+", label: "Quality Products", icon: ShoppingBag },
  { value: "50+",   label: "Dealer Network",   icon: Building2 },
];

const REQUIREMENTS = [
  { icon: "📋", title: "Registered Business", desc: "GST Required" },
  { icon: "🏪", title: "Shop / Showroom or Business Space", desc: "Physical location needed" },
  { icon: "🌾", title: "Experience in Agriculture", desc: "Machinery Business preferred" },
  { icon: "💰", title: "Financial Capability", desc: "For Initial Investment" },
];

const PROCESS_STEPS = [
  { icon: "📝", title: "Apply", desc: "Submit your dealer inquiry form" },
  { icon: "🔍", title: "Review", desc: "Our team will review your application" },
  { icon: "✅", title: "Approval", desc: "Get approved and become a dealer" },
  { icon: "📚", title: "Training", desc: "Product training and onboarding" },
  { icon: "🤝", title: "Partnership", desc: "Start your business with Allwin Machinery" },
];

const FAQS = [
  { q: "What is the minimum investment to become a dealer?", a: "Investment varies by location and product category. Contact us for detailed dealer investment requirements." },
  { q: "Do you provide territory rights?", a: "Yes, we provide exclusive territory rights to our authorized dealers based on location and agreement." },
  { q: "What level of support will I get as a dealer?", a: "Full support — marketing materials, technical training, spare parts, and dedicated relationship manager." },
  { q: "Do you provide product training?", a: "Yes, comprehensive product training is provided to all authorized dealers before launch." },
  { q: "How will I get products and spare parts?", a: "Products are delivered directly from our warehouse. Spare parts are dispatched within 2–3 business days." },
  { q: "Is warranty handled for all products?", a: "Yes, all products come with manufacturer warranty. We handle all warranty claims on behalf of dealers." },
  { q: "How can I sell multiple brands from Allwin Machinery?", a: "As an authorized dealer, you get access to all brands we deal — Honda, Neptune, Kirloskar, Kama, Husqvarna and more." },
  { q: "Do you provide marketing and advertising support?", a: "Yes, we provide digital marketing support, product brochures, banners, and social media assets." },
];

export default function DealerPage() {
  return (
    <>
      <PageHero
        label="Dealer Inquiry"
        title="Become an"
        titleHighlight="Authorized Dealer"
        description="Partner with us to distribute trusted agricultural machinery and grow your business."
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dealer Inquiry" }]}
      />

      {/* ── Trust badges ── */}
      <div className="bg-brand-white border-b border-gray-200 py-4">
        <div className="max-w-container mx-auto px-4 md:px-6 flex flex-wrap justify-center gap-8">
          {["✅ Trusted Brands", "📦 Quality Products", "💪 Strong Support", "🌱 Grow Together"].map((item) => (
            <span key={item} className="text-sm font-heading font-semibold text-brand-text">{item}</span>
          ))}
        </div>
      </div>

      {/* ── Main content: Benefits + Form ── */}
      <section className="bg-brand-white py-16">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left: Benefits */}
            <div>
              <SectionReveal className="mb-8">
                <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
                  Dealer Benefits
                </p>
                <h2 className="font-heading font-bold text-[22px] md:text-[28px] text-brand-text">
                  Why Partner With Allwin Machinery?
                </h2>
              </SectionReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {DEALER_BENEFITS.map((benefit, i) => (
                  <SectionReveal key={benefit.title} delay={i * 0.07}>
                    <div className="flex gap-3 p-4 rounded-xl border border-gray-200 hover:border-brand-green hover:shadow-soft transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-brand-green/10 group-hover:bg-brand-green flex items-center justify-center flex-shrink-0 transition-colors">
                        <benefit.icon size={18} className="text-brand-green group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-brand-text mb-1">{benefit.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Why Partner stats */}
              <SectionReveal>
                <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-4">
                  Why Partner With Allwin Machinery?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {WHY_PARTNER.map((stat, i) => (
                    <div key={stat.label} className="bg-brand-green rounded-xl p-4 text-center">
                      <stat.icon size={18} className="text-brand-gold mx-auto mb-2" />
                      <p className="font-heading font-black text-white text-xl">{stat.value}</p>
                      <p className="text-white/60 text-[10px] font-heading font-semibold mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>

            {/* Right: Form */}
            <SectionReveal delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-soft p-6 md:p-8">
                <h2 className="font-heading font-bold text-xl text-brand-text mb-1">
                  Dealer Inquiry Form
                </h2>
                <p className="text-xs text-gray-500 mb-6">
                  Fill out the form and our team will contact you shortly.
                </p>
                <DealerForm />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Dealer Requirements ── */}
      <section className="bg-brand-light-gray py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center mb-10">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Dealer Requirements
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {REQUIREMENTS.map((req, i) => (
              <SectionReveal key={req.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-5 flex items-start gap-3 border border-gray-200 hover:border-brand-green transition-colors">
                  <span className="text-2xl flex-shrink-0">{req.icon}</span>
                  <div>
                    <p className="font-heading font-bold text-sm text-brand-text">{req.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{req.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-brand-white py-16">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center mb-12">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Our Dealership Process
            </p>
          </SectionReveal>

          <div className="flex flex-col md:flex-row items-start gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <SectionReveal key={step.title} delay={i * 0.1} className="flex-1">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-brand-green text-white flex items-center justify-center text-2xl relative">
                    {step.icon}
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold text-white text-[9px] font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-brand-text">{step.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── India map placeholder ── */}
      <section className="bg-brand-light-gray py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <SectionReveal>
              <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-3">
                Our Dealer Network
              </p>
              <h2 className="font-heading font-bold text-2xl text-brand-text mb-4">
                We are growing across India with strong dealer partners.
              </h2>
              <ul className="space-y-2.5">
                {["Pan India Presence", "Strong Distribution Network", "Supporting Rural India", "Expanding Every Day"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-brand-text">
                    <CheckCircle2 size={15} className="text-brand-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="bg-brand-dark rounded-2xl p-8 flex items-center justify-center min-h-[260px]">
                <div className="text-center">
                  <span className="text-8xl">🗺️</span>
                  <p className="font-heading font-bold text-white mt-4 text-lg">Pan India Coverage</p>
                  <p className="text-white/50 text-sm mt-1">50+ Active Dealer Locations</p>
                  <Link href="/contact" className="btn bg-brand-gold text-white px-5 py-2.5 text-sm mt-4 inline-flex">
                    View Dealer Locations →
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-brand-green py-12 px-4">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-bold text-xl text-white mb-1">
              Grow Your Agricultural Business With Us
            </h2>
            <p className="text-white/70 text-sm">
              Join hands with Allwin Machinery and build a successful partnership for a better future.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="#dealer-form" className="btn bg-white text-brand-green px-5 py-3 text-sm hover:bg-brand-gold hover:text-white">
              📋 Apply Now
            </a>
            <Link href="/contact" className="btn bg-brand-dark/40 text-white border border-white/20 px-5 py-3 text-sm hover:bg-brand-dark">
              📞 Contact Our Team
            </Link>
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
              <SectionReveal key={i} delay={i * 0.05}>
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