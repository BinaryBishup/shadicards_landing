import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Template001 from '@/components/templates/Template001'
import PasswordProtection from '@/components/PasswordProtection'
import RestrictedAccess from '@/components/RestrictedAccess'

// Enable dynamic rendering due to guest parameter in searchParams
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

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
  
  // Optimized query with specific field selection for better performance
  const { data: websiteData, error } = await supabase
    .from('wedding_website')
    .select(`
      id,
      wedding_id,
      url_slug,
      status,
      visibility,
      is_password_protected,
      password,
      template_id,
      primary_color,
      secondary_color,
      show_hero,
      show_couple_profiles,
      show_story,
      show_gallery,
      show_events,
      show_chat,
      show_families,
      show_wedding_party,
      story_items,
      gallery_images,
      bride_families,
      groom_families,
      bridesmaids,
      groomsmen,
      meta_title,
      meta_description,
      og_image,
      view_count,
      last_viewed_at,
      weddings!inner (
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
    const wedding = Array.isArray(websiteData.weddings) ? websiteData.weddings[0] : websiteData.weddings
    return (
      <RestrictedAccess 
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        weddingDate={wedding.wedding_date}
        coupleImage={wedding.couple_picture}
        rsvpContact={wedding.rsvp_contact}
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
    const wedding = Array.isArray(websiteData.weddings) ? websiteData.weddings[0] : websiteData.weddings
    return (
      <RestrictedAccess 
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        weddingDate={wedding.wedding_date}
        coupleImage={wedding.couple_picture}
        rsvpContact={wedding.rsvp_contact}
      />
    )
  }

  // Optimized events query with specific field selection
  const { data: invitedEvents } = await supabase
    .from('event_invitations')
    .select(`
      event_id,
      rsvp_status,
      events!inner (
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
  const wedding = Array.isArray(websiteData.weddings) ? websiteData.weddings[0] : websiteData.weddings
  const weddingData = {
    // Guest Information
    guestName: `${guestData.first_name} ${guestData.last_name}`,
    guestId: guestData.id,
    guestProfileImage: guestData.profile_image,
    guestSide: guestData.side,
    weddingUrl: url,
    
    // Basic Information from weddings table
    brideName: wedding.bride_name,
    groomName: wedding.groom_name,
    weddingDate: wedding.wedding_date,
    venue: wedding.venue_name || '',
    
    // Story Section
    story: wedding.our_story || '',
    howWeMet: wedding.how_we_met || '',
    storyItems: websiteData.story_items || [],
    
    // Profile Information
    aboutBride: wedding.about_bride || '',
    aboutGroom: wedding.about_groom || '',
    
    // Image URLs - Use placeholder images as defaults
    coupleImage: wedding.couple_picture || 'https://placehold.co/500x500/f9a8d4/831843?text=Couple+Photo',
    brideImage: wedding.bride_photo_url || 'https://placehold.co/320x320/fce7f3/831843?text=Bride+Photo',
    groomImage: wedding.groom_photo_url || 'https://placehold.co/320x320/ddd6fe/5b21b6?text=Groom+Photo',
    
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
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
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
  try {
    const { url } = await params
    const supabase = await createClient()
    
    // Optimized metadata query - only fetch essential fields
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
      keywords: `wedding, ${wedding.bride_name}, ${wedding.groom_name}, celebration, invitation`,
      openGraph: {
        title,
        description,
        images: websiteData.og_image ? [websiteData.og_image] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: websiteData.og_image ? [websiteData.og_image] : [],
      },
      robots: {
        index: false, // Private wedding websites shouldn't be indexed
        follow: false,
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Wedding Website',
      description: 'Celebrate our special day with us'
    }
  }
}