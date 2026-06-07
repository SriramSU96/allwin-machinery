import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient, urlForImage } from "@/lib/sanity";
import { CATEGORY_BY_SLUG_QUERY, PRODUCTS_BY_CATEGORY_QUERY } from "@/lib/queries";
import { Category, Product } from "@/types";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/cards/ProductCard";
import { SITE_CONFIG } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category: Category = await sanityClient.fetch(CATEGORY_BY_SLUG_QUERY, {
    slug: params.slug,
  });

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} | ${SITE_CONFIG.name}`,
    description:
      category.description || `Explore products in the ${category.name} category.`,
  };
}

export const revalidate = 3600;

export default async function CategoryPage({ params }: Props) {
  const category: Category = await sanityClient.fetch(CATEGORY_BY_SLUG_QUERY, {
    slug: params.slug,
  });

  if (!category) {
    notFound();
  }

  const products: Product[] = await sanityClient.fetch(PRODUCTS_BY_CATEGORY_QUERY, {
    slug: params.slug,
  });

  const heroImage =
    category.image?.asset && urlForImage(category.image, 1200, 800);

  return (
    <>
      <PageHero
        label="Category"
        title={category.name}
        description={category.description || `Browse top products in ${category.name}.`}
        backgroundImage={heroImage || 
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name },
        ]}
      />

      <section className="max-w-container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="flex-1">
            <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <div className="relative h-64 sm:h-80">
                <Image
                  src={
                    heroImage ||
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80"
                  }
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-heading font-black text-2xl text-brand-text mb-3">
                  {category.name}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {category.description ||
                    "Explore our selected range of premium agricultural machinery."}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading font-bold text-sm uppercase tracking-[2px] text-brand-green mb-3">
                Category details
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-brand-text">Products:</span> {products.length}
                </p>
                <p>
                  <span className="font-semibold text-brand-text">Slug:</span> {category.slug.current}
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading font-bold text-sm uppercase tracking-[2px] text-brand-green mb-3">
                Quick links
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <Link href="/products" className="block text-brand-green hover:text-brand-gold">
                  Browse all products
                </Link>
                <Link href="/contact" className="block text-brand-green hover:text-brand-gold">
                  Contact sales
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-3xl text-brand-text">
              {products.length} products in {category.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Browse the latest machinery filtered for this category.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            No products are currently listed under this category.
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
