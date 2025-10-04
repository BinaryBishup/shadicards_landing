import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Weddings, Guest, Event as SupabaseEvent, EventInvitation } from "@/lib/supabase";
import EventPageClient from "@/components/wedding/EventPageClient";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ guest?: string; index?: string }>;
}

async function getWedding(weddingId: string) {
  const { data, error } = await supabase
    .from('weddings')
    .select('*')
    .eq('id', weddingId)
    .single();

  if (error || !data) {
    console.error('Error fetching wedding:', error);
    return null;
  }

  return data as Weddings;
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
  const guestEvents: { event: SupabaseEvent; invitation: EventInvitation }[] = [];
  
  for (const event of events) {
    const invitation = invitations?.find(inv => inv.event_id === event.id);
    if (invitation) {
      guestEvents.push({
        event: event as SupabaseEvent,
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

  const wedding = await getWedding(resolvedParams.id);
  if (!wedding) {
    notFound();
  }

  const guest = await getGuest(guestId, wedding.id);
  if (!guest) {
    notFound();
  }

  // Get all events the guest is invited to
  const guestEvents = await getGuestEvents(wedding.id, guestId);
  
  if (!guestEvents || guestEvents.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Upcoming Events</h1>
          <p className="text-gray-600 mb-8">You don't have any upcoming events at this time.</p>
          <a 
            href={`/wedding/${resolvedParams.id}?guest=${guestId}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            View Wedding Website
          </a>
        </div>
      </div>
    );
  }

  // Create compatible website object for EventPageClient
  const websiteData = {
    id: wedding.id,
    wedding_id: wedding.id,
    url_slug: wedding.id,
    status: wedding.status,
    is_password_protected: wedding.is_password_protected,
    password: wedding.password,
    visibility: wedding.visibility,
    template_id: wedding.template_id,
    primary_color: wedding.primary_color,
    secondary_color: wedding.secondary_color,
    show_hero: wedding.show_hero,
    show_about: wedding.show_about,
    show_story: wedding.show_story,
    show_gallery: wedding.show_gallery,
    show_events: wedding.show_events,
    show_families: wedding.show_families,
    show_wedding_party: wedding.show_wedding_party,
    show_chat: wedding.show_chat,
    story_items: wedding.story_items,
    gallery_images: wedding.gallery_images,
    bride_families: wedding.bride_families,
    groom_families: wedding.groom_families,
    bride_friends: wedding.bride_friends,
    groom_friends: wedding.groom_friends,
    meta_title: wedding.meta_title,
    meta_description: wedding.meta_description,
    og_image: wedding.og_image,
    view_count: wedding.view_count,
    last_viewed_at: wedding.last_viewed_at,
    wedding: {
      id: wedding.id,
      bride_first_name: wedding.bride_first_name,
      bride_last_name: wedding.bride_last_name,
      groom_first_name: wedding.groom_first_name,
      groom_last_name: wedding.groom_last_name,
      wedding_date: wedding.wedding_date,
      venue_name: wedding.venue_name,
      venue_address: wedding.venue_address,
      phone_number: wedding.phone_number,
      email: wedding.email,
      is_active: wedding.is_active,
      couple_picture: wedding.couple_picture,
      bride_photo_url: wedding.bride_photo_url,
      groom_photo_url: wedding.groom_photo_url,
      about_bride: wedding.about_bride,
      about_groom: wedding.about_groom,
      rsvp_contact: wedding.rsvp_contact,
      user_id: wedding.user_id,
    }
  };

  return (
    <EventPageClient
      initialWebsite={websiteData}
      initialGuest={guest}
      initialEvents={guestEvents}
      weddingId={wedding.id}
    />
  );
}