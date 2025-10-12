"use client";

import React, { useState } from 'react';
import { Heart, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import type { GalleryData } from '@/types/wedding-template';

interface GallerySectionProps {
  data: GalleryData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * GallerySection - Royal Luxury Template
 *
 * Elegant grid layout with gold separators, hover effects with gold overlay,
 * and luxury lightbox with ornate frame. Includes category filters with gold buttons.
 */
export default function GallerySection({
  data,
  primaryColor = '#991b1b',
  secondaryColor = '#f59e0b'
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  if (!data?.images || data.images.length === 0) {
    return null;
  }

  const categories = data.categories || [];
  const filteredImages = selectedCategory === 'all'
    ? data.images
    : data.images.filter(img => img.category === selectedCategory);

  const handlePrevious = () => {
    if (lightboxImage !== null && lightboxImage > 0) {
      setLightboxImage(lightboxImage - 1);
    }
  };

  const handleNext = () => {
    if (lightboxImage !== null && lightboxImage < filteredImages.length - 1) {
      setLightboxImage(lightboxImage + 1);
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Heart className="w-8 h-8" style={{ color: secondaryColor }} fill={secondaryColor} />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: primaryColor }}>
            {data.title || 'Gallery'}
          </h2>
          <p className="font-cinzel text-sm md:text-base uppercase tracking-widest" style={{ color: secondaryColor }}>
            Captured Moments of Love
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-2.5 rounded-full font-cinzel text-sm uppercase tracking-wider transition-all hover:scale-105 border-2"
              style={{
                backgroundColor: selectedCategory === 'all' ? secondaryColor : 'transparent',
                borderColor: secondaryColor,
                color: selectedCategory === 'all' ? 'white' : primaryColor,
                boxShadow: selectedCategory === 'all' ? `0 4px 20px ${secondaryColor}40` : 'none'
              }}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2.5 rounded-full font-cinzel text-sm uppercase tracking-wider transition-all hover:scale-105 border-2"
                style={{
                  backgroundColor: selectedCategory === category ? secondaryColor : 'transparent',
                  borderColor: secondaryColor,
                  color: selectedCategory === category ? 'white' : primaryColor,
                  boxShadow: selectedCategory === category ? `0 4px 20px ${secondaryColor}40` : 'none'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid with Gold Separators */}
        <div className="relative max-w-6xl mx-auto">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {filteredImages.map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                onClick={() => setLightboxImage(index)}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            ))}
          </div>

          {/* Gold Grid Lines Effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                repeating-linear-gradient(90deg, transparent, transparent calc(33.333% - 0.5px), ${secondaryColor}20 calc(33.333% - 0.5px), ${secondaryColor}20 calc(33.333% + 0.5px)),
                repeating-linear-gradient(0deg, transparent, transparent calc(33.333% - 0.5px), ${secondaryColor}20 calc(33.333% - 0.5px), ${secondaryColor}20 calc(33.333% + 0.5px))
              `
            }}
          />
        </div>
      </div>

      {/* Luxury Lightbox */}
      {lightboxImage !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxImage}
          onClose={() => setLightboxImage(null)}
          onPrevious={handlePrevious}
          onNext={handleNext}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}
    </section>
  );
}

interface GalleryItemProps {
  image: {
    url: string;
    caption?: string;
  };
  index: number;
  onClick: () => void;
  primaryColor: string;
  secondaryColor: string;
}

function GalleryItem({ image, onClick, primaryColor, secondaryColor }: GalleryItemProps) {
  return (
    <button
      onClick={onClick}
      className="relative aspect-square overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <Image
        src={image.url}
        alt={image.caption || 'Gallery image'}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gold Overlay on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${secondaryColor}40, ${primaryColor}40)`
        }}
      />

      {/* Gold Border Shine Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 30px ${secondaryColor}80`
        }}
      />

      {/* Caption on Hover */}
      {image.caption && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="text-center px-4">
            <p className="font-cinzel text-white text-sm md:text-base font-medium drop-shadow-lg">
              {image.caption}
            </p>
          </div>
        </div>
      )}

      {/* Corner Sparkle */}
      <Sparkles
        className="absolute top-3 right-3 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
      />
    </button>
  );
}

interface LightboxProps {
  images: Array<{ url: string; caption?: string }>;
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  primaryColor: string;
  secondaryColor: string;
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  primaryColor,
  secondaryColor
}: LightboxProps) {
  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Ornate Frame Background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, ${secondaryColor} 1px, transparent 1px),
                         radial-gradient(circle at 80% 20%, ${secondaryColor} 1px, transparent 1px),
                         radial-gradient(circle at 20% 80%, ${secondaryColor} 1px, transparent 1px),
                         radial-gradient(circle at 80% 80%, ${secondaryColor} 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 border-2"
        style={{
          borderColor: secondaryColor,
          backgroundColor: `${primaryColor}ee`,
          boxShadow: `0 0 20px ${secondaryColor}60`
        }}
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={onPrevious}
          className="absolute left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 border-2"
          style={{
            borderColor: secondaryColor,
            backgroundColor: `${primaryColor}ee`,
            boxShadow: `0 0 20px ${secondaryColor}60`
          }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 border-2"
          style={{
            borderColor: secondaryColor,
            backgroundColor: `${primaryColor}ee`,
            boxShadow: `0 0 20px ${secondaryColor}60`
          }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Image with Ornate Frame */}
      <div className="relative max-w-5xl w-full mx-4">
        {/* Art Deco Corner Decorations */}
        <div className="absolute -top-8 -left-8 w-16 h-16 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: secondaryColor }} />
        <div className="absolute -top-8 -right-8 w-16 h-16 border-t-4 border-r-4 rounded-tr-2xl" style={{ borderColor: secondaryColor }} />
        <div className="absolute -bottom-8 -left-8 w-16 h-16 border-b-4 border-l-4 rounded-bl-2xl" style={{ borderColor: secondaryColor }} />
        <div className="absolute -bottom-8 -right-8 w-16 h-16 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: secondaryColor }} />

        {/* Image Container */}
        <div className="relative aspect-video">
          <Image
            src={currentImage.url}
            alt={currentImage.caption || 'Gallery image'}
            fill
            className="object-contain"
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className="mt-6 text-center">
            <div className="inline-block px-8 py-3 rounded-full border-2" style={{
              borderColor: secondaryColor,
              backgroundColor: `${primaryColor}ee`,
              boxShadow: `0 4px 20px ${secondaryColor}40`
            }}>
              <p className="font-cinzel text-white text-base md:text-lg">
                {currentImage.caption}
              </p>
            </div>
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 left-4 px-4 py-2 rounded-full border-2" style={{
          borderColor: secondaryColor,
          backgroundColor: `${primaryColor}ee`,
          boxShadow: `0 4px 20px ${secondaryColor}40`
        }}>
          <p className="font-cinzel text-white text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        {/* Gold Glow Effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            boxShadow: `0 0 60px ${secondaryColor}40, inset 0 0 40px ${secondaryColor}10`
          }}
        />
      </div>
    </div>
  );
}
