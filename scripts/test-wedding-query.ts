import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

async function testQuery() {
  console.log('\n=== TESTING WEDDING QUERY (Same as WeddingPageContent) ===\n');
  console.log('Wedding ID:', weddingId);
  console.log('Using anon key (same as frontend)\n');

  // This is the exact query from WeddingPageContent.tsx
  const { data: weddingData, error: weddingError } = await supabase
    .from("weddings")
    .select("*")
    .eq("id", weddingId)
    .single();

  console.log('Query Result:');
  console.log('Error:', weddingError);
  console.log('Data:', weddingData ? 'Found' : 'NULL');

  if (weddingError) {
    console.log('\n❌ QUERY FAILED');
    console.log('Error Code:', weddingError.code);
    console.log('Error Message:', weddingError.message);
    console.log('Error Details:', weddingError.details);
    console.log('Error Hint:', weddingError.hint);

    if (weddingError.code === 'PGRST116') {
      console.log('\n⚠️  This means no rows were returned.');
      console.log('Possible causes:');
      console.log('1. Wedding ID does not exist');
      console.log('2. Row Level Security (RLS) is blocking access');
      console.log('3. Wedding was deleted');
    }

    if (weddingError.code === '42501') {
      console.log('\n⚠️  This is a RLS permission error.');
      console.log('The anon user does not have permission to read this row.');
    }
  } else {
    console.log('\n✅ QUERY SUCCESSFUL');
    console.log('Wedding:', weddingData.bride_first_name, '&', weddingData.groom_first_name);
    console.log('is_active:', weddingData.is_active);
  }

  console.log('\n=== CHECKING RLS POLICIES ===\n');
  console.log('Go to Supabase Dashboard → Database → weddings table → RLS');
  console.log('Make sure there is a policy that allows SELECT for anon users.');
  console.log('\nExample policy:');
  console.log('CREATE POLICY "Allow public read" ON weddings FOR SELECT USING (true);');
}

testQuery();
