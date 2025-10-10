import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShadiCards - Smart Wedding Cards | Digital RSVP & Guest Management",
  description: "India's first smart wedding cards. Track RSVPs in real-time, share live wedding moments, automated reminders, and digital guest management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${playfairDisplay.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
        <MobileStickyCTA />
      </body>
    </html>
  );
}
