import { Metadata } from "next";
import { sanityClient } from "@/lib/sanity";
import { FAQS_QUERY } from "@/lib/queries";
import { FAQ } from "@/types";
import { PageHero } from "@/components/ui/PageHero";
import { FAQAccordion } from "./FAQAccordion";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { SITE_CONFIG } from "@/lib/utils";
import { MessageCircle, Phone, Download } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | Allwin Machinery",
  description:
    "Find answers about our products, warranty, delivery, spare parts, technical support and payments.",
};

export const revalidate = 86400;

const FAQ_CATEGORIES = [
  "All Categories",
  "Products",
  "Warranty",
  "Delivery",
  "Spare Parts",
  "Technical Support",
  "Payments",
];

const TRUST_ITEMS = [
  { emoji: "✅", title: "100% Genuine Products", desc: "Quality you can trust" },
  { emoji: "🛠", title: "Expert Technical Support", desc: "Assistance always ready" },
  { emoji: "🚚", title: "Timely Delivery", desc: "Fast & reliable shipping" },
  { emoji: "👨‍🌾", title: "Trusted by Farmers", desc: "5000+ happy customers" },
];

export default async function FAQPage() {
  const faqs: FAQ[] = await sanityClient.fetch(FAQS_QUERY);

  return (
    <>
      <PageHero
        label="Help Center"
        title="Frequently Asked"
        titleHighlight="Questions"
        description="Find answers about products, warranty, delivery, spare parts, technical support and payments."
        backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="py-[60px] md:py-[80px] bg-brand-white">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="flex gap-8">
            {/* Main FAQ */}
            <div className="flex-1 min-w-0">
              <FAQAccordion faqs={faqs} categories={FAQ_CATEGORIES} />
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0 space-y-5">
              {/* Popular Questions */}
              <div className="bg-brand-light-gray rounded-xl p-5">
                <h3 className="font-heading font-bold text-sm text-brand-text mb-4">
                  ⭐ Popular Questions
                </h3>
                <ul className="space-y-3 text-xs text-gray-600">
                  {[
                    "Which power weeder is best for my farm?",
                    "Do you offer warranty on machines?",
                    "Are spare parts easily available?",
                    "How long does delivery take?",
                    "Do you provide after-sales support?",
                  ].map((q) => (
                    <li key={q} className="flex items-start gap-2 hover:text-brand-green cursor-pointer">
                      <span>›</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Still need help */}
              <div className="bg-brand-green rounded-xl p-5 text-white">
                <h3 className="font-heading font-bold text-sm mb-1">Still Need Help?</h3>
                <p className="text-white/70 text-xs mb-4">We are here for you!</p>
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full bg-[#25D366] text-white py-2.5 text-xs text-center flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} /> WhatsApp Support
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="btn w-full bg-white/20 text-white py-2.5 text-xs text-center flex items-center justify-center gap-1.5"
                  >
                    <Phone size={14} /> {SITE_CONFIG.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="btn w-full bg-white/10 text-white py-2.5 text-xs text-center block"
                  >
                    📧 Contact Us
                  </Link>
                </div>
              </div>

              {/* Catalog download */}
              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-heading font-bold text-sm text-brand-text mb-2">
                  Download Our Product Catalog
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Get detailed information about products, specifications and more.
                </p>
                <Link
                  href="/catalog"
                  className="btn w-full bg-brand-green text-white py-2.5 text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <Download size={14} /> Download Catalog (PDF)
                </Link>
              </div>

              {/* Trust */}
              <div className="space-y-3">
                {TRUST_ITEMS.map((item) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="font-heading font-semibold text-xs text-brand-text">{item.title}</p>
                      <p className="text-[11px] text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-brand-dark py-10">
        <div className="max-w-container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { label: "Your Trust Is Our Priority", sub: "Best quality machinery", wide: true },
            { value: 5000, suffix: "+", sub: "Happy Customers" },
            { value: 20, suffix: "+", sub: "Brands" },
            { value: 1500, suffix: "+", sub: "Products" },
            { value: 10, suffix: "+", sub: "Years Experience" },
          ].map((item) => (
            <div key={item.sub}>
              {"value" in item ? (
                <CountUpStat value={item.value as number} suffix={item.suffix} className="text-lg md:text-lg" />
              ) : (
                <p className="font-heading font-black text-white text-lg">{item.label}</p>
              )}
              <p className="text-white/50 text-xs">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
