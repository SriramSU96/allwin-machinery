// app/api/submit-review/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { z } from "zod";
import { isRateLimited } from "@/lib/rateLimit";

// ── Validation ─────────────────────────────────────────────────────────────
const reviewSchema = z.object({
  name:     z.string().trim().min(2).max(80),
  role:     z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(80),
  product:  z.string().trim().min(1).max(120),
  rating:   z.coerce.number().int().min(1).max(5),
  message:  z.string().trim().min(10).max(1000),
  phone:    z.string().trim().max(20).optional(),
});

export async function POST(req: NextRequest) {
  try {
    // ── Rate limit (5 per 10 min per IP) ───────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (await isRateLimited(ip, "submit-review", 5, 10 * 60)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // ── Env check ──────────────────────────────────────────────────────
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) {
      console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID env var");
      return NextResponse.json(
        { error: "Server misconfigured. Please contact support." },
        { status: 500 }
      );
    }

    // ── Parse + validate body ──────────────────────────────────────────
    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = reviewSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, role, location, product, rating, message } = parsed.data;

    // ── Write to Sanity as DRAFT (pending admin approval) ──────────────
    const client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });

    const doc = await client.create({
      _type: "testimonial",
      name,
      role,
      location,
      message: `[Product: ${product}] ${message}`,
      rating,
      _id: `drafts.review-${Date.now()}`,
    });

    return NextResponse.json({ success: true, id: doc._id }, { status: 200 });
  } catch (error: unknown) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
