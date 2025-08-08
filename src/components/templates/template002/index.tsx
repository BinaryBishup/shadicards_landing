"use client";

import type { TemplateComponentProps } from '@/types/wedding-template';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StorySection from './StorySection';
import FamilySection from './FamilySection';
import GallerySection from './GallerySection';
import WeddingPartySection from './WeddingPartySection';

export default function Template002({ data, primaryColor = '#3b82f6', secondaryColor = '#8b5cf6', visibility }: TemplateComponentProps) {
  // Default all sections to visible if not specified
  const {
    show_hero = true,
    show_about = true,
    show_story = true,
    show_families = true,
    show_gallery = true,
    show_wedding_party = true
  } = visibility || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {show_hero && <HeroSection data={data.hero} primaryColor={primaryColor} />}
      {show_about && <AboutSection data={data.about} primaryColor={primaryColor} />}
      {show_story && <StorySection data={data.story} primaryColor={primaryColor} />}
      {show_families && <FamilySection data={data.family} primaryColor={primaryColor} />}
      {show_gallery && <GallerySection data={data.gallery} primaryColor={primaryColor} />}
      {show_wedding_party && <WeddingPartySection data={data.weddingParty} primaryColor={primaryColor} />}
    </div>
  );
}