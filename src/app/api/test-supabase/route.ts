import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        error: 'Missing Supabase configuration',
        url: supabaseUrl ? 'Set' : 'Missing',
        key: supabaseKey ? 'Set' : 'Missing'
      }, { status: 500 })
    }
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test query
    const { data, error } = await supabase
      .from('weddings')
      .select('*')
      .limit(1)
    
    if (error) {
      return NextResponse.json({ 
        error: 'Database query failed',
        details: error.message,
        hint: error.hint || 'Check if tables exist in Supabase'
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      weddings_found: data?.length || 0,
      sample_data: data?.[0] || null
    })
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Unexpected error',
      details: String(error)
    }, { status: 500 })
  }
}