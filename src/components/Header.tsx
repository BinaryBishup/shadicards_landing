"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const featuresData = [
  {
    title: "Smart Card",
    href: "/features/smart-card",
    description: "Intelligent cards with NFC and QR code technology",
    icon: "nfc",
  },
  {
    title: "Wedding Website",
    href: "/features/wedding-website",
    description: "Beautiful websites for your love story",
    icon: "language",
  },
  {
    title: "Guest Management",
    href: "/features/guest-management",
    description: "Automate guest management, from invite to check-in",
    icon: "groups",
  },
  {
    title: "WhatsApp Broadcasting",
    href: "/features/whatsapp-broadcasting",
    description: "Mass messaging and event reminders",
    icon: "chat",
  },
  {
    title: "Event Invitations",
    href: "/features/event-invitations",
    description: "Targeted invites for each wedding event",
    icon: "event",
  },
  {
    title: "Event Pictures",
    href: "/features/event-pictures",
    description: "AI-powered photo sharing and distribution",
    icon: "photo_camera",
  },
];

const themesData = [
  {
    title: "Traditional",
    href: "/themes/traditional",
    description: "Classic Indian wedding invitation designs",
    icon: "temple_hindu",
  },
  {
    title: "Modern",
    href: "/themes/modern",
    description: "Contemporary and minimalist wedding cards",
    icon: "auto_awesome",
  },
  {
    title: "Royal",
    href: "/themes/royal",
    description: "Luxurious designs for grand celebrations",
    icon: "workspace_premium",
  },
  {
    title: "Floral",
    href: "/themes/floral",
    description: "Beautiful floral themed invitations",
    icon: "local_florist",
  },
];

const aboutData = [
  {
    title: "About Us",
    href: "/about",
    description: "How ShadiCards is revolutionizing Indian weddings",
    icon: "menu_book",
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Get in touch with our team",
    icon: "phone",
  },
  {
    title: "Shipping Policy",
    href: "/shipping-policy",
    description: "Delivery timelines and shipping information",
    icon: "local_shipping",
  },
  {
    title: "Return Policy",
    href: "/return-policy",
    description: "Cancellation and refund policy",
    icon: "assignment_return",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    description: "How we protect your data",
    icon: "security",
  },
  {
    title: "Terms of Service",
    href: "/terms-of-service",
    description: "Our terms and conditions",
    icon: "gavel",
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection(openMobileSection === section ? null : section);
  };

  return (
    <>
      <div className="w-full bg-rose-600 text-white py-3 px-6 text-center text-sm">
        <span className="font-normal">Featured in Times of India:</span> ShadiCards transforms wedding planning with smart invitations
        <Link href="/article" className="ml-3 font-normal hover:underline">
          Read Article →
        </Link>
      </div>
      <header className="bg-transparent sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 px-6 py-3">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>

                <Link href="/" className="flex items-center">
                  <Image
                    src="/Shadiards_logo.svg"
                    alt="ShadiCards Logo"
                    width={360}
                    height={100}
                    className="h-12 w-auto"
                  />
                </Link>
              </div>

              <NavigationMenu className="hidden md:flex relative z-50">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                      Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[800px] p-6 bg-white rounded-2xl border border-gray-200 shadow-xl">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-6">POWERFUL FEATURES</p>
                        <ul className="grid grid-cols-2 gap-4">
                          {featuresData.map((feature) => (
                            <ListItem
                              key={feature.title}
                              title={feature.title}
                              href={feature.href}
                              icon={feature.icon}
                            >
                              {feature.description}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                      Themes
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[600px] p-6 bg-white rounded-2xl border border-gray-200 shadow-xl">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-6">CHOOSE YOUR STYLE</p>
                        <ul className="grid grid-cols-2 gap-4">
                          {themesData.map((theme) => (
                            <ListItem
                              key={theme.title}
                              title={theme.title}
                              href={theme.href}
                              icon={theme.icon}
                            >
                              {theme.description}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent")}>
                        Pricing
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/shop" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent")}>
                        Shop
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                      About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[600px] p-6 bg-white rounded-2xl border border-gray-200 shadow-xl">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-6">LEARN MORE</p>
                        <ul className="grid grid-cols-2 gap-4">
                          {aboutData.map((item) => (
                            <ListItem
                              key={item.title}
                              title={item.title}
                              href={item.href}
                              icon={item.icon}
                            >
                              {item.description}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <Link
                href="https://dashboard.shadicards.in/auth/login"
                className="hidden md:block px-6 py-2.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
              >
                Create Your Card
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] md:hidden overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/Shadiards_logo.svg"
                  alt="ShadiCards Logo"
                  width={200}
                  height={60}
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                {/* Features Accordion */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleMobileSection("features")}
                    className="w-full flex items-center justify-between py-4 text-left font-semibold text-gray-900 hover:text-rose-600 transition-colors"
                  >
                    <span>Features</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openMobileSection === "features" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileSection === "features" && (
                    <div className="pb-4 space-y-2">
                      {featuresData.map((feature) => (
                        <Link
                          key={feature.title}
                          href={feature.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="material-icons-outlined text-rose-600 text-[20px]">
                            {feature.icon}
                          </span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {feature.title}
                            </div>
                            <div className="text-xs text-gray-600">
                              {feature.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Themes Accordion */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleMobileSection("themes")}
                    className="w-full flex items-center justify-between py-4 text-left font-semibold text-gray-900 hover:text-rose-600 transition-colors"
                  >
                    <span>Themes</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openMobileSection === "themes" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileSection === "themes" && (
                    <div className="pb-4 space-y-2">
                      {themesData.map((theme) => (
                        <Link
                          key={theme.title}
                          href={theme.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="material-icons-outlined text-rose-600 text-[20px]">
                            {theme.icon}
                          </span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {theme.title}
                            </div>
                            <div className="text-xs text-gray-600">
                              {theme.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing Link */}
                <Link
                  href="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 font-semibold text-gray-900 hover:text-rose-600 transition-colors border-b border-gray-200"
                >
                  <span>Pricing</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>

                {/* Shop Link */}
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 font-semibold text-gray-900 hover:text-rose-600 transition-colors border-b border-gray-200"
                >
                  <span>Shop</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>

                {/* About Accordion */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleMobileSection("about")}
                    className="w-full flex items-center justify-between py-4 text-left font-semibold text-gray-900 hover:text-rose-600 transition-colors"
                  >
                    <span>About</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openMobileSection === "about" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileSection === "about" && (
                    <div className="pb-4 space-y-2">
                      {aboutData.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="material-icons-outlined text-rose-600 text-[20px]">
                            {item.icon}
                          </span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-600">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="https://dashboard.shadicards.in/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 w-full block text-center px-6 py-3 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
              >
                Create Your Card
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: string }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li className="w-full">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group block",
            className
          )}
          {...props}
        >
          <div className="flex gap-3 w-full">
            <span className="material-icons-outlined text-gray-600 group-hover:text-rose-600 text-[18px] mt-0.5 transition-colors flex-shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 group-hover:text-rose-600 leading-tight mb-1 transition-colors">{title}</div>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";