"use client";

import { CalendarDays, Heart } from 'lucide-react';
import Image from 'next/image';
import type { StoryData } from '@/types/wedding-template';

interface StorySectionProps {
  data: StoryData[];
  primaryColor?: string;
}

export default function StorySection({ data, primaryColor = '#3b82f6' }: StorySectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        {data.map((storySection, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Our Journey</p>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {storySection.title}
              </h2>
            </div>

            {/* Modern Timeline Design */}
            <div className="relative">
              {storySection.items.map((item, index) => (
                <div key={item.id} className="relative mb-12 last:mb-0">
                  {/* Connecting Line */}
                  {index < storySection.items.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-blue-200 to-purple-200" />
                  )}
                  
                  <div className="flex gap-8">
                    {/* Timeline Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                      {item.icon || <Heart className="w-6 h-6" />}
                    </div>
                    
                    {/* Content Card */}
                    <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row">
                        {item.image && (
                          <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="p-8 flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                            {item.date && (
                              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                <CalendarDays className="w-4 h-4" />
                                <span>{item.date}</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}