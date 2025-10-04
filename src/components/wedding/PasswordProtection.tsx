"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Eye, EyeOff, Lock, Sparkles, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordProtectionProps {
  coupleName?: string;
  coupleImage?: string;
  weddingDate?: string;
  isHidden?: boolean;
  onPasswordSubmit?: (password: string) => void;
  passwordError?: string | null;
}

export default function PasswordProtection({
  coupleName = "Priya & Arjun",
  coupleImage = "/couple_image.jpg",
  weddingDate = "December 2024",
  isHidden = false,
  onPasswordSubmit,
  passwordError = null
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || password.length === 0) {
      return;
    }

    setIsLoading(true);

    if (onPasswordSubmit) {
      onPasswordSubmit(password);
    }

    // Reset loading after a short delay
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-[rgb(254.7,255,235)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(254.7,255,235)] to-[rgb(252,250,230)]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 rounded-full filter blur-3xl opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-2xl">
        {/* Couple Header */}
        <div className="text-center mb-12">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            <span>{isHidden ? "Private Wedding Page" : "Password Protected"}</span>
          </div>

          {/* Couple Image */}
          <div className="mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-400 shadow-2xl ring-4 ring-purple-400/20 mx-auto relative">
              <Image
                src={coupleImage}
                alt={coupleName}
                width={160}
                height={160}
                className="object-cover w-full h-full"
              />
              {/* Overlay for hidden state */}
              {isHidden && (
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Couple Details */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
            {coupleName}
          </h1>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-2" />
          <p className="text-purple-600 text-sm tracking-widest uppercase">{weddingDate}</p>
        </div>

        {/* Password Card */}
        <Card className="backdrop-blur-sm bg-white/90 border-gray-200 shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-normal text-gray-900">
              {isHidden ? "This Page is Hidden" : "Enter Password"}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {isHidden 
                ? "This wedding page is currently hidden from public view. Enter the password to access."
                : "This wedding page is password protected. Please enter the password shared by the couple."}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pr-10 h-12 bg-white border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {passwordError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm">{passwordError}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-full transition-all transform hover:scale-[1.02]"
                disabled={isLoading || !password}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Access Wedding Page"
                )}
              </Button>
            </form>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Need the password?</p>
                  <p>Contact the couple directly or check your invitation message for the password.</p>
                </div>
              </div>
            </div>

            {/* Additional Info for Hidden Pages */}
            {isHidden && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  This page is temporarily hidden and will be made public by the couple when ready.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Secured by{" "}
            <span className="font-medium text-gray-700">ShadiCards</span>
          </p>
        </div>
      </div>
    </div>
  );
}