/**
 * Download hero/gallery images from rateb.rabie.us rev slider (not already in docx set).
 * Run: node scripts/fetch-live-hero-slides.mjs
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src/assets/hero-slides');
const manifestPath = path.join(root, 'src/data/heroSlides.manifest.json');

const SKIP_PATTERN =
  /revslider\/slider-3\/267|rateb2\.png|Gemini_Generated|2222222|portfolio-image|home4-image|home2-image/i;

function titleFromUrl(url) {
  const base = decodeURIComponent(path.basename(url).replace(/\.[^.]+$/, ''));
  return base
    .replace(/-scaled$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const html = await fetch('https://rateb.rabie.us/', {
  headers: { 'User-Agent': 'Mozilla/5.0' },
}).then((r) => r.text());

const urls = [
  ...new Set(
    [...html.matchAll(/data-lazyload="(\/\/[^"]+)"/g)].map((m) => `https:${m[1]}`)
  ),
].filter((u) => !SKIP_PATTERN.test(u));

mkdirSync(outDir, { recursive: true });
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const existingTitles = new Set(manifest.map((e) => e.title.toLowerCase()));

let nextId = manifest.length ? Math.max(...manifest.map((e) => e.id)) + 1 : 1;
let nextNum = manifest.length
  ? Math.max(...manifest.map((e) => parseInt(e.file.match(/\d+/)?.[0] || '0', 10))) + 1
  : 1;

const added = [];

for (const url of urls) {
  const ext = path.extname(url).split('?')[0] || '.jpg';
  const file = `slide-${String(nextNum).padStart(2, '0')}${ext}`;
  const dest = path.join(outDir, file);
  if (existsSync(dest)) {
    nextNum += 1;
    continue;
  }

  const title = titleFromUrl(url);
  const key = title.toLowerCase();
  if (existingTitles.has(key)) continue;

  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8000) continue;
    writeFileSync(dest, buf);
    manifest.push({ id: nextId, title, file });
    existingTitles.add(key);
    added.push({ file, title });
    nextId += 1;
    nextNum += 1;
  } catch {
    /* skip failed downloads */
  }
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Added ${added.length} slides from live site. Total: ${manifest.length}`);
added.forEach((a) => console.log(`  + ${a.file}: ${a.title}`));
