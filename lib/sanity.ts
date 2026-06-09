import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/types";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};


export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  // Handle external URLs (externalImage type)
  if (source && typeof source === "object" && "url" in source && source.url) {
    return { url: () => source.url };
  }
  
  return builder.image(source);
}

export function urlForImage(source: SanityImage, width = 800, height = 600) {
  // Handle external URLs (externalImage type)
  if (source && typeof source === "object" && "url" in source && source.url) {
    return source.url as string;
  }
  
  // Handle Sanity assets (imageAsset type)
  return builder
    .image(source)
    .width(width)
    .height(height)
    .format("webp")
    .quality(85)
    .url();
}
