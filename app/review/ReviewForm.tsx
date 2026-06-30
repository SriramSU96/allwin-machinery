"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, SITE_CONFIG } from "@/lib/utils";
import { cn } from "@/lib/utils";

const schema = z.object({
  name:     z.string().min(2, "Enter your full name"),
  role:     z.string().min(2, "Enter your occupation"),
  location: z.string().min(2, "Enter your city and state"),
  product:  z.string().min(1, "Select a product"),
  rating:   z.number().min(1, "Please give a rating").max(5),
  message:  z.string().min(20, "Please write at least 20 characters"),
  phone:    z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PRODUCTS = [
  "Power Weeder NB-85D",
  "Power Weeder 7HP Premium",
  "Brushcutter FS 3001",
  "Neptune Chainsaw CS-62M",
  "Bharat Gold Battery Sprayer 16L",
  "Farm Boxer Power Sprayer",
  "Agrifarma Earth Auger 52CC",
  "Balwaan Water Pump WP-33R",
  "Electric HTP Sprayer",
  "Gasoline HTP Sprayer",
  "Other Product",
];

export function ReviewForm() {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 0 },
  });

  const rating = watch("rating");

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");

    try {
      // Submit to Sanity via API route
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Submission failed");

      setSubmitted(true);
    } catch (err: unknown) {
      setError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={56} className="text-brand-green mx-auto mb-4" />
        <h3 className="font-heading font-bold text-xl text-brand-text mb-2">
          Thank You for Your Review! 🎉
        </h3>
        <p className="text-gray-500 text-sm mb-2">
          Your review has been submitted successfully.
        </p>
        <p className="text-gray-500 text-xs mb-6">
          It will appear on our website after a quick review by our team.
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="/"
            className="btn bg-brand-green text-white px-6 py-3 text-sm hover:bg-brand-gold"
          >
            Back to Homepage
          </a>
          <a
            href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I just submitted a review on your website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#0d7a3a] text-white px-6 py-3 text-sm flex items-center gap-2"
          >
            <MessageCircle size={15} /> WhatsApp Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-heading font-semibold text-brand-text mb-2">
          Your Rating *
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue("rating", star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              aria-label={`Rate ${star} out of 5 stars`}
              aria-pressed={star <= rating}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={cn(
                  "transition-colors",
                  star <= (hoveredStar || rating)
                    ? "text-brand-gold fill-brand-gold"
                    : "text-gray-300"
                )}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-gray-500 self-center">
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </span>
          )}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
        )}
      </div>

      {/* Name + Role */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-semibold text-gray-600 mb-1">
            Full Name *
          </label>
          <input
            {...register("name")}
            placeholder="e.g. Ramesh Kumar"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-heading font-semibold text-gray-600 mb-1">
            Occupation *
          </label>
          <input
            {...register("role")}
            placeholder="e.g. Paddy Farmer"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
          />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>
      </div>

      {/* Location + Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-semibold text-gray-600 mb-1">
            Location *
          </label>
          <input
            {...register("location")}
            placeholder="e.g. Trichy, Tamil Nadu"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-heading font-semibold text-gray-600 mb-1">
            Phone (Optional)
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="e.g. +91 96003 64685"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green"
          />
        </div>
      </div>

      {/* Product */}
      <div>
        <label htmlFor="review-product" className="block text-xs font-heading font-semibold text-gray-600 mb-1">
          Product You Purchased *
        </label>
        <select
          id="review-product"
          {...register("product")}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green bg-white text-gray-600"
        >
          <option value="">Select product...</option>
          {PRODUCTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product.message}</p>}
      </div>

      {/* Review message */}
      <div>
        <label className="block text-xs font-heading font-semibold text-gray-600 mb-1">
          Your Review *
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Tell us about your experience with the product and our service..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-green resize-none"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        <p className="text-xs text-gray-500 mt-1">Minimum 20 characters</p>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn w-full bg-brand-green text-white py-3.5 text-sm hover:bg-brand-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting...</>
        ) : (
          "⭐ Submit My Review"
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Reviews are moderated and appear on our website within 24 hours.
      </p>
    </form>
  );
}
