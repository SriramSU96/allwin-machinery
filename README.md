# all — Frontend Development Kit

> Production-ready Next.js 14 website for all  
> Built with: Next.js 14 · TypeScript · Tailwind CSS · Sanity CMS · Cloudinary · Vercel

---

## 📁 Project Structure

```
allwin-machinery/
├── app/                          # Next.js App Router pages
│   ├── (home)/page.tsx           # Homepage (all sections assembled)
│   ├── products/
│   │   ├── page.tsx              # Product listing with filters
│   │   └── [slug]/page.tsx       # Product detail page
│   ├── categories/[slug]/        # Category pages
│   ├── brands/[slug]/            # Brand pages
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact + form
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Blog detail
│   ├── services/page.tsx         # Services page
│   ├── catalog/page.tsx          # Catalog downloads
│   ├── faq/page.tsx              # FAQ accordion
│   ├── dealer/page.tsx           # Dealer inquiry
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # robots.txt
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky navbar, dropdown, mobile drawer
│   │   └── Footer.tsx            # Full footer with links
│   ├── sections/
│   │   ├── HeroSection.tsx       # Cinematic hero with stats
│   │   ├── TrustedBrandsStrip.tsx # Auto-scrolling brand marquee
│   │   ├── CategoriesGrid.tsx    # 8-category grid
│   │   ├── FeaturedProducts.tsx  # Embla carousel
│   │   ├── WhyChooseUs.tsx       # 6 pillars + animated stats
│   │   ├── Testimonials.tsx      # Review carousel
│   │   ├── BlogPreview.tsx       # Featured + 3 recent posts
│   │   └── CTABanner.tsx         # Call/WhatsApp/Download CTA
│   ├── cards/
│   │   └── ProductCard.tsx       # Product card with hover, badge, WhatsApp
│   ├── ui/
│   │   ├── PageHero.tsx          # Reusable page hero w/ breadcrumbs
│   │   ├── WhatsAppFloat.tsx     # Floating pulse button
│   │   ├── CountUpStat.tsx       # Animated count-up on scroll
│   │   └── Skeleton.tsx          # Shimmer loading placeholders
│   └── animations/
│       └── SectionReveal.tsx     # Scroll-triggered fade-up
│
├── lib/
│   ├── sanity.ts                 # Sanity client + image URL builder
│   ├── queries.ts                # All GROQ queries
│   └── utils.ts                  # Utilities, site config, nav items
│
├── types/
│   └── index.ts                  # All TypeScript interfaces
│
├── sanity/schemas/
│   ├── product.ts                # Product schema
│   └── index.ts                  # All other schemas
│
├── styles/
│   └── globals.css               # Global CSS, animations, variables
│
├── .env.local.example            # Environment variable template
├── tailwind.config.ts            # Full design token configuration
└── next.config.ts                # Next.js configuration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.local.example .env.local
# Fill in your Sanity, Cloudinary, Formspree, and GA values
```

### 3. Set Up Sanity CMS
```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Initialize a new Sanity project
cd sanity
sanity init

# Copy schemas from sanity/schemas/ into your Sanity studio
# Deploy the studio
sanity deploy
```

### 4. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Vercel
```bash
# Connect your GitHub repo to Vercel
# Add all environment variables in Vercel dashboard
# Push to main branch → auto-deploys
```

---

## 🎨 Brand Design System

| Token | Value | Usage |
|-------|-------|-------|
| `brand-green` | `#1F4D3A` | Primary, buttons, accents |
| `brand-gold` | `#D4A017` | CTAs, highlights, badges |
| `brand-dark` | `#121212` | Hero, navbar, footer |
| `brand-white` | `#F8F8F6` | Page background |
| `brand-text` | `#2B2B2B` | Body text |
| `brand-light-gray` | `#F0F0EE` | Section backgrounds |

**Fonts:** Montserrat (headings) · Inter (body)

---

## 📋 Sanity CMS Collections

| Collection | Purpose |
|------------|---------|
| `product` | All machinery products |
| `category` | Product categories |
| `brand` | Authorized brands |
| `blogPost` | Blog articles |
| `author` | Blog authors |
| `testimonial` | Customer reviews |
| `faq` | FAQ entries |
| `siteSettings` | Global site config |

---

## ⚡ Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 85 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

---

## 🔧 Pages Implemented

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | ✅ |
| Products Listing | `/products` | ✅ |
| Product Detail | `/products/[slug]` | ✅ |
| About | `/about` | ✅ |
| Contact | `/contact` | ✅ |
| Blog Listing | `/blog` | ✅ |
| FAQ | `/faq` | ✅ |
| 404 | `not-found` | ✅ |
| Sitemap | `/sitemap.xml` | ✅ |
| robots.txt | `/robots.txt` | ✅ |

---

## 📦 Key Dependencies

- `next` 14 — SSR, App Router, Metadata API
- `tailwindcss` — Utility-first styling
- `gsap` / `framer-motion` — Animations
- `next-sanity` — CMS integration
- `embla-carousel-react` — Product/testimonial carousels
- `react-hook-form` + `zod` — Form validation
- `react-intersection-observer` — Scroll-triggered animations
- `lucide-react` — Icon set

---

## 📞 Support

all · Trichy, Tamil Nadu  
📞 +91 96003 64685 · 📧 info@allwinmachinery.com

---

*Built with  for allwin*
