const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '..', 'supabase', 'create_customer_queries_table.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Creating customer_queries table...');

    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });

    if (error) {
      console.error('Error creating table:', error);

      // If RPC function doesn't exist, try direct query
      console.log('Trying direct query method...');
      const { error: queryError } = await supabase.from('customer_queries').select('*').limit(1);

      if (queryError && queryError.message.includes('relation "customer_queries" does not exist')) {
        console.error('Table does not exist and could not be created automatically.');
        console.log('\nPlease run this SQL manually in your Supabase SQL Editor:');
        console.log('\n' + sql);
      } else if (!queryError) {
        console.log('Table already exists!');
      }
    } else {
      console.log('Table created successfully!', data);
    }

    // Test the table by checking if it exists
    const { data: testData, error: testError } = await supabase
      .from('customer_queries')
      .select('*')
      .limit(1);

    if (testError) {
      console.error('Table verification failed:', testError.message);
      console.log('\nPlease run this SQL manually in your Supabase SQL Editor:');
      console.log('\n' + sql);
    } else {
      console.log('✓ Table verified successfully!');
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

createTable();