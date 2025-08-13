const { createClient } = require('@supabase/supabase-js');

// Use hardcoded values for now (you can update these)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBucket() {
  try {
    console.log('🔍 Checking if guest-profiles bucket exists...');
    
    // List existing buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError);
      return;
    }

    // Check if bucket already exists
    const bucketExists = buckets?.some(bucket => bucket.name === 'guest-profiles');
    
    if (bucketExists) {
      console.log('✅ guest-profiles bucket already exists');
      return;
    }

    console.log('📦 Creating guest-profiles bucket...');
    
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('guest-profiles', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    });

    if (error) {
      console.error('❌ Error creating bucket:', error);
      console.log('\n💡 You may need to create the bucket manually in Supabase Dashboard');
      console.log('📋 Run the SQL commands in supabase/bucket-creation.sql');
      return;
    }

    console.log('✅ guest-profiles bucket created successfully!');
    console.log('📁 Bucket data:', data);
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    console.log('\n💡 If you see permission errors, you may need to use the service role key');
    console.log('📋 Or run the SQL commands in supabase/bucket-creation.sql in your Supabase Dashboard');
  }
}

// Run the script
console.log('🚀 Starting bucket creation...');
createBucket().then(() => {
  console.log('🏁 Script completed');
});