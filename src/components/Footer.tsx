import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ChevronRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" }
    ],
    products: [
      { name: "Wedding Invitations", href: "/features" },
      { name: "Save the Dates", href: "/save-the-dates" },
      { name: "Thank You Cards", href: "/thank-you-cards" },
      { name: "Digital Invitations", href: "/digital" },
      { name: "Custom Designs", href: "/custom" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "FAQs", href: "/faq" },
      { name: "Track Order", href: "/track" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Design Tips", href: "/design-tips" }
    ],
    legal: [
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Return Policy", href: "/return-policy" },
      { name: "Shipping Policy", href: "/shipping-policy" },
      { name: "Cookie Policy", href: "/cookie-policy" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/shadicards" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/shadicards" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/shadicards" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/shadicards" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Stay Updated with ShadiCards</h3>
            <p className="mb-6">Get exclusive offers, design tips, and wedding planning insights</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <button
                type="submit"
                className="bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Subscribe
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Shadiards_logo.svg"
                alt="ShadiCards"
                width={150}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              Creating beautiful beginnings with personalized wedding invitations since 2015.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-gray-600 hover:text-rose-600 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+918875332391"
                className="flex items-start text-gray-600 hover:text-rose-600 transition-colors"
              >
                <Phone className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                <span>+91 8875332391</span>
              </a>
              <a
                href="mailto:contact@shadicards.in"
                className="flex items-start text-gray-600 hover:text-rose-600 transition-colors"
              >
                <Mail className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                <span>contact@shadicards.in</span>
              </a>
              <div className="flex items-start text-gray-600">
                <MapPin className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {footerLinks.legal.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-rose-600 transition-colors"
                >
                  {link.name}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-gray-400 ml-4">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              © {currentYear} ShadiCards. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> in India
            </p>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Secure Payments</p>
            <div className="flex justify-center gap-4 text-gray-400">
              <span className="px-3 py-1 border border-gray-300 rounded text-xs">Visa</span>
              <span className="px-3 py-1 border border-gray-300 rounded text-xs">Mastercard</span>
              <span className="px-3 py-1 border border-gray-300 rounded text-xs">UPI</span>
              <span className="px-3 py-1 border border-gray-300 rounded text-xs">Net Banking</span>
              <span className="px-3 py-1 border border-gray-300 rounded text-xs">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}