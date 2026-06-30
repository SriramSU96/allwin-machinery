"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/utils";
import { Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { FileUploadField } from "@/components/forms/FileUploadField";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  productInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const PRODUCT_OPTIONS = [
  "Power Weeder",
  "Power Sprayer",
  "Motor Pump",
  "Brush Cutter",
  "Water Pump",
  "Fogging Machine",
  "Agri Tools",
  "Spare Parts",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError("");

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      if (!endpoint) throw new Error("Form endpoint not configured");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          attachmentUrl: attachmentUrl || "None",
          attachmentName: attachmentName || "None",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try WhatsApp or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={48} className="text-brand-gold mx-auto mb-4" />
        <h3 className="font-heading font-bold text-lg text-white mb-2">
          Inquiry Received!
        </h3>
        <p className="text-white/60 text-sm mb-6">
          Thank you for contacting us. Our team will reach out within 24 hours.
        </p>
        <a 
          href={buildWhatsAppUrl(
            SITE_CONFIG.whatsapp,
            "Hi! I just submitted an inquiry on your website."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-[#0d7a3a] text-white px-6 py-3 text-sm inline-flex items-center gap-2"
        >
          <MessageCircle size={16} />
          Also chat on WhatsApp
        </a>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-brand-gold transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            {...register("name")}
            placeholder="Your Name *"
            className={inputClasses}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone Number *"
            className={inputClasses}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email Address *"
          className={inputClasses}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="productInterest" className="sr-only">Product Interest</label>
        <select
          id="productInterest"
          {...register("productInterest")}
          className={`${inputClasses} appearance-none`}
        >
          <option value="" className="text-brand-text">Product Interest (Optional)</option>
          {PRODUCT_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="text-brand-text">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Your Message *"
          rows={4}
          className={`${inputClasses} resize-none`}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <FileUploadField
        label="Attach a file (optional)"
        dark
        onUploaded={(url, filename) => {
          setAttachmentUrl(url);
          setAttachmentName(filename);
        }}
      />

      {error && (
        <p className="text-red-300 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="btn flex-1 bg-brand-green text-white py-3.5 text-sm hover:bg-brand-gold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            "📤 Send Inquiry"
          )}
        </button>
        <a 
          href={buildWhatsAppUrl(
            SITE_CONFIG.whatsapp,
            `Hi! I want to inquire about ${getValues("productInterest") || "your machinery"}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-[#0d7a3a] text-white px-5 py-3.5 text-sm flex items-center gap-2"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </form>
  );
}