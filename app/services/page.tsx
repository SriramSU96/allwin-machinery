import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { ServicesGrid } from "./ServicesGrid";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | Allwin Machinery",
  description:
    "Professional agricultural machinery services — installation, repair, maintenance, spare parts, technical support and delivery across India.",
};

const WHY_CHOOSE = [
  { icon: "👥", title: "Experienced Team",  desc: "Skilled technicians with 10+ years of industry experience." },
  { icon: "✅", title: "Genuine Parts",     desc: "We use 100% genuine parts for long-lasting performance." },
  { icon: "⚡", title: "Fast Response",     desc: "Quick response and on-time support when you need it most." },
  { icon: "💰", title: "Affordable Pricing",desc: "Full service quality at competitive and transparent pricing." },
];

const PROCESS = [
  { icon: "📞", title: "Inquiry",           desc: "Share your requirement with our support team." },
  { icon: "💬", title: "Consultation",      desc: "Our experts understand your issue or requirement." },
  { icon: "⚙️", title: "Product Support",  desc: "We provide the right solution, service or spare part." },
  { icon: "🔧", title: "Service",           desc: "Timely support, repair or installation by our team." },
  { icon: "✅", title: "Satisfaction",      desc: "Ensuring smooth performance and long-term satisfaction." },
];

const SERVICE_GALLERY = [
  { label: "Modern Workshop",          emoji: "🏭" },
  { label: "Expert Technicians",       emoji: "👨‍🔧" },
  { label: "Spare Parts Warehouse",    emoji: "📦" },
  { label: "Advanced Tools & Equipment",emoji: "🔧" },
];

const FAQS = [
  { q: "What is the warranty period on your machines?",    a: "All machines come with 1 year manufacturer warranty on manufacturing defects." },
  { q: "Do you provide installation support?",             a: "Yes, we provide complete installation guidance. For complex machinery our team visits your location." },
  { q: "How can I order spare parts?",                     a: "Spare parts can be ordered by calling us, WhatsApp, or visiting our showroom in Trichy." },
  { q: "How long does the repair service take?",           a: "Most repairs are completed within 2–5 working days depending on the issue and parts availability." },
  { q: "Is home service available?",                       a: "Yes, home/farm service is available for select areas. Contact us to check availability in your location." },
  { q: "Do you offer annual maintenance services?",        a: "Yes, we offer Annual Maintenance Contracts (AMC) for regular customers. Contact us for details." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our Services"
        title="Reliable Agricultural"
        titleHighlight="Services & Support"
        description="Professional support for farming machinery — maintenance, spare parts, and technical assistance."
        backgroundImage="https://res.cloudinary.com/djocuy3qz/image/upload/v1781409443/ChatGPT_Image_Jun_14_2026_09_23_32_AM_ib2uph.png"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* ── Services Grid (Client — accordion) ── */}
      <section className="bg-[#F5F5F5] py-16 md:py-20">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center mb-12">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Our Services
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[32px] text-brand-text">
              Complete Support For Your Machinery
            </h2>
          </SectionReveal>
          <ServicesGrid />
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className="bg-white py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center mb-10">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Why Choose Our Services?
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {WHY_CHOOSE.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.08}>
                <div className="bg-[#F5F5F5] rounded-xl p-5 text-center hover:shadow-soft transition-shadow">
                  <span className="text-4xl block mb-3">{item.icon}</span>
                  <h3 className="font-heading font-bold text-sm text-brand-text mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-[#F5F5F5] py-16">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="text-center mb-12">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Our Service Process
            </p>
            <h2 className="font-heading font-bold text-[26px] md:text-[32px] text-brand-text">
              How We Work
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {PROCESS.map((step, i) => (
              <SectionReveal key={step.title} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center text-2xl">
                      {step.icon}
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold text-brand-dark text-[10px] font-heading font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-brand-text mb-1">{step.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Gallery ── */}
      <section className="bg-white py-14">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <SectionReveal className="mb-8">
            <p className="font-heading font-bold text-[11px] text-brand-green uppercase tracking-[3px] mb-2">
              Our Service Center
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICE_GALLERY.map((item, i) => (
              <SectionReveal key={item.label} delay={i * 0.08}>
                <div className="aspect-video bg-brand-dark rounded-xl flex flex-col items-center justify-center gap-2 hover:shadow-medium transition-shadow">
                  <span className="text-5xl">{item.emoji}</span>
                  <span className="font-heading font-bold text-sm text-white">{item.label}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Help CTA ── */}
      <section className="bg-brand-green py-14 px-4">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-heading font-bold text-2xl text-white mb-2">
              Need Help With Your Machine?
            </h2>
            <p className="text-white/70 text-sm">
              Our support team is always ready to assist you with the best service and solutions.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="btn bg-white text-brand-green px-6 py-3 text-sm hover:bg-brand-gold hover:text-white flex items-center gap-2"
            >
              <Phone size={16} /> Call Support
            </a>
            <a
              href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I need service support for my machine.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#0d7a3a] text-white px-6 py-3 text-sm flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Support
            </a>
          </div>
        </div>
      </section>

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
                  <h3 className="font-heading font-bold text-sm text-brand-text mb-2 flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-brand-green flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed pl-5">{faq.a}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}