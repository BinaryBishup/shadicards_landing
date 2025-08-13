import { supabase, type Weddings, type Guest } from './supabase';

/**
 * Fetches wedding data by URL slug from the unified weddings table
 */
export async function getWeddingByUrl(url: string): Promise<Weddings | null> {
  try {
    const { data, error } = await supabase
      .from('weddings')
      .select('*')
      .eq('url_slug', url)
      .single();

    if (error) {
      console.error('Error fetching wedding:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getWeddingByUrl:', error);
    return null;
  }
}

/**
 * Validates if a guest ID belongs to a specific wedding
 */
export async function validateGuestAccess(weddingId: string, guestId: string): Promise<Guest | null> {
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
 * Checks website access permissions using unified wedding data
 */
export function checkWebsiteAccess(
  wedding: Weddings,
  guestId?: string,
  passwordVerified?: boolean
) {
  // Check if wedding is active
  if (!wedding.is_active) {
    return {
      hasAccess: false,
      reason: 'inactive',
      message: 'This wedding website is currently inactive.'
    };
  }

  // Check website status
  if (wedding.status === 'inactive') {
    return {
      hasAccess: false,
      reason: 'inactive',
      message: 'This wedding website is currently inactive.'
    };
  }

  if (wedding.status === 'draft') {
    return {
      hasAccess: false,
      reason: 'draft',
      message: 'This wedding website is still being prepared.'
    };
  }

  // Check visibility settings
  if (wedding.visibility === 'private' && !guestId) {
    return {
      hasAccess: false,
      reason: 'restricted',
      message: 'This wedding website requires guest authentication.'
    };
  }

  if (wedding.visibility === 'hidden') {
    return {
      hasAccess: false,
      reason: 'hidden',
      message: 'This wedding website is hidden.'
    };
  }

  // Check password protection
  if (wedding.password && !passwordVerified && !guestId) {
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
export function verifyWebsitePassword(wedding: Weddings, inputPassword: string): boolean {
  if (!wedding.password) {
    return true;
  }
  return wedding.password === inputPassword;
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
          event:event_id (*)
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
 * Gets all events for a wedding
 */
export async function getWeddingEvents(weddingId: string) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('wedding_id', weddingId)
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching wedding events:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getWeddingEvents:', error);
    return [];
  }
}

/**
 * Updates wedding view count and last viewed timestamp
 */
export async function updateWeddingViewCount(weddingId: string) {
  try {
    // First get the current view count
    const { data: currentData, error: fetchError } = await supabase
      .from('weddings')
      .select('view_count')
      .eq('id', weddingId)
      .single();

    if (fetchError) {
      console.error('Error fetching current view count:', fetchError);
      return;
    }

    const currentCount = currentData?.view_count || 0;

    // Update with incremented count
    const { error } = await supabase
      .from('weddings')
      .update({ 
        view_count: currentCount + 1,
        last_viewed_at: new Date().toISOString()
      })
      .eq('id', weddingId);

    if (error) {
      console.error('Error updating view count:', error);
    }
  } catch (error) {
    console.error('Error in updateWeddingViewCount:', error);
  }
}