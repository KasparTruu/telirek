import sharp from 'sharp';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Input and output paths
const inputPath = './src/assets/gallery/20230106_154638.jpg';
const outputPath = './src/assets/gallery/20230106_154638-optimized.jpg';

// Optimize the image
sharp(inputPath)
  .resize(1920, null, { // Set width to 1920px, maintain aspect ratio
    fit: 'inside',
    withoutEnlargement: true
  })
  .jpeg({
    quality: 80, // Adjust quality (0-100)
    progressive: true
  })
  .toFile(outputPath)
  .then(info => {
    console.log('Image optimized successfully:', info);
  })
  .catch(err => {
    console.error('Error optimizing image:', err);
  });

