// src/app/privacy-policy/page.tsx
// BrotherFit — Privacy Policy Page

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — BrotherFit',
  description: 'BrotherFit Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: June 2025</p>
          <p className="text-gray-500 text-sm mt-1">BrotherFit — brotherfit.com</p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you interact with BrotherFit through our website, Facebook Page,
              Instagram, or WhatsApp, we may collect the following information:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-600">
              <li>Your name and contact information (phone, email)</li>
              <li>Messages and communications you send us</li>
              <li>Order details and purchase history</li>
              <li>Shipping address for delivery</li>
              <li>Facebook/Instagram/WhatsApp profile information when you message us</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-600">
              <li>Process and deliver your orders</li>
              <li>Respond to your messages and customer service inquiries</li>
              <li>Send order confirmations and delivery updates</li>
              <li>Improve our products and services</li>
              <li>Send promotional messages (only with your consent)</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Messaging Platforms
            </h2>
            <p>
              When you message us via Facebook Messenger, Instagram DM, or WhatsApp,
              we use Meta&apos;s official APIs to receive and respond to your messages.
              Your messages are stored securely and used only to provide customer support
              and improve your shopping experience with BrotherFit.
            </p>
            <p className="mt-3">
              We do not sell or share your messaging data with third parties.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Data Security
            </h2>
            <p>
              We take reasonable steps to protect your personal information from
              unauthorized access, disclosure, or misuse. Your data is stored securely
              using Firebase (Google Cloud) infrastructure.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Third-Party Services
            </h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-600">
              <li><strong>Meta (Facebook/Instagram/WhatsApp)</strong> — for messaging</li>
              <li><strong>Google Firebase</strong> — for data storage</li>
              <li><strong>bKash / Nagad</strong> — for payment processing</li>
              <li><strong>Delivery partners</strong> — for shipping</li>
            </ul>
            <p className="mt-3">
              Each of these services has their own privacy policies. We encourage
              you to review them.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-600">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of promotional messages at any time</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle
              your data, please contact us:
            </p>
            <div className="mt-3 space-y-1 text-gray-600">
              <p>📧 Email: brotherfit06@gmail.com</p>
              <p>📱 WhatsApp: +880 1572-934479</p>
              <p>🌐 Website: brotherfit.com</p>
              <p>📘 Facebook: facebook.com/brotherfit</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will
              be posted on this page with an updated date. Continued use of our
              services after changes means you accept the updated policy.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p>© 2025 BrotherFit. All rights reserved.</p>
          <a href="/" className="text-gray-500 hover:text-gray-700 mt-1 inline-block">
            ← Back to Home
          </a>
        </div>

      </div>
    </div>
  );
}
