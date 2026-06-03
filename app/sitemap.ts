import { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity";
import { SITE_CONFIG } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.url;

  // Fetch dynamic routes from Sanity
  const [products, categories, brands, posts] = await Promise.all([
    sanityClient.fetch(`*[_type == "product"]{ "slug": slug.current, _updatedAt }`),
    sanityClient.fetch(`*[_type == "category"]{ "slug": slug.current, _updatedAt }`),
    sanityClient.fetch(`*[_type == "brand"]{ "slug": slug.current, _updatedAt }`),
    sanityClient.fetch(`*[_type == "blogPost"]{ "slug": slug.current, _updatedAt }`),
  ]).catch(() => [[], [], [], []]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/brands`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/catalog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/dealer`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const productRoutes = products.map(
    (p: { slug: string; _updatedAt: string }) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: p._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const categoryRoutes = categories.map(
    (c: { slug: string; _updatedAt: string }) => ({
      url: `${base}/categories/${c.slug}`,
      lastModified: c._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const brandRoutes = brands.map(
    (b: { slug: string; _updatedAt: string }) => ({
      url: `${base}/brands/${b.slug}`,
      lastModified: b._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  const postRoutes = posts.map(
    (p: { slug: string; _updatedAt: string }) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...brandRoutes,
    ...postRoutes,
  ];
}
