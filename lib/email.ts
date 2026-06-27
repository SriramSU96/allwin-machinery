/**
 * lib/email.ts
 * Nodemailer + Gmail — sends notification emails when forms are submitted.
 *
 * Required env vars:
 *   GMAIL_USER          — Gmail address used to SEND (e.g. yourname@gmail.com)
 *   GMAIL_APP_PASSWORD  — 16-digit Google App Password (not your normal password)
 *   NOTIFICATION_EMAIL  — Where to RECEIVE notifications (e.g. info@allwinmachinery.com)
 */

import nodemailer from "nodemailer";

// ── Transporter ────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

// ── Brand styles (shared across all templates) ─────────────────────────────
const BRAND = {
  green:     "#1F4D3A",
  gold:      "#D4A017",
  dark:      "#121212",
  white:     "#F8F8F6",
  text:      "#2B2B2B",
  lightGray: "#F0F0EE",
};

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Allwin Machinery Notification</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.lightGray};font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.lightGray};padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:${BRAND.green};padding:28px 36px;">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:0.5px;">
              🌾 Allwin Machinery
            </h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
              Admin Notification
            </p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:32px 36px;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${BRAND.lightGray};padding:20px 36px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;color:#888;font-size:12px;text-align:center;">
              This is an automated notification from 
              <a href="https://allwinmachinery.com" style="color:${BRAND.green};">allwinmachinery.com</a>
              <br/>TVS Toll Gate, Trichy, Tamil Nadu — 620001
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.lightGray};">
      <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">${label}</span><br/>
      <span style="color:${BRAND.text};font-size:15px;font-weight:600;">${value || "—"}</span>
    </td>
  </tr>`;
}

function badge(text: string, color: string): string {
  return `<span style="display:inline-block;background:${color};color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;">${text}</span>`;
}

// ── 1. Review Notification ─────────────────────────────────────────────────
export interface ReviewEmailData {
  name:     string;
  role:     string;
  location: string;
  product:  string;
  rating:   number;
  message:  string;
  phone?:   string;
}

export async function sendReviewNotification(data: ReviewEmailData) {
  const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);

  const content = `
    <h2 style="margin:0 0 4px;color:${BRAND.green};font-size:20px;">⭐ New Review Submitted</h2>
    <p style="margin:0 0 24px;color:#888;font-size:13px;">A customer has submitted a review. Please approve or reject it in Sanity Studio.</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Customer Name", data.name)}
      ${fieldRow("Role / Designation", data.role)}
      ${fieldRow("Location", data.location)}
      ${fieldRow("Product Reviewed", data.product)}
      ${fieldRow("Phone", data.phone || "Not provided")}
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BRAND.lightGray};">
          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Rating</span><br/>
          <span style="color:${BRAND.gold};font-size:20px;">${stars}</span>
          <span style="color:${BRAND.text};font-size:14px;margin-left:8px;">${data.rating}/5</span>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;">
          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Review Message</span><br/>
          <p style="margin:8px 0 0;color:${BRAND.text};font-size:15px;line-height:1.6;background:${BRAND.lightGray};padding:16px;border-radius:8px;border-left:4px solid ${BRAND.gold};">
            "${data.message}"
          </p>
        </td>
      </tr>
    </table>

    <div style="margin-top:28px;text-align:center;">
      <a href="https://allwin-machinery.sanity.studio" 
         style="display:inline-block;background:${BRAND.green};color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">
        ✅ Review in Sanity Studio
      </a>
    </div>`;

  const transporter = createTransporter();
  await transporter.sendMail({
    from:    `"Allwin Machinery" <${process.env.GMAIL_USER}>`,
    to:      process.env.NOTIFICATION_EMAIL,
    subject: `⭐ New Review from ${data.name} — ${stars} (${data.rating}/5)`,
    html:    emailWrapper(content),
  });
}

// ── 2. Dealer Application Notification ────────────────────────────────────
export interface DealerEmailData {
  name:         string;
  businessName: string;
  location:     string;
  state:        string;
  phone:        string;
  email?:       string;
  experience?:  string;
  message?:     string;
}

export async function sendDealerNotification(data: DealerEmailData) {
  const content = `
    <h2 style="margin:0 0 4px;color:${BRAND.green};font-size:20px;">🤝 New Dealer Application</h2>
    <p style="margin:0 0 24px;color:#888;font-size:13px;">Someone has applied to become an Allwin Machinery dealer. Review their details below.</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Contact Person", data.name)}
      ${fieldRow("Business Name", data.businessName)}
      ${fieldRow("Location", data.location)}
      ${fieldRow("State", data.state)}
      ${fieldRow("Phone", data.phone)}
      ${fieldRow("Email", data.email || "Not provided")}
      ${fieldRow("Years of Experience", data.experience || "Not specified")}
      ${data.message ? fieldRow("Additional Message", data.message) : ""}
    </table>

    <div style="margin-top:24px;padding:16px;background:${BRAND.lightGray};border-radius:8px;">
      <p style="margin:0;color:${BRAND.text};font-size:13px;">
        📞 <strong>Quick Action:</strong> Call them at 
        <a href="tel:${data.phone}" style="color:${BRAND.green};font-weight:700;">${data.phone}</a>
        or WhatsApp at
        <a href="https://wa.me/91${data.phone.replace(/\D/g, '')}" style="color:${BRAND.green};font-weight:700;">wa.me link</a>
      </p>
    </div>

    <div style="margin-top:28px;text-align:center;">
      <a href="https://allwin-machinery.sanity.studio"
         style="display:inline-block;background:${BRAND.green};color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">
        📋 View in Sanity Studio
      </a>
    </div>`;

  const transporter = createTransporter();
  await transporter.sendMail({
    from:    `"Allwin Machinery" <${process.env.GMAIL_USER}>`,
    to:      process.env.NOTIFICATION_EMAIL,
    subject: `🤝 New Dealer Application — ${data.businessName}, ${data.state}`,
    html:    emailWrapper(content),
  });
}

// ── 3. Contact Form Notification ──────────────────────────────────────────
export interface ContactEmailData {
  name:    string;
  email:   string;
  phone:   string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: ContactEmailData) {
  const content = `
    <h2 style="margin:0 0 4px;color:${BRAND.green};font-size:20px;">📩 New Contact Form Submission</h2>
    <p style="margin:0 0 24px;color:#888;font-size:13px;">A visitor has submitted the contact form on allwinmachinery.com</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Name", data.name)}
      ${fieldRow("Email", data.email)}
      ${fieldRow("Phone", data.phone)}
      ${fieldRow("Subject", data.subject)}
      <tr>
        <td style="padding:10px 0;">
          <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Message</span><br/>
          <p style="margin:8px 0 0;color:${BRAND.text};font-size:15px;line-height:1.6;background:${BRAND.lightGray};padding:16px;border-radius:8px;border-left:4px solid ${BRAND.green};">
            ${data.message}
          </p>
        </td>
      </tr>
    </table>

    <div style="margin-top:24px;padding:16px;background:${BRAND.lightGray};border-radius:8px;text-align:center;">
      <a href="mailto:${data.email}" style="color:${BRAND.green};font-weight:700;text-decoration:none;margin-right:24px;">
        📧 Reply via Email
      </a>
      <a href="tel:${data.phone}" style="color:${BRAND.green};font-weight:700;text-decoration:none;">
        📞 Call Now
      </a>
    </div>`;

  const transporter = createTransporter();
  await transporter.sendMail({
    from:    `"Allwin Machinery" <${process.env.GMAIL_USER}>`,
    to:      process.env.NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `📩 Contact: ${data.subject} — ${data.name}`,
    html:    emailWrapper(content),
  });
}
