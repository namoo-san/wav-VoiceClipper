import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const inputImage = join(rootDir, 'public/logos/logo.png');
const publicDir = join(rootDir, 'public');

// Icon sizes to generate
const iconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

// OG image sizes
const ogSizes = [
  { width: 1200, height: 630, name: 'og-image.png' },
  { width: 1200, height: 1200, name: 'og-image-square.png' },
];

async function generateIcons() {
  console.log('🎨 Generating icons from logo.png...\n');

  try {
    // Generate favicons and app icons
    for (const { size, name } of iconSizes) {
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(join(publicDir, name));
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate OG images
    for (const { width, height, name } of ogSizes) {
      await sharp(inputImage)
        .resize(width, height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(join(publicDir, name));
      console.log(`✓ Generated ${name} (${width}x${height})`);
    }

    // Generate favicon.ico (using 32x32 as base)
    console.log('\n📦 Generating favicon.ico...');
    console.log('ℹ️  Note: For best results, use an online converter or imagemagick');
    console.log('   For now, using favicon-32x32.png as favicon.ico');
    
    const favicon32 = readFileSync(join(publicDir, 'favicon-32x32.png'));
    writeFileSync(join(publicDir, 'favicon.ico'), favicon32);
    console.log('✓ Generated favicon.ico');

    console.log('\n✨ All icons generated successfully!');
    console.log('\nGenerated files:');
    console.log('  - favicon.ico');
    console.log('  - favicon-16x16.png');
    console.log('  - favicon-32x32.png');
    console.log('  - apple-touch-icon.png (180x180)');
    console.log('  - android-chrome-192x192.png');
    console.log('  - android-chrome-512x512.png');
    console.log('  - og-image.png (1200x630)');
    console.log('  - og-image-square.png (1200x1200)');

  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
