import Template001 from '@/components/templates/Template001'

interface TemplatePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { id } = await params
  
  const sampleData = {
    brideName: 'Anjali',
    groomName: 'Rajan',
    weddingDate: '15th March 2025',
    venue: 'The Grand Palace, Mumbai',
    events: [
      { name: 'Mehendi', date: '13th March 2025', time: '4:00 PM', venue: 'Garden Area' },
      { name: 'Sangeet', date: '14th March 2025', time: '7:00 PM', venue: 'Banquet Hall' },
      { name: 'Wedding', date: '15th March 2025', time: '8:00 AM', venue: 'Main Hall' },
      { name: 'Reception', date: '15th March 2025', time: '7:00 PM', venue: 'Rooftop' }
    ],
    story: 'Two souls, one destiny. Join us as we celebrate the beginning of our forever.',
    families: {
      bride: {
        father: 'Mr. Rajesh Kumar',
        mother: 'Mrs. Priya Kumar'
      },
      groom: {
        father: 'Mr. Suresh Sharma',
        mother: 'Mrs. Kavita Sharma'
      }
    }
  }
  
  switch(id) {
    case '001':
      return <Template001 data={sampleData} />
    case '002':
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Template 002 - Coming Soon</h1>
            <p className="text-gray-600">Modern Minimalist template is under development</p>
          </div>
        </div>
      )
    case '003':
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Template 003 - Coming Soon</h1>
            <p className="text-gray-600">Floral Paradise template is under development</p>
          </div>
        </div>
      )
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
            <p className="text-gray-600">The requested template does not exist</p>
          </div>
        </div>
      )
  }
}