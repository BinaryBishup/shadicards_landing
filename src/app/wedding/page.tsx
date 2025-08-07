import Link from 'next/link'
import { Heart, Calendar, MapPin } from 'lucide-react'

const sampleWeddings = [
  {
    coupleName: 'anjali-weds-rohit',
    brideName: 'Anjali',
    groomName: 'Rohit',
    date: '15th March 2025',
    venue: 'The Grand Palace, Mumbai',
    templateId: '001'
  },
  {
    coupleName: 'priya-weds-rahul',
    brideName: 'Priya',
    groomName: 'Rahul',
    date: '22nd April 2025',
    venue: 'Beach Resort, Goa',
    templateId: '001'
  }
]

export default function WeddingListPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Wedding Invitations
          </h1>
          <p className="text-gray-600">
            Browse and preview wedding invitation pages
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sampleWeddings.map((wedding) => (
            <Link
              key={wedding.coupleName}
              href={`/wedding/${wedding.coupleName}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-12 text-white text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-serif">
                  {wedding.brideName} & {wedding.groomName}
                </h2>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-pink-400" />
                  <span>{wedding.date}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-pink-400" />
                  <span>{wedding.venue}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <span className="text-sm text-gray-500">
                    Template: {wedding.templateId}
                  </span>
                </div>
                
                <div className="text-pink-600 font-medium group-hover:text-pink-700 transition-colors">
                  View Invitation →
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            This is a demo page showing sample wedding invitations.
          </p>
          <p className="text-gray-600">
            In production, these will be fetched from Supabase database.
          </p>
        </div>
      </div>
    </main>
  )
}