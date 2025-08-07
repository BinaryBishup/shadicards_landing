const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'sb_publishable_OQFqjlsqpMz9ar0s3xlG_w_SjhdY0M1';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchDatabaseSchema() {
  console.log('Fetching Database Schema...\n');
  console.log('=' .repeat(50));
  
  try {
    // Fetch all tables
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_tables_info', {}, { 
        get: true,
        head: false 
      })
      .single();
    
    if (tablesError) {
      console.log('Note: Direct schema access may be restricted with publishable key.');
      console.log('Attempting to infer schema from available tables...\n');
    }
    
    // Try to fetch from known tables
    const knownTables = [
      'weddings',
      'wedding_events', 
      'wedding_families',
      'wedding_guests',
      'wedding_gallery',
      'wedding_team'
    ];
    
    const schemaInfo = {};
    
    for (const tableName of knownTables) {
      console.log(`\nChecking table: ${tableName}`);
      console.log('-'.repeat(40));
      
      try {
        // Try to fetch one row to understand structure
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ Table '${tableName}' - Error: ${error.message}`);
        } else {
          console.log(`✅ Table '${tableName}' exists`);
          
          if (data && data.length > 0) {
            const columns = Object.keys(data[0]);
            console.log(`   Columns: ${columns.join(', ')}`);
            schemaInfo[tableName] = {
              exists: true,
              columns: columns,
              sampleData: data[0]
            };
          } else {
            console.log(`   Status: Empty table (no data)`);
            schemaInfo[tableName] = {
              exists: true,
              columns: [],
              sampleData: null
            };
          }
          
          // Get count
          const { count } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });
          
          console.log(`   Records: ${count || 0}`);
        }
      } catch (err) {
        console.log(`❌ Table '${tableName}' - Error: ${err.message}`);
        schemaInfo[tableName] = {
          exists: false,
          error: err.message
        };
      }
    }
    
    // Generate documentation
    console.log('\n' + '='.repeat(50));
    console.log('SCHEMA DOCUMENTATION');
    console.log('='.repeat(50) + '\n');
    
    for (const [table, info] of Object.entries(schemaInfo)) {
      if (info.exists) {
        console.log(`📁 ${table.toUpperCase()}`);
        if (info.columns && info.columns.length > 0) {
          console.log('   Columns:');
          info.columns.forEach(col => {
            const value = info.sampleData ? info.sampleData[col] : null;
            const type = value === null ? 'unknown' : typeof value;
            console.log(`     - ${col} (${type})`);
          });
        }
        console.log('');
      }
    }
    
    // Save to file
    const fs = require('fs');
    const documentation = JSON.stringify(schemaInfo, null, 2);
    fs.writeFileSync('database-schema.json', documentation);
    console.log('📄 Schema saved to database-schema.json');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchDatabaseSchema();