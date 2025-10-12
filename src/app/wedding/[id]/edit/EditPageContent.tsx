"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { supabase } from "@/lib/supabase";
import type { Guest, Weddings } from "@/lib/supabase";
import {
  User, Phone, MapPin, Mail, Camera, Home, CheckCircle,
  Check, X
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Google Maps is already declared in global types

interface EditPageContentProps {
  weddingId?: string;
  guestId?: string;
}

export default function EditPageContent({ weddingId, guestId }: EditPageContentProps) {
  const router = useRouter();
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [wedding, setWedding] = useState<Weddings | null>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    whatsapp: "",
    address: "",
    profile_image: ""
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (weddingId && guestId) {
      loadGuestData();
    } else {
      setError("Missing wedding or guest information");
      setLoading(false);
    }
  }, [weddingId, guestId]);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (googleMapsLoaded && addressInputRef.current && typeof window !== 'undefined' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ['address'],
        fields: ['formatted_address', 'address_components']
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setFormData(prev => ({ ...prev, address: place.formatted_address || '' }));
        }
      });
    }
  }, [googleMapsLoaded]);

  const loadGuestData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: guestData, error: guestError } = await supabase
        .from("guests")
        .select("*")
        .eq("id", guestId!)
        .eq("wedding_id", weddingId!)
        .single();

      if (guestError || !guestData) {
        throw new Error("Guest not found");
      }

      const { data: weddingData, error: weddingError } = await supabase
        .from("weddings")
        .select("*")
        .eq("id", weddingId!)
        .single();

      if (weddingError || !weddingData) {
        throw new Error("Wedding not found");
      }

      setGuest(guestData);
      setWedding(weddingData);

      setFormData({
        first_name: guestData.first_name || "",
        last_name: guestData.last_name || "",
        email: guestData.email || "",
        whatsapp: guestData.whatsapp || "",
        address: guestData.address || "",
        profile_image: guestData.profile_image || ""
      });

    } catch (err) {
      console.error("Error loading guest data:", err);
      setError(err instanceof Error ? err.message : "Failed to load guest data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from("guests")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          address: formData.address,
          profile_image: formData.profile_image,
          updated_at: new Date().toISOString()
        })
        .eq("id", guestId!);

      if (updateError) {
        throw updateError;
      }

      setShowSuccess(true);

    } catch (err) {
      console.error("Error saving guest data:", err);
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("guest-profiles")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("guest-profiles")
        .getPublicUrl(fileName);

      if (urlData.publicUrl) {
        setFormData(prev => ({ ...prev, profile_image: urlData.publicUrl }));
      }

    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    }
  };


  // Success Page
  if (showSuccess && wedding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-rose-100 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Set!</h1>
            <h2 className="text-2xl text-rose-600 mb-6 font-semibold">
              {wedding.bride_first_name} & {wedding.groom_first_name}
            </h2>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Thank you for completing your profile! We're excited to celebrate this special moment with you.
              Your preferences will help us make this celebration unforgettable for everyone.
            </p>

            <Button
              onClick={() => router.push(`/wedding/${weddingId}?guest=${guestId}`)}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-6 text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Wedding
            </Button>

            <p className="text-sm text-gray-500 mt-6">
              See you at the celebration! 💕
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !wedding || !guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
            <p className="text-gray-600 mb-6">{error || "Something went wrong."}</p>
            <Button onClick={() => router.push("/")}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main form
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={() => setGoogleMapsLoaded(true)}
        strategy="lazyOnload"
      />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <h2 className="text-xl md:text-2xl text-rose-600 mb-2 font-semibold">
              {wedding.bride_first_name} & {wedding.groom_first_name}'s Wedding
            </h2>
            <p className="text-gray-600">Please provide your basic information</p>
          </div>

          {/* Form Card */}
          <Card className="border-rose-100 shadow-2xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <User className="w-7 h-7 text-rose-500" />
                  Personal Information
                </h3>
                <p className="text-gray-600">Update your details</p>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Profile Image */}
                {formData.profile_image && (
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Image
                        src={formData.profile_image}
                        alt="Profile"
                        width={120}
                        height={120}
                        className="rounded-full object-cover border-4 border-rose-100"
                      />
                    </div>
                  </div>
                )}

                {/* Profile Image Upload */}
                <div className="space-y-2">
                  <Label className="text-lg font-medium flex items-center gap-2">
                    <Camera className="w-5 h-5 text-rose-500" />
                    Profile Photo
                  </Label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rose-400 transition-colors bg-gray-50 hover:bg-rose-50">
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {formData.profile_image ? "Change Photo" : "Upload Photo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-lg font-medium">First Name *</Label>
                    <Input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      placeholder="Enter first name"
                      className="h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-lg font-medium">Last Name *</Label>
                    <Input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                      placeholder="Enter last name"
                      className="h-12 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-medium flex items-center gap-2">
                    <Mail className="w-5 h-5 text-rose-500" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-medium flex items-center gap-2">
                    <Phone className="w-5 h-5 text-rose-500" />
                    WhatsApp Number
                  </Label>
                  <Input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    placeholder="Enter your WhatsApp number"
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-medium flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    Address *
                  </Label>
                  <Input
                    ref={addressInputRef}
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Start typing your address..."
                    className="h-12 text-lg"
                  />
                  <p className="text-sm text-gray-500">Start typing and select from suggestions</p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/wedding/${weddingId}?guest=${guestId}`)}
                  className="flex-1 h-14 text-lg border-2"
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving || !formData.first_name || !formData.last_name || !formData.address}
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
