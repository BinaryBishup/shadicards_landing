-- New extra_information structure setup
-- Wedding defines what fields to collect, Guest stores the actual values

-- Clear existing extra_information data
UPDATE weddings SET extra_information = NULL;
UPDATE guests SET extra_information = NULL;

-- Add sample families and wedding party data
UPDATE weddings SET 
bride_families = '{
  "parents": [
    {"name": "Mr. Rajesh Sharma", "relation": "Father", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh"},
    {"name": "Mrs. Priya Sharma", "relation": "Mother", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=priya"}
  ],
  "siblings": [
    {"name": "Rahul Sharma", "relation": "Brother", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul"}
  ]
}',
groom_families = '{
  "parents": [
    {"name": "Mr. Suresh Kumar", "relation": "Father", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh"},
    {"name": "Mrs. Sunita Kumar", "relation": "Mother", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=sunita"}
  ],
  "siblings": [
    {"name": "Pooja Kumar", "relation": "Sister", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=pooja"}
  ]
}',
bridesmaids = '[
  {"name": "Neha Gupta", "relation": "Best Friend", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=neha"},
  {"name": "Kavya Patel", "relation": "College Friend", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=kavya"}
]',
groomsmen = '[
  {"name": "Arjun Singh", "relation": "Best Friend", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun"},
  {"name": "Vikram Mehta", "relation": "Cousin", "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram"}
]',
story_items = '[
  {"title": "First Meeting", "date": "2020-01-15", "description": "We met at a coffee shop in Mumbai", "image": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400"},
  {"title": "First Date", "date": "2020-02-14", "description": "A perfect Valentine''s Day dinner", "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"},
  {"title": "Engagement", "date": "2023-12-25", "description": "He proposed on Christmas morning", "image": "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400"}
]',
gallery_images = '[
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400"
]'
WHERE id = '4de52484-c82e-411b-9fa9-475224b235f3';

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