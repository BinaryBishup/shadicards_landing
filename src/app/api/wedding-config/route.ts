import { NextResponse } from 'next/server'
import { getWeddingBySlug } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 })
  }

  try {
    const weddingData = await getWeddingBySlug(slug)
    
    if (!weddingData) {
      return NextResponse.json({ error: 'Wedding not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: weddingData
    })
  } catch (error) {
    console.error('Error fetching wedding config:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch wedding configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}