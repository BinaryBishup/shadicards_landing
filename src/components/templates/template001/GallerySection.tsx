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
    <section className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-12" style={{ color: primaryColor }}>
          {data.title || 'Our Memories'}
        </h2>

        {/* Simple Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.images.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.url)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <Image
                src={image.url}
                alt={image.caption || 'Gallery image'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.caption && (
                  <p className="absolute bottom-2 left-2 right-2 text-white text-sm">
                    {image.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative max-w-4xl max-h-[90vh]">
              <Image
                src={selectedImage}
                alt="Gallery preview"
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}