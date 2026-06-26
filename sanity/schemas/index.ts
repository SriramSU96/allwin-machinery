// sanity/schemas/category.ts
import { defineType, defineField } from "sanity";

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
});

// sanity/schemas/brand.ts
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
});

// sanity/schemas/testimonial.ts
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Role / Occupation", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "message", title: "Testimonial Message", type: "text", validation: (R) => R.required() }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (R) => R.min(1).max(5) }),
    defineField({ name: "image", title: "Customer Photo", type: "image", options: { hotspot: true } }),
  ],
});

// sanity/schemas/blogPost.ts
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
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "seo", title: "SEO", type: "object",
      fields: [
        { name: "title", type: "string", title: "Meta Title" },
        { name: "description", type: "text", title: "Meta Description" },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});

// sanity/schemas/author.ts
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
  ],
});

// sanity/schemas/faq.ts
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
});

// sanity/schemas/siteSettings.ts
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp Number (with country code)", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text" }),
    defineField({ name: "workingHours", title: "Working Hours", type: "string" }),
    defineField({
      name: "socialLinks", title: "Social Links", type: "object",
      fields: [
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "youtube", type: "url", title: "YouTube" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
      ],
    }),
    // ─── Homepage Hero Section ────────────────────────
    defineField({
      name: "hero",
      title: "Homepage Hero Section",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "badge", title: "Badge Text (top pill)", type: "string", initialValue: "Powering Modern Agriculture" }),
        defineField({ name: "headingLine1", title: "Heading — Line 1", type: "string", initialValue: "Powerful Machines" }),
        defineField({ name: "headingLine2Prefix", title: "Heading — Line 2 (normal part)", type: "string", initialValue: "for " }),
        defineField({ name: "headingLine2Highlight", title: "Heading — Line 2 (gold highlight)", type: "string", initialValue: "Modern Farming" }),
        defineField({ name: "subtitle", title: "Subtitle (normal part)", type: "text", initialValue: "High-performance agricultural machinery built for farmers who demand" }),
        defineField({ name: "subtitleHighlight", title: "Subtitle (bold white part)", type: "string", initialValue: "reliability, power & precision." }),
        defineField({
          name: "backgroundImage",
          title: "Background Image URL (Cloudinary)",
          type: "url",
          description: "Recommended: 1600px wide with w_1600,q_auto,f_auto transformations",
        }),
        defineField({ name: "primaryButtonText", title: "Primary Button Text", type: "string", initialValue: "Explore Products" }),
        defineField({ name: "primaryButtonLink", title: "Primary Button Link", type: "string", initialValue: "/products" }),
        defineField({ name: "whatsappButtonText", title: "WhatsApp Button Text", type: "string", initialValue: "WhatsApp Inquiry" }),
        defineField({ name: "whatsappMessage", title: "WhatsApp Pre-filled Message", type: "text", initialValue: "Hi! I want to make a WhatsApp inquiry about your machinery." }),
      ],
    }),
  ],
  preview: { select: { title: "siteName" } },
});


// sanity/schemas/dealer.ts
export const dealer = defineType({
  name: "dealer",
  title: "Dealer",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Dealer / Store Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "location", title: "Location / Address", type: "text", validation: (R) => R.required() }),
    defineField({ name: "state", title: "State", type: "string" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({
      name: "coordinates",
      title: "Map Coordinates",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "state" } },
});
