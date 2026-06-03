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
        "relative min-h-[260px] md:min-h-[320px] bg-brand-dark flex items-center overflow-hidden",
        className
      )}
    >
      {/* Background */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          aria-hidden="true"
        />
      )}
      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-4 md:px-6 py-16">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-1.5 text-white/50 text-xs mb-5" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {label && (
          <p className="font-heading font-bold text-xs text-brand-gold uppercase tracking-[3px] mb-3">
            {label}
          </p>
        )}

        <h1 className="font-heading font-black text-[28px] md:text-[36px] lg:text-[48px] text-white leading-tight max-w-2xl">
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span className="text-brand-gold">{titleHighlight}</span>
            </>
          )}
        </h1>

        {description && (
          <p className="text-white/70 mt-4 text-base max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
