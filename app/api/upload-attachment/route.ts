// app/api/upload-attachment/route.ts
//
// Accepts a single file from a form (Dealer or Contact page), uploads it
// to Sanity's asset store, and returns a public URL. This keeps file
// uploads completely free — no paid Formspree plan needed — since the
// file lives in Sanity (which we already pay for/use) instead.
//
// The calling form then sends that URL as a normal text field to
// Formspree, so the inquiry email includes a working download link.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB — generous for PDFs/images, keeps abuse in check
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Basic in-memory rate limiting — same pattern as /api/submit-review.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
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
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many uploads. Please try again later." },
        { status: 429 }
      );
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const token = process.env.SANITY_API_TOKEN;
    if (!projectId || !token) {
      console.error("Missing Sanity project ID or API token for uploads");
      return NextResponse.json(
        { error: "Server misconfigured. Please contact support." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 10 MB." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF, Word document, or image." },
        { status: 400 }
      );
    }

    const client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token,
    });

    const buffer = Buffer.from(await file.arrayBuffer());

    const asset = await client.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({
      success: true,
      url: asset.url,
      filename: file.name,
    });
  } catch (error: unknown) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}