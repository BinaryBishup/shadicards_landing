"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MobileStickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
      <Link
        href="https://dashboard.shadicards.in/auth/login"
        className="pointer-events-auto w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <span>Get started for free</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
