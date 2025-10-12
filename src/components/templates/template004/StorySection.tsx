"use client";

import React from 'react';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import Image from 'next/image';
import type { StoryData } from '@/types/wedding-template';

interface StorySectionProps {
  data: StoryData[];
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * StorySection - Royal Luxury Template
 *
 * Elegant centered timeline with gold line, alternating card layouts,
 * luxury bordered cards, and date badges with gold accents.
 */
export default function StorySection({
  data,
  primaryColor = '#991b1b',
  secondaryColor = '#f59e0b'
}: StorySectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  // Get the first story section's items
  const storySection = data[0];
  const storyItems = storySection?.items || [];

  if (storyItems.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Heart className="w-8 h-8" style={{ color: secondaryColor }} fill={secondaryColor} />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: primaryColor }}>
            {storySection.title || 'Our Love Story'}
          </h2>
          <p className="font-cinzel text-sm md:text-base uppercase tracking-widest" style={{ color: secondaryColor }}>
            A Journey Written in the Stars
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Center Gold Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-400" />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {storyItems.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            ))}
          </div>

          {/* End Ornament */}
          <div className="flex justify-center mt-12">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border-4"
                style={{
                  borderColor: secondaryColor,
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}ee)`
                }}
              >
                <Heart className="w-7 h-7 text-amber-50" fill="currentColor" />
              </div>
              <Sparkles
                className="absolute -top-1 -right-1 w-5 h-5 animate-pulse"
                style={{ color: secondaryColor }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  item: {
    id: string;
    title: string;
    date?: string;
    description: string;
    image?: string;
  };
  index: number;
  primaryColor: string;
  secondaryColor: string;
}

function TimelineItem({ item, index, primaryColor, secondaryColor }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        {isLeft ? (
          <>
            <StoryCard
              item={item}
              align="right"
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
            <div /> {/* Empty space */}
          </>
        ) : (
          <>
            <div /> {/* Empty space */}
            <StoryCard
              item={item}
              align="left"
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </>
        )}

        {/* Center Circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Outer Glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-30"
              style={{ backgroundColor: secondaryColor }}
            />

            {/* Circle */}
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center border-4 bg-white"
              style={{ borderColor: secondaryColor }}
            >
              <div
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
            </div>

            {/* Decorative Rays */}
            {[0, 90, 180, 270].map((angle) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 w-6 h-0.5 origin-left"
                style={{
                  background: `linear-gradient(to right, ${secondaryColor}, transparent)`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <StoryCard
          item={item}
          align="center"
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </div>
    </div>
  );
}

interface StoryCardProps {
  item: {
    title: string;
    date?: string;
    description: string;
    image?: string;
  };
  align: 'left' | 'right' | 'center';
  primaryColor: string;
  secondaryColor: string;
}

function StoryCard({ item, align, primaryColor, secondaryColor }: StoryCardProps) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-lg' : ''}`}>
      <div className="relative group">
        {/* Art Deco Corner Decorations */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg transition-all group-hover:scale-110"
             style={{ borderColor: secondaryColor }} />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg transition-all group-hover:scale-110"
             style={{ borderColor: secondaryColor }} />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg transition-all group-hover:scale-110"
             style={{ borderColor: secondaryColor }} />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-lg transition-all group-hover:scale-110"
             style={{ borderColor: secondaryColor }} />

        {/* Card */}
        <div
          className="relative bg-white rounded-lg border-2 overflow-hidden transition-all group-hover:shadow-2xl"
          style={{
            borderColor: `${secondaryColor}40`,
            boxShadow: `0 10px 30px ${secondaryColor}20`
          }}
        >
          {/* Gold Accent Ribbon */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(to right, ${secondaryColor}, #fbbf24, ${secondaryColor})`
            }}
          />

          {/* Image */}
          {item.image && (
            <div className="relative h-56 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gold Overlay on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: secondaryColor }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Date Badge with Gold Accent */}
            {item.date && (
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full border-2"
                  style={{
                    borderColor: secondaryColor,
                    backgroundColor: `${secondaryColor}10`
                  }}
                >
                  <Calendar className="w-4 h-4" style={{ color: secondaryColor }} />
                  <span className="font-cinzel text-sm font-medium" style={{ color: primaryColor }}>
                    {item.date}
                  </span>
                </div>
              </div>
            )}

            {/* Title */}
            <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4" style={{ color: primaryColor }}>
              {item.title}
            </h3>

            {/* Divider */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-300 to-transparent" />
            </div>

            {/* Description */}
            <p className="font-serif text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Bottom Gold Border */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: `linear-gradient(to right, transparent, ${secondaryColor}, transparent)`
            }}
          />
        </div>

        {/* Gold Glow on Hover */}
        <div
          className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `0 0 40px ${secondaryColor}40`
          }}
        />
      </div>
    </div>
  );
}
