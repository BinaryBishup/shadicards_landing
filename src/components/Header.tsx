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
    title: "Guest Management",
    href: "/features/guest-management",
    description: "Organize your wedding guest list effortlessly",
    icon: "groups",
  },
  {
    title: "RSVP Tracking",
    href: "/features/rsvp",
    description: "Track responses with automated reminders",
    icon: "check_circle",
  },
  {
    title: "Event Scheduling",
    href: "/features/scheduling",
    description: "Manage all your wedding events in one place",
    icon: "event",
  },
  {
    title: "Digital Invitations",
    href: "/features/invitations",
    description: "Beautiful, customizable wedding invitations",
    icon: "mail",
  },
];

const templatesData = [
  {
    title: "Traditional",
    href: "/templates/traditional",
    description: "Classic Indian wedding invitation designs",
    icon: "temple_hindu",
  },
  {
    title: "Modern",
    href: "/templates/modern",
    description: "Contemporary and minimalist wedding cards",
    icon: "auto_awesome",
  },
  {
    title: "Royal",
    href: "/templates/royal",
    description: "Luxurious designs for grand celebrations",
    icon: "workspace_premium",
  },
  {
    title: "Floral",
    href: "/templates/floral",
    description: "Beautiful floral themed invitations",
    icon: "local_florist",
  },
];

const aboutData = [
  {
    title: "Our Story",
    href: "/about/story",
    description: "How ShadiCards is revolutionizing Indian weddings",
    icon: "menu_book",
  },
  {
    title: "Team",
    href: "/about/team",
    description: "Meet the people behind ShadiCards",
    icon: "diversity_3",
  },
  {
    title: "Press",
    href: "/about/press",
    description: "ShadiCards in the news",
    icon: "newspaper",
  },
  {
    title: "Contact",
    href: "/about/contact",
    description: "Get in touch with us",
    icon: "phone",
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
      <header className="bg-transparent relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-transparent rounded-2xl border border-gray-200 px-6 py-3">
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
                      <div className="w-auto p-5 bg-[#F5F5F5] rounded-2xl border-2 border-gray-900">
                        <p className="text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-4">GET STARTED</p>
                        <ul className="flex gap-6">
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
                      Templates
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-auto p-5 bg-[#F5F5F5] rounded-2xl border-2 border-gray-900">
                        <p className="text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-4">CHOOSE YOUR STYLE</p>
                        <ul className="flex gap-6">
                          {templatesData.map((template) => (
                            <ListItem
                              key={template.title}
                              title={template.title}
                              href={template.href}
                              icon={template.icon}
                            >
                              {template.description}
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
                      <Link href="/gallery" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent")}>
                        Gallery
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                      About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-auto p-5 bg-[#F5F5F5] rounded-2xl border-2 border-gray-900">
                        <p className="text-[11px] font-medium text-gray-600 uppercase tracking-wider mb-4">LEARN MORE</p>
                        <ul className="flex gap-6">
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
                href="/get-started"
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
    <li className="w-48">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-start gap-2 p-3 rounded-lg hover:bg-white/50 transition-colors",
            className
          )}
          {...props}
        >
          <span className="material-icons-outlined text-gray-700 text-[18px] mt-0.5">{icon}</span>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900 leading-tight">{title}</div>
            <p className="text-[11px] text-gray-600 leading-relaxed mt-0.5">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";