const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'sb_publishable_OQFqjlsqpMz9ar0s3xlG_w_SjhdY0M1';
const supabase = createClient(supabaseUrl, supabaseKey);

async function manualSchemaCheck() {
  console.log('🔍 MANUAL SCHEMA INSPECTION');
  console.log('Using publishable key with direct table access');
  console.log('=' .repeat(60));
  
  const knownTables = [
    'weddings',
    'wedding_events', 
    'wedding_families',
    'wedding_guests',
    'wedding_gallery',
    'wedding_team'
  ];
  
  const schemaResults = {};
  
  for (const tableName of knownTables) {
    console.log(`\n🔍 ANALYZING: ${tableName.toUpperCase()}`);
    console.log('-'.repeat(40));
    
    try {
      // Test basic access
      const { data: testData, error: testError, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .limit(1);
      
      if (testError) {
        if (testError.message.includes('does not exist')) {
          console.log('❌ Table does not exist in database');
          schemaResults[tableName] = {
            exists: false,
            reason: 'Table not found'
          };
        } else {
          console.log(`⚠️  Error accessing table: ${testError.message}`);
          schemaResults[tableName] = {
            exists: 'unknown',
            error: testError.message
          };
        }
        continue;
      }
      
      console.log('✅ Table exists and is accessible');
      console.log(`📊 Total records: ${count || 0}`);
      
      // Try to infer schema from the table structure
      if (testData && testData.length > 0) {
        const sampleRecord = testData[0];
        const columns = Object.keys(sampleRecord);
        
        console.log(`📋 Columns found: ${columns.length}`);
        columns.forEach(col => {
          const value = sampleRecord[col];
          let inferredType = 'NULL';
          
          if (value !== null) {
            if (typeof value === 'string') {
              if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                inferredType = 'DATE';
              } else if (value.match(/^\d{4}-\d{2}-\d{2}T/)) {
                inferredType = 'TIMESTAMP';
              } else if (value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
                inferredType = 'UUID';
              } else {
                inferredType = 'VARCHAR/TEXT';
              }
            } else if (typeof value === 'number') {
              inferredType = Number.isInteger(value) ? 'INTEGER' : 'NUMERIC';
            } else if (typeof value === 'boolean') {
              inferredType = 'BOOLEAN';
            } else {
              inferredType = typeof value;
            }
          }
          
          console.log(`   • ${col}: ${inferredType}${value !== null ? ` (sample: ${JSON.stringify(value)})` : ''}`);
        });
        
        schemaResults[tableName] = {
          exists: true,
          recordCount: count,
          columns: columns.map(col => ({
            name: col,
            inferredType: getInferredType(testData[0][col]),
            sampleValue: testData[0][col]
          })),
          hasData: true
        };
      } else {
        console.log('📋 Table is empty - cannot infer column structure from data');
        console.log('💡 Checking if we can get column names from empty select...');
        
        // Try a different approach for empty tables
        try {
          const { data: emptyData, error: emptyError } = await supabase
            .from(tableName)
            .select('*')
            .limit(0);
          
          if (!emptyError) {
            console.log('✅ Empty select successful - table structure is accessible');
          }
        } catch (e) {
          console.log('⚠️  Cannot determine column structure');
        }
        
        schemaResults[tableName] = {
          exists: true,
          recordCount: count || 0,
          columns: [],
          hasData: false,
          note: 'Table exists but is empty'
        };
      }
      
    } catch (err) {
      console.log(`❌ Unexpected error: ${err.message}`);
      schemaResults[tableName] = {
        exists: 'error',
        error: err.message
      };
    }
  }
  
  // Generate comprehensive report
  generateReport(schemaResults);
}

function getInferredType(value) {
  if (value === null) return 'NULL';
  
  if (typeof value === 'string') {
    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) return 'DATE';
    if (value.match(/^\d{4}-\d{2}-\d{2}T/)) return 'TIMESTAMPTZ';
    if (value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) return 'UUID';
    return 'VARCHAR/TEXT';
  }
  
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'INTEGER' : 'NUMERIC';
  }
  
  if (typeof value === 'boolean') return 'BOOLEAN';
  
  return typeof value;
}

function generateReport(results) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL SCHEMA ANALYSIS REPORT');
  console.log('='.repeat(60));
  
  const existing = Object.entries(results).filter(([_, info]) => info.exists === true);
  const missing = Object.entries(results).filter(([_, info]) => info.exists === false);
  const errors = Object.entries(results).filter(([_, info]) => info.exists === 'error' || info.exists === 'unknown');
  
  console.log('\n📈 OVERVIEW:');
  console.log(`   ✅ Confirmed existing: ${existing.length}`);
  console.log(`   ❌ Confirmed missing: ${missing.length}`);
  console.log(`   ⚠️  Errors/Unknown: ${errors.length}`);
  
  if (existing.length > 0) {
    console.log('\n✅ EXISTING TABLES WITH DETAILS:');
    existing.forEach(([table, info]) => {
      console.log(`\n📁 ${table.toUpperCase()}`);
      console.log(`   📊 Records: ${info.recordCount}`);
      console.log(`   📋 Columns: ${info.columns?.length || 0}`);
      
      if (info.columns && info.columns.length > 0) {
        console.log('   📝 Column Structure:');
        info.columns.forEach(col => {
          console.log(`      • ${col.name} (${col.inferredType})`);
        });
      }
      
      if (info.hasData && info.columns && info.columns.length > 0) {
        console.log('   💾 Sample Record:');
        info.columns.forEach(col => {
          console.log(`      ${col.name}: ${JSON.stringify(col.sampleValue)}`);
        });
      }
    });
  }
  
  if (missing.length > 0) {
    console.log('\n❌ MISSING TABLES:');
    missing.forEach(([table, info]) => {
      console.log(`   • ${table} (${info.reason})`);
    });
  }
  
  if (errors.length > 0) {
    console.log('\n⚠️  TABLES WITH ISSUES:');
    errors.forEach(([table, info]) => {
      console.log(`   • ${table}: ${info.error}`);
    });
  }
  
  // Save the report
  const fs = require('fs');
  const report = {
    timestamp: new Date().toISOString(),
    analysis: {
      existingTables: existing.length,
      missingTables: missing.length,
      errorTables: errors.length,
      totalRecords: existing.reduce((sum, [_, info]) => sum + (info.recordCount || 0), 0)
    },
    tables: results
  };
  
  fs.writeFileSync('manual-schema-analysis.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Report saved to: manual-schema-analysis.json');
  
  // Generate SQL recreation script if needed
  generateSQLRecreation(existing);
}

function generateSQLRecreation(existingTables) {
  if (existingTables.length === 0) return;
  
  console.log('\n🔧 SQL RECREATION SCRIPT HINTS:');
  console.log('-'.repeat(40));
  
  existingTables.forEach(([table, info]) => {
    if (info.columns && info.columns.length > 0) {
      console.log(`\n-- ${table.toUpperCase()} table structure inferred:`);
      console.log(`CREATE TABLE ${table} (`);
      
      info.columns.forEach((col, index) => {
        const comma = index < info.columns.length - 1 ? ',' : '';
        console.log(`  ${col.name} ${col.inferredType}${comma}`);
      });
      
      console.log(');');
    }
  });
}

// Run the analysis
manualSchemaCheck();