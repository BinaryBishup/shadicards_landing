#!/usr/bin/env node

/**
 * Asset Optimization Script
 * 
 * This script optimizes PNG images in the public/templates/assets directory
 * by converting them to WebP format and compressing them for better web performance.
 * 
 * Prerequisites:
 * npm install sharp imagemin imagemin-webp imagemin-pngquant
 * 
 * Usage:
 * node optimize-assets.js
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = './public/templates/assets';
const OPTIMIZED_DIR = './public/templates/assets/optimized';

async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

async function optimizeImage(inputPath, filename) {
  const baseName = path.parse(filename).name;
  const inputBuffer = await fs.readFile(inputPath);
  
  console.log(`Optimizing ${filename}...`);
  
  // Get original file size
  const originalSize = (await fs.stat(inputPath)).size;
  console.log(`  Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  
  try {
    // Create WebP version with high quality
    const webpBuffer = await sharp(inputBuffer)
      .webp({ 
        quality: 80, 
        effort: 6,
        lossless: false 
      })
      .toBuffer();
    
    const webpPath = path.join(OPTIMIZED_DIR, `${baseName}.webp`);
    await fs.writeFile(webpPath, webpBuffer);
    const webpSize = webpBuffer.length;
    console.log(`  WebP size: ${(webpSize / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - webpSize / originalSize) * 100)}% smaller)`);
    
    // Create optimized PNG version
    const optimizedPngBuffer = await sharp(inputBuffer)
      .png({ 
        quality: 85,
        compressionLevel: 9,
        progressive: true
      })
      .toBuffer();
    
    const optimizedPngPath = path.join(OPTIMIZED_DIR, `${baseName}_optimized.png`);
    await fs.writeFile(optimizedPngPath, optimizedPngBuffer);
    const pngSize = optimizedPngBuffer.length;
    console.log(`  Optimized PNG size: ${(pngSize / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - pngSize / originalSize) * 100)}% smaller)`);
    
    // Create different sizes for responsive images
    const sizes = [
      { suffix: '_sm', width: 400 },
      { suffix: '_md', width: 800 },
      { suffix: '_lg', width: 1200 }
    ];
    
    for (const size of sizes) {
      // WebP versions
      const resizedWebpBuffer = await sharp(inputBuffer)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      
      const resizedWebpPath = path.join(OPTIMIZED_DIR, `${baseName}${size.suffix}.webp`);
      await fs.writeFile(resizedWebpPath, resizedWebpBuffer);
      
      // PNG versions
      const resizedPngBuffer = await sharp(inputBuffer)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({ quality: 85, compressionLevel: 9 })
        .toBuffer();
      
      const resizedPngPath = path.join(OPTIMIZED_DIR, `${baseName}${size.suffix}.png`);
      await fs.writeFile(resizedPngPath, resizedPngBuffer);
    }
    
    console.log(`  ✓ Generated responsive variants and WebP versions`);
    
  } catch (error) {
    console.error(`  Error optimizing ${filename}:`, error.message);
  }
}

async function generateReplacementCode() {
  const replacementCode = `
// OPTIMIZED IMAGE REPLACEMENTS
// Replace the original image imports with these optimized versions:

// Original: flower_countdown.png (1.8MB) -> Optimized versions:
<Image
  src="/templates/assets/optimized/flower_countdown.webp"
  alt="Decorative floral countdown element"
  width={96}
  height={96}
  className="w-full h-full object-contain"
  priority={false}
  quality={80}
/>

// For responsive images:
<picture>
  <source
    srcSet="/templates/assets/optimized/flower_countdown_sm.webp 400w,
            /templates/assets/optimized/flower_countdown_md.webp 800w,
            /templates/assets/optimized/flower_countdown_lg.webp 1200w"
    sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 1200px"
    type="image/webp"
  />
  <source
    srcSet="/templates/assets/optimized/flower_countdown_sm.png 400w,
            /templates/assets/optimized/flower_countdown_md.png 800w,
            /templates/assets/optimized/flower_countdown_lg.png 1200w"
    sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 1200px"
    type="image/png"
  />
  <Image
    src="/templates/assets/optimized/flower_countdown_md.webp"
    alt="Decorative floral countdown element"
    width={800}
    height={800}
    className="w-full h-full object-contain"
  />
</picture>
  `;
  
  await fs.writeFile('./OPTIMIZATION_GUIDE.md', replacementCode);
  console.log('\n📋 Generated OPTIMIZATION_GUIDE.md with replacement code');
}

async function main() {
  try {
    console.log('🚀 Starting asset optimization...\n');
    
    await ensureDir(OPTIMIZED_DIR);
    
    const files = await fs.readdir(ASSETS_DIR);
    const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');
    
    if (pngFiles.length === 0) {
      console.log('No PNG files found to optimize.');
      return;
    }
    
    console.log(`Found ${pngFiles.length} PNG files to optimize:\n`);
    
    for (const file of pngFiles) {
      const inputPath = path.join(ASSETS_DIR, file);
      await optimizeImage(inputPath, file);
      console.log('');
    }
    
    await generateReplacementCode();
    
    console.log('✨ Optimization complete!');
    console.log('\n📊 Summary:');
    console.log('- Optimized PNG and WebP versions created');
    console.log('- Responsive variants (sm, md, lg) generated');
    console.log('- Files saved to: public/templates/assets/optimized/');
    console.log('\n💡 Next steps:');
    console.log('1. Update your Image components to use the optimized versions');
    console.log('2. Consider using the responsive variants for better performance');
    console.log('3. Check OPTIMIZATION_GUIDE.md for replacement code examples');
    
  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

main();