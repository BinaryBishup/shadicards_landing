// Template Data Types
export interface WeddingTemplateData {
  hero: HeroData;
  about: AboutData;
  story: StoryData[];
  family: FamilyData;
  gallery: GalleryData;
  weddingParty: WeddingPartyData;
}

export interface HeroData {
  brideName: string;
  groomName: string;
  coupleImage?: string;
  weddingDate: string;
  weddingTime?: string;
  venue?: string;
  tagline?: string;
}

export interface AboutData {
  bride: {
    name: string;
    image?: string;
    description?: string;
    profession?: string;
    education?: string;
    socials?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
  groom: {
    name: string;
    image?: string;
    description?: string;
    profession?: string;
    education?: string;
    socials?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

export interface StoryItem {
  id: string;
  title: string;
  date?: string;
  description: string;
  image?: string;
  icon?: string;
}

export interface StoryData {
  title: string;
  items: StoryItem[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  image?: string;
  description?: string;
}

export interface FamilyData {
  brideSide: {
    title: string;
    members: FamilyMember[];
  };
  groomSide: {
    title: string;
    members: FamilyMember[];
  };
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  category?: string;
}

export interface GalleryData {
  title: string;
  images: GalleryImage[];
  categories?: string[];
}

export interface WeddingPartyMember {
  id: string;
  name: string;
  role?: string;
  image?: string;
  description?: string;
}

export interface WeddingPartyData {
  bridesmaids: {
    title: string;
    members: WeddingPartyMember[];
  };
  groomsmen: {
    title: string;
    members: WeddingPartyMember[];
  };
}

// Visibility Settings
export interface VisibilitySettings {
  show_hero?: boolean;
  show_about?: boolean;
  show_story?: boolean;
  show_gallery?: boolean;
  show_families?: boolean;
  show_wedding_party?: boolean;
}

// Template Component Props
export interface TemplateComponentProps {
  data: WeddingTemplateData;
  primaryColor?: string;
  secondaryColor?: string;
  visibility?: VisibilitySettings;
}

// Template Registry
export type TemplateId = 'template001' | 'template002' | 'template003';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail?: string;
  component: React.ComponentType<TemplateComponentProps>;
}