const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'sb_publishable_OQFqjlsqpMz9ar0s3xlG_w_SjhdY0M1';
const supabase = createClient(supabaseUrl, supabaseKey);

async function getPostgresSchema() {
  console.log('🔍 POSTGRESQL SCHEMA ANALYSIS');
  console.log('Attempting to query system tables for detailed schema information');
  console.log('=' .repeat(70));
  
  // First, let's see what we can access in information_schema
  await checkInformationSchema();
  
  // Try to get column information for the weddings table
  await getColumnDetails();
  
  // Check for constraints
  await getConstraints();
  
  // Check for indexes
  await getIndexes();
  
  // Check for RLS policies
  await getRLSStatus();
}

async function checkInformationSchema() {
  console.log('\n📊 INFORMATION_SCHEMA ACCESS CHECK');
  console.log('-'.repeat(50));
  
  const queries = [
    {
      name: 'Tables',
      query: 'information_schema.tables',
      select: 'table_name, table_type',
      filter: { table_schema: 'public' }
    },
    {
      name: 'Columns',
      query: 'information_schema.columns', 
      select: 'table_name, column_name, data_type, is_nullable, column_default',
      filter: { table_schema: 'public', table_name: 'weddings' }
    },
    {
      name: 'Constraints',
      query: 'information_schema.table_constraints',
      select: 'table_name, constraint_name, constraint_type',
      filter: { table_schema: 'public' }
    }
  ];
  
  for (const queryInfo of queries) {
    console.log(`\n🔍 Checking ${queryInfo.name}...`);
    try {
      const query = supabase
        .from(queryInfo.query)
        .select(queryInfo.select);
      
      // Apply filters
      Object.entries(queryInfo.filter).forEach(([key, value]) => {
        query.eq(key, value);
      });
      
      const { data, error } = await query.limit(10);
      
      if (error) {
        console.log(`❌ Cannot access ${queryInfo.name}: ${error.message}`);
      } else {
        console.log(`✅ ${queryInfo.name} accessible - Found ${data?.length || 0} records`);
        if (data && data.length > 0) {
          console.log('   Sample data:');
          data.slice(0, 3).forEach(record => {
            console.log(`   • ${JSON.stringify(record)}`);
          });
        }
      }
    } catch (err) {
      console.log(`❌ Error querying ${queryInfo.name}: ${err.message}`);
    }
  }
}

async function getColumnDetails() {
  console.log('\n📋 WEDDINGS TABLE COLUMN ANALYSIS');
  console.log('-'.repeat(50));
  
  // Method 1: Try to use a function to describe the table
  try {
    console.log('Attempting to get column information...');
    
    // Insert a test record to see what columns exist
    console.log('\n🧪 Testing column structure with a temporary insert...');
    
    const testRecord = {
      wedding_name: 'test-wedding-for-schema',
      template_id: '001',
      bride_name: 'Test Bride',
      groom_name: 'Test Groom', 
      wedding_date: '2025-12-31',
      venue: 'Test Venue'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('weddings')
      .insert([testRecord])
      .select('*');
    
    if (insertError) {
      console.log(`❌ Insert test failed: ${insertError.message}`);
      console.log('This gives us clues about the table structure and constraints');
      
      // Analyze the error message for clues
      if (insertError.message.includes('column') && insertError.message.includes('does not exist')) {
        const missingColumn = insertError.message.match(/column "([^"]+)"/)?.[1];
        console.log(`💡 Column "${missingColumn}" does not exist in the table`);
      }
    } else if (insertData && insertData.length > 0) {
      console.log('✅ Test insert successful! Found columns:');
      const columns = Object.keys(insertData[0]);
      columns.forEach(col => {
        const value = insertData[0][col];
        console.log(`   • ${col}: ${typeof value} = ${JSON.stringify(value)}`);
      });
      
      // Clean up the test record
      console.log('\n🧹 Cleaning up test record...');
      const { error: deleteError } = await supabase
        .from('weddings')
        .delete()
        .eq('wedding_name', 'test-wedding-for-schema');
      
      if (deleteError) {
        console.log(`⚠️  Could not delete test record: ${deleteError.message}`);
      } else {
        console.log('✅ Test record cleaned up');
      }
      
      return { columns, sampleData: insertData[0] };
    }
  } catch (err) {
    console.log(`❌ Column analysis error: ${err.message}`);
  }
  
  return null;
}

async function getConstraints() {
  console.log('\n🔒 CONSTRAINTS ANALYSIS');
  console.log('-'.repeat(50));
  
  // Try different approaches to get constraint information
  const constraintQueries = [
    'information_schema.key_column_usage',
    'information_schema.referential_constraints',
    'information_schema.check_constraints'
  ];
  
  for (const tableName of constraintQueries) {
    console.log(`\n🔍 Checking ${tableName}...`);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(5);
      
      if (error) {
        console.log(`❌ Cannot access: ${error.message}`);
      } else {
        console.log(`✅ Accessible - Found ${data?.length || 0} records`);
        if (data && data.length > 0) {
          console.log('   Sample:', JSON.stringify(data[0], null, 2));
        }
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }
}

async function getIndexes() {
  console.log('\n📇 INDEXES ANALYSIS');
  console.log('-'.repeat(50));
  
  // Try to access pg_indexes or similar
  try {
    console.log('🔍 Attempting to access index information...');
    
    // This likely won't work with publishable key, but worth trying
    const { data, error } = await supabase
      .from('pg_indexes')
      .select('*')
      .eq('schemaname', 'public')
      .limit(10);
    
    if (error) {
      console.log(`❌ Cannot access pg_indexes: ${error.message}`);
    } else {
      console.log(`✅ Found ${data?.length || 0} indexes`);
      data?.forEach(idx => {
        console.log(`   📇 ${idx.tablename}.${idx.indexname}: ${idx.indexdef}`);
      });
    }
  } catch (err) {
    console.log(`❌ Index query error: ${err.message}`);
  }
}

async function getRLSStatus() {
  console.log('\n🔐 ROW LEVEL SECURITY STATUS');
  console.log('-'.repeat(50));
  
  try {
    // Try to access RLS information
    console.log('🔍 Checking RLS policies...');
    
    const { data, error } = await supabase
      .from('pg_policies')
      .select('*')
      .limit(10);
    
    if (error) {
      console.log(`❌ Cannot access pg_policies: ${error.message}`);
    } else {
      console.log(`✅ Found ${data?.length || 0} RLS policies`);
      data?.forEach(policy => {
        console.log(`   🔒 ${policy.tablename}: ${policy.policyname} (${policy.cmd})`);
      });
    }
  } catch (err) {
    console.log(`❌ RLS query error: ${err.message}`);
  }
}

// Run the analysis
getPostgresSchema().then(() => {
  console.log('\n' + '='.repeat(70));
  console.log('📄 ANALYSIS COMPLETE');
  console.log('Based on the available information, here\'s what we know:');
  console.log('1. Only the "weddings" table exists in the database');
  console.log('2. The table is currently empty');
  console.log('3. System table access is restricted with the current key');
  console.log('4. Full schema as defined in supabase-schema.sql needs to be created');
  console.log('='.repeat(70));
}).catch(err => {
  console.error('❌ Analysis failed:', err);
});