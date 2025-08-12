"use client";

import Image from 'next/image';
import { Heart, Users } from 'lucide-react';
import type { FamilyData } from '@/types/wedding-template';

interface FamilySectionProps {
  data: FamilyData;
  primaryColor?: string;
}

export default function FamilySection({ data, primaryColor = '#ec4899' }: FamilySectionProps) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Poppins:wght@300;400;500&display=swap');
        .cursive-title {
          font-family: 'Dancing Script', cursive;
        }
        .body-font {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
      <section className="py-20 px-4 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="cursive-title text-3xl md:text-4xl text-gray-500 mb-3">With Love & Blessings</p>
            <h2 className="text-3xl md:text-4xl text-gray-700 body-font font-normal">
              Our Families
            </h2>
            <div className="flex justify-center mt-4">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Bride's Family */}
            <div className="relative">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
                  </div>
                  <h3 className="text-2xl text-gray-700 body-font font-medium">
                    {data.brideSide.title || "Bride's Family"}
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.brideSide.members.map((member, index) => (
                  <div 
                    key={member.id} 
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                      {/* Photo Section */}
                      <div className="relative h-64 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden">
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
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Info Section */}
                      <div className="p-5 text-center">
                        <h4 className="text-lg font-semibold text-gray-800 body-font mb-1">
                          {member.name}
                        </h4>
                        <p className="text-sm text-pink-500 font-medium mb-2">
                          {member.relation}
                        </p>
                        {member.description && (
                          <p className="text-xs text-gray-500 body-font leading-relaxed">
                            {member.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Groom's Family */}
            <div className="relative">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-blue-500" fill="currentColor" />
                  </div>
                  <h3 className="text-2xl text-gray-700 body-font font-medium">
                    {data.groomSide.title || "Groom's Family"}
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.groomSide.members.map((member, index) => (
                  <div 
                    key={member.id} 
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                      {/* Photo Section */}
                      <div className="relative h-64 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Users className="w-20 h-20 text-blue-200" />
                          </div>
                        )}
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Info Section */}
                      <div className="p-5 text-center">
                        <h4 className="text-lg font-semibold text-gray-800 body-font mb-1">
                          {member.name}
                        </h4>
                        <p className="text-sm text-blue-500 font-medium mb-2">
                          {member.relation}
                        </p>
                        {member.description && (
                          <p className="text-xs text-gray-500 body-font leading-relaxed">
                            {member.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
              <Heart className="w-4 h-4 text-gray-300" fill="currentColor" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}