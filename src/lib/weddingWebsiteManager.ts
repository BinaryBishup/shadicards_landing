import { supabase } from './supabase'

export interface WeddingWebsiteConfig {
  wedding_id: string
  template_id: string
  url_slug: string
  custom_sections?: Record<string, any>
  color_scheme?: Record<string, string>
  is_published: boolean
  visibility_mode?: string
  password_protected?: boolean
  access_password?: string
  show_home?: boolean
  show_schedule?: boolean
  show_registry?: boolean
  show_wedding_party?: boolean
  show_gallery?: boolean
  show_rsvp?: boolean
  show_things_to_do?: boolean
  show_faqs?: boolean
}

/**
 * Creates or updates a wedding website configuration
 */
export async function upsertWeddingWebsiteConfig(config: Partial<WeddingWebsiteConfig>) {
  const { data, error } = await supabase
    .from('wedding_website_config')
    .upsert(config, { onConflict: 'wedding_id' })
    .select()
    .single()

  if (error) {
    console.error('Error upserting wedding website config:', error)
    throw error
  }

  return data
}

/**
 * Gets a wedding website configuration by wedding ID
 */
export async function getWeddingWebsiteConfig(weddingId: string) {
  const { data, error } = await supabase
    .from('wedding_website_config')
    .select('*')
    .eq('wedding_id', weddingId)
    .single()

  if (error) {
    console.error('Error fetching wedding website config:', error)
    return null
  }

  return data
}

/**
 * Updates the URL slug for a wedding
 */
export async function updateWeddingSlug(weddingId: string, slug: string) {
  // Validate slug format
  const slugRegex = /^[a-z0-9-]+$/
  if (!slugRegex.test(slug)) {
    throw new Error('Invalid slug format. Use only lowercase letters, numbers, and hyphens.')
  }

  const { data, error } = await supabase
    .from('wedding_website_config')
    .update({ url_slug: slug })
    .eq('wedding_id', weddingId)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      throw new Error('This URL is already taken. Please choose a different one.')
    }
    throw error
  }

  return data
}

/**
 * Publishes or unpublishes a wedding website
 */
export async function toggleWeddingPublishStatus(weddingId: string, isPublished: boolean) {
  const updateData: any = { is_published: isPublished }
  
  if (isPublished) {
    updateData.published_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('wedding_website_config')
    .update(updateData)
    .eq('wedding_id', weddingId)
    .select()
    .single()

  if (error) {
    console.error('Error updating publish status:', error)
    throw error
  }

  return data
}

/**
 * Updates wedding website template
 */
export async function updateWeddingTemplate(weddingId: string, templateId: string) {
  const validTemplates = ['001', '002', '003', '004', '005']
  
  if (!validTemplates.includes(templateId)) {
    throw new Error('Invalid template ID')
  }

  const { data, error } = await supabase
    .from('wedding_website_config')
    .update({ template_id: templateId })
    .eq('wedding_id', weddingId)
    .select()
    .single()

  if (error) {
    console.error('Error updating template:', error)
    throw error
  }

  return data
}

/**
 * Updates wedding content in the main weddings table
 */
export async function updateWeddingContent(
  weddingId: string, 
  content: Partial<{
    our_story: string
    how_we_met: string
    about_bride: string
    about_groom: string
    bride_photo_url: string
    groom_photo_url: string
    couple_picture: string
  }>
) {
  const { data, error } = await supabase
    .from('weddings')
    .update(content)
    .eq('id', weddingId)
    .select()
    .single()

  if (error) {
    console.error('Error updating wedding content:', error)
    throw error
  }

  return data
}

/**
 * Updates wedding gallery
 */
export async function updateWeddingGallery(
  weddingId: string,
  images: Array<{ image_url: string; caption?: string; display_order?: number }>
) {
  // Clear existing gallery
  await supabase
    .from('wedding_gallery')
    .delete()
    .eq('wedding_id', weddingId)

  // Insert new images
  const { data, error } = await supabase
    .from('wedding_gallery')
    .insert(
      images.map((img, idx) => ({
        wedding_id: weddingId,
        image_url: img.image_url,
        caption: img.caption,
        display_order: img.display_order ?? idx
      }))
    )
    .select()

  if (error) {
    console.error('Error updating gallery:', error)
    throw error
  }

  return data
}

/**
 * Updates wedding party members
 */
export async function updateWeddingParty(
  weddingId: string,
  partyMembers: Array<{
    name: string
    role: string
    side: 'bride' | 'groom'
    image_url?: string
    description?: string
    display_order?: number
  }>
) {
  // Clear existing party members
  await supabase
    .from('wedding_party')
    .delete()
    .eq('wedding_id', weddingId)

  // Insert new party members
  const { data, error } = await supabase
    .from('wedding_party')
    .insert(
      partyMembers.map((member, idx) => ({
        wedding_id: weddingId,
        ...member,
        display_order: member.display_order ?? idx
      }))
    )
    .select()

  if (error) {
    console.error('Error updating wedding party:', error)
    throw error
  }

  return data
}

/**
 * Updates family information
 */
export async function updateWeddingFamilies(
  weddingId: string,
  families: {
    bride: { father_name: string; mother_name: string; father_title?: string; mother_title?: string }
    groom: { father_name: string; mother_name: string; father_title?: string; mother_title?: string }
  }
) {
  // Clear existing families
  await supabase
    .from('wedding_families')
    .delete()
    .eq('wedding_id', weddingId)

  // Insert new family data
  const { data, error } = await supabase
    .from('wedding_families')
    .insert([
      {
        wedding_id: weddingId,
        side: 'bride',
        ...families.bride
      },
      {
        wedding_id: weddingId,
        side: 'groom',
        ...families.groom
      }
    ])
    .select()

  if (error) {
    console.error('Error updating families:', error)
    throw error
  }

  return data
}

/**
 * Checks if a URL slug is available
 */
export async function isSlugAvailable(slug: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('wedding_website_config')
    .select('url_slug')
    .eq('url_slug', slug)
    .single()

  if (error && error.code === 'PGRST116') { // No rows found
    return true
  }

  return false
}

/**
 * Generates a suggested URL slug from bride and groom names
 */
export function generateSlug(brideName: string, groomName: string): string {
  const clean = (name: string) => name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  return `${clean(brideName)}-weds-${clean(groomName)}`
}