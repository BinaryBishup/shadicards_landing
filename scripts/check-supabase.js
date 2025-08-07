const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMjY2NjAsImV4cCI6MjA1MTkwMjY2MH0.xQPa0rnKLGm0OyeB-fgKL0dVoNkRBbLAq2kocVqSa0M';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('Checking Supabase database structure...\n');
  
  // Try to fetch weddings
  console.log('Fetching weddings table...');
  const { data: weddings, error: weddingsError } = await supabase
    .from('weddings')
    .select('*')
    .limit(5);
    
  if (weddingsError) {
    console.log('Error fetching weddings:', weddingsError.message);
  } else {
    console.log('Weddings found:', weddings?.length || 0);
    if (weddings && weddings.length > 0) {
      console.log('Sample wedding:', JSON.stringify(weddings[0], null, 2));
    }
  }
  
  // Try to fetch wedding_events
  console.log('\nFetching wedding_events table...');
  const { data: events, error: eventsError } = await supabase
    .from('wedding_events')
    .select('*')
    .limit(5);
    
  if (eventsError) {
    console.log('Error fetching wedding_events:', eventsError.message);
  } else {
    console.log('Events found:', events?.length || 0);
  }
  
  // Try to fetch templates if table exists
  console.log('\nFetching templates table...');
  const { data: templates, error: templatesError } = await supabase
    .from('templates')
    .select('*')
    .limit(5);
    
  if (templatesError) {
    console.log('Error fetching templates:', templatesError.message);
  } else {
    console.log('Templates found:', templates?.length || 0);
    if (templates && templates.length > 0) {
      console.log('Available templates:', templates.map(t => t.id || t.template_id));
    }
  }
}

checkDatabase();