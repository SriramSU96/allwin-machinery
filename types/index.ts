// types/index.ts

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  category: Category;
  brand: Brand;
  images: SanityImage[];
  price?: number;
  specs: ProductSpec[];
  features: string[];
  description: string;
  brochureUrl?: string;
  whatsappNumber?: string;
  featured: boolean;
  badge?: "Best Seller" | "New Arrival" | "Top Rated";
  inStock: boolean;
  warranty?: string;
  seo: SEO;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  icon?: string;
  image?: SanityImage;
  description?: string;
  productCount?: number;
}

export interface Brand {
  _id: string;
  name: string;
  slug: { current: string };
  logo: SanityImage;
  description?: string;
  productCount?: number;
  website?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  location: string;
  message: string;
  rating: number;
  image?: SanityImage;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: PortableTextBlock[];
  coverImage: SanityImage;
  category: string;
  author: Author;
  publishedAt: string;
  readTime?: number;
  featured?: boolean;
  tags?: string[];
  seo: SEO;
}

export interface Author {
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: "Products" | "Warranty" | "Delivery" | "Spare Parts" | "Technical Support" | "Payments";
}

export interface Dealer {
  _id: string;
  name: string;
  location: string;
  state: string;
  phone: string;
  coordinates?: { lat: number; lng: number };
}

export interface SanityImage {
  _type?: string;
  asset?: { _ref: string; _type: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  // externalImage type — Sanity images stored as plain Cloudinary/external URLs
  url?: string;
}

export interface SEO {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

export interface ProductSpec {
  label: string;
  value: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;

export interface SiteSettings {
  siteName: string;
  logo: SanityImage;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}