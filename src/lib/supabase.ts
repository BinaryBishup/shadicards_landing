import { createClient } from '@supabase/supabase-js';

// These should be in environment variables (.env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gicvribyqmexntgfahji.supabase.co';
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Use publishable key if available and complete, otherwise fall back to anon key
const apiKey = (supabasePublishableKey && supabasePublishableKey.startsWith('sb_publishable_')) 
  ? supabasePublishableKey 
  : supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

if (!supabaseUrl || !apiKey) {
  console.warn('Supabase environment variables are not set. Please add them to your .env.local file.');
}

export const supabase = createClient(supabaseUrl, apiKey);

// Type definitions based on your database schema
export interface Wedding {
  id: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string | null;
  venue_name: string | null;
  venue_address: string | null;
  phone_number: string | null;
  email: string | null;
  is_active: boolean | null;
  couple_picture: string | null;
  bride_photo_url: string | null;
  groom_photo_url: string | null;
  about_bride: string | null;
  about_groom: string | null;
  rsvp_contact: string | null;
  user_id: string | null;
}

export interface WeddingWebsite {
  id: string;
  wedding_id: string;
  url_slug: string;
  status: 'active' | 'inactive' | 'draft' | null;
  is_password_protected: boolean | null;
  password: string | null;
  visibility: string | null;
  template_id: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  show_hero: boolean | null;
  show_about: boolean | null;
  show_story: boolean | null;
  show_gallery: boolean | null;
  show_events: boolean | null;
  show_families: boolean | null;
  show_wedding_party: boolean | null;
  show_chat: boolean | null;
  story_items: any | null;
  gallery_images: any | null;
  bride_families: any | null;
  groom_families: any | null;
  bridesmaids: any | null;
  groomsmen: any | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  view_count: number | null;
  last_viewed_at: string | null;
}

export interface Guest {
  id: string;
  wedding_id: string;
  name: string;
  first_name: string;
  last_name: string;
  whatsapp: string | null;
  side: 'bride' | 'groom' | 'mutual';
  relationship: string;
  email: string | null;
  address: string | null;
  dietary_preferences: string | null;
  notes: string | null;
  physical_card: boolean | null;
  preferred_language: string | null;
  title: string | null;
  smart_card: 'none' | 'paper' | 'pvc' | 'wooden' | 'metal' | null;
  profile_image: string | null;
}

export interface Event {
  id: string;
  wedding_id: string;
  name: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  address: string | null;
  is_common_event: boolean | null;
  guest_relationships: string[] | null;
  icon: string | null;
  color: string | null;
  event_type: string | null;
}

export interface EventInvitation {
  id: string;
  event_id: string;
  guest_id: string;
  invitation_status: 'pending' | 'sent' | 'viewed' | 'responded' | null;
  rsvp_status: 'yes' | 'no' | 'maybe' | null;
  rsvp_date: string | null;
  plus_ones: number | null;
  message: string | null;
}