import Header from "@/components/Header";
import Link from "next/link";
import { Truck, Package, Clock, Globe, CheckCircle, AlertTriangle } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping & Delivery Policy</h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <p className="text-gray-600 mb-6">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-gray-700">
                At ShadiCards, we understand the importance of timely delivery for your wedding preparations.
                This policy outlines our shipping methods, delivery timelines, and related information to ensure
                your invitations reach you and your guests on schedule.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="w-6 h-6 mr-2 text-rose-600" />
                1. Shipping Methods
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Standard Shipping</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Delivery within 7-10 business days</li>
                    <li>Available across India</li>
                    <li>Free for orders above ₹5,000</li>
                    <li>₹150 for orders below ₹5,000</li>
                    <li>Tracking available</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Express Shipping</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Delivery within 3-5 business days</li>
                    <li>Available in metro cities and tier-1 cities</li>
                    <li>₹350 for all orders</li>
                    <li>Priority handling and processing</li>
                    <li>Real-time tracking with SMS updates</li>
                  </ul>
                </div>

                <div className="bg-amber-50 rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Rush Delivery</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Delivery within 24-48 hours</li>
                    <li>Available in select cities only</li>
                    <li>₹750 + rush production charges</li>
                    <li>Subject to availability and order complexity</li>
                    <li>Requires confirmation before order placement</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-rose-600" />
                2. Processing Time
              </h2>

              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Product Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Wedding Invitations (1-100 qty)</td>
                    <td className="border border-gray-300 px-4 py-2">3-5 business days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Wedding Invitations (100-500 qty)</td>
                    <td className="border border-gray-300 px-4 py-2">5-7 business days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Wedding Invitations (500+ qty)</td>
                    <td className="border border-gray-300 px-4 py-2">7-10 business days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Digital Invitations</td>
                    <td className="border border-gray-300 px-4 py-2">Instant delivery</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Save the Dates</td>
                    <td className="border border-gray-300 px-4 py-2">2-3 business days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Thank You Cards</td>
                    <td className="border border-gray-300 px-4 py-2">2-3 business days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Custom Designs</td>
                    <td className="border border-gray-300 px-4 py-2">7-14 business days</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-gray-700">
                  <strong>Note:</strong> Processing time begins after proof approval. Design revisions may extend processing time.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-rose-600" />
                3. Shipping Locations
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Domestic Shipping (India)</h3>
              <p className="text-gray-700 mb-4">
                We deliver to all pin codes across India, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>All metro cities (same-day delivery available in select areas)</li>
                <li>Tier 1 & Tier 2 cities (2-5 days delivery)</li>
                <li>Tier 3 cities and towns (5-7 days delivery)</li>
                <li>Rural areas (7-10 days delivery)</li>
                <li>North-Eastern states (10-15 days delivery)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">International Shipping</h3>
              <p className="text-gray-700 mb-4">
                We ship internationally to serve the Indian diaspora worldwide:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">USA & Canada</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Delivery: 7-14 days</li>
                    <li>• Shipping: $35-50</li>
                    <li>• Express available</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">UK & Europe</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Delivery: 7-12 days</li>
                    <li>• Shipping: €30-45</li>
                    <li>• Tracking included</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Middle East</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Delivery: 5-10 days</li>
                    <li>• Shipping: AED 100-150</li>
                    <li>• Door-to-door delivery</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Australia & NZ</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Delivery: 10-15 days</li>
                    <li>• Shipping: AUD 40-60</li>
                    <li>• Customs handled</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 mt-4">
                <strong>Customs & Duties:</strong> International customers are responsible for any customs duties,
                taxes, or fees imposed by their country.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="w-6 h-6 mr-2 text-rose-600" />
                4. Order Tracking
              </h2>
              <p className="text-gray-700 mb-4">
                Track your order easily through multiple channels:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Email confirmation with tracking number upon dispatch</li>
                <li>SMS updates at every stage of delivery</li>
                <li>Real-time tracking on our website using order ID</li>
                <li>WhatsApp updates (opt-in required)</li>
                <li>Direct courier partner tracking links</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-rose-600" />
                5. Delivery Confirmation
              </h2>
              <p className="text-gray-700 mb-4">
                To ensure successful delivery:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Signature required for all orders above ₹2,000</li>
                <li>OTP verification for contactless delivery</li>
                <li>Photo proof of delivery available on request</li>
                <li>Delivery to security/reception desk accepted with authorization</li>
                <li>Re-delivery attempted twice for failed deliveries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Bulk Order Shipping</h2>
              <p className="text-gray-700 mb-4">
                For wedding invitation distribution to multiple addresses:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Drop Shipping Service</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Direct delivery to your guest addresses</li>
                <li>Minimum 50 addresses required</li>
                <li>Excel template provided for address collection</li>
                <li>Additional ₹30 per address for individual packaging and shipping</li>
                <li>Consolidated tracking report provided</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Partial Shipments</h3>
              <p className="text-gray-700">
                For large orders, we offer partial shipments to meet your timeline:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>First batch for immediate needs</li>
                <li>Remaining quantity as per production schedule</li>
                <li>No additional shipping charges for splits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-amber-600" />
                7. Shipping Restrictions
              </h2>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                <p className="text-gray-700 font-semibold mb-2">Important Considerations:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Delivery times may be affected during festivals and peak wedding seasons</li>
                  <li>Remote areas may have limited courier service availability</li>
                  <li>P.O. Box addresses not accepted for valuable shipments</li>
                  <li>Some products may have shipping restrictions to certain countries</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Packaging</h2>
              <p className="text-gray-700 mb-4">
                We take special care in packaging your precious invitations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Rigid cardboard boxes for protection</li>
                <li>Waterproof packaging for monsoon deliveries</li>
                <li>Bubble wrap for delicate items</li>
                <li>Eco-friendly packaging materials</li>
                <li>Special gift packaging available on request (₹100 extra)</li>
                <li>Tamper-evident sealing for security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Delivery Issues</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Lost or Damaged Shipments</h3>
              <p className="text-gray-700 mb-4">In case of lost or damaged shipments:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Report within 48 hours of expected delivery date</li>
                <li>We'll investigate with the courier partner</li>
                <li>Replacement or refund provided based on investigation</li>
                <li>All shipments are insured for full value</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Incorrect Address</h3>
              <p className="text-gray-700">
                If the delivery fails due to incorrect address provided by customer:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>Re-shipping charges will apply</li>
                <li>Address change requests accepted within 24 hours of order</li>
                <li>After dispatch, redirection charges as per courier policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Holiday Schedule</h2>
              <p className="text-gray-700 mb-4">
                Please note shipping delays during:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">National Holidays</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Republic Day (Jan 26)</li>
                    <li>• Holi Festival</li>
                    <li>• Diwali (5-day closure)</li>
                    <li>• Independence Day (Aug 15)</li>
                    <li>• Gandhi Jayanti (Oct 2)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Peak Seasons</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• November-February (Wedding season)</li>
                    <li>• April-June (Summer weddings)</li>
                    <li>• Festival periods</li>
                    <li>• Auspicious dates</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 mt-4">
                Plan your orders accordingly and allow extra time during these periods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact for Shipping Queries</h2>
              <p className="text-gray-700">
                For any shipping-related questions or concerns:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Shipping Support Team</strong><br />
                  Email: shipping@shadicards.com<br />
                  Phone: +91 98765 43211<br />
                  WhatsApp: +91 98765 43211<br />
                  Hours: Monday-Saturday, 9:00 AM - 7:00 PM IST<br />
                  Average Response Time: 2-4 hours
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