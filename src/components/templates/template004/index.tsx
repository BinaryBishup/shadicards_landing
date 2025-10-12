"use client";

import type { TemplateComponentProps } from '@/types/wedding-template';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StorySection from './StorySection';
import FamilySection from './FamilySection';
import GallerySection from './GallerySection';
import WeddingPartySection from './WeddingPartySection';

/**
 * Template004 - Royal Luxury
 *
 * An elegant, sophisticated wedding template with a royal luxury theme.
 * Features deep burgundy and rich gold color scheme with Art Deco design elements.
 *
 * @component
 * @param {TemplateComponentProps} props - Template component properties
 * @param {WeddingTemplateData} props.data - Wedding data for all sections
 * @param {string} [props.primaryColor='#991b1b'] - Primary color (default: deep burgundy)
 * @param {string} [props.secondaryColor='#f59e0b'] - Secondary color (default: rich gold)
 * @param {VisibilitySettings} [props.visibility] - Section visibility settings
 */
export default function Template004({
  data,
  primaryColor = '#991b1b',
  secondaryColor = '#f59e0b',
  visibility
}: TemplateComponentProps) {
  console.log("👑 TEMPLATE004 (Royal Luxury) IS RENDERING");

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-x-hidden">
      {/* Gold shimmer overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-amber-100/20 pointer-events-none" />

      <div className="relative z-10">
        {show_hero && <HeroSection data={data.hero} primaryColor={primaryColor} secondaryColor={secondaryColor} />}
        {show_about && <AboutSection data={data.about} primaryColor={primaryColor} secondaryColor={secondaryColor} />}
        {show_story && <StorySection data={data.story} primaryColor={primaryColor} secondaryColor={secondaryColor} />}
        {show_families && <FamilySection data={data.family} primaryColor={primaryColor} secondaryColor={secondaryColor} />}
        {show_gallery && <GallerySection data={data.gallery} primaryColor={primaryColor} secondaryColor={secondaryColor} />}
        {show_wedding_party && <WeddingPartySection data={data.weddingParty} primaryColor={primaryColor} secondaryColor={secondaryColor} />}
      </div>
    </div>
  );
}
