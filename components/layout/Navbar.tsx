"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS, SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Phone, ChevronDown, Menu, X, MessageCircle } from "lucide-react";
import type { Category } from "@/types";

interface NavbarProps {
  categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-brand-green text-white text-xs py-2 px-4 hidden md:block">
        <div className="w-full flex justify-between items-center px-4 md:px-6 lg:px-16">
          <span>🌾 High Performance Agriculture Machinery — Trusted by 5000+ Farmers</span>
          <div className="flex gap-6">
            <span>📦 Nationwide Delivery</span>
            <span>💳 Easy EMI Options</span>
            <span>🛠 Expert Support</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={cn(
          "sticky top-0 z-[100] transition-all duration-300",
          scrolled ? "navbar-scrolled bg-brand-dark" : "bg-brand-dark"
        )}
      >
        <div className="w-full px-4 md:px-6 lg:px-16 h-[72px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-auto">
            <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center font-heading font-black text-white text-lg">
              AW
            </div>
            <div>
              <span className="font-heading font-black text-white text-lg leading-none block">
                ALLWIN
              </span>
              <span className="text-brand-gold text-[10px] font-heading font-bold tracking-widest uppercase">
                Machinery
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => {
              const isProducts = item.label === "Products";
              const dropdownItems = isProducts
                ? categories.map((cat) => ({
                    label: cat.name,
                    href: `/categories/${cat.slug.current}`,
                  }))
                : item.children || [];

              const hasDropdown = dropdownItems.length > 0;

              return (
                <div key={item.href} className="relative">
                  {hasDropdown ? (
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                      className="flex items-center gap-1 px-3 py-2 text-sm text-white/80 hover:text-brand-gold font-heading font-semibold transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm text-white/80 hover:text-brand-gold font-heading font-semibold transition-colors block"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {hasDropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-large border border-gray-100 py-2 z-50">
                      {dropdownItems.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-brand-text hover:bg-brand-light-gray hover:text-brand-green font-body transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA area */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-1.5 text-white/80 hover:text-brand-gold transition-colors"
            >
              <Phone size={16} />
              <div className="text-left">
                <div className="text-xs font-heading font-bold leading-none">
                  {SITE_CONFIG.phone}
                </div>
                <div className="text-[10px] text-white/50">Call Us Anytime</div>
              </div>
            </a>
            <Link
              href="/contact"
              className="btn bg-brand-gold text-white px-4 py-2 text-sm hover:bg-brand-green flex items-center gap-1.5"
            >
              Get a Quote →
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] bg-brand-dark lg:hidden overflow-y-auto pt-[72px]">
          <div className="px-4 py-6 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isProducts = item.label === "Products";
              const dropdownItems = isProducts
                ? categories.map((cat) => ({
                    label: cat.name,
                    href: `/categories/${cat.slug.current}`,
                  }))
                : item.children || [];

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-white font-heading font-semibold border-b border-white/10"
                  >
                    {item.label}
                  </Link>
                  {dropdownItems.length > 0 && (
                    <div className="pl-4 mt-1 space-y-1">
                      {dropdownItems.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-white/60 hover:text-brand-gold"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-6 flex flex-col gap-3">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="btn bg-white/10 text-white py-3 text-center"
              >
                📞 {SITE_CONFIG.phone}
              </a>
              <a
                href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi, I need help with a product.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#25D366] text-white py-3 text-center flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn bg-brand-gold text-white py-3 text-center"
              >
                Get a Quote →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
