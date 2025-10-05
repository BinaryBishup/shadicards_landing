import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <p className="text-gray-700">
                At ShadiCards, we are committed to protecting your privacy and ensuring the security of your personal information.
                This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our website
                and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name and contact details (email, phone number, address)</li>
                <li>Event details (wedding date, venue, guest information)</li>
                <li>Payment and billing information</li>
                <li>Account credentials and preferences</li>
                <li>Photos and content you upload for your invitations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website addresses</li>
                <li>Location data (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the collected information for:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Processing and fulfilling your wedding invitation orders</li>
                <li>Creating and managing your account</li>
                <li>Sending order updates and tracking information</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Personalizing your experience and recommendations</li>
                <li>Processing payments and preventing fraud</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Improving our services and website functionality</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">We may share your information with:</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Service Providers</h3>
              <p className="text-gray-700">
                Third-party vendors who assist us with printing, shipping, payment processing, email services,
                and other business operations.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Business Partners</h3>
              <p className="text-gray-700">
                Selected partners for joint offerings or promotions (only with your explicit consent).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Legal Requirements</h3>
              <p className="text-gray-700">
                Law enforcement or government agencies when required by law or to protect our rights and safety.
              </p>

              <p className="text-gray-700 mt-4">
                We never sell, rent, or trade your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and data centers</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information by authorized personnel only</li>
                <li>PCI DSS compliance for payment processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access and review your personal information</li>
                <li>Update or correct inaccurate information</li>
                <li>Request deletion of your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Disable cookies through your browser settings</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website
                traffic, and personalize content. You can manage cookie preferences through your browser settings,
                though some features may not function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect
                personal information from children. If you believe we have inadvertently collected information from
                a minor, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically. We will notify you of any material changes by posting
                the new policy on our website and updating the effective date. Your continued use of our services after
                such modifications constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                please reach out to us.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors"
              >
                Contact Us
              </Link>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
