-- Create the guest-profiles storage bucket if it doesn't exist
DO $$
BEGIN
    -- Insert the bucket if it doesn't exist
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
        'guest-profiles',
        'guest-profiles', 
        true,
        5242880, -- 5MB
        ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    )
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Create RLS policies for the guest-profiles bucket

-- Policy to allow guests to upload their own profile pictures
CREATE POLICY "Guests can upload profile pictures" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'guest-profiles' 
    AND (storage.foldername(name))[1] = 'profile-pictures'
  );

-- Policy to allow public access to view profile pictures
CREATE POLICY "Anyone can view profile pictures" ON storage.objects
  FOR SELECT USING (bucket_id = 'guest-profiles');

-- Policy to allow guests to update their own profile pictures
CREATE POLICY "Guests can update their profile pictures" ON storage.objects
  FOR UPDATE USING (bucket_id = 'guest-profiles');

-- Policy to allow guests to delete their own profile pictures
CREATE POLICY "Guests can delete their profile pictures" ON storage.objects
  FOR DELETE USING (bucket_id = 'guest-profiles');

-- Enable RLS on the objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;