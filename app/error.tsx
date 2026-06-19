"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console (and to your monitoring service if you add one later)
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-white flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="font-heading font-black text-2xl md:text-3xl text-brand-text mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        We hit a snag loading this page. Please try again, or reach out to our
        team if the problem continues.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <button
          onClick={reset}
          className="btn bg-brand-green text-white px-5 py-3 text-sm flex items-center gap-2 hover:bg-brand-gold"
        >
          <RotateCcw size={16} />
          Try Again
        </button>
        <Link
          href="/"
          className="btn border-2 border-brand-green text-brand-green px-5 py-3 text-sm hover:bg-brand-green hover:text-white"
        >
          Go to Homepage
        </Link>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <a 
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex items-center gap-1.5 text-gray-500 hover:text-brand-green"
        >
          <Phone size={14} /> Call Us
        </a>
        <span className="text-gray-300">|</span>
        <a 
          href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi, I ran into an error on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-500 hover:text-brand-green"
        >
          <MessageCircle size={14} /> WhatsApp Support
        </a>
      </div>
    </div>
  );
}