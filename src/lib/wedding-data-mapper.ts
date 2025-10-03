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

  // Handle different possible structures for families
  const brideFamilies = website.bride_families as any || {};
  const brideFamilyMembers = Array.isArray(brideFamilies) ? brideFamilies :
                              (brideFamilies.members || brideFamilies.family || []);

  const groomFamilies = website.groom_families as any || {};
  const groomFamilyMembers = Array.isArray(groomFamilies) ? groomFamilies :
                              (groomFamilies.members || groomFamilies.family || []);

  // Handle different possible structures for wedding party
  const bridesmaidsData = website.bridesmaids as any;
  const bridesmaids = Array.isArray(bridesmaidsData) ? bridesmaidsData :
                       (bridesmaidsData?.members || bridesmaidsData?.party || []);

  const groomsmenData = website.groomsmen as any;
  const groomsmen = Array.isArray(groomsmenData) ? groomsmenData :
                     (groomsmenData?.members || groomsmenData?.party || []);

  // Extract first names from full names
  const getFirstName = (fullName: string) => fullName?.split(' ')[0] || fullName || '';

  return {
    hero: {
      brideName: getFirstName(wedding.bride_name),
      groomName: getFirstName(wedding.groom_name),
      coupleImage: wedding.couple_picture || undefined,
      weddingDate: wedding.wedding_date || '',
      weddingTime: events?.[0]?.start_time || undefined,
      venue: wedding.venue_name || undefined,
      tagline: website.meta_description || undefined,
    },
    about: {
      bride: {
        name: wedding.bride_name,
        image: wedding.bride_photo_url || undefined,
        description: wedding.about_bride || undefined,
        profession: undefined, // Could be added to wedding table
        education: undefined, // Could be added to wedding table
        socials: {
          // Could be parsed from a JSON field or separate columns
        }
      },
      groom: {
        name: wedding.groom_name,
        image: wedding.groom_photo_url || undefined,
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
        members: brideFamilyMembers.map((member: any, index: number) => ({
          id: member.id || `bride-family-${index}`,
          name: member.name || '',
          relation: member.relation || member.relationship || '',
          image: member.image || member.photo || member.picture || undefined,
          description: member.description || undefined
        }))
      },
      groomSide: {
        title: "Groom's Family",
        members: groomFamilyMembers.map((member: any, index: number) => ({
          id: member.id || `groom-family-${index}`,
          name: member.name || '',
          relation: member.relation || member.relationship || '',
          image: member.image || member.photo || member.picture || undefined,
          description: member.description || undefined
        }))
      }
    },
    gallery: {
      title: 'Our Memories',
      images: galleryImages.map((img: any, index: number) => ({
        id: img.id || `gallery-${index}`,
        url: img.url || img.src || img.image || '',
        caption: img.caption || img.alt || undefined,
        category: img.category || 'All'
      })).filter((img: any) => img.url), // Filter out images without URLs
      categories: Array.from(new Set(galleryImages.map((img: any) => img.category).filter(Boolean)))
    },
    weddingParty: {
      bridesmaids: {
        title: 'Bridesmaids',
        members: bridesmaids.map((member: any, index: number) => ({
          id: member.id || `bridesmaid-${index}`,
          name: member.name || '',
          role: member.role || member.position || 'Bridesmaid',
          image: member.image || member.photo || member.picture || undefined,
          description: member.description || undefined
        }))
      },
      groomsmen: {
        title: 'Groomsmen',
        members: groomsmen.map((member: any, index: number) => ({
          id: member.id || `groomsman-${index}`,
          name: member.name || '',
          role: member.role || member.position || 'Groomsman',
          image: member.image || member.photo || member.picture || undefined,
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