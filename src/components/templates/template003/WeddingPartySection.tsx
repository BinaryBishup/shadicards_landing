"use client";

import Image from 'next/image';
import { Heart, Sparkles } from 'lucide-react';
import type { WeddingPartyData } from '@/types/wedding-template';

interface WeddingPartySectionProps {
  data: WeddingPartyData;
  primaryColor?: string;
}

export default function WeddingPartySection({ data, primaryColor = '#c084fc' }: WeddingPartySectionProps) {
  const hasBridesmaids = data.bridesmaids.members && data.bridesmaids.members.length > 0;
  const hasGroomsmen = data.groomsmen.members && data.groomsmen.members.length > 0;

  if (!hasBridesmaids && !hasGroomsmen) return null;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Poppins:wght@300;400;500&display=swap');

        .elegant-script {
          font-family: 'Cormorant Garamond', serif;
        }

        .body-text {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 3s infinite;
        }
      `}</style>

      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-white via-pink-50/20 to-purple-50/20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
              <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-purple-300 to-transparent" />
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <p className="elegant-script text-2xl md:text-3xl text-gray-500 mb-3 italic">
              Standing by our side
            </p>
            <h2 className="elegant-script text-4xl md:text-5xl lg:text-6xl text-gray-700">
              Wedding Party
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Bridesmaids */}
            {hasBridesmaids && (
              <div className="relative">
                <div className="text-center mb-12">
                  <h3 className="elegant-script text-3xl md:text-4xl text-gray-700 mb-2">
                    {data.bridesmaids.title || "Bridesmaids"}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-300" />
                    <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-300" />
                  </div>
                </div>

                <div className="space-y-6">
                  {data.bridesmaids.members.map((member, index) => (
                    <div
                      key={member.id}
                      className="group relative"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-pink-100/50">
                        <div className="flex items-center p-6 md:p-8">
                          {/* Photo with Floral Frame */}
                          <div className="relative flex-shrink-0">
                            <div className="relative w-28 h-28 md:w-32 md:h-32">
                              {/* Floral decoration ring */}
                              <div className="absolute -inset-3 opacity-40 group-hover:opacity-60 transition-opacity">
                                <svg viewBox="0 0 150 150" className="w-full h-full" fill="none">
                                  <circle cx="75" cy="75" r="70" stroke="#fce7f3" strokeWidth="2" />
                                  {[...Array(6)].map((_, i) => {
                                    const angle = (i * 60) * Math.PI / 180;
                                    const x = 75 + Math.cos(angle) * 72;
                                    const y = 75 + Math.sin(angle) * 72;
                                    return <circle key={i} cx={x} cy={y} r="6" fill="#ec4899" opacity="0.5" />;
                                  })}
                                </svg>
                              </div>

                              {/* Profile Photo */}
                              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl z-10">
                                {member.image ? (
                                  <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                                    <Heart className="w-10 h-10 text-pink-300" fill="currentColor" />
                                  </div>
                                )}
                              </div>

                              {/* Role Badge */}
                              {member.role && (member.role.toLowerCase().includes('maid of honor') || member.role.toLowerCase().includes('moh')) && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full shadow-lg z-20 body-text font-medium">
                                  MOH
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="ml-6 flex-1">
                            <h4 className="body-text text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-pink-600 transition-colors mb-1">
                              {member.name}
                            </h4>
                            {member.role && (
                              <p className="elegant-script text-pink-500 font-medium mb-2 text-lg">
                                {member.role}
                              </p>
                            )}
                            {member.description && (
                              <p className="body-text text-sm text-gray-600 leading-relaxed">
                                {member.description}
                              </p>
                            )}
                          </div>

                          {/* Decorative Sparkle */}
                          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                              <circle cx="16" cy="16" r="2" fill="#ec4899" />
                              <circle cx="11" cy="13" r="4" fill="#fce7f3" opacity="0.8" />
                              <circle cx="21" cy="13" r="4" fill="#f8e7f5" opacity="0.8" />
                              <circle cx="13" cy="19" r="3" fill="#fce7f3" opacity="0.9" />
                              <circle cx="19" cy="19" r="3" fill="#f8e7f5" opacity="0.9" />
                            </svg>
                          </div>
                        </div>

                        {/* Bottom decorative line */}
                        <div className="h-1 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Groomsmen */}
            {hasGroomsmen && (
              <div className="relative">
                <div className="text-center mb-12">
                  <h3 className="elegant-script text-3xl md:text-4xl text-gray-700 mb-2">
                    {data.groomsmen.title || "Groomsmen"}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-300" />
                    <Heart className="w-4 h-4 text-purple-400" fill="currentColor" />
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-300" />
                  </div>
                </div>

                <div className="space-y-6">
                  {data.groomsmen.members.map((member, index) => (
                    <div
                      key={member.id}
                      className="group relative"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-purple-100/50">
                        <div className="flex items-center p-6 md:p-8">
                          {/* Photo with Floral Frame */}
                          <div className="relative flex-shrink-0">
                            <div className="relative w-28 h-28 md:w-32 md:h-32">
                              {/* Floral decoration ring */}
                              <div className="absolute -inset-3 opacity-40 group-hover:opacity-60 transition-opacity">
                                <svg viewBox="0 0 150 150" className="w-full h-full" fill="none">
                                  <circle cx="75" cy="75" r="70" stroke="#e9d5ff" strokeWidth="2" />
                                  {[...Array(6)].map((_, i) => {
                                    const angle = (i * 60 + 30) * Math.PI / 180;
                                    const x = 75 + Math.cos(angle) * 72;
                                    const y = 75 + Math.sin(angle) * 72;
                                    return <circle key={i} cx={x} cy={y} r="6" fill="#a78bfa" opacity="0.5" />;
                                  })}
                                </svg>
                              </div>

                              {/* Profile Photo */}
                              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl z-10">
                                {member.image ? (
                                  <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                                    <Heart className="w-10 h-10 text-purple-300" fill="currentColor" />
                                  </div>
                                )}
                              </div>

                              {/* Role Badge */}
                              {member.role && (member.role.toLowerCase().includes('best man') || member.role.toLowerCase().includes('bm')) && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow-lg z-20 body-text font-medium">
                                  BM
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="ml-6 flex-1">
                            <h4 className="body-text text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors mb-1">
                              {member.name}
                            </h4>
                            {member.role && (
                              <p className="elegant-script text-purple-500 font-medium mb-2 text-lg">
                                {member.role}
                              </p>
                            )}
                            {member.description && (
                              <p className="body-text text-sm text-gray-600 leading-relaxed">
                                {member.description}
                              </p>
                            )}
                          </div>

                          {/* Decorative Sparkle */}
                          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                              <circle cx="16" cy="16" r="2" fill="#a78bfa" />
                              <circle cx="11" cy="13" r="4" fill="#e9d5ff" opacity="0.8" />
                              <circle cx="21" cy="13" r="4" fill="#f8e7f5" opacity="0.8" />
                              <circle cx="13" cy="19" r="3" fill="#e9d5ff" opacity="0.9" />
                              <circle cx="19" cy="19" r="3" fill="#f8e7f5" opacity="0.9" />
                            </svg>
                          </div>
                        </div>

                        {/* Bottom decorative line */}
                        <div className="h-1 bg-gradient-to-r from-purple-200 via-indigo-300 to-purple-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Decorative Element */}
          <div className="flex justify-center mt-20">
            <div className="flex items-center gap-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-300 to-purple-200" />
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="4" fill="#ec4899" />
                <circle cx="16" cy="20" r="6" fill="#fce7f3" opacity="0.8" />
                <circle cx="34" cy="20" r="6" fill="#e9d5ff" opacity="0.8" />
                <circle cx="20" cy="30" r="5" fill="#f8e7f5" opacity="0.9" />
                <circle cx="30" cy="30" r="5" fill="#fce7f3" opacity="0.9" />
              </svg>
              <div className="w-20 h-px bg-gradient-to-l from-transparent via-purple-300 to-purple-200" />
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
