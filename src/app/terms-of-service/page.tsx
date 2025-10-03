import Header from "@/components/Header";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <p className="text-gray-600 mb-6">
                Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-gray-700">
                Welcome to ShadiCards! These Terms of Service ("Terms") govern your use of our website, mobile applications,
                and services (collectively, the "Services"). By accessing or using ShadiCards, you agree to be bound by these
                Terms. If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By creating an account, placing an order, or using our Services, you confirm that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>You are at least 18 years old or have parental consent</li>
                <li>You have the legal capacity to enter into binding contracts</li>
                <li>You will provide accurate and complete information</li>
                <li>You will comply with all applicable laws and regulations</li>
                <li>You accept these Terms and our Privacy Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Account Registration</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Creation</h3>
              <p className="text-gray-700">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Account Termination</h3>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate accounts that violate these Terms, engage in
                fraudulent activities, or harm other users or our business interests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Products and Services</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Service Description</h3>
              <p className="text-gray-700">
                ShadiCards provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Custom wedding invitation design and printing services</li>
                <li>Digital invitation creation and distribution</li>
                <li>Wedding website creation and hosting</li>
                <li>Save-the-date cards and thank you cards</li>
                <li>Guest management tools and RSVP tracking</li>
                <li>Design templates and customization tools</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Service Availability</h3>
              <p className="text-gray-700">
                We strive to maintain service availability but do not guarantee uninterrupted access.
                We may modify, suspend, or discontinue any part of our Services with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Orders and Payment</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ordering Process</h3>
              <p className="text-gray-700">When placing an order, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Review and approve all proofs before production</li>
                <li>Ensure all information is accurate (names, dates, addresses)</li>
                <li>Pay the full amount before production begins</li>
                <li>Understand that custom products are non-refundable</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Pricing and Payment</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All prices are in Indian Rupees (INR) unless otherwise stated</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment is due in full at the time of order</li>
                <li>We accept credit cards, debit cards, UPI, and net banking</li>
                <li>Additional charges may apply for rush orders or special requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Order Cancellation</h3>
              <p className="text-gray-700">
                Orders may be cancelled within 2 hours of placement if production has not begun.
                See our Return Policy for detailed information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Content</h3>
              <p className="text-gray-700">
                All content on ShadiCards, including designs, templates, logos, text, images, and software,
                is our property or licensed to us and protected by intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Copy, modify, or distribute our content without permission</li>
                <li>Use our designs or templates for commercial purposes</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Remove or alter any proprietary notices</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Your Content</h3>
              <p className="text-gray-700">
                You retain ownership of content you upload (photos, text, designs). By uploading content, you grant us a
                non-exclusive, worldwide, royalty-free license to use, modify, and display your content for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Providing our Services to you</li>
                <li>Creating your custom products</li>
                <li>Marketing (only with your explicit consent)</li>
              </ul>

              <p className="text-gray-700 mt-4">You represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>You own or have rights to use all uploaded content</li>
                <li>Your content does not infringe any third-party rights</li>
                <li>Your content does not contain offensive or illegal material</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Conduct</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the Services for any unlawful purpose</li>
                <li>Upload content that is offensive, defamatory, or inappropriate</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the Services</li>
                <li>Attempt to gain unauthorized access to any systems</li>
                <li>Collect or harvest user data without permission</li>
                <li>Use automated systems or bots without our consent</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700">
                Your use of our Services is also governed by our Privacy Policy, which explains how we collect,
                use, and protect your personal information. By using ShadiCards, you consent to our data
                practices as described in the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers and Warranties</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Service "As Is"</h3>
              <p className="text-gray-700">
                Our Services are provided "as is" and "as available" without warranties of any kind, either
                express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Merchantability or fitness for a particular purpose</li>
                <li>Accuracy, reliability, or completeness of content</li>
                <li>Uninterrupted or error-free service</li>
                <li>Security of transmitted information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Color Variations</h3>
              <p className="text-gray-700">
                We strive for color accuracy, but slight variations may occur between on-screen displays and
                printed products due to monitor settings and printing processes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700">
                To the fullest extent permitted by law, ShadiCards and its affiliates, officers, directors,
                employees, and agents shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages exceeding the amount paid for the specific product or service</li>
                <li>Third-party actions or content</li>
                <li>Service interruptions or data loss</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless ShadiCards and its affiliates from any claims,
                damages, losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Your use or misuse of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Your content or materials uploaded to our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Services</h2>
              <p className="text-gray-700">
                Our Services may contain links to third-party websites or integrate with third-party services.
                We are not responsible for the content, privacy practices, or terms of third-party services.
                Your use of such services is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Dispute Resolution</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Governing Law</h3>
              <p className="text-gray-700">
                These Terms are governed by the laws of India, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Arbitration</h3>
              <p className="text-gray-700">
                Any disputes arising from these Terms or your use of the Services shall be resolved through
                binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, unless
                you opt-out within 30 days of accepting these Terms.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Jurisdiction</h3>
              <p className="text-gray-700">
                Subject to arbitration provisions, the courts of Mumbai, Maharashtra shall have exclusive
                jurisdiction over any disputes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700">
                We may modify these Terms at any time. Material changes will be notified via email or
                prominent notice on our website. Your continued use of the Services after changes
                constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. General Provisions</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Entire Agreement</h3>
              <p className="text-gray-700">
                These Terms, along with our Privacy Policy and other policies, constitute the entire
                agreement between you and ShadiCards.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Severability</h3>
              <p className="text-gray-700">
                If any provision is found unenforceable, the remaining provisions shall continue in effect.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Waiver</h3>
              <p className="text-gray-700">
                Our failure to enforce any right or provision shall not constitute a waiver of that right.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Assignment</h3>
              <p className="text-gray-700">
                You may not assign these Terms without our written consent. We may assign our rights
                and obligations without restriction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>ShadiCards Legal Department</strong><br />
                  Email: legal@shadicards.com<br />
                  Phone: +91 98765 43210<br />
                  Address: Mumbai, Maharashtra, India<br />
                  Business Hours: Monday-Friday, 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-rose-600 hover:text-rose-700 font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}