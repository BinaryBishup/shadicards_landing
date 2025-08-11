"use client";

import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import type { HeroData } from '@/types/wedding-template';

interface HeroSectionProps {
  data: HeroData;
  primaryColor?: string;
}

export default function HeroSection({ data, primaryColor = '#3b82f6' }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Couple Photo with Floral Frame */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              {/* Floral Frame Background - Larger on desktop */}
              <div className="absolute inset-0 -inset-x-16 -inset-y-16 md:-inset-x-20 md:-inset-y-20 lg:-inset-x-24 lg:-inset-y-24 pointer-events-none">
                <Image
                  src="/templates/assets/flower_couple_background.png"
                  alt="Floral Frame"
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Couple Photo - Larger on desktop */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-white shadow-2xl">
                {data.coupleImage ? (
                  <Image
                    src={data.coupleImage}
                    alt={`${data.brideName} & ${data.groomName}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <Heart className="w-32 h-32 text-blue-200" fill="currentColor" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Names and Calendar */}
          <div className="text-center lg:text-left space-y-6 order-1 lg:order-2">
            {/* Names - Using exact style from reference */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-800">
                <span className="font-normal">{data.brideName}</span>
                <span className="block text-3xl md:text-4xl my-2" style={{ color: primaryColor }}>
                  &
                </span>
                <span className="font-normal">{data.groomName}</span>
              </h1>
              {data.tagline && (
                <p className="text-base md:text-lg text-gray-500 mt-4">
                  {data.tagline}
                </p>
              )}
            </div>

            {/* Calendar Design - Transparent background, compact spacing */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Top Floral Decoration - Larger */}
              <div className="absolute -top-12 left-0 right-0 h-20 md:h-24 pointer-events-none z-10">
                <Image
                  src="/templates/assets/flower_calendar_top.png"
                  alt="Calendar Top Decoration"
                  width={500}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Month and Year */}
              <div className="text-center mb-2 pt-8">
                <h2 className="text-xl md:text-2xl font-light text-gray-700">
                  {new Date(data.weddingDate).toLocaleDateString('en-US', { 
                    month: 'long',
                    year: 'numeric'
                  })}
                </h2>
              </div>

              {/* Calendar Grid - Compact with no background */}
              <div className="px-4">
                <CalendarGrid weddingDate={data.weddingDate} primaryColor={primaryColor} />
              </div>

              {/* Bottom Floral Decoration - Larger */}
              <div className="absolute -bottom-10 left-0 right-0 h-16 md:h-20 pointer-events-none z-10">
                <Image
                  src="/templates/assets/flower_calendar_down.png"
                  alt="Calendar Bottom Decoration"
                  width={500}
                  height={60}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Venue Only - No time */}
            {data.venue && (
              <div className="pt-4">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
                  <p className="text-gray-700">
                    <span className="font-medium">Venue:</span> {data.venue}
                  </p>
                </div>
              </div>
            )}

            {/* Countdown Timer */}
            <div className="pt-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider text-center lg:text-left mb-3">
                Countdown to the big day
              </p>
              <CountdownTimer targetDate={data.weddingDate} primaryColor={primaryColor} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarGrid({ weddingDate, primaryColor }: { weddingDate: string; primaryColor: string }) {
  const date = new Date(weddingDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const weddingDay = date.getDate();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Days of week
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  return (
    <div className="grid grid-cols-7 gap-x-2 gap-y-1 text-center">
      {/* Days of week headers */}
      {daysOfWeek.map((day, index) => (
        <div key={`header-${index}`} className="text-xs font-medium text-gray-500 py-1">
          {day}
        </div>
      ))}
      
      {/* Calendar days - Compact spacing */}
      {calendarDays.map((day, index) => (
        <div 
          key={`day-${index}`} 
          className={`
            py-1 text-sm rounded-md transition-all
            ${!day ? '' : day === weddingDay 
              ? 'text-white font-semibold shadow-lg transform scale-110' 
              : 'text-gray-600 hover:bg-gray-100'
            }
          `}
          style={day === weddingDay ? {
            backgroundColor: primaryColor
          } : {}}
        >
          {day && (
            <>
              {day}
              {day === weddingDay && (
                <Heart className="w-2.5 h-2.5 mx-auto mt-0.5" fill="currentColor" />
              )}
            </>
          )}
        </div>
      ))}
    </div>
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
    <div className="flex gap-2 md:gap-3 justify-center lg:justify-start">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-white rounded-lg shadow-sm p-2.5 min-w-[55px] md:min-w-[65px] border border-gray-200">
          <div className="text-xl md:text-2xl font-semibold" style={{ color: primaryColor }}>
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-500 uppercase">{unit}</div>
        </div>
      ))}
    </div>
  );
}