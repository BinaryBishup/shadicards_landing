-- Sample data for testing guest details modal
-- Run this in Supabase SQL Editor as admin

-- Update wedding with sample extra information field configuration
UPDATE weddings SET 
extra_information = '{
  "fields": [
    {
      "label": "Language preference",
      "type": "select",
      "options": ["English", "Hindi", "Spanish", "French"],
      "required": false,
      "placeholder": "Select your preferred language"
    },
    {
      "label": "Number of plus ones",
      "type": "number",
      "required": false,
      "placeholder": "How many guests will you bring? (0-5)"
    },
    {
      "label": "Dietary restrictions",
      "type": "textarea",
      "required": false,
      "placeholder": "Please describe any dietary restrictions or preferences in detail"
    },
    {
      "label": "Transportation needed",
      "type": "checkbox",
      "required": false,
      "placeholder": "Do you need transportation to the venue?"
    },
    {
      "label": "Song request",
      "type": "text",
      "required": false,
      "placeholder": "Any special song requests for the reception?"
    },
    {
      "label": "Special accommodation",
      "type": "select",
      "options": ["None", "Wheelchair Access", "Hearing Assistance", "Seating Preference", "Other"],
      "required": false,
      "placeholder": "Do you need any special accommodations?"
    }
  ]
}',
updated_at = NOW()
WHERE id = '4de52484-c82e-411b-9fa9-475224b235f3';

-- Verify the wedding data
SELECT 
  id, 
  bride_name, 
  groom_name, 
  extra_information
FROM weddings 
WHERE id = '4de52484-c82e-411b-9fa9-475224b235f3';

-- Verify the guest data  
SELECT 
  id,
  first_name,
  last_name,
  wedding_id,
  extra_information
FROM guests 
WHERE id = '0023cd9d-7d53-45e7-8124-ab32bfdb2b6b';