import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Wedding, WeddingWebsite, Guest, Event, EventInvitation } from "@/lib/supabase";
import UpcomingEvent from "@/components/wedding/UpcomingEvent";

interface PageProps {
  params: Promise<{ url: string }>;
  searchParams: Promise<{ guest?: string }>;
}

async function getWeddingWebsite(urlSlug: string) {
  const { data, error } = await supabase
    .from('wedding_websites')
    .select(`
      *,
      wedding:weddings(*)
    `)
    .eq('url_slug', urlSlug)
    .eq('status', 'active')
    .single();

  if (error || !data) {
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
    return null;
  }

  return data as Guest;
}

async function getUpcomingEvent(weddingId: string, guestId: string) {
  // First get all events for this wedding
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .eq('wedding_id', weddingId)
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (eventsError || !events || events.length === 0) {
    return { event: null, invitation: null };
  }

  // Get invitations for this guest
  const eventIds = events.map(e => e.id);
  const { data: invitations, error: invitationsError } = await supabase
    .from('event_invitations')
    .select('*')
    .eq('guest_id', guestId)
    .in('event_id', eventIds);

  if (invitationsError) {
    return { event: null, invitation: null };
  }

  // Find the first event this guest is invited to
  for (const event of events) {
    const invitation = invitations?.find(inv => inv.event_id === event.id);
    if (invitation) {
      return { 
        event: event as Event, 
        invitation: invitation as EventInvitation 
      };
    }
  }

  return { event: null, invitation: null };
}

async function updateRSVP(
  invitationId: string, 
  status: 'yes' | 'no' | 'maybe', 
  plusOnes?: number, 
  message?: string
) {
  const { error } = await supabase
    .from('event_invitations')
    .update({
      rsvp_status: status,
      rsvp_date: new Date().toISOString(),
      plus_ones: plusOnes || 0,
      message: message || null,
      invitation_status: 'responded'
    })
    .eq('id', invitationId);

  if (error) {
    throw error;
  }
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

  return (
    <UpcomingEvent
      website={website}
      guest={guest}
      event={event}
      invitation={invitation}
      onUpdateRSVP={async (status, plusOnes, message) => {
        'use server';
        await updateRSVP(invitation.id, status, plusOnes, message);
      }}
    />
  );
}