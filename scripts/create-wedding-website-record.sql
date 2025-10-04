-- Create a wedding_website record for the test wedding
-- Run this SQL in your Supabase SQL Editor

INSERT INTO wedding_website (
  wedding_id,
  status,
  is_password_protected,
  password,
  show_hero,
  show_about,
  show_story,
  show_gallery,
  show_families,
  show_wedding_party,
  show_chat
)
VALUES (
  'f406f574-10b5-4dba-a386-8f0d18bf4c29',  -- Your wedding ID
  'inactive',                              -- Set to 'inactive' to test redirect
  false,                                   -- Not password protected
  null,                                    -- No password
  true,                                    -- Show hero section
  true,                                    -- Show about section
  true,                                    -- Show story section
  true,                                    -- Show gallery section
  true,                                    -- Show families section
  true,                                    -- Show wedding party section
  false                                    -- Don't show chat section
);

-- After inserting, you can update the status with:
-- UPDATE wedding_website SET status = 'inactive' WHERE wedding_id = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

-- Or set it to active:
-- UPDATE wedding_website SET status = 'active' WHERE wedding_id = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';

-- Or enable password protection:
-- UPDATE wedding_website SET is_password_protected = true, password = 'test123' WHERE wedding_id = 'f406f574-10b5-4dba-a386-8f0d18bf4c29';
