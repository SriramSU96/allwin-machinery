import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { WishlistProvider } from "@/components/providers/WishlistProvider";
import { SITE_CONFIG } from "@/lib/utils";
import { sanityFetch } from "@/lib/sanity";
import { CATEGORIES_QUERY } from "@/lib/queries";
import type { Category } from "@/types";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "agricultural machinery",
    "power weeder",
    "motor pump",
    "brush cutter",
    "power sprayer",
    "farming equipment",
    "Trichy",
    "Tamil Nadu",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await sanityFetch<Category[]>(CATEGORIES_QUERY, {}, ["categories"]).catch((error) => {
    console.error("Failed to fetch categories for navbar:", error);
    return [] as Category[];
  });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "Trichy",
      addressRegion: "Tamil Nadu",
      postalCode: "620001",
      addressCountry: "IN",
    },
    openingHours: "Mo-Sa 09:00-18:00",
    priceRange: "₹₹",
  };

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <body className="bg-brand-white text-brand-text antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <WishlistProvider>
          <Navbar categories={categories} />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </WishlistProvider>
      </body>
    </html>
  );
}