"use client";

import { useState } from "react";
import { Phone, ArrowRight } from "lucide-react";

export default function PhoneInputSection() {
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

    console.log("Phone submitted:", phoneDigits);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Started Today
          </h2>
          <p className="text-xl text-rose-100 mb-10">
            Enter your phone number to create your wedding dashboard
          </p>
          
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-300 focus:border-transparent text-lg transition-all duration-300 shadow-lg"
                />
                {error && (
                  <p className="absolute -bottom-7 left-0 text-rose-200 text-sm mt-1">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-white text-rose-700 font-bold rounded-xl hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}