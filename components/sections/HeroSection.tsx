"use client";

import Link from "next/link";
import Image from "next/image";
import { buildWhatsAppUrl, SITE_CONFIG, STATS } from "@/lib/utils";
import { CountUpStat } from "@/components/ui/CountUpStat";

// ─── Shape of dynamic hero content coming from Sanity ──────
export interface HeroContent {
  badge?: string;
  headingLine1?: string;
  headingLine2Prefix?: string;
  headingLine2Highlight?: string;
  subtitle?: string;
  subtitleHighlight?: string;
  backgroundImage?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  whatsappButtonText?: string;
  whatsappMessage?: string;
}

// ─── Fallback defaults — used until Sanity data is provided ──
const DEFAULT_HERO: HeroContent = {
  badge: "Powering Modern Agriculture",
  headingLine1: "Powerful Machines",
  headingLine2Prefix: "for ",
  headingLine2Highlight: "Modern Farming",
  subtitle: "High-performance agricultural machinery built for farmers who demand",
  subtitleHighlight: "reliability, power & precision.",
  backgroundImage:
    "https://res.cloudinary.com/djocuy3qz/image/upload/w_1600,q_auto,f_auto/v1780400369/heropage_vvgpyi.png",
  primaryButtonText: "Explore Products",
  primaryButtonLink: "/products",
  whatsappButtonText: "WhatsApp Inquiry",
  whatsappMessage: "Hi! I want to make a WhatsApp inquiry about your machinery.",
};

interface HeroSectionProps {
  hero?: HeroContent | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
  // Merge Sanity data over defaults — any missing field falls back automatically
  const content: HeroContent = { ...DEFAULT_HERO, ...(hero || {}) };

  // Animation note: entrance animations are pure CSS (see globals.css
  // .hero-fade-in-1..5 classes + @keyframes hero-fade-up). Previously this
  // used a useEffect that wrote el.style.opacity/transform directly via
  // refs on a setTimeout loop — that forced 5 separate synchronous style
  // recalculations (Lighthouse "forced reflow" warning). CSS animations
  // with animation-delay run entirely on the compositor thread, so there's
  // no JS-triggered layout work at all.

  return (
    <section className="relative flex flex-col overflow-hidden bg-[#0a0f0a]" style={{ minHeight: "clamp(400px, 45vh, 600px)" }}>
      {/* ── Full-bleed Background Image ─────────────────── */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage!}
          alt="Allwin agricultural machinery at sunrise"
          fill
          priority
          quality={80}
          // ✅ Mobile fix: centered crop on small screens, shift right on larger screens
  className="object-cover object-[5%_center] lg:object-right"
          sizes="100vw"
        />
      </div>

      {/* ── Multi-layer Gradient Overlay ─────────────────── */}
      {/* Strong dark on the left for text legibility, fades to transparent on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,14,8,0.88) 0%, rgba(10,16,10,0.75) 35%, rgba(10,16,10,0.40) 62%, rgba(10,16,10,0.0) 80%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom vignette for stats strip */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,14,8,0.60) 0%, rgba(8,14,8,0.0) 35%)",
        }}
        aria-hidden="true"
      />
      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,14,8,0.25) 0%, rgba(8,14,8,0.0) 20%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col px-5 sm:px-6 md:px-10 lg:px-16">

        {/* ── Text zone: fills available height, vertically centered ── */}
        <div className="flex-1 flex flex-col justify-center py-8 sm:py-6 lg:py-8">
          <div className="max-w-[700px] w-full">

            {/* Badge — pill style with subtle glow */}
            <p
              className="hero-fade-in-1 inline-flex items-center gap-2.5 mb-5 sm:mb-7"
              style={{
                background: "rgba(212,160,23,0.12)",
                border: "1px solid rgba(212,160,23,0.35)",
                borderRadius: "999px",
                padding: "6px 14px",
                color: "#D4A017",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontFamily: "var(--font-heading)",
                boxShadow: "0 0 20px rgba(212,160,23,0.10)",
              }}
            >
              {/* Pulse dot */}
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#D4A017",
                  boxShadow: "0 0 8px rgba(212,160,23,0.8)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span className="leading-none">{content.badge}</span>
            </p>

            {/* Heading — large, tight, impactful — ✅ MOBILE FIXED:
                removed nowrap + fixed clamp lower bound so it scales
                down gracefully on narrow screens instead of overflowing */}
            <h1
              className="hero-fade-in-2 font-heading font-black text-white mb-4 break-words"
              style={{
                fontSize: "clamp(1.75rem, 5vw, 2.7rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 32px rgba(0,0,0,0.55)",
              }}
            >
              <span className="block">{content.headingLine1}</span>
              <span className="block">
                <span style={{ color: "rgba(255,255,255,0.92)" }}>
                  {content.headingLine2Prefix}
                </span>
                <span
                  style={{
                    color: "#D4A017",
                    textShadow: "0 0 48px rgba(212,160,23,0.40)",
                  }}
                >
                  {content.headingLine2Highlight}
                </span>
              </span>
            </h1>

            {/* Sub-heading — with golden left accent */}
            <div
              className="hero-fade-in-3"
              style={{
                borderLeft: "3px solid rgba(212,160,23,0.55)",
                paddingLeft: "14px",
                marginBottom: "28px",
              }}
            >
              <p
                className="leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.60)",
                  fontSize: "clamp(12px, 3vw, 15px)",
                  maxWidth: "440px",
                }}
              >
                {content.subtitle}{" "}
                <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>
                  {content.subtitleHighlight}
                </span>
              </p>
            </div>

            {/* CTA Buttons — ✅ MOBILE FIXED: always a row, never stacks */}
            <div className="hero-fade-in-4 btn-row-mobile sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 mb-6 max-w-[340px] sm:max-w-none">
              <Link
                href={content.primaryButtonLink!}
                className="btn flex items-center justify-center gap-1.5 sm:gap-2 text-[13px] sm:text-sm text-white shadow-large"
                style={{
                  background: "linear-gradient(135deg, #1F4D3A 0%, #2d7054 100%)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  padding: "11px 16px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                {content.primaryButtonText}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <a
                href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, content.whatsappMessage!)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn flex items-center justify-center gap-1.5 sm:gap-2 text-[13px] sm:text-sm text-white"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  backdropFilter: "blur(10px)",
                  padding: "11px 16px",
                  borderRadius: "8px",
                  fontWeight: 500,
                }}
              >
                {/* WhatsApp icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "#25D366" }} className="flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="truncate">{content.whatsappButtonText}</span>
              </a>
            </div>
          </div>
        </div>{/* end text zone */}

        {/* ── Stats Strip — ✅ MOBILE FIXED: 2-column grid on phones, row on larger screens ── */}
        <div
          className="hero-fade-in-5 pb-6 sm:pb-5 grid grid-cols-2 gap-y-5 gap-x-4 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-3"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              {/* Divider before all except first — desktop only */}
              {i > 0 && (
                <div
                  className="hidden sm:block w-px self-stretch"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  aria-hidden="true"
                />
              )}
              <div>
                <CountUpStat
                  value={stat.value}
                  suffix={stat.suffix}
                  className="!text-white !text-xl sm:!text-2xl"
                />
                <p
                  className="font-heading font-semibold text-[10px] sm:text-[11px] uppercase tracking-[2px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Scroll indicator — desktop only ─────────────────── */}
        <div
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span
            className="font-heading text-[10px] uppercase tracking-[4px]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Scroll
          </span>
          <div
            className="w-px h-10 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <div
              className="hero-scroll-line absolute top-0 left-0 w-full"
              style={{ height: "40%", background: "#D4A017" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
