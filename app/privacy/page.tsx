import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SITE_CONFIG } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_CONFIG.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 2025";

  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="py-16 bg-brand-white">
        <div className="container max-w-3xl mx-auto px-4">
          <p className="text-sm text-gray-400 mb-10">Last updated: {lastUpdated}</p>

          <div className="prose prose-green max-w-none space-y-10 text-brand-text text-[15px] leading-relaxed">

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">1. Information We Collect</h2>
              <p>When you contact us through our website, submit a dealer inquiry, write a review, or request a catalog, we may collect:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                <li>Name, email address, and phone number</li>
                <li>City and state (for dealer and service requests)</li>
                <li>Business details (for dealer applications)</li>
                <li>Product preferences and inquiry content</li>
                <li>Files you choose to upload (e.g. business documents)</li>
              </ul>
              <p className="mt-2 text-gray-600">We do not collect payment information directly — all transactions are processed through trusted third-party gateways.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-600">We use the information you provide to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Process dealer and partnership applications</li>
                <li>Send product catalogs and pricing information you request</li>
                <li>Publish approved reviews on our website (name and location only)</li>
                <li>Improve our website and services</li>
              </ul>
              <p className="mt-2 text-gray-600">We do not sell, trade, or rent your personal information to third parties.</p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">3. WhatsApp & Third-Party Communication</h2>
              <p className="text-gray-600">
                Our website includes WhatsApp contact links. When you use these, you will be redirected to WhatsApp — a third-party service. Any information shared over WhatsApp is governed by WhatsApp&apos;s own privacy policy. We do not store WhatsApp conversations on our servers.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">4. Data Storage & Security</h2>
              <p className="text-gray-600">
                Contact form submissions are processed via Formspree and stored securely. Review and dealer data is stored in Sanity CMS. Uploaded files are stored in Sanity&apos;s asset store. We take reasonable steps to protect your information but cannot guarantee absolute security of data transmitted over the internet.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">5. Cookies</h2>
              <p className="text-gray-600">
                Our website uses only essential functional cookies (e.g. your wishlist preferences stored in your browser&apos;s local storage). We do not use advertising or tracking cookies. Google Analytics may be used to understand aggregate site traffic — this data is anonymised and not linked to your personal details.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">6. Your Rights</h2>
              <p className="text-gray-600">You have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                <li>Request access to the personal data we hold about you</li>
                <li>Ask us to correct inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt out of any marketing communications</li>
              </ul>
              <p className="mt-2 text-gray-600">
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-green hover:underline">
                  {SITE_CONFIG.email}
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">7. Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this privacy policy from time to time. Changes will be posted on this page with an updated date. Continued use of our website after any changes constitutes acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-brand-text mb-3">8. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <address className="not-italic mt-3 text-gray-600 space-y-1">
                <p className="font-semibold text-brand-text">{SITE_CONFIG.name}</p>
                <p>{SITE_CONFIG.address}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-green hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-brand-green hover:underline">
                    {SITE_CONFIG.phone}
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
