# Visibility Toggles Mapping Documentation

## Overview
This document explains how the `show_*` columns from the `wedding_website` table control which sections are displayed on wedding pages.

---

## Database Columns (`wedding_website` table)

| Column Name | Type | Default | Description |
|------------|------|---------|-------------|
| `show_hero` | boolean | true | Controls Hero/Banner section with couple photo and date |
| `show_about` | boolean | true | Controls "Meet the Couple" section with bride/groom details |
| `show_story` | boolean | true | Controls "Our Love Story" timeline section |
| `show_gallery` | boolean | true | Controls photo gallery section |
| `show_families` | boolean | true | Controls "Our Families" section (bride & groom families) |
| `show_wedding_party` | boolean | true | Controls "Wedding Party" section (bridesmaids/groomsmen) |
| `show_chat` | boolean | false | Controls chat/messaging feature |

**Note:** `show_events` is referenced in code but **does NOT exist** in the database table.

---

## Data Flow Mapping

### Step 1: Database Query
**Location:** `src/app/wedding/[id]/WeddingPageContent.tsx` (lines 48-52)

```typescript
const { data: websiteSettings } = await supabase
  .from("wedding_website")
  .select("*")  // Loads ALL show_* columns
  .eq("wedding_id", weddingId)
  .single();
```

**Result:** Gets all visibility toggles from `wedding_website` table.

### Step 2: Merge with Wedding Data
**Location:** `src/app/wedding/[id]/WeddingPageContent.tsx` (lines 58-63)

```typescript
if (websiteSettings) {
  Object.assign(weddingData, websiteSettings);
  // Now weddingData has all show_* fields
}
setWedding(weddingData);
```

**Result:** Wedding object now contains all visibility toggles.

### Step 3: Pass to WeddingWebsite Component
**Location:** `src/app/wedding/[id]/WeddingPageContent.tsx` (lines 168-186)

```typescript
const websiteData = {
  id: wedding.id,
  wedding_id: wedding.id,
  template_id: wedding.template_id,

  // ✅ Visibility toggles from wedding_website table
  show_hero: wedding.show_hero,
  show_about: wedding.show_about,
  show_story: wedding.show_story,
  show_gallery: wedding.show_gallery,
  show_families: wedding.show_families,
  show_wedding_party: wedding.show_wedding_party,
  show_chat: wedding.show_chat,

  // ❌ show_events doesn't exist in wedding_website table
  show_events: wedding.show_events,  // This will be undefined

  // Content data
  story_items: wedding.story_items,
  gallery_images: wedding.gallery_images,
  bride_families: wedding.bride_families,
  groom_families: wedding.groom_families,
  bride_friends: wedding.bride_friends,
  groom_friends: wedding.groom_friends,

  wedding: { /* full wedding object */ }
};
```

### Step 4: Apply Visibility Logic
**Location:** `src/components/wedding/WeddingWebsite.tsx` (lines 116-124)

```typescript
<TemplateComponent
  data={weddingData}
  primaryColor={website.primary_color || "#ec4899"}
  secondaryColor={website.secondary_color || "#f97316"}
  visibility={{
    show_hero: website.show_hero !== false,           // Show if true OR null
    show_about: website.show_about !== false,         // Show if true OR null
    show_story: website.show_story !== false,         // Show if true OR null
    show_families: website.show_families !== false,   // Show if true OR null
    show_gallery: website.show_gallery !== false,     // Show if true OR null
    show_wedding_party: website.show_wedding_party !== false,  // Show if true OR null
    show_chat: website.show_chat === true             // Show ONLY if explicitly true
  }}
/>
```

**Logic Explanation:**
- `!== false`: Shows section if value is `true` OR `null` (default visible)
- `=== true`: Shows section ONLY if explicitly set to `true` (default hidden)

### Step 5: Template Renders Sections
**Location:** `src/components/templates/template001/index.tsx` or `template002/index.tsx`

```typescript
export default function Template001({ data, visibility }: TemplateComponentProps) {
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

## Complete Flow Diagram

```
┌─────────────────────────────────────────┐
│  wedding_website table (Supabase)       │
│  ├─ show_hero: false                    │
│  ├─ show_about: true                    │
│  ├─ show_story: false                   │
│  ├─ show_gallery: false                 │
│  ├─ show_families: true                 │
│  ├─ show_wedding_party: true            │
│  └─ show_chat: false                    │
└─────────────────────────────────────────┘
                    ↓
    ┌───────────────────────────────┐
    │  WeddingPageContent.tsx        │
    │  Query + Merge                 │
    └───────────────────────────────┘
                    ↓
    ┌───────────────────────────────┐
    │  websiteData object            │
    │  (includes all show_* fields)  │
    └───────────────────────────────┘
                    ↓
    ┌───────────────────────────────┐
    │  WeddingWebsite.tsx            │
    │  Apply visibility logic        │
    └───────────────────────────────┘
                    ↓
    ┌───────────────────────────────┐
    │  Template Component            │
    │  (template001 or template002)  │
    └───────────────────────────────┘
                    ↓
    ┌───────────────────────────────┐
    │  Conditional Section Rendering │
    │  {show_hero && <HeroSection/>} │
    │  {show_about && <AboutSection/>}│
    │  {show_story && <StorySection/>}│
    │  etc...                        │
    └───────────────────────────────┘
```

---

## Example: Current Test Wedding

**Database Values:**
```json
{
  "show_hero": false,
  "show_about": true,
  "show_story": false,
  "show_gallery": false,
  "show_families": true,
  "show_wedding_party": true,
  "show_chat": false
}
```

**Result on Wedding Page:**
- ❌ Hero section: **HIDDEN**
- ✅ About section: **VISIBLE**
- ❌ Story section: **HIDDEN**
- ❌ Gallery section: **HIDDEN**
- ✅ Families section: **VISIBLE**
- ✅ Wedding Party section: **VISIBLE**
- ❌ Chat: **HIDDEN**

---

## How to Toggle Sections

### Method 1: Direct SQL Update
```sql
UPDATE wedding_website
SET
  show_hero = true,
  show_gallery = true,
  show_story = false
WHERE wedding_id = 'your-wedding-id';
```

### Method 2: Via Supabase Client (Admin Panel)
```typescript
await supabase
  .from('wedding_website')
  .update({
    show_hero: true,
    show_gallery: false,
    show_wedding_party: true
  })
  .eq('wedding_id', weddingId);
```

### Method 3: Bulk Toggle All
```sql
-- Show all sections
UPDATE wedding_website
SET
  show_hero = true,
  show_about = true,
  show_story = true,
  show_gallery = true,
  show_families = true,
  show_wedding_party = true
WHERE wedding_id = 'your-wedding-id';

-- Hide all sections
UPDATE wedding_website
SET
  show_hero = false,
  show_about = false,
  show_story = false,
  show_gallery = false,
  show_families = false,
  show_wedding_party = false
WHERE wedding_id = 'your-wedding-id';
```

---

## Issues Found

### 1. `show_events` Reference
**Issue:** Code references `show_events` (line 186 in WeddingPageContent.tsx) but this column doesn't exist in the database.

**Impact:** `show_events` will always be `undefined`, which may cause unexpected behavior.

**Fix Options:**
1. **Remove the reference** if events visibility isn't needed
2. **Add the column** to `wedding_website` table if events should be toggleable

### 2. Missing from Visibility Object
**Issue:** `show_events` is not included in the visibility object passed to templates (WeddingWebsite.tsx lines 116-124).

**Impact:** Events display is controlled elsewhere (by events existence check in Footer).

---

## TypeScript Interface

**Location:** `src/types/wedding-template.ts`

```typescript
export interface VisibilitySettings {
  show_hero?: boolean;
  show_about?: boolean;
  show_story?: boolean;
  show_gallery?: boolean;
  show_events?: boolean;        // Referenced but not in DB
  show_families?: boolean;
  show_wedding_party?: boolean;
  show_chat?: boolean;
}
```

---

## Summary

✅ **Working Correctly:**
- All 7 `show_*` columns from database are properly mapped
- Visibility logic correctly shows/hides sections
- Templates respect visibility settings
- Default behaviors work as expected

❌ **Needs Attention:**
- `show_events` is referenced but doesn't exist in database
- Should either remove reference or add column to database

---

**Last Updated:** 2025-10-11
