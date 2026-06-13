// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { unstable_cache } from "next/cache";
import type { SanityImage } from "@/types";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true, // ✅ FIXED — was: process.env.NODE_ENV === "production"
  // CDN is fast + cached globally; safe to use in dev and production.
  // Only switch to false temporarily if you need to see unpublished drafts instantly.
};

export const sanityClient = createClient(sanityConfig);

// Cached fetch wrapper (optional extra layer on top of CDN)
export function cachedFetch<T>(
  query: string,
  tags: string[],
  revalidate = 3600
) {
  return unstable_cache(
    () => sanityClient.fetch<T>(query),
    tags,
    { revalidate }
  )();
}

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  if (source && typeof source === "object" && "url" in source && source.url) {
    return { url: () => source.url };
  }
  return builder.image(source);
}

export function urlForImage(source: SanityImage, width = 800, height = 600) {
  if (source && typeof source === "object" && "url" in source && source.url) {
    return source.url as string;
  }
  return builder
    .image(source)
    .width(width)
    .height(height)
    .format("webp")
    .quality(85)
    .url();
}