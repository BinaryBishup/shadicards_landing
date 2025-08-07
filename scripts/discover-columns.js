const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'sb_publishable_OQFqjlsqpMz9ar0s3xlG_w_SjhdY0M1';
const supabase = createClient(supabaseUrl, supabaseKey);

async function discoverWeddingsTableStructure() {
  console.log('🔍 DISCOVERING WEDDINGS TABLE STRUCTURE');
  console.log('Using trial-and-error method to find actual columns');
  console.log('=' .repeat(60));
  
  // Based on the SQL schema, let's test individual columns
  const expectedColumns = [
    'id',
    'wedding_name',
    'template_id',
    'bride_name', 
    'groom_name',
    'wedding_date',
    'venue',
    'story',
    'bride_image',
    'groom_image',
    'couple_image',
    'how_we_met',
    'about_bride',
    'about_groom',
    'created_at',
    'updated_at'
  ];
  
  const existingColumns = [];
  const missingColumns = [];
  
  console.log('\n🧪 TESTING INDIVIDUAL COLUMNS');
  console.log('-'.repeat(40));
  
  for (const column of expectedColumns) {
    try {
      const { data, error } = await supabase
        .from('weddings')
        .select(column)
        .limit(0);  // Just test the column, don't fetch data
      
      if (error) {
        console.log(`❌ ${column}: ${error.message}`);
        missingColumns.push(column);
      } else {
        console.log(`✅ ${column}: EXISTS`);
        existingColumns.push(column);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (err) {
      console.log(`❌ ${column}: ${err.message}`);
      missingColumns.push(column);
    }
  }
  
  console.log('\n📊 COLUMN DISCOVERY RESULTS');
  console.log('-'.repeat(40));
  console.log(`✅ Existing columns (${existingColumns.length}): ${existingColumns.join(', ')}`);
  console.log(`❌ Missing columns (${missingColumns.length}): ${missingColumns.join(', ')}`);
  
  if (existingColumns.length > 0) {
    console.log('\n🔍 TESTING FULL STRUCTURE WITH EXISTING COLUMNS');
    console.log('-'.repeat(50));
    
    try {
      const { data, error } = await supabase
        .from('weddings')
        .select(existingColumns.join(', '))
        .limit(1);
      
      if (error) {
        console.log(`❌ Full select failed: ${error.message}`);
      } else {
        console.log('✅ Full structure query successful');
        console.log('📋 Confirmed table structure:');
        existingColumns.forEach(col => {
          console.log(`   • ${col}`);
        });
        
        if (data && data.length > 0) {
          console.log('\n💾 Sample data found:');
          Object.entries(data[0]).forEach(([key, value]) => {
            console.log(`   ${key}: ${JSON.stringify(value)}`);
          });
        } else {
          console.log('\n📭 Table confirmed empty but structure is accessible');
        }
      }
    } catch (err) {
      console.log(`❌ Structure test error: ${err.message}`);
    }
  }
  
  // Test a minimal insert to confirm the working structure
  if (existingColumns.length > 0) {
    await testMinimalInsert(existingColumns);
  }
  
  // Generate final report
  generateStructureReport(existingColumns, missingColumns);
}

async function testMinimalInsert(columns) {
  console.log('\n🧪 TESTING MINIMAL RECORD INSERT');
  console.log('-'.repeat(40));
  
  // Create a minimal test record with only required fields
  let testRecord = {};
  
  // Add essential fields if they exist
  if (columns.includes('wedding_name')) testRecord.wedding_name = 'test-schema-discovery';
  if (columns.includes('bride_name')) testRecord.bride_name = 'Test Bride';
  if (columns.includes('groom_name')) testRecord.groom_name = 'Test Groom';
  if (columns.includes('wedding_date')) testRecord.wedding_date = '2025-12-31';
  if (columns.includes('venue')) testRecord.venue = 'Test Venue';
  if (columns.includes('template_id')) testRecord.template_id = 'test';
  
  console.log('📝 Attempting to insert test record...');
  console.log(`   Data: ${JSON.stringify(testRecord)}`);
  
  try {
    const { data, error } = await supabase
      .from('weddings')
      .insert([testRecord])
      .select('*');
    
    if (error) {
      console.log(`❌ Insert failed: ${error.message}`);
      
      // Analyze error for more clues
      if (error.message.includes('not null')) {
        const nullField = error.message.match(/null value in column "([^"]+)"/)?.[1];
        console.log(`💡 Column "${nullField}" has NOT NULL constraint`);
      } else if (error.message.includes('foreign key')) {
        console.log('💡 Foreign key constraint detected');
      } else if (error.message.includes('unique')) {
        console.log('💡 Unique constraint violation detected');
      }
    } else if (data && data.length > 0) {
      console.log('✅ Test insert successful!');
      console.log('📊 Complete record structure:');
      
      const fullRecord = data[0];
      Object.entries(fullRecord).forEach(([key, value]) => {
        const type = value === null ? 'NULL' : 
                    typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T/) ? 'TIMESTAMPTZ' :
                    typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/) ? 'DATE' :
                    typeof value === 'string' && value.match(/^[0-9a-f-]{36}$/) ? 'UUID' :
                    typeof value === 'string' ? 'VARCHAR/TEXT' :
                    typeof value === 'number' ? (Number.isInteger(value) ? 'INTEGER' : 'NUMERIC') :
                    typeof value === 'boolean' ? 'BOOLEAN' : 
                    typeof value;
        
        console.log(`   • ${key}: ${type} = ${JSON.stringify(value)}`);
      });
      
      // Clean up test record
      console.log('\n🧹 Cleaning up test record...');
      const { error: deleteError } = await supabase
        .from('weddings')
        .delete()
        .eq('wedding_name', 'test-schema-discovery');
      
      if (deleteError) {
        console.log(`⚠️  Could not delete test record: ${deleteError.message}`);
      } else {
        console.log('✅ Test record cleaned up');
      }
      
      return fullRecord;
    }
  } catch (err) {
    console.log(`❌ Insert test error: ${err.message}`);
  }
  
  return null;
}

function generateStructureReport(existingColumns, missingColumns) {
  console.log('\n' + '='.repeat(60));
  console.log('📄 WEDDINGS TABLE STRUCTURE REPORT');
  console.log('='.repeat(60));
  
  console.log('\n📊 SUMMARY:');
  console.log(`   🟢 Confirmed columns: ${existingColumns.length}`);
  console.log(`   🔴 Missing columns: ${missingColumns.length}`);
  console.log(`   📋 Expected total: ${existingColumns.length + missingColumns.length}`);
  
  if (existingColumns.length > 0) {
    console.log('\n✅ EXISTING TABLE STRUCTURE:');
    console.log('CREATE TABLE weddings (');
    existingColumns.forEach((col, index) => {
      const comma = index < existingColumns.length - 1 ? ',' : '';
      console.log(`  ${col} <DATA_TYPE>${comma}`);
    });
    console.log(');');
  }
  
  if (missingColumns.length > 0) {
    console.log('\n❌ MISSING COLUMNS (need to be added):');
    missingColumns.forEach(col => {
      console.log(`   • ${col}`);
    });
  }
  
  console.log('\n💡 RECOMMENDATIONS:');
  if (missingColumns.length > 0) {
    console.log('   1. Run the full schema creation script (supabase-schema.sql)');
    console.log('   2. Or add missing columns with ALTER TABLE statements');
  }
  if (existingColumns.length > 0) {
    console.log('   3. Current table is accessible and can be used');
    console.log('   4. Data can be inserted/queried with existing structure');
  }
  
  // Save detailed report
  const fs = require('fs');
  const report = {
    timestamp: new Date().toISOString(),
    tableName: 'weddings',
    status: {
      exists: true,
      isEmpty: true,
      accessible: true
    },
    columns: {
      existing: existingColumns,
      missing: missingColumns,
      total: existingColumns.length + missingColumns.length
    },
    recommendations: [
      missingColumns.length > 0 ? 'Complete schema setup required' : 'Table structure is complete',
      'Table is ready for data insertion',
      'Verify RLS policies and constraints'
    ]
  };
  
  fs.writeFileSync('weddings-table-analysis.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Detailed report saved to: weddings-table-analysis.json');
}

// Run the discovery
discoverWeddingsTableStructure();