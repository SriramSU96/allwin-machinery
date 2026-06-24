import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
/**
 * Ensures a Cloudinary URL has width/quality/format transformations
 * applied, so background images load fast instead of pulling the raw,
 * uncompressed original. Safe to call on already-optimized URLs or
 * non-Cloudinary URLs — it returns them unchanged.
 */
export function optimizeCloudinaryUrl(url: string, width = 1600): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  // Already has transformation params (e.g. w_, q_, f_) — leave as-is
  if (/\/upload\/[^/]*[wqf]_/.test(url)) {
    return url;
  }
  return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
}



export function buildWhatsAppUrl(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

export const SITE_CONFIG = {
name: "Allwin Machinery",
  tagline: "Powerful Machines for Modern Farming",
  description:
    "Allwin Machinery is a leading supplier of high performance agricultural machinery, tools and equipment for modern farmers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://allwinmachinery.com",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 96003 64685",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9600364685",
  email: "info@allwinmachinery.com",
  address: "tvs toll gate , Trichy, Tamil Nadu - 620001",
  workingHours: "Mon – Sat: 9:00 AM – 6:00 PM",
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Catalogs", href: "/catalog" },
  { label: "Brands", href: "/brands" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Dealer", href: "/dealer" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const STATS = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 1500, suffix: "+", label: "Products" },
  { value: 20, suffix: "+", label: "Top Brands" },
  { value: 24, suffix: "/7", label: "Support" },
];
