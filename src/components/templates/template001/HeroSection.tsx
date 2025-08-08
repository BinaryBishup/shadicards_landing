"use client";

import { Heart, Calendar, MapPin, Clock } from 'lucide-react';
import type { HeroData } from '@/types/wedding-template';

interface HeroSectionProps {
  data: HeroData;
  primaryColor?: string;
}

export default function HeroSection({ data, primaryColor = '#ec4899' }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-4 py-20">
        {/* Names */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-serif text-gray-800 mb-4">
            <span className="block md:inline">{data.brideName}</span>
            <span className="block md:inline mx-4 text-3xl md:text-5xl" style={{ color: primaryColor }}>
              <Heart className="inline w-8 h-8 md:w-12 md:h-12" fill="currentColor" />
            </span>
            <span className="block md:inline">{data.groomName}</span>
          </h1>
          {data.tagline && (
            <p className="text-xl md:text-2xl text-gray-600 font-light italic mt-4">
              {data.tagline}
            </p>
          )}
        </div>

        {/* Wedding Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5" style={{ color: primaryColor }} />
              <div className="text-left">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{new Date(data.weddingDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</p>
              </div>
            </div>

            {data.weddingTime && (
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5" style={{ color: primaryColor }} />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">{data.weddingTime}</p>
                </div>
              </div>
            )}

            {data.venue && (
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="font-semibold">{data.venue}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mt-12">
          <CountdownTimer targetDate={data.weddingDate} primaryColor={primaryColor} />
        </div>
      </div>
    </section>
  );
}

function CountdownTimer({ targetDate, primaryColor }: { targetDate: string; primaryColor: string }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
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
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-white rounded-lg shadow-md p-4 min-w-[80px]">
          <div className="text-3xl font-bold" style={{ color: primaryColor }}>
            {value}
          </div>
          <div className="text-xs text-gray-500 uppercase">{unit}</div>
        </div>
      ))}
    </div>
  );
}

import React from 'react';