import { Metadata } from "next";
import { sanityClient } from "@/lib/sanity";
import { PRODUCTS_QUERY, CATEGORIES_QUERY, BRANDS_QUERY } from "@/lib/queries";
import { ProductsClient } from "./ProductsClient";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Our Products | Agricultural Machinery",
  description:
    "Explore our wide range of high performance agricultural machinery — power weeders, sprayers, motor pumps, brush cutters and more.",
};

export const revalidate = 3600;

export default async function ProductsPage() {
  const [products, categories, brands] = await Promise.all([
    sanityClient.fetch(PRODUCTS_QUERY),
    sanityClient.fetch(CATEGORIES_QUERY),
    sanityClient.fetch(BRANDS_QUERY),
  ]);

  return (
    <>
      <PageHero
        label="Our Products"
        title="High Performance Agricultural"
        titleHighlight="Machinery"
        description="Explore our wide range of machinery for modern farming."
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <ProductsClient
        initialProducts={products}
        categories={categories}
        brands={brands}
      />
    </>
  );
}
