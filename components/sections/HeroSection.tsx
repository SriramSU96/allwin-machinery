"use client";

import Link from "next/link";
import Image from "next/image";
import { buildWhatsAppUrl, SITE_CONFIG, STATS } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { CountUpStat } from "@/components/ui/CountUpStat";

export function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els: [React.RefObject<HTMLElement | null>, number][] = [
      [badgeRef, 0],
      [headingRef, 120],
      [subRef, 260],
      [ctaRef, 380],
      [statsRef, 500],
    ];

    els.forEach(([ref, delay]) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.75s ease-out, transform 0.75s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden bg-[#0a0f0a]" style={{ minHeight: "clamp(580px, 68vh, 900px)" }}>
      {/* ── Full-bleed Background Image ─────────────────── */}
      <div className="absolute inset-0">
       // ✅ AFTER
<Image
  src="https://res.cloudinary.com/djocuy3qz/image/upload/w_1600,q_auto,f_auto/v1780400369/heropage_vvgpyi.png"
  alt="Allwin agricultural machinery at sunrise"
  fill
  priority
  quality={80}
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
            "linear-gradient(105deg, rgba(8,14,8,0.97) 0%, rgba(10,16,10,0.88) 30%, rgba(10,16,10,0.55) 58%, rgba(10,16,10,0.0) 80%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom vignette for stats strip */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,14,8,0.85) 0%, rgba(8,14,8,0.0) 35%)",
        }}
        aria-hidden="true"
      />
      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,14,8,0.45) 0%, rgba(8,14,8,0.0) 20%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col px-6 md:px-10 lg:px-16">

        {/* ── Text zone: fills available height, vertically centered ── */}
        <div className="flex-1 flex flex-col justify-center py-6 lg:py-8">
          <div className="max-w-[700px]">

            {/* Badge — pill style with subtle glow */}
            <p
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 mb-7"
              style={{
                background: "rgba(212,160,23,0.12)",
                border: "1px solid rgba(212,160,23,0.35)",
                borderRadius: "999px",
                padding: "6px 16px",
                color: "#D4A017",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
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
              Powering Modern Agriculture
            </p>

            {/* Heading — large, tight, impactful */}
            <h1
              ref={headingRef}
              className="font-heading font-black text-white mb-4"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 32px rgba(0,0,0,0.55)",
              }}
            >
              <span style={{ display: "block", whiteSpace: "nowrap" }}>Powerful Machines</span>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>
                <span style={{ color: "rgba(255,255,255,0.92)" }}>for </span>
                <span
                  style={{
                    color: "#D4A017",
                    textShadow: "0 0 48px rgba(212,160,23,0.40)",
                  }}
                >
                  Modern Farming
                </span>
              </span>
            </h1>

            {/* Sub-heading — with golden left accent */}
            <div
              ref={subRef}
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
                  fontSize: "clamp(14px, 1.8vw, 16.5px)",
                  maxWidth: "420px",
                }}
              >
                High-performance agricultural machinery built for farmers who
                demand{" "}
                <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>
                  reliability, power &amp; precision.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="/products"
                className="btn flex items-center gap-2 text-sm text-white shadow-large"
                style={{
                  background: "linear-gradient(135deg, #1F4D3A 0%, #2d7054 100%)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  padding: "13px 28px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                Explore Products
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
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
                href={buildWhatsAppUrl(
                  SITE_CONFIG.whatsapp,
                  "Hi! I want to make a WhatsApp inquiry about your machinery."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn flex items-center gap-2 text-sm text-white"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  backdropFilter: "blur(10px)",
                  padding: "13px 28px",
                  borderRadius: "8px",
                  fontWeight: 500,
                }}
              >
                {/* WhatsApp icon */}
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{ color: "#25D366" }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>{/* end text zone */}

        {/* ── Stats Strip — natural bottom ────────────────── */}
        <div
          ref={statsRef}
          className="pb-5 flex flex-wrap gap-x-7 gap-y-3 md:gap-x-10"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex items-center gap-3"
            >
              {/* Divider before all except first */}
              {i > 0 && (
                <div
                  className="hidden md:block w-px self-stretch"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  aria-hidden="true"
                />
              )}
              <div>
                <CountUpStat
                  value={stat.value}
                  suffix={stat.suffix}
                  className="!text-white !text-2xl md:!text-3xl"
                />
                <p
                  className="font-heading font-semibold text-[11px] uppercase tracking-[2px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Scroll indicator ─────────────────────────── */}
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
              style={{
                height: "40%",
                background: "#D4A017",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}