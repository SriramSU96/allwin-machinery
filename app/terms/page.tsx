import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for using the ${SITE_CONFIG.name} website and services.`,
};

export default function TermsPage() {
  const lastUpdated = "January 2025";

  return (
    <>
      <PageHero
        title="Terms & Conditions"
        description="Please read these terms carefully before using our website and services."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

      <section className="py-16 bg-brand-white">
        <div className="container max-w-3xl mx-auto px-4">
          <p className="text-sm text-gray-400 mb-10">Last updated: {lastUpdated}</p>

          <div className="prose prose-green max-w-none space-y-10 text-brand-text text-[15px] leading-relaxed">

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using the {SITE_CONFIG.name} website ({SITE_CONFIG.url}), you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">2. Use of the Website</h2>
              <p className="text-gray-600">You agree to use this website only for lawful purposes. You must not:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                <li>Submit false, misleading, or fraudulent information through any form</li>
                <li>Attempt to gain unauthorised access to any part of the website</li>
                <li>Use the site to transmit spam, viruses, or malicious code</li>
                <li>Reproduce or republish any content without prior written permission</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">3. Product Information & Pricing</h2>
              <p className="text-gray-600">
                We make every effort to ensure product descriptions, specifications, and pricing on this website are accurate. However, we reserve the right to correct errors and update information at any time without prior notice. Product availability is subject to stock and may vary. Final pricing will be confirmed at the time of purchase.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">4. Dealer & Partnership Inquiries</h2>
              <p className="text-gray-600">
                Submitting a dealer application through our website does not constitute a formal agreement or guarantee of dealership. All applications are reviewed at our sole discretion. We will contact shortlisted applicants within 24–48 business hours.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">5. Reviews & User Submissions</h2>
              <p className="text-gray-600">
                By submitting a review, you grant {SITE_CONFIG.name} a non-exclusive, royalty-free licence to publish, display, and use your review (including your name and location) on our website and marketing materials. Reviews are moderated and we reserve the right to decline or remove reviews that are false, defamatory, or inappropriate.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">6. Intellectual Property</h2>
              <p className="text-gray-600">
                All content on this website — including text, images, logos, product photographs, and design — is the property of {SITE_CONFIG.name} or its respective brand partners and is protected by applicable copyright and trademark laws. Unauthorised use is prohibited.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-600">
                {SITE_CONFIG.name} provides this website on an &quot;as is&quot; basis. We do not warrant that the website will be error-free or uninterrupted. To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or reliance on its content.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">8. Third-Party Links</h2>
              <p className="text-gray-600">
                Our website may contain links to third-party websites (e.g. brand websites, WhatsApp, YouTube). These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">9. Governing Law</h2>
              <p className="text-gray-600">
                These Terms and Conditions are governed by the laws of India. Any disputes arising from your use of this website shall be subject to the exclusive jurisdiction of the courts in Trichy, Tamil Nadu.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">10. Changes to These Terms</h2>
              <p className="text-gray-600">
                We reserve the right to update these Terms and Conditions at any time. Updates will be posted on this page with a revised date. Continued use of the website constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">11. Contact</h2>
              <p className="text-gray-600">For any questions regarding these terms, please contact us:</p>
              <address className="not-italic mt-3 text-gray-600 space-y-1">
                <p className="font-semibold text-brand-text">{SITE_CONFIG.name}</p>
                <p>{SITE_CONFIG.address}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-green hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </p>
              </address>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
