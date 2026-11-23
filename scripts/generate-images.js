import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = path.resolve('sources/images');
const outDirs = [path.resolve('src/assets/images'), path.resolve('public/assets/images')];

outDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function processImages() {
  const files = fs.readdirSync(srcDir);

  for (const file of files) {
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const inputPath = path.join(srcDir, file);

    const isWork = base.startsWith('work-');
    const isPost = base.startsWith('post-');

    if (!isWork && !isPost) {
      continue;
    }

    const sizes = isWork
      ? [
          { width: 400, height: 316 },
          { width: 800, height: 632 },
        ]
      : [
          { width: 150, height: 150 },
          { width: 300, height: 300 },
        ];

    const numMatch = base.match(/\d+/);
    const num = numMatch ? numMatch[0] : '';
    const prefix = isWork ? 'work-' : 'post-';
    const numPadded = num.padStart(2, '0');

    const names = [`${prefix}${num}`, `${prefix}${numPadded}`];

    const uniqueNames = [...new Set(names)];

    for (const size of sizes) {
      const resized = sharp(inputPath).resize(size.width, size.height, { fit: 'cover' });

      const avifBuffer = await resized.clone().avif({ quality: 80 }).toBuffer();
      const webpBuffer = await resized.clone().webp({ quality: 80 }).toBuffer();
      const jpgBuffer = await resized.clone().jpeg({ quality: 85 }).toBuffer();

      for (const name of uniqueNames) {
        for (const outDir of outDirs) {
          fs.writeFileSync(path.join(outDir, `${name}-${size.width}.avif`), avifBuffer);
          fs.writeFileSync(path.join(outDir, `${name}-${size.width}.webp`), webpBuffer);
          fs.writeFileSync(path.join(outDir, `${name}-${size.width}.jpg`), jpgBuffer);
        }
      }
    }
  }
}

processImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
