-- Create the guest-profiles storage bucket (Simplified Version)
-- Run this in your Supabase SQL Editor

-- Create the bucket only
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

-- Verify the bucket was created
SELECT 
    id, 
    name, 
    public, 
    file_size_limit, 
    allowed_mime_types
FROM storage.buckets 
WHERE name = 'guest-profiles';