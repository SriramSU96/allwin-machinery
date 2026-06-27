"use client";

import Link from "next/link";
import Image from "next/image";
import { buildWhatsAppUrl, SITE_CONFIG, STATS } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { CountUpStat } from "@/components/ui/CountUpStat";

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

const DEFAULT_HERO: HeroContent = {
  badge: "Trusted Agricultural Machinery Supplier",
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
  whatsappMessage: "Hi! I want to know more about your agricultural machinery.",
};

interface HeroSectionProps {
  hero?: HeroContent | null;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const content: HeroContent = { ...DEFAULT_HERO, ...(hero || {}) };

  const badgeRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els: [React.RefObject<HTMLElement | null>, number][] = [
      [badgeRef,   0],
      [headingRef, 150],
      [subRef,     280],
      [ctaRef,     400],
      [statsRef,   520],
    ];
    els.forEach(([ref, delay]) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      const t = setTimeout(() => {
        el.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "clamp(480px, 88vh, 720px)", background: "#060d06" }}
    >
      {/* ── Background Image ─────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage!}
          alt="Allwin Machinery — agricultural equipment"
          fill
          priority
          quality={90}
          className="object-cover object-center lg:object-[60%_center]"
          sizes="100vw"
        />
      </div>

      {/* ── Overlays — stronger for better text legibility ── */}
      {/* Primary: dark left panel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(4,10,4,0.97) 0%, rgba(4,10,4,0.92) 30%, rgba(4,10,4,0.70) 52%, rgba(4,10,4,0.20) 72%, rgba(4,10,4,0.0) 85%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom dark band for stats readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(4,10,4,0.95) 0%, rgba(4,10,4,0.60) 18%, rgba(4,10,4,0.0) 38%)",
        }}
        aria-hidden="true"
      />
      {/* Top dark band */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,10,4,0.55) 0%, rgba(4,10,4,0.0) 18%)",
        }}
        aria-hidden="true"
      />
      {/* Mobile full overlay — image still visible but text always readable */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ background: "rgba(4,10,4,0.55)" }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col px-5 sm:px-8 md:px-12 lg:px-20">

        {/* Text zone */}
        <div className="flex-1 flex flex-col justify-center py-10 lg:py-14">
          <div className="max-w-[620px] w-full">

            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 mb-6"
              style={{
                background: "rgba(212,160,23,0.10)",
                border: "1px solid rgba(212,160,23,0.40)",
                borderRadius: "999px",
                padding: "6px 16px 6px 10px",
              }}
            >
              {/* Animated pulse dot */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#D4A017" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "#D4A017" }}
                />
              </span>
              <span
                style={{
                  color: "#D4A017",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-heading, sans-serif)",
                  lineHeight: 1,
                }}
              >
                {content.badge}
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="font-heading font-black text-white mb-5"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 3.4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                textShadow: "0 2px 24px rgba(0,0,0,0.8)",
              }}
            >
              <span className="block">{content.headingLine1}</span>
              <span className="block mt-1">
                <span style={{ color: "rgba(255,255,255,0.95)" }}>
                  {content.headingLine2Prefix}
                </span>
                <span
                  style={{
                    color: "#D4A017",
                    textShadow: "0 0 60px rgba(212,160,23,0.5)",
                  }}
                >
                  {content.headingLine2Highlight}
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <div
              ref={subRef}
              className="mb-8"
              style={{
                borderLeft: "3px solid rgba(212,160,23,0.60)",
                paddingLeft: "16px",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "clamp(13px, 2.5vw, 15.5px)",
                  lineHeight: 1.7,
                  maxWidth: "420px",
                }}
              >
                {content.subtitle}{" "}
                <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>
                  {content.subtitleHighlight}
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3"
            >
              {/* Primary */}
              <Link
                href={content.primaryButtonLink!}
                className="group flex items-center justify-center gap-2.5 text-white font-semibold text-sm transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #1F4D3A 0%, #2a6b4f 100%)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "13px 28px",
                  borderRadius: "10px",
                  letterSpacing: "0.01em",
                  boxShadow: "0 4px 24px rgba(31,77,58,0.45)",
                }}
              >
                {content.primaryButtonText}
                <svg
                  width="15" height="15" viewBox="0 0 16 16" fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* WhatsApp */}
              <a
                href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, content.whatsappMessage!)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 font-medium text-sm text-white transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(12px)",
                  padding: "13px 28px",
                  borderRadius: "10px",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {content.whatsappButtonText}
              </a>
            </div>

          </div>
        </div>

        {/* ── Stats Strip ──────────────────────────────────── */}
        <div
          ref={statsRef}
          className="pb-8 sm:pb-10"
        >
          {/* Divider line */}
          <div
            className="mb-6 w-full"
            style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="relative flex flex-col items-start sm:items-center text-left sm:text-center"
              >
                {/* Vertical divider between stats — desktop only */}
                {i > 0 && (
                  <div
                    className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-8"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                    aria-hidden="true"
                  />
                )}
                <CountUpStat
                  value={stat.value}
                  suffix={stat.suffix}
                  className="!text-white !text-2xl sm:!text-3xl !font-black"
                />
                <p
                  className="font-heading font-semibold uppercase tracking-widest mt-1"
                  style={{
                    color: "rgba(255,255,255,0.40)",
                    fontSize: "9.5px",
                    letterSpacing: "0.18em",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* ── Scroll indicator REMOVED — outdated pattern ── */}
    </section>
  );
}
