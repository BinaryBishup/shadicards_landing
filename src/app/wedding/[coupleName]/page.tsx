import { notFound } from 'next/navigation'
import { loadTemplate, WeddingData } from '@/lib/templateLoader'
import { getWeddingBySlug } from '@/lib/supabase'

interface WeddingPageProps {
  params: Promise<{
    coupleName: string
  }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getWeddingData(slug: string): Promise<{ templateId: string; data: WeddingData } | null> {
  // Check if Supabase is configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                               process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!isSupabaseConfigured) {
    console.error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return null
  }

  try {
    // Fetch from Supabase using the new schema
    const weddingData = await getWeddingBySlug(slug)
    
    if (!weddingData) {
      console.log('No wedding found for slug:', slug)
      return null
    }

    // Transform Supabase data to match our template format
    const transformedData: WeddingData = {
      brideName: weddingData.bride_name,
      groomName: weddingData.groom_name,
      weddingDate: weddingData.wedding_date,
      venue: weddingData.venue_name,
      events: weddingData.events?.map((event: any) => ({
        name: event.name,
        date: new Date(event.event_date).toLocaleDateString('en-US', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        time: event.start_time,
        venue: event.venue || event.address
      })) || [],
      story: weddingData.our_story || '',
      families: weddingData.families || {
        bride: { father: '', mother: '' },
        groom: { father: '', mother: '' }
      },
      howWeMet: weddingData.how_we_met,
      aboutBride: weddingData.about_bride,
      aboutGroom: weddingData.about_groom,
      brideImage: weddingData.bride_photo_url,
      groomImage: weddingData.groom_photo_url,
      coupleImage: weddingData.couple_picture,
      gallery: weddingData.gallery?.map((g: any) => g.image_url) || [],
      bridesmaids: weddingData.wedding_party?.bridesmaids || [],
      groomsmen: weddingData.wedding_party?.groomsmen || []
    }

    return {
      templateId: weddingData.template_id || '001',
      data: transformedData
    }
  } catch (error) {
    console.error('Error fetching wedding data:', error)
    return null
  }
}

export default async function WeddingPage({ params, searchParams }: WeddingPageProps) {
  const { coupleName } = await params
  const urlSearchParams = await searchParams
  const guestName = urlSearchParams?.guest as string | undefined
  
  // Fetch wedding data based on URL slug
  const weddingInfo = await getWeddingData(coupleName)
  
  if (!weddingInfo) {
    notFound()
  }
  
  // Add guest name to the data if provided
  if (guestName) {
    weddingInfo.data.guestName = guestName
  }
  
  // Log for debugging
  console.log('Loading wedding:', coupleName)
  console.log('Template ID:', weddingInfo.templateId)
  console.log('Guest:', guestName || 'No guest specified')
  
  // Render the appropriate template with the wedding data
  return loadTemplate(weddingInfo.templateId, weddingInfo.data)
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60 // Revalidate every 60 seconds