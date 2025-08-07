import { notFound, redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Template001 from '@/components/templates/Template001'
import PasswordProtection from '@/components/PasswordProtection'
import RestrictedAccess from '@/components/RestrictedAccess'

interface WeddingWebsiteData {
  id: string
  wedding_id: string
  url_slug: string
  status: string
  visibility: string | null
  is_password_protected: boolean
  password: string | null
  template_id: string
  primary_color: string
  secondary_color: string
  show_hero: boolean
  show_couple_profiles: boolean
  show_story: boolean
  show_gallery: boolean
  show_events: boolean
  show_chat: boolean
  show_families: boolean
  show_wedding_party: boolean
  story_items: any[]
  gallery_images: any[]
  bride_families: any
  groom_families: any
  bridesmaids: any[]
  groomsmen: any[]
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  view_count: number
  last_viewed_at: string | null
  weddings: {
    id: string
    bride_name: string
    groom_name: string
    wedding_date: string
    venue_name: string
    venue_address: string
    phone_number: string
    email: string
    couple_picture: string
    bride_photo_url: string
    groom_photo_url: string
    about_bride: string
    about_groom: string
    our_story: string
    how_we_met: string
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
  }>
}

export default async function WeddingWebsitePage({
  params,
  searchParams
}: {
  params: Promise<{ url: string }>
  searchParams: Promise<{ guest?: string }>
}) {
  const { url } = await params
  const { guest: guestId } = await searchParams
  const supabase = await createClient()
  
  // Fetch wedding website data along with wedding details
  const { data: websiteData, error } = await supabase
    .from('wedding_website')
    .select(`
      *,
      weddings (
        id,
        bride_name,
        groom_name,
        wedding_date,
        venue_name,
        venue_address,
        phone_number,
        email,
        couple_picture,
        bride_photo_url,
        groom_photo_url,
        about_bride,
        about_groom,
        our_story,
        how_we_met,
        rsvp_contact
      )
    `)
    .eq('url_slug', url)
    .eq('status', 'active')
    .single()

  if (error || !websiteData) {
    notFound()
  }

  // Check visibility setting
  if (websiteData.visibility === 'none') {
    redirect('/')
  }

  // If no guest parameter, show restricted access
  if (!guestId) {
    return (
      <RestrictedAccess 
        brideName={websiteData.weddings.bride_name}
        groomName={websiteData.weddings.groom_name}
        weddingDate={websiteData.weddings.wedding_date}
        coupleImage={websiteData.weddings.couple_picture}
        rsvpContact={websiteData.weddings.rsvp_contact}
      />
    )
  }

  // Fetch guest details
  const { data: guestData } = await supabase
    .from('guests')
    .select('*')
    .eq('id', guestId)
    .eq('wedding_id', websiteData.wedding_id)
    .single()

  // If guest not found or not part of this wedding, show restricted access
  if (!guestData) {
    return (
      <RestrictedAccess 
        brideName={websiteData.weddings.bride_name}
        groomName={websiteData.weddings.groom_name}
        weddingDate={websiteData.weddings.wedding_date}
        coupleImage={websiteData.weddings.couple_picture}
        rsvpContact={websiteData.weddings.rsvp_contact}
      />
    )
  }

  // Fetch only the events this guest is invited to
  const { data: invitedEvents } = await supabase
    .from('event_invitations')
    .select(`
      event_id,
      rsvp_status,
      events (
        id,
        name,
        description,
        event_date,
        start_time,
        end_time,
        venue,
        address,
        icon,
        color
      )
    `)
    .eq('guest_id', guestId)
    .order('events(event_date)', { ascending: true })

  // Extract the events from the invitation data - fix type issue
  const events = invitedEvents?.map(invitation => (invitation as any).events).filter(Boolean) || []

  // Update view count
  await supabase
    .from('wedding_website')
    .update({ 
      view_count: (websiteData.view_count || 0) + 1,
      last_viewed_at: new Date().toISOString()
    })
    .eq('id', websiteData.id)

  // Transform data for Template001
  const weddingData = {
    // Guest Information
    guestName: `${guestData.first_name} ${guestData.last_name}`,
    guestId: guestData.id,
    guestProfileImage: guestData.profile_image,
    guestSide: guestData.side,
    weddingUrl: url,
    
    // Basic Information from weddings table
    brideName: websiteData.weddings.bride_name,
    groomName: websiteData.weddings.groom_name,
    weddingDate: websiteData.weddings.wedding_date,
    venue: websiteData.weddings.venue_name || '',
    
    // Story Section
    story: websiteData.weddings.our_story || '',
    howWeMet: websiteData.weddings.how_we_met || '',
    storyItems: websiteData.story_items || [],
    
    // Profile Information
    aboutBride: websiteData.weddings.about_bride || '',
    aboutGroom: websiteData.weddings.about_groom || '',
    
    // Image URLs
    coupleImage: websiteData.weddings.couple_picture || '/couple_image.jpg',
    brideImage: websiteData.weddings.bride_photo_url || '',
    groomImage: websiteData.weddings.groom_photo_url || '',
    
    // Events from events table
    events: events?.map(event => ({
      name: event.name,
      date: new Date(event.event_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      time: new Date(`2000-01-01T${event.start_time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      venue: `${event.venue}${event.address ? `, ${event.address}` : ''}`,
      icon: event.icon || 'heart',
      color: event.color || '#9333ea'
    })) || [],
    
    // Family Information
    families: {
      bride: websiteData.bride_families || {},
      groom: websiteData.groom_families || {}
    },
    
    // Gallery Images
    gallery: websiteData.gallery_images || [],
    
    // Wedding Party
    bridesmaids: websiteData.bridesmaids || [],
    groomsmen: websiteData.groomsmen || [],
    
    // Section visibility controls
    showHero: websiteData.show_hero,
    showCoupleProfiles: websiteData.show_couple_profiles,
    showStory: websiteData.show_story,
    showGallery: websiteData.show_gallery,
    showEvents: websiteData.show_events,
    showChat: websiteData.show_chat,
    showFamilies: websiteData.show_families ?? true,
    showWeddingParty: websiteData.show_wedding_party ?? true,
  }

  // Check if password protection is enabled
  if (websiteData.is_password_protected && websiteData.password) {
    return (
      <PasswordProtection
        correctPassword={websiteData.password}
        brideName={websiteData.weddings.bride_name}
        groomName={websiteData.weddings.groom_name}
      >
        <Template001 data={weddingData} />
      </PasswordProtection>
    )
  }

  return <Template001 data={weddingData} />
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ url: string }>
}) {
  const { url } = await params
  const supabase = await createClient()
  
  const { data: websiteData } = await supabase
    .from('wedding_website')
    .select(`
      meta_title,
      meta_description,
      og_image,
      weddings!inner (
        bride_name,
        groom_name,
        wedding_date
      )
    `)
    .eq('url_slug', url)
    .eq('status', 'active')
    .single()

  if (!websiteData || !websiteData.weddings) {
    return {
      title: 'Wedding Website',
      description: 'Celebrate our special day with us'
    }
  }

  const wedding = websiteData.weddings as any
  const title = websiteData.meta_title || 
    `${wedding.bride_name} & ${wedding.groom_name}'s Wedding`
  
  const description = websiteData.meta_description || 
    `Join us as we celebrate the wedding of ${wedding.bride_name} and ${wedding.groom_name}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: websiteData.og_image ? [websiteData.og_image] : [],
    },
  }
}