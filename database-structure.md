# Shaadicards Database Schema

> Complete database schema documentation for the Shaadicards wedding management platform

## Overview

**Project:** Shaadicards
**Database:** PostgreSQL 17.4.1.45
**Region:** ap-south-1 (Mumbai)
**Total Tables:** 16

This database powers a comprehensive wedding management platform that handles user management, wedding planning, guest lists, event management, invitations, deliveries, payments, and WhatsApp communications.

---

## Table of Contents

1. [Core Tables](#core-tables)
   - [users](#users)
   - [weddings](#weddings)
2. [Wedding Planning](#wedding-planning)
   - [events](#events)
   - [guests](#guests)
   - [event_invitations](#event_invitations)
3. [Website & Customization](#website--customization)
   - [wedding_website](#wedding_website)
   - [website_themes](#website_themes)
   - [event_backgrounds](#event_backgrounds)
4. [Communication](#communication)
   - [whatsapp_broadcasts](#whatsapp_broadcasts)
   - [whatsapp_message_logs](#whatsapp_message_logs)
   - [scheduled_whatsapp_messages](#scheduled_whatsapp_messages)
   - [smart_links](#smart_links)
5. [Commerce](#commerce)
   - [cards](#cards)
   - [deliveries](#deliveries)
   - [payments](#payments)
6. [Design](#design)
   - [invitation_designs](#invitation_designs)
7. [Database Relationships](#database-relationships)
8. [Custom Types & Enums](#custom-types--enums)
9. [Row Level Security (RLS)](#row-level-security-rls)

---

## Core Tables

### users

User accounts and authentication information.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | - | User ID (linked to auth.users) |
| email | text | NULLABLE, UNIQUE | - | User email address |
| first_name | text | NULLABLE | - | User's first name |
| last_name | text | NULLABLE | - | User's last name |
| profile_picture | text | NULLABLE | - | URL to profile picture |
| user_preferences | jsonb | NULLABLE | `{"theme": "light", "sidebar": true, "default_whatsapp_sending_reminder": true}` | User preferences and settings |
| created_at | timestamptz | NULLABLE | now() | Account creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |
| role | text | NULLABLE | 'user' | User role (user, admin, etc.) |
| selected_wedding | uuid | NULLABLE, FK | - | Currently selected wedding ID |
| status | text | NULLABLE | - | User account status |
| weddings | uuid[] | NULLABLE | - | Array of wedding IDs user has access to |

**Foreign Keys:**
- `id` → `auth.users.id`
- `selected_wedding` → `weddings.id`

**Referenced By:**
- `weddings.event_manager_id`

---

### weddings

Central table for wedding information and management.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Wedding ID |
| bride_first_name | varchar | REQUIRED | - | Bride's first name |
| bride_last_name | text | NULLABLE | - | Bride's last name |
| groom_first_name | varchar | REQUIRED | - | Groom's first name |
| groom_last_name | text | NULLABLE | - | Groom's last name |
| wedding_date | date | NULLABLE | - | Wedding date |
| venue_address | text | NULLABLE | - | Wedding venue address |
| is_active | boolean | NULLABLE | true | Wedding active status |
| couple_picture | text | NULLABLE | - | Couple photo URL |
| religion | text | NULLABLE | - | Religion for customization |
| bride_whatsapp | text | NULLABLE | - | Bride's WhatsApp number |
| groom_whatsapp | text | NULLABLE | - | Groom's WhatsApp number |
| user_id | uuid | NULLABLE, FK | - | Wedding owner user ID |
| bride_photo_url | text | NULLABLE | - | Bride's photo URL |
| groom_photo_url | text | NULLABLE | - | Groom's photo URL |
| about_bride | text | NULLABLE | - | About the bride |
| about_groom | text | NULLABLE | - | About the groom |
| social_handles | jsonb | NULLABLE | {} | Social media handles |
| extra_information | jsonb | NULLABLE | - | Additional wedding information |
| bride_families | jsonb | NULLABLE | - | Bride's family members |
| groom_families | jsonb | NULLABLE | - | Groom's family members |
| bride_friends | jsonb | NULLABLE | - | Bride's friends/wedding party |
| groom_friends | jsonb | NULLABLE | - | Groom's friends/wedding party |
| story_items | jsonb | NULLABLE | - | Couple's story timeline |
| gallery_images | jsonb | NULLABLE | - | Wedding gallery images |
| bride_contact | jsonb | NULLABLE | - | Bride's contact details |
| groom_contact | jsonb | NULLABLE | - | Groom's contact details |
| couple_details | jsonb | NULLABLE | {} | Additional couple details |
| payment_status | text | CHECK | 'unpaid' | Payment status (unpaid, partial, paid, refunded) |
| payment_id | uuid | NULLABLE, FK | - | Associated payment ID |
| total_amount | numeric | NULLABLE | 0 | Total payment amount |
| paid_amount | numeric | NULLABLE | 0 | Amount paid |
| payment_completed_at | timestamptz | NULLABLE | - | Payment completion timestamp |
| is_locked | boolean | NULLABLE | false | Wedding data lock status |
| delivery_locked | boolean | NULLABLE | false | Delivery lock status |
| credits | numeric | NULLABLE | - | WhatsApp credits balance |
| onboarding_step | text | NULLABLE | - | Current onboarding step |
| event_manager_id | uuid | NULLABLE, FK | - | Event manager user ID |
| event_manager_commission | jsonb | NULLABLE | {} | Commission details for event manager |
| subscription_status | text | NULLABLE | - | Subscription status |

**Foreign Keys:**
- `user_id` → `auth.users.id`
- `payment_id` → `payments.id`
- `event_manager_id` → `users.id`

**Referenced By:**
- `users.selected_wedding`
- `events.wedding_id`
- `guests.wedding_id`
- `event_invitations.wedding_id`
- `wedding_website.wedding_id`
- `smart_links.wedding_id`
- `whatsapp_broadcasts.wedding_id`
- `whatsapp_message_logs.wedding_id`
- `scheduled_whatsapp_messages.wedding_id`
- `deliveries.wedding_id`
- `payments.wedding_id`

---

## Wedding Planning

### events

Wedding events and ceremonies (e.g., Mehendi, Sangeet, Reception).

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | uuid_generate_v4() | Event ID |
| wedding_id | uuid | REQUIRED, FK | - | Associated wedding |
| name | text | REQUIRED | - | Event name |
| description | text | NULLABLE | - | Event description |
| event_date | date | REQUIRED | - | Event date |
| start_time | time | REQUIRED | - | Event start time |
| end_time | time | REQUIRED | - | Event end time |
| address | text | NULLABLE | - | Event venue address |
| guest_relationships | text[] | NULLABLE | - | Which guest groups to invite |
| icon | text | NULLABLE | - | Event icon/emoji |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |
| event_type | text | NULLABLE | - | Type of event |
| background_image | text | NULLABLE | - | Event background image URL |
| message | text | NULLABLE | - | Custom message for invitations |
| event_side | text | NULLABLE | - | Bride/Groom/Both side event |
| food_menu | text | NULLABLE | - | Food menu details |
| events_sent | boolean | NULLABLE | false | Whether invitations sent |
| events_sent_at | timestamptz | NULLABLE | - | Invitation send timestamp |

**Foreign Keys:**
- `wedding_id` → `weddings.id`

**Referenced By:**
- `event_invitations.event_id`

---

### guests

Guest list management with contact and relationship information.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | uuid_generate_v4() | Guest ID |
| wedding_id | uuid | REQUIRED, FK | - | Associated wedding |
| whatsapp | text | NULLABLE | - | WhatsApp number |
| side | text | REQUIRED, CHECK | - | bride/groom/mutual |
| relationship | text | REQUIRED | - | Relationship to couple |
| email | text | NULLABLE | - | Email address |
| address | text | NULLABLE | - | Physical address |
| notes | text | NULLABLE | - | Additional notes |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |
| preferred_language | text | NULLABLE | - | Preferred language |
| title | text | NULLABLE | - | Title (Mr., Mrs., Dr., etc.) |
| first_name | text | REQUIRED | - | First name |
| last_name | text | REQUIRED | - | Last name |
| profile_image | text | NULLABLE | - | Profile image URL |
| extra_information | jsonb | NULLABLE | - | Additional information |
| gift_hamper_id | uuid | NULLABLE | - | Associated gift hamper |
| gift_hamper_ordered | boolean | NULLABLE | false | Gift hamper order status |
| pincode | text | NULLABLE | - | Postal code |
| card_id | uuid | NULLABLE, FK | - | Associated invitation card |

**Foreign Keys:**
- `wedding_id` → `weddings.id`
- `card_id` → `cards.id`

**Referenced By:**
- `event_invitations.guest_id`
- `whatsapp_message_logs.guest_id`
- `smart_links.guest_id`
- `deliveries.guest_id`

---

### event_invitations

Event-specific guest invitations and RSVP tracking.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | uuid_generate_v4() | Invitation ID |
| event_id | uuid | REQUIRED, FK | - | Associated event |
| guest_id | uuid | REQUIRED, FK | - | Associated guest |
| wedding_id | uuid | NULLABLE, FK | - | Associated wedding |
| invitation_status | text | NULLABLE, CHECK | 'pending' | pending/sent/viewed/responded |
| rsvp_status | text | NULLABLE, CHECK | - | yes/no/maybe |
| rsvp_date | timestamptz | NULLABLE | - | RSVP response timestamp |
| plus_ones | integer | NULLABLE | 0 | Number of plus ones |
| message | text | NULLABLE | - | Custom message to guest |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |
| send_reminder | boolean | NULLABLE | true | Send reminder enabled |
| reminder_timestamp | timestamptz | NULLABLE | - | When to send reminder |
| reminder_hours | integer | NULLABLE | 24 | Hours before event to remind |
| whatsapp_status | text | NULLABLE, CHECK | 'pending' | pending/sending/sent/failed/no_credits |

**Foreign Keys:**
- `event_id` → `events.id`
- `guest_id` → `guests.id`
- `wedding_id` → `weddings.id`

---

## Website & Customization

### wedding_website

Wedding website settings and visibility controls.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Website ID |
| wedding_id | uuid | REQUIRED, FK | - | Associated wedding |
| status | text | NULLABLE, CHECK | 'active' | active/inactive/draft |
| is_password_protected | boolean | NULLABLE | false | Password protection enabled |
| password | text | NULLABLE | - | Website password |
| show_hero | boolean | NULLABLE | true | Show hero section |
| show_about | boolean | NULLABLE | true | Show about section |
| show_story | boolean | NULLABLE | true | Show story section |
| show_gallery | boolean | NULLABLE | true | Show gallery section |
| show_chat | boolean | NULLABLE | false | Show chat section |
| show_families | boolean | NULLABLE | true | Show families section |
| show_wedding_party | boolean | NULLABLE | true | Show wedding party section |
| meta_title | text | NULLABLE | - | SEO meta title |
| meta_description | text | NULLABLE | - | SEO meta description |
| og_image | text | NULLABLE | - | Open Graph image |
| view_count | integer | NULLABLE | 0 | Website view count |
| last_viewed_at | timestamptz | NULLABLE | - | Last view timestamp |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |
| template_id | uuid | NULLABLE, FK | - | Selected website theme |

**Foreign Keys:**
- `wedding_id` → `weddings.id`
- `template_id` → `website_themes.id`

---

### website_themes

Available website templates/themes.

**RLS Enabled:** ❌ No

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Theme ID |
| them_id | text | REQUIRED | - | Theme identifier |
| name | text | REQUIRED | - | Theme name |
| preview_image | text | NULLABLE | - | Theme preview image |
| preview_url | text | NULLABLE | - | Theme preview URL |
| status | text | REQUIRED, CHECK | 'active' | active/inactive/deprecated |
| account_type | text | REQUIRED, CHECK | 'free' | free/basic/premium/luxury |
| created_at | timestamptz | REQUIRED | now() | Creation timestamp |

**Referenced By:**
- `wedding_website.template_id`

---

### event_backgrounds

Background images/templates for event invitations.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Background ID |
| name | varchar | REQUIRED, UNIQUE | - | Background name |
| background_image | text | REQUIRED | - | Background image URL |
| preview_image | text | REQUIRED | - | Preview image URL |
| is_active | boolean | NULLABLE | true | Active status |
| religion | text | NULLABLE | - | Associated religion |
| icon | text | NULLABLE | - | Icon/emoji |
| created_at | timestamptz | NULLABLE | timezone('utc', now()) | Creation timestamp |
| updated_at | timestamptz | NULLABLE | timezone('utc', now()) | Last update timestamp |

---

## Communication

### whatsapp_broadcasts

WhatsApp broadcast campaigns for bulk messaging.

**RLS Enabled:** ❌ No (temporarily disabled for API access)

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Broadcast ID |
| wedding_id | uuid | NULLABLE, FK | - | Associated wedding |
| broadcast_name | text | REQUIRED | - | Broadcast campaign name |
| template_id | text | REQUIRED | - | WhatsApp template ID |
| template_name | text | REQUIRED | - | Template name |
| template_language | text | NULLABLE | 'en' | Template language |
| template_variables | jsonb | NULLABLE | - | Template variable values |
| broadcast_type | text | NULLABLE, CHECK | 'immediate' | immediate/scheduled |
| scheduled_at | timestamptz | NULLABLE | - | Scheduled send time |
| executed_at | timestamptz | NULLABLE | - | Actual send time |
| status | text | NULLABLE, CHECK | 'draft' | draft/scheduled/processing/completed/failed/cancelled |
| recipient_groups | text[] | NULLABLE | - | Target guest groups |
| total_recipients | integer | NULLABLE | 0 | Total recipients count |
| messages_sent | integer | NULLABLE | 0 | Messages sent count |
| messages_delivered | integer | NULLABLE | 0 | Messages delivered count |
| messages_read | integer | NULLABLE | 0 | Messages read count |
| messages_failed | integer | NULLABLE | 0 | Messages failed count |
| total_cost | numeric | NULLABLE | 0 | Total campaign cost |
| created_by | uuid | NULLABLE, FK | - | User who created broadcast |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |

**Foreign Keys:**
- `wedding_id` → `weddings.id`
- `created_by` → `auth.users.id`

**Referenced By:**
- `whatsapp_message_logs.broadcast_id`

---

### whatsapp_message_logs

Individual WhatsApp message delivery logs.

**RLS Enabled:** ❌ No (temporarily disabled for API access)

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Log ID |
| broadcast_id | uuid | NULLABLE, FK | - | Associated broadcast |
| wedding_id | uuid | NULLABLE, FK | - | Associated wedding |
| guest_id | uuid | NULLABLE, FK | - | Associated guest |
| phone_number | text | REQUIRED | - | Recipient phone number |
| guest_name | text | NULLABLE | - | Recipient name |
| template_name | text | REQUIRED | - | Template used |
| template_variables | jsonb | NULLABLE | - | Template variables |
| whatsapp_message_id | text | NULLABLE | - | WhatsApp message ID |
| status | text | NULLABLE, CHECK | 'pending' | pending/sent/delivered/read/failed |
| error_message | text | NULLABLE | - | Error message if failed |
| sent_at | timestamptz | NULLABLE | - | Sent timestamp |
| delivered_at | timestamptz | NULLABLE | - | Delivered timestamp |
| read_at | timestamptz | NULLABLE | - | Read timestamp |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |

**Foreign Keys:**
- `broadcast_id` → `whatsapp_broadcasts.id`
- `wedding_id` → `weddings.id`
- `guest_id` → `guests.id`

---

### scheduled_whatsapp_messages

Scheduled WhatsApp messages for future delivery.

**RLS Enabled:** ❌ No

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Message ID |
| wedding_id | uuid | REQUIRED, FK | - | Associated wedding |
| message_text | text | REQUIRED | - | Message content |
| scheduled_for | timestamptz | REQUIRED | - | Scheduled send time |
| guest_groups | text[] | REQUIRED | - | Target guest groups |
| language | varchar | NULLABLE | 'en' | Message language |
| template_name | varchar | NULLABLE | 'couple_message' | Template name |
| status | varchar | NULLABLE | 'scheduled' | scheduled/processing/completed/failed |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| processed_at | timestamptz | NULLABLE | - | Processing timestamp |
| error_message | text | NULLABLE | - | Error message if failed |
| total_sent | integer | NULLABLE | 0 | Total messages sent |
| total_failed | integer | NULLABLE | 0 | Total messages failed |

**Foreign Keys:**
- `wedding_id` → `weddings.id`

---

### smart_links

NFC/QR code smart links for guest-specific redirects.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Smart link ID |
| guest_id | uuid | REQUIRED, FK | - | Associated guest |
| wedding_id | uuid | REQUIRED, FK | - | Associated wedding |
| tap_count | integer | NULLABLE | 0 | Number of taps/scans |
| override_url | text | NULLABLE | - | Custom redirect URL |
| created_at | timestamptz | REQUIRED | timezone('utc', now()) | Creation timestamp |
| updated_at | timestamptz | REQUIRED | timezone('utc', now()) | Last update timestamp |

**Foreign Keys:**
- `guest_id` → `guests.id`
- `wedding_id` → `weddings.id`

---

## Commerce

### cards

Wedding invitation card products catalog.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Card ID |
| name | varchar | REQUIRED | - | Card name |
| category | varchar | REQUIRED | - | Card category |
| price | numeric | REQUIRED | - | Card price |
| original_price | numeric | NULLABLE | - | Original price (for discounts) |
| images | text[] | REQUIRED | - | Card image URLs |
| features | text[] | NULLABLE | - | Card features list |
| min_order | integer | NULLABLE | 1 | Minimum order quantity |
| maximum_order_limit | integer | NULLABLE | 1000 | Maximum order quantity |
| rating | numeric | NULLABLE | 0.0 | Product rating |
| reviews_count | integer | NULLABLE | 0 | Number of reviews |
| is_new | boolean | NULLABLE | false | New product flag |
| has_nfc | boolean | NULLABLE | false | Has NFC chip |
| description | text | NULLABLE | - | Card description |
| is_active | boolean | NULLABLE | true | Product active status |
| bulk_discounts | jsonb | NULLABLE | [] | Bulk discount tiers |
| bulk_discount_enabled | boolean | NULLABLE | true | Bulk discount enabled |
| weight_grams | integer | NULLABLE | 100 | Weight in grams |
| length_cm | numeric | NULLABLE | 25.00 | Length in cm |
| width_cm | numeric | NULLABLE | 18.00 | Width in cm |
| height_cm | numeric | NULLABLE | 1.00 | Height in cm |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |

**Referenced By:**
- `guests.card_id`

---

### deliveries

Card delivery management and tracking.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Delivery ID |
| wedding_id | uuid | REQUIRED, FK | - | Associated wedding |
| guest_id | uuid | REQUIRED, FK | - | Associated guest |
| type | delivery_type | REQUIRED | 'self' | self/direct |
| status | delivery_status | REQUIRED | - | pending/delivered |
| notes | text | NULLABLE | - | Delivery notes |
| delivered_date | timestamptz | NULLABLE | - | Delivery completion date |
| payment_status | text | NULLABLE | - | Payment status |
| price | numeric | NULLABLE | - | Delivery price |
| payment_id | uuid | NULLABLE, FK | - | Associated payment |
| paid_at | timestamptz | NULLABLE | - | Payment timestamp |
| razorpay_payment_id | text | NULLABLE | - | Razorpay payment ID |
| razorpay_order_id | text | NULLABLE | - | Razorpay order ID |
| razorpay_signature | text | NULLABLE | - | Razorpay signature |
| created_at | timestamptz | REQUIRED | now() | Creation timestamp |
| updated_at | timestamptz | REQUIRED | now() | Last update timestamp |

**Foreign Keys:**
- `wedding_id` → `weddings.id`
- `guest_id` → `guests.id`
- `payment_id` → `payments.id`

---

### payments

Payment transactions and order management.

**RLS Enabled:** ✅ Yes

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Payment ID |
| wedding_id | uuid | REQUIRED, FK | - | Associated wedding |
| razorpay_payment_id | text | NULLABLE, UNIQUE | - | Razorpay payment ID |
| razorpay_order_id | text | NULLABLE | - | Razorpay order ID |
| razorpay_signature | text | NULLABLE | - | Payment signature |
| amount | numeric | REQUIRED | - | Payment amount |
| currency | text | NULLABLE | 'INR' | Payment currency |
| status | text | REQUIRED, CHECK | 'pending' | pending/processing/success/failed/refunded |
| payment_method | text | NULLABLE | - | Payment method used |
| payment_type | text | NULLABLE | - | Type of payment |
| items | jsonb | NULLABLE | - | Purchased items details |
| customer_details | jsonb | NULLABLE | - | Customer information |
| metadata | jsonb | NULLABLE | - | Additional metadata |
| error_message | text | NULLABLE | - | Error message if failed |
| created_at | timestamptz | NULLABLE | now() | Creation timestamp |
| updated_at | timestamptz | NULLABLE | now() | Last update timestamp |
| paid_at | timestamptz | NULLABLE | - | Payment success timestamp |
| refunded_at | timestamptz | NULLABLE | - | Refund timestamp |
| refund_amount | numeric | NULLABLE | - | Refund amount |
| refund_reason | text | NULLABLE | - | Refund reason |

**Foreign Keys:**
- `wedding_id` → `weddings.id`

**Referenced By:**
- `weddings.payment_id`
- `deliveries.payment_id`

---

## Design

### invitation_designs

User-uploaded custom invitation designs.

**RLS Enabled:** ❌ No (temporarily disabled for debugging)

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | uuid | PRIMARY KEY | gen_random_uuid() | Design ID |
| user_id | uuid | REQUIRED, FK | - | Design owner |
| name | varchar | REQUIRED | - | Design name |
| file_url | text | REQUIRED | - | File URL |
| file_name | text | REQUIRED | - | Original filename |
| file_size | integer | REQUIRED | - | File size in bytes |
| uploaded_at | timestamptz | REQUIRED | now() | Upload timestamp |
| updated_at | timestamptz | REQUIRED | now() | Last update timestamp |

**Foreign Keys:**
- `user_id` → `auth.users.id`

---

## Database Relationships

### Entity Relationship Diagram (Textual)

```
┌─────────────┐
│   auth.users│
└──────┬──────┘
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌─────────────┐      ┌─────────────────┐
│    users    │◄─────┤ invitation_     │
│             │      │   designs       │
└──────┬──────┘      └─────────────────┘
       │
       ▼
┌─────────────┐      ┌─────────────────┐
│  weddings   │◄─────┤  whatsapp_      │
│             │      │  broadcasts     │
└──────┬──────┘      └─────────────────┘
       │
       ├──────────────┬─────────────┬─────────────┬──────────────┬──────────────┐
       │              │             │             │              │              │
       ▼              ▼             ▼             ▼              ▼              ▼
┌─────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ ┌─────────┐ ┌──────────┐
│   events    │ │  guests  │ │ wedding_ │ │ smart_links  │ │scheduled│ │ payments │
│             │ │          │ │ website  │ │              │ │whatsapp │ │          │
└──────┬──────┘ └────┬─────┘ └──────┬───┘ └──────────────┘ │messages │ └─────┬────┘
       │             │              │                        └─────────┘       │
       │             │              │                                          │
       │             │              ▼                                          │
       │             │       ┌──────────────┐                                 │
       │             │       │  website_    │                                 │
       │             │       │  themes      │                                 │
       │             │       └──────────────┘                                 │
       │             │                                                         │
       │             ├──────────────┬─────────────┐                          │
       │             │              │             │                           │
       │             ▼              ▼             ▼                           ▼
       │      ┌──────────────┐ ┌────────┐  ┌──────────┐              ┌──────────────┐
       │      │ smart_links  │ │ cards  │  │whatsapp_ │              │  deliveries  │
       │      └──────────────┘ └────────┘  │message_  │              └──────────────┘
       │                                    │  logs    │
       │                                    └──────────┘
       │
       ▼
┌──────────────────┐
│     event_       │
│   invitations    │
└──────────────────┘
```

### Key Relationships

**Users & Weddings:**
- One user can own multiple weddings
- One wedding can have one event manager (user)
- Users have a selected_wedding for quick access

**Weddings & Events:**
- One wedding can have multiple events (Mehendi, Sangeet, etc.)
- Each event belongs to one wedding

**Weddings & Guests:**
- One wedding can have many guests
- Each guest belongs to one wedding
- Guests can be assigned to cards

**Events & Invitations:**
- One event can have many invitations
- One guest can have many event invitations
- Event invitations track RSVP and WhatsApp status

**Weddings & Payments:**
- One wedding can have multiple payments
- One payment is associated with one wedding
- Weddings can reference a primary payment_id

**Weddings & Communication:**
- Weddings can have multiple WhatsApp broadcasts
- Broadcasts generate message logs for each recipient
- Scheduled messages are wedding-specific

**Guests & Deliveries:**
- Each delivery is for one guest
- Deliveries can have associated payments

**Weddings & Website:**
- Each wedding has one website configuration
- Websites can use themes from website_themes

---

## Custom Types & Enums

### delivery_type
```sql
ENUM ('self', 'direct')
```
- **self:** User can update delivery status
- **direct:** Status managed by admin/system

### delivery_status
```sql
ENUM ('pending', 'delivered')
```

### Payment Status (CHECK constraint)
```sql
CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded'))
```

### Guest Side (CHECK constraint)
```sql
CHECK (side IN ('bride', 'groom', 'mutual'))
```

### Invitation Status (CHECK constraint)
```sql
CHECK (invitation_status IN ('pending', 'sent', 'viewed', 'responded'))
```

### RSVP Status (CHECK constraint)
```sql
CHECK (rsvp_status IN ('yes', 'no', 'maybe'))
```

### WhatsApp Status (CHECK constraint)
```sql
CHECK (whatsapp_status IN ('pending', 'sending', 'sent', 'failed', 'no_credits'))
```

### Website Status (CHECK constraint)
```sql
CHECK (status IN ('active', 'inactive', 'draft'))
```

### Broadcast Type (CHECK constraint)
```sql
CHECK (broadcast_type IN ('immediate', 'scheduled'))
```

### Broadcast Status (CHECK constraint)
```sql
CHECK (status IN ('draft', 'scheduled', 'processing', 'completed', 'failed', 'cancelled'))
```

### Message Log Status (CHECK constraint)
```sql
CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed'))
```

### Website Theme Account Type (CHECK constraint)
```sql
CHECK (account_type IN ('free', 'basic', 'premium', 'luxury'))
```

---

## Row Level Security (RLS)

### Enabled Tables (User Data Protected)
- ✅ users
- ✅ weddings
- ✅ events
- ✅ guests
- ✅ event_invitations
- ✅ wedding_website
- ✅ smart_links
- ✅ event_backgrounds
- ✅ deliveries
- ✅ cards
- ✅ payments

### Disabled Tables (API/Admin Access)
- ❌ website_themes (public catalog)
- ❌ whatsapp_broadcasts (API access)
- ❌ whatsapp_message_logs (API access)
- ❌ scheduled_whatsapp_messages (system access)
- ❌ invitation_designs (debugging - temporary)

---

## Common Patterns & Best Practices

### Timestamps
Most tables include:
- `created_at` - Automatically set to `now()`
- `updated_at` - Automatically set to `now()`, should be updated on changes

### Primary Keys
All tables use UUID primary keys:
```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
```

### Foreign Key Naming
Pattern: `{table_name}_{column_name}_fkey`
Example: `guests_wedding_id_fkey`

### JSONB Usage
JSONB columns are used for flexible data:
- `user_preferences` - User settings
- `social_handles` - Social media links
- `extra_information` - Custom fields
- `template_variables` - WhatsApp template data
- `items` - Payment items breakdown
- `metadata` - Additional metadata

### Boolean Defaults
Most boolean fields default to sensible values:
- `is_active` → `true`
- `is_locked` → `false`
- `send_reminder` → `true`
- `gift_hamper_ordered` → `false`

---

## Database Statistics

- **Total Tables:** 16
- **Tables with RLS:** 11
- **Foreign Key Relationships:** 30+
- **Custom Types/Enums:** 2 (delivery_type, delivery_status)
- **CHECK Constraints:** 10+

---

## Integration Points

### Authentication
- Uses Supabase Auth (`auth.users`)
- User IDs link to `public.users` table

### Payment Gateway
- Razorpay integration
- Fields: `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`

### WhatsApp Business API
- Template-based messaging
- Delivery status tracking
- Credit-based system

### File Storage
- Profile pictures
- Wedding photos
- Gallery images
- Card designs
- Event backgrounds

---

## Notes for AI Assistants

1. **User Context:** Always filter by `wedding_id` or `user_id` when querying
2. **RLS Aware:** Remember that some tables have RLS enabled
3. **Soft Deletes:** No soft delete pattern - consider adding `deleted_at` if needed
4. **Cascading:** Review foreign key constraints before deletion operations
5. **JSONB Fields:** Schema-less data - validate structure in application layer
6. **Credits System:** WhatsApp credits are numeric and tracked per wedding
7. **Multi-tenancy:** Data is isolated by wedding_id
8. **Event Manager:** Special user role for managing weddings for clients
9. **Payment Lifecycle:** pending → processing → success/failed → (possible refund)
10. **Delivery Types:** 'self' allows user updates, 'direct' is admin-managed

---

**Last Updated:** October 4, 2025
**Schema Version:** 1.0
**Database Version:** PostgreSQL 17.4.1.45
