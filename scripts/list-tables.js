const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseKey = 'sb_publishable_OQFqjlsqpMz9ar0s3xlG_w_SjhdY0M1';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
  try {
    // Query the information_schema to get all user tables
    const { data, error } = await supabase.rpc('get_table_names');
    
    if (error) {
      // Fallback: try to query specific known tables
      console.log('Could not query information_schema, checking known tables...');
      const knownTables = [
        'weddings', 'wedding_events', 'wedding_families', 'wedding_guests', 
        'wedding_gallery', 'wedding_team', 'templates', 'users', 'profiles',
        'auth', 'storage', 'realtime', 'public'
      ];
      const existingTables = [];
      
      for (const tableName of knownTables) {
        const { data, error } = await supabase.from(tableName).select('*').limit(1);
        if (!error) {
          existingTables.push(tableName);
        }
      }
      
      console.log(existingTables.join('\n'));
    } else {
      console.log(data.map(row => row.table_name).join('\n'));
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

listTables();