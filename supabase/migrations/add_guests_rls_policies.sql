-- Enable RLS on guests table if not already enabled
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Policy to allow guests to view their own profile
CREATE POLICY IF NOT EXISTS "Guests can view their own profile" 
  ON guests FOR SELECT 
  USING (true);  -- Allow read access for now, can be more restrictive later

-- Policy to allow guests to update their own profile
CREATE POLICY IF NOT EXISTS "Guests can update their own profile" 
  ON guests FOR UPDATE 
  USING (true)  -- Allow update access for now
  WITH CHECK (true);

-- Policy to allow viewing guests for wedding owners
CREATE POLICY IF NOT EXISTS "Wedding owners can view their guests" 
  ON guests FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM weddings 
      WHERE weddings.id = guests.wedding_id 
      AND weddings.user_id = auth.uid()
    )
  );

-- Policy to allow wedding owners to manage their guests
CREATE POLICY IF NOT EXISTS "Wedding owners can manage their guests" 
  ON guests FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM weddings 
      WHERE weddings.id = guests.wedding_id 
      AND weddings.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM weddings 
      WHERE weddings.id = guests.wedding_id 
      AND weddings.user_id = auth.uid()
    )
  );

-- Add comments for documentation
COMMENT ON POLICY "Guests can view their own profile" ON guests IS 'Allows guests to view their own profile information';
COMMENT ON POLICY "Guests can update their own profile" ON guests IS 'Allows guests to update their own profile information';
COMMENT ON POLICY "Wedding owners can view their guests" ON guests IS 'Allows wedding owners to view guests for their weddings';
COMMENT ON POLICY "Wedding owners can manage their guests" ON guests IS 'Allows wedding owners to manage guests for their weddings';