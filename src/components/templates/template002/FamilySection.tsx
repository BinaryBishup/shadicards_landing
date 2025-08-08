"use client";

import Image from 'next/image';
import { Users } from 'lucide-react';
import type { FamilyData } from '@/types/wedding-template';

interface FamilySectionProps {
  data: FamilyData;
  primaryColor?: string;
}

export default function FamilySection({ data, primaryColor = '#3b82f6' }: FamilySectionProps) {
  if ((!data.brideSide.members || data.brideSide.members.length === 0) && 
      (!data.groomSide.members || data.groomSide.members.length === 0)) {
    return null;
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Meet</p>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Families
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Bride's Family */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 inline-flex items-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                {data.brideSide.title}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.brideSide.members.map((member) => (
                <div key={member.id} className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-1">
                    <div className="bg-white rounded-xl overflow-hidden">
                      <div className="relative h-64">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <Users className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-semibold text-gray-800">{member.name}</h4>
                        <p className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                          {member.relation}
                        </p>
                        {member.description && (
                          <p className="text-xs text-gray-600 mt-2">{member.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Groom's Family */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 inline-flex items-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                {data.groomSide.title}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.groomSide.members.map((member) => (
                <div key={member.id} className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-1">
                    <div className="bg-white rounded-xl overflow-hidden">
                      <div className="relative h-64">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                            <Users className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-semibold text-gray-800">{member.name}</h4>
                        <p className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                          {member.relation}
                        </p>
                        {member.description && (
                          <p className="text-xs text-gray-600 mt-2">{member.description}</p>
                        )}
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
  );
}