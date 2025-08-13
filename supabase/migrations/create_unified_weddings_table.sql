-- Create unified weddings table that combines wedding and wedding_website data
CREATE TABLE IF NOT EXISTS weddings (
  -- Primary Key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Wedding Information (from 'wedding' table)
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE,
  venue_name TEXT,
  venue_address TEXT,
  phone_number TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  couple_picture TEXT,
  bride_photo_url TEXT,
  groom_photo_url TEXT,
  about_bride TEXT,
  about_groom TEXT,
  rsvp_contact TEXT,
  
  -- Website Configuration (from 'wedding_website' table)
  url_slug TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  is_password_protected BOOLEAN DEFAULT false,
  password TEXT,
  visibility TEXT DEFAULT 'public',
  template_id TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  
  -- Website Section Visibility
  show_hero BOOLEAN DEFAULT true,
  show_about BOOLEAN DEFAULT true,
  show_story BOOLEAN DEFAULT true,
  show_gallery BOOLEAN DEFAULT true,
  show_events BOOLEAN DEFAULT true,
  show_families BOOLEAN DEFAULT true,
  show_wedding_party BOOLEAN DEFAULT true,
  show_chat BOOLEAN DEFAULT true,
  
  -- Website Content
  story_items JSONB,
  gallery_images JSONB,
  bride_families JSONB,
  groom_families JSONB,
  bridesmaids JSONB,
  groomsmen JSONB,
  
  -- SEO & Meta
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  
  -- User & Timestamps
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_weddings_url_slug ON weddings(url_slug);
CREATE INDEX idx_weddings_user_id ON weddings(user_id);
CREATE INDEX idx_weddings_status ON weddings(status);
CREATE INDEX idx_weddings_is_active ON weddings(is_active);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_weddings_updated_at
  BEFORE UPDATE ON weddings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Migrate existing data from wedding and wedding_website tables
INSERT INTO weddings (
  id,
  bride_name,
  groom_name,
  wedding_date,
  venue_name,
  venue_address,
  phone_number,
  email,
  is_active,
  couple_picture,
  bride_photo_url,
  groom_photo_url,
  about_bride,
  about_groom,
  rsvp_contact,
  url_slug,
  status,
  is_password_protected,
  password,
  visibility,
  template_id,
  primary_color,
  secondary_color,
  show_hero,
  show_about,
  show_story,
  show_gallery,
  show_events,
  show_families,
  show_wedding_party,
  show_chat,
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
  user_id,
  created_at,
  updated_at
)
SELECT 
  w.id,
  w.bride_name,
  w.groom_name,
  w.wedding_date,
  w.venue_name,
  w.venue_address,
  w.phone_number,
  w.email,
  w.is_active,
  w.couple_picture,
  w.bride_photo_url,
  w.groom_photo_url,
  w.about_bride,
  w.about_groom,
  w.rsvp_contact,
  ww.url_slug,
  ww.status,
  ww.is_password_protected,
  ww.password,
  ww.visibility,
  ww.template_id,
  ww.primary_color,
  ww.secondary_color,
  ww.show_hero,
  ww.show_about,
  ww.show_story,
  ww.show_gallery,
  ww.show_events,
  ww.show_families,
  ww.show_wedding_party,
  ww.show_chat,
  ww.story_items,
  ww.gallery_images,
  ww.bride_families,
  ww.groom_families,
  ww.bridesmaids,
  ww.groomsmen,
  ww.meta_title,
  ww.meta_description,
  ww.og_image,
  ww.view_count,
  ww.last_viewed_at,
  w.user_id,
  COALESCE(w.created_at, NOW()),
  COALESCE(w.updated_at, NOW())
FROM wedding w
LEFT JOIN wedding_website ww ON w.id = ww.wedding_id
WHERE EXISTS (SELECT 1 FROM wedding_website WHERE wedding_id = w.id);

-- Update foreign key references in other tables
-- Update guests table
ALTER TABLE guests 
  DROP CONSTRAINT IF EXISTS guests_wedding_id_fkey,
  ADD CONSTRAINT guests_wedding_id_fkey 
    FOREIGN KEY (wedding_id) 
    REFERENCES weddings(id) 
    ON DELETE CASCADE;

-- Update events table
ALTER TABLE events 
  DROP CONSTRAINT IF EXISTS events_wedding_id_fkey,
  ADD CONSTRAINT events_wedding_id_fkey 
    FOREIGN KEY (wedding_id) 
    REFERENCES weddings(id) 
    ON DELETE CASCADE;

-- Create RLS policies for the new weddings table
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;

-- Policy for viewing public weddings
CREATE POLICY "Public weddings are viewable by everyone" 
  ON weddings FOR SELECT 
  USING (is_active = true AND status = 'active' AND visibility = 'public');

-- Policy for viewing private weddings with guest access
CREATE POLICY "Private weddings viewable by invited guests" 
  ON weddings FOR SELECT 
  USING (
    is_active = true 
    AND status = 'active' 
    AND EXISTS (
      SELECT 1 FROM guests 
      WHERE guests.wedding_id = weddings.id
    )
  );

-- Policy for owners to manage their weddings
CREATE POLICY "Users can manage their own weddings" 
  ON weddings FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add comments for documentation
COMMENT ON TABLE weddings IS 'Unified table combining wedding and wedding_website data';
COMMENT ON COLUMN weddings.url_slug IS 'Unique URL slug for the wedding website';
COMMENT ON COLUMN weddings.status IS 'Website status: active, inactive, or draft';
COMMENT ON COLUMN weddings.visibility IS 'Website visibility: public, private, or hidden';