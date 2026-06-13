// app/api/submit-review/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, location, product, rating, message, phone } = body;

    // Validate required fields
    if (!name || !role || !location || !product || !rating || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create testimonial in Sanity as DRAFT (pending approval)
    const doc = await client.create({
      _type: "testimonial",
      name,
      role,
      location,
      message: `[Product: ${product}] ${message}`,
      rating: Number(rating),
      // Store as draft — admin approves before publishing
      _id: `drafts.review-${Date.now()}`,
    });

    return NextResponse.json(
      { success: true, id: doc._id },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
