"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Guest, Weddings } from "@/lib/supabase";
import {
  User, Phone, MapPin, Mail, Camera, Home, CheckCircle,
  ChevronRight, ChevronLeft, Plane, Train, Car, Bus, Bike,
  Hotel, Bed, Users, Check, Calendar, Upload, Music, Star,
  Utensils, FileText, X
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface ExtraField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'email' | 'tel' | 'radio' | 'date' | 'file';
  options?: string[];
  required?: boolean;
  placeholder?: string;
  enabled?: boolean;
  section?: string;
  order?: number;
}

interface EditPageContentProps {
  weddingId?: string;
  guestId?: string;
}

const travelModeIcons: { [key: string]: any } = {
  "Flight": Plane,
  "Train": Train,
  "Car": Car,
  "Bus": Bus,
  "Other": Bike
};

export default function EditPageContent({ weddingId, guestId }: EditPageContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [wedding, setWedding] = useState<Weddings | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    whatsapp: "",
    address: "",
    profile_image: "",
    extra_information: {} as { [key: string]: any }
  });
  const [extraFields, setExtraFields] = useState<ExtraField[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Group fields by section
  const getFieldsBySection = (section: string) => {
    return extraFields.filter(f => f.section === section);
  };

  // Define steps based on available sections
  const steps = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'travel', title: 'Travel', icon: Plane },
    { id: 'accommodation', title: 'Stay', icon: Hotel },
    { id: 'transport', title: 'Transport', icon: Car },
    { id: 'dietary', title: 'Food', icon: Utensils },
    { id: 'documents', title: 'Documents', icon: FileText },
    { id: 'entertainment', title: 'Entertainment', icon: Music },
  ].filter(step => {
    if (step.id === 'personal') return true;
    return getFieldsBySection(step.id).length > 0;
  });

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

      const weddingExtraInfo = weddingData.extra_information || {};
      const fields: ExtraField[] = Array.isArray(weddingExtraInfo.fields)
        ? weddingExtraInfo.fields.filter((f: ExtraField) => f.enabled !== false)
        : [];
      setExtraFields(fields);

      const guestExtraInfo = guestData.extra_information || {};

      setFormData({
        first_name: guestData.first_name || "",
        last_name: guestData.last_name || "",
        email: guestData.email || "",
        whatsapp: guestData.whatsapp || "",
        address: guestData.address || "",
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

  const updateExtraInfo = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      extra_information: {
        ...prev.extra_information,
        [fieldId]: value
      }
    }));
  };

  const renderIconCard = (field: ExtraField) => {
    const value = formData.extra_information[field.id] || "";

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {field.options?.map((option, i) => {
          const Icon = field.id === 'travel_mode' ? travelModeIcons[option] || Bike : null;
          const isSelected = value === option;

          return (
            <button
              key={i}
              type="button"
              onClick={() => updateExtraInfo(field.id, option)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected
                  ? 'border-rose-500 bg-rose-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-rose-300 hover:shadow-md'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              {Icon && (
                <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-rose-600' : 'text-gray-400'}`} />
              )}
              <p className={`text-sm font-medium text-center ${isSelected ? 'text-rose-600' : 'text-gray-700'}`}>
                {option}
              </p>
            </button>
          );
        })}
      </div>
    );
  };

  const renderField = (field: ExtraField) => {
    const value = formData.extra_information[field.id] || "";

    if (field.type === 'radio' && field.options) {
      return renderIconCard(field);
    }

    if (field.type === 'date') {
      return (
        <Input
          type="date"
          value={value}
          onChange={(e) => updateExtraInfo(field.id, e.target.value)}
          className="h-12 text-lg"
        />
      );
    }

    if (field.type === 'number') {
      return (
        <Input
          type="number"
          value={value}
          onChange={(e) => updateExtraInfo(field.id, parseInt(e.target.value) || 0)}
          placeholder={field.placeholder}
          className="h-12 text-lg"
          min="0"
        />
      );
    }

    if (field.type === 'textarea') {
      return (
        <Textarea
          value={value}
          onChange={(e) => updateExtraInfo(field.id, e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="text-lg resize-none"
        />
      );
    }

    if (field.type === 'select') {
      return (
        <div className="grid grid-cols-1 gap-2">
          {field.options?.map((option, i) => {
            const isSelected = value === option;
            return (
              <button
                key={i}
                type="button"
                onClick={() => updateExtraInfo(field.id, option)}
                className={`
                  p-4 rounded-lg border-2 transition-all text-left
                  ${isSelected
                    ? 'border-rose-500 bg-rose-50 text-rose-600 font-medium'
                    : 'border-gray-200 bg-white hover:border-rose-300'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isSelected && <Check className="w-5 h-5 text-rose-500" />}
                </div>
              </button>
            );
          })}
        </div>
      );
    }

    if (field.type === 'file') {
      return (
        <div className="space-y-3">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rose-400 transition-colors bg-gray-50 hover:bg-rose-50">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Click to upload</span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  const fileExt = file.name.split(".").pop();
                  const fileName = `${field.id}-${Date.now()}.${fileExt}`;

                  const { error: uploadError } = await supabase.storage
                    .from("guest-documents")
                    .upload(fileName, file, {
                      cacheControl: "3600",
                      upsert: false
                    });

                  if (uploadError) throw uploadError;

                  const { data: urlData } = supabase.storage
                    .from("guest-documents")
                    .getPublicUrl(fileName);

                  if (urlData.publicUrl) {
                    updateExtraInfo(field.id, urlData.publicUrl);
                  }
                } catch (error) {
                  console.error("Upload error:", error);
                  alert("Failed to upload file");
                }
              }}
              className="hidden"
            />
          </label>
          {value && (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm text-green-700 truncate flex-1">File uploaded</span>
              <Check className="w-5 h-5 text-green-600" />
            </div>
          )}
        </div>
      );
    }

    return (
      <Input
        type={field.type}
        value={value}
        onChange={(e) => updateExtraInfo(field.id, e.target.value)}
        placeholder={field.placeholder}
        className="h-12 text-lg"
      />
    );
  };

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];

    if (currentStepData.id === 'personal') {
      return (
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-rose-100 to-pink-200 border-4 border-rose-300 shadow-xl">
                {formData.profile_image ? (
                  <Image
                    src={formData.profile_image}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-rose-400" />
                  </div>
                )}
              </div>

              <label className="absolute bottom-0 right-0 w-10 h-10 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-lg">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
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
              Email Address
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your.email@example.com"
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
              placeholder="+1 234 567 8900"
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              Address
            </Label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Enter your address"
              rows={3}
              className="text-lg resize-none"
            />
          </div>
        </div>
      );
    }

    const sectionFields = getFieldsBySection(currentStepData.id);

    if (sectionFields.length === 0) {
      return <p className="text-center text-gray-500 py-8">No additional information needed for this section.</p>;
    }

    return (
      <div className="space-y-6">
        {sectionFields.map((field, index) => (
          <div key={index} className="space-y-3">
            <Label className="text-lg font-medium">
              {field.label}
              {field.required && <span className="text-rose-500 ml-1">*</span>}
            </Label>
            {renderField(field)}
          </div>
        ))}
      </div>
    );
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

  // Main multi-step form
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <h2 className="text-xl md:text-2xl text-rose-600 mb-2 font-semibold">
            {wedding.bride_first_name} & {wedding.groom_first_name}'s Wedding
          </h2>
          <p className="text-gray-600">Help us make your experience perfect</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                    ${isActive ? 'bg-rose-500 shadow-lg scale-110' : isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                  `}>
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <StepIcon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    )}
                  </div>
                  <p className={`text-xs text-center hidden sm:block ${isActive ? 'text-rose-600 font-semibold' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content Card */}
        <Card className="border-rose-100 shadow-2xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                {(() => {
                  const StepIcon = steps[currentStep].icon;
                  return <StepIcon className="w-7 h-7 text-rose-500" />;
                })()}
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>

            {/* Form Content */}
            <div className="min-h-[400px]">
              {renderStepContent()}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="flex-1 h-14 text-lg border-2"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving}
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
                      Complete
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>

            {/* Skip to End */}
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => router.push(`/wedding/${weddingId}?guest=${guestId}`)}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Skip for now
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
