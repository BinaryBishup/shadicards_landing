"use client";

import React from 'react';
import { Heart, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import type { HeroData } from '@/types/wedding-template';

interface HeroSectionProps {
  data: HeroData;
  primaryColor?: string;
}

export default function HeroSection({ data, primaryColor = '#c084fc' }: HeroSectionProps) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Poppins:wght@300;400;500&display=swap');

        .elegant-script {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
        }

        .serif-heading {
          font-family: 'Playfair Display', serif;
        }

        .body-text {
          font-family: 'Poppins', sans-serif;
        }

        .spaced-letters {
          letter-spacing: 0.15em;
        }

        .extra-spaced {
          letter-spacing: 0.25em;
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }

        .fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>

      {/* Hero Section with Arch Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-50/40 via-purple-50/30 to-white">
        {/* Decorative Arch SVG Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 800 900"
            className="w-full h-full max-w-4xl opacity-20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 100 900 L 100 400 Q 100 100, 400 100 Q 700 100, 700 400 L 700 900"
              stroke="#c084fc"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 120 900 L 120 400 Q 120 120, 400 120 Q 680 120, 680 400 L 680 900"
              stroke="#e9d5ff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Floating Floral Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-30 float-gentle">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="8" fill="#f8e7f5" />
            <circle cx="35" cy="40" r="12" fill="#e9d5ff" opacity="0.8" />
            <circle cx="65" cy="40" r="12" fill="#fce7f3" opacity="0.8" />
            <circle cx="40" cy="60" r="10" fill="#f8e7f5" opacity="0.9" />
            <circle cx="60" cy="60" r="10" fill="#fce7f3" opacity="0.9" />
          </svg>
        </div>

        <div className="absolute top-40 right-16 w-40 h-40 opacity-25 float-gentle" style={{ animationDelay: '1s' }}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="10" fill="#c084fc" />
            <circle cx="32" cy="38" r="14" fill="#e9d5ff" opacity="0.7" />
            <circle cx="68" cy="38" r="14" fill="#f8e7f5" opacity="0.7" />
            <circle cx="38" cy="65" r="12" fill="#fce7f3" opacity="0.8" />
            <circle cx="62" cy="65" r="12" fill="#e9d5ff" opacity="0.8" />
          </svg>
        </div>

        <div className="absolute bottom-32 left-20 w-36 h-36 opacity-20 float-gentle" style={{ animationDelay: '2s' }}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="9" fill="#a78bfa" />
            <circle cx="36" cy="42" r="13" fill="#f8e7f5" opacity="0.8" />
            <circle cx="64" cy="42" r="13" fill="#fce7f3" opacity="0.8" />
            <circle cx="42" cy="62" r="11" fill="#e9d5ff" opacity="0.9" />
            <circle cx="58" cy="62" r="11" fill="#f8e7f5" opacity="0.9" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-12">

            {/* Couple Image with Circular Lavender Background */}
            <div className="flex justify-center mb-12 fade-in-up">
              <div className="relative">
                {/* Lavender Circle Background */}
                <div className="absolute inset-0 -inset-x-16 -inset-y-16 md:-inset-x-20 md:-inset-y-20">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-200/40 via-pink-200/30 to-purple-100/40 blur-2xl" />
                </div>

                {/* Floral Border Decoration */}
                <div className="absolute -inset-8 md:-inset-12">
                  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
                    <circle cx="200" cy="200" r="180" stroke="#e9d5ff" strokeWidth="1" fill="none" opacity="0.5" />
                    <circle cx="200" cy="200" r="190" stroke="#f8e7f5" strokeWidth="1" fill="none" opacity="0.4" />
                    {/* Decorative petals around circle */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 30) * Math.PI / 180;
                      const x = 200 + Math.cos(angle) * 185;
                      const y = 200 + Math.sin(angle) * 185;
                      return (
                        <circle key={i} cx={x} cy={y} r="8" fill="#c084fc" opacity="0.3" />
                      );
                    })}
                  </svg>
                </div>

                {/* Couple Photo */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  {data.coupleImage ? (
                    <Image
                      src={data.coupleImage}
                      alt={`${data.brideName} & ${data.groomName}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-100 to-purple-50 flex items-center justify-center">
                      <Heart className="w-24 h-24 text-purple-300" fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Pink Floral Corner Decorations */}
                <div className="absolute -top-6 -left-6 w-20 h-20">
                  <svg viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="6" fill="#ec4899" />
                    <circle cx="28" cy="32" r="9" fill="#f8e7f5" opacity="0.9" />
                    <circle cx="32" cy="48" r="8" fill="#fce7f3" opacity="0.85" />
                    <circle cx="52" cy="32" r="7" fill="#e9d5ff" opacity="0.8" />
                  </svg>
                </div>

                <div className="absolute -bottom-6 -right-6 w-20 h-20">
                  <svg viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="6" fill="#c084fc" />
                    <circle cx="52" cy="48" r="9" fill="#f8e7f5" opacity="0.9" />
                    <circle cx="48" cy="32" r="8" fill="#fce7f3" opacity="0.85" />
                    <circle cx="28" cy="48" r="7" fill="#e9d5ff" opacity="0.8" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Names with Spaced Letters */}
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="elegant-script text-4xl md:text-5xl lg:text-7xl text-gray-700 leading-tight">
                <span className="extra-spaced block mb-4">{data.brideName?.split('').join(' ')}</span>
                <span className="text-pink-400 mx-4 text-5xl md:text-6xl">&</span>
                <span className="extra-spaced block mt-4">{data.groomName?.split('').join(' ')}</span>
              </h1>
              {data.tagline && (
                <p className="body-text text-sm md:text-base text-gray-500 mt-6 tracking-wide italic">
                  {data.tagline}
                </p>
              )}
            </div>

            {/* Date and Venue */}
            <div className="fade-in-up space-y-4" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <p className="body-text text-lg md:text-xl text-gray-600 font-light">
                  {new Date(data.weddingDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {data.venue && (
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <p className="body-text text-gray-600 font-light">
                    {data.venue}
                  </p>
                </div>
              )}
            </div>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4 py-4 fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
              <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
              <div className="w-20 h-px bg-gradient-to-l from-transparent via-purple-300 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section with Circular Badges and Floral Decorations */}
      <section className="relative bg-white py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-300 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="body-text text-sm text-gray-500 uppercase tracking-wider mb-2">
              Save The Date
            </p>
            <h2 className="elegant-script text-3xl md:text-4xl text-gray-700">
              Counting Every Moment
            </h2>
          </div>

          <CountdownTimer targetDate={data.weddingDate} primaryColor={primaryColor} />
        </div>
      </section>
    </>
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

  const units = [
    { label: 'Days', value: timeLeft.days, color: 'from-purple-100 to-pink-100' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-pink-100 to-purple-100' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-purple-100 to-pink-100' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-pink-100 to-purple-100' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
      {units.map((unit, index) => (
        <div key={unit.label} className="relative flex justify-center">
          {/* Floral decoration - alternating corners */}
          <div
            className={`absolute w-16 h-16 md:w-20 md:h-20 pointer-events-none z-10 ${
              index % 2 === 0 ? '-top-4 -left-4' : '-bottom-4 -right-4'
            }`}
          >
            <svg viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="5" fill="#c084fc" opacity="0.6" />
              <circle cx="30" cy="33" r="8" fill="#f8e7f5" opacity="0.8" />
              <circle cx="33" cy="47" r="7" fill="#fce7f3" opacity="0.75" />
              <circle cx="50" cy="33" r="6" fill="#e9d5ff" opacity="0.7" />
              <circle cx="47" cy="47" r="6" fill="#f8e7f5" opacity="0.7" />
            </svg>
          </div>

          {/* Circular Badge with Gradient */}
          <div className={`relative bg-gradient-to-br ${unit.color} rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex flex-col items-center justify-center border-4 border-white shadow-xl`}>
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 elegant-script">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="body-text text-xs md:text-sm text-gray-600 mt-2 tracking-wider uppercase">
              {unit.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
