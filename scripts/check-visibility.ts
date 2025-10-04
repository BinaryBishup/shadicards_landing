import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function checkVisibility() {
  const { data, error } = await supabase
    .from('weddings')
    .select('show_hero, show_about, show_story, show_gallery, show_families, show_wedding_party, show_events, show_chat')
    .eq('id', weddingId)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== CURRENT VISIBILITY SETTINGS ===\n');
  console.log('show_hero:', data.show_hero, '→', data.show_hero !== false ? 'WILL SHOW' : 'WILL HIDE');
  console.log('show_about:', data.show_about, '→', data.show_about !== false ? 'WILL SHOW' : 'WILL HIDE');
  console.log('show_story:', data.show_story, '→', data.show_story !== false ? 'WILL SHOW' : 'WILL HIDE');
  console.log('show_gallery:', data.show_gallery, '→', data.show_gallery !== false ? 'WILL SHOW' : 'WILL HIDE');
  console.log('show_families:', data.show_families, '→', data.show_families !== false ? 'WILL SHOW' : 'WILL HIDE');
  console.log('show_wedding_party:', data.show_wedding_party, '→', data.show_wedding_party !== false ? 'WILL SHOW' : 'WILL HIDE');
  console.log('show_events:', data.show_events, '→', data.show_events !== false ? 'WILL SHOW' : 'WILL HIDE');
  console.log('show_chat:', data.show_chat, '→', data.show_chat === true ? 'WILL SHOW' : 'WILL HIDE');

  console.log('\n=== LOGIC EXPLANATION ===');
  console.log('- Values that are true or null → Section SHOWS (default behavior)');
  console.log('- Values that are false → Section HIDES');
  console.log('- show_chat is special: Only shows when explicitly true\n');
}

checkVisibility();
