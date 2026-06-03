import { SectionReveal } from "@/components/animations/SectionReveal";
import { Users, Package, Award, Wrench, Shield, Truck, Headphones, IndianRupee } from "lucide-react";

const PILLARS = [
  {
    icon: Shield,
    title: "100% Genuine Products",
    description: "Original & authentic products from top brands. Trusted quality with warranty.",
  },
  {
    icon: Package,
    title: "Top Quality Brands",
    description: "We deal with reliable and reputed brands for superior performance.",
  },
  {
    icon: Truck,
    title: "Fast & Safe Delivery",
    description: "Pan India delivery with safe and secure packaging.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Dedicated support from our knowledgeable team at every step.",
  },
  {
    icon: Wrench,
    title: "After Sales Service",
    description: "Reliable after sales service and spare parts support.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Best quality machinery at competitive prices.",
  },
];

const STATS = [
  { icon: Users, value: "5000+", label: "Happy Customers" },
  { icon: Package, value: "1500+", label: "Products" },
  { icon: Award, value: "20+", label: "Top Brands" },
  { icon: Wrench, value: "24/7", label: "Support" },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-[60px] md:py-[80px] lg:py-[100px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        
        {/* 12-Column Grid giving the stats box significantly more width allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Heading Area - Constrained to 4 columns to balance text into two lines */}
          <div className="lg:col-span-4 w-full">
            <SectionReveal>
              <p className="font-heading font-bold text-xs text-brand-green uppercase tracking-[3px] mb-3">
                Why Choose Us
              </p>
              <h2 className="font-heading font-bold text-[24px] md:text-[30px] lg:text-[34px] text-brand-text leading-[1.2] max-w-[360px] lg:max-w-none">
                Committed to Farmers,<br className="hidden lg:block" /> Committed to <span className="text-brand-green">Quality</span>
              </h2>
            </SectionReveal>
          </div>

          {/* Right: Expanded Stats Cards Box - Granted 8 full columns of layout width */}
          <div className="lg:col-span-8 w-full grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3">
            {STATS.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1}>
                {/* Clean matching structural layout using your original card color */}
                <div className="bg-brand-green px-4 sm:px-5 py-[22px] rounded-xl flex items-center gap-3 xl:gap-4 hover:shadow-lg transition-all duration-300 group h-full w-full min-w-0">
                  
                  {/* Circular icon layout matching the target badge frame */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-gold/15 rounded-full flex items-center justify-center flex-shrink-0 border border-brand-gold/20 group-hover:bg-brand-gold/25 transition-colors">
                    <stat.icon size={24} className="text-brand-gold" strokeWidth={1.5} />
                  </div>
                  
                  {/* Typography details alignment with protective text wrap container */}
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <span className="text-white font-bold text-lg sm:text-xl tracking-tight leading-none mb-1">
                      {stat.value}
                    </span>
                    <p className="text-brand-gold text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase leading-tight">
                      {stat.label}
                    </p>
                  </div>

                </div>
              </SectionReveal>
            ))}
          </div>

        </div>

        {/* Pillars grid */}
        <div className="mt-20">
          <SectionReveal>
            <h3 className="font-heading font-bold text-2xl text-brand-text mb-8">What Makes Us Different</h3>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <SectionReveal key={pillar.title} delay={i * 0.1}>
                <div className="flex gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-medium transition-shadow border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <pillar.icon size={24} className="text-brand-green" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-text mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}