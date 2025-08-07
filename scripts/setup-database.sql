-- Supabase Database Setup Script
-- Run this in your Supabase SQL Editor

-- First, let's check what tables already exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Drop existing tables if you want to start fresh (CAREFUL!)
-- Uncomment the lines below only if you want to reset everything
-- DROP TABLE IF EXISTS wedding_events CASCADE;
-- DROP TABLE IF EXISTS wedding_families CASCADE;
-- DROP TABLE IF EXISTS wedding_guests CASCADE;
-- DROP TABLE IF EXISTS wedding_gallery CASCADE;
-- DROP TABLE IF EXISTS wedding_team CASCADE;
-- DROP TABLE IF EXISTS weddings CASCADE;

-- Create weddings table
CREATE TABLE IF NOT EXISTS weddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wedding_name VARCHAR(255) UNIQUE NOT NULL,
  template_id VARCHAR(50) NOT NULL DEFAULT '001',
  bride_name VARCHAR(255) NOT NULL,
  groom_name VARCHAR(255) NOT NULL,
  wedding_date DATE NOT NULL,
  venue TEXT NOT NULL,
  story TEXT,
  bride_image TEXT,
  groom_image TEXT,
  couple_image TEXT,
  how_we_met TEXT,
  about_bride TEXT,
  about_groom TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wedding_events table
CREATE TABLE IF NOT EXISTS wedding_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  event_name VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  venue TEXT NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wedding_families table
CREATE TABLE IF NOT EXISTS wedding_families (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  side VARCHAR(10) CHECK (side IN ('bride', 'groom')),
  father_name VARCHAR(255),
  mother_name VARCHAR(255),
  additional_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_weddings_wedding_name ON weddings(wedding_name);
CREATE INDEX IF NOT EXISTS idx_wedding_events_wedding_id ON wedding_events(wedding_id);
CREATE INDEX IF NOT EXISTS idx_wedding_families_wedding_id ON wedding_families(wedding_id);

-- Enable RLS (Row Level Security)
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE wedding_families ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access to weddings" ON weddings;
DROP POLICY IF EXISTS "Public read access to wedding_events" ON wedding_events;
DROP POLICY IF EXISTS "Public read access to wedding_families" ON wedding_families;

-- Create new policies for public read access
CREATE POLICY "Public read access to weddings" ON weddings
  FOR SELECT USING (true);

CREATE POLICY "Public read access to wedding_events" ON wedding_events
  FOR SELECT USING (true);

CREATE POLICY "Public read access to wedding_families" ON wedding_families
  FOR SELECT USING (true);

-- Insert sample wedding data
INSERT INTO weddings (
  wedding_name,
  template_id,
  bride_name,
  groom_name,
  wedding_date,
  venue,
  story,
  couple_image,
  bride_image,
  groom_image
) VALUES (
  'priya-rahul',
  '001',
  'Priya',
  'Rahul',
  '2025-04-22',
  'Beach Resort, Goa',
  'From college sweethearts to life partners, our journey of love continues with your blessings.',
  '/couple_image.jpg',
  '/couple_image.jpg',
  '/couple_image.jpg'
) ON CONFLICT (wedding_name) DO UPDATE SET
  template_id = EXCLUDED.template_id,
  bride_name = EXCLUDED.bride_name,
  groom_name = EXCLUDED.groom_name,
  wedding_date = EXCLUDED.wedding_date,
  venue = EXCLUDED.venue;

-- Get the wedding ID
DO $$
DECLARE
  wedding_uuid UUID;
BEGIN
  SELECT id INTO wedding_uuid FROM weddings WHERE wedding_name = 'priya-rahul';
  
  -- Delete existing events for this wedding
  DELETE FROM wedding_events WHERE wedding_id = wedding_uuid;
  DELETE FROM wedding_families WHERE wedding_id = wedding_uuid;
  
  -- Insert wedding events
  INSERT INTO wedding_events (wedding_id, event_name, event_date, event_time, venue, order_index)
  VALUES 
    (wedding_uuid, 'Mehendi', '2025-04-20', '16:00:00', 'Garden Area', 1),
    (wedding_uuid, 'Haldi', '2025-04-21', '10:00:00', 'Poolside', 2),
    (wedding_uuid, 'Sangeet', '2025-04-21', '19:00:00', 'Banquet Hall', 3),
    (wedding_uuid, 'Wedding', '2025-04-22', '10:00:00', 'Beach Front', 4),
    (wedding_uuid, 'Reception', '2025-04-22', '19:00:00', 'Grand Ballroom', 5);
  
  -- Insert family details
  INSERT INTO wedding_families (wedding_id, side, father_name, mother_name)
  VALUES 
    (wedding_uuid, 'bride', 'Mr. Sharma', 'Mrs. Sharma'),
    (wedding_uuid, 'groom', 'Mr. Kumar', 'Mrs. Kumar');
END $$;

-- Verify the data
SELECT 
  w.*,
  (SELECT COUNT(*) FROM wedding_events WHERE wedding_id = w.id) as event_count,
  (SELECT COUNT(*) FROM wedding_families WHERE wedding_id = w.id) as family_count
FROM weddings w;

-- Show all events
SELECT 
  w.wedding_name,
  e.event_name,
  e.event_date,
  e.event_time,
  e.venue
FROM wedding_events e
JOIN weddings w ON w.id = e.wedding_id
ORDER BY w.wedding_name, e.order_index;