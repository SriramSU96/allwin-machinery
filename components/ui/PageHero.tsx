import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
          {/* Image on right 60% of screen */}
          <div
           className="absolute right-0 top-0 bottom-0 w-[56%]"
  style={{
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center 60%",
  }}
            aria-hidden="true"
          />

          <div
            className="absolute right-0 top-0 bottom-0 w-[70%]"
            style={{
              background:
                "linear-gradient(90deg, #121212 0%, rgba(18,18,18,0.96) 16%, rgba(212,160,23,0.1) 36%, rgba(212,160,23,0.04) 60%, rgba(18,18,18,0.08) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Left-to-right dark gradient — text area stays dark */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #121212 0%, rgba(18,18,18,0.98) 32%, rgba(18,18,18,0.78) 46%, rgba(18,18,18,0.28) 70%, rgba(18,18,18,0.04) 100%)",
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
