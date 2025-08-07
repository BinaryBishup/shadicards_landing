# Database Schema Optimization

## Overview
The wedding website configuration has been optimized to follow database normalization principles and centralize data management.

## Optimized Structure

### Core Principle
- **wedding_website_config**: Only contains website-specific settings (template, visibility, feature toggles)
- **weddings table**: Contains core wedding and couple information
- **Separate tables**: For galleries, families, wedding party members

### Tables Structure

#### 1. `wedding_website_config` (Minimized)
Website-specific configuration only:
- `wedding_id` - Reference to wedding
- `template_id` - Template selection (001-005)
- `url_slug` - Unique URL identifier
- `color_scheme` - Custom colors
- `custom_sections` - Additional content
- `visibility_mode` - Access control
- `password_protected` - Security settings
- `show_*` flags - Feature toggles
- `is_published` - Publishing status
- Analytics (`view_count`, `last_viewed_at`)

#### 2. `weddings` (Enhanced)
Core wedding and couple data:
- Basic info (names, date, venue)
- Story content (`our_story`, `how_we_met`)
- About sections (`about_bride`, `about_groom`)
- Photos (`bride_photo_url`, `groom_photo_url`, `couple_picture`)
- Contact info (WhatsApp numbers)

#### 3. `wedding_families` (New)
Family member information:
- `wedding_id` - Reference to wedding
- `side` - 'bride' or 'groom'
- `father_name`, `mother_name`
- `father_title`, `mother_title`

#### 4. `wedding_gallery` (New)
Photo gallery management:
- `wedding_id` - Reference to wedding
- `image_url` - Photo URL
- `caption` - Optional description
- `display_order` - Sorting
- `is_featured` - Highlight flag

#### 5. `wedding_party` (New)
Bridesmaids and groomsmen:
- `wedding_id` - Reference to wedding
- `name`, `role`
- `side` - 'bride' or 'groom'
- `image_url` - Optional photo
- `description` - Optional bio
- `display_order` - Sorting

#### 6. `events` (Existing)
Wedding events and ceremonies (unchanged)

## Benefits

### 1. Data Normalization
- Eliminates redundancy
- Single source of truth for each data type
- Easier to maintain and update

### 2. Centralized Management
- Wedding details managed in one place
- Changes reflect across all views
- Better data consistency

### 3. Scalability
- Easy to add new features
- Can extend individual tables without affecting others
- Better performance with proper indexes

### 4. Flexibility
- Gallery can have unlimited photos
- Wedding party can have any number of members
- Events are fully customizable

## API Function

The `get_wedding_by_slug()` function efficiently:
- Joins data from all related tables
- Returns complete wedding data in one call
- Tracks view counts automatically
- Respects publishing status

## Migration Path

Data has been successfully migrated:
1. Story content moved to `weddings` table
2. Family data moved to `wedding_families` table
3. Gallery data moved to `wedding_gallery` table
4. Wedding party moved to `wedding_party` table
5. Removed redundant columns from `wedding_website_config`

## Usage

```typescript
// Fetch complete wedding data
const weddingData = await getWeddingBySlug('anjali-weds-rohit')

// Update specific data types
await updateWeddingContent(weddingId, { our_story: 'New story' })
await updateWeddingGallery(weddingId, images)
await updateWeddingParty(weddingId, partyMembers)
await updateWeddingFamilies(weddingId, families)
```