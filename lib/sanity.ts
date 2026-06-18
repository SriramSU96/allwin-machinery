// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { unstable_cache } from "next/cache";
import type { SanityImage } from "@/types";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

// Cached fetch wrapper
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

// Check if source is an externalImage (has a plain .url string, not a Sanity asset ref)
function isExternalImage(source: SanityImage): boolean {
  return (
    source !== null &&
    typeof source === "object" &&
    "url" in source &&
    typeof (source as { url?: unknown }).url === "string"
  );
}

export function urlFor(source: SanityImage) {
  if (isExternalImage(source)) {
    const url = (source as { url: string }).url;
    // Return a minimal compatible object so .url() calls work
    return { url: () => url };
  }
  return builder.image(source);
}

export function urlForImage(source: SanityImage, width = 800, height = 600): string {
  // externalImage — return plain URL, skip the builder entirely
  if (isExternalImage(source)) {
    return (source as { url: string }).url;
  }
  // Normal Sanity asset
  return builder
    .image(source)
    .width(width)
    .height(height)
    .format("webp")
    .quality(85)
    .url();
}