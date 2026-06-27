// app/api/submit-dealer/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { z } from "zod";
import { isRateLimited } from "@/lib/rateLimit";
import { sendDealerNotification } from "@/lib/email";

const dealerSchema = z.object({
  name:         z.string().trim().min(2).max(80),
  businessName: z.string().trim().min(2).max(120),
  location:     z.string().trim().min(2).max(120),
  state:        z.string().trim().min(2).max(60),
  phone:        z.string().trim().min(10).max(15),
  email:        z.string().email().optional().or(z.literal("")),
  experience:   z.string().trim().max(100).optional(),
  message:      z.string().trim().max(500).optional(),
  attachmentUrl: z.string().url().optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  try {
    // ── Rate limit (3 per 10 min per IP) ───────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (await isRateLimited(ip, "submit-dealer", 3, 10 * 60)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // ── Parse + validate ───────────────────────────────────────────────
    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = dealerSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, businessName, location, state, phone, email, experience, message } = parsed.data;

    // ── Save to Sanity as draft ────────────────────────────────────────
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (projectId) {
      const client = createClient({
        projectId,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        apiVersion: "2024-01-01",
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
      });

      await client.create({
        _type: "dealer",
        name,
        businessName,
        location,
        state,
        phone,
        email,
        experience,
        message,
        _id: `drafts.dealer-${Date.now()}`,
      }).catch((err) => console.error("Sanity dealer save failed:", err));
    }

    // ── Send email notification ────────────────────────────────────────
    sendDealerNotification({ name, businessName, location, state, phone, email, experience, message })
      .catch((err) => console.error("Dealer email notification failed:", err));

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Dealer submission error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
