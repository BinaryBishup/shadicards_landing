"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

interface PhoneInputProps {
  onSubmit?: (phone: string) => void;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export default function PhoneInput({ 
  onSubmit, 
  placeholder = "Enter your phone number",
  buttonText = "Get Started",
  className = ""
}: PhoneInputProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`;
    }
    return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 7)} ${phoneNumber.slice(7, 12)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = phone.replace(/[^\d]/g, "");
    
    if (phoneDigits.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    if (onSubmit) {
      onSubmit(phoneDigits);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Phone className="w-5 h-5" />
          </div>
          <input
            type="tel"
            value={phone}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg transition-all duration-300 shadow-sm hover:shadow-md"
          />
          {error && (
            <p className="absolute -bottom-6 left-0 text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold rounded-2xl hover:from-rose-700 hover:to-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}