import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, guestId, weddingId, websiteSlug, sessionId } = body;
    
    console.log('Simple Chatbot API called with:', { message, guestId, weddingId, websiteSlug });

    // Allow either weddingId directly or websiteSlug to look it up
    let actualWeddingId = weddingId;
    let actualGuestId = guestId;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // If websiteSlug is provided, fetch wedding ID from wedding_website table
    if (websiteSlug && !actualWeddingId) {
      const { data: websiteData, error: websiteError } = await supabase
        .from('wedding_website')
        .select('wedding_id')
        .eq('url_slug', websiteSlug)
        .single();
      
      if (websiteData?.wedding_id) {
        actualWeddingId = websiteData.wedding_id;
      } else {
        console.error('Website not found for slug:', websiteSlug, websiteError);
      }
    }

    // Fetch wedding data
    let weddingData = null;
    if (actualWeddingId) {
      const { data, error: weddingError } = await supabase
        .from('weddings')
        .select('*')
        .eq('id', actualWeddingId)
        .single();
      
      if (!weddingError) {
        weddingData = data;
      } else {
        console.error('Error fetching wedding:', weddingError);
      }
    }

    // Fetch guest data with invitations
    let guestData = null;
    if (actualGuestId) {
      const { data, error: guestError } = await supabase
        .from('guests')
        .select(`
          *,
          event_invitations (
            *,
            events (*)
          )
        `)
        .eq('id', actualGuestId)
        .single();

      if (!guestError) {
        guestData = data;
      } else {
        console.error('Error fetching guest:', guestError);
      }
    }

    // Fetch all events
    let eventsData = null;
    if (actualWeddingId) {
      const { data, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('wedding_id', actualWeddingId)
        .order('event_date', { ascending: true });

      if (!eventsError) {
        eventsData = data;
      } else {
        console.error('Error fetching events:', eventsError);
      }
    }

    // Generate context-aware response
    const response = generateContextAwareResponse(
      message,
      weddingData,
      guestData,
      eventsData
    );

    // Generate smart suggestions
    const suggestions = generateSmartSuggestions(
      message,
      guestData,
      weddingData,
      eventsData
    );

    return NextResponse.json({
      response,
      sessionId: sessionId || `session-${Date.now()}`,
      suggestions,
      weddingId: actualWeddingId,
      guestId: actualGuestId,
      debug: {
        weddingFound: !!weddingData,
        guestFound: !!guestData,
        eventsCount: eventsData?.length || 0,
        invitationsCount: guestData?.event_invitations?.length || 0,
        websiteSlug: websiteSlug
      }
    });

  } catch (error) {
    console.error('Simple Chatbot API error:', error);
    
    return NextResponse.json({
      response: "I'm here to help! Please ask me about the wedding events, venue, RSVP status, or anything else you'd like to know.",
      sessionId: 'error-session',
      suggestions: [
        'What events am I invited to?',
        'Show venue details',
        'What\'s my RSVP status?',
        'Tell me about the couple'
      ],
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function generateContextAwareResponse(
  message: string,
  wedding: any,
  guest: any,
  events: any[]
): string {
  const lowerMessage = message.toLowerCase();

  // Venue related queries
  if (lowerMessage.includes('venue') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
    if (guest?.event_invitations?.length > 0) {
      const invitations = guest.event_invitations;
      return `You're invited to ${invitations.length} event(s)! Here are the venues:\n\n${
        invitations.map((inv: any) => 
          `📍 ${inv.events.name}: ${inv.events.venue}${inv.events.address ? `, ${inv.events.address}` : ''}`
        ).join('\n')
      }\n\nWould you like directions to any specific venue?`;
    }
    return `The main wedding venue is ${wedding?.venue_name || 'being finalized'}. ${
      wedding?.venue_address ? `Address: ${wedding.venue_address}` : 'Full address will be shared soon.'
    }`;
  }

  // Events queries
  if (lowerMessage.includes('event') || lowerMessage.includes('invited') || lowerMessage.includes('ceremony')) {
    if (guest?.event_invitations?.length > 0) {
      return `Hi ${guest.name || 'there'}! You're invited to the following events:\n\n${
        guest.event_invitations.map((inv: any, index: number) => 
          `${index + 1}. ${inv.events.name}\n   📅 ${new Date(inv.events.event_date).toLocaleDateString()}\n   ⏰ ${inv.events.start_time} - ${inv.events.end_time}\n   📍 ${inv.events.venue}\n   RSVP: ${inv.rsvp_status || 'Pending'}`
        ).join('\n\n')
      }\n\nWould you like to update your RSVP for any event?`;
    }
    return `Let me check which events you're invited to. It looks like your invitation details are being updated. Please check back soon!`;
  }

  // RSVP queries
  if (lowerMessage.includes('rsvp') || lowerMessage.includes('confirm') || lowerMessage.includes('attend')) {
    const pendingRSVPs = guest?.event_invitations?.filter((inv: any) => !inv.rsvp_status || inv.rsvp_status === 'pending');
    if (pendingRSVPs?.length > 0) {
      return `You have ${pendingRSVPs.length} pending RSVP(s):\n\n${
        pendingRSVPs.map((inv: any) => `• ${inv.events.name} on ${new Date(inv.events.event_date).toLocaleDateString()}`).join('\n')
      }\n\nWould you like to confirm your attendance for these events?`;
    }
    if (guest?.event_invitations?.length > 0) {
      return `Your RSVP status:\n\n${
        guest.event_invitations.map((inv: any) => 
          `• ${inv.events.name}: ${inv.rsvp_status === 'yes' ? '✅ Attending' : inv.rsvp_status === 'no' ? '❌ Not Attending' : inv.rsvp_status === 'maybe' ? '🤔 Maybe' : '⏳ Pending'}`
        ).join('\n')
      }\n\nYou can update your RSVP anytime!`;
    }
    return 'To update your RSVP, please use the RSVP button above or let me know which event you\'d like to respond to.';
  }

  // Couple queries
  if (lowerMessage.includes('couple') || lowerMessage.includes('bride') || lowerMessage.includes('groom')) {
    return `${wedding?.bride_name || 'The bride'} and ${wedding?.groom_name || 'the groom'} are thrilled to celebrate their special day with you! ${
      wedding?.wedding_date ? `The wedding is on ${new Date(wedding.wedding_date).toLocaleDateString()}.` : ''
    } ${guest?.side ? `As someone from the ${guest.side}'s side, you hold a special place in this celebration!` : ''}`;
  }

  // Timing queries
  if (lowerMessage.includes('time') || lowerMessage.includes('when') || lowerMessage.includes('schedule')) {
    if (events?.length > 0) {
      return `Here's the wedding schedule:\n\n${
        events.map((event: any) => 
          `• ${event.name}: ${new Date(event.event_date).toLocaleDateString()} at ${event.start_time}`
        ).join('\n')
      }\n\nMake sure to arrive 15 minutes early!`;
    }
    return 'The detailed schedule will be shared soon. Stay tuned!';
  }

  // Dress code queries
  if (lowerMessage.includes('dress') || lowerMessage.includes('wear') || lowerMessage.includes('attire')) {
    return `For the wedding ceremonies:\n\n• Traditional Events: Ethnic wear (saree, lehenga, kurta, sherwani)\n• Reception: Formal or Indo-Western attire\n• Mehendi/Haldi: Comfortable, colorful clothes\n\nWhen in doubt, traditional attire is always appreciated! 🎊`;
  }

  // Default response
  return `Hello ${guest?.name || 'there'}! I'm here to help you with any questions about ${
    wedding?.bride_name || 'the bride'} and ${wedding?.groom_name || 'the groom'}'s wedding. 
    
Feel free to ask me about:
• Events you're invited to
• Venue details and directions  
• RSVP status
• Dress code
• Schedule and timings
• The couple's story

What would you like to know?`;
}

function generateSmartSuggestions(
  message: string,
  guest: any,
  wedding: any,
  events: any[]
): string[] {
  const lowerMessage = message.toLowerCase();
  const suggestions: string[] = [];

  // Context-based suggestions
  if (lowerMessage.includes('venue') || lowerMessage.includes('location')) {
    suggestions.push('Get directions to venue');
    suggestions.push('Parking information');
  }

  if (lowerMessage.includes('rsvp')) {
    suggestions.push('Update RSVP for all events');
    suggestions.push('Can I bring a plus one?');
  }

  if (lowerMessage.includes('event')) {
    suggestions.push('What\'s the dress code?');
    suggestions.push('Event timings');
  }

  // Add default suggestions if needed
  const defaults = [
    'What events am I invited to?',
    'Show venue details',
    'What\'s my RSVP status?',
    'Tell me about the couple',
    'Dress code for events',
    'Wedding schedule'
  ];

  // Fill up to 4 suggestions
  while (suggestions.length < 4 && defaults.length > 0) {
    const suggestion = defaults.shift();
    if (suggestion && !suggestions.includes(suggestion)) {
      suggestions.push(suggestion);
    }
  }

  return suggestions.slice(0, 4);
}