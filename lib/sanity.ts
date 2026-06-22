// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/types";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  // useCdn is false so Next.js's own cache (controlled via tags below)
  // is the single source of truth for caching. The Sanity CDN has its
  // own independent cache that ignores Next's revalidateTag(), which
  // would otherwise mean Studio edits don't show up until the Sanity
  // CDN's own TTL expires — defeating instant on-demand revalidation.
  useCdn: false,
};

export const sanityClient = createClient(sanityConfig);

/**
 * Fetch wrapper that tags the request for on-demand revalidation.
 * Pass the relevant content-type tag(s) (e.g. "products", "categories")
 * so the /api/revalidate webhook can invalidate exactly what changed,
 * the moment it's published in Sanity Studio — no waiting for a timer.
 */
export function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { tags },
  });
}

const builder = imageUrlBuilder(sanityClient);

const FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?w=800&h=600&q=80";

// Check if source is an externalImage (has a plain .url string, not a Sanity asset ref)
function isExternalImage(source: SanityImage): boolean {
  return (
    source !== null &&
    typeof source === "object" &&
    "url" in source &&
    typeof (source as { url?: unknown }).url === "string"
  );
}

// True if source looks like a Sanity asset reference the builder can use
function hasResolvableAsset(source: SanityImage): boolean {
  return (
    source !== null &&
    typeof source === "object" &&
    "asset" in source &&
    source.asset !== null &&
    typeof source.asset === "object" &&
    typeof (source.asset as { _ref?: unknown })._ref === "string"
  );
}

export function urlFor(source: SanityImage) {
  if (isExternalImage(source)) {
    const url = (source as { url: string }).url;
    // Return a minimal compatible object so .url() calls work
    return { url: () => url };
  }
  if (!hasResolvableAsset(source)) {
    // Incomplete/broken image data (e.g. externalImage with no url, or
    // an empty asset reference) — fall back instead of crashing the build.
    console.warn("urlFor: unresolvable image source, using fallback", source);
    return { url: () => FALLBACK_IMAGE_URL };
  }
  return builder.image(source);
}

export function urlForImage(source: SanityImage, width = 800, height = 600): string {
  // externalImage — return plain URL, skip the builder entirely
  if (isExternalImage(source)) {
    return (source as { url: string }).url;
  }
  if (!hasResolvableAsset(source)) {
    console.warn("urlForImage: unresolvable image source, using fallback", source);
    return FALLBACK_IMAGE_URL;
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