"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Check, X, Sparkles, Heart, MessageCircle, Mail } from "lucide-react";

export default function PricingPage() {
  const freeFeatures = [
    "Unlimited Wedding Websites",
    "Event Invitations (Digital)",
    "Guest Management System",
    "RSVP Tracking",
    "Photo & Video Gallery",
    "Live Event Updates",
    "Gift Registry Management",
    "Venue & Accommodation Info",
    "Custom Website Themes",
    "QR Code Generation",
    "Multi-language Support",
    "Real-time Analytics"
  ];

  const paidFeatures = [
    {
      name: "WhatsApp Messages",
      price: "₹1/message",
      description: "Automated WhatsApp invitations and reminders",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      name: "Smart Wedding Cards",
      price: "Starting ₹50/card",
      description: "Premium smart cards with NFC - each guest gets personalized access control",
      icon: <Mail className="w-6 h-6" />
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-stone-50">
        {/* Hero Section */}
        <div className="relative py-20 px-4 text-center bg-gradient-to-r from-rose-500 to-pink-600">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <Sparkles className="w-12 h-12 text-white mx-auto" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-white/90">
              ShadiCards is absolutely FREE! Pay only for what you use.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Main Pricing Banner */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 md:p-12 text-center border-2 border-rose-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500 rounded-full mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                ShadiCards is <span className="text-rose-600">100% FREE</span>
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Create unlimited wedding websites, manage guests, send digital invitations—all completely free!
              </p>
              <p className="text-lg text-gray-600">
                You only pay for WhatsApp messages and physical wedding cards when you choose to use them.
              </p>
            </div>
          </div>

          {/* Free Features Table */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything Included for Free</h2>
              <p className="text-gray-600">All features. No hidden costs. No credit card required.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4">
                <h3 className="text-2xl font-bold text-white">Free Forever Plan</h3>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {freeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-900 mb-2">₹0</p>
                    <p className="text-gray-600">Forever free. No limitations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pay-As-You-Go Section */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Optional Add-ons</h2>
              <p className="text-gray-600">Pay only when you use these premium services</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {paidFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{feature.name}</h3>
                      <p className="text-rose-600 font-semibold">{feature.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>

                  {/* Additional details */}
                  {index === 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        <Check className="w-4 h-4 inline text-green-600 mr-1" />
                        Send personalized messages in 8+ languages
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        <Check className="w-4 h-4 inline text-green-600 mr-1" />
                        Automated RSVP collection
                      </p>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        <Check className="w-4 h-4 inline text-green-600 mr-1" />
                        Each guest gets their own unique smart card
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        <Check className="w-4 h-4 inline text-green-600 mr-1" />
                        Control event access for individual guests
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        <Check className="w-4 h-4 inline text-green-600 mr-1" />
                        NFC technology connects card to wedding website
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comparison with Traditional Cards */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-8 text-center">Compare with Traditional Wedding Cards</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-rose-400">Traditional Cards</h3>
                  <div className="space-y-3">
                    {[
                      "₹50-200 per card",
                      "Design changes cost extra",
                      "No guest tracking",
                      "Manual RSVP collection",
                      "Limited to physical cards"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-green-400">ShadiCards</h3>
                  <div className="space-y-3">
                    {[
                      "₹0 for digital (₹50+ for smart cards)",
                      "Unlimited design changes",
                      "Advanced guest management",
                      "Automated RSVP tracking",
                      "Individual guest access control"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pricing FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is ShadiCards really free?",
                  a: "Yes! All core features including wedding websites, guest management, digital invitations, and RSVP tracking are 100% free forever. No credit card required."
                },
                {
                  q: "When do I need to pay?",
                  a: "You only pay when you choose to send WhatsApp messages (₹1/message) or order premium smart cards (starting ₹50/card). Everything else is completely free."
                },
                {
                  q: "Are there any hidden charges?",
                  a: "Absolutely not. We believe in transparent pricing. What you see is what you pay. No setup fees, no monthly charges, no hidden costs."
                },
                {
                  q: "Can I try before ordering smart cards?",
                  a: "Yes! Create your entire wedding website, design your cards digitally, and test all features for free. Order smart cards only when you're ready."
                },
                {
                  q: "What makes the smart cards special?",
                  a: "Each guest receives their own unique smart card with NFC technology. You can control which events each guest can access, making it perfect for managing different ceremonies and guest categories."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Creating Your Wedding Website for Free
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              No credit card required. Get started in minutes.
            </p>
            <Link
              href="https://dashboard.shadicards.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Get Started Free
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="text-rose-600 hover:text-rose-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
