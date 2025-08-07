'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabase() {
  const [status, setStatus] = useState<string>('Checking connection...')
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test basic connection
        const { data: weddings, error: weddingsError } = await supabase
          .from('weddings')
          .select('*')
          .limit(1)
        
        if (weddingsError) {
          setError(`Weddings table error: ${weddingsError.message}`)
          setStatus('Error connecting to database')
          
          // Try to create tables if they don't exist
          console.log('Tables might not exist, please run the SQL schema in Supabase')
        } else {
          setStatus('Connected successfully!')
          setData(weddings)
          
          // Try to fetch more data
          const { data: events } = await supabase
            .from('wedding_events')
            .select('*')
            .limit(5)
          
          console.log('Events:', events)
        }
      } catch (err) {
        setError(String(err))
        setStatus('Connection failed')
      }
    }
    
    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="mb-4">
        <p className="font-semibold">Status: {status}</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {data && (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <p className="font-semibold mb-2">Data found:</p>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold mb-2">Next Steps:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Go to your Supabase dashboard</li>
          <li>Navigate to SQL Editor</li>
          <li>Run the schema from supabase-schema.sql file</li>
          <li>Insert some test data</li>
          <li>Visit /wedding/your-wedding-name to see the result</li>
        </ol>
      </div>
    </div>
  )
}