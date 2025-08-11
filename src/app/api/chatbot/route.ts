import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, guestId, weddingId, websiteSlug, sessionId, language = 'en' } = body;
    
    console.log('Chatbot API called with:', { message, guestId, weddingId, websiteSlug, sessionId });

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Allow either weddingId directly or websiteSlug to look it up
    let actualWeddingId = weddingId;
    let actualGuestId = guestId;

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
    
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, using fallback response');
      return NextResponse.json({
        response: getFallbackResponse(message),
        sessionId: sessionId || 'fallback-session',
        suggestions: generateSmartSuggestions(message, null, null, null),
      });
    }

    // Get or create chat session
    let currentSessionId = sessionId;
    if (!currentSessionId && actualGuestId && actualWeddingId) {
      const { data: sessionData, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({
          guest_id: actualGuestId,
          wedding_id: actualWeddingId,
          context: {}
        })
        .select()
        .single();

      if (sessionError) {
        console.error('Session creation error:', sessionError);
      } else {
        currentSessionId = sessionData.id;
      }
    } else if (currentSessionId) {
      // Update last activity
      await supabase
        .from('chat_sessions')
        .update({ last_activity_at: new Date().toISOString() })
        .eq('id', currentSessionId);
    }

    // Fetch comprehensive wedding context with all related data
    let weddingData = null;
    if (actualWeddingId) {
      const { data, error } = await supabase
        .from('weddings')
        .select(`
          *,
          wedding_website (
            *,
            story_items,
            gallery_images,
            bride_families,
            groom_families,
            bridesmaids,
            groomsmen
          )
        `)
        .eq('id', actualWeddingId)
        .single();
      
      if (!error) {
        weddingData = data;
      } else {
        console.error('Error fetching wedding:', error);
      }
    }

    // Fetch guest information with all invitations and event details
    let guestData = null;
    if (actualGuestId) {
      const { data, error } = await supabase
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
      
      if (!error) {
        guestData = data;
      } else {
        console.error('Error fetching guest:', error);
      }
    }

    // Fetch all events for comprehensive context
    let eventsData = null;
    if (actualWeddingId) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('wedding_id', actualWeddingId)
        .order('event_date', { ascending: true });
      
      if (!error) {
        eventsData = data;
      } else {
        console.error('Error fetching events:', error);
      }
    }

    // Save user message to history
    if (currentSessionId && actualGuestId && actualWeddingId) {
      await supabase
        .from('chat_messages')
        .insert({
          session_id: currentSessionId,
          guest_id: actualGuestId,
          wedding_id: actualWeddingId,
          message_type: 'user',
          content: message,
        });
    }

    // Fetch recent conversation history for context
    let conversationHistory = null;
    if (currentSessionId) {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', currentSessionId)
        .order('created_at', { ascending: false })
        .limit(10);
      conversationHistory = data;
    }

    // Build comprehensive context for GPT-5-nano with all wedding details
    const eventDetails = guestData?.event_invitations?.map((inv: any) => ({
      name: inv.events.name,
      date: inv.events.event_date,
      time: `${inv.events.start_time} - ${inv.events.end_time}`,
      venue: inv.events.venue,
      address: inv.events.address || 'Address not specified',
      rsvp: inv.rsvp_status || 'pending',
      description: inv.events.description || '',
      type: inv.events.event_type || 'Celebration'
    })) || [];

    const systemPrompt = `You are an elegant wedding assistant AI for ${weddingData?.bride_name || 'the bride'} and ${weddingData?.groom_name || 'the groom'}'s wedding, powered by ShadiCards - the modern digital wedding invitation platform.

LANGUAGE: ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : language === 'bn' ? 'Bengali' : language === 'te' ? 'Telugu' : language === 'mr' ? 'Marathi' : language === 'ta' ? 'Tamil' : language === 'gu' ? 'Gujarati' : language === 'kn' ? 'Kannada' : language === 'ml' ? 'Malayalam' : language === 'pa' ? 'Punjabi' : language === 'or' ? 'Odia' : language === 'as' ? 'Assamese' : language === 'ur' ? 'Urdu' : 'English'}
Please respond in the selected language. If the language is not English, provide culturally appropriate responses while maintaining all formatting rules.

**ABOUT SHADICARDS:**
ShadiCards revolutionizes wedding invitations with digital SmartCards that provide two convenient access methods:

**1. QR Code Technology:**
- Display your unique QR code on your phone
- Event staff scan it for instant check-in
- Works on any smartphone with internet
- No app installation required

**2. NFC (Near Field Communication):**
- Simply tap your NFC-enabled phone on readers
- Contactless check-in in under a second
- Works even with phone screen off
- Available on most modern smartphones

**SMARTCARD FEATURES:**
- **Real-time RSVP**: Update attendance status anytime, anywhere
- **Interactive Features**: View galleries, send wishes, access event details
- **Eco-friendly**: No paper waste, instant updates for any changes
- **Guest Management**: Hosts can track RSVPs and manage guests efficiently
- **Digital Memories**: Access wedding photos and videos post-event

**HOW SMARTCARDS HELP GUESTS:**
- One-tap access to all wedding information
- Navigate to venues with integrated maps
- Never miss an event with schedule reminders
- Update dietary preferences and plus-one details
- Connect with other guests through the platform
- Send digital gifts and wishes to the couple
- Choose between QR or NFC for check-in convenience

**DEVICE GUIDANCE:**
When users ask about using SmartCard, first ask about their device:
1. Ask "What phone model do you have?" or "Are you using iPhone or Android?"
2. For iPhone: NFC available on iPhone 7 and newer
3. For Android: Most phones from 2015+ have NFC
4. If unsure about NFC: Suggest checking Settings > Connected devices > Connection preferences > NFC
5. If no NFC: Guide them to use QR code option which works on all smartphones

GUEST INFORMATION:
- Name: ${guestData?.name || 'Guest'}
- Side: ${guestData?.side || 'invited'} side
- Relationship: ${guestData?.relationship || 'guest'}
- Profile Image: ${guestData?.profile_image ? '[Available]' : '[Not available]'}

WEDDING DETAILS:
- Couple: ${weddingData?.bride_name} (Bride) & ${weddingData?.groom_name} (Groom)
- Wedding Date: ${weddingData?.wedding_date ? new Date(weddingData.wedding_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'To be announced'}
- Main Venue: ${weddingData?.venue_name || 'To be announced'}
- Venue Address: ${weddingData?.venue_address || 'To be announced'}

ABOUT THE COUPLE:
- About Bride: ${weddingData?.about_bride || 'A beautiful soul ready to start this new journey'}
- About Groom: ${weddingData?.about_groom || 'A wonderful person excited for this special day'}
- Bride Photo: ${weddingData?.bride_photo_url ? '[Photo Available]' : '[No photo]'}
- Groom Photo: ${weddingData?.groom_photo_url ? '[Photo Available]' : '[No photo]'}
- Couple Photo: ${weddingData?.couple_picture ? '[Photo Available]' : '[No photo]'}
- Love Story: ${weddingData?.wedding_website?.story_items ? 'Available' : 'Not available'}

EVENTS GUEST IS INVITED TO:
${eventDetails.map((e: any, i: number) => `
${i + 1}. **${e.name}**
   - Date: ${new Date(e.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
   - Time: ${e.time}
   - Venue: ${e.venue}
   - Address: ${e.address}
   - RSVP Status: ${e.rsvp}
   - Type: ${e.type}
   ${e.description ? '- About: ' + e.description : ''}
`).join('\n')}

WEBSITE FEATURES:
- Gallery: ${weddingData?.wedding_website?.gallery_images ? 'Available with photos' : 'Not available'}
- Families: ${weddingData?.wedding_website?.bride_families || weddingData?.wedding_website?.groom_families ? 'Family details available' : 'Not available'}
- Wedding Party: ${weddingData?.wedding_website?.bridesmaids || weddingData?.wedding_website?.groomsmen ? 'Available' : 'Not available'}

IMPORTANT RESPONSE FORMATTING RULES:
1. **Always use rich Markdown formatting** for visual appeal
2. For events, provide brief info and mention the button to view details:
   ### Event Name
   **Date:** Full date with day
   **Time:** Start - End time
   **Venue:** Venue name
   **RSVP Status:** Current status
   *Click the button below to view complete details and update your RSVP*
   
3. For couple information:
   ## About [Name]
   - Include personality traits and details
   - Mention if photos are available: "*[Beautiful photo available in gallery]*"
   - Share their story if relevant
   
4. For venue queries:
   ### Venue Name
   **Address:** Full address
   *Interactive map will appear below for directions*
   
5. Keep responses clean and professional without emojis
   - Use **bold** for emphasis
   - Use *italics* for additional notes
   - Use bullet points for lists
   - Mention interactive elements like maps and buttons
   
6. For RSVP status, use text indicators:
   - **Confirmed** (for 'yes')
   - **Declined** (for 'no')
   - **Maybe** (for 'maybe')
   - **Pending** (for no response yet)
   
7. When listing multiple items, use clean formatted lists
8. Include actionable suggestions like "View Gallery", "Update RSVP", etc.
9. Be warm, elegant, and helpful - this is a celebration!
10. If specific details are requested (like about bride/groom), provide comprehensive information
11. For RSVP or event-specific queries, always mention the action button that will appear
12. When asked about SmartCard features, explain how the digital invitation helps them
13. For couple/gallery queries, mention they can visit the wedding website for full details
14. When users ask about using SmartCard, first ask about their device model to guide NFC vs QR
15. You have access to web search for current information about locations, traditions, or general wedding topics

Respond in a visually appealing, structured format that looks beautiful in a chat interface.`;

    // Prepare messages for GPT
    const messages: any[] = [
      { role: 'system', content: systemPrompt }
    ];

    // Add conversation history for context (in chronological order)
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.reverse().forEach((msg: any) => {
        if (msg.message_type === 'user') {
          messages.push({ role: 'user', content: msg.content });
        } else if (msg.message_type === 'assistant') {
          messages.push({ role: 'assistant', content: msg.content });
        }
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Call OpenAI GPT
    console.log('Calling GPT with messages:', messages.length, 'messages');
    console.log('System prompt length:', systemPrompt.length);
    const completion = await openai.chat.completions.create({
      model: 'gpt-5-mini-2025-08-07', // Using GPT-5-mini model for better performance
      messages,
      // GPT-5-mini only supports default temperature (1)
      max_completion_tokens: 2000, // Increased token limit for comprehensive responses
    });

    console.log('GPT response:', completion.choices[0]);
    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

    // Save assistant response to history
    if (currentSessionId && actualGuestId && actualWeddingId) {
      await supabase
        .from('chat_messages')
        .insert({
          session_id: currentSessionId,
          guest_id: actualGuestId,
          wedding_id: actualWeddingId,
          message_type: 'assistant',
          content: aiResponse,
          metadata: {
            model: 'gpt-5-mini-2025-08-07',
            tokens: completion.usage,
          }
        });
    }

    // Analyze message for special content
    const lowerMessage = message.toLowerCase();
    const isVenueQuery = lowerMessage.includes('venue') || lowerMessage.includes('location') || 
                        lowerMessage.includes('where') || lowerMessage.includes('address') || 
                        lowerMessage.includes('direction');
    const isEventQuery = lowerMessage.includes('event') || lowerMessage.includes('ceremony') || 
                        lowerMessage.includes('mehendi') || lowerMessage.includes('sangeet') || 
                        lowerMessage.includes('reception') || lowerMessage.includes('upcoming');
    const isRSVPQuery = lowerMessage.includes('rsvp') || lowerMessage.includes('confirm') || 
                       lowerMessage.includes('attend') || lowerMessage.includes('response') ||
                       lowerMessage.includes('yes') || lowerMessage.includes('no') || 
                       lowerMessage.includes('maybe');
    const isCoupleQuery = lowerMessage.includes('couple') || lowerMessage.includes('bride') || 
                         lowerMessage.includes('groom') || lowerMessage.includes('story') || 
                         lowerMessage.includes('gallery') || lowerMessage.includes('photo') ||
                         lowerMessage.includes('website') || lowerMessage.includes('about them');
    
    // Build response metadata for special features
    let responseMetadata: any = {};
    
    // Add map for venue queries
    if (isVenueQuery && weddingData?.venue_address) {
      responseMetadata.showMap = true;
      responseMetadata.venueAddress = weddingData.venue_address;
    } else if (isVenueQuery && eventsData && eventsData.length > 0) {
      // Use first event venue if main venue not available
      const firstEvent = eventsData[0];
      if (firstEvent.address) {
        responseMetadata.showMap = true;
        responseMetadata.venueAddress = firstEvent.address;
      }
    }
    
    // Add event button for event or RSVP queries
    if ((isEventQuery || isRSVPQuery) && guestData?.event_invitations && guestData.event_invitations.length > 0) {
      responseMetadata.showEventButton = true;
      responseMetadata.eventIndex = 0; // Default to first event
      
      // Try to find specific event if mentioned
      const eventInvitations = guestData.event_invitations;
      for (let i = 0; i < eventInvitations.length; i++) {
        const eventName = eventInvitations[i].events.name?.toLowerCase() || '';
        if (lowerMessage.includes(eventName) || 
            (eventName.includes('mehendi') && lowerMessage.includes('mehendi')) ||
            (eventName.includes('sangeet') && lowerMessage.includes('sangeet')) ||
            (eventName.includes('reception') && lowerMessage.includes('reception')) ||
            (eventName.includes('wedding') && lowerMessage.includes('wedding'))) {
          responseMetadata.eventIndex = i;
          break;
        }
      }
    }
    
    // Add wedding website button for couple/gallery queries
    if (isCoupleQuery && websiteSlug) {
      responseMetadata.showWebsiteButton = true;
    }
    
    // Format the response with rich metadata for enhanced display
    const responseData = {
      response: aiResponse,
      sessionId: currentSessionId,
      suggestions: generateSmartSuggestions(message, guestData, weddingData, eventsData),
      responseMetadata,
      metadata: {
        hasImages: !!(weddingData?.bride_photo_url || weddingData?.groom_photo_url || weddingData?.couple_picture),
        bridePhoto: weddingData?.bride_photo_url,
        groomPhoto: weddingData?.groom_photo_url,
        couplePhoto: weddingData?.couple_picture,
        brideName: weddingData?.bride_name,
        groomName: weddingData?.groom_name,
        eventCount: guestData?.event_invitations?.length || 0,
        weddingDate: weddingData?.wedding_date,
        gallery: weddingData?.wedding_website?.gallery_images || null,
      }
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Chatbot API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Return a user-friendly error response
    return NextResponse.json({
      response: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
      sessionId: 'error-session',
      suggestions: [
        'Tell me about the couple',
        'What events am I invited to?',
        'Show venue details',
        'How do I RSVP?'
      ],
      error: errorMessage
    });
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  const responses: Record<string, string> = {
    venue: "The wedding venue details are available in the events section. You can find the complete address and get directions from there!",
    event: "You can view all the events you're invited to in the Events section above. Each event shows the date, time, and venue details.",
    rsvp: "To update your RSVP, please use the 'Update RSVP' button in the Quick Actions section or let me know which event you'd like to respond to.",
    couple: "The bride and groom are excited to celebrate this special day with you! You can learn more about their story in the About section.",
    dress: "For traditional ceremonies, ethnic wear is preferred. For the reception, formal or indo-western attire works great!",
    time: "Event timings are listed in the Events section. Make sure to check the specific time for each ceremony you're invited to.",
    food: "A variety of delicious cuisines will be served! If you have dietary preferences, please update them in your profile.",
    smartcard: "Your SmartCard is your digital wedding invitation with two check-in options: QR code (display on your phone for scanning) or NFC (tap your phone on readers). It includes real-time RSVP, event navigation, gallery access, and instant updates. Choose whichever method is most convenient for you!",
    qr: "The QR code on your SmartCard provides instant check-in at events. Simply display it on your phone and event staff will scan it for quick entry. No app needed!",
    nfc: "NFC (Near Field Communication) allows contactless check-in by tapping your NFC-enabled phone on readers at the venue. It works even with your screen off for ultra-fast entry!",
    default: "Thank you for your question! Please check the wedding details above or feel free to ask about venues, events, RSVP, SmartCard features, or any other wedding-related queries."
  };
  
  for (const [key, response] of Object.entries(responses)) {
    if (key === 'default') continue;
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  return responses.default;
}

function generateSmartSuggestions(message: string, guestData: any, weddingData: any, eventsData: any) {
  const suggestions = [];
  const lowerMessage = message.toLowerCase();
  
  // Context-aware suggestions
  if (lowerMessage.includes('venue') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
    suggestions.push('Get directions to all venues');
    suggestions.push('Show event schedule with venues');
    suggestions.push('Nearest accommodation options');
  }
  
  if (lowerMessage.includes('rsvp') || lowerMessage.includes('confirm') || lowerMessage.includes('attend')) {
    suggestions.push('Update RSVP for all events');
    suggestions.push('Can I bring a plus one?');
    suggestions.push('Who else is attending?');
  }
  
  if (lowerMessage.includes('event') || lowerMessage.includes('ceremony') || lowerMessage.includes('function')) {
    suggestions.push('What\'s the dress code?');
    suggestions.push('Show detailed timings');
    suggestions.push('Add to my calendar');
  }
  
  if (lowerMessage.includes('bride') || lowerMessage.includes('groom') || lowerMessage.includes('couple')) {
    suggestions.push('Show couple\'s love story');
    suggestions.push('Tell me about the bride');
    suggestions.push('Tell me about the groom');
    suggestions.push('Show wedding gallery');
  }

  if (lowerMessage.includes('dress') || lowerMessage.includes('wear') || lowerMessage.includes('attire')) {
    suggestions.push('Dress code for each event');
    suggestions.push('Wedding color theme');
    suggestions.push('Traditional vs Modern attire');
  }
  
  if (lowerMessage.includes('smartcard') || lowerMessage.includes('qr') || lowerMessage.includes('digital')) {
    suggestions.push('How to use my SmartCard?');
    suggestions.push('QR code check-in process');
    suggestions.push('SmartCard features');
  }
  
  // Smart defaults based on what hasn't been asked
  const smartDefaults = [
    'Tell me about the couple',
    'What events am I invited to?',
    'How do I RSVP?',
    'Show all venue details',
    'Dress code for all events',
    'Gift suggestions',
    'Accommodation options',
    'View wedding gallery',
    'Meet the families',
    'Menu and dietary options',
    'How to use my SmartCard?'
  ];
  
  // Fill up to 4 suggestions
  while (suggestions.length < 4 && smartDefaults.length > 0) {
    const suggestion = smartDefaults.shift();
    if (suggestion && !suggestions.includes(suggestion)) {
      suggestions.push(suggestion);
    }
  }
  
  return suggestions.slice(0, 4);
}