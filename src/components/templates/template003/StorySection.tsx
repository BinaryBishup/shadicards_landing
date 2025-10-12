"use client";

import Image from 'next/image';
import { Heart, Calendar } from 'lucide-react';
import type { StoryData } from '@/types/wedding-template';

interface StorySectionProps {
  data: StoryData[];
  primaryColor?: string;
}

export default function StorySection({ data, primaryColor = '#c084fc' }: StorySectionProps) {
  if (!data || data.length === 0) return null;

  const storyItems = data[0]?.items || [];
  if (storyItems.length === 0) return null;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Poppins:wght@300;400;500&display=swap');

        .elegant-script {
          font-family: 'Cormorant Garamond', serif;
        }

        .serif-heading {
          font-family: 'Playfair Display', serif;
        }

        .body-text {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes draw-line {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .timeline-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-line 2s ease-out forwards;
        }
      `}</style>

      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-white via-purple-50/20 to-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 right-10 w-48 h-48 opacity-5">
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="8" fill="#c084fc" />
            <circle cx="35" cy="40" r="12" fill="#e9d5ff" />
            <circle cx="65" cy="40" r="12" fill="#f8e7f5" />
            <circle cx="40" cy="60" r="10" fill="#fce7f3" />
            <circle cx="60" cy="60" r="10" fill="#e9d5ff" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
              <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-purple-300 to-transparent" />
            </div>
            <h2 className="elegant-script text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-3">
              Our Love Story
            </h2>
            <p className="body-text text-gray-500 text-sm tracking-wider">
              Every moment that brought us together
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  className="timeline-line"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#c084fc" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Story Items */}
            <div className="space-y-16 md:space-y-24">
              {storyItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot with Floral Decoration */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                    <div className="relative">
                      {/* Outer floral ring */}
                      <div className="absolute -inset-3">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                          <circle cx="32" cy="32" r="28" stroke="#e9d5ff" strokeWidth="1" fill="white" opacity="0.9" />
                          {[...Array(6)].map((_, i) => {
                            const angle = (i * 60) * Math.PI / 180;
                            const x = 32 + Math.cos(angle) * 26;
                            const y = 32 + Math.sin(angle) * 26;
                            return <circle key={i} cx={x} cy={y} r="4" fill="#c084fc" opacity="0.5" />;
                          })}
                        </svg>
                      </div>
                      {/* Center dot */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-4 border-white shadow-lg flex items-center justify-center relative z-10">
                        <Heart className="w-3 h-3 text-white" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} ml-20 md:ml-0`}>
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-purple-100/50 hover:shadow-2xl transition-shadow duration-300">
                      {/* Date Badge */}
                      {item.date && (
                        <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4 ${
                          index % 2 === 0 ? 'md:float-right md:ml-4' : 'md:float-left md:mr-4'
                        }`}>
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span className="body-text text-sm text-gray-700 font-medium">{item.date}</span>
                        </div>
                      )}

                      <h3 className="elegant-script text-2xl md:text-3xl text-gray-700 mb-3 clear-both">
                        {item.title}
                      </h3>

                      <p className="body-text text-gray-600 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'} ml-20 md:ml-0`}>
                    <div className="relative group">
                      {/* Decorative floral frame */}
                      <div className="absolute -inset-4 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                        <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
                          <circle cx="150" cy="150" r="140" stroke="#e9d5ff" strokeWidth="2" />
                          {[...Array(8)].map((_, i) => {
                            const angle = (i * 45) * Math.PI / 180;
                            const x = 150 + Math.cos(angle) * 145;
                            const y = 150 + Math.sin(angle) * 145;
                            return (
                              <circle key={i} cx={x} cy={y} r="8" fill={i % 2 === 0 ? '#f8e7f5' : '#fce7f3'} opacity="0.8" />
                            );
                          })}
                        </svg>
                      </div>

                      {/* Circular Image */}
                      <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-100 to-purple-50 flex items-center justify-center">
                            <Heart className="w-16 h-16 text-purple-200" fill="currentColor" />
                          </div>
                        )}
                      </div>

                      {/* Corner floral decoration */}
                      <div className={`absolute ${index % 2 === 0 ? '-bottom-4 -right-4' : '-top-4 -left-4'} w-16 h-16`}>
                        <svg viewBox="0 0 60 60" fill="none">
                          <circle cx="30" cy="30" r="5" fill="#ec4899" opacity="0.7" />
                          <circle cx="20" cy="25" r="8" fill="#fce7f3" opacity="0.8" />
                          <circle cx="25" cy="35" r="7" fill="#f8e7f5" opacity="0.8" />
                          <circle cx="40" cy="25" r="6" fill="#e9d5ff" opacity="0.7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Decorative Element */}
          <div className="flex justify-center mt-20">
            <div className="relative">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="5" fill="#c084fc" />
                <circle cx="18" cy="24" r="9" fill="#f8e7f5" opacity="0.9" />
                <circle cx="42" cy="24" r="9" fill="#fce7f3" opacity="0.9" />
                <circle cx="24" cy="36" r="8" fill="#e9d5ff" opacity="0.85" />
                <circle cx="36" cy="36" r="8" fill="#f8e7f5" opacity="0.85" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
