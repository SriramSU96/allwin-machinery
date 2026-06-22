import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityClient, sanityFetch, urlForImage } from "@/lib/sanity";
import {
  PRODUCT_BY_SLUG_QUERY,
  RELATED_PRODUCTS_QUERY,
} from "@/lib/queries";
import { Product } from "@/types";
import {
  formatPrice,
  buildWhatsAppUrl,
  SITE_CONFIG,
} from "@/lib/utils";
import { ProductGallery } from "./ProductGallery";
import { ProductCard } from "@/components/cards/ProductCard";
import {
  Shield,
  Truck,
  Headphones,
  Award,
  Download,
  MessageCircle,
  Phone,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: Product = await sanityFetch(PRODUCT_BY_SLUG_QUERY, { slug: params.slug }, ["products"]);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.seo?.title || product.name,
    description: product.seo?.description || product.description,
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const products = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "product"]{ "slug": slug.current }`
    );
    return products.map((p) => ({ slug: p.slug }));
  } catch (error) {
    console.error("generateStaticParams (products) failed, falling back to on-demand rendering:", error);
    return [];
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product: Product = await sanityFetch(PRODUCT_BY_SLUG_QUERY, { slug: params.slug }, ["products"]);

  if (!product) notFound();

  const relatedProducts = await sanityFetch<Product[]>(
    RELATED_PRODUCTS_QUERY,
    { categoryId: product.category?._id, productId: product._id },
    ["products"]
  );

  const whatsappMsg = `Hi! I'm interested in the *${product.name}*. Please share details and pricing.`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.[0] ? urlForImage(product.images[0], 800, 800) : undefined,
    brand: product.brand?.name
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
    ...(product.price && {
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: product.price,
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    }),
  };

  const TRUST_BADGES = [
    { icon: Shield, label: "100% Genuine Products", sub: "Trusted quality with warranty" },
    { icon: Truck, label: "Fast & Safe Delivery", sub: "Pan India delivery" },
    { icon: Headphones, label: "After Sales Support", sub: "Expert assistance" },
    { icon: Award, label: "1 Year Warranty", sub: "On manufacturing defects" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumb */}
      <nav className="bg-brand-light-gray border-b border-gray-200 px-4 py-3">
        <div className="max-w-container mx-auto flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/" className="hover:text-brand-green">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-brand-green">Products</Link>
          {product.category && (
            <>
              <ChevronRight size={12} />
              <Link href={`/categories/${product.category.slug.current}`} className="hover:text-brand-green">
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight size={12} />
          <span className="text-brand-text font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </nav>

      <section className="max-w-container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Details */}
          <div>
            {/* Category badge */}
            {product.category && (
              <p className="font-heading font-bold text-[10px] text-brand-gold uppercase tracking-[2px] mb-2">
                {product.category.name}
              </p>
            )}

            {/* Title */}
            <h1 className="font-heading font-black text-2xl md:text-3xl text-brand-text mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Badge + Stock */}
            <div className="flex items-center gap-3 mb-4">
              {product.badge && (
                <span className="font-heading font-bold text-xs bg-brand-gold text-white px-3 py-1 rounded-full uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
              <span className={`flex items-center gap-1.5 text-sm font-semibold ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-400"}`} />
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
              {product.inStock && (
                <span className="text-xs text-gray-400">· Delivery within 2-4 days</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {product.description}
              </p>
            )}

            {/* Price */}
            {product.price && (
              <div className="text-2xl font-heading font-black text-brand-green mb-5">
                {formatPrice(product.price)}
              </div>
            )}

            {/* Key specs row */}
            {product.specs?.slice(0, 4) && (
              <div className="flex flex-wrap gap-3 mb-6">
                {product.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="flex items-center gap-1.5 text-xs bg-brand-light-gray px-3 py-1.5 rounded-lg">
                    <span className="text-gray-500">{spec.label}:</span>
                    <span className="font-semibold text-brand-text">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="btn flex-1 bg-brand-green text-white py-3.5 text-sm text-center hover:bg-brand-gold flex items-center justify-center gap-2"
                >
                  📋 Get a Quote
                </Link>
                <a 
                  href={buildWhatsAppUrl(product.whatsappNumber || SITE_CONFIG.whatsapp, whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn flex-1 bg-[#25D366] text-white py-3.5 text-sm text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  WhatsApp Inquiry
                </a>
              </div>
              {product.brochureUrl && (
                <a 
                  href={product.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full bg-brand-dark text-white py-3 text-sm text-center flex items-center justify-center gap-2 hover:opacity-85"
                >
                  <Download size={16} />
                  Download Brochure
                </a>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-gray-200">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.label} className="flex items-start gap-2.5">
                  <badge.icon size={18} className="text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading font-semibold text-xs text-brand-text">{badge.label}</p>
                    <p className="text-[11px] text-gray-500">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Specs / Description / Features */}
        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading font-bold text-xl text-brand-text mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p: Product) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-4 flex gap-3 z-40">
        <a 
          href={`tel:${SITE_CONFIG.phone}`}
          className="btn flex-1 border-2 border-brand-green text-brand-green py-3 text-sm text-center flex items-center justify-center gap-1.5"
        >
          <Phone size={16} />
          Call Now
        </a>
        <a

          href={buildWhatsAppUrl(product.whatsappNumber || SITE_CONFIG.whatsapp, whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn flex-1 bg-brand-green text-white py-3 text-sm text-center flex items-center justify-center gap-1.5"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
        <Link
          href="/contact"
          className="btn flex-1 bg-brand-gold text-white py-3 text-sm text-center"
        >
          Get Quote
        </Link>
      </div>
    </>
  );
}

function ProductTabs({ product }: { product: Product }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Tab content — rendered server-side for SEO */}
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Left: Specs */}
        <div className="md:col-span-3 p-6 border-b md:border-b-0 md:border-r border-gray-200">
          <h3 className="font-heading font-bold text-base text-brand-text mb-4">
            Specifications
          </h3>
          {product.specs?.length > 0 ? (
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-brand-light-gray" : "bg-white"}>
                    <td className="px-4 py-2.5 text-gray-500 font-medium w-1/2">{spec.label}</td>
                    <td className="px-4 py-2.5 text-brand-text font-semibold">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-sm">Specifications coming soon.</p>
          )}
        </div>

        {/* Right: Features */}
        <div className="md:col-span-2 p-6">
          <h3 className="font-heading font-bold text-base text-brand-text mb-4">
            Key Features
          </h3>
          {product.features?.length > 0 ? (
            <ul className="space-y-2.5">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 size={15} className="text-brand-green flex-shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">Features coming soon.</p>
          )}

          {product.warranty && (
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="font-heading font-bold text-sm text-brand-text mb-1">Warranty</p>
              <p className="text-sm text-gray-600">{product.warranty}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}