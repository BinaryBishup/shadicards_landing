import type { Wedding, WeddingWebsite as WeddingWebsiteType, Event } from '@/lib/supabase';
import type { WeddingTemplateData, TemplateId } from '@/types/wedding-template';

/**
 * Maps Supabase database data to template format
 */
export function mapDatabaseToTemplateData(
  wedding: Wedding,
  website: WeddingWebsiteType,
  events?: Event[]
): WeddingTemplateData {
  // Parse JSONB data with fallbacks
  const storyItems = website.story_items as any[] || [];
  const galleryImages = website.gallery_images as any[] || [];
  const brideFamilies = website.bride_families as any || {};
  const groomFamilies = website.groom_families as any || {};
  const bridesmaids = website.bridesmaids as any[] || [];
  const groomsmen = website.groomsmen as any[] || [];

  return {
    hero: {
      brideName: wedding.bride_name,
      groomName: wedding.groom_name,
      coupleImage: wedding.couple_picture || undefined,
      weddingDate: wedding.wedding_date || '',
      weddingTime: events?.[0]?.start_time || undefined,
      venue: wedding.venue_name || undefined,
      tagline: website.meta_description || undefined,
    },
    about: {
      bride: {
        name: wedding.bride_name,
        image: wedding.bride_photo_url || wedding.bride_photo || undefined,
        description: wedding.about_bride || undefined,
        profession: undefined, // Could be added to wedding table
        education: undefined, // Could be added to wedding table
        socials: {
          // Could be parsed from a JSON field or separate columns
        }
      },
      groom: {
        name: wedding.groom_name,
        image: wedding.groom_photo_url || wedding.groom_photo || undefined,
        description: wedding.about_groom || undefined,
        profession: undefined, // Could be added to wedding table
        education: undefined, // Could be added to wedding table
        socials: {
          // Could be parsed from a JSON field or separate columns
        }
      }
    },
    story: storyItems.length > 0 ? [{
      title: 'Our Love Story',
      items: storyItems.map((item: any, index: number) => ({
        id: item.id || `story-${index}`,
        title: item.title || 'Our Moment',
        date: item.date || undefined,
        description: item.description || '',
        image: item.image || undefined,
        icon: item.icon || '💕'
      }))
    }] : [],
    family: {
      brideSide: {
        title: "Bride's Family",
        members: (brideFamilies.members || []).map((member: any, index: number) => ({
          id: member.id || `bride-family-${index}`,
          name: member.name || '',
          relation: member.relation || '',
          image: member.image || undefined,
          description: member.description || undefined
        }))
      },
      groomSide: {
        title: "Groom's Family",
        members: (groomFamilies.members || []).map((member: any, index: number) => ({
          id: member.id || `groom-family-${index}`,
          name: member.name || '',
          relation: member.relation || '',
          image: member.image || undefined,
          description: member.description || undefined
        }))
      }
    },
    gallery: {
      title: 'Our Memories',
      images: galleryImages.map((img: any, index: number) => ({
        id: img.id || `gallery-${index}`,
        url: img.url || img.src || '',
        caption: img.caption || undefined,
        category: img.category || 'All'
      })),
      categories: Array.from(new Set(galleryImages.map((img: any) => img.category).filter(Boolean)))
    },
    weddingParty: {
      bridesmaids: {
        title: 'Bridesmaids',
        members: bridesmaids.map((member: any, index: number) => ({
          id: member.id || `bridesmaid-${index}`,
          name: member.name || '',
          role: member.role || 'Bridesmaid',
          image: member.image || undefined,
          description: member.description || undefined
        }))
      },
      groomsmen: {
        title: 'Groomsmen',
        members: groomsmen.map((member: any, index: number) => ({
          id: member.id || `groomsman-${index}`,
          name: member.name || '',
          role: member.role || 'Groomsman',
          image: member.image || undefined,
          description: member.description || undefined
        }))
      }
    }
  };
}

/**
 * Gets the template ID from the database format
 */
export function getTemplateIdFromDatabase(templateId: string | null): TemplateId {
  // Handle various formats: '001', 'template001', '1', etc.
  if (!templateId) return 'template001';
  
  const numMatch = templateId.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0]);
    if (num === 1 || num === 1) return 'template001';
    if (num === 2 || num === 2) return 'template002';
    if (num === 3 || num === 3) return 'template003';
  }
  
  if (templateId.includes('001') || templateId.includes('1')) return 'template001';
  if (templateId.includes('002') || templateId.includes('2')) return 'template002';
  if (templateId.includes('003') || templateId.includes('3')) return 'template003';
  
  return 'template001'; // Default
}