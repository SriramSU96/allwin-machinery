#!/usr/bin/env node
/**
 * scripts/download-fonts.js
 * Run once: node scripts/download-fonts.js
 * Downloads Montserrat + Inter woff2 files into /public/fonts/
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "../public/fonts");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Google Fonts CSS2 API returns @font-face blocks with woff2 src URLs
const FONT_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap";

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { "User-Agent": "Mozilla/5.0", ...headers } };
    https.get(url, opts, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location, headers));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function main() {
  console.log("Fetching font CSS...");
  const css = (await get(FONT_CSS_URL)).toString();

  // Extract: family name + weight + woff2 URL
  const re = /font-family:\s*'([^']+)'[^}]*font-weight:\s*(\d+)[^}]*src:[^}]*url\((https:\/\/[^)]+\.woff2)\)/g;
  const fonts = [];
  let m;
  while ((m = re.exec(css)) !== null) {
    fonts.push({ family: m[1], weight: m[2], url: m[3] });
  }

  if (!fonts.length) {
    console.error("No fonts found in CSS. Check the regex or the CSS output.");
    process.exit(1);
  }

  for (const f of fonts) {
    const filename = `${f.family.toLowerCase().replace(/\s+/g, "-")}-${f.weight}.woff2`;
    const dest = path.join(OUTPUT_DIR, filename);
    if (fs.existsSync(dest)) {
      console.log(`  already exists: ${filename}`);
      continue;
    }
    console.log(`  downloading: ${filename}`);
    const buf = await get(f.url);
    fs.writeFileSync(dest, buf);
    console.log(`  saved: ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  console.log("\nDone! All fonts saved to /public/fonts/");
  console.log("Commit these files so next/font/local can load them at build time.");
}

main().catch((err) => { console.error(err); process.exit(1); });
