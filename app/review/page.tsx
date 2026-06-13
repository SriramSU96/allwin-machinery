// app/review/page.tsx
import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ReviewForm } from "./ReviewForm";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Write a Review | Allwin Machinery",
  description: "Share your experience with Allwin Machinery products and services.",
};

const BENEFITS = [
  { emoji: "⭐", text: "Help other farmers choose the right machine" },
  { emoji: "🌾", text: "Your review appears on our website" },
  { emoji: "🙏", text: "We value every customer feedback" },
  { emoji: "💬", text: "Takes only 2 minutes to complete" },
];

export default function ReviewPage() {
  return (
    <>
      <PageHero
        label="Customer Reviews"
        title="Share Your"
        titleHighlight="Experience"
        description="Tell us about your experience with Allwin Machinery products and services."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Write a Review" }]}
      />

      <section className="bg-[#F5F5F5] py-16 px-4">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Why review */}
            <div className="lg:col-span-1">
              <h2 className="font-heading font-bold text-xl text-brand-text mb-6">
                Why Your Review Matters
              </h2>

              <div className="space-y-4 mb-8">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200">
                    <span className="text-2xl">{b.emoji}</span>
                    <p className="text-sm text-gray-600">{b.text}</p>
                  </div>
                ))}
              </div>

              {/* Star rating display */}
              <div className="bg-brand-green rounded-2xl p-6 text-center">
                <div className="flex justify-center gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={24} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="font-heading font-black text-white text-2xl mb-1">4.9/5</p>
                <p className="text-white/70 text-sm">Average rating from</p>
                <p className="text-white font-bold text-sm">5000+ happy customers</p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-soft p-6 md:p-8">
                <h2 className="font-heading font-bold text-xl text-brand-text mb-2">
                  Write Your Review
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Share your honest feedback. It helps us improve and helps other farmers!
                </p>
                <ReviewForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
