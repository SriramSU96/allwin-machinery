import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "./ContactForm";
import { CTABanner } from "@/components/sections/CTABanner";
import { SITE_CONFIG } from "@/lib/utils";
import { Phone, MessageCircle, Mail, MapPin, Clock, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | all",
  description:
    "Get in touch with all. Call, WhatsApp, or email us for quotes, support, and inquiries.",
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
      href: "https://maps.google.com",
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
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80"
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
              <p className="text-gray-500 text-sm mb-8">
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
                      <p key={i} className="text-xs text-gray-500 leading-relaxed">{line}</p>
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

              {/* Map embed placeholder */}
              <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 h-56 bg-brand-light-gray flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={32} className="mx-auto mb-2 text-brand-green" />
                  <p className="text-sm font-medium">all</p>
                  <p className="text-xs">{SITE_CONFIG.address}</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-green hover:text-brand-gold mt-1 inline-block"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-soft">
                <h2 className="font-heading font-bold text-xl text-brand-text mb-6">
                  Send Us an Inquiry
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Why Contact */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {WHY_CONTACT.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center p-5 rounded-xl bg-brand-light-gray">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-3">
                  <item.icon size={22} className="text-brand-green" />
                </div>
                <h3 className="font-heading font-bold text-sm text-brand-text mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
