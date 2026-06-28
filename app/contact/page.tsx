import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "./ContactForm";
import { CTABanner } from "@/components/sections/CTABanner";
import { SITE_CONFIG } from "@/lib/utils";
import { Phone, MessageCircle, Mail, MapPin, Clock, Headphones, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Allwin Machinery",
  description:
    "Get in touch with Allwin Machinery. Call, WhatsApp, or email us for quotes, support, and inquiries.",
};

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Phone",
    lines: [SITE_CONFIG.phone, "+91 98934 32109"],
    action: { label: "Call Now", href: `tel:${SITE_CONFIG.phone}` },
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: [SITE_CONFIG.phone, "Chat with us"],
    action: {
      label: "Open Chat",
      href: `https://wa.me/${SITE_CONFIG.whatsapp}`,
    },
  },
  {
    icon: Mail,
    title: "Email",
    lines: [SITE_CONFIG.email, "sales@allwinmachinery.com"],
    action: { label: "Send Email", href: `mailto:${SITE_CONFIG.email}` },
  },
  {
    icon: MapPin,
    title: "Address",
    lines: [SITE_CONFIG.address],
    action: {
      label: "View on Map",
      href: "https://www.google.com/maps/search/?api=1&query=TVS+Toll+Gate,+Tiruchirappalli,+Tamil+Nadu",
    },
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday – Saturday", SITE_CONFIG.workingHours],
    action: null,
  },
  {
    icon: Headphones,
    title: "After Sales Support",
    lines: [SITE_CONFIG.phone, "support@allwinmachinery.com"],
    action: { label: "Get Support", href: "/services" },
  },
];

const WHY_CONTACT = [
  { icon: Headphones, title: "Expert Support", desc: "Our team of experts is ready to guide you at every step." },
  { icon: Phone, title: "Genuine Products", desc: "100% original products from trusted and reputed brands." },
  { icon: MessageCircle, title: "Fast Delivery", desc: "Pan India delivery with safe & secure packaging." },
  { icon: MapPin, title: "Technical Guidance", desc: "Get the right advice to choose the perfect machine." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact Us"
        title="Let's Connect With"
        titleHighlight="Our Machinery Experts"
        description="Have questions or need help choosing the right machine? We are here to help you with the best solutions."
        backgroundImage="https://res.cloudinary.com/djocuy3qz/image/upload/v1781409554/ChatGPT_Image_Jun_14_2026_09_23_08_AM_uk4ztj.png"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <section className="py-[60px] md:py-[80px] lg:py-[120px] bg-brand-white">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact info */}
            <div>
              <h2 className="font-heading font-bold text-2xl text-brand-text mb-2">
                We&apos;d Love to Hear From You!
              </h2>
              <p className="text-gray-600 text-sm mb-8">
                Whether you have a question about our products, need a quote, or require after-sales support, our team is ready to assist you.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {CONTACT_CARDS.map((card) => (
                  <div key={card.title} className="p-4 rounded-xl border border-gray-200 hover:border-brand-green hover:shadow-soft transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <card.icon size={18} className="text-brand-green" />
                      <h3 className="font-heading font-bold text-sm text-brand-text">{card.title}</h3>
                    </div>
                    {card.lines.map((line, i) => (
                      <p key={i} className="text-xs text-gray-600 leading-relaxed">{line}</p>
                    ))}
                    {card.action && (
                      <a
                        href={card.action.href}
                        target={card.action.href.startsWith("http") ? "_blank" : undefined}
                        rel={card.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-block mt-2 text-xs font-heading font-bold text-brand-green hover:text-brand-gold transition-colors"
                      >
                        {card.action.label} →
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Map embed — TVS Toll Gate, Trichy */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/70 shadow-[0_8px_28px_rgba(15,23,42,0.07)]">
                {/* Branded header bar */}
                <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-brand-dark to-brand-green px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/15">
                      <MapPin size={15} className="text-brand-gold" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white text-xs leading-tight">{SITE_CONFIG.name}</p>
                      <p className="text-white/55 text-[10.5px] leading-tight">{SITE_CONFIG.address}</p>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=TVS+Toll+Gate,+Tiruchirappalli,+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-brand-gold px-3.5 py-1.5 text-[11px] font-heading font-bold text-white transition-all hover:gap-2.5 hover:shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                  >
                    Get Directions <ArrowRight size={12} strokeWidth={2.5} />
                  </a>
                </div>

                {/* Map frame */}
                <div className="relative h-56">
                  <iframe
                    src="https://maps.google.com/maps?q=TVS+Toll+Gate,+Tiruchirappalli,+Tamil+Nadu&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "saturate(0.92) contrast(1.02)" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${SITE_CONFIG.name} location map — TVS Toll Gate, Trichy`}
                    className="absolute inset-0"
                  />

                  {/* Top fade so the map blends into the header bar */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-brand-dark/15 to-transparent" />

                  {/* Mobile directions pill */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=TVS+Toll+Gate,+Tiruchirappalli,+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-brand-gold px-3.5 py-2 text-[11px] font-heading font-bold text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                  >
                    Get Directions <ArrowRight size={12} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <div className="bg-brand-dark rounded-2xl border border-white/10 p-6 md:p-8 shadow-large">
                <h2 className="font-heading font-bold text-xl text-white mb-6">
                  Send Us an Inquiry
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Why Contact */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {WHY_CONTACT.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-center text-center p-5 rounded-xl bg-brand-light-gray border border-transparent hover:border-brand-green/40 hover:bg-white hover:shadow-soft transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 group-hover:bg-brand-green flex items-center justify-center mb-3 transition-colors duration-300">
                  <item.icon size={22} className="text-brand-green group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-bold text-sm text-brand-text mb-1 group-hover:text-brand-green transition-colors duration-300">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}