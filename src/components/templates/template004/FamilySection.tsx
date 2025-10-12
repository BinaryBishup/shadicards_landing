"use client";

import React from 'react';
import { Heart, Users, Crown } from 'lucide-react';
import Image from 'next/image';
import type { FamilyData } from '@/types/wedding-template';

interface FamilySectionProps {
  data: FamilyData;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * FamilySection - Royal Luxury Template
 *
 * Elegant family member cards with luxury borders, gold accent ribbons,
 * elegant name badges, and hover effects with gold shine.
 */
export default function FamilySection({
  data,
  primaryColor = '#991b1b',
  secondaryColor = '#f59e0b'
}: FamilySectionProps) {
  const hasBrideSide = data?.brideSide?.members && data.brideSide.members.length > 0;
  const hasGroomSide = data?.groomSide?.members && data.groomSide.members.length > 0;

  if (!hasBrideSide && !hasGroomSide) {
    return null;
  }

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Users className="w-8 h-8" style={{ color: secondaryColor }} strokeWidth={1.5} />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: primaryColor }}>
            Our Families
          </h2>
          <p className="font-cinzel text-sm md:text-base uppercase tracking-widest" style={{ color: secondaryColor }}>
            The Pillars of Our Love
          </p>
        </div>

        {/* Families Grid */}
        <div className="space-y-24">
          {/* Bride's Side */}
          {hasBrideSide && (
            <FamilySide
              title={data.brideSide.title}
              members={data.brideSide.members}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          )}

          {/* Elegant Divider */}
          {hasBrideSide && hasGroomSide && (
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border-4"
                    style={{
                      borderColor: secondaryColor,
                      background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}ee)`
                    }}
                  >
                    <Heart className="w-7 h-7 text-amber-50" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Groom's Side */}
          {hasGroomSide && (
            <FamilySide
              title={data.groomSide.title}
              members={data.groomSide.members}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          )}
        </div>
      </div>
    </section>
  );
}

interface FamilySideProps {
  title: string;
  members: Array<{
    id: string;
    name: string;
    relation: string;
    image?: string;
    description?: string;
  }>;
  primaryColor: string;
  secondaryColor: string;
}

function FamilySide({ title, members, primaryColor, secondaryColor }: FamilySideProps) {
  return (
    <div>
      {/* Side Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border-2" style={{
          borderColor: secondaryColor,
          backgroundColor: `${secondaryColor}10`
        }}>
          <Crown className="w-6 h-6" style={{ color: secondaryColor }} />
          <h3 className="font-playfair text-2xl md:text-3xl font-bold" style={{ color: primaryColor }}>
            {title}
          </h3>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {members.map((member) => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        ))}
      </div>
    </div>
  );
}

interface FamilyMemberCardProps {
  member: {
    name: string;
    relation: string;
    image?: string;
    description?: string;
  };
  primaryColor: string;
  secondaryColor: string;
}

function FamilyMemberCard({ member, primaryColor, secondaryColor }: FamilyMemberCardProps) {
  return (
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
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: `linear-gradient(to right, ${secondaryColor}, #fbbf24, ${secondaryColor})`
          }}
        />

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          {member.image ? (
            <>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gold Overlay on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: secondaryColor }}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
              <Heart className="w-20 h-20 text-amber-300" fill="currentColor" />
            </div>
          )}

          {/* Relation Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div
              className="px-4 py-2 rounded-full border-2 backdrop-blur-sm"
              style={{
                borderColor: secondaryColor,
                backgroundColor: `${primaryColor}ee`,
                boxShadow: `0 4px 15px ${secondaryColor}40`
              }}
            >
              <p className="font-cinzel text-xs uppercase tracking-wider text-white">
                {member.relation}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Name */}
          <h4 className="font-playfair text-xl md:text-2xl font-bold mb-3" style={{ color: primaryColor }}>
            {member.name}
          </h4>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-300 to-amber-300" />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-amber-300 to-amber-300" />
          </div>

          {/* Description */}
          {member.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {member.description}
            </p>
          )}
        </div>

        {/* Gold Shine Effect on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${secondaryColor}20 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
            animation: 'shine 2s ease-in-out infinite'
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

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
      `}</style>
    </div>
  );
}
