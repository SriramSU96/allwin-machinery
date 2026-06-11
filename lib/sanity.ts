// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { unstable_cache } from "next/cache";  // ✅ ADD THIS
import type { SanityImage } from "@/types";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(sanityConfig);

// ✅ ADD THIS — cached fetch wrapper
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