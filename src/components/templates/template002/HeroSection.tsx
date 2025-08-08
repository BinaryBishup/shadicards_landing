"use client";

import { Heart, Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import type { HeroData } from '@/types/wedding-template';
import React from 'react';

interface HeroSectionProps {
  data: HeroData;
  primaryColor?: string;
}

export default function HeroSection({ data, primaryColor = '#3b82f6' }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(data.weddingDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [data.weddingDate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Geometric Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-blue-300 rotate-45 opacity-20" />
        <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-purple-300 rounded-full opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-pink-300 opacity-20" />
      </div>

      <div className="relative z-10 text-center px-4 py-20 max-w-5xl mx-auto">
        {/* Modern Typography */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">We're Getting Married!</p>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {data.brideName}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-24" />
            <Heart className="w-8 h-8" style={{ color: primaryColor }} fill="currentColor" />
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-24" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {data.groomName}
          </h1>
        </div>

        {/* Modern Card Design */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-12 border border-white/50">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(data.weddingDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>

            {data.weddingTime && (
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Time</p>
                <p className="text-lg font-semibold text-gray-800">{data.weddingTime}</p>
              </div>
            )}

            {data.venue && (
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Venue</p>
                <p className="text-lg font-semibold text-gray-800">{data.venue}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modern Countdown */}
        <div>
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Countdown to the Big Day
            <Sparkles className="w-4 h-4" />
          </p>
          <div className="flex gap-3 justify-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-200" />
                <div className="relative bg-white rounded-2xl p-4 min-w-[90px] border border-gray-100">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}