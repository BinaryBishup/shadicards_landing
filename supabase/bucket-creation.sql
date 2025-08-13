-- Manual bucket creation script for Supabase Dashboard
-- Run this in the SQL Editor if automatic bucket creation doesn't work

-- 1. Create the guest-profiles storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'guest-profiles',
    'guest-profiles', 
    true,
    5242880, -- 5MB in bytes
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- 2. Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for the guest-profiles bucket
-- Allow anyone to upload profile pictures
DROP POLICY IF EXISTS "Anyone can upload profile pictures" ON storage.objects;
CREATE POLICY "Anyone can upload profile pictures" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'guest-profiles');

-- Allow anyone to view profile pictures (public bucket)
DROP POLICY IF EXISTS "Anyone can view profile pictures" ON storage.objects;
CREATE POLICY "Anyone can view profile pictures" ON storage.objects
  FOR SELECT USING (bucket_id = 'guest-profiles');

-- Allow anyone to update profile pictures
DROP POLICY IF EXISTS "Anyone can update profile pictures" ON storage.objects;
CREATE POLICY "Anyone can update profile pictures" ON storage.objects
  FOR UPDATE USING (bucket_id = 'guest-profiles');

-- Allow anyone to delete profile pictures
DROP POLICY IF EXISTS "Anyone can delete profile pictures" ON storage.objects;
CREATE POLICY "Anyone can delete profile pictures" ON storage.objects
  FOR DELETE USING (bucket_id = 'guest-profiles');

-- Verify the bucket was created
SELECT 
    id, 
    name, 
    public, 
    file_size_limit, 
    allowed_mime_types
FROM storage.buckets 
WHERE name = 'guest-profiles';