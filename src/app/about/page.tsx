"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Heart, Users, Globe, Shield, Zap, Target, Lightbulb, Sparkles } from "lucide-react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story");

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-rose-600" />,
      title: "Love-Centered Design",
      description: "Every invitation we create celebrates the unique love story of each couple"
    },
    {
      icon: <Users className="w-8 h-8 text-rose-600" />,
      title: "Customer First",
      description: "Your satisfaction and happiness are at the heart of everything we do"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-rose-600" />,
      title: "Quality Excellence",
      description: "Premium materials and meticulous attention to detail in every product"
    },
    {
      icon: <Globe className="w-8 h-8 text-rose-600" />,
      title: "Cultural Heritage",
      description: "Honoring traditions while embracing modern design aesthetics"
    },
    {
      icon: <Shield className="w-8 h-8 text-rose-600" />,
      title: "Trust & Security",
      description: "Your personal information and memories are safe with us"
    },
    {
      icon: <Zap className="w-8 h-8 text-rose-600" />,
      title: "Innovation",
      description: "Continuously evolving to bring you the latest in wedding technology"
    }
  ];

  const stats = [
    { number: "24/7", label: "Customer Support" },
    { number: "1000+", label: "Design Templates" },
    { number: "Smart", label: "NFC Technology" },
    { number: "100%", label: "Customizable" }
  ];

  const features = [
    {
      icon: <Target className="w-6 h-6 text-rose-600" />,
      title: "Our Mission",
      description: "To revolutionize wedding planning by providing innovative, eco-friendly digital invitation solutions that make every couple's special day memorable."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-rose-600" />,
      title: "Our Vision",
      description: "To become India's most trusted wedding technology platform, blending tradition with innovation for modern couples."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-rose-600" />,
      title: "Our Promise",
      description: "Delivering beautiful, affordable, and sustainable wedding solutions with exceptional customer service at every step."
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
            <h1 className="text-5xl font-bold text-white mb-4">About ShadiCards</h1>
            <p className="text-xl text-white/90">
              Redefining Wedding Invitations for Modern India
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-20 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {["story", "mission", "values"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "text-rose-600 border-b-2 border-rose-600"
                      : "text-gray-600 hover:text-rose-600"
                  }`}
                >
                  {tab === "story" ? "Our Story" : tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Our Story */}
          {activeTab === "story" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  ShadiCards emerged from a simple yet powerful idea: weddings are about celebrating love,
                  not stressing over invitations. We noticed that couples were spending countless hours managing
                  guest lists, coordinating with printers, and dealing with last-minute changes—all while trying
                  to enjoy one of the most important moments of their lives.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  That's when we asked ourselves: What if technology could make this process joyful? What if couples
                  could design stunning invitations, manage their entire guest list, and share their wedding moments—all
                  from one smart platform?
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Today, ShadiCards combines traditional Indian aesthetics with cutting-edge technology to deliver
                  a seamless wedding planning experience. From smart NFC cards to digital invitations, automated
                  guest management to live photo sharing, we're bringing the future of weddings to modern India.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="text-3xl font-bold text-rose-600">{stat.number}</div>
                    <div className="text-gray-600 mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose ShadiCards?</h3>
                <div className="space-y-4">
                  {[
                    "India's first smart wedding card with NFC technology",
                    "Complete digital guest management platform",
                    "Unlimited design customization options",
                    "Real-time RSVP tracking and updates",
                    "Eco-friendly and sustainable solutions",
                    "24/7 customer support",
                    "Affordable pricing with no hidden costs",
                    "Seamless integration with WhatsApp & Email"
                  ].map((point, index) => (
                    <div key={index} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-rose-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 ml-2">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mission & Vision */}
          {activeTab === "mission" && (
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What Makes Us Different?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-rose-600 mb-3">Technology-First Approach</h3>
                    <p className="text-gray-700">
                      We leverage the latest technology including NFC, AI-powered design tools, and cloud-based
                      guest management to provide a seamless experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-rose-600 mb-3">Cultural Sensitivity</h3>
                    <p className="text-gray-700">
                      Our designs honor Indian wedding traditions while offering modern customization options
                      for contemporary couples.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-rose-600 mb-3">Eco-Friendly Solutions</h3>
                    <p className="text-gray-700">
                      Digital-first approach reduces paper waste, while our physical cards use sustainable
                      materials and eco-friendly printing.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-rose-600 mb-3">All-in-One Platform</h3>
                    <p className="text-gray-700">
                      From invitations to guest management, RSVP tracking to photo sharing—everything you
                      need in one place.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to You</h3>
                <ul className="space-y-3">
                  {[
                    "Transparent pricing with no hidden fees",
                    "Free design consultations and unlimited revisions",
                    "Quick turnaround time without compromising quality",
                    "Secure data handling and privacy protection",
                    "Dedicated customer support throughout your journey",
                    "Regular updates and new features based on customer feedback"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 ml-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Values */}
          {activeTab === "values" && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
              <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
                These principles guide every decision we make and every interaction we have with our customers,
                partners, and team members.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment to Sustainability</h3>
                <div className="bg-green-50 rounded-2xl p-8 max-w-4xl mx-auto">
                  <p className="text-gray-700 mb-6">
                    We believe in celebrating love while protecting our planet. Our commitment to sustainability includes:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    {[
                      "Digital-first approach to minimize paper waste",
                      "Eco-friendly materials for physical cards",
                      "Carbon-neutral shipping options",
                      "Recyclable packaging materials",
                      "Energy-efficient cloud infrastructure",
                      "Partnering with sustainable suppliers"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <Sparkles className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 ml-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Your Perfect Wedding Invitation?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join modern couples who are choosing ShadiCards for their special day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/features"
                className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Features
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

      </div>
      <div className="text-center py-4 bg-stone-50">
        <p className="text-gray-600">ShadiCards powered by Zbaan</p>
      </div>
      <Footer />
    </>
  );
}
