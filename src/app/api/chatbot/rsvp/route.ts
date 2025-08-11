import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { guestId, eventId, status, plusOnes, message } = await request.json();

    if (!guestId || !eventId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Update RSVP status
    const { data, error } = await supabase
      .from('event_invitations')
      .update({
        rsvp_status: status,
        rsvp_date: new Date().toISOString(),
        plus_ones: plusOnes || 0,
        message: message || null,
      })
      .eq('guest_id', guestId)
      .eq('event_id', eventId)
      .select(`
        *,
        events (*)
      `)
      .single();

    if (error) {
      throw error;
    }

    // Create a confirmation message
    const confirmationMessage = status === 'yes' 
      ? `Great! You're confirmed for ${data.events.name} on ${new Date(data.events.event_date).toLocaleDateString()}${plusOnes > 0 ? ` with ${plusOnes} guest(s)` : ''}. We look forward to seeing you!`
      : status === 'no'
      ? `We understand you won't be able to make it to ${data.events.name}. Thank you for letting us know!`
      : `We've noted that you might attend ${data.events.name}. Please confirm when you're sure!`;

    return NextResponse.json({
      success: true,
      message: confirmationMessage,
      data,
    });

  } catch (error) {
    console.error('RSVP update error:', error);
    return NextResponse.json(
      { error: 'Failed to update RSVP' },
      { status: 500 }
    );
  }
}