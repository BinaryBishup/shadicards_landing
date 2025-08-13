"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Guest, Weddings } from "@/lib/supabase";
import { User, Phone, MapPin, Mail, Save, ArrowLeft, Camera, Heart } from "lucide-react";
import Image from "next/image";

interface ExtraField {
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'email' | 'tel';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

function GuestDetailsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [wedding, setWedding] = useState<Weddings | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    address: "",
    dietary_preferences: "",
    profile_image: "",
    extra_information: {} as { [key: string]: any }
  });
  const [extraFields, setExtraFields] = useState<ExtraField[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const weddingId = searchParams?.get("wedding_id");
  const guestId = searchParams?.get("guest_id");

  useEffect(() => {
    if (!weddingId || !guestId) {
      setError("Missing wedding ID or guest ID");
      setLoading(false);
      return;
    }
    loadGuestData();
  }, [weddingId, guestId]);

  const loadGuestData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load guest data
      const { data: guestData, error: guestError } = await supabase
        .from("guests")
        .select("*")
        .eq("id", guestId)
        .eq("wedding_id", weddingId)
        .single();

      if (guestError || !guestData) {
        throw new Error("Guest not found");
      }

      // Load wedding data
      const { data: weddingData, error: weddingError } = await supabase
        .from("weddings")
        .select("*")
        .eq("id", weddingId)
        .single();

      if (weddingError || !weddingData) {
        throw new Error("Wedding not found");
      }

      setGuest(guestData);
      setWedding(weddingData);

      // Parse extra fields from wedding configuration
      const extraInfo = weddingData.extra_information || {};
      const fields: ExtraField[] = Array.isArray(extraInfo.fields) ? extraInfo.fields : [];
      setExtraFields(fields);

      // Set form data
      setFormData({
        name: guestData.name || "",
        email: guestData.email || "",
        whatsapp: guestData.whatsapp || "",
        address: guestData.address || "",
        dietary_preferences: guestData.dietary_preferences || "",
        profile_image: guestData.profile_image || "",
        extra_information: guestData.extra_information || {}
      });

    } catch (err) {
      console.error("Error loading guest data:", err);
      setError(err instanceof Error ? err.message : "Failed to load guest data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from("guests")
        .update({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          address: formData.address,
          dietary_preferences: formData.dietary_preferences,
          profile_image: formData.profile_image,
          extra_information: formData.extra_information,
          updated_at: new Date().toISOString()
        })
        .eq("id", guestId);

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Redirect back to wedding page
        if (wedding) {
          router.push(`/wedding/${wedding.url_slug}?guest=${guestId}`);
        }
      }, 2000);

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

    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("guest-profiles")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
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

  const renderExtraField = (field: ExtraField, index: number) => {
    const value = formData.extra_information[field.label] || "";

    const handleChange = (newValue: any) => {
      setFormData(prev => ({
        ...prev,
        extra_information: {
          ...prev.extra_information,
          [field.label]: newValue
        }
      }));
    };

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            key={index}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all bg-white text-gray-700 resize-none"
          />
        );

      case "select":
        return (
          <select
            key={index}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            required={field.required}
            className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all bg-white text-gray-700"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <label key={index} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleChange(e.target.checked)}
              className="w-5 h-5 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 focus:ring-2"
            />
            <span className="text-gray-700">{field.placeholder || `Yes, ${field.label.toLowerCase()}`}</span>
          </label>
        );

      default:
        return (
          <input
            key={index}
            type={field.type}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all bg-white text-gray-700"
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guest details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-rose-600 text-white px-6 py-2 rounded-xl hover:bg-rose-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-rose-600 hover:text-rose-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Wedding</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-900 mb-2">Guest Details</h1>
            <p className="text-gray-600">
              {wedding?.bride_name} & {wedding?.groom_name}'s Wedding
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm">✅</span>
            </div>
            <span className="text-green-800 font-medium">Details updated successfully!</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-rose-100 to-pink-200 border-4 border-rose-300 mx-auto shadow-lg">
                {formData.profile_image ? (
                  <Image
                    src={formData.profile_image}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-8 h-8 text-rose-400" />
                  </div>
                )}
              </div>
              
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-lg">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">Click camera to upload photo</p>
          </div>

          {/* Basic Fields */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 text-rose-500" />
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all bg-white text-gray-700"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 text-rose-500" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all bg-white text-gray-700"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 text-rose-500" />
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all bg-white text-gray-700"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all bg-white text-gray-700 resize-none"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Dietary Preferences
            </label>
            <input
              type="text"
              value={formData.dietary_preferences}
              onChange={(e) => setFormData({...formData, dietary_preferences: e.target.value})}
              className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all bg-white text-gray-700"
              placeholder="Any dietary restrictions or preferences"
            />
          </div>

          {/* Extra Fields */}
          {extraFields.length > 0 && (
            <>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  {extraFields.map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-rose-500 ml-1">*</span>}
                      </label>
                      {renderExtraField(field, index)}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Details</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function GuestDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <GuestDetailsContent />
    </Suspense>
  );
}