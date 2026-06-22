"use client";

import { useWishlist } from "@/components/providers/WishlistProvider";

interface WishlistButtonProps {
  productId: string;
}

export function WishlistButton({ productId }: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 focus-visible:opacity-100"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-4 h-4 transition-colors ${active ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}