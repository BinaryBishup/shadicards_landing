"use client";

import React from 'react';
import { Heart, MapPin, Calendar, Clock, Crown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import type { HeroData } from '@/types/wedding-template';

interface HeroSectionProps {
  data: HeroData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * HeroSection - Royal Luxury Template
 *
 * Elegant full-screen hero with ornate golden frames, luxury styling,
 * and sophisticated animations. Features couple image with Art Deco styling
 * and an elegant countdown timer.
 */
export default function HeroSection({
  data,
  primaryColor = '#991b1b',
  secondaryColor = '#f59e0b'
}: HeroSectionProps) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Great+Vibes&family=Cinzel:wght@400;500;600;700&display=swap');

        .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        .font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .font-vibes {
          font-family: 'Great Vibes', cursive;
        }

        @keyframes gold-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        .gold-shimmer {
          background: linear-gradient(
            90deg,
            ${secondaryColor}00 0%,
            ${secondaryColor}80 50%,
            ${secondaryColor}00 100%
          );
          background-size: 200% auto;
          animation: gold-shimmer 3s linear infinite;
        }

        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: ${secondaryColor};
          border-radius: 50%;
          animation: float-particle 8s ease-in infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px ${secondaryColor}40;
          }
          50% {
            box-shadow: 0 0 40px ${secondaryColor}80;
          }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-rose-50" />

        {/* Ornate Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${secondaryColor} 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, ${secondaryColor} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            {/* Crown Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Crown
                  className="w-16 h-16 md:w-20 md:h-20"
                  style={{ color: secondaryColor }}
                  fill={secondaryColor}
                />
                <Sparkles
                  className="absolute -top-2 -right-2 w-6 h-6 animate-pulse"
                  style={{ color: secondaryColor }}
                />
              </div>
            </div>

            {/* Tagline */}
            {data.tagline && (
              <p className="font-cinzel text-sm md:text-base tracking-widest uppercase mb-4" style={{ color: primaryColor }}>
                {data.tagline}
              </p>
            )}

            {/* Couple Names */}
            <div className="mb-8">
              <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight">
                <span style={{ color: primaryColor }}>{data.brideName}</span>
                <span className="font-vibes text-6xl md:text-8xl mx-4" style={{ color: secondaryColor }}>
                  &
                </span>
                <span style={{ color: primaryColor }}>{data.groomName}</span>
              </h1>
            </div>

            {/* Ornate Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <Heart className="w-6 h-6" style={{ color: secondaryColor }} fill={secondaryColor} />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            {/* Couple Image with Ornate Frame */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                {/* Decorative Corner Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 rounded-tl-lg" style={{ borderColor: secondaryColor }} />
                <div className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: secondaryColor }} />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: secondaryColor }} />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 rounded-br-lg" style={{ borderColor: secondaryColor }} />

                {/* Gold Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-transparent to-rose-200/30 rounded-lg pulse-glow" />

                {/* Image Container */}
                <div className="relative w-72 h-96 md:w-96 md:h-[500px] rounded-lg overflow-hidden border-8 shadow-2xl"
                     style={{ borderColor: secondaryColor }}>
                  {data.coupleImage ? (
                    <Image
                      src={data.coupleImage}
                      alt={`${data.brideName} & ${data.groomName}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                      <Heart className="w-32 h-32 text-amber-300" fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Shimmer Overlay */}
                <div className="absolute inset-0 gold-shimmer pointer-events-none rounded-lg" />
              </div>
            </div>

            {/* Wedding Details */}
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Date in Roman Numerals Style */}
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5" style={{ color: secondaryColor }} />
                <p className="font-cinzel text-lg md:text-xl">
                  {new Date(data.weddingDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {/* Time */}
              {data.weddingTime && (
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5" style={{ color: secondaryColor }} />
                  <p className="font-cinzel text-lg">{data.weddingTime}</p>
                </div>
              )}

              {/* Venue */}
              {data.venue && (
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5" style={{ color: secondaryColor }} />
                  <p className="font-cinzel text-lg">{data.venue}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Ornate Border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </section>

      {/* Countdown Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-amber-50/30">
        {/* Top Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-cinzel text-sm md:text-base uppercase tracking-widest mb-2" style={{ color: secondaryColor }}>
              Countdown to Forever
            </h2>
            <p className="font-playfair text-3xl md:text-4xl mb-12" style={{ color: primaryColor }}>
              The Royal Celebration Begins In
            </p>
            <CountdownTimer targetDate={data.weddingDate} primaryColor={primaryColor} secondaryColor={secondaryColor} />
          </div>
        </div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      </section>
    </>
  );
}

/**
 * CountdownTimer Component
 * Diamond-shaped luxury countdown timer with gold accents
 */
function CountdownTimer({
  targetDate,
  primaryColor,
  secondaryColor
}: {
  targetDate: string;
  primaryColor: string;
  secondaryColor: string;
}) {
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
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-2 md:flex gap-8 md:gap-12 justify-center items-center max-w-4xl mx-auto">
      {units.map((unit) => (
        <div key={unit.label} className="flex justify-center">
          <div className="relative">
            {/* Hexagonal Container */}
            <div
              className="relative w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                boxShadow: `0 10px 40px ${secondaryColor}40`
              }}
            >
              {/* Gold Border */}
              <div
                className="absolute inset-0.5"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  background: `linear-gradient(135deg, ${secondaryColor}, #fbbf24)`
                }}
              />

              {/* Inner Content */}
              <div
                className="absolute inset-1.5 flex flex-col items-center justify-center"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}ee)`
                }}
              >
                <div className="font-playfair text-4xl md:text-5xl font-bold text-amber-50">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="font-cinzel text-xs md:text-sm uppercase tracking-wider text-amber-200 mt-1">
                  {unit.label}
                </div>
              </div>
            </div>

            {/* Corner Sparkles */}
            <Sparkles
              className="absolute -top-2 -right-2 w-6 h-6 animate-pulse"
              style={{ color: secondaryColor }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
