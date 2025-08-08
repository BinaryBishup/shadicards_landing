import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Wedding, WeddingWebsite, Guest, Event, EventInvitation } from "@/lib/supabase";
import UpcomingEventMinimal from "@/components/wedding/UpcomingEventMinimal";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ url: string }>;
  searchParams: Promise<{ guest?: string }>;
}

async function getWeddingWebsite(urlSlug: string) {
  console.log('Fetching wedding website for URL:', urlSlug);
  
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
        venue_name,
        venue_address,
        rsvp_contact,
        is_active
      )
    `)
    .eq('url_slug', urlSlug)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Error fetching wedding website:', JSON.stringify(error, null, 2));
    return null;
  }

  if (!data) {
    console.log('No wedding website found for URL:', urlSlug);
    return null;
  }

  return data as WeddingWebsite & { wedding: Wedding };
}

async function getGuest(guestId: string, weddingId: string) {
  console.log('Fetching guest:', guestId, 'for wedding:', weddingId);
  
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', guestId)
    .eq('wedding_id', weddingId)
    .single();

  if (error) {
    console.error('Error fetching guest:', JSON.stringify(error, null, 2));
    return null;
  }

  if (!data) {
    console.log('No guest found');
    return null;
  }

  return data as Guest;
}

async function getUpcomingEvent(weddingId: string, guestId: string) {
  console.log('Fetching upcoming events for wedding:', weddingId, 'guest:', guestId);
  
  // First get all events for this wedding
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .eq('wedding_id', weddingId)
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (eventsError) {
    console.error('Error fetching events:', JSON.stringify(eventsError, null, 2));
    return { event: null, invitation: null };
  }

  if (!events || events.length === 0) {
    console.log('No events found for wedding');
    return { event: null, invitation: null };
  }

  console.log('Found events:', events.length);

  // Get invitations for this guest
  const eventIds = events.map(e => e.id);
  const { data: invitations, error: invitationsError } = await supabase
    .from('event_invitations')
    .select('*')
    .eq('guest_id', guestId)
    .in('event_id', eventIds);

  if (invitationsError) {
    console.error('Error fetching invitations:', JSON.stringify(invitationsError, null, 2));
    return { event: null, invitation: null };
  }

  console.log('Found invitations:', invitations?.length || 0);

  // Find the first event this guest is invited to
  for (const event of events) {
    const invitation = invitations?.find(inv => inv.event_id === event.id);
    if (invitation) {
      console.log('Found matching event and invitation');
      return { 
        event: event as Event, 
        invitation: invitation as EventInvitation 
      };
    }
  }

  console.log('No matching invitation found for any event');
  return { event: null, invitation: null };
}

export default async function UpcomingEventPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const guestId = resolvedSearchParams.guest;
  
  if (!guestId) {
    notFound();
  }

  const website = await getWeddingWebsite(resolvedParams.url);
  if (!website) {
    notFound();
  }

  const guest = await getGuest(guestId, website.wedding_id);
  if (!guest) {
    notFound();
  }

  const { event, invitation } = await getUpcomingEvent(website.wedding_id, guestId);
  if (!event || !invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Upcoming Events</h1>
          <p className="text-gray-600 mb-8">You don't have any upcoming events at this time.</p>
          <a 
            href={`/website/${resolvedParams.url}?guest=${guestId}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            View Wedding Website
          </a>
        </div>
      </div>
    );
  }

  // Get all events for navigation
  const { data: allEvents } = await supabase
    .from('events')
    .select('*')
    .eq('wedding_id', website.wedding_id)
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true });

  return (
    <UpcomingEventMinimal
      website={website}
      guest={guest}
      event={event}
      invitation={invitation}
      allEvents={allEvents || []}
    />
  );
}