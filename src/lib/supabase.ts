import { createClient } from '@supabase/supabase-js'

// These should be in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for the optimized database schema
export interface WeddingWebsiteData {
  wedding_id: string
  template_id: string
  bride_name: string
  groom_name: string
  wedding_date: string
  venue_name: string
  venue_address: string
  city: string
  state: string
  bride_whatsapp: string
  groom_whatsapp: string
  our_story: string
  how_we_met: string
  about_bride: string
  about_groom: string
  bride_photo_url: string
  groom_photo_url: string
  couple_picture: string
  gallery: Array<{
    id: string
    image_url: string
    caption?: string
    is_featured?: boolean
  }>
  wedding_party: {
    bridesmaids: Array<{ 
      name: string
      role: string
      image?: string
      description?: string 
    }>
    groomsmen: Array<{ 
      name: string
      role: string
      image?: string
      description?: string 
    }>
  }
  families: {
    bride: { 
      father: string
      mother: string
      father_title?: string
      mother_title?: string 
    }
    groom: { 
      father: string
      mother: string
      father_title?: string
      mother_title?: string 
    }
  }
  events: Array<{
    id: string
    name: string
    description: string
    event_date: string
    start_time: string
    end_time: string
    venue: string
    address: string
    icon: string
    color: string
  }>
  color_scheme: Record<string, string>
  custom_sections: Record<string, any>
  visibility_mode: string
  password_protected: boolean
  show_home: boolean
  show_schedule: boolean
  show_registry: boolean
  show_wedding_party: boolean
  show_gallery: boolean
  show_rsvp: boolean
  is_published: boolean
  url_slug: string
}

export interface Wedding {
  id: string
  wedding_name: string
  template_id: string
  bride_name: string
  groom_name: string
  wedding_date: string
  venue: string
  created_at: string
  updated_at: string
}

export interface WeddingEvent {
  id: string
  wedding_id: string
  event_name: string
  event_date: string
  event_time: string
  venue: string
  description?: string
  order_index: number
}

export interface WeddingFamily {
  id: string
  wedding_id: string
  side: 'bride' | 'groom'
  father_name: string
  mother_name: string
  additional_info?: string
}

export interface WeddingGuest {
  id: string
  wedding_id: string
  guest_name: string
  email?: string
  phone?: string
  invitation_sent: boolean
  rsvp_status?: 'pending' | 'accepted' | 'declined'
}

// Helper functions to fetch wedding data
export async function getWeddingBySlug(slug: string): Promise<WeddingWebsiteData | null> {
  const { data, error } = await supabase
    .rpc('get_wedding_by_slug', { p_slug: slug })
    .single()

  if (error) {
    console.error('Error fetching wedding by slug:', error)
    return null
  }

  return data as WeddingWebsiteData
}

export async function getWeddingByName(weddingName: string) {
  const { data, error } = await supabase
    .from('weddings')
    .select(`
      *,
      events:wedding_events(*),
      families:wedding_families(*)
    `)
    .eq('wedding_name', weddingName)
    .single()

  if (error) {
    console.error('Error fetching wedding:', error)
    return null
  }

  return data
}

export async function getWeddingEvents(weddingId: string) {
  const { data, error } = await supabase
    .from('wedding_events')
    .select('*')
    .eq('wedding_id', weddingId)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }

  return data
}

export async function getWeddingFamilies(weddingId: string) {
  const { data, error } = await supabase
    .from('wedding_families')
    .select('*')
    .eq('wedding_id', weddingId)

  if (error) {
    console.error('Error fetching families:', error)
    return []
  }

  return data
}

export async function getGuestByName(weddingId: string, guestName: string) {
  const { data, error } = await supabase
    .from('wedding_guests')
    .select('*')
    .eq('wedding_id', weddingId)
    .eq('guest_name', guestName)
    .single()

  if (error) {
    console.error('Error fetching guest:', error)
    return null
  }

  return data
}