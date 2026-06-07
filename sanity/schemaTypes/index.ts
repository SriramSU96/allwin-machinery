import { defineType, defineField } from "sanity";

// ─── CATEGORY ─────────────────────────────────────────
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Category Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
    defineField({ name: "image", title: "Category Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "name" } },
});

// ─── BRAND ────────────────────────────────────────────
export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Brand Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "logo", title: "Brand Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "website", title: "Website URL", type: "url" }),
    defineField({ name: "featured", title: "Featured Brand", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "name" } },
});

// ─── PRODUCT ──────────────────────────────────────────
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Product Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (R) => R.required() }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }] }),
    defineField({
      name: "images", title: "Images", type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }],
    }),
    defineField({ name: "price", title: "Price (₹)", type: "number" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "features", title: "Key Features", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "specs", title: "Specifications", type: "array",
      of: [{ type: "object", fields: [
        { name: "label", type: "string", title: "Specification" },
        { name: "value", type: "string", title: "Value" },
      ]}],
    }),
    defineField({ name: "warranty", title: "Warranty", type: "string" }),
    defineField({ name: "brochureUrl", title: "Brochure PDF URL", type: "url" }),
    defineField({ name: "featured", title: "Featured Product", type: "boolean", initialValue: false }),
    defineField({ name: "inStock", title: "In Stock", type: "boolean", initialValue: true }),
    defineField({
      name: "badge", title: "Badge", type: "string",
      options: { list: ["Best Seller", "New Arrival", "Top Rated"] },
    }),
    defineField({
      name: "seo", title: "SEO", type: "object",
      fields: [
        { name: "title", type: "string", title: "Meta Title" },
        { name: "description", type: "text", title: "Meta Description" },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category.name", media: "images.0" },
  },
});

// ─── TESTIMONIAL ──────────────────────────────────────
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Role / Occupation", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", validation: (R) => R.required() }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (R) => R.min(1).max(5) }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "location" } },
});

// ─── AUTHOR ───────────────────────────────────────────
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
  ],
  preview: { select: { title: "name" } },
});

// ─── BLOG POST ────────────────────────────────────────
export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: { list: ["Farming Tips", "Buying Guides", "Maintenance", "Irrigation", "Product Updates"] },
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readTime", title: "Read Time (minutes)", type: "number" }),
    defineField({ name: "featured", title: "Featured Post", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});

// ─── FAQ ──────────────────────────────────────────────
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", validation: (R) => R.required() }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: { list: ["Products", "Warranty", "Delivery", "Spare Parts", "Technical Support", "Payments"] },
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});

// ─── SITE SETTINGS ────────────────────────────────────
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text" }),
    defineField({ name: "workingHours", title: "Working Hours", type: "string" }),
  ],
  preview: { select: { title: "siteName" } },
});

// ─── EXPORT ALL ───────────────────────────────────────
export const schemaTypes = [
  product,
  category,
  brand,
  testimonial,
  author,
  blogPost,
  faq,
  siteSettings,
];