import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkGalleryData() {
  const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

  const { data, error } = await supabase
    .from('weddings')
    .select('gallery_images, bride_families, groom_families, bride_friends, groom_friends')
    .eq('id', weddingId)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== WEDDING DATA ===\n');

  console.log('Gallery Images:');
  console.log('Type:', typeof data.gallery_images);
  console.log('Is Array:', Array.isArray(data.gallery_images));
  console.log('Content:', JSON.stringify(data.gallery_images, null, 2));

  console.log('\n\nBride Families:');
  console.log('Type:', typeof data.bride_families);
  console.log('Is Array:', Array.isArray(data.bride_families));
  console.log('Content:', JSON.stringify(data.bride_families, null, 2));

  console.log('\n\nGroom Families:');
  console.log('Type:', typeof data.groom_families);
  console.log('Is Array:', Array.isArray(data.groom_families));
  console.log('Content:', JSON.stringify(data.groom_families, null, 2));

  console.log('\n\nBride Friends:');
  console.log('Type:', typeof data.bride_friends);
  console.log('Is Array:', Array.isArray(data.bride_friends));
  console.log('Content:', JSON.stringify(data.bride_friends, null, 2));

  console.log('\n\nGroom Friends:');
  console.log('Type:', typeof data.groom_friends);
  console.log('Is Array:', Array.isArray(data.groom_friends));
  console.log('Content:', JSON.stringify(data.groom_friends, null, 2));
}

checkGalleryData();
