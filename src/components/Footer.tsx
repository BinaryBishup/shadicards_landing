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
      { name: "Pricing", href: "/pricing" }
    ],
    features: [
      { name: "Wedding Website", href: "/features/wedding-website" },
      { name: "Smart Card", href: "/features/smart-card" },
      { name: "Event Invitations", href: "/features/event-invitations" },
      { name: "Guest Management", href: "/features/guest-management" },
      { name: "WhatsApp Broadcasting", href: "/features/whatsapp-broadcasting" },
      { name: "Event Pictures", href: "/features/event-pictures" }
    ],
    policies: [
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Return Policy", href: "/return-policy" },
      { name: "Shipping Policy", href: "/shipping-policy" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/shadicards" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/shadicards" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/shadicards" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/shadicards" }
  ];

  return (
    <footer className="bg-gradient-to-b from-rose-600 via-rose-700 to-rose-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-rose-700 to-rose-900 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Shadiards_logo.svg"
                alt="ShadiCards"
                width={150}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-rose-100 mb-4">
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
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white hover:shadow-md transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-white hover:text-rose-600 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-rose-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-rose-100 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+918875332391"
                className="flex items-start text-rose-100 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                <span>+91 8875332391</span>
              </a>
              <a
                href="mailto:contact@shadicards.in"
                className="flex items-start text-rose-100 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                <span>contact@shadicards.in</span>
              </a>
              <div className="flex items-start text-rose-100">
                <MapPin className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Links */}
        <div className="border-t border-rose-500/30 pt-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {footerLinks.policies.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-sm text-rose-100 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
                {index < footerLinks.policies.length - 1 && (
                  <span className="text-rose-300/50 ml-4">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <p className="text-rose-100 mb-2">
              © {currentYear} ShadiCards. All rights reserved.
            </p>
            <p className="text-sm text-rose-200 flex items-center justify-center">
              Made with <Heart className="w-4 h-4 mx-1 text-white fill-white" /> in India
            </p>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 text-center">
            <p className="text-sm text-rose-100 mb-3">Secure Payments</p>
            <div className="flex justify-center gap-4">
              <span className="px-3 py-1 border border-white/30 rounded text-xs text-white">Visa</span>
              <span className="px-3 py-1 border border-white/30 rounded text-xs text-white">Mastercard</span>
              <span className="px-3 py-1 border border-white/30 rounded text-xs text-white">UPI</span>
              <span className="px-3 py-1 border border-white/30 rounded text-xs text-white">Net Banking</span>
              <span className="px-3 py-1 border border-white/30 rounded text-xs text-white">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}