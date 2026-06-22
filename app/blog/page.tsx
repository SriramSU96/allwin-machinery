import { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { BLOG_POSTS_QUERY, FEATURED_POST_QUERY } from "@/lib/queries";
import { BlogPost } from "@/types";
import { PageHero } from "@/components/ui/PageHero";
import { BlogListingClient } from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Blog | Agriculture Tips, Machinery Guides & Farming Insights",
  description:
    "Expert articles and buying guides for modern farming equipment — power weeders, pumps, sprayers and more.",
};

export const revalidate = 3600;

const BLOG_CATEGORIES = [
  "All Articles",
  "Farming Tips",
  "Buying Guides",
  "Maintenance",
  "Irrigation",
  "Product Updates",
];

export default async function BlogPage() {
  const [posts, featuredPost] = await Promise.all([
    sanityFetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, ["blogPosts"]),
    sanityFetch<BlogPost | null>(FEATURED_POST_QUERY, {}, ["blogPosts"]),
  ]);

  return (
    <>
      <PageHero
        label="From The Blog"
        title="Agriculture Tips, Machinery Guides &"
        titleHighlight="Farming Insights"
        description="Expert articles and buying guides for modern farming equipment."
        backgroundImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <BlogListingClient
        posts={posts}
        featuredPost={featuredPost}
        categories={BLOG_CATEGORIES}
      />
    </>
  );
}