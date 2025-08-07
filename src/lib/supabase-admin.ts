// This file should only be used in server-side code (API routes, server components)
// Never expose the service role key to the client

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co'

// IMPORTANT: This should be your anon key, not the service role key
// The anon key is safe to use in client-side code
// You can find it in your Supabase dashboard under Settings > API
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For admin operations (server-side only)
// Uncomment and use only in server-side code:
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
// export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)