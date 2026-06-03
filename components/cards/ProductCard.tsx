import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { urlForImage } from "@/lib/sanity";
import { formatPrice, buildWhatsAppUrl, SITE_CONFIG } from "@/lib/utils";
import { cn } from "@/lib/utils";



interface ProductCardProps {
  product: Product;
  className?: string;
}

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-brand-gold text-white",
  "New Arrival": "bg-brand-green text-white",
  "Top Rated": "bg-blue-600 text-white",
};

export function ProductCard({ product, className }: ProductCardProps) {
  const imageUrl = product.images?.[0]
    ? urlForImage(product.images[0], 400, 300)
    : "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?w=400&h=300&q=80";

  const whatsappMsg = `Hi! I'm interested in the ${product.name}. Can you share more details?`;

  return (
    <div
      className={cn(
        "product-card group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-brand-green",
        className
      )}
    >
      {/* Image */}
      <div className="card-image relative h-[200px] bg-brand-light-gray">
        <Image
          src={imageUrl}
          alt={product.images?.[0]?.alt || product.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 font-heading font-bold text-[10px] uppercase px-2 py-1 rounded-md tracking-wide",
              BADGE_STYLES[product.badge] || "bg-gray-700 text-white"
            )}
          >
            {product.badge}
          </span>
        )}
        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
          aria-label="Add to wishlist"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category label */}
        <p className="font-heading font-bold text-[10px] text-brand-gold uppercase tracking-[2px] mb-1.5">
          {product.category?.name}
        </p>

        {/* Product name */}
        <h3 className="font-heading font-bold text-sm text-brand-text mb-2 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Specs preview */}
        {product.specs?.[0] && (
          <p className="text-xs text-gray-500 mb-3">
            {product.specs[0].label}: {product.specs[0].value}
          </p>
        )}

        {/* Price */}
        {product.price && (
          <p className="font-heading font-bold text-brand-green text-base mb-3">
            {formatPrice(product.price)}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/products/${product.slug.current}`}
            className="flex items-center gap-1 text-brand-green font-heading font-bold text-xs hover:text-brand-gold transition-colors"
          >
            View Details →
          </Link>
          <a
            href={buildWhatsAppUrl(
              product.whatsappNumber || SITE_CONFIG.whatsapp,
              whatsappMsg
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
            aria-label="WhatsApp inquiry"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
