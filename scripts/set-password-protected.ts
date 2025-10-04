import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setPasswordProtected() {
  const weddingId = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';
  const testPassword = 'wedding123';

  const { data, error } = await supabase
    .from('wedding_website')
    .update({
      status: 'active',
      is_password_protected: true,
      password: testPassword
    })
    .eq('wedding_id', weddingId)
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ Wedding is now password protected!');
    console.log('Password:', testPassword);
    console.log('URL: http://localhost:3000/wedding/' + weddingId + '?guest=4500be3b-f078-4f2f-bec8-9861609f82dd');
  }
}

setPasswordProtected();
