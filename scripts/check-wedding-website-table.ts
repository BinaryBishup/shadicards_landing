import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function checkWeddingWebsite() {
  console.log('\n=== CHECKING WEDDING_WEBSITE TABLE ===\n');

  const { data, error } = await supabase
    .from('wedding_website')
    .select('*')
    .eq('wedding_id', weddingId)
    .single();

  if (error) {
    console.error('Error:', error);
    console.log('\n=== TABLE MIGHT NOT EXIST OR NO RECORD FOUND ===');
    return;
  }

  console.log('Wedding Website Data:', data);
  console.log('\nVisibility Settings:');
  console.log('show_hero:', data.show_hero);
  console.log('show_about:', data.show_about);
  console.log('show_story:', data.show_story);
  console.log('show_gallery:', data.show_gallery);
  console.log('show_families:', data.show_families);
  console.log('show_wedding_party:', data.show_wedding_party);
  console.log('show_events:', data.show_events);
  console.log('show_chat:', data.show_chat);
}

checkWeddingWebsite();
