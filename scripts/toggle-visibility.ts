import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function toggleVisibility() {
  // Get current values
  const { data: current } = await supabase
    .from('weddings')
    .select('show_hero, show_about, show_story, show_gallery, show_families, show_wedding_party, show_events, show_chat')
    .eq('id', weddingId)
    .single();

  console.log('\n=== CURRENT VISIBILITY SETTINGS ===\n');
  console.log(current);

  // Example: Hide the gallery section
  console.log('\n=== TOGGLING GALLERY TO FALSE ===\n');
  const { data: updated, error } = await supabase
    .from('weddings')
    .update({ show_gallery: false })
    .eq('id', weddingId)
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Updated successfully!');
    console.log('New show_gallery value:', updated[0].show_gallery);
  }

  console.log('\n=== TO REVERT ===');
  console.log('Run this to show gallery again:');
  console.log('UPDATE weddings SET show_gallery = true WHERE id = \'' + weddingId + '\';');
}

toggleVisibility();
