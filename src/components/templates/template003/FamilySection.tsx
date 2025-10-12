"use client";

import Image from 'next/image';
import { Heart, Users } from 'lucide-react';
import type { FamilyData } from '@/types/wedding-template';

interface FamilySectionProps {
  data: FamilyData;
  primaryColor?: string;
}

export default function FamilySection({ data, primaryColor = '#c084fc' }: FamilySectionProps) {
  const hasBrideSide = data.brideSide.members && data.brideSide.members.length > 0;
  const hasGroomSide = data.groomSide.members && data.groomSide.members.length > 0;

  if (!hasBrideSide && !hasGroomSide) return null;

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

        @keyframes fade-slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-slide-up {
          animation: fade-slide-up 0.6s ease-out forwards;
        }
      `}</style>

      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-white via-purple-50/20 to-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
              <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-purple-300 to-transparent" />
            </div>
            <h2 className="elegant-script text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-3">
              Our Families
            </h2>
            <p className="body-text text-gray-500 text-sm tracking-wider">
              With blessings from those we hold dear
            </p>
          </div>

          <div className={`grid ${hasBrideSide && hasGroomSide ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12 lg:gap-20 ${!hasBrideSide || !hasGroomSide ? 'max-w-4xl mx-auto' : ''}`}>

            {/* Bride's Family */}
            {hasBrideSide && (
              <div className="relative">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center shadow-lg">
                      <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                    </div>
                  </div>
                  <h3 className="elegant-script text-3xl md:text-4xl text-gray-700">
                    {data.brideSide.title || "Bride's Family"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data.brideSide.members.map((member, index) => (
                    <div
                      key={member.id}
                      className="group fade-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-pink-100/50">
                        {/* Photo Section with Floral Border */}
                        <div className="relative h-72 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden">
                          {/* Decorative floral overlay */}
                          <div className="absolute top-4 right-4 w-16 h-16 opacity-40 group-hover:opacity-60 transition-opacity">
                            <svg viewBox="0 0 60 60" fill="none">
                              <circle cx="30" cy="30" r="4" fill="#ec4899" />
                              <circle cx="22" cy="26" r="7" fill="#fce7f3" opacity="0.8" />
                              <circle cx="26" cy="34" r="6" fill="#f8e7f5" opacity="0.8" />
                              <circle cx="38" cy="26" r="5" fill="#fce7f3" opacity="0.7" />
                            </svg>
                          </div>

                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="w-20 h-20 text-pink-200" />
                            </div>
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>

                        {/* Info Section */}
                        <div className="p-6 text-center bg-white">
                          <h4 className="body-text text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            {member.name}
                          </h4>
                          <p className="elegant-script text-pink-500 font-medium mb-3 text-lg">
                            {member.relation}
                          </p>
                          {member.description && (
                            <p className="body-text text-sm text-gray-600 leading-relaxed">
                              {member.description}
                            </p>
                          )}
                        </div>

                        {/* Bottom decorative line */}
                        <div className="h-1 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Groom's Family */}
            {hasGroomSide && (
              <div className="relative">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center shadow-lg">
                      <Heart className="w-6 h-6 text-purple-500" fill="currentColor" />
                    </div>
                  </div>
                  <h3 className="elegant-script text-3xl md:text-4xl text-gray-700">
                    {data.groomSide.title || "Groom's Family"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data.groomSide.members.map((member, index) => (
                    <div
                      key={member.id}
                      className="group fade-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100/50">
                        {/* Photo Section with Floral Border */}
                        <div className="relative h-72 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 overflow-hidden">
                          {/* Decorative floral overlay */}
                          <div className="absolute top-4 right-4 w-16 h-16 opacity-40 group-hover:opacity-60 transition-opacity">
                            <svg viewBox="0 0 60 60" fill="none">
                              <circle cx="30" cy="30" r="4" fill="#a78bfa" />
                              <circle cx="22" cy="26" r="7" fill="#e9d5ff" opacity="0.8" />
                              <circle cx="26" cy="34" r="6" fill="#f8e7f5" opacity="0.8" />
                              <circle cx="38" cy="26" r="5" fill="#e9d5ff" opacity="0.7" />
                            </svg>
                          </div>

                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users className="w-20 h-20 text-purple-200" />
                            </div>
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>

                        {/* Info Section */}
                        <div className="p-6 text-center bg-white">
                          <h4 className="body-text text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            {member.name}
                          </h4>
                          <p className="elegant-script text-purple-500 font-medium mb-3 text-lg">
                            {member.relation}
                          </p>
                          {member.description && (
                            <p className="body-text text-sm text-gray-600 leading-relaxed">
                              {member.description}
                            </p>
                          )}
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
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-300 to-purple-200" />
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="3" fill="#ec4899" />
                <circle cx="13" cy="16" r="5" fill="#fce7f3" opacity="0.8" />
                <circle cx="27" cy="16" r="5" fill="#e9d5ff" opacity="0.8" />
                <circle cx="16" cy="24" r="4" fill="#f8e7f5" opacity="0.9" />
                <circle cx="24" cy="24" r="4" fill="#fce7f3" opacity="0.9" />
              </svg>
              <div className="w-24 h-px bg-gradient-to-l from-transparent via-purple-300 to-purple-200" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
