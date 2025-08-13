import { supabase } from './supabase';

/**
 * Ensures the guest-profiles bucket exists and creates it if it doesn't
 */
export async function ensureStorageBucket() {
  try {
    // First, try to get the bucket info
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }

    // Check if guest-profiles bucket exists
    const bucketExists = buckets?.some(bucket => bucket.name === 'guest-profiles');
    
    if (bucketExists) {
      console.log('✅ guest-profiles bucket already exists');
      return true;
    }

    // Create the bucket if it doesn't exist
    console.log('Creating guest-profiles bucket...');
    const { data: createData, error: createError } = await supabase.storage.createBucket('guest-profiles', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    });

    if (createError) {
      console.error('Error creating bucket:', createError);
      return false;
    }

    console.log('✅ guest-profiles bucket created successfully');
    return true;
  } catch (error) {
    console.error('Error in ensureStorageBucket:', error);
    return false;
  }
}

/**
 * Uploads a file to the guest-profiles bucket
 */
export async function uploadProfilePicture(file: File, guestId?: string) {
  try {
    // Ensure bucket exists first
    const bucketReady = await ensureStorageBucket();
    if (!bucketReady) {
      throw new Error('Storage bucket is not ready');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = guestId 
      ? `${guestId}_${Date.now()}.${fileExt}` 
      : `profile_${Date.now()}.${fileExt}`;
    const filePath = `profile-pictures/${fileName}`;

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('guest-profiles')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('guest-profiles')
      .getPublicUrl(filePath);

    return {
      success: true,
      publicUrl,
      filePath
    };
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

/**
 * Deletes a profile picture from storage
 */
export async function deleteProfilePicture(filePath: string) {
  try {
    const { error } = await supabase.storage
      .from('guest-profiles')
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed'
    };
  }
}