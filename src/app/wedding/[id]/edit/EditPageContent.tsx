"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Guest, Weddings } from "@/lib/supabase";
import { User, Phone, MapPin, Mail, Save, X, Camera, Heart, Home, CheckCircle, ChevronDown, AlignLeft, Hash, CheckSquare, Type } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface ExtraField {
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'email' | 'tel';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

interface EditPageContentProps {
  weddingId?: string;
  guestId?: string;
}

export default function EditPageContent({ weddingId, guestId }: EditPageContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [wedding, setWedding] = useState<Weddings | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    whatsapp: "",
    address: "",
    dietary_preferences: "",
    profile_image: "",
    extra_information: {} as { [key: string]: any }
  });
  const [extraFields, setExtraFields] = useState<ExtraField[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (weddingId && guestId) {
      loadGuestData();
    } else {
      setError("Missing wedding or guest information");
      setLoading(false);
    }
  }, [weddingId, guestId]);

  const loadGuestData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load guest data
      const { data: guestData, error: guestError } = await supabase
        .from("guests")
        .select("*")
        .eq("id", guestId!)
        .eq("wedding_id", weddingId!)
        .single();

      if (guestError || !guestData) {
        throw new Error("Guest not found");
      }

      // Load wedding data
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

      // Parse extra fields from wedding extra_information (defines what to collect)
      const weddingExtraInfo = weddingData.extra_information || {};
      const fields: ExtraField[] = Array.isArray(weddingExtraInfo.fields) ? weddingExtraInfo.fields : [];
      setExtraFields(fields);

      // Parse guest's extra_information values
      const guestExtraInfo = guestData.extra_information || {};

      // Set form data with guest's extra_information values
      setFormData({
        first_name: guestData.first_name || "",
        last_name: guestData.last_name || "",
        email: guestData.email || "",
        whatsapp: guestData.whatsapp || "",
        address: guestData.address || "",
        dietary_preferences: guestData.dietary_preferences || "",
        profile_image: guestData.profile_image || "",
        extra_information: guestExtraInfo
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
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          address: formData.address,
          dietary_preferences: formData.dietary_preferences,
          profile_image: formData.profile_image,
          extra_information: formData.extra_information,
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
          <Textarea
            key={index}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className="resize-none transition-all"
          />
        );

      case "select":
        return (
          <Select key={index} value={value} onValueChange={handleChange} required={field.required}>
            <SelectTrigger className="transition-all">
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, i) => (
                <SelectItem key={i} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div key={index} className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => handleChange(e.target.checked)}
                className="peer sr-only"
                id={`checkbox-${index}`}
              />
              <label
                htmlFor={`checkbox-${index}`}
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-input ring-offset-background transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-checked:bg-rose-500 peer-checked:border-rose-500 peer-checked:text-white hover:bg-rose-50"
              >
                {value && (
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
            </div>
            <label htmlFor={`checkbox-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              {field.placeholder || `Yes, ${field.label.toLowerCase()}`}
            </label>
          </div>
        );

      case "number":
        return (
          <Input
            key={index}
            type="number"
            value={value}
            onChange={(e) => handleChange(parseInt(e.target.value) || 0)}
            placeholder={field.placeholder}
            required={field.required}
            min="0"
            className="transition-all"
          />
        );

      default:
        return (
          <Input
            key={index}
            type={field.type}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="transition-all"
          />
        );
    }
  };

  // Success Page
  if (showSuccess && wedding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <Card className="border-rose-100 shadow-xl">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
              <h2 className="text-xl text-rose-600 mb-6 font-semibold">
                {wedding.bride_name} & {wedding.groom_name}
              </h2>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Your details have been successfully updated! We're excited to celebrate this special moment with you. 
                Your preferences will help us make this celebration even more memorable for everyone.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={() => router.push(`/wedding/${weddingId}?guest=${guestId}`)}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 text-lg"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Wedding
                </Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  See you at the celebration! 💕
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !wedding || !guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-6">{error || "Something went wrong."}</p>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Main edit page
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Your Details</h1>
          <h2 className="text-xl text-rose-600 mb-4 font-semibold">
            {wedding.bride_name} & {wedding.groom_name}'s Wedding
          </h2>
          <p className="text-gray-600">Help us make your experience perfect</p>
        </div>

        {/* Form */}
        <Card className="border-rose-100 shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4 text-rose-500" />
                    First Name *
                  </Label>
                  <Input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    placeholder="First name"
                    className="transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4 text-rose-500" />
                    Last Name *
                  </Label>
                  <Input
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    placeholder="Last name"
                    className="transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-rose-500" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  className="transition-all"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="w-4 h-4 text-rose-500" />
                  WhatsApp Number
                </Label>
                <Input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="+1 234 567 8900"
                  className="transition-all"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  Address
                </Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter your address"
                  className="resize-none transition-all"
                  rows={3}
                />
              </div>

              {/* Dietary Preferences */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Dietary Preferences
                </Label>
                <Input
                  type="text"
                  value={formData.dietary_preferences}
                  onChange={(e) => setFormData({...formData, dietary_preferences: e.target.value})}
                  placeholder="Any dietary restrictions or preferences"
                  className="transition-all"
                />
              </div>

              {/* Extra Fields */}
              {extraFields.length > 0 && (
                <div className="mt-8">
                  {/* Decorative Divider */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500 font-medium">Additional Details</span>
                    </div>
                  </div>

                  {/* Fields in same style as rest of form */}
                  <div className="space-y-6">
                    {extraFields.map((field, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                          <div className="w-4 h-4 text-rose-500">
                            {field.type === 'select' && <ChevronDown className="w-4 h-4" />}
                            {field.type === 'textarea' && <AlignLeft className="w-4 h-4" />}
                            {field.type === 'number' && <Hash className="w-4 h-4" />}
                            {field.type === 'checkbox' && <CheckSquare className="w-4 h-4" />}
                            {field.type === 'text' && <Type className="w-4 h-4" />}
                          </div>
                          {field.label}
                          {field.required && <span className="text-rose-500">*</span>}
                        </Label>
                        {renderExtraField(field, index)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-6">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-6 px-6 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      <span>Save Details</span>
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/wedding/${weddingId}?guest=${guestId}`)}
                  className="px-6 py-6 border-2 border-rose-200 text-rose-600 font-medium hover:bg-rose-50 transition-all"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}