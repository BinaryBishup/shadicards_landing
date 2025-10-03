import Header from "@/components/Header";
import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Return & Refund Policy</h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <p className="text-gray-600 mb-6">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-gray-700">
                At ShadiCards, we strive to ensure complete satisfaction with every order. As our wedding invitations
                are custom-made and personalized products, we have specific policies regarding returns and refunds.
                Please review this policy carefully before placing your order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Custom Products Policy</h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                <p className="text-gray-700">
                  <strong>Important:</strong> All wedding invitations, save-the-dates, and related products are
                  custom-made to your specifications and are therefore non-returnable and non-refundable once
                  production has begun.
                </p>
              </div>
              <p className="text-gray-700">
                Custom products include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Personalized wedding invitations (physical and digital)</li>
                <li>Save-the-date cards</li>
                <li>Thank you cards with custom text or photos</li>
                <li>Wedding websites with personalized content</li>
                <li>Custom-designed templates</li>
                <li>Any product with personalized text, images, or designs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Order Cancellation</h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Before Production</h3>
              <p className="text-gray-700">
                You may cancel your order and receive a full refund if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>The cancellation is requested within 2 hours of placing the order</li>
                <li>Production has not yet begun</li>
                <li>No proof has been approved</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">After Proof Approval</h3>
              <p className="text-gray-700">
                Once you have approved the final proof and production has begun, orders cannot be cancelled
                and are non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Eligible Returns</h2>
              <p className="text-gray-700 mb-4">
                We accept returns and provide refunds or replacements in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Defective or Damaged Products</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Products arrive damaged due to shipping</li>
                <li>Printing defects or quality issues not matching approved proofs</li>
                <li>Missing items from your order</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Our Errors</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Incorrect information printed (different from approved proof)</li>
                <li>Wrong product shipped</li>
                <li>Incorrect quantity delivered</li>
                <li>Design errors made by our team</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> Customer errors in approved proofs (spelling mistakes, wrong dates, etc.)
                  are not eligible for returns or refunds.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Return Process</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 1: Report the Issue</h3>
              <p className="text-gray-700">
                Contact us within 7 days of receiving your order at returns@shadicards.com with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Order number</li>
                <li>Description of the issue</li>
                <li>Photos of the defective or incorrect items</li>
                <li>Photos of the packaging (if damaged)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Step 2: Return Authorization</h3>
              <p className="text-gray-700">
                We will review your request within 48 hours and provide a Return Authorization Number (RAN)
                if approved.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Step 3: Ship the Items</h3>
              <p className="text-gray-700">
                Return the items to the address provided with the RAN clearly marked on the package.
                We will cover return shipping costs for defective or incorrect items.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Step 4: Resolution</h3>
              <p className="text-gray-700">
                Once we receive and inspect the returned items, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Issue a full refund, or</li>
                <li>Send a replacement at no additional cost</li>
                <li>Provide store credit (if preferred)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Timeline</h2>
              <table className="min-w-full border-collapse border border-gray-300 mt-4">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Payment Method</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Refund Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Credit/Debit Card</td>
                    <td className="border border-gray-300 px-4 py-2">5-7 business days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">UPI/Digital Wallets</td>
                    <td className="border border-gray-300 px-4 py-2">3-5 business days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Net Banking</td>
                    <td className="border border-gray-300 px-4 py-2">7-10 business days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Store Credit</td>
                    <td className="border border-gray-300 px-4 py-2">Immediate</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Non-Returnable Items</h2>
              <p className="text-gray-700 mb-4">The following items cannot be returned:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Digital downloads and templates</li>
                <li>Rush orders after production has begun</li>
                <li>Sample packs (unless defective)</li>
                <li>Clearance or sale items marked as "Final Sale"</li>
                <li>Gift cards</li>
                <li>Services (design consultations, custom design work)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Quality Guarantee</h2>
              <p className="text-gray-700">
                We stand behind the quality of our products. If you're not satisfied with the print quality
                or materials used (excluding design and content), contact us within 30 days of delivery.
                We'll work with you to find a satisfactory resolution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Proof Approval Policy</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-gray-700">
                  <strong>Critical:</strong> By approving your proof, you confirm that all text, dates, names,
                  and design elements are correct. We are not responsible for errors in approved proofs.
                  Please review carefully before approval.
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                Before approving your proof, please verify:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>All names are spelled correctly</li>
                <li>Dates and times are accurate</li>
                <li>Venue information is correct</li>
                <li>Phone numbers and websites are accurate</li>
                <li>Grammar and punctuation</li>
                <li>Colors and design elements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Shipping Damage</h2>
              <p className="text-gray-700">
                If your package arrives damaged:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-4">
                <li>Do not refuse the package</li>
                <li>Take photos of the damaged packaging and products</li>
                <li>Contact us immediately at support@shadicards.com</li>
                <li>Keep all packaging materials for inspection</li>
              </ol>
              <p className="text-gray-700 mt-4">
                We will file a claim with the shipping carrier and send you a replacement at no cost.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700">
                For any questions about returns and refunds, please contact our customer service team:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Customer Service</strong><br />
                  Email: returns@shadicards.com<br />
                  Phone: +91 98765 43210<br />
                  Hours: Monday-Saturday, 9:00 AM - 6:00 PM IST<br />
                  Response Time: Within 24-48 hours
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