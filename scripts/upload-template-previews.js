const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const templates = [
  {
    id: 'template001',
    name: 'Elegant Romance',
    description: 'A beautiful, romantic template with soft colors and elegant typography',
    file: 'template001-preview.png'
  },
  {
    id: 'template002',
    name: 'Modern Minimalist',
    description: 'Clean and modern design with minimalist aesthetics',
    file: 'template002-preview.png'
  },
  {
    id: 'template003',
    name: 'Sukun Elegance',
    description: 'Elegant floral design inspired by Sukun theme with soft pinks, purples, and sophisticated typography',
    file: 'template003-preview.png'
  },
  {
    id: 'template004',
    name: 'Royal Luxury',
    description: 'Sophisticated royal wedding template with deep burgundy and rich gold, featuring Art Deco elements',
    file: 'template004-preview.png'
  }
];

async function uploadTemplatePreview(templateId, filePath) {
  try {
    console.log(`Uploading ${templateId}...`);

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = `${templateId}-preview.png`;

    // Upload to Supabase Storage (public bucket)
    const { data, error } = await supabase.storage
      .from('templates')
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      // If bucket doesn't exist, try creating it or use a different approach
      console.error(`Error uploading ${templateId}:`, error.message);

      // Try public-assets bucket as fallback
      const { data: fallbackData, error: fallbackError } = await supabase.storage
        .from('public-assets')
        .upload(`templates/${fileName}`, fileBuffer, {
          contentType: 'image/png',
          cacheControl: '3600',
          upsert: true
        });

      if (fallbackError) {
        console.error(`Fallback upload also failed for ${templateId}:`, fallbackError.message);
        return null;
      }

      // Get public URL for fallback
      const { data: urlData } = supabase.storage
        .from('public-assets')
        .getPublicUrl(`templates/${fileName}`);

      console.log(`✓ Uploaded ${templateId} to public-assets bucket`);
      return urlData.publicUrl;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('templates')
      .getPublicUrl(fileName);

    console.log(`✓ Uploaded ${templateId}: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`Exception uploading ${templateId}:`, error);
    return null;
  }
}

async function updateWebsiteTheme(templateId, name, description, previewUrl) {
  try {
    console.log(`Updating website_themes record for ${templateId}...`);

    // First, check if record exists
    const { data: existing } = await supabase
      .from('website_themes')
      .select('id')
      .eq('theme_id', templateId)
      .single();

    if (existing) {
      // Update existing record
      const { error } = await supabase
        .from('website_themes')
        .update({
          name,
          preview_image: previewUrl,
          preview_url: `http://localhost:3000/wedding/550e8400-e29b-41d4-a716-446655440000?guest=9a7bb342-0ddf-4cb4-a7e9-39ee4a95eb73`,
          status: 'active',
          account_type: 'premium'
        })
        .eq('theme_id', templateId);

      if (error) {
        console.error(`Error updating ${templateId}:`, error.message);
        return false;
      }

      console.log(`✓ Updated ${templateId}`);
    } else {
      // Insert new record
      const { error } = await supabase
        .from('website_themes')
        .insert({
          theme_id: templateId,
          name,
          preview_image: previewUrl,
          preview_url: `http://localhost:3000/wedding/550e8400-e29b-41d4-a716-446655440000?guest=9a7bb342-0ddf-4cb4-a7e9-39ee4a95eb73`,
          status: 'active',
          account_type: 'premium'
        });

      if (error) {
        console.error(`Error inserting ${templateId}:`, error.message);
        return false;
      }

      console.log(`✓ Inserted ${templateId}`);
    }

    return true;
  } catch (error) {
    console.error(`Exception updating ${templateId}:`, error);
    return false;
  }
}

async function main() {
  console.log('Starting template preview upload process...\n');

  const playwrightMcpDir = path.join(__dirname, '..', '.playwright-mcp');

  for (const template of templates) {
    const filePath = path.join(playwrightMcpDir, template.file);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    // Upload file and get URL
    const previewUrl = await uploadTemplatePreview(template.id, filePath);

    if (!previewUrl) {
      console.error(`Skipping database update for ${template.id} (upload failed)\n`);
      continue;
    }

    // Update database
    await updateWebsiteTheme(template.id, template.name, template.description, previewUrl);
    console.log('');
  }

  console.log('Template preview upload process completed!');
}

main().catch(console.error);
