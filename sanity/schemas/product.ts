// sanity/schemas/product.ts
import { defineType, defineField } from "sanity";

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
    defineField({ name: "brochureUrl", title: "Brochure PDF URL (Cloudinary)", type: "url" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number (override)", type: "string" }),
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
