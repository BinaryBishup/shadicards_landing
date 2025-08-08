"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Sparkles, QrCode, MessageCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RestrictedAccessProps {
  coupleName: string;
  coupleImage?: string;
  weddingDate?: string;
}

export default function RestrictedAccess({ 
  coupleName = "Priya & Arjun",
  coupleImage = "/couple_image.jpg",
  weddingDate = "December 2024"
}: RestrictedAccessProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[rgb(254.7,255,235)] relative overflow-hidden">
      {/* Background pattern - similar to landing page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-100 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        {/* Couple Header */}
        <div className="text-center mb-12">
          {/* Sparkles Badge */}
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Exclusive Wedding Access</span>
          </div>

          {/* Couple Image */}
          <div className="mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl ring-4 ring-yellow-500/20 mx-auto">
              <Image
                src={coupleImage}
                alt={coupleName}
                width={160}
                height={160}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Couple Details */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
            {coupleName}
          </h1>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-2" />
          <p className="text-rose-600 text-sm tracking-widest uppercase">{weddingDate}</p>
        </div>

        {/* Access Card */}
        <Card className="backdrop-blur-sm bg-white/90 border-gray-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
              <Lock className="w-6 h-6 text-rose-600" />
            </div>
            <CardTitle className="text-2xl font-normal text-gray-900">
              This Wedding Page is Private
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Access this exclusive wedding experience using your invitation
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Access Options */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Smart Card Option */}
              <button
                onMouseEnter={() => setHoveredOption("smartcard")}
                onMouseLeave={() => setHoveredOption(null)}
                className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-rose-400 transition-all duration-300 text-left bg-white hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <QrCode className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Use Smart Card</h3>
                    <p className="text-sm text-gray-600">
                      Tap your NFC card or scan the QR code from your physical invitation
                    </p>
                  </div>
                </div>
                {hoveredOption === "smartcard" && (
                  <div className="absolute top-2 right-2">
                    <ArrowRight className="w-5 h-5 text-rose-500" />
                  </div>
                )}
              </button>

              {/* WhatsApp Link Option */}
              <button
                onMouseEnter={() => setHoveredOption("whatsapp")}
                onMouseLeave={() => setHoveredOption(null)}
                className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-green-400 transition-all duration-300 text-left bg-white hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp Link</h3>
                    <p className="text-sm text-gray-600">
                      Use the personalized link sent to you via WhatsApp invitation
                    </p>
                  </div>
                </div>
                {hoveredOption === "whatsapp" && (
                  <div className="absolute top-2 right-2">
                    <ArrowRight className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800 text-center">
                <span className="font-medium">Don't have access?</span> Please contact the couple or check your WhatsApp messages for the invitation link.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by{" "}
            <span className="font-medium text-gray-700">ShadiCards</span>
          </p>
        </div>
      </div>
    </div>
  );
}