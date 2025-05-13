import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const galleryDir = './src/assets/gallery';
const optimizedSuffix = '-optimized';

async function optimizeImages() {
  try {
    // Get all files in the gallery directory
    const files = await fs.readdir(galleryDir);
    
    // Filter for image files and exclude already optimized ones
    const imageFiles = files.filter(file => {
      const isImage = /\.(jpg|jpeg|png)$/i.test(file);
      const isNotOptimized = !file.includes(optimizedSuffix);
      return isImage && isNotOptimized;
    });

    console.log(`Found ${imageFiles.length} images to optimize...`);

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(galleryDir, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const outputPath = path.join(galleryDir, `${baseName}${optimizedSuffix}${ext}`);

      try {
        const info = await sharp(inputPath)
          .rotate(0) // Force no rotation
          .resize(1920, null, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({
            quality: 80,
            progressive: true,
            force: false // Don't force JPEG if input is PNG
          })
          .withMetadata({ orientation: undefined }) // Remove orientation metadata
          .toFile(outputPath);

        console.log(`Optimized ${file}:`, info);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  } catch (err) {
    console.error('Error reading gallery directory:', err);
  }
}

optimizeImages();

