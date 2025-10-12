"use client";

import React from 'react';
import { Heart, Instagram, Facebook, Twitter, Linkedin, Quote } from 'lucide-react';
import Image from 'next/image';
import type { AboutData } from '@/types/wedding-template';

interface AboutSectionProps {
  data: AboutData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * AboutSection - Royal Luxury Template
 *
 * Elegant side-by-side layout with ornate divider, circular photos with
 * thick gold frames, and Art Deco corner decorations.
 */
export default function AboutSection({
  data,
  primaryColor = '#991b1b',
  secondaryColor = '#f59e0b'
}: AboutSectionProps) {
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
            Meet the Couple
          </h2>
          <p className="font-cinzel text-sm md:text-base uppercase tracking-widest" style={{ color: secondaryColor }}>
            Two Hearts, One Soul
          </p>
        </div>

        {/* Couple Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 max-w-7xl mx-auto items-center">
          {/* Bride */}
          <PersonCard
            person={data.bride}
            side="left"
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />

          {/* Ornate Divider - Desktop */}
          <div className="hidden lg:flex justify-center">
            <div className="relative h-96 w-px">
              {/* Vertical Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400 to-transparent" />

              {/* Center Ornament */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Outer Circle */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center border-4"
                    style={{
                      borderColor: secondaryColor,
                      background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}ee)`
                    }}
                  >
                    {/* Inner Heart */}
                    <Heart className="w-8 h-8 text-amber-50" fill="currentColor" />
                  </div>

                  {/* Decorative Rays */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <div
                      key={angle}
                      className="absolute top-1/2 left-1/2 w-12 h-0.5 origin-left"
                      style={{
                        background: `linear-gradient(to right, ${secondaryColor}, transparent)`,
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Divider - Mobile */}
          <div className="lg:hidden flex justify-center py-8">
            <div className="relative w-64 h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center border-4"
                  style={{
                    borderColor: secondaryColor,
                    background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}ee)`
                  }}
                >
                  <Heart className="w-6 h-6 text-amber-50" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>

          {/* Groom */}
          <PersonCard
            person={data.groom}
            side="right"
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>
      </div>
    </section>
  );
}

interface PersonCardProps {
  person: {
    name: string;
    image?: string;
    description?: string;
    profession?: string;
    education?: string;
    socials?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
  side: 'left' | 'right';
  primaryColor: string;
  secondaryColor: string;
}

function PersonCard({ person, side, primaryColor, secondaryColor }: PersonCardProps) {
  return (
    <div className={`text-center ${side === 'right' ? 'lg:pl-12' : 'lg:pr-12'}`}>
      {/* Photo with Ornate Frame */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Art Deco Corner Decorations */}
          <div className="absolute -top-4 -left-4 w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-transparent" />
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: secondaryColor }} />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-amber-400 to-transparent" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-400 to-transparent" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: secondaryColor }} />
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent" />
            <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-t from-amber-400 to-transparent" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: secondaryColor }} />
          </div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12">
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-amber-400 to-transparent" />
            <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-amber-400 to-transparent" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: secondaryColor }} />
          </div>

          {/* Photo Container - Oval Shape with Thick Gold Frame */}
          <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-full overflow-hidden border-8 shadow-2xl"
               style={{ borderColor: secondaryColor }}>
            {person.image ? (
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                <Heart className="w-24 h-24 text-amber-300" fill="currentColor" />
              </div>
            )}
          </div>

          {/* Gold Glow Effect */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: `0 0 40px ${secondaryColor}60, inset 0 0 20px ${secondaryColor}20`
            }}
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-3" style={{ color: primaryColor }}>
        {person.name}
      </h3>

      {/* Profession & Education */}
      {(person.profession || person.education) && (
        <div className="mb-6 space-y-1">
          {person.profession && (
            <p className="font-cinzel text-sm md:text-base" style={{ color: secondaryColor }}>
              {person.profession}
            </p>
          )}
          {person.education && (
            <p className="text-sm text-gray-600 italic">{person.education}</p>
          )}
        </div>
      )}

      {/* Ornate Divider */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-amber-400" />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor }} />
        <div className="w-12 h-px bg-gradient-to-l from-transparent via-amber-400 to-amber-400" />
      </div>

      {/* Description with Quote Styling */}
      {person.description && (
        <div className="relative max-w-md mx-auto mb-8 px-6">
          <Quote
            className="absolute -top-2 -left-2 w-8 h-8 opacity-20"
            style={{ color: secondaryColor }}
          />
          <p className="font-serif text-gray-700 text-base md:text-lg leading-relaxed italic">
            {person.description}
          </p>
          <Quote
            className="absolute -bottom-2 -right-2 w-8 h-8 opacity-20 rotate-180"
            style={{ color: secondaryColor }}
          />
        </div>
      )}

      {/* Social Media Links in Gold */}
      {person.socials && Object.keys(person.socials).length > 0 && (
        <div className="flex justify-center gap-4">
          {person.socials.instagram && (
            <a
              href={person.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all hover:scale-110 hover:shadow-lg"
              style={{
                borderColor: secondaryColor,
                color: secondaryColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = secondaryColor;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = secondaryColor;
              }}
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {person.socials.facebook && (
            <a
              href={person.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all hover:scale-110 hover:shadow-lg"
              style={{
                borderColor: secondaryColor,
                color: secondaryColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = secondaryColor;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = secondaryColor;
              }}
            >
              <Facebook className="w-5 h-5" />
            </a>
          )}
          {person.socials.twitter && (
            <a
              href={person.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all hover:scale-110 hover:shadow-lg"
              style={{
                borderColor: secondaryColor,
                color: secondaryColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = secondaryColor;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = secondaryColor;
              }}
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {person.socials.linkedin && (
            <a
              href={person.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all hover:scale-110 hover:shadow-lg"
              style={{
                borderColor: secondaryColor,
                color: secondaryColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = secondaryColor;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = secondaryColor;
              }}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
