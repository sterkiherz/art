// scripts/generateGallery.js
const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '..', 'gallery'); // go up one level to gallery/
const OUTPUT_FILE = path.join(__dirname, '..', 'gallery.json'); // output at root

function isImageFile(file) {
  return /\.(jpe?g|png|gif|webp)$/i.test(file);
}

function generateGalleryData() {
  const categories = {};

  fs.readdirSync(GALLERY_DIR, { withFileTypes: true }).forEach(dirent => {
    if (dirent.isDirectory()) {
      const category = dirent.name;
      const categoryPath = path.join(GALLERY_DIR, category);
      const files = fs.readdirSync(categoryPath)
        .filter(file => isImageFile(file))
        .map(file => `gallery/${category}/${file}`); // relative paths for web use

      categories[category] = files;
    }
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(categories, null, 2));
  console.log('✅ gallery.json generated at project root.');
}

generateGalleryData();
