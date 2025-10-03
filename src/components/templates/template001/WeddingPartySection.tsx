"use client";

import Image from 'next/image';
import { Sparkles, Heart } from 'lucide-react';
import type { WeddingPartyData } from '@/types/wedding-template';

interface WeddingPartySectionProps {
  data: WeddingPartyData;
  primaryColor?: string;
}

export default function WeddingPartySection({ data, primaryColor = '#ec4899' }: WeddingPartySectionProps) {
  // Don't render if both sides have no members
  const hasBridesmaids = data.bridesmaids.members && data.bridesmaids.members.length > 0;
  const hasGroomsmen = data.groomsmen.members && data.groomsmen.members.length > 0;

  if (!hasBridesmaids && !hasGroomsmen) return null;

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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${primaryColor} 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, ${primaryColor} 0%, transparent 50%)`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="cursive-title text-2xl md:text-3xl text-gray-400 mb-4">
              "Friends who became family"
            </p>
            <p className="cursive-title text-3xl md:text-4xl text-gray-500 mb-3">Standing By Our Side</p>
            <h2 className="text-3xl md:text-4xl text-gray-700 body-font font-normal">
              Wedding Party
            </h2>
            <div className="flex justify-center items-center gap-3 mt-4">
              <Sparkles className="w-4 h-4 text-gray-400" />
              <div className="w-20 h-0.5 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200" />
              <Sparkles className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Bridesmaids */}
            <div className="relative">
              {/* Side Decoration */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-transparent via-pink-200 to-transparent opacity-50" />
              
              <div className="text-center mb-10">
                <h3 className="text-2xl text-gray-700 body-font font-medium inline-flex items-center gap-2">
                  <span className="text-pink-500">♦</span>
                  {data.bridesmaids.title || "Bridesmaids"}
                  <span className="text-pink-500">♦</span>
                </h3>
              </div>
              
              <div className="space-y-4">
                {data.bridesmaids.members.map((member, index) => (
                  <div 
                    key={member.id} 
                    className="group relative"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-pink-100/50">
                      <div className="flex items-center p-5">
                        {/* Photo */}
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={member.name}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Heart className="w-8 h-8 text-pink-300" fill="currentColor" />
                              </div>
                            )}
                          </div>
                          {/* Role Badge */}
                          {member.role && member.role.toLowerCase().includes('maid of honor') && (
                            <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                              MOH
                            </div>
                          )}
                        </div>
                        
                        {/* Info */}
                        <div className="ml-5 flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 body-font group-hover:text-pink-600 transition-colors">
                            {member.name}
                          </h4>
                          {member.role && (
                            <p className="text-sm text-pink-500 font-medium mb-1">
                              {member.role}
                            </p>
                          )}
                          {member.description && (
                            <p className="text-sm text-gray-600 body-font leading-relaxed">
                              {member.description}
                            </p>
                          )}
                        </div>
                        
                        {/* Decorative Element */}
                        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Heart className="w-5 h-5 text-pink-300 float-animation" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Groomsmen */}
            <div className="relative">
              {/* Side Decoration */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-transparent via-blue-200 to-transparent opacity-50" />
              
              <div className="text-center mb-10">
                <h3 className="text-2xl text-gray-700 body-font font-medium inline-flex items-center gap-2">
                  <span className="text-blue-500">♦</span>
                  {data.groomsmen.title || "Groomsmen"}
                  <span className="text-blue-500">♦</span>
                </h3>
              </div>
              
              <div className="space-y-4">
                {data.groomsmen.members.map((member, index) => (
                  <div 
                    key={member.id} 
                    className="group relative"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-blue-100/50">
                      <div className="flex items-center p-5">
                        {/* Photo */}
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={member.name}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Heart className="w-8 h-8 text-blue-300" fill="currentColor" />
                              </div>
                            )}
                          </div>
                          {/* Role Badge */}
                          {member.role && member.role.toLowerCase().includes('best man') && (
                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                              BM
                            </div>
                          )}
                        </div>
                        
                        {/* Info */}
                        <div className="ml-5 flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 body-font group-hover:text-blue-600 transition-colors">
                            {member.name}
                          </h4>
                          {member.role && (
                            <p className="text-sm text-blue-500 font-medium mb-1">
                              {member.role}
                            </p>
                          )}
                          {member.description && (
                            <p className="text-sm text-gray-600 body-font leading-relaxed">
                              {member.description}
                            </p>
                          )}
                        </div>
                        
                        {/* Decorative Element */}
                        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Heart className="w-5 h-5 text-blue-300 float-animation" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}