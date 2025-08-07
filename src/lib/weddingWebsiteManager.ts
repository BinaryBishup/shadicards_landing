import { supabase } from './supabase'

export interface WeddingWebsiteConfig {
  wedding_id: string
  template_id: string
  url_slug: string
  story?: string
  how_we_met?: string
  about_bride?: string
  about_groom?: string
  bride_image?: string
  groom_image?: string
  couple_image?: string
  gallery?: string[]
  wedding_party?: {
    bridesmaids: Array<{ name: string; role: string; image?: string }>
    groomsmen: Array<{ name: string; role: string; image?: string }>
  }
  families?: {
    bride: { father: string; mother: string }
    groom: { father: string; mother: string }
  }
  custom_sections?: Record<string, any>
  color_scheme?: Record<string, string>
  meta_title?: string
  meta_description?: string
  og_image?: string
  is_published: boolean
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
 * Updates wedding website content
 */
export async function updateWeddingContent(
  weddingId: string, 
  content: Partial<Pick<WeddingWebsiteConfig, 
    'story' | 'how_we_met' | 'about_bride' | 'about_groom' | 
    'bride_image' | 'groom_image' | 'couple_image' | 'gallery' | 
    'wedding_party' | 'families' | 'custom_sections'>>
) {
  const { data, error } = await supabase
    .from('wedding_website_config')
    .update(content)
    .eq('wedding_id', weddingId)
    .select()
    .single()

  if (error) {
    console.error('Error updating wedding content:', error)
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