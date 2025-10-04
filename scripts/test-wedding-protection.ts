import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function testProtection() {
  console.log('\n=== WEDDING PROTECTION TEST SUITE ===\n');

  // Get current settings
  const { data: current } = await supabase
    .from('wedding_website')
    .select('status, is_password_protected, password')
    .eq('wedding_id', weddingId)
    .single();

  console.log('Current Settings:');
  console.log('  Status:', current?.status);
  console.log('  Password Protected:', current?.is_password_protected);
  console.log('  Password:', current?.password);
  console.log('\n');

  // Show test scenarios
  console.log('=== TEST SCENARIOS ===\n');

  console.log('1. Test Active + No Password:');
  console.log('   UPDATE wedding_website SET status = \'active\', is_password_protected = false WHERE wedding_id = \'' + weddingId + '\';');
  console.log('   Expected: Wedding page loads normally\n');

  console.log('2. Test Active + Password Protected:');
  console.log('   UPDATE wedding_website SET status = \'active\', is_password_protected = true, password = \'test123\' WHERE wedding_id = \'' + weddingId + '\';');
  console.log('   Expected: Shows password prompt, correct password = "test123"\n');

  console.log('3. Test Inactive Status:');
  console.log('   UPDATE wedding_website SET status = \'inactive\' WHERE wedding_id = \'' + weddingId + '\';');
  console.log('   Expected: Shows "This Page is Hidden" message\n');

  console.log('4. Test Draft Status:');
  console.log('   UPDATE wedding_website SET status = \'draft\' WHERE wedding_id = \'' + weddingId + '\';');
  console.log('   Expected: Shows password prompt (draft mode)\n');

  console.log('\n=== QUICK TOGGLE FUNCTIONS ===\n');

  console.log('Run these to test different states:\n');
  console.log('// Make it password protected');
  console.log('npx tsx scripts/set-password-protected.ts\n');

  console.log('// Make it inactive');
  console.log('npx tsx scripts/set-inactive.ts\n');

  console.log('// Reset to normal (active, no password)');
  console.log('npx tsx scripts/reset-to-active.ts\n');
}

testProtection();
