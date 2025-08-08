"use client";

import { useState, useEffect } from "react";
import { Shield, CheckCircle, User, Calendar, Heart } from "lucide-react";

interface LoadingScreenProps {
  guestName?: string;
}

export default function LoadingScreen({ guestName }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { icon: Shield, text: "Verifying access", color: "text-blue-500" },
    { icon: User, text: guestName ? `Authenticating ${guestName}` : "Checking guest credentials", color: "text-purple-500" },
    { icon: Calendar, text: "Loading wedding details", color: "text-rose-500" },
    { icon: Heart, text: "Preparing your experience", color: "text-pink-500" },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(254.7,255,235)] via-[rgb(255,250,240)] to-[rgb(252,250,230)] flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full animate-pulse opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <CurrentIcon className={`w-12 h-12 ${steps[currentStep].color} transition-all duration-500 transform ${currentStep > 0 ? 'scale-110' : ''}`} />
            </div>
          </div>
        </div>

        {/* Status Text */}
        <h2 className="text-2xl font-light text-gray-900 mb-2">
          {steps[currentStep].text}
        </h2>
        <p className="text-sm text-gray-500 mb-8">Please wait while we prepare everything for you</p>

        {/* Progress Bar */}
        <div className="relative w-full max-w-xs mx-auto mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{progress}% Complete</p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-3 mb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white scale-110'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <step.icon className="w-4 h-4" />
              )}
            </div>
          ))}
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-1 mt-8">
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}