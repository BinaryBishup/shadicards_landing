import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function checkCurrentStatus() {
  console.log('\n=== CHECKING CURRENT STATUS ===\n');

  // Check wedding_website table
  const { data: websiteData, error: websiteError } = await supabase
    .from('wedding_website')
    .select('*')
    .eq('wedding_id', weddingId)
    .single();

  if (websiteError) {
    console.error('Error querying wedding_website:', websiteError);
    console.log('\nNo wedding_website record exists!');
    console.log('The status checking will not work without a wedding_website record.');
    console.log('\nYou need to create one first. The user should do this in their admin panel.');
    return;
  }

  console.log('Wedding Website Record Found:');
  console.log('ID:', websiteData.id);
  console.log('Wedding ID:', websiteData.wedding_id);
  console.log('Status:', websiteData.status);
  console.log('Is Password Protected:', websiteData.is_password_protected);
  console.log('Password:', websiteData.password);
  console.log('\nVisibility Settings:');
  console.log('  show_hero:', websiteData.show_hero);
  console.log('  show_about:', websiteData.show_about);
  console.log('  show_story:', websiteData.show_story);
  console.log('  show_gallery:', websiteData.show_gallery);
  console.log('  show_families:', websiteData.show_families);
  console.log('  show_wedding_party:', websiteData.show_wedding_party);
  console.log('  show_chat:', websiteData.show_chat);
}

checkCurrentStatus();
