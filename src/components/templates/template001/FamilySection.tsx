"use client";

import Image from 'next/image';
import type { FamilyData } from '@/types/wedding-template';

interface FamilySectionProps {
  data: FamilyData;
  primaryColor?: string;
}

export default function FamilySection({ data, primaryColor = '#ec4899' }: FamilySectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16" style={{ color: primaryColor }}>
          Our Families
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bride's Family */}
          <div>
            <h3 className="text-2xl font-serif text-center mb-8 text-gray-700">
              {data.brideSide.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.brideSide.members.map((member) => (
                <div key={member.id} className="group cursor-pointer">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 bg-gradient-to-br from-pink-100 to-rose-100">
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800">{member.name}</h4>
                      <p className="text-sm" style={{ color: primaryColor }}>{member.relation}</p>
                      {member.description && (
                        <p className="text-xs text-gray-600 mt-2">{member.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Groom's Family */}
          <div>
            <h3 className="text-2xl font-serif text-center mb-8 text-gray-700">
              {data.groomSide.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.groomSide.members.map((member) => (
                <div key={member.id} className="group cursor-pointer">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100">
                      {member.image && (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800">{member.name}</h4>
                      <p className="text-sm" style={{ color: primaryColor }}>{member.relation}</p>
                      {member.description && (
                        <p className="text-xs text-gray-600 mt-2">{member.description}</p>
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