import { supabase, type Wedding, type WeddingWebsite, type Guest } from './supabase';

/**
 * Fetches wedding website configuration by URL slug
 */
export async function getWeddingWebsiteByUrl(url: string) {
  try {
    const { data, error } = await supabase
      .from('wedding_website')
      .select(`
        *,
        wedding:wedding_id (
          id,
          bride_name,
          groom_name,
          wedding_date,
          couple_picture,
          bride_photo_url,
          groom_photo_url,
          about_bride,
          about_groom,
          our_story,
          how_we_met,
          venue_name,
          venue_address,
          is_active
        )
      `)
      .eq('url_slug', url)
      .single();

    if (error) {
      console.error('Error fetching wedding website:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getWeddingWebsiteByUrl:', error);
    return null;
  }
}

/**
 * Validates if a guest ID belongs to a specific wedding
 */
export async function validateGuestAccess(weddingId: string, guestId: string) {
  try {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('wedding_id', weddingId)
      .eq('id', guestId)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error validating guest access:', error);
    return null;
  }
}

/**
 * Checks website access permissions
 */
export function checkWebsiteAccess(
  website: WeddingWebsite & { wedding: Wedding },
  guestId?: string,
  passwordVerified?: boolean
) {
  // Check if wedding is active
  if (!website.wedding?.is_active) {
    return {
      hasAccess: false,
      reason: 'inactive',
      message: 'This wedding website is currently inactive.'
    };
  }

  // Check website status
  if (website.status === 'inactive') {
    return {
      hasAccess: false,
      reason: 'inactive',
      message: 'This wedding website is currently inactive.'
    };
  }

  if (website.status === 'draft') {
    return {
      hasAccess: false,
      reason: 'draft',
      message: 'This wedding website is still being prepared.'
    };
  }

  // Check visibility settings
  if (website.visibility === 'private' && !guestId) {
    return {
      hasAccess: false,
      reason: 'restricted',
      message: 'This wedding website requires guest authentication.'
    };
  }

  if (website.visibility === 'hidden') {
    return {
      hasAccess: false,
      reason: 'hidden',
      message: 'This wedding website is hidden.'
    };
  }

  // Check password protection - if password exists in DB, require it
  if (website.password && !passwordVerified && !guestId) {
    return {
      hasAccess: false,
      reason: 'password',
      message: 'This wedding website is password protected.',
      requiresPassword: true
    };
  }

  // All checks passed
  return {
    hasAccess: true,
    reason: 'allowed',
    message: 'Access granted.'
  };
}

/**
 * Verifies password for protected websites
 */
export function verifyWebsitePassword(website: WeddingWebsite, inputPassword: string): boolean {
  // If password exists in DB, check it (regardless of is_password_protected flag)
  if (!website.password) {
    return true;
  }
  return website.password === inputPassword;
}

/**
 * Gets guest details with event invitations
 */
export async function getGuestWithInvitations(guestId: string) {
  try {
    const { data, error } = await supabase
      .from('guests')
      .select(`
        *,
        event_invitations (
          *,
          event:event_id (
            *
          )
        )
      `)
      .eq('id', guestId)
      .single();

    if (error) {
      console.error('Error fetching guest with invitations:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getGuestWithInvitations:', error);
    return null;
  }
}

/**
 * Updates guest profile information
 */
export async function updateGuestProfile(guestId: string, updates: Partial<Guest>) {
  try {
    const { data, error } = await supabase
      .from('guests')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', guestId)
      .select()
      .single();

    if (error) {
      console.error('Error updating guest profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in updateGuestProfile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

/**
 * Updates RSVP status for an event invitation
 */
export async function updateRSVP(
  eventInvitationId: string,
  rsvpStatus: 'yes' | 'no' | 'maybe',
  plusOnes?: number,
  message?: string
) {
  try {
    const { data, error } = await supabase
      .from('event_invitations')
      .update({
        rsvp_status: rsvpStatus,
        rsvp_date: new Date().toISOString(),
        plus_ones: plusOnes || 0,
        message: message || null,
        invitation_status: 'responded',
        updated_at: new Date().toISOString()
      })
      .eq('id', eventInvitationId)
      .select()
      .single();

    if (error) {
      console.error('Error updating RSVP:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in updateRSVP:', error);
    return { success: false, error: 'Failed to update RSVP' };
  }
}

/**
 * Increments view count for a wedding website
 */
export async function incrementViewCount(websiteId: string) {
  try {
    // First get current count
    const { data: currentData } = await supabase
      .from('wedding_website')
      .select('view_count')
      .eq('id', websiteId)
      .single();
    
    const currentCount = currentData?.view_count || 0;
    
    // Then update with incremented value
    await supabase
      .from('wedding_website')
      .update({
        view_count: currentCount + 1,
        last_viewed_at: new Date().toISOString()
      })
      .eq('id', websiteId);
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
}