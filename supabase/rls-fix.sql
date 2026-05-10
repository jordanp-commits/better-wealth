-- Enable Row Level Security on every public table and grant minimum
-- access required for the site to keep working with the anon key.
--
-- The site uses two roles:
--   * anon          — embedded in the browser bundle; reads workshops + dates
--   * service_role  — server-only; used by all API routes (bookings,
--                     customers, newsletter_subscribers, waitlist_applications,
--                     and the seed-dates / stripe webhook routes). RLS is
--                     bypassed for service_role, so no policies are needed
--                     for those tables.
--
-- Run this in the Supabase SQL Editor (or via psql) once. Re-running is
-- safe: ALTER TABLE … ENABLE RLS is idempotent, and the policy creates
-- are guarded by DROP POLICY IF EXISTS.

-- 1. Lock every public table down by default
ALTER TABLE public.workshops              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workshop_dates         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_applications  ENABLE ROW LEVEL SECURITY;

-- 2. Public read access for the workshop catalogue + dates picker
DROP POLICY IF EXISTS "anon_select_workshops" ON public.workshops;
CREATE POLICY "anon_select_workshops"
  ON public.workshops
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "anon_select_workshop_dates" ON public.workshop_dates;
CREATE POLICY "anon_select_workshop_dates"
  ON public.workshop_dates
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 3. Verification: every public table should now show rowsecurity = true
SELECT schemaname, tablename, rowsecurity
FROM   pg_tables
WHERE  schemaname = 'public'
ORDER  BY tablename;

-- 4. Verification: only the two SELECT policies above should be listed
SELECT schemaname, tablename, policyname, roles, cmd
FROM   pg_policies
WHERE  schemaname = 'public'
ORDER  BY tablename, policyname;
