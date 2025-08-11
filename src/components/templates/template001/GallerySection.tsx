"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { GalleryData } from '@/types/wedding-template';

interface GallerySectionProps {
  data: GalleryData;
  primaryColor?: string;
}

export default function GallerySection({ data, primaryColor = '#ec4899' }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!data.images || data.images.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-2">
            Beautiful Gallery
          </h2>
          <p className="text-lg text-gray-600">Capturing Our Special Moments</p>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {data.images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.url)}
              className="break-inside-avoid cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <div className={`relative ${
                  index % 3 === 0 ? 'h-80' : index % 3 === 1 ? 'h-64' : 'h-72'
                }`}>
                  <Image
                    src={image.url}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative max-w-5xl max-h-[90vh]">
              <Image
                src={selectedImage}
                alt="Selected image"
                width={1200}
                height={800}
                className="object-contain max-h-[90vh] w-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}