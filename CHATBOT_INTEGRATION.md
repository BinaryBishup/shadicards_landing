# ShadiCards AI Chatbot Integration Guide

## Overview
The ShadiCards AI Chatbot is a context-aware wedding assistant that provides personalized responses to guests based on their wedding invitations and event details.

## How It Works

### Data Flow
1. **URL Structure**: `wedding/[url_slug]?guest=[guest_id]`
   - `url_slug`: The wedding website's unique URL (stored in `wedding_website.url_slug`)
   - `guest_id`: The guest's UUID from the URL parameter

2. **Context Resolution**:
   - The chatbot uses the `url_slug` to find the `wedding_id` from the `wedding_website` table
   - It then fetches:
     - Wedding details (couple names, dates, venues)
     - Guest information (name, side, relationship)
     - Event invitations specific to the guest
     - RSVP statuses

3. **Smart Responses**: The chatbot provides context-aware responses about:
   - Events the guest is invited to
   - Venue details and directions
   - RSVP status and updates
   - Couple information
   - Dress code
   - Schedule and timings

## Implementation Details

### Database Tables
- `wedding_website`: Maps URL slugs to wedding IDs
- `weddings`: Wedding details
- `guests`: Guest information
- `events`: Event details
- `event_invitations`: Guest-specific invitations and RSVP status
- `chat_sessions`: Tracks chat sessions
- `chat_messages`: Stores conversation history
- `chat_context`: Stores contextual information

### API Endpoints

#### `/api/chatbot/simple`
Main chatbot endpoint that handles queries with context.

**Request Body**:
```json
{
  "message": "User's question",
  "guestId": "guest-uuid (optional)",
  "weddingId": "wedding-uuid (optional)",
  "websiteSlug": "url-slug (optional)",
  "sessionId": "session-id (optional)"
}
```

**Response**:
```json
{
  "response": "AI generated response",
  "sessionId": "session-id",
  "suggestions": ["Suggested follow-up questions"],
  "weddingId": "resolved-wedding-id",
  "guestId": "resolved-guest-id"
}
```

#### `/api/chatbot/rsvp`
Updates RSVP status for events.

**Request Body**:
```json
{
  "guestId": "guest-uuid",
  "eventId": "event-uuid",
  "status": "yes|no|maybe",
  "plusOnes": 0,
  "message": "Optional message"
}
```

### Component Integration

#### ChatBar Component
Located at: `/src/components/wedding/ChatBar.tsx`

**Props**:
```typescript
interface ChatBarProps {
  weddingId?: string;
  guestId?: string;
  websiteSlug?: string;
  weddingName?: string;
  guestName?: string;
}
```

#### Usage in Wedding Website
```typescript
<ChatBar 
  weddingId={website.wedding_id}
  guestId={guest.id}
  websiteSlug={urlSlug}
  weddingName={`${website.wedding.bride_name} & ${website.wedding.groom_name}'s wedding`}
  guestName={guest.first_name || guest.name}
/>
```

## Features

### 1. Context-Aware Responses
- Automatically identifies the guest and their relationship to the couple
- Provides personalized event information based on invitations
- Shows only relevant events and venues

### 2. Smart Suggestions
- Dynamically generates follow-up questions based on conversation context
- Offers quick action buttons for common queries

### 3. RSVP Management
- View current RSVP status for all events
- Update RSVP directly from the chat interface
- Add plus-ones and special requests

### 4. Event Information
- Display event dates, times, and venues
- Provide directions and venue details
- Show dress code and other event-specific information

### 5. Conversation History
- All conversations are stored in Supabase
- Sessions are maintained for continuity
- Analytics and insights available

## Example Queries

### Guest Queries
- "What events am I invited to?"
- "Show me the venue details"
- "What's my RSVP status?"
- "Can I bring a plus one?"
- "What's the dress code for the reception?"
- "Tell me about the couple"
- "When is the sangeet ceremony?"
- "I need directions to the venue"

### Responses Include
- Event-specific information with dates and times
- Venue addresses with map links
- RSVP status with update options
- Personalized greetings using guest name
- Side-specific information (bride's/groom's side)

## Testing

### Test Page
Visit `/test-chatbot` to test the chatbot with sample data from your database.

### Manual Testing with Real Data
1. Find a wedding website slug:
```sql
SELECT url_slug, wedding_id FROM wedding_website LIMIT 1;
```

2. Find a guest for that wedding:
```sql
SELECT id, name FROM guests WHERE wedding_id = 'wedding-id' LIMIT 1;
```

3. Visit: `http://localhost:3001/wedding/[url_slug]?guest=[guest_id]`

### API Testing
```bash
curl -X POST http://localhost:3001/api/chatbot/simple \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What events am I invited to?",
    "guestId": "guest-uuid",
    "websiteSlug": "wedding-url-slug"
  }'
```

## Configuration

### Environment Variables
```env
OPENAI_API_KEY=your-api-key  # For GPT integration (optional - has fallback)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
```

### Enable/Disable Chatbot
In the `wedding_website` table, set `show_chat` to true/false to enable/disable the chatbot for specific weddings.

## Future Enhancements

### GPT-5-nano Integration
When GPT-5-nano becomes available:
1. Update `/api/chatbot/route.ts`
2. Change model from `gpt-4o-mini` to `gpt-5-nano`
3. The infrastructure is already in place

### Additional Features
- Voice input/output
- Multi-language support
- Photo sharing capabilities
- Gift registry integration
- Transportation coordination
- Accommodation booking

## Troubleshooting

### Common Issues

1. **"Missing required fields" error**
   - Ensure either `weddingId` or `websiteSlug` is provided
   - Check that the guest ID is valid

2. **No response from chatbot**
   - Verify OpenAI API key is set (or use `/api/chatbot/simple` for fallback)
   - Check Supabase connection

3. **Guest not found**
   - Verify the guest ID exists in the database
   - Ensure the guest belongs to the specified wedding

4. **Events not showing**
   - Check `event_invitations` table for guest-event mappings
   - Verify event dates are in the future

## Support

For issues or questions:
- Check the API logs in the console
- Review Supabase logs for database errors
- Ensure all environment variables are correctly set