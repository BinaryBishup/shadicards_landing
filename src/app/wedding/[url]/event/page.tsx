import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Wedding, WeddingWebsite, Guest, Event, EventInvitation } from "@/lib/supabase";
import EventPageClient from "@/components/wedding/EventPageClient";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ url: string }>;
  searchParams: Promise<{ guest?: string; index?: string }>;
}

async function getWeddingWebsite(urlSlug: string) {
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

  if (error || !data) {
    console.error('Error fetching wedding website:', error);
    return null;
  }

  return data as WeddingWebsite & { wedding: Wedding };
}

async function getGuest(guestId: string, weddingId: string) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', guestId)
    .eq('wedding_id', weddingId)
    .single();

  if (error || !data) {
    console.error('Error fetching guest:', error);
    return null;
  }

  return data as Guest;
}

async function getGuestEvents(weddingId: string, guestId: string) {
  // Get all future events for this wedding
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
    .select('*')
    .eq('guest_id', guestId)
    .in('event_id', eventIds);

  if (invitationsError) {
    console.error('Error fetching invitations:', invitationsError);
    return [];
  }

  // Combine events with invitations - only return events guest is invited to
  const guestEvents: { event: Event; invitation: EventInvitation }[] = [];
  
  for (const event of events) {
    const invitation = invitations?.find(inv => inv.event_id === event.id);
    if (invitation) {
      guestEvents.push({
        event: event as Event,
        invitation: invitation as EventInvitation
      });
    }
  }

  return guestEvents;
}

export default async function EventPage({ params, searchParams }: PageProps) {
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

  // Get all events the guest is invited to
  const guestEvents = await getGuestEvents(website.wedding_id, guestId);
  
  if (!guestEvents || guestEvents.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Upcoming Events</h1>
          <p className="text-gray-600 mb-8">You don't have any upcoming events at this time.</p>
          <a 
            href={`/wedding/${resolvedParams.url}?guest=${guestId}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            View Wedding Website
          </a>
        </div>
      </div>
    );
  }

  return (
    <EventPageClient
      initialWebsite={website}
      initialGuest={guest}
      initialEvents={guestEvents}
      urlSlug={resolvedParams.url}
    />
  );
}