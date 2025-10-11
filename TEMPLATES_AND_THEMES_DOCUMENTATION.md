# Wedding Templates & Themes System Documentation

## Overview
This document provides a comprehensive understanding of how the wedding templates/themes system works in the Shadicards application, including the wedding subpages, database schema, and template rendering architecture.

---

## 1. Wedding Subpage Structure & Routing

### URL Structure
```
http://localhost:3000/wedding/{wedding_id}?guest={guest_id}
```

**Example:**
```
http://localhost:3000/wedding/f406f574-10b5-4dba-a386-8f0d18bf4c29?guest=4500be3b-f078-4f2f-bec8-9861609f82dd
```

### Routing Architecture

**File Location:** `src/app/wedding/[id]/page.tsx`

```typescript
// Next.js 14+ App Router with dynamic route parameter
interface PageProps {
  params: Promise<{ id: string }>;      // wedding_id from URL path
  searchParams: Promise<{ guest?: string }>; // guest_id from query parameter
}
```

**Flow:**
1. **page.tsx** - Server component that receives the wedding_id and guest_id
2. **WeddingPageContent.tsx** - Client component that handles all data fetching and state management
3. **WeddingWebsite.tsx** - Component that renders the actual template with guest information

---

## 2. Data Loading Flow

### WeddingPageContent Component
**Location:** `src/app/wedding/[id]/WeddingPageContent.tsx`

**Key Responsibilities:**
1. Load wedding data from `weddings` table
2. Load website settings from `wedding_website` table
3. Merge website settings into wedding data
4. Load guest information (if guest_id provided)
5. Load events for the wedding
6. Handle password protection
7. Handle inactive weddings

**Data Loading Process:**

```typescript
// Step 1: Load wedding data
const { data: weddingData } = await supabase
  .from("weddings")
  .select("*")
  .eq("id", weddingId)
  .single();

// Step 2: Load wedding website settings
const { data: websiteSettings } = await supabase
  .from("wedding_website")
  .select("*")
  .eq("wedding_id", weddingId)
  .single();

// Step 3: Merge settings (visibility toggles, colors, template_id, etc.)
Object.assign(weddingData, websiteSettings);

// Step 4: Load guest (optional)
const { data: guestData } = await supabase
  .from("guests")
  .select("*")
  .eq("id", guestId)
  .eq("wedding_id", weddingId)
  .single();

// Step 5: Load events
const { data: eventsData } = await supabase
  .from("events")
  .select("*")
  .eq("wedding_id", weddingId)
  .order("event_date", { ascending: true });
```

**Access Control:**
- If `is_active === false`: Redirect to homepage
- If `is_password_protected === true`: Show password screen
- If no `guest_id`: Show message requiring guest ID

---

## 3. Database Schema

### Main Tables

#### 3.1 `weddings` Table
**Purpose:** Core wedding information

**Key Columns:**
```sql
- id (uuid, primary key)
- bride_first_name (varchar)
- bride_last_name (text, nullable)
- groom_first_name (varchar)
- groom_last_name (text, nullable)
- wedding_date (date, nullable)
- venue_name (text, nullable)
- venue_address (text, nullable)
- is_active (boolean, default: true)
- couple_picture (text, nullable)
- bride_photo_url (text, nullable)
- groom_photo_url (text, nullable)
- about_bride (text, nullable)
- about_groom (text, nullable)
- rsvp_contact (text, nullable)
- user_id (uuid, foreign key to auth.users)

-- JSONB Content Fields
- story_items (jsonb, nullable)
- gallery_images (jsonb, nullable)
- bride_families (jsonb, nullable)
- groom_families (jsonb, nullable)
- bride_friends (jsonb, nullable)  -- Wedding party
- groom_friends (jsonb, nullable)  -- Wedding party
```

**Example Data Structure:**

```json
{
  "story_items": [
    {
      "date": "",
      "image": "https://...storage.../story/1759494390199-qxwht.jpg",
      "title": "Our First Meeting",
      "description": "Description of the moment"
    }
  ],
  "gallery_images": [
    "https://...storage.../gallery/1759494419175-h4o1xp.jpg",
    "https://...storage.../gallery/1759494423423-xtcw8t.jpg"
  ],
  "bride_families": [
    {
      "name": "John Doe",
      "image": "https://...storage.../family/1759494430553-d2ia5a.svg",
      "relation": "Father",
      "description": "Brief description"
    }
  ],
  "groom_friends": [
    {
      "name": "Best Friend",
      "image": "https://...storage.../friends/1759494468487-d1ph8g.png",
      "relation": "Best Friend",
      "description": "Known since college"
    }
  ]
}
```

#### 3.2 `wedding_website` Table
**Purpose:** Website-specific settings and customization

**Key Columns:**
```sql
- id (uuid, primary key)
- wedding_id (uuid, foreign key to weddings.id)
- template_id (text, nullable, default: 'template001')
  -- Stores template identifier directly: "template001", "template002", etc.
  -- NO foreign key constraint - direct string reference

-- Security & Access
- is_password_protected (boolean, default: false)
- password (text, nullable)

-- Visibility Toggles
- show_hero (boolean, default: true)
- show_about (boolean, default: true)
- show_story (boolean, default: true)
- show_gallery (boolean, default: true)
- show_families (boolean, default: true)
- show_wedding_party (boolean, default: true)
- show_chat (boolean, default: false)

-- SEO & Meta
- meta_title (text, nullable)
- meta_description (text, nullable)
- og_image (text, nullable)

-- Analytics
- view_count (integer, default: 0)
- last_viewed_at (timestamptz, nullable)

-- Timestamps
- created_at (timestamptz, default: now())
- updated_at (timestamptz, default: now())
```

**Example Data:**
```json
{
  "id": "316d68d5-9aec-44d9-947e-a13713b3986e",
  "wedding_id": "f406f574-10b5-4dba-a386-8f0d18bf4c29",
  "template_id": "template001",  // Direct string reference, not UUID
  "is_password_protected": false,
  "show_hero": false,
  "show_about": true,
  "show_story": false,
  "show_gallery": false,
  "show_families": true,
  "show_wedding_party": true
}
```

#### 3.3 `website_themes` Table
**Purpose:** Available templates/themes (for admin/selection UI)

**Note:** This table is used for displaying available themes in the admin panel, but `wedding_website.template_id` directly stores the theme_id string without a foreign key relationship.

**Columns:**
```sql
- id (uuid, primary key)
- theme_id (text) -- e.g., "template001", "template002"
- name (text) -- Display name: "Elegant Romance", "Modern Minimalist"
- preview_image (text, nullable)
- preview_url (text, nullable)
- status (text) -- 'active', 'inactive', 'deprecated'
- account_type (text) -- 'free', 'basic', 'premium', 'luxury'
- created_at (timestamptz, default: now())
```

**Example Data:**
```json
[
  {
    "id": "998df858-e921-44fe-b592-4a7071934c2a",
    "theme_id": "template002",
    "name": "Traditional Theme",
    "preview_image": "https://themefisher.com/blog/flatastic.webp",
    "status": "active",
    "account_type": "premium"
  },
  {
    "id": "46e74106-25ee-4cdb-82b9-04417a0b2b35",
    "theme_id": "template001",
    "name": "Another Theme",
    "preview_image": "https://img.freepik.com/...",
    "status": "active",
    "account_type": "premium"
  }
]
```

**Relationship:** The `theme_id` in this table matches the `template_id` stored in `wedding_website` table, but there is NO foreign key constraint. This allows flexibility in template assignment.

#### 3.4 `guests` Table
**Purpose:** Guest information

**Key Columns:**
```sql
- id (uuid, primary key)
- wedding_id (uuid, foreign key)
- first_name (text)
- last_name (text)
- whatsapp (text, nullable)
- side (text) -- 'bride', 'groom', 'mutual'
- relationship (text)
- title (text, nullable) -- Mr., Mrs., Dr., etc.
- profile_image (text, nullable)
- email (text, nullable)
- address (text, nullable)
```

#### 3.5 `events` Table
**Purpose:** Wedding events (ceremonies, receptions, etc.)

**Key Columns:**
```sql
- id (uuid, primary key)
- wedding_id (uuid, foreign key)
- name (text) -- "Mehendi", "Reception", etc.
- description (text, nullable)
- event_date (date)
- start_time (time)
- end_time (time)
- address (text, nullable)
- background_image (text, nullable)
- event_type (text, nullable)
- event_side (text, nullable) -- bride/groom/both
- message (text, nullable)
```

---

## 4. Template System Architecture

### 4.1 Template Registry
**Location:** `src/lib/template-registry.ts`

**Purpose:** Central registry of all available templates

```typescript
export const templates: Record<TemplateId, TemplateConfig> = {
  template001: {
    id: 'template001',
    name: 'Elegant Romance',
    description: 'A beautiful, romantic template with soft colors',
    thumbnail: '/templates/template001-thumbnail.jpg',
    component: Template001, // Dynamically loaded
  },
  template002: {
    id: 'template002',
    name: 'Modern Minimalist',
    description: 'Clean and modern design',
    thumbnail: '/templates/template002-thumbnail.jpg',
    component: Template002,
  },
  template003: {
    id: 'template003',
    name: 'Traditional Heritage',
    description: 'Traditional design with cultural elements',
    thumbnail: '/templates/template003-thumbnail.jpg',
    component: Template001, // Placeholder
  },
};

export function getTemplate(templateId: TemplateId): TemplateConfig {
  return templates[templateId] || templates.template001; // Default fallback
}
```

### 4.2 Data Mapper
**Location:** `src/lib/wedding-data-mapper.ts`

**Purpose:** Transform database JSONB data into standardized template format

**Key Functions:**

```typescript
// Main mapping function
export function mapDatabaseToTemplateData(
  wedding: Wedding,
  website: WeddingWebsiteType,
  events?: Event[]
): WeddingTemplateData

// Template ID converter
export function getTemplateIdFromDatabase(templateId: string | null): TemplateId
```

**Mapping Process:**

1. **Hero Section:**
   ```typescript
   hero: {
     brideName: wedding.bride_first_name,
     groomName: wedding.groom_first_name,
     coupleImage: wedding.couple_picture,
     weddingDate: wedding.wedding_date,
     weddingTime: events?.[0]?.start_time,
     venue: wedding.venue_name,
   }
   ```

2. **About Section:**
   ```typescript
   about: {
     bride: {
       name: `${wedding.bride_first_name} ${wedding.bride_last_name}`,
       image: wedding.bride_photo_url,
       description: wedding.about_bride,
     },
     groom: { /* similar */ }
   }
   ```

3. **Story Section:**
   ```typescript
   story: [{
     title: 'Our Love Story',
     items: storyItems.map(item => ({
       id: item.id,
       title: item.title,
       date: item.date,
       description: item.description,
       image: item.image,
       icon: item.icon || '💕'
     }))
   }]
   ```

4. **Gallery Section:**
   ```typescript
   gallery: {
     title: 'Our Memories',
     images: galleryImages.map((img, index) => {
       // Handle both string URLs and object formats
       if (typeof img === 'string') {
         return { id: `gallery-${index}`, url: img };
       } else {
         return {
           id: img.id,
           url: img.url || img.src,
           caption: img.caption,
           category: img.category || 'All'
         };
       }
     })
   }
   ```

5. **Family Section:**
   ```typescript
   family: {
     brideSide: {
       title: "Bride's Family",
       members: brideFamilies.map(member => ({
         id: member.id,
         name: member.name,
         relation: member.relation,
         image: member.image,
         description: member.description
       }))
     },
     groomSide: { /* similar */ }
   }
   ```

6. **Wedding Party Section:**
   ```typescript
   weddingParty: {
     bridesmaids: {
       title: "Bride's Friends",
       members: brideFriends.map(member => ({
         id: member.id,
         name: member.name,
         role: member.role || 'Friend',
         image: member.image,
         description: member.description
       }))
     },
     groomsmen: { /* similar */ }
   }
   ```

### 4.3 Template Component Structure

**Location:** `src/components/templates/template001/` or `template002/`

Each template has:
- **index.tsx** - Main template component
- **HeroSection.tsx** - Hero/banner section
- **AboutSection.tsx** - About bride & groom
- **StorySection.tsx** - Love story timeline
- **FamilySection.tsx** - Family members
- **GallerySection.tsx** - Photo gallery
- **WeddingPartySection.tsx** - Friends/bridesmaids/groomsmen

**Template Component Interface:**
```typescript
interface TemplateComponentProps {
  data: WeddingTemplateData;
  primaryColor?: string;      // From wedding_website table
  secondaryColor?: string;    // From wedding_website table
  visibility?: VisibilitySettings; // Show/hide sections
}
```

**Example Template (template001/index.tsx):**
```typescript
export default function Template001({
  data,
  primaryColor = '#ec4899',
  secondaryColor = '#f97316',
  visibility
}: TemplateComponentProps) {
  const {
    show_hero = true,
    show_about = true,
    show_story = true,
    show_families = true,
    show_gallery = true,
    show_wedding_party = true
  } = visibility || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">
      {show_hero && <HeroSection data={data.hero} primaryColor={primaryColor} />}
      {show_about && <AboutSection data={data.about} primaryColor={primaryColor} />}
      {show_story && <StorySection data={data.story} primaryColor={primaryColor} />}
      {show_families && <FamilySection data={data.family} primaryColor={primaryColor} />}
      {show_gallery && <GallerySection data={data.gallery} primaryColor={primaryColor} />}
      {show_wedding_party && <WeddingPartySection data={data.weddingParty} primaryColor={primaryColor} />}
    </div>
  );
}
```

---

## 5. WeddingWebsite Component

**Location:** `src/components/wedding/WeddingWebsite.tsx`

**Purpose:** Wrapper component that:
1. Gets the correct template from the registry
2. Maps database data to template format
3. Applies visibility settings
4. Renders guest header
5. Renders footer with events/help buttons

**Process Flow:**

```typescript
export default function WeddingWebsite({
  website,  // Combined wedding + website_website data
  guest,    // Guest information
  events,   // Wedding events
  urlSlug,  // wedding_id
  onEditProfile
}: WeddingWebsiteProps) {

  // 1. Get template ID from database and load template
  const templateId = getTemplateIdFromDatabase(website.template_id);
  const templateConfig = getTemplate(templateId);
  const TemplateComponent = templateConfig.component;

  // 2. Map database data to template format
  const weddingData = mapDatabaseToTemplateData(
    website.wedding,
    website,
    events
  );

  // 3. Render with guest header and template
  return (
    <div>
      {/* Guest Welcome Header (sticky) */}
      <div className="sticky top-0 z-40">
        {/* Guest profile, name, side badge */}
      </div>

      {/* Template Content */}
      <TemplateComponent
        data={weddingData}
        primaryColor={website.primary_color || "#ec4899"}
        secondaryColor={website.secondary_color || "#f97316"}
        visibility={{
          show_hero: website.show_hero !== false,
          show_about: website.show_about !== false,
          // ... other visibility flags
        }}
      />

      {/* Footer with Events & Help */}
      <Footer
        showViewEvents={events?.length > 0}
        eventUrl={`/wedding/${urlSlug}/event?guest=${guest.id}`}
        rsvpContact={website.wedding.rsvp_contact}
      />
    </div>
  );
}
```

---

## 6. Type Definitions

**Location:** `src/types/wedding-template.ts`

```typescript
export interface WeddingTemplateData {
  hero: HeroData;
  about: AboutData;
  story: StoryData[];
  family: FamilyData;
  gallery: GalleryData;
  weddingParty: WeddingPartyData;
}

export interface VisibilitySettings {
  show_hero?: boolean;
  show_about?: boolean;
  show_story?: boolean;
  show_gallery?: boolean;
  show_events?: boolean;
  show_families?: boolean;
  show_wedding_party?: boolean;
  show_chat?: boolean;
}

export type TemplateId = 'template001' | 'template002' | 'template003';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail?: string;
  component: React.ComponentType<TemplateComponentProps>;
}
```

---

## 7. Complete Data Flow Diagram

```
User visits URL
    ↓
/wedding/[id]/page.tsx (Server Component)
    ↓ Passes wedding_id & guest_id
    ↓
WeddingPageContent.tsx (Client Component)
    ↓
    ├─→ Load weddings table (wedding data)
    ├─→ Load wedding_website table (settings/visibility)
    ├─→ Load guests table (guest info)
    └─→ Load events table (wedding events)
    ↓ Merge data
    ↓
Check Access Controls
    ├─→ is_active? → Redirect if false
    ├─→ is_password_protected? → Show password screen
    └─→ guest_id provided? → Show error if missing
    ↓
WeddingWebsite.tsx
    ↓
    ├─→ getTemplateIdFromDatabase(template_id)
    ├─→ getTemplate(templateId) → Template Config
    ├─→ mapDatabaseToTemplateData() → Standardized data
    └─→ Apply visibility settings
    ↓
Render Template Component (template001/002/003)
    ↓
    ├─→ HeroSection (if show_hero)
    ├─→ AboutSection (if show_about)
    ├─→ StorySection (if show_story)
    ├─→ FamilySection (if show_families)
    ├─→ GallerySection (if show_gallery)
    └─→ WeddingPartySection (if show_wedding_party)
```

---

## 8. Key Relationships

### Database Relationships
```
users (auth.users)
  ↓ 1:N
weddings
  ↓ 1:1
wedding_website (template_id = text, no FK)
  ↓ 1:N        ↓ (loosely related)
guests      website_themes (for selection UI only)
  ↓ N:1
events
```

### Code Relationships
```
page.tsx
  ↓
WeddingPageContent
  ↓
WeddingWebsite
  ↓
Template Registry → Template Component
  ↓              ↓
Data Mapper    Section Components
  ↓              (Hero, About, Story, etc.)
Supabase Data
```

---

## 9. Important Notes

### Template ID Mapping
**Simplified Architecture (Current):**
- Database `wedding_website.template_id`: Stores template identifier directly as text: `"template001"`, `"template002"`
- Code registry: Uses same identifiers: `'template001'`, `'template002'`, `'template003'`
- `website_themes.theme_id`: Matches the same format (used for UI selection only)

The `getTemplateIdFromDatabase()` function now simply validates and returns the template ID, with a fallback to 'template001' if the value is invalid or null.

**Previous Architecture (Legacy):**
- Previously, `template_id` was a UUID referencing `website_themes.id`
- Required a join to get the actual theme_id string
- This has been simplified to direct string storage

### JSONB Field Flexibility
The mapper handles multiple data structures:
- Gallery images: Can be array of strings OR array of objects
- Family members: Can be array OR object with `members` property
- Wedding party: Can be array OR object with `members`/`friends` property

### Visibility Logic
```typescript
// Shows section if true OR null (default visible)
show_hero: website.show_hero !== false

// Shows section ONLY if explicitly true
show_chat: website.show_chat === true
```

### Guest Access
- Wedding pages REQUIRE a guest_id in the query parameter
- Without guest_id, user sees a message explaining the URL format
- Guest data is shown in the sticky header

---

## 10. Adding a New Template

To add a new template (e.g., template004):

1. **Create template folder:**
   ```
   src/components/templates/template004/
   ├── index.tsx
   ├── HeroSection.tsx
   ├── AboutSection.tsx
   ├── StorySection.tsx
   ├── FamilySection.tsx
   ├── GallerySection.tsx
   └── WeddingPartySection.tsx
   ```

2. **Register in template-registry.ts:**
   ```typescript
   export type TemplateId = 'template001' | 'template002' | 'template003' | 'template004';

   const Template004 = dynamic(() => import('@/components/templates/template004'));

   export const templates: Record<TemplateId, TemplateConfig> = {
     // ...existing templates
     template004: {
       id: 'template004',
       name: 'New Template Name',
       description: 'Description',
       thumbnail: '/templates/template004-thumbnail.jpg',
       component: Template004,
     },
   };
   ```

3. **Update data mapper:**
   ```typescript
   export function getTemplateIdFromDatabase(templateId: string | null): TemplateId {
     // Add handling for template004
     if (num === 4) return 'template004';
     if (templateId.includes('004') || templateId.includes('4')) return 'template004';
   }
   ```

4. **Add to database:**
   ```sql
   INSERT INTO website_themes (theme_id, name, preview_image, status, account_type)
   VALUES ('template004', 'New Template Name', 'url...', 'active', 'premium');
   ```

---

## 11. Common Operations

### Change Template for a Wedding
```sql
-- Simply update with the template identifier string
UPDATE wedding_website
SET template_id = 'template002'
WHERE wedding_id = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

-- Valid values: 'template001', 'template002', 'template003', etc.
```

### Toggle Section Visibility
```sql
UPDATE wedding_website
SET show_gallery = false,
    show_story = true
WHERE wedding_id = 'wedding-uuid';
```

### Update Gallery Images
```sql
UPDATE weddings
SET gallery_images = '[
  "https://url1.jpg",
  "https://url2.jpg"
]'::jsonb
WHERE id = 'wedding-uuid';
```

---

**End of Documentation**
