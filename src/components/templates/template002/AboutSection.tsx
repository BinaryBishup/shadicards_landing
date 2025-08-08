"use client";

import Image from 'next/image';
import { User2, Quote } from 'lucide-react';
import type { AboutData } from '@/types/wedding-template';

interface AboutSectionProps {
  data: AboutData;
  primaryColor?: string;
}

export default function AboutSection({ data, primaryColor = '#3b82f6' }: AboutSectionProps) {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Get to Know</p>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            The Happy Couple
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Bride - Modern Card Design */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl" />
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative h-[400px] bg-gradient-to-br from-blue-50 to-purple-50">
                {data.bride.image ? (
                  <Image
                    src={data.bride.image}
                    alt={data.bride.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User2 className="w-32 h-32 text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{data.bride.name}</h3>
                  <p className="text-white/90 text-sm uppercase tracking-wider">The Bride</p>
                </div>
              </div>
              
              <div className="p-8">
                {data.bride.description && (
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                    <p className="text-gray-600 leading-relaxed pl-6 italic">
                      {data.bride.description}
                    </p>
                  </div>
                )}
                
                {(data.bride.profession || data.bride.education) && (
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                    {data.bride.profession && (
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Career:</span> {data.bride.profession}
                      </p>
                    )}
                    {data.bride.education && (
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Education:</span> {data.bride.education}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Groom - Modern Card Design */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl" />
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative h-[400px] bg-gradient-to-br from-purple-50 to-pink-50">
                {data.groom.image ? (
                  <Image
                    src={data.groom.image}
                    alt={data.groom.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User2 className="w-32 h-32 text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{data.groom.name}</h3>
                  <p className="text-white/90 text-sm uppercase tracking-wider">The Groom</p>
                </div>
              </div>
              
              <div className="p-8">
                {data.groom.description && (
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200" />
                    <p className="text-gray-600 leading-relaxed pl-6 italic">
                      {data.groom.description}
                    </p>
                  </div>
                )}
                
                {(data.groom.profession || data.groom.education) && (
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                    {data.groom.profession && (
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Career:</span> {data.groom.profession}
                      </p>
                    )}
                    {data.groom.education && (
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Education:</span> {data.groom.education}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}