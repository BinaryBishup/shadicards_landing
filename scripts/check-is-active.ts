import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function checkIsActive() {
  console.log('\n=== CHECKING WEDDING is_active STATUS ===\n');

  const { data, error } = await supabase
    .from('weddings')
    .select('id, bride_first_name, groom_first_name, is_active')
    .eq('id', weddingId)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Wedding:', data.bride_first_name, '&', data.groom_first_name);
  console.log('Wedding ID:', data.id);
  console.log('is_active:', data.is_active);
  console.log('\nBehavior:');
  if (data.is_active === true) {
    console.log('✅ Wedding is ACTIVE - Page loads normally');
  } else if (data.is_active === false) {
    console.log('❌ Wedding is INACTIVE - Redirects to homepage');
  } else {
    console.log('⚠️  is_active is NULL - Treated as ACTIVE (defaults to true)');
  }

  console.log('\nTo change:');
  console.log('  Set INACTIVE: npx tsx scripts/set-inactive.ts');
  console.log('  Set ACTIVE:   npx tsx scripts/reset-to-active.ts');
}

checkIsActive();
