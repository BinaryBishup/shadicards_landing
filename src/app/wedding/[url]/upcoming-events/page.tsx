import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import UpcomingEventsClient from './UpcomingEventsClient'

export default async function UpcomingEventsPage({
  params,
  searchParams
}: {
  params: Promise<{ url: string }>
  searchParams: Promise<{ guest?: string }>
}) {
  const { url } = await params
  const { guest: guestId } = await searchParams
  
  if (!guestId) {
    notFound()
  }

  const supabase = await createClient()
  
  // Fetch guest data to verify they exist
  const { data: guestData } = await supabase
    .from('guests')
    .select('*')
    .eq('id', guestId)
    .single()

  if (!guestData) {
    notFound()
  }

  // Fetch wedding website data
  const { data: websiteData } = await supabase
    .from('wedding_website')
    .select(`
      *,
      weddings (
        bride_name,
        groom_name,
        wedding_date,
        couple_picture
      )
    `)
    .eq('url_slug', url)
    .eq('status', 'active')
    .single()

  if (!websiteData) {
    notFound()
  }

  // Fetch upcoming events this guest is invited to with RSVP status
  const currentDate = new Date().toISOString().split('T')[0]
  const { data: invitations } = await supabase
    .from('event_invitations')
    .select(`
      id,
      event_id,
      rsvp_status,
      plus_ones,
      events!inner (
        id,
        name,
        description,
        event_date,
        start_time,
        end_time,
        venue,
        address,
        dress_code,
        special_instructions,
        icon,
        color,
        map_link,
        venue_phone,
        venue_email
      )
    `)
    .eq('guest_id', guestId)

  // Get the next upcoming event
  const upcomingEvents = invitations?.map(inv => {
    const event = inv.events as any
    if (!event) return null
    // Filter out past events
    if (event.event_date < currentDate) return null
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      event_date: event.event_date,
      start_time: event.start_time,
      end_time: event.end_time,
      venue: event.venue,
      address: event.address,
      dress_code: event.dress_code,
      special_instructions: event.special_instructions,
      icon: event.icon,
      color: event.color,
      map_link: event.map_link,
      venue_phone: event.venue_phone,
      venue_email: event.venue_email,
      invitationId: inv.id,
      rsvpStatus: inv.rsvp_status,
      plusOnes: inv.plus_ones
    }
  })
    .filter((event): event is NonNullable<typeof event> => event !== null)
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()) || []

  return (
    <UpcomingEventsClient
      events={upcomingEvents}
      guestName={`${guestData.first_name} ${guestData.last_name}`}
      guestId={guestId}
      weddingUrl={url}
      brideName={websiteData.weddings.bride_name}
      groomName={websiteData.weddings.groom_name}
      coupleImage={websiteData.weddings.couple_picture}
      weddingDate={websiteData.weddings.wedding_date}
    />
  )
}