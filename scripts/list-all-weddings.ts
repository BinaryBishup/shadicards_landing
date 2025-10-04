import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listWeddings() {
  console.log('\n=== LISTING ALL WEDDINGS ===\n');

  const { data, error } = await supabase
    .from('weddings')
    .select('id, bride_first_name, groom_first_name, is_active')
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('No weddings found');
    return;
  }

  console.log(`Found ${data.length} wedding(s):\n`);
  data.forEach((wedding, index) => {
    console.log(`${index + 1}. ${wedding.bride_first_name} & ${wedding.groom_first_name}`);
    console.log(`   ID: ${wedding.id}`);
    console.log(`   is_active: ${wedding.is_active}`);
    console.log('');
  });
}

listWeddings();
