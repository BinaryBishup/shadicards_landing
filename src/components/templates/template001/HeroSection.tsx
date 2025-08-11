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
      `}</style>
      
      {/* Main Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Side - Couple Photo with Floral Frame */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Floral Frame Background */}
                <div className="absolute inset-0 -inset-x-20 -inset-y-20 md:-inset-x-24 md:-inset-y-24 lg:-inset-x-28 lg:-inset-y-28 pointer-events-none">
                  <Image
                    src="/templates/assets/flower_couple_background.png"
                    alt="Floral Frame"
                    width={650}
                    height={650}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Couple Photo - Smaller */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
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
              <div className="relative max-w-lg mx-auto lg:ml-0">
                {/* Names with Cursive Font - Inside Calendar */}
                <div className="mb-4">
                  <h1 className="cursive-font text-5xl md:text-6xl lg:text-7xl text-gray-800 leading-tight">
                    <span>{data.brideName}</span>
                    <span className="text-pink-500 mx-3">&</span>
                    <span>{data.groomName}</span>
                  </h1>
                  {data.tagline && (
                    <p className="text-sm md:text-base text-gray-500 mt-2 italic">
                      {data.tagline}
                    </p>
                  )}
                </div>

                {/* Top Floral Decoration */}
                <div className="absolute -top-12 left-0 right-0 h-24 pointer-events-none z-10">
                  <Image
                    src="/templates/assets/flower_calendar_top.png"
                    alt="Calendar Top Decoration"
                    width={600}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Calendar Container with Padding */}
                <div className="pt-8 pb-10 px-4">
                  {/* Month and Year */}
                  <div className="text-center mb-3">
                    <h2 className="text-2xl md:text-3xl font-serif text-gray-700">
                      {new Date(data.weddingDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </h2>
                  </div>

                  {/* Calendar Grid */}
                  <div className="px-4">
                    <CalendarGrid weddingDate={data.weddingDate} primaryColor={primaryColor} />
                  </div>
                </div>

                {/* Bottom Floral Decoration */}
                <div className="absolute -bottom-10 left-0 right-0 h-20 pointer-events-none z-10">
                  <Image
                    src="/templates/assets/flower_calendar_down.png"
                    alt="Calendar Bottom Decoration"
                    width={600}
                    height={80}
                    className="w-full h-full object-contain"
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
      <section className="bg-white py-16">
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
    <div className="grid grid-cols-7 gap-x-4 gap-y-3 text-center">
      {/* Days of week headers */}
      {daysOfWeek.map((day, index) => (
        <div key={`header-${index}`} className="text-sm font-semibold text-gray-600">
          {day}
        </div>
      ))}
      
      {/* Calendar days */}
      {calendarDays.map((day, index) => (
        <div 
          key={`day-${index}`} 
          className={`
            py-2 text-base rounded-full transition-all
            ${!day ? '' : day === weddingDay 
              ? 'text-white font-bold shadow-lg transform scale-110' 
              : 'text-gray-700'
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
                <Heart className="w-3 h-3 mx-auto mt-0.5" fill="currentColor" />
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