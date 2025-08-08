"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, Camera } from 'lucide-react';
import type { GalleryData } from '@/types/wedding-template';

interface GallerySectionProps {
  data: GalleryData;
  primaryColor?: string;
}

export default function GallerySection({ data, primaryColor = '#3b82f6' }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!data.images || data.images.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Captured Moments</p>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {data.title || 'Our Memories'}
          </h2>
        </div>

        {/* Simple Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.url)}
              className="relative group cursor-pointer aspect-square"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-0.5 h-full">
                <div className="relative w-full h-full bg-white rounded-[14px] overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.caption || 'Gallery image'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {image.caption && (
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      )}
                      <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                        <Camera className="w-3 h-3" />
                        <span>View Full Size</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden">
              <Image
                src={selectedImage}
                alt="Gallery preview"
                width={1920}
                height={1080}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}