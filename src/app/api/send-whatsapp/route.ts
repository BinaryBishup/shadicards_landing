import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const WHATSAPP_TOKEN = process.env.WHATSAPP_BUSINESS_API_TOKEN!;
const PHONE_NUMBER_ID = process.env.WHATSAPP_BUSINESS_API_PHONE_NUMBER_ID!;

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, countryCode } = await request.json();

    if (!phoneNumber || !countryCode) {
      return NextResponse.json(
        { error: 'Phone number and country code are required' },
        { status: 400 }
      );
    }

    // Format the phone number (remove any spaces or special characters)
    const formattedNumber = phoneNumber.replace(/\s+/g, '');
    const fullPhoneNumber = `${countryCode}${formattedNumber}`;

    // Send WhatsApp message using Business API
    const whatsappResponse = await fetch(
      `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: fullPhoneNumber,
          type: 'template',
          template: {
            name: 'sample_wedding',
            language: {
              code: 'en',
            },
            components: [
              {
                type: 'header',
                parameters: [
                  {
                    type: 'image',
                    image: {
                      link: 'https://images.stockcake.com/public/9/7/2/9728bf53-7533-4b4b-a3a3-302af3b69679_large/traditional-indian-wedding-stockcake.jpg'
                    }
                  }
                ]
              }
            ]
          },
        }),
      }
    );

    const whatsappData = await whatsappResponse.json();

    // Check if WhatsApp message was sent successfully
    if (!whatsappResponse.ok) {
      console.error('WhatsApp API error:', whatsappData);
      console.error('Full phone number:', fullPhoneNumber);
      console.error('Response status:', whatsappResponse.status);

      // Store lead even if message failed
      await supabase.from('leads').insert({
        phone_number: fullPhoneNumber,
        country_code: countryCode,
        message_sent: false,
      });

      // Return more detailed error message
      const errorMessage = whatsappData.error?.message || 'Failed to send WhatsApp message';
      const errorCode = whatsappData.error?.code || 'UNKNOWN';

      return NextResponse.json(
        {
          error: errorMessage,
          errorCode: errorCode,
          details: whatsappData
        },
        { status: whatsappResponse.status }
      );
    }

    // Store lead in Supabase with message_sent = true
    const { data, error } = await supabase.from('leads').insert({
      phone_number: fullPhoneNumber,
      country_code: countryCode,
      message_sent: true,
    }).select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Message sent but failed to store lead', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'WhatsApp message sent successfully',
      whatsappMessageId: whatsappData.messages?.[0]?.id,
      lead: data?.[0],
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
