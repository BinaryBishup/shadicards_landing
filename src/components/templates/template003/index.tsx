"use client";

import type { TemplateComponentProps } from '@/types/wedding-template';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StorySection from './StorySection';
import FamilySection from './FamilySection';
import GallerySection from './GallerySection';
import WeddingPartySection from './WeddingPartySection';

export default function Template003({ data, primaryColor = '#c084fc', secondaryColor = '#f8e7f5', visibility }: TemplateComponentProps) {
  console.log("💐 TEMPLATE003 (Sukun Elegance) IS RENDERING");

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
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 via-purple-50/20 to-white overflow-x-hidden">
      {show_hero && <HeroSection data={data.hero} primaryColor={primaryColor} />}
      {show_about && <AboutSection data={data.about} primaryColor={primaryColor} />}
      {show_story && <StorySection data={data.story} primaryColor={primaryColor} />}
      {show_families && <FamilySection data={data.family} primaryColor={primaryColor} />}
      {show_gallery && <GallerySection data={data.gallery} primaryColor={primaryColor} />}
      {show_wedding_party && <WeddingPartySection data={data.weddingParty} primaryColor={primaryColor} />}
    </div>
  );
}
