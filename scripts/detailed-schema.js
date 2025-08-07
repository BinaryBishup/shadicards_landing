const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'sbp_da264d54fa2d9b467f0d6e13cf30d594af77c864'; // Using the service role key for full access
const supabase = createClient(supabaseUrl, supabaseKey);

async function getDetailedSchema() {
  console.log('🔍 Fetching Detailed Database Schema...\n');
  console.log('=' .repeat(60));
  
  try {
    // Get all tables in public schema
    console.log('📋 RETRIEVING ALL TABLES');
    console.log('-'.repeat(40));
    
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_schema_tables', { schema_name: 'public' });
    
    if (tablesError) {
      console.log('Using alternative method to get table information...\n');
      
      // Alternative: Query information_schema
      const { data: schemaData, error: schemaError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_type', 'BASE TABLE');
      
      if (schemaError) {
        console.log('Limited access - checking known tables manually...\n');
        await checkKnownTables();
        return;
      } else {
        console.log('Found tables:', schemaData.map(t => t.table_name));
      }
    }
    
    // Get detailed information for each table
    await getTableDetails();
    
    // Get RLS policies
    await getRLSPolicies();
    
    // Get indexes
    await getIndexes();
    
  } catch (error) {
    console.error('❌ Error fetching schema:', error.message);
    console.log('\n🔄 Falling back to manual table inspection...');
    await checkKnownTables();
  }
}

async function checkKnownTables() {
  const knownTables = [
    'weddings',
    'wedding_events', 
    'wedding_families',
    'wedding_guests',
    'wedding_gallery',
    'wedding_team'
  ];
  
  console.log('📊 INSPECTING KNOWN TABLES');
  console.log('-'.repeat(40));
  
  const schemaInfo = {};
  
  for (const tableName of knownTables) {
    console.log(`\n🔍 ${tableName.toUpperCase()}`);
    console.log('-'.repeat(25));
    
    try {
      // Check if table exists by trying to select from it
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .limit(0);
      
      if (error) {
        if (error.message.includes('does not exist')) {
          console.log('❌ Table does not exist');
          schemaInfo[tableName] = { exists: false };
        } else {
          console.log(`⚠️  Access restricted: ${error.message}`);
          schemaInfo[tableName] = { exists: true, error: error.message };
        }
      } else {
        console.log('✅ Table exists');
        console.log(`📊 Record count: ${count || 0}`);
        
        // Try to get a sample record to infer column structure
        const { data: sample } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (sample && sample.length > 0) {
          const columns = Object.keys(sample[0]);
          console.log(`📋 Columns (${columns.length}): ${columns.join(', ')}`);
          console.log('💾 Sample data available');
          
          schemaInfo[tableName] = {
            exists: true,
            columns: columns,
            recordCount: count,
            sampleData: sample[0]
          };
        } else {
          console.log('📋 Table is empty - cannot infer column structure');
          schemaInfo[tableName] = {
            exists: true,
            columns: [],
            recordCount: count,
            sampleData: null
          };
        }
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
      schemaInfo[tableName] = { exists: false, error: err.message };
    }
  }
  
  // Generate comprehensive report
  generateSchemaReport(schemaInfo);
}

async function getTableDetails() {
  console.log('\n📊 TABLE STRUCTURE DETAILS');
  console.log('-'.repeat(40));
  
  // This would require service role key or custom functions
  console.log('ℹ️  Detailed column information requires elevated permissions');
}

async function getRLSPolicies() {
  console.log('\n🔐 ROW LEVEL SECURITY POLICIES');
  console.log('-'.repeat(40));
  
  try {
    // This requires service role key
    const { data, error } = await supabase
      .from('pg_policies')
      .select('*');
    
    if (error) {
      console.log('ℹ️  RLS policy information requires elevated permissions');
    } else {
      console.log(`Found ${data?.length || 0} policies`);
      data?.forEach(policy => {
        console.log(`  📋 ${policy.tablename}: ${policy.policyname}`);
      });
    }
  } catch (err) {
    console.log('ℹ️  RLS policy access restricted');
  }
}

async function getIndexes() {
  console.log('\n📇 DATABASE INDEXES');
  console.log('-'.repeat(40));
  
  try {
    // This requires service role key
    console.log('ℹ️  Index information requires elevated permissions');
  } catch (err) {
    console.log('ℹ️  Index access restricted');
  }
}

function generateSchemaReport(schemaInfo) {
  console.log('\n' + '='.repeat(60));
  console.log('📄 COMPREHENSIVE SCHEMA REPORT');
  console.log('='.repeat(60));
  
  const existingTables = Object.entries(schemaInfo).filter(([_, info]) => info.exists);
  const missingTables = Object.entries(schemaInfo).filter(([_, info]) => !info.exists);
  
  console.log(`\n📈 SUMMARY:`);
  console.log(`   ✅ Existing tables: ${existingTables.length}`);
  console.log(`   ❌ Missing tables: ${missingTables.length}`);
  console.log(`   📊 Total records: ${existingTables.reduce((sum, [_, info]) => sum + (info.recordCount || 0), 0)}`);
  
  if (existingTables.length > 0) {
    console.log('\n📋 EXISTING TABLES:');
    existingTables.forEach(([table, info]) => {
      console.log(`\n  📁 ${table.toUpperCase()}`);
      console.log(`     📊 Records: ${info.recordCount || 0}`);
      
      if (info.columns && info.columns.length > 0) {
        console.log(`     📋 Columns (${info.columns.length}):`);
        info.columns.forEach(col => {
          const value = info.sampleData ? info.sampleData[col] : null;
          const type = value === null ? 'NULL' : typeof value === 'string' ? 'TEXT' : typeof value;
          console.log(`        • ${col} (${type})`);
        });
      } else {
        console.log('     📋 Columns: Unknown (empty table)');
      }
      
      if (info.sampleData) {
        console.log('     💾 Has sample data');
      }
    });
  }
  
  if (missingTables.length > 0) {
    console.log('\n❌ MISSING TABLES:');
    missingTables.forEach(([table, info]) => {
      console.log(`   • ${table}`);
    });
  }
  
  // Save detailed report
  const fs = require('fs');
  const fullReport = {
    timestamp: new Date().toISOString(),
    summary: {
      existingTables: existingTables.length,
      missingTables: missingTables.length,
      totalRecords: existingTables.reduce((sum, [_, info]) => sum + (info.recordCount || 0), 0)
    },
    tables: schemaInfo
  };
  
  fs.writeFileSync('detailed-schema-report.json', JSON.stringify(fullReport, null, 2));
  console.log('\n💾 Detailed report saved to: detailed-schema-report.json');
}

// Run the analysis
getDetailedSchema();