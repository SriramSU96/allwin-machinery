"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { buildWhatsAppUrl, SITE_CONFIG } from "@/lib/utils";
import { Loader2, CheckCircle2, MessageCircle } from "lucide-react";

const schema = z.object({
  fullName:     z.string().min(2, "Enter your full name"),
  businessName: z.string().min(2, "Enter your business name"),
  mobile:       z.string().min(10, "Enter a valid mobile number"),
  email:        z.string().email("Enter a valid email"),
  city:         z.string().min(2, "Enter your city / state"),
  yearsInBusiness: z.string().min(1, "Select years in business"),
  interestedProducts: z.string().min(1, "Select a product category"),
  businessType: z.enum(["individual", "proprietorship", "partnership", "company"]),
  message:      z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PRODUCT_OPTIONS = [
  "Power Weeders", "Power Sprayers", "Motor Pumps",
  "Brush Cutters", "Water Pumps", "Spare Parts", "All Products",
];

export function DealerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { businessType: "proprietorship" },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      if (!endpoint) throw new Error("Form not configured");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formType: "Dealer Inquiry" }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={48} className="text-brand-gold mx-auto mb-4" />
        <h3 className="font-heading font-bold text-lg text-white mb-2">
          Application Submitted! 🎉
        </h3>
        <p className="text-white/60 text-sm mb-6">
          Thank you for your interest. Our dealer team will contact you within 24–48 hours.
        </p>
        <a
          href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, "Hi! I just submitted a dealer application on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-[#25D366] text-white px-6 py-3 text-sm inline-flex items-center gap-2 hover:bg-[#20ba5a] transition-colors"
        >
          <MessageCircle size={16} /> Also chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" id="dealer-form">

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input {...register("fullName")} placeholder="Full Name *"
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors" />
          {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <input {...register("businessName")} placeholder="Business Name *"
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors" />
          {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input {...register("mobile")} type="tel" placeholder="Mobile Number *"
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors" />
          {errors.mobile && <p className="text-red-400 text-xs mt-1">{errors.mobile.message}</p>}
        </div>
        <div>
          <input {...register("email")} type="email" placeholder="Email Address *"
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input {...register("city")} placeholder="City / State *"
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors" />
          {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <select {...register("yearsInBusiness")}
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/80 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors">
            <option value="" className="bg-brand-dark text-white/60">Years in Business *</option>
            <option value="new" className="bg-brand-dark text-white">New Business</option>
            <option value="1-2" className="bg-brand-dark text-white">1-2 Years</option>
            <option value="3-5" className="bg-brand-dark text-white">3-5 Years</option>
            <option value="5+" className="bg-brand-dark text-white">5+ Years</option>
          </select>
          {errors.yearsInBusiness && <p className="text-red-400 text-xs mt-1">{errors.yearsInBusiness.message}</p>}
        </div>
      </div>

      {/* Products */}
      <div>
        <select {...register("interestedProducts")}
          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/80 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors">
          <option value="" className="bg-brand-dark text-white/60">Interested in Products *</option>
          {PRODUCT_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-brand-dark text-white">{opt}</option>
          ))}
        </select>
        {errors.interestedProducts && <p className="text-red-400 text-xs mt-1">{errors.interestedProducts.message}</p>}
      </div>

      {/* Business type */}
      <div>
        <p className="text-xs font-heading font-semibold text-white/50 mb-2">Type of Business *</p>
        <div className="flex flex-wrap gap-3">
          {[
            { value: "individual", label: "Individual" },
            { value: "proprietorship", label: "Proprietorship" },
            { value: "partnership", label: "Partnership" },
            { value: "company", label: "Company" },
          ].map((type) => (
            <label key={type.value} className="flex items-center gap-2 cursor-pointer text-sm text-white/80 hover:text-white transition-colors">
              <input type="radio" value={type.value} {...register("businessType")} className="accent-brand-gold" />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <textarea {...register("message")} placeholder="Message / Additional Information (Optional)"
        rows={3}
        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold resize-none transition-colors" />

      {error && (
        <p className="text-red-400 text-sm bg-red-950/50 border border-red-500/20 px-4 py-3 rounded-xl">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button type="submit" disabled={submitting}
          className="btn flex-1 bg-brand-green text-white py-3 text-sm hover:bg-brand-gold disabled:opacity-60 flex items-center justify-center gap-2 transition-all">
          {submitting ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : "📤 Submit Inquiry"}
        </button>
        <a
          href={buildWhatsAppUrl(SITE_CONFIG.whatsapp, `Hi! I want to become an Allwin Machinery dealer in ${getValues("city") || "my area"}.`)}
          target="_blank" rel="noopener noreferrer"
          className="btn bg-[#25D366] text-white px-4 py-3 text-sm flex items-center gap-1.5 hover:bg-[#20ba5a] transition-all">
          <MessageCircle size={15} /> WhatsApp
        </a>
      </div>
    </form>
  );
}