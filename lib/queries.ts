// lib/queries.ts — all GROQ queries in one place

export const PRODUCTS_QUERY = `*[_type == "product"] | order(featured desc, _createdAt desc) {
  _id, name, slug, price, badge, inStock, featured,
  "category": category->{ _id, name, slug },
  "brand": brand->{ _id, name, slug },
  images, specs, description,
  seo
}`;

export const FEATURED_PRODUCTS_QUERY = 
  `*[_type == "product"] | order(featured desc, _createdAt desc)[0..49] {
  _id, name, slug, price, badge, inStock,
  "category": category->{ _id, name, slug },
  "brand": brand->{ _id, name },
  images, specs
}`

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id, name, slug, price, badge, inStock, featured,
  description, features, warranty, brochureUrl, whatsappNumber,
  "category": category->{ _id, name, slug },
  "brand": brand->{ _id, name, slug, logo },
  images[], specs[], seo
}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && category->slug.current == $slug] | order(_createdAt desc) {
  _id, name, slug, price, badge, inStock,
  "category": category->{ _id, name, slug },
  "brand": brand->{ _id, name },
  images, specs
}`;

export const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc) {
  _id, name, slug, icon, image, description,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

export const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  _id, name, slug, icon, image, description
}`;

export const BRANDS_QUERY = `*[_type == "brand"] | order(featured desc, name asc) {
  _id, name, slug, logo, description, website, featured,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

export const BRAND_BY_SLUG_QUERY = `*[_type == "brand" && slug.current == $slug][0] {
  _id, name, slug, logo, description, website
}`;

export const PRODUCTS_BY_BRAND_QUERY = `*[_type == "product" && brand->slug.current == $slug] | order(_createdAt desc) {
  _id, name, slug, price, badge, inStock,
  "category": category->{ _id, name, slug },
  "brand": brand->{ _id, name, slug },
  images, specs
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc)[0..7] {
  _id, name, role, location, message, rating, image
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, excerpt, coverImage, category, publishedAt, readTime, featured,
  "author": author->{ name, image }
}`;

export const FEATURED_POST_QUERY = `*[_type == "blogPost" && featured == true][0] {
  _id, title, slug, excerpt, coverImage, category, publishedAt, readTime,
  "author": author->{ name, image }
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, excerpt, body, coverImage, category, publishedAt, readTime, tags,
  "author": author->{ name, image, bio },
  seo
}`;

export const FAQS_QUERY = `*[_type == "faq"] | order(category asc, order asc) {
  _id, question, answer, category
}`;

export const DEALERS_QUERY = `*[_type == "dealer"] | order(state asc) {
  _id, name, location, state, phone, coordinates
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  siteName, logo, phone, whatsapp, email, address, workingHours, socialLinks
}`;

export const RELATED_PRODUCTS_QUERY = `*[_type == "product" && category->_id == $categoryId && _id != $productId][0..3] {
  _id, name, slug, price,
  images,
  "category": category->{ name, slug }
}`;
