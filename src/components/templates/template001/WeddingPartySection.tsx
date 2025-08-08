"use client";

import Image from 'next/image';
import type { WeddingPartyData } from '@/types/wedding-template';

interface WeddingPartySectionProps {
  data: WeddingPartyData;
  primaryColor?: string;
}

export default function WeddingPartySection({ data, primaryColor = '#ec4899' }: WeddingPartySectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16" style={{ color: primaryColor }}>
          Wedding Party
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Bridesmaids */}
          <div>
            <h3 className="text-2xl font-serif text-center mb-8" style={{ color: primaryColor }}>
              {data.bridesmaids.title}
            </h3>
            <div className="space-y-6">
              {data.bridesmaids.members.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center p-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 flex-shrink-0">
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-bold text-gray-800">{member.name}</h4>
                      {member.role && (
                        <p className="text-sm" style={{ color: primaryColor }}>{member.role}</p>
                      )}
                      {member.description && (
                        <p className="text-sm text-gray-600 mt-1">{member.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Groomsmen */}
          <div>
            <h3 className="text-2xl font-serif text-center mb-8" style={{ color: primaryColor }}>
              {data.groomsmen.title}
            </h3>
            <div className="space-y-6">
              {data.groomsmen.members.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center p-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 flex-shrink-0">
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-bold text-gray-800">{member.name}</h4>
                      {member.role && (
                        <p className="text-sm" style={{ color: primaryColor }}>{member.role}</p>
                      )}
                      {member.description && (
                        <p className="text-sm text-gray-600 mt-1">{member.description}</p>
                      )}
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