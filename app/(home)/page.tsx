import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBrandsStrip } from "@/components/sections/TrustedBrandsStrip";
import { CategoriesGrid } from "@/components/sections/CategoriesGrid";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTABanner } from "@/components/sections/CTABanner";
import { sanityClient } from "@/lib/sanity";
import {
  FEATURED_PRODUCTS_QUERY,
  TESTIMONIALS_QUERY,
  FEATURED_POST_QUERY,
  BLOG_POSTS_QUERY,
  BRANDS_QUERY,
  CATEGORIES_QUERY,
  HERO_QUERY,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Allwin Machinery | Powerful Machines for Modern Farming",
  description:
    "Leading supplier of high performance agricultural machinery in Trichy, Tamil Nadu. Power weeders, sprayers, motor pumps & more.",
};

export const revalidate = 3600; // ISR: revalidate every hour

export default async function HomePage() {
  const [featuredProducts, testimonials, featuredPost, recentPosts, brands, categories, siteSettings] =
    await Promise.all([
      sanityClient.fetch(FEATURED_PRODUCTS_QUERY),
      sanityClient.fetch(TESTIMONIALS_QUERY),
      sanityClient.fetch(FEATURED_POST_QUERY),
      sanityClient.fetch(`${BLOG_POSTS_QUERY}[0..2]`),
      sanityClient.fetch(BRANDS_QUERY),
      sanityClient.fetch(CATEGORIES_QUERY),
      sanityClient.fetch(HERO_QUERY),
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
