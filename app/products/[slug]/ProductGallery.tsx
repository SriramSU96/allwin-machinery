"use client";

import { useState } from "react";
import Image from "next/image";
import { SanityImage } from "@/types";
import { urlForImage } from "@/lib/sanity";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: SanityImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const safeImages = images?.length
    ? images
    : [null]; // fallback

  const activeImage = safeImages[activeIndex];
  const mainSrc = activeImage
    ? urlForImage(activeImage as SanityImage, 700, 560)
    : "/placeholder-category.png";

  const prev = () => setActiveIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] bg-brand-light-gray rounded-xl overflow-hidden group">
        <Image
          src={mainSrc}
          alt={(activeImage as SanityImage)?.alt || productName}
          fill
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Zoom button */}
        <button
          onClick={() => setZoomed(true)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-soft"
          aria-label="Zoom image"
        >
          <ZoomIn size={16} className="text-brand-text" />
        </button>

        {/* Nav arrows (only if multiple images) */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-soft hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-soft hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((img, i) => {
            const thumbSrc = img
              ? urlForImage(img as SanityImage, 120, 96)
              : "/placeholder-category.png";
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeIndex === i
                    ? "border-brand-green"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image
                  src={thumbSrc}
                  alt={`${productName} image ${i + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Zoom lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <div className="relative max-w-3xl max-h-[80vh] w-full">
            <Image
              src={mainSrc}
              alt={productName}
              width={900}
              height={720}
              className="object-contain rounded-xl"
            />
          </div>
          <button
            onClick={() => setZoomed(false)}
            className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-text font-bold hover:bg-brand-gold hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
