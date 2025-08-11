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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .cursive-font {
          font-family: 'Great Vibes', cursive;
        }
        @keyframes rotate-subtle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotate-animation {
          animation: rotate-subtle 60s linear infinite;
        }
      `}</style>
      
      {/* Main Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Side - Couple Photo with Animated Floral Frame */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Floral Frame Background - Subtle with Animation */}
                <div className="absolute inset-0 -inset-x-24 -inset-y-24 md:-inset-x-28 md:-inset-y-28 lg:-inset-x-32 lg:-inset-y-32 pointer-events-none rotate-animation">
                  <Image
                    src="/templates/assets/flower_couple_background.png"
                    alt="Floral Frame"
                    width={700}
                    height={700}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Couple Photo - Bigger */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  {data.coupleImage ? (
                    <Image
                      src={data.coupleImage}
                      alt={`${data.brideName} & ${data.groomName}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <Heart className="w-24 h-24 text-blue-200" fill="currentColor" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Calendar with Names Inside */}
            <div className="text-center lg:text-center">

              {/* Calendar Design with Names and Flowers */}
              <div className="relative max-w-md mx-auto lg:ml-0">
                {/* Top Floral Decoration - Much Bigger */}
                <div className="absolute -top-20 left-0 right-0 h-40 pointer-events-none z-10">
                  <Image
                    src="/templates/assets/flower_calendar_top.png"
                    alt="Calendar Top Decoration"
                    width={800}
                    height={160}
                    className="w-full h-full object-contain scale-125"
                  />
                </div>

                {/* Names with Cursive Font - Smaller to fit */}
                <div className="mb-2 pt-16">
                  <h1 className="cursive-font text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight">
                    <span>{data.brideName}</span>
                    <span className="text-pink-500 mx-2">&</span>
                    <span>{data.groomName}</span>
                  </h1>
                  {data.tagline && (
                    <p className="text-xs md:text-sm text-gray-500 mt-1 italic">
                      {data.tagline}
                    </p>
                  )}
                </div>

                {/* Calendar Container - Smaller */}
                <div className="px-2">
                  {/* Month and Year */}
                  <div className="text-center mb-2">
                    <h2 className="text-xl md:text-2xl font-serif text-gray-700">
                      {new Date(data.weddingDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </h2>
                  </div>

                  {/* Calendar Grid - Compact */}
                  <div className="px-2">
                    <CalendarGrid weddingDate={data.weddingDate} primaryColor={primaryColor} />
                  </div>
                </div>

                {/* Bottom Floral Decoration - Much Bigger */}
                <div className="absolute -bottom-16 left-0 right-0 h-32 pointer-events-none z-10">
                  <Image
                    src="/templates/assets/flower_calendar_down.png"
                    alt="Calendar Bottom Decoration"
                    width={800}
                    height={130}
                    className="w-full h-full object-contain scale-125"
                  />
                </div>
              </div>

              {/* Venue */}
              {data.venue && (
                <div className="pt-4">
                  <div className="flex items-center gap-3 justify-center">
                    <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
                    <p className="text-gray-700">
                      <span className="font-medium">Venue:</span> {data.venue}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section - Full Width Below */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">
              Countdown to the big day
            </p>
            <CountdownTimer targetDate={data.weddingDate} primaryColor={primaryColor} />
          </div>
        </div>
      </section>
    </>
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
        <div key={`header-${index}`} className="text-xs font-semibold text-gray-600 tracking-tight">
          {day}
        </div>
      ))}
      
      {/* Calendar days - Compact */}
      {calendarDays.map((day, index) => (
        <div 
          key={`day-${index}`} 
          className={`
            py-1 text-sm rounded-full transition-all
            ${!day ? '' : day === weddingDay 
              ? 'text-white font-bold shadow-lg transform scale-105' 
              : 'text-gray-700'
            }
          `}
          style={day === weddingDay ? {
            backgroundColor: '#ec4899'
          } : {}}
        >
          {day && (
            <>
              {day}
              {day === weddingDay && (
                <Heart className="w-2 h-2 mx-auto mt-0.5" fill="currentColor" />
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
    <div className="flex gap-4 md:gap-8 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-4xl md:text-6xl font-bold" style={{ color: '#ec4899' }}>
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-500 uppercase mt-2">{unit}</div>
        </div>
      ))}
    </div>
  );
}