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

  console.log("DEBUG wedding-data-mapper - Raw gallery_images:", website.gallery_images);
  console.log("DEBUG wedding-data-mapper - Type of gallery_images:", typeof website.gallery_images);
  console.log("DEBUG wedding-data-mapper - Is array?:", Array.isArray(website.gallery_images));
  console.log("DEBUG wedding-data-mapper - Parsed galleryImages:", galleryImages);
  console.log("DEBUG wedding-data-mapper - galleryImages length:", galleryImages.length);
  if (galleryImages.length > 0) {
    console.log("DEBUG wedding-data-mapper - First gallery item structure:", galleryImages[0]);
    console.log("DEBUG wedding-data-mapper - First gallery item keys:", Object.keys(galleryImages[0]));
  }

  // Handle different possible structures for families
  const brideFamilies = website.bride_families as any || {};
  const brideFamilyMembers = Array.isArray(brideFamilies) ? brideFamilies :
                              (brideFamilies.members || brideFamilies.family || []);

  const groomFamilies = website.groom_families as any || {};
  const groomFamilyMembers = Array.isArray(groomFamilies) ? groomFamilies :
                              (groomFamilies.members || groomFamilies.family || []);

  // Handle different possible structures for wedding party (bride_friends and groom_friends)
  const brideFriendsData = website.bride_friends as any;
  const brideFriends = Array.isArray(brideFriendsData) ? brideFriendsData :
                       (brideFriendsData?.members || brideFriendsData?.friends || []);

  const groomFriendsData = website.groom_friends as any;
  const groomFriends = Array.isArray(groomFriendsData) ? groomFriendsData :
                       (groomFriendsData?.members || groomFriendsData?.friends || []);

  console.log("DEBUG wedding-data-mapper - brideFamilyMembers:", brideFamilyMembers);
  console.log("DEBUG wedding-data-mapper - groomFamilyMembers:", groomFamilyMembers);
  console.log("DEBUG wedding-data-mapper - brideFriends (wedding party):", brideFriends);
  console.log("DEBUG wedding-data-mapper - groomFriends (wedding party):", groomFriends);

  // Helper to create full name
  const getFullName = (firstName: string, lastName: string | null) =>
    `${firstName}${lastName ? ' ' + lastName : ''}`;

  const mappedData = {
    hero: {
      brideName: wedding.bride_first_name,  // Use first name directly
      groomName: wedding.groom_first_name,  // Use first name directly
      coupleImage: wedding.couple_picture || undefined,
      weddingDate: wedding.wedding_date || '',
      weddingTime: events?.[0]?.start_time || undefined,
      venue: wedding.venue_name || undefined,
      tagline: website.meta_description || undefined,
    },
    about: {
      bride: {
        name: getFullName(wedding.bride_first_name, wedding.bride_last_name),
        image: wedding.bride_photo_url || undefined,
        description: wedding.about_bride || undefined,
        profession: undefined, // Could be added to wedding table
        education: undefined, // Could be added to wedding table
        socials: {
          // Could be parsed from a JSON field or separate columns
        }
      },
      groom: {
        name: getFullName(wedding.groom_first_name, wedding.groom_last_name),
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
      images: galleryImages.map((img: any, index: number) => {
        // Handle both string URLs and object formats
        if (typeof img === 'string') {
          return {
            id: `gallery-${index}`,
            url: img,
            caption: undefined,
            category: 'All'
          };
        } else {
          return {
            id: img.id || `gallery-${index}`,
            url: img.url || img.src || img.image || '',
            caption: img.caption || img.alt || undefined,
            category: img.category || 'All'
          };
        }
      }).filter((img: any) => img.url), // Filter out images without URLs
      categories: Array.from(new Set(galleryImages.map((img: any) =>
        typeof img === 'string' ? 'All' : (img.category || 'All')
      ).filter(Boolean)))
    },
    weddingParty: {
      bridesmaids: {
        title: "Bride's Friends",
        members: brideFriends.map((member: any, index: number) => ({
          id: member.id || `bride-friend-${index}`,
          name: member.name || '',
          role: member.role || member.relation || member.position || 'Friend',
          image: member.image || member.photo || member.picture || undefined,
          description: member.description || undefined
        }))
      },
      groomsmen: {
        title: "Groom's Friends",
        members: groomFriends.map((member: any, index: number) => ({
          id: member.id || `groom-friend-${index}`,
          name: member.name || '',
          role: member.role || member.relation || member.position || 'Friend',
          image: member.image || member.photo || member.picture || undefined,
          description: member.description || undefined
        }))
      }
    }
  };

  console.log("DEBUG wedding-data-mapper - Final mapped gallery:", mappedData.gallery);
  console.log("DEBUG wedding-data-mapper - Final mapped gallery images count:", mappedData.gallery.images.length);
  if (mappedData.gallery.images.length > 0) {
    console.log("DEBUG wedding-data-mapper - First mapped gallery image:", mappedData.gallery.images[0]);
    console.log("DEBUG wedding-data-mapper - First mapped image URL:", mappedData.gallery.images[0].url);
  }
  console.log("DEBUG wedding-data-mapper - Final mapped weddingParty:", mappedData.weddingParty);

  return mappedData;
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