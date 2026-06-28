"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS, SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Phone, ChevronDown, Menu, X, MessageCircle, Heart } from "lucide-react";
import type { Category, NavItem } from "@/types";
import { useWishlist } from "@/components/providers/WishlistProvider";

interface NavbarProps {
  categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { count: wishlistCount } = useWishlist();

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
        <div className="w-full flex justify-between items-center px-4 md:px-6 lg:px-8 xl:px-16">
          <span className="whitespace-nowrap">🌾 High Performance Agriculture Machinery — Trusted by 5000+ Farmers</span>
          <div className="flex gap-4 xl:gap-6">
            <span className="whitespace-nowrap">📦 Nationwide Delivery</span>
            <span className="whitespace-nowrap">💳 Easy EMI Options</span>
            <span className="whitespace-nowrap">🛠 Expert Support</span>
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
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-16 h-[72px] flex items-center justify-between gap-2 lg:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-brand-green rounded-lg flex items-center justify-center font-heading font-black text-white text-base lg:text-lg">
              AW
            </div>
            <div>
              <span className="font-heading font-black text-white text-base lg:text-lg leading-none block">
                ALLWIN
              </span>
              <span className="text-brand-gold text-[9px] lg:text-[10px] font-heading font-bold tracking-widest uppercase">
                Machinery
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          {/* Desktop nav — ml-auto pushes it right, mr-3 gives breathing room before CTA */}
          <nav className="hidden lg:flex items-center gap-0 ml-auto mr-3" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => {
              const isProducts = item.label === "Products";
              const dropdownItems: { label: string; href: string }[] = isProducts
                ? categories.map((cat) => ({
                    label: cat.name,
                    href: `/categories/${cat.slug.current}`,
                  }))
                : (item as NavItem).children || [];

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
                      className="flex items-center gap-0.5 px-1.5 xl:px-2 py-2 text-[12px] xl:text-[13px] text-white/80 hover:text-brand-gold font-heading font-semibold transition-colors whitespace-nowrap"
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={cn(
                          "transition-transform",
                          activeDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-1.5 xl:px-2 py-2 text-[12px] xl:text-[13px] text-white/80 hover:text-brand-gold font-heading font-semibold transition-colors block whitespace-nowrap"
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
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center w-8 h-8 text-white/80 hover:text-brand-gold transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={18} fill={wishlistCount > 0 ? "currentColor" : "none"} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-1.5 text-white/80 hover:text-brand-gold transition-colors"
            >
              <Phone size={14} />
              <div className="text-left">
                <div className="text-[11px] font-heading font-bold leading-none whitespace-nowrap">
                  {SITE_CONFIG.phone}
                </div>
                <div className="text-[9px] text-white/50 whitespace-nowrap">Call Us Anytime</div>
              </div>
            </a>
            <Link
              href="/contact"
              className="btn bg-brand-gold text-brand-dark px-3 py-2 text-[12px] hover:bg-brand-green hover:text-white flex items-center gap-1 whitespace-nowrap"
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
              const dropdownItems: { label: string; href: string }[] = isProducts
                ? categories.map((cat) => ({
                    label: cat.name,
                    href: `/categories/${cat.slug.current}`,
                  }))
                : (item as NavItem).children || [];

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
              <Link
                href="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="btn bg-white/10 text-white py-3 text-center flex items-center justify-center gap-2"
              >
                <Heart size={18} fill={wishlistCount > 0 ? "currentColor" : "none"} />
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
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
                className="btn bg-brand-gold text-brand-dark py-3 text-center font-semibold"
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