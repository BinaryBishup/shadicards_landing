"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import {
  Mail, Phone, MapPin, Clock, MessageSquare,
  Instagram, Facebook, Twitter, Linkedin,
  Send, CheckCircle, AlertCircle
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    orderNumber: ""
  });

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Import supabase
      const { supabase } = await import("@/lib/supabase");

      // Insert the query into Supabase
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || null,
          message: formData.message,
          order_number: formData.orderNumber || null,
        },
      ]);

      if (error) {
        console.error("Error submitting form:", error);
        setFormStatus({
          type: "error",
          message: "There was an error submitting your query. Please try again or email us directly.",
        });
        return;
      }

      setFormStatus({
        type: "success",
        message: "Thank you for contacting us! We'll get back to you within 24 hours.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          orderNumber: "",
        });
        setFormStatus({ type: null, message: "" });
      }, 3000);
    } catch (err) {
      console.error("Unexpected error:", err);
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const officeLocations = [
    {
      city: "Jaipur (Head Office)",
      address: "Radhakrishna, Plot no.28, Shiva Colony II",
      area: "Hawa Sadak, Ramnagar Extension, Ramnagar, Jaipur, Rajasthan 302006",
      phone: "+91 8875332391",
      email: "contact@shadicards.in",
      hours: "Mon-Sat: 9:00 AM - 7:00 PM"
    }
  ];

  const faqs = [
    {
      question: "How long does it take to receive my order?",
      answer: "Standard orders are delivered within 7-10 business days. Express delivery options are available."
    },
    {
      question: "Can I see a sample before placing a bulk order?",
      answer: "Yes, we offer sample packs for ₹299 which includes 5 different invitation designs."
    },
    {
      question: "Do you provide custom design services?",
      answer: "Absolutely! Our design team can create custom invitations based on your specific requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets."
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-stone-50">
        {/* Hero Section */}
        <div className="relative py-16 px-4 text-center bg-gradient-to-r from-rose-500 to-pink-600">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-xl text-white/90">
              We're here to make your wedding invitation journey perfect
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {formStatus.type && (
                  <div className={`mb-6 p-4 rounded-lg flex items-start ${
                    formStatus.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}>
                    {formStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                    )}
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Order Number (if applicable)
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="SC-12345"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="custom">Custom Design Request</option>
                      <option value="bulk">Bulk Order</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                      <option value="partnership">Business Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:+918875332391" className="flex items-start hover:text-rose-600 transition-colors">
                    <Phone className="w-5 h-5 text-rose-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">+91 8875332391</p>
                      <p className="text-sm text-gray-600">Mon-Sat, 9 AM - 7 PM</p>
                    </div>
                  </a>
                  <a href="mailto:contact@shadicards.in" className="flex items-start hover:text-rose-600 transition-colors">
                    <Mail className="w-5 h-5 text-rose-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">contact@shadicards.in</p>
                      <p className="text-sm text-gray-600">24/7 Email Support</p>
                    </div>
                  </a>
                  <div className="flex items-start">
                    <MessageSquare className="w-5 h-5 text-rose-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 9 AM - 10 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Support Hours */}
              <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Support Hours
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-rose-200">
                    <p className="text-sm">Emergency Support: 24/7 via Email</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-4">Stay updated with latest designs and offers</p>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-rose-50 hover:border-rose-300 transition-colors">
                    <Instagram className="w-5 h-5 text-rose-600" />
                  </a>
                  <a href="#" className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-rose-50 hover:border-rose-300 transition-colors">
                    <Facebook className="w-5 h-5 text-rose-600" />
                  </a>
                  <a href="#" className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-rose-50 hover:border-rose-300 transition-colors">
                    <Twitter className="w-5 h-5 text-rose-600" />
                  </a>
                  <a href="#" className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-rose-50 hover:border-rose-300 transition-colors">
                    <Linkedin className="w-5 h-5 text-rose-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Offices</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {officeLocations.map((office, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                  <div className="flex items-start mb-4">
                    <MapPin className="w-5 h-5 text-rose-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{office.city}</h3>
                      <p className="text-gray-600 text-sm mt-1">{office.address}</p>
                      <p className="text-gray-600 text-sm">{office.area}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-rose-600">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-rose-600">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{office.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <summary className="font-semibold text-gray-900 cursor-pointer hover:text-rose-600">
                    {faq.question}
                  </summary>
                  <p className="text-gray-700 mt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
              <Link href="/faq" className="text-rose-600 hover:text-rose-700 font-medium">
                View All FAQs →
              </Link>
            </div>
          </div>

          {/* Additional Support Options */}
          <div className="mt-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our customer support team is ready to help you with any questions about your wedding invitations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+918875332391"
                className="bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-rose-600 transition-colors inline-flex items-center justify-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Live Chat
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}