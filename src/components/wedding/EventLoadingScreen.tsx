"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import Image from "next/image";

interface EventLoadingScreenProps {
  eventName?: string;
}

export default function EventLoadingScreen({ eventName }: EventLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { icon: Calendar, text: "Loading event details", color: "text-purple-500" },
    { icon: MapPin, text: "Preparing venue information", color: "text-blue-500" },
    { icon: Users, text: "Fetching guest list", color: "text-rose-500" },
    { icon: Sparkles, text: eventName ? `Opening ${eventName}` : "Preparing your experience", color: "text-pink-500" },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 25);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        {/* ShadiCards Logo */}
        <div className="mb-8">
          <Image
            src="/Shadiards_logo.svg"
            alt="ShadiCards"
            width={150}
            height={45}
            className="mx-auto opacity-90"
            priority
          />
        </div>

        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full animate-pulse opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CurrentIcon className={`w-12 h-12 ${steps[currentStep].color} transition-all duration-500 transform ${currentStep > 0 ? 'scale-110' : ''}`} />
            </div>
          </div>
        </div>

        {/* Status Text */}
        <h2 className="text-2xl font-light text-gray-900 mb-2">
          {steps[currentStep].text}
        </h2>
        <p className="text-sm text-gray-500 mb-8">Just a moment...</p>

        {/* Progress Bar */}
        <div className="relative w-full max-w-xs mx-auto mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-1 mt-8">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}