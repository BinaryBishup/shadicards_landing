import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function checkWebsiteExists() {
  console.log('\n=== CHECKING FOR WEDDING_WEBSITE RECORD ===\n');

  // Try to get all wedding_website records for this wedding
  const { data: allRecords, error: allError } = await supabase
    .from('wedding_website')
    .select('*')
    .eq('wedding_id', weddingId);

  console.log('Query for wedding_id:', weddingId);
  console.log('Number of records found:', allRecords?.length || 0);

  if (allRecords && allRecords.length > 0) {
    console.log('\nRecord found:');
    console.log(JSON.stringify(allRecords[0], null, 2));
  } else {
    console.log('\nNo wedding_website record exists for this wedding!');
    console.log('Creating one now...\n');

    // Create a wedding_website record
    const { data: newRecord, error: insertError} = await supabase
      .from('wedding_website')
      .insert({
        wedding_id: weddingId,
        status: 'active',
        is_password_protected: false,
        password: null,
        show_hero: true,
        show_about: true,
        show_story: true,
        show_gallery: true,
        show_families: true,
        show_wedding_party: true,
        show_chat: false
      })
      .select();

    if (insertError) {
      console.error('Error creating record:', insertError);
    } else {
      console.log('✅ Created wedding_website record successfully!');
      console.log(JSON.stringify(newRecord[0], null, 2));
    }
  }
}

checkWebsiteExists();
