import Template001 from '@/components/templates/Template001'

export interface WeddingData {
  brideName: string
  groomName: string
  weddingDate: string
  venue: string
  events: Array<{
    name: string
    date: string
    time: string
    venue: string
  }>
  story: string
  families: {
    bride: {
      father: string
      mother: string
    }
    groom: {
      father: string
      mother: string
    }
  }
  guestName?: string // Optional guest name from URL parameter
  brideImage?: string
  groomImage?: string
  coupleImage?: string
  howWeMet?: string
  aboutBride?: string
  aboutGroom?: string
  gallery?: string[]
  bridesmaids?: Array<{
    name: string
    role: string
    image?: string
  }>
  groomsmen?: Array<{
    name: string
    role: string
    image?: string
  }>
}

export interface WeddingInfo {
  templateId: string
  data: WeddingData
}

export const templates = {
  '001': {
    name: 'Elegant Traditional',
    component: Template001,
    description: 'Classic Indian wedding template with traditional motifs'
  }
  // Add more templates here as they are created
}

export function loadTemplate(templateId: string, data: WeddingData) {
  const template = templates[templateId as keyof typeof templates]
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
          <p className="text-gray-600">Template ID {templateId} does not exist</p>
        </div>
      </div>
    )
  }
  
  const TemplateComponent = template.component
  return <TemplateComponent data={data} />
}