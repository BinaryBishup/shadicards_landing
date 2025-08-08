"use client";

import { Calendar } from 'lucide-react';
import Image from 'next/image';
import type { StoryData } from '@/types/wedding-template';

interface StorySectionProps {
  data: StoryData[];
  primaryColor?: string;
}

export default function StorySection({ data, primaryColor = '#ec4899' }: StorySectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-6xl mx-auto">
        {data.map((storySection, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-center mb-16" style={{ color: primaryColor }}>
              {storySection.title}
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-pink-200 hidden md:block" />

              {/* Story Items */}
              <div className="space-y-12">
                {storySection.items.map((item, index) => (
                  <div key={item.id} className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Content */}
                    <div className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}>
                      <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
                        {item.image && (
                          <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                            {item.title}
                          </h3>
                          
                          {item.date && (
                            <div className={`flex items-center gap-2 text-sm text-gray-500 mb-3 ${
                              index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                            }`}>
                              <Calendar className="w-4 h-4" />
                              <span>{item.date}</span>
                            </div>
                          )}
                          
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                      <div className="w-12 h-12 bg-white rounded-full border-4 flex items-center justify-center shadow-lg"
                           style={{ borderColor: primaryColor }}>
                        <span className="text-xl">{item.icon || '💕'}</span>
                      </div>
                    </div>

                    {/* Empty Space */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}