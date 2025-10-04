import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
// You need to get your service_role key from Supabase Dashboard → Settings → API
// NEVER commit this key to git or share it publicly!
const serviceRoleKey = 'YOUR_SERVICE_ROLE_KEY_HERE';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function checkWithServiceKey() {
  console.log('\n=== CHECKING WITH SERVICE ROLE KEY (Bypasses RLS) ===\n');

  const { data, error } = await supabase
    .from('weddings')
    .select('id, bride_first_name, groom_first_name, is_active')
    .eq('id', weddingId)
    .single();

  if (error) {
    console.error('Error:', error);
    console.log('\n❌ Wedding does NOT exist in database');
    return;
  }

  console.log('✅ Wedding EXISTS in database:');
  console.log('Wedding:', data.bride_first_name, '&', data.groom_first_name);
  console.log('ID:', data.id);
  console.log('is_active:', data.is_active);
  console.log('\nThe wedding exists, so the issue is RLS blocking anon access.');
  console.log('Run the SQL policy from the previous message to fix it.');
}

checkWithServiceKey();
