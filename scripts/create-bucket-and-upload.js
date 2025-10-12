const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = 'https://gicvribyqmexntgfahji.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3ZyaWJ5cW1leG50Z2ZhaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjg3MDcsImV4cCI6MjA2NjcwNDcwN30.ThqdFZqJ26UY__zchL1fcniIB-PMTM40QbC7yfdGsUc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createBucket() {
  try {
    console.log('Creating "templates" bucket...');

    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('templates', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log('✓ Bucket "templates" already exists');
        return true;
      }
      console.error('Error creating bucket:', error.message);
      return false;
    }

    console.log('✓ Bucket "templates" created successfully');
    return true;
  } catch (error) {
    console.error('Exception creating bucket:', error);
    return false;
  }
}

async function uploadFile(filePath, fileName) {
  try {
    console.log(`Uploading ${fileName}...`);

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('templates')
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${fileName}:`, error.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('templates')
      .getPublicUrl(fileName);

    console.log(`✓ Uploaded ${fileName}`);
    console.log(`  URL: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`Exception uploading ${fileName}:`, error);
    return null;
  }
}

async function updateDatabaseRecord(templateId, previewUrl) {
  try {
    console.log(`Updating database for ${templateId}...`);

    const { error } = await supabase
      .from('website_themes')
      .update({
        preview_image: previewUrl
      })
      .eq('theme_id', templateId);

    if (error) {
      console.error(`Error updating ${templateId}:`, error.message);
      return false;
    }

    console.log(`✓ Updated database for ${templateId}\n`);
    return true;
  } catch (error) {
    console.error(`Exception updating database for ${templateId}:`, error);
    return false;
  }
}

async function main() {
  console.log('Starting file upload process...\n');

  // Upload hero section screenshots (bucket already created via SQL)
  const templates = [
    { id: 'template001', file: 'template001-hero.png' },
    { id: 'template002', file: 'template002-hero.png' },
    { id: 'template003', file: 'template003-hero.png' },
    { id: 'template004', file: 'template004-hero.png' }
  ];

  const playwrightMcpDir = path.join(__dirname, '..', '.playwright-mcp');

  for (const template of templates) {
    const filePath = path.join(playwrightMcpDir, template.file);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}\n`);
      continue;
    }

    // Upload file
    const previewUrl = await uploadFile(filePath, template.file);

    if (!previewUrl) {
      console.error(`Skipping database update for ${template.id}\n`);
      continue;
    }

    // Update database
    await updateDatabaseRecord(template.id, previewUrl);
  }

  console.log('Process completed successfully!');
  console.log('\nAll template preview images are now available in the "templates" bucket.');
}

main().catch(console.error);
