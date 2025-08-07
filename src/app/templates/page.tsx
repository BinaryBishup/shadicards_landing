import Link from 'next/link'

const templates = [
  {
    id: '001',
    name: 'Elegant Traditional',
    description: 'Classic Indian wedding template with traditional motifs',
    thumbnail: '/card_background.jpg'
  },
  {
    id: '002',
    name: 'Modern Minimalist',
    description: 'Clean and contemporary wedding design',
    thumbnail: '/couple_image.jpg'
  },
  {
    id: '003',
    name: 'Floral Paradise',
    description: 'Beautiful floral themed wedding template',
    thumbnail: '/event_pictures/picture1.jpg'
  }
]

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Wedding Templates
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/templates/${template.id}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] bg-gray-200 relative">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {template.description}
                </p>
                <div className="mt-4 text-pink-600 font-medium text-sm">
                  Template ID: {template.id}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}