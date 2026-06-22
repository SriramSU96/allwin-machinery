// app/api/revalidate/route.ts
//
// Sanity Studio calls this endpoint automatically whenever a document is
// published, via a webhook configured in the Sanity dashboard (see setup
// instructions below). This makes edits in Studio appear on the live site
// within seconds, instead of waiting for the hourly ISR timer.
//
// ── ONE-TIME SETUP (do this in Sanity's dashboard, not in code) ──
// 1. Go to https://www.sanity.io/manage → select your project
// 2. Go to API → Webhooks → "Create webhook"
// 3. Name: "Next.js revalidate"
// 4. URL: https://YOUR-DOMAIN.com/api/revalidate
// 5. Dataset: production (or whichever you use)
// 6. Trigger on: Create, Update, Delete (check all three)
// 7. Filter: leave blank (revalidate on any document change)
// 8. Projection: leave blank — defaults to the whole document, which is fine
// 9. HTTP method: POST
// 10. API version: v2021-03-25 (or leave default)
// 11. Secret: generate a long random string (e.g. run
//     `openssl rand -hex 32` in your terminal) and paste it here.
//     Then add the SAME value as SANITY_REVALIDATE_SECRET in your
//     .env.local AND in Vercel's environment variables.
// 12. Save. Sanity will now POST to this route on every publish.

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

// Maps each Sanity document _type to the cache tag(s) used when fetching
// that content, plus any specific page paths worth revalidating directly.
const TYPE_TO_TAGS: Record<string, string[]> = {
  product: ["products"],
  category: ["categories"],
  brand: ["brands"],
  blogPost: ["blogPosts"],
  testimonial: ["testimonials"],
  faq: ["faqs"],
  dealer: ["dealers"],
  siteSettings: ["siteSettings"],
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      console.error("Missing SANITY_REVALIDATE_SECRET env var");
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const signature = req.headers.get(SIGNATURE_HEADER_NAME);
    const rawBody = await req.text();

    if (!signature || !(await isValidSignature(rawBody, signature, secret))) {
      console.warn("Rejected webhook: invalid or missing signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody) as {
      _type?: string;
      slug?: { current?: string };
    };

    const docType = body._type;
    if (!docType) {
      return NextResponse.json(
        { error: "Missing _type in payload" },
        { status: 400 }
      );
    }

    const tags = TYPE_TO_TAGS[docType];
    if (!tags) {
      // Unknown/unhandled document type — nothing to revalidate, but
      // don't error out, since Sanity will retry on non-2xx responses.
      return NextResponse.json({ revalidated: false, reason: "untracked type" });
    }

    tags.forEach((tag) => revalidateTag(tag));

    // Also revalidate the specific detail page if we have a slug, so an
    // edit to one product doesn't wait on tag propagation across routes.
    const slug = body.slug?.current;
    if (slug) {
      const pathByType: Record<string, string> = {
        product: `/products/${slug}`,
        category: `/categories/${slug}`,
        brand: `/brands/${slug}`,
        blogPost: `/blog/${slug}`,
      };
      const path = pathByType[docType];
      if (path) revalidatePath(path);
    }

    // Home page surfaces featured products/categories/brands/posts, so
    // keep it fresh whenever any of those content types change.
    revalidatePath("/");

    return NextResponse.json({ revalidated: true, tags, type: docType });
  } catch (error: unknown) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}