-- Database Performance Optimizations for Wedding Website
-- Execute these queries in your Supabase SQL editor

-- ==========================================
-- 1. ADD MISSING INDEXES FOR FOREIGN KEYS
-- ==========================================

-- Index for users.selected_wedding (foreign key to weddings)
CREATE INDEX IF NOT EXISTS idx_users_selected_wedding 
ON public.users(selected_wedding) 
WHERE selected_wedding IS NOT NULL;

-- Index for weddings.user_id (foreign key to auth.users)
CREATE INDEX IF NOT EXISTS idx_weddings_user_id 
ON public.weddings(user_id) 
WHERE user_id IS NOT NULL;

-- Composite index for wedding_website queries
CREATE INDEX IF NOT EXISTS idx_wedding_website_url_status 
ON public.wedding_website(url_slug, status) 
WHERE status = 'active';

-- Index for guest queries by wedding
CREATE INDEX IF NOT EXISTS idx_guests_wedding_id_id 
ON public.guests(wedding_id, id);

-- ==========================================
-- 2. FIX RLS POLICIES FOR BETTER PERFORMANCE
-- ==========================================

-- Drop existing inefficient policies and recreate with optimized patterns
-- For users table

DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
FOR SELECT USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
FOR UPDATE USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own user data" ON public.users;
CREATE POLICY "Users can insert own user data" ON public.users
FOR INSERT WITH CHECK (id = (SELECT auth.uid()));

-- For wedding_services table
DROP POLICY IF EXISTS "Users can view services for own weddings" ON public.wedding_services;
CREATE POLICY "Users can view services for own weddings" ON public.wedding_services
FOR SELECT USING (
  wedding_id IN (
    SELECT id FROM public.weddings 
    WHERE user_id = (SELECT auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can update services for own weddings" ON public.wedding_services;
CREATE POLICY "Users can update services for own weddings" ON public.wedding_services
FOR UPDATE USING (
  wedding_id IN (
    SELECT id FROM public.weddings 
    WHERE user_id = (SELECT auth.uid())
  )
);

-- For direct_deliveries table
DROP POLICY IF EXISTS "Users can manage their direct deliveries" ON public.direct_deliveries;
CREATE POLICY "Users can manage their direct deliveries" ON public.direct_deliveries
FOR ALL USING (
  wedding_id IN (
    SELECT id FROM public.weddings 
    WHERE user_id = (SELECT auth.uid())
  )
);

-- For self_deliveries table
DROP POLICY IF EXISTS "Users can manage their self deliveries" ON public.self_deliveries;
CREATE POLICY "Users can manage their self deliveries" ON public.self_deliveries
FOR ALL USING (
  wedding_id IN (
    SELECT id FROM public.weddings 
    WHERE user_id = (SELECT auth.uid())
  )
);

-- ==========================================
-- 3. CONSOLIDATE DUPLICATE RLS POLICIES
-- ==========================================

-- For guests table - consolidate multiple permissive policies
DROP POLICY IF EXISTS "Users can view guests for own weddings" ON public.guests;
DROP POLICY IF EXISTS "Users can view their wedding guests" ON public.guests;

CREATE POLICY "Users can view wedding guests" ON public.guests
FOR SELECT USING (
  wedding_id IN (
    SELECT id FROM public.weddings 
    WHERE user_id = (SELECT auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can insert guests for own weddings" ON public.guests;
DROP POLICY IF EXISTS "Users can insert guests to their weddings" ON public.guests;

CREATE POLICY "Users can insert wedding guests" ON public.guests
FOR INSERT WITH CHECK (
  wedding_id IN (
    SELECT id FROM public.weddings 
    WHERE user_id = (SELECT auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can update guests for own weddings" ON public.guests;
DROP POLICY IF EXISTS "Users can update their wedding guests" ON public.guests;

CREATE POLICY "Users can update wedding guests" ON public.guests
FOR UPDATE USING (
  wedding_id IN (
    SELECT id FROM public.weddings 
    WHERE user_id = (SELECT auth.uid())
  )
);

DROP POLICY IF EXISTS "Users can delete guests for own weddings" ON public.guests;
DROP POLICY IF EXISTS "Users can delete their wedding guests" ON public.guests;

CREATE POLICY "Users can delete wedding guests" ON public.guests
FOR DELETE USING (
  wedding_id IN (
    SELECT id FROM public.weddings 
    WHERE user_id = (SELECT auth.uid())
  )
);

-- ==========================================
-- 4. OPTIMIZE TABLE STATISTICS
-- ==========================================

-- Update table statistics for better query planning
ANALYZE public.users;
ANALYZE public.weddings;
ANALYZE public.wedding_website;
ANALYZE public.guests;
ANALYZE public.events;
ANALYZE public.event_invitations;

-- ==========================================
-- 5. CREATE MATERIALIZED VIEW FOR COMMON QUERIES (Optional)
-- ==========================================

-- If you frequently query wedding websites with full wedding data
CREATE MATERIALIZED VIEW IF NOT EXISTS public.wedding_website_full AS
SELECT 
  ww.*,
  w.bride_name,
  w.groom_name,
  w.wedding_date,
  w.venue_name,
  w.venue_address,
  w.couple_picture,
  w.bride_photo_url,
  w.groom_photo_url,
  w.about_bride,
  w.about_groom,
  w.our_story,
  w.how_we_met,
  w.rsvp_contact
FROM public.wedding_website ww
JOIN public.weddings w ON ww.wedding_id = w.id
WHERE ww.status = 'active';

-- Create index on materialized view
CREATE INDEX IF NOT EXISTS idx_wedding_website_full_url_slug 
ON public.wedding_website_full(url_slug);

-- Refresh materialized view (run periodically or after updates)
-- REFRESH MATERIALIZED VIEW CONCURRENTLY public.wedding_website_full;

-- ==========================================
-- 6. MONITORING QUERIES
-- ==========================================

-- Query to check slow queries
SELECT 
  query,
  calls,
  total_exec_time,
  mean_exec_time,
  max_exec_time
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat_statements%'
ORDER BY mean_exec_time DESC
LIMIT 20;

-- Query to check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan;

-- Query to check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ==========================================
-- 7. VACUUM AND REINDEX (Run periodically)
-- ==========================================

-- Clean up dead rows and update statistics
VACUUM ANALYZE public.guests;
VACUUM ANALYZE public.events;
VACUUM ANALYZE public.event_invitations;
VACUUM ANALYZE public.wedding_website;

-- Reindex tables with heavy updates (run during maintenance)
-- REINDEX TABLE public.guests;
-- REINDEX TABLE public.wedding_website;

-- ==========================================
-- Notes:
-- 1. Run sections 1-4 immediately for performance improvements
-- 2. Section 5 (Materialized View) is optional but helpful for frequently accessed data
-- 3. Use Section 6 queries to monitor performance
-- 4. Run Section 7 periodically (weekly/monthly) for maintenance
-- ==========================================