import { redirect, notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ guest_id: string; wedding_id: string }>;
}

async function getWedding(weddingId: string) {
  const { data, error } = await supabase
    .from('weddings')
    .select('id')
    .eq('id', weddingId)
    .single();

  if (error || !data) {
    console.error('Error fetching wedding:', error);
    return null;
  }

  return data.id;
}

async function getGuestEvents(weddingId: string, guestId: string) {
  // Get all future events for this wedding that the guest is invited to
  const today = new Date().toISOString().split('T')[0];
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .eq('wedding_id', weddingId)
    .gte('event_date', today)
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (eventsError || !events) {
    console.error('Error fetching events:', eventsError);
    return [];
  }

  // Get invitations for this guest
  const eventIds = events.map(e => e.id);
  const { data: invitations, error: invitationsError } = await supabase
    .from('event_invitations')
    .select('event_id')
    .eq('guest_id', guestId)
    .in('event_id', eventIds);

  if (invitationsError) {
    console.error('Error fetching invitations:', invitationsError);
    return [];
  }

  // Return only events guest is invited to
  const invitedEventIds = invitations?.map(inv => inv.event_id) || [];
  return events.filter(event => invitedEventIds.includes(event.id));
}

async function handleTapAndGetRedirection(guestId: string, weddingId: string) {
  try {
    // First, increment the tap count and get override URL
    const { data, error } = await supabase
      .rpc('increment_tap_count', { 
        link_guest_id: guestId, 
        link_wedding_id: weddingId 
      });

    if (error) {
      console.error('Error incrementing tap count:', error);
      return null; // Default behavior
    }

    return data?.[0]?.redirect_override_url || null;
  } catch (error) {
    console.error('Error in handleTapAndGetRedirection:', error);
    return null;
  }
}

export default async function TapRedirectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { guest_id: guestId, wedding_id: weddingId } = resolvedParams;

  // Validate UUIDs
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(guestId) || !uuidRegex.test(weddingId)) {
    notFound();
  }

  // Verify wedding exists
  const weddingExists = await getWedding(weddingId);
  if (!weddingExists) {
    notFound();
  }

  // Handle tap counting and get override URL
  const overrideUrl = await handleTapAndGetRedirection(guestId, weddingId);

  // If there's an override URL, redirect to it immediately
  if (overrideUrl) {
    // Ensure the URL has a protocol if it's a full URL
    if (overrideUrl.startsWith('http://') || overrideUrl.startsWith('https://')) {
      redirect(overrideUrl);
    } else if (overrideUrl.includes('.')) {
      // Looks like a domain, add https://
      redirect(`https://${overrideUrl}`);
    } else {
      // Treat as a relative path
      redirect(overrideUrl);
    }
  }

  // No override URL, use default behavior
  // Get guest events to determine redirect
  const guestEvents = await getGuestEvents(weddingId, guestId);

  // Determine redirect URL
  let redirectUrl: string;

  if (guestEvents.length === 0) {
    // No events found, redirect to main wedding page
    redirectUrl = `/wedding/${weddingId}?guest=${guestId}`;
  } else {
    // Default behavior: redirect to event index 0 (first event)
    redirectUrl = `/wedding/${weddingId}/event?guest=${guestId}&index=0`;
  }

  // Perform the redirect
  redirect(redirectUrl);
}