-- New extra_information structure setup
-- Wedding defines what fields to collect, Guest stores the actual values

-- Clear existing extra_information data
UPDATE weddings SET extra_information = NULL;
UPDATE guests SET extra_information = NULL;

-- Wedding extra_information: Defines what fields to collect
UPDATE weddings SET 
extra_information = '{
  "fields": [
    {
      "label": "Language Preference",
      "type": "select",
      "options": ["English", "Hindi", "Gujarati", "Marathi", "Bengali"],
      "required": false,
      "placeholder": "Select your preferred language"
    },
    {
      "label": "Plus Ones",
      "type": "number",
      "required": false,
      "placeholder": "Number of additional guests (0-3)"
    },
    {
      "label": "Dietary Requirements",
      "type": "textarea",
      "required": false,
      "placeholder": "Any special dietary requirements or allergies"
    },
    {
      "label": "Transportation",
      "type": "checkbox",
      "required": false,
      "placeholder": "I need transportation to the venue"
    },
    {
      "label": "Song Request",
      "type": "text",
      "required": false,
      "placeholder": "Any special song requests for the celebration"
    },
    {
      "label": "Special Needs",
      "type": "select",
      "options": ["None", "Wheelchair Access", "Hearing Assistance", "Visual Assistance", "Other"],
      "required": false,
      "placeholder": "Any special accommodations needed"
    }
  ]
}',
updated_at = NOW()
WHERE id = '4de52484-c82e-411b-9fa9-475224b235f3';

-- Guest extra_information: Stores the actual values for the fields
UPDATE guests SET 
extra_information = '{
  "Language Preference": "Hindi",
  "Plus Ones": 2,
  "Dietary Requirements": "Vegetarian only, no onion or garlic",
  "Transportation": true,
  "Song Request": "Bollywood dance numbers",
  "Special Needs": "None"
}',
updated_at = NOW()
WHERE id = '0023cd9d-7d53-45e7-8124-ab32bfdb2b6b';

-- Verify the data
SELECT 
  'Wedding Configuration' as type,
  id, 
  bride_name, 
  groom_name, 
  extra_information
FROM weddings 
WHERE id = '4de52484-c82e-411b-9fa9-475224b235f3'

UNION ALL

SELECT 
  'Guest Data' as type,
  id,
  first_name as bride_name,
  last_name as groom_name,
  extra_information
FROM guests 
WHERE id = '0023cd9d-7d53-45e7-8124-ab32bfdb2b6b';