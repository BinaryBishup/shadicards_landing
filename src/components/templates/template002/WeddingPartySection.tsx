"use client";

import Image from 'next/image';
import { Crown, Users2 } from 'lucide-react';
import type { WeddingPartyData } from '@/types/wedding-template';

interface WeddingPartySectionProps {
  data: WeddingPartyData;
  primaryColor?: string;
}

export default function WeddingPartySection({ data, primaryColor = '#3b82f6' }: WeddingPartySectionProps) {
  if ((!data.bridesmaids.members || data.bridesmaids.members.length === 0) && 
      (!data.groomsmen.members || data.groomsmen.members.length === 0)) {
    return null;
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Supporting Cast</p>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wedding Party
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Bridesmaids */}
          {data.bridesmaids.members && data.bridesmaids.members.length > 0 && (
            <div>
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400" />
                <Crown className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {data.bridesmaids.title}
                </h3>
                <Crown className="w-8 h-8 text-blue-500" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400" />
              </div>
              
              <div className="space-y-4">
                {data.bridesmaids.members.map((member, index) => (
                  <div key={member.id} className="group">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-1">
                      <div className="bg-white rounded-[15px] p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200 flex-shrink-0">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users2 className="w-10 h-10 text-white/70" />
                            </div>
                          )}
                          {index === 0 && member.role?.toLowerCase().includes('honor') && (
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                              <Crown className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                          {member.role && (
                            <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {member.role}
                            </p>
                          )}
                          {member.description && (
                            <p className="text-sm text-gray-600 mt-1">{member.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Groomsmen */}
          {data.groomsmen.members && data.groomsmen.members.length > 0 && (
            <div>
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400" />
                <Crown className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {data.groomsmen.title}
                </h3>
                <Crown className="w-8 h-8 text-purple-500" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400" />
              </div>
              
              <div className="space-y-4">
                {data.groomsmen.members.map((member, index) => (
                  <div key={member.id} className="group">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-1">
                      <div className="bg-white rounded-[15px] p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200 flex-shrink-0">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Users2 className="w-10 h-10 text-white/70" />
                            </div>
                          )}
                          {index === 0 && member.role?.toLowerCase().includes('best') && (
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                              <Crown className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                          {member.role && (
                            <p className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {member.role}
                            </p>
                          )}
                          {member.description && (
                            <p className="text-sm text-gray-600 mt-1">{member.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}