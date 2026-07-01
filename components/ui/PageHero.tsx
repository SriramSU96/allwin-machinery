import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn, optimizeCloudinaryUrl } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  backgroundImage?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

export function PageHero({
  label,
  title,
  titleHighlight,
  description,
  backgroundImage,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[320px] md:min-h-[380px] bg-brand-dark overflow-hidden flex items-center",
        className
      )}
    >
      {/* ── Right side background image — ✅ MOBILE FIXED: hidden below md,
          since at narrow widths the fixed 56% image column was squeezing
          the text into too little space and hiding/clipping content. On
          mobile the dark background alone provides enough contrast. ── */}
      {backgroundImage && (
        <>
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[56%]">
            <Image
              src={optimizeCloudinaryUrl(backgroundImage)}
              alt=""
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 60%" }}
              sizes="56vw"
            />
          </div>

          {/* Smooth gradient to seamlessly blend the solid left side with the right image */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #121212 0%, #121212 54%, rgba(18,18,18,0.85) 60%, rgba(18,18,18,0.2) 70%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          {/* Subtle mobile-only background tint so the section doesn't look flat */}
          <div
            className="md:hidden absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `url(${optimizeCloudinaryUrl(backgroundImage)})`,
              backgroundSize: "cover",
              backgroundPosition: "center 60%",
            }}
            aria-hidden="true"
          />
          <div className="md:hidden absolute inset-0 bg-brand-dark/85 pointer-events-none" aria-hidden="true" />
        </>
      )}

      {/* ── Content — left aligned ── */}
      <div className="relative z-10 max-w-container mx-auto px-4 md:px-1 py-10 md:py-14 w-full">
        <div className="w-full md:max-w-[760px] lg:max-w-[900px]">

          {/* Breadcrumbs */}
          {breadcrumbs && (
            <nav
              className="flex items-center flex-wrap gap-1.5 text-white/50 text-[11px] sm:text-xs mb-3 sm:mb-4"
              aria-label="Breadcrumb"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={11} />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Label */}
          {label && (
            <p className="font-heading font-bold text-[10px] sm:text-[11px] text-brand-gold uppercase tracking-[2px] sm:tracking-[4px] mb-2 sm:mb-3">
              {label}
            </p>
          )}

          {/* Title — ✅ MOBILE FIXED: lower clamp bound so it never overflows */}
          <h1
            className="font-heading font-black text-white leading-tight mb-3 sm:mb-4"
            style={{ fontSize: "clamp(24px, 6vw, 52px)" }}
          >
            <span className="block">{title}</span>
            {titleHighlight && (
              <span className="block text-brand-gold">{titleHighlight}</span>
            )}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-white/65 text-[13px] sm:text-sm md:text-base leading-relaxed max-w-md">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}