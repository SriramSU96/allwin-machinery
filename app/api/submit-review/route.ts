// app/api/submit-review/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { z } from "zod";

// --- Validation schema -----------------------------------------------
const reviewSchema = z.object({
  name: z.string().trim().min(2).max(80),
  role: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(80),
  product: z.string().trim().min(1).max(120),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(10).max(1000),
  phone: z.string().trim().max(20).optional(),
});

// --- Lightweight in-memory rate limiting -------------------------------
// NOTE: this resets on every server restart/redeploy and is per-instance,
// so it's a basic deterrent rather than a hard guarantee. For stronger
// protection at scale, move to a durable store (e.g. Upstash Redis).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  try {
    // --- Rate limit ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // --- Env check ---
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) {
      console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID env var");
      return NextResponse.json(
        { error: "Server misconfigured. Please contact support." },
        { status: 500 }
      );
    }

    // --- Parse + validate body ---
    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const parsed = reviewSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, role, location, product, rating, message } = parsed.data;

    const client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });

    // Create testimonial in Sanity as DRAFT (pending admin approval)
    const doc = await client.create({
      _type: "testimonial",
      name,
      role,
      location,
      message: `[Product: ${product}] ${message}`,
      rating,
      _id: `drafts.review-${Date.now()}`,
    });

    return NextResponse.json(
      { success: true, id: doc._id },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}