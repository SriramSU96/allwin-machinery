import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient, urlForImage } from "@/lib/sanity";
import { BRAND_BY_SLUG_QUERY, PRODUCTS_BY_BRAND_QUERY } from "@/lib/queries";
import { Brand, Product } from "@/types";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/cards/ProductCard";
import { SITE_CONFIG } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand: Brand = await sanityClient.fetch(BRAND_BY_SLUG_QUERY, {
    slug: params.slug,
  });

  if (!brand) {
    return {
      title: "Brand Not Found",
      description: "The requested brand could not be found.",
    };
  }

  return {
    title: `${brand.name} Products | ${SITE_CONFIG.name}`,
    description:
      brand.description || `Explore products from ${brand.name}.`,
  };
}

export const revalidate = 3600;
export async function generateStaticParams() {
  try {
    const items = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "brand"]{ "slug": slug.current }`
    );
    return items.map((i) => ({ slug: i.slug }));
  } catch (error) {
    console.error("generateStaticParams (brands) failed, falling back to on-demand rendering:", error);
    return [];
  }
}


export default async function BrandPage({ params }: Props) {
  const brand: Brand = await sanityClient.fetch(BRAND_BY_SLUG_QUERY, {
    slug: params.slug,
  });

  if (!brand) {
    notFound();
  }

  const products: Product[] = await sanityClient.fetch(PRODUCTS_BY_BRAND_QUERY, {
    slug: params.slug,
  });

  const logoUrl = brand.logo ? urlForImage(brand.logo, 400, 200) : undefined;

  return (
    <>
      <PageHero
        label="Brand"
        title={brand.name}
        description={brand.description || `Explore top products from ${brand.name}.`}
        backgroundImage={
          logoUrl || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80"
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Brands", href: "/brands" },
          { label: brand.name },
        ]}
      />

      <section className="max-w-container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="flex-1">
            <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm p-8">
              <div className="relative h-48 mb-6 flex items-center justify-center">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={brand.name}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-light-gray flex items-center justify-center">
                    <span className="text-2xl font-heading font-bold text-gray-400">
                      {brand.name}
                    </span>
                  </div>
                )}
              </div>
              <h2 className="font-heading font-black text-2xl text-brand-text mb-3">
                {brand.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {brand.description || "Explore our selection of premium products from this brand."}
              </p>
              {brand.website && (
                <a 
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-green hover:text-brand-gold transition-colors font-semibold"
                >
                  Visit Official Website
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading font-bold text-sm uppercase tracking-[2px] text-brand-green mb-3">
                Brand Overview
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-brand-text">Products:</span> {products.length}
                </p>
                <p>
                  <span className="font-semibold text-brand-text">Slug:</span> {brand.slug.current}
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading font-bold text-sm uppercase tracking-[2px] text-brand-green mb-3">
                Quick Links
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <Link href="/products" className="block text-brand-green hover:text-brand-gold">
                  Browse All Products
                </Link>
                <Link href="/contact" className="block text-brand-green hover:text-brand-gold">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-3xl text-brand-text">
              {products.length} products from {brand.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Browse our latest machinery lineup from this trusted brand.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            No products are currently listed for this brand.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}