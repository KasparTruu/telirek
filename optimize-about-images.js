import sharp from 'sharp';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// List of images to optimize
const images = [
  {
    input: './src/assets/gallery/received_1075846640045180.jpeg',
    output: './src/assets/gallery/received_1075846640045180-optimized.jpeg'
  },
  {
    input: './src/assets/gallery/IMG-759f81425f6deb80c33f40858076ab05-V.jpg',
    output: './src/assets/gallery/IMG-759f81425f6deb80c33f40858076ab05-V-optimized.jpg'
  },
  {
    input: './src/assets/gallery/IMG-2752a7c64940a81998310301973a1ed1-V.jpg',
    output: './src/assets/gallery/IMG-2752a7c64940a81998310301973a1ed1-V-optimized.jpg'
  },
  {
    input: './src/assets/gallery/IMG-ba014fc8fade0ff4036c772895e5039b-V.jpg',
    output: './src/assets/gallery/IMG-ba014fc8fade0ff4036c772895e5039b-V-optimized.jpg'
  },
  {
    input: './src/assets/gallery/received_1303031417250809.jpeg',
    output: './src/assets/gallery/received_1303031417250809-optimized.jpeg'
  }
];

// Optimize each image
for (const image of images) {
  sharp(image.input)
    .resize(1920, null, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({
      quality: 80,
      progressive: true
    })
    .toFile(image.output)
    .then(info => {
      console.log(`Optimized ${image.input}:`, info);
    })
    .catch(err => {
      console.error(`Error optimizing ${image.input}:`, err);
    });
}

