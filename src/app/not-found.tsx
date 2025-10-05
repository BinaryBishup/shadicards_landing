"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, Search, ArrowLeft, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="text-9xl font-bold text-rose-500 opacity-20">404</h1>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Heart className="w-24 h-24 text-rose-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Looks like this page took a wedding detour. Don't worry, we'll help you find your way back!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-rose-500 text-rose-500 px-8 py-3 rounded-full font-semibold hover:bg-rose-50 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              You might be looking for:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                { name: "Wedding Website Features", href: "/features/wedding-website" },
                { name: "Smart Card", href: "/features/smart-card" },
                { name: "Event Invitations", href: "/features/event-invitations" },
                { name: "Guest Management", href: "/features/guest-management" },
                { name: "Pricing", href: "/pricing" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Terms of Service", href: "/terms-of-service" }
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center text-gray-700 hover:text-rose-600 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Fun Message */}
          <p className="mt-8 text-gray-500 italic">
            "Even the best wedding plans have unexpected moments. Let's get you back on track! 💑"
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
