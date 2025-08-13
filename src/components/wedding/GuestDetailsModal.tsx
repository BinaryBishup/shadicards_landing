"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Guest, Weddings } from "@/lib/supabase";
import { User, Phone, MapPin, Mail, Save, X, Camera, Heart } from "lucide-react";
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

interface GuestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  weddingId: string;
  guestId: string;
}

export default function GuestDetailsModal({ isOpen, onClose, weddingId, guestId }: GuestDetailsModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && weddingId && guestId) {
      loadGuestData();
    }
  }, [isOpen, weddingId, guestId]);

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
        .eq("id", guestId);

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-700/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="flex items-center justify-between relative">
            <div>
              <h2 className="text-2xl font-semibold">Update Your Details</h2>
              <p className="text-rose-100 text-sm mt-1">
                {wedding?.bride_name} & {wedding?.groom_name}'s Wedding
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {success && (
          <div className="bg-green-50 border-b border-green-200 px-6 py-3 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xs">✅</span>
              </div>
              <span className="font-medium">Details updated successfully!</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading guest details...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                      <div className="w-full border-t border-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500 font-medium">Additional Details</span>
                    </div>
                  </div>

                  <Card className="border-rose-100 shadow-sm">
                    <CardContent className="p-6">
                      {/* Header with Icon */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-pink-500"></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>
                          <p className="text-sm text-gray-500">Help us plan the perfect celebration for you</p>
                        </div>
                      </div>

                      {/* Fields Grid */}
                      <div className="grid gap-6">
                        {extraFields.map((field, index) => (
                          <div key={index} className="group space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium">
                              <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                              <span>{field.label}</span>
                              {field.required && <span className="text-rose-500 text-base">*</span>}
                            </Label>
                            <div className="relative">
                              {renderExtraField(field, index)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
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
                  onClick={onClose}
                  className="px-6 py-6 border-2 border-rose-200 text-rose-600 font-medium hover:bg-rose-50 transition-all"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}