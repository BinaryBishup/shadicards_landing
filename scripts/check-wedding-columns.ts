import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function checkColumns() {
  console.log('\n=== CHECKING WEDDINGS TABLE ===\n');

  const { data, error } = await supabase
    .from('weddings')
    .select('*')
    .eq('id', weddingId)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('All columns in weddings table:');
  console.log(Object.keys(data).sort());

  console.log('\n\nProtection-related fields:');
  console.log('status:', data.status);
  console.log('is_password_protected:', data.is_password_protected);
  console.log('password:', data.password);
  console.log('url_slug:', data.url_slug);
  console.log('visibility:', data.visibility);
  console.log('template_id:', data.template_id);

  console.log('\n\nVisibility toggles:');
  console.log('show_hero:', data.show_hero);
  console.log('show_about:', data.show_about);
  console.log('show_story:', data.show_story);
  console.log('show_gallery:', data.show_gallery);
  console.log('show_families:', data.show_families);
  console.log('show_wedding_party:', data.show_wedding_party);
  console.log('show_events:', data.show_events);
  console.log('show_chat:', data.show_chat);
}

checkColumns();
