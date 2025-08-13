"use client";

import { useState, useEffect, useRef } from "react";
import { User, Phone, MapPin, Camera, X, Check, Save, ChevronDown } from "lucide-react";
import { uploadProfilePicture } from "@/lib/storage-utils";
import Image from "next/image";

// Country codes for phone number
const countryCodes = [
  { code: '+91', country: 'IN', name: 'India' },
  { code: '+1', country: 'US', name: 'United States' },
  { code: '+44', country: 'GB', name: 'United Kingdom' },
  { code: '+61', country: 'AU', name: 'Australia' },
  { code: '+971', country: 'AE', name: 'UAE' },
  { code: '+65', country: 'SG', name: 'Singapore' },
  { code: '+81', country: 'JP', name: 'Japan' },
];

interface GuestEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestData?: {
    name: string;
    phone?: string;
    address?: string;
    profile_image?: string;
  };
  onSave?: (data: any) => void;
}

// Google Places Autocomplete Component
const AddressAutocomplete = ({ 
  value, 
  onChange, 
  placeholder = "Start typing your address..." 
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    if (!(window as any).google || !inputRef.current) return;

    autocompleteRef.current = new (window as any).google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      fields: ['formatted_address', 'geometry', 'address_components']
    });

    const autocomplete = autocompleteRef.current;
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address);
      }
    });

    return () => {
      if (autocompleteRef.current && (window as any).google && (window as any).google.maps && (window as any).google.maps.event) {
        (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all bg-white placeholder-gray-400"
    />
  );
};

export default function GuestEditModal({ 
  isOpen,
  onClose,
  guestData = {
    name: "",
    phone: "",
    address: "",
    profile_image: ""
  },
  onSave
}: GuestEditModalProps) {
  const [formData, setFormData] = useState(guestData);
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Google Places script
  useEffect(() => {
    if (!(window as any).google && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData(guestData);
      setPreviewImage(guestData.profile_image || null);
      
      // Parse existing phone number
      if (guestData.phone) {
        const country = countryCodes.find(c => guestData.phone?.startsWith(c.code));
        if (country) {
          setCountryCode(country.code);
          setPhoneNumber(guestData.phone.replace(country.code, '').trim());
        } else {
          setPhoneNumber(guestData.phone);
        }
      }
    }
  }, [isOpen, guestData]);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setUploadingImage(true);
    try {
      const result = await uploadProfilePicture(file);
      
      if (result.success && result.publicUrl) {
        setFormData(prev => ({ ...prev, profile_image: result.publicUrl }));
      } else {
        console.error('Upload error:', result.error);
        alert(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const fullPhoneNumber = countryCode + phoneNumber;
    const updatedData = {
      ...formData,
      phone: fullPhoneNumber
    };

    try {
      if (onSave) {
        onSave(updatedData);
      }
      
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Update Your Profile</h2>
              <p className="text-pink-100 text-sm mt-1">Let us know more about you</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {showSuccess && (
          <div className="bg-pink-50 border-b border-pink-200 px-6 py-3">
            <div className="flex items-center gap-2 text-pink-700">
              <Check className="w-5 h-5" />
              <span className="font-medium">Profile updated successfully!</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-pink-100 border-4 border-pink-200 mx-auto">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-pink-400" />
                    </div>
                  )}
                </div>
                
                {/* Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              
              <p className="text-sm text-gray-500 mt-2">Click the camera to upload a photo</p>
            </div>

            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 text-pink-500" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 text-pink-500" />
                Phone Number
              </label>
              <div className="flex gap-2">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <select 
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 appearance-none bg-white pr-8 min-w-[80px]"
                  >
                    {countryCodes.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.code}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                
                {/* Phone Number Input */}
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Address with Google Autocomplete */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                Address
              </label>
              <AddressAutocomplete
                value={formData.address || ''}
                onChange={(value) => setFormData({...formData, address: value})}
                placeholder="Start typing your address..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading || uploadingImage}
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Profile</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-pink-200 text-pink-600 font-medium rounded-xl hover:bg-pink-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}