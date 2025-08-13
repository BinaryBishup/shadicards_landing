# 📦 Supabase Storage Bucket Setup

Since automatic bucket creation requires admin permissions, please follow these manual steps:

## Method 1: Using Supabase Dashboard (Recommended)

### 1. Go to Storage in Supabase Dashboard
1. Open your Supabase project: https://supabase.com/dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New Bucket**

### 2. Create the Bucket
- **Bucket Name**: `guest-profiles`
- **Public**: ✅ **Yes** (check this box)
- **File Size Limit**: `5 MB`
- **Allowed MIME Types**: 
  - `image/jpeg`
  - `image/jpg` 
  - `image/png`
  - `image/webp`
  - `image/gif`

### 3. Configure Policies (if needed)
The bucket should automatically get public read/write policies since it's marked as public.

---

## Method 2: Using SQL Editor

If you prefer SQL, go to **SQL Editor** in your Supabase dashboard and run:

```sql
-- Create the guest-profiles storage bucket
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
```

---

## ✅ Verification

After creating the bucket, you should see:
1. `guest-profiles` bucket in Storage section
2. Public access enabled
3. 5MB file size limit
4. Allowed image formats

## 🧪 Test Upload

Once the bucket is created, try uploading a profile picture through the guest edit form to verify everything works!

---

**Note**: The app will now automatically handle uploads once the bucket exists. All the upload logic is already implemented in the code.