import type { Weddings, Event } from './supabase';
import type { WeddingTemplateData, TemplateId } from '@/types/wedding-template';

/**
 * Maps unified wedding data to template format
 */
export function mapUnifiedDataToTemplateData(
  wedding: Weddings,
  events: Event[] = []
): WeddingTemplateData {
  return {
    hero: {
      brideName: wedding.bride_name,
      groomName: wedding.groom_name,
      coupleImage: wedding.couple_picture || undefined,
      weddingDate: wedding.wedding_date || '',
      venue: wedding.venue_name || undefined,
      tagline: undefined
    },
    about: {
      bride: {
        name: wedding.bride_name,
        image: wedding.bride_photo_url || undefined,
        description: wedding.about_bride || undefined
      },
      groom: {
        name: wedding.groom_name,
        image: wedding.groom_photo_url || undefined,
        description: wedding.about_groom || undefined
      }
    },
    story: wedding.story_items || [],
    family: {
      brideSide: {
        title: "Bride's Family",
        members: wedding.bride_families || []
      },
      groomSide: {
        title: "Groom's Family",
        members: wedding.groom_families || []
      }
    },
    gallery: {
      title: "Our Gallery",
      images: wedding.gallery_images || []
    },
    weddingParty: {
      bridesmaids: {
        title: "Bridesmaids",
        members: wedding.bridesmaids || []
      },
      groomsmen: {
        title: "Groomsmen",
        members: wedding.groomsmen || []
      }
    }
  };
}

/**
 * Gets template ID from database value
 */
export function getTemplateIdFromDatabase(templateId: string | null): TemplateId {
  // Handle various formats: '001', 'template001', '1', etc.
  if (!templateId) return 'template001';
  
  const numMatch = templateId.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0]);
    const padded = String(num).padStart(3, '0');
    return `template${padded}` as TemplateId;
  }
  
  // Direct mapping for known template IDs
  const templateMap: Record<string, TemplateId> = {
    'template001': 'template001',
    'template002': 'template002',
    'template003': 'template003',
    'template-1': 'template001',
    'template-2': 'template002',
    'template-3': 'template003',
    '1': 'template001',
    '2': 'template002',
    '3': 'template003',
    '001': 'template001',
    '002': 'template002',
    '003': 'template003'
  };
  
  return templateMap[templateId.toLowerCase()] || 'template001';
}