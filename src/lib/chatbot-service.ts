import { createClient } from '@/utils/supabase/client';

export interface ChatContext {
  guestId: string;
  weddingId: string;
  sessionId?: string;
}

export interface EventSelection {
  eventId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  rsvpStatus?: string;
}

export class ChatbotService {
  private supabase = createClient();

  async getGuestContext(guestId: string, weddingId: string) {
    const { data: guest } = await this.supabase
      .from('guests')
      .select(`
        *,
        event_invitations (
          *,
          events (*)
        )
      `)
      .eq('id', guestId)
      .single();

    return guest;
  }

  async getWeddingContext(weddingId: string) {
    const { data: wedding } = await this.supabase
      .from('weddings')
      .select(`
        *,
        wedding_websites (*),
        events (*)
      `)
      .eq('id', weddingId)
      .single();

    return wedding;
  }

  async getUpcomingEvents(guestId: string, weddingId: string): Promise<EventSelection[]> {
    const { data } = await this.supabase
      .from('event_invitations')
      .select(`
        *,
        events (*)
      `)
      .eq('guest_id', guestId)
      .gte('events.event_date', new Date().toISOString())
      .order('events.event_date', { ascending: true });

    if (!data) return [];

    return data.map((inv: any) => ({
      eventId: inv.event_id,
      eventName: inv.events.name,
      eventDate: inv.events.event_date,
      venue: inv.events.venue,
      rsvpStatus: inv.rsvp_status,
    }));
  }

  async updateRSVP(guestId: string, eventId: string, status: 'yes' | 'no' | 'maybe', plusOnes?: number) {
    const { data, error } = await this.supabase
      .from('event_invitations')
      .update({
        rsvp_status: status,
        rsvp_date: new Date().toISOString(),
        plus_ones: plusOnes,
      })
      .eq('guest_id', guestId)
      .eq('event_id', eventId)
      .select()
      .single();

    return { data, error };
  }

  async getFamilyInfo(weddingId: string, side: 'bride' | 'groom') {
    const { data } = await this.supabase
      .from('wedding_websites')
      .select(side === 'bride' ? 'bride_families' : 'groom_families')
      .eq('wedding_id', weddingId)
      .single();

    return data;
  }

  async getCoupleInfo(weddingId: string) {
    const { data } = await this.supabase
      .from('weddings')
      .select(`
        bride_name,
        groom_name,
        about_bride,
        about_groom,
        bride_photo_url,
        groom_photo_url,
        wedding_websites (
          story_items
        )
      `)
      .eq('id', weddingId)
      .single();

    return data;
  }

  async getVenueDetails(eventId: string) {
    const { data } = await this.supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    return data;
  }

  parseIntentFromMessage(message: string) {
    const lowerMessage = message.toLowerCase();
    
    const intents = {
      venue: ['venue', 'location', 'where', 'address', 'direction', 'map', 'reach'],
      rsvp: ['rsvp', 'confirm', 'attendance', 'coming', 'attend', 'yes', 'no', 'maybe'],
      events: ['event', 'ceremony', 'function', 'invitation', 'invited', 'schedule'],
      couple: ['couple', 'bride', 'groom', 'story', 'love', 'about them'],
      family: ['family', 'parent', 'father', 'mother', 'brother', 'sister', 'relative'],
      timing: ['time', 'when', 'timing', 'schedule', 'start', 'end'],
      dress: ['dress', 'wear', 'outfit', 'attire', 'dress code', 'clothing'],
      food: ['food', 'menu', 'dietary', 'meal', 'cuisine', 'veg', 'non-veg'],
      accommodation: ['hotel', 'stay', 'accommodation', 'room', 'lodging'],
      gift: ['gift', 'present', 'registry', 'give'],
      photos: ['photo', 'gallery', 'picture', 'image'],
      contact: ['contact', 'phone', 'call', 'reach out', 'email'],
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent;
      }
    }

    return 'general';
  }

  generateSmartResponse(intent: string, context: any) {
    const responses: Record<string, (ctx: any) => string> = {
      venue: (ctx) => {
        if (ctx.upcomingEvents?.length > 0) {
          return `I see you're invited to ${ctx.upcomingEvents.length} event(s). Which event's venue would you like to know about?\n\n${
            ctx.upcomingEvents.map((e: EventSelection, i: number) => 
              `${i + 1}. ${e.eventName} - ${new Date(e.eventDate).toLocaleDateString()}`
            ).join('\n')
          }\n\nPlease select an event number or I can share all venue details.`;
        }
        return `The main venue is ${ctx.wedding?.venue_name} at ${ctx.wedding?.venue_address}. Would you like directions?`;
      },
      rsvp: (ctx) => {
        const pendingRSVPs = ctx.upcomingEvents?.filter((e: EventSelection) => !e.rsvpStatus);
        if (pendingRSVPs?.length > 0) {
          return `You have ${pendingRSVPs.length} pending RSVP(s). Would you like to confirm your attendance for these events?`;
        }
        return 'All your RSVPs are up to date! You can always update them if your plans change.';
      },
      events: (ctx) => {
        if (ctx.guest?.event_invitations?.length > 0) {
          return `You're invited to the following events:\n\n${
            ctx.guest.event_invitations.map((inv: any) => 
              `• ${inv.events.name}\n  📅 ${new Date(inv.events.event_date).toLocaleDateString()}\n  ⏰ ${inv.events.start_time} - ${inv.events.end_time}\n  📍 ${inv.events.venue}\n  RSVP: ${inv.rsvp_status || 'Pending'}`
            ).join('\n\n')
          }`;
        }
        return 'Let me check which events you\'re invited to...';
      },
      couple: (ctx) => {
        return `${ctx.wedding?.bride_name} and ${ctx.wedding?.groom_name} are so excited to celebrate with you!\n\n${
          ctx.wedding?.about_bride ? `About ${ctx.wedding.bride_name}: ${ctx.wedding.about_bride}\n\n` : ''
        }${
          ctx.wedding?.about_groom ? `About ${ctx.wedding.groom_name}: ${ctx.wedding.about_groom}` : ''
        }`;
      },
      default: () => 'I\'m here to help! Feel free to ask about venues, events, RSVP status, or anything else about the wedding.',
    };

    const responseGenerator = responses[intent] || responses.default;
    return responseGenerator(context);
  }
}