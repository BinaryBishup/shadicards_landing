"use client";

import Image from 'next/image';
import type { StoryData } from '@/types/wedding-template';

interface StorySectionProps {
  data: StoryData[];
  primaryColor?: string;
}

export default function StorySection({ data, primaryColor = '#ec4899' }: StorySectionProps) {
  if (!data || data.length === 0) return null;

  // Get the first story section's items for the grid layout
  const storyItems = data[0]?.items || [];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
            Our Story
          </h2>
          <p className="text-lg text-gray-600">How it Happened</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storyItems.slice(0, 4).map((event, index) => (
            <div key={event.id} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-64 bg-gray-100">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-6xl">💑</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif text-xl mb-1">{event.title}</h3>
                  <p className="text-sm opacity-90">{event.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}