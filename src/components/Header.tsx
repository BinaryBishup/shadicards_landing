"use client";

import Link from "next/link";
import Image from "next/image";
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
              <Link href="/" className="flex items-center">
                <Image
                  src="/Shadiards_logo.svg"
                  alt="ShadiCards Logo"
                  width={360}
                  height={100}
                  className="h-12 w-auto"
                />
              </Link>
              
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
                className="px-6 py-2.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
              >
                Create Your Card
              </Link>
            </nav>
          </div>
        </div>
      </header>
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