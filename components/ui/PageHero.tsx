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
      {/* ── Right side background image ── */}
      {backgroundImage && (
        <>
          {/* Image on right 56% of screen — Next/Image gives us
              automatic responsive sizing, modern format (WebP/AVIF),
              and `priority` preloads it immediately instead of waiting
              for the browser to discover a CSS background-image. */}
          <div className="absolute right-0 top-0 bottom-0 w-[56%]">
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
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #121212 0%, #121212 54%, rgba(18,18,18,0.85) 60%, rgba(18,18,18,0.2) 70%, transparent 80%)",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Content — left aligned ── */}
      <div className="relative z-10 max-w-container mx-auto px-4 md:px-1 py-14 w-full">
        <div className="max-w-[760px] md:max-w-[900px]">

          {/* Breadcrumbs */}
          {breadcrumbs && (
            <nav
              className="flex items-center gap-1.5 text-white/50 text-xs mb-4"
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
            <p className="font-heading font-bold text-[11px] text-brand-gold uppercase tracking-[4px] mb-3">
              {label}
            </p>
          )}

          {/* Title */}
          <h1
            className="font-heading font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            <span className="block">{title}</span>
            {titleHighlight && (
              <span className="block text-brand-gold">{titleHighlight}</span>
            )}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-md">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}