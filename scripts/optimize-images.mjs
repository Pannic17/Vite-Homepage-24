import sharp from 'sharp';
import {mkdir, writeFile, stat} from 'node:fs/promises';
import {basename, extname, join} from 'node:path';
import {portfolio, kaiwu} from '../src/content/portfolio.js';

// Originals remain untouched; a manifest ties each variant to its original URL.
const manifest = {};
await mkdir('public/image/optimized', {recursive:true});
for (const source of [...new Set([...portfolio.map(entry => entry.cover), ...kaiwu.posters.map(poster => poster.src)])]) {
  const input = join('public', source);
  const metadata = await sharp(input).metadata();
  const stem = basename(source, extname(source)).replace(/[^a-z0-9-]/gi, '-');
  const widths = [...new Set([320,640,960].map(width => Math.min(width, metadata.width)))];
  const variants = [];
  for (const width of widths) {
    const path = `image/optimized/${stem}-${width}.webp`;
    await sharp(input).resize({width, withoutEnlargement:true}).webp({quality:82, effort:6}).toFile(join('public', path));
    variants.push({width, src:path, bytes:(await stat(join('public',path))).size});
  }
  manifest[source] = {width:metadata.width, height:metadata.height, originalBytes:(await stat(input)).size, variants};
}
await writeFile('src/content/imageVariants.json', JSON.stringify(manifest,null,2) + '\n');
console.log(`Generated variants for ${Object.keys(manifest).length} images; maximum variant ${Math.max(...Object.values(manifest).flatMap(image => image.variants.map(variant => variant.bytes)))} bytes.`);
