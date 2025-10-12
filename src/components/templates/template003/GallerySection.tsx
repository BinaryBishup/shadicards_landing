"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, Heart } from 'lucide-react';
import type { GalleryData } from '@/types/wedding-template';

interface GallerySectionProps {
  data: GalleryData;
  primaryColor?: string;
}

export default function GallerySection({ data, primaryColor = '#c084fc' }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!data.images || data.images.length === 0) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Poppins:wght@300;400;500&display=swap');

        .elegant-script {
          font-family: 'Cormorant Garamond', serif;
        }

        .body-text {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes gallery-fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gallery-item {
          animation: gallery-fade-in 0.6s ease-out forwards;
        }
      `}</style>

      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-white via-pink-50/20 to-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="8" fill="#c084fc" />
            <circle cx="35" cy="40" r="12" fill="#e9d5ff" />
            <circle cx="65" cy="40" r="12" fill="#f8e7f5" />
            <circle cx="40" cy="60" r="10" fill="#fce7f3" />
            <circle cx="60" cy="60" r="10" fill="#e9d5ff" />
          </svg>
        </div>

        <div className="absolute bottom-20 right-10 w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="8" fill="#ec4899" />
            <circle cx="35" cy="40" r="12" fill="#f8e7f5" />
            <circle cx="65" cy="40" r="12" fill="#fce7f3" />
            <circle cx="40" cy="60" r="10" fill="#e9d5ff" />
            <circle cx="60" cy="60" r="10" fill="#f8e7f5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
              <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-purple-300 to-transparent" />
            </div>
            <h2 className="elegant-script text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-3">
              Captured Moments
            </h2>
            <p className="body-text text-gray-500 text-sm tracking-wider">
              A glimpse into our beautiful journey
            </p>
          </div>

          {/* Masonry Gallery Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {data.images.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image.url)}
                className="break-inside-avoid cursor-pointer group gallery-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Image Container with varying heights */}
                  <div className={`relative ${
                    index % 5 === 0 ? 'h-80' :
                    index % 5 === 1 ? 'h-64' :
                    index % 5 === 2 ? 'h-72' :
                    index % 5 === 3 ? 'h-96' : 'h-60'
                  }`}>
                    <Image
                      src={image.url}
                      alt={image.caption || `Gallery image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Decorative corner on hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="3" fill="white" />
                        <circle cx="10" cy="13" r="5" fill="white" opacity="0.7" />
                        <circle cx="22" cy="13" r="5" fill="white" opacity="0.7" />
                        <circle cx="13" cy="19" r="4" fill="white" opacity="0.8" />
                        <circle cx="19" cy="19" r="4" fill="white" opacity="0.8" />
                      </svg>
                    </div>

                    {/* Caption overlay */}
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="body-text text-white text-sm font-light">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Border decoration */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-300/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white hover:text-purple-300 transition-colors z-10 bg-white/10 rounded-full p-3 hover:bg-white/20"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Decorative corners */}
              <div className="absolute top-8 left-8 w-16 h-16 opacity-30">
                <svg viewBox="0 0 60 60" fill="none">
                  <path d="M0 0 L60 0 L60 2 L2 2 L2 60 L0 60 Z" fill="white" />
                </svg>
              </div>
              <div className="absolute top-8 right-8 w-16 h-16 opacity-30">
                <svg viewBox="0 0 60 60" fill="none">
                  <path d="M60 0 L60 60 L58 60 L58 2 L0 2 L0 0 Z" fill="white" />
                </svg>
              </div>
              <div className="absolute bottom-8 left-8 w-16 h-16 opacity-30">
                <svg viewBox="0 0 60 60" fill="none">
                  <path d="M0 60 L0 0 L2 0 L2 58 L60 58 L60 60 Z" fill="white" />
                </svg>
              </div>
              <div className="absolute bottom-8 right-8 w-16 h-16 opacity-30">
                <svg viewBox="0 0 60 60" fill="none">
                  <path d="M60 60 L0 60 L0 58 L58 58 L58 0 L60 0 Z" fill="white" />
                </svg>
              </div>

              {/* Image */}
              <div className="relative max-w-6xl max-h-[90vh] w-full">
                <Image
                  src={selectedImage}
                  alt="Selected image"
                  width={1200}
                  height={800}
                  className="object-contain max-h-[90vh] w-auto mx-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          )}

          {/* Bottom Decorative Element */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-4">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-300 to-purple-200" />
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="3" fill="#ec4899" />
                <circle cx="13" cy="16" r="5" fill="#fce7f3" opacity="0.8" />
                <circle cx="27" cy="16" r="5" fill="#e9d5ff" opacity="0.8" />
                <circle cx="16" cy="24" r="4" fill="#f8e7f5" opacity="0.9" />
                <circle cx="24" cy="24" r="4" fill="#fce7f3" opacity="0.9" />
              </svg>
              <div className="w-24 h-px bg-gradient-to-l from-transparent via-purple-300 to-purple-200" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
