import Link from "next/link";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle, Download ,Mail, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Catalogs", href: "/catalog" },
    { label: "Brands", href: "/brands" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    {label:"Dealer",href:"/dealer"},
    { label: "Blog", href: "/blog" },
    {label:"FAQ",href:"/faq"},
    { label: "Contact Us", href: "/contact" },
  ],
  products: [
    { label: "Power Weeders", href: "/categories/power-weeders" },
    { label: "Power Sprayers", href: "/categories/power-sprayers" },
    { label: "Brush Cutters", href: "/categories/brush-cutters" },
    { label: "Water Pumps", href: "/categories/water-pumps" },
    { label: "Chainsaws", href: "/categories/chainsaws" },
    { label: "Generators", href: "/categories/generators" },
    { label: "All Products", href: "/products" },
  ],
  support: [
    { label: "Service Support", href: "/services" },
    { label: "Spare Parts", href: "/categories/spare-parts" },
    { label: "Warranty Policy", href: "/services#warranty" },
    { label: "Shipping & Delivery", href: "/services#delivery" },
    { label: "Return Policy", href: "/services#returns" },
    { label: "FAQs", href: "/faq" },
  ],
};

export function Footer() {
  return (
    
    <footer className="bg-brand-dark text-white">
      {/* CTA Banner above footer */}
     {/* <section className="bg-brand-green py-16 px-4">
      <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl text-white mb-2">
            Ready to Power Your Farm?
          </h2>
          <p className="text-white/70 text-sm">
            Contact us for quotes, demos, or technical guidance. We&apos;re here to help.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="btn bg-white text-brand-green px-6 py-3 text-sm hover:bg-brand-gold hover:text-white flex items-center gap-2"
          >
            <Phone size={16} />
            {SITE_CONFIG.phone}
          </a>
          <a
            href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I want to inquire about your machinery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] text-white px-6 py-3 text-sm flex items-center gap-2"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
          <Link
            href="/catalog"
            className="btn bg-brand-dark/50 text-white border border-white/20 px-6 py-3 text-sm hover:bg-brand-dark flex items-center gap-2"
          >
            <Download size={16} />
            Download Catalog
          </Link>
        </div>
      </div>
    </section> */}

      {/* Main footer */}
      <div className="max-w-container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center font-heading font-black text-white text-lg">
                AW
              </div>
              <div>
                <span className="font-heading font-black text-white text-xl leading-none block">ALLWIN</span>
                <span className="text-brand-gold text-[10px] font-heading font-bold tracking-widest uppercase">Machinery</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Leading supplier of agricultural machinery, tools and equipment for modern farmers.
              Committed to quality, reliability and customer satisfaction.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-gold flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-brand-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-brand-gold mb-5">
              Our Products
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-brand-gold mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-white/60">
                <MapPin size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex gap-3 text-sm text-white/60 hover:text-brand-gold transition-colors"
                >
                  <Phone size={16} className="text-brand-gold flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex gap-3 text-sm text-white/60 hover:text-brand-gold transition-colors"
                >
                  <Mail size={16} className="text-brand-gold flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex gap-3 text-sm text-white/60">
                <Clock size={16} className="text-brand-gold flex-shrink-0" />
                {SITE_CONFIG.workingHours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <span>© {new Date().getFullYear()} all. All Rights Reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
