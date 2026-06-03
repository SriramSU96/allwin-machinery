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
  name: "all",
  tagline: "Powerful Machines for Modern Farming",
  description:
    "all is a leading supplier of high performance agricultural machinery, tools and equipment for modern farmers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://allwinmachinery.com",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  email: "info@allwinmachinery.com",
  address: "123, Industrial Area, Trichy, Tamil Nadu - 620001",
  workingHours: "Mon – Sat: 9:00 AM – 6:00 PM",
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Power Weeders", href: "/categories/power-weeders" },
      { label: "Power Sprayers", href: "/categories/power-sprayers" },
      { label: "Motor Pumps", href: "/categories/motor-pumps" },
      { label: "Brush Cutters", href: "/categories/brush-cutters" },
      { label: "Water Pumps", href: "/categories/water-pumps" },
      { label: "Agri Tools", href: "/categories/agri-tools" },
      { label: "Spare Parts", href: "/categories/spare-parts" },
      { label: "Batteries", href: "/categories/batteries" },
    ],
  },
  { label: "Catalogs", href: "/catalog" },
  { label: "Brands", href: "/brands" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const STATS = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 1500, suffix: "+", label: "Products" },
  { value: 20, suffix: "+", label: "Top Brands" },
  { value: 24, suffix: "/7", label: "Support" },
];

export const CATEGORIES_DATA = [
  { name: "Power Sprayers", slug: "power-sprayers", count: "12+ Products", image: "https://res.cloudinary.com/djocuy3qz/image/upload/v1780399653/power_sprayer_kcmgbj.png" },
  { name: "Motor Pumps", slug: "motor-pumps", count: "20+ Products", image: "https://res.cloudinary.com/djocuy3qz/image/upload/v1780399664/waterpomp_smxuik.png" },
  { name: "Brush Cutters", slug: "brush-cutters", count: "15+ Products", image: "https://res.cloudinary.com/djocuy3qz/image/upload/v1780399630/Gasoline-powered_brush_cutter_on_white_tyaek6.png" },
  { name: "Water Pumps", slug: "water-pumps", count: "18+ Products", image: "https://res.cloudinary.com/djocuy3qz/image/upload/v1780399636/Green_industrial_water_pump_assembly_iwq8md.png" },
  { name: "Fogging Machines", slug: "fogging-machines", count: "10+ Products", image: "https://res.cloudinary.com/djocuy3qz/image/upload/v1780399659/Stainless_steel_fogging_machine_on_display_qacnfv.png" },
  { name: "Agri Tools", slug: "agri-tools", count: "25+ Products", image: "https://res.cloudinary.com/djocuy3qz/image/upload/v1780399643/Heavy_hammers_and_chisel_set_iddqne.png" },
  { name: "Spare Parts", slug: "spare-parts", count: "100+ Products", image: "https://res.cloudinary.com/djocuy3qz/image/upload/v1780399649/Industrious_metal_gears_in_harmony_ugtist.png" },
  { name: "Batteries", slug: "batteries", count: "8+ Products", image: "https://res.cloudinary.com/djocuy3qz/image/upload/v1780399619/battery_r7igbd.png" },
];
