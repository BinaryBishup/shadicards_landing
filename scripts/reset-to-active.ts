import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetToActive() {
  const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

  const { data, error } = await supabase
    .from('weddings')
    .update({
      is_active: true
    })
    .eq('id', weddingId)
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ Wedding set to ACTIVE (is_active = true)');
    console.log('URL: http://localhost:3000/wedding/' + weddingId + '?guest=4500be3b-f078-4f2f-bec8-9861609f82dd');
    console.log('Expected: Wedding page loads normally');
  }
}

resetToActive();
