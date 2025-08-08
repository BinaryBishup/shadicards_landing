export interface EventDetail {
  name: string
  date: string
  time: string
  venue: string
  mapUrl?: string
  icon?: string
  color?: string
}

export interface TeamMember {
  name: string
  role: string
  image?: string
}

export interface StoryItem {
  title: string
  date?: string
  description: string
  image: string
}

export interface WeddingData {
  brideName: string
  groomName: string
  weddingDate: string
  venue: string
  coupleImage?: string
  brideImage?: string
  groomImage?: string
  events: EventDetail[]
  story: string
  howWeMet?: string
  aboutBride?: string
  aboutGroom?: string
  gallery?: string[]
  bridesmaids?: TeamMember[]
  groomsmen?: TeamMember[]
  families: {
    bride: {
      father?: string
      mother?: string
      siblings?: Array<{ name: string; relation: string }>
    }
    groom: {
      father?: string
      mother?: string
      siblings?: Array<{ name: string; relation: string }>
    }
  }
  guestName?: string
  guestId?: string
  guestProfileImage?: string
  guestSide?: string
  weddingUrl?: string
  storyItems?: StoryItem[]
  // Section visibility controls
  showHero?: boolean
  showCoupleProfiles?: boolean
  showStory?: boolean
  showGallery?: boolean
  showEvents?: boolean
  showChat?: boolean
  showFamilies?: boolean
  showWeddingParty?: boolean
}

export interface SectionProps {
  data: WeddingData
  className?: string
}