import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import type { HeroContent } from "@/components/sections/HeroSection";
import { TrustedBrandsStrip } from "@/components/sections/TrustedBrandsStrip";
import { CategoriesGrid } from "@/components/sections/CategoriesGrid";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTABanner } from "@/components/sections/CTABanner";
import { sanityFetch } from "@/lib/sanity";
import type { Product, Testimonial, BlogPost, Brand, Category } from "@/types";
import {
  FEATURED_PRODUCTS_QUERY,
  TESTIMONIALS_QUERY,
  FEATURED_POST_QUERY,
  RECENT_POSTS_QUERY,
  BRANDS_QUERY,
  CATEGORIES_QUERY,
  HERO_QUERY,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Allwin Machinery | Powerful Machines for Modern Farming",
  description:
    "Leading supplier of high performance agricultural machinery in Trichy, Tamil Nadu. Power weeders, sprayers, motor pumps & more.",
};

// Safety-net cache lifetime in case a webhook is ever missed — actual
// freshness comes from /api/revalidate firing on every Sanity publish.
export const revalidate = 3600;

export default async function HomePage() {
  const [featuredProducts, testimonials, featuredPost, recentPosts, brands, categories, siteSettings] =
    await Promise.all([
      sanityFetch<Product[]>(FEATURED_PRODUCTS_QUERY, {}, ["products"]),
      sanityFetch<Testimonial[]>(TESTIMONIALS_QUERY, {}, ["testimonials"]),
      sanityFetch<BlogPost | null>(FEATURED_POST_QUERY, {}, ["blogPosts"]),
      sanityFetch<BlogPost[]>(RECENT_POSTS_QUERY, {}, ["blogPosts"]),
      sanityFetch<Brand[]>(BRANDS_QUERY, {}, ["brands"]),
      sanityFetch<Category[]>(CATEGORIES_QUERY, {}, ["categories"]),
      sanityFetch<{ hero?: HeroContent }>(HERO_QUERY, {}, ["siteSettings"]),
    ]);

  return (
    <>
      <HeroSection hero={siteSettings?.hero} />
      <TrustedBrandsStrip brands={brands} />
      <CategoriesGrid categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <BlogPreview featuredPost={featuredPost} recentPosts={recentPosts} />
    </>
  );
}