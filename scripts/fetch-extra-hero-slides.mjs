/**
 * Download gallery images from rateb.rabie.us that are not in the docx set.
 * Run after: python3 scripts/sync-hero-slides.py
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src/assets/hero-slides');
const manifestPath = path.join(root, 'src/data/heroSlides.manifest.json');

const EXTRA = [
  {
    url: 'https://rateb.rabie.us/wp-content/uploads/2026/02/2222222.jpeg',
    title: 'Leadership dialogue with distinguished guests',
  },
  {
    url: 'https://rateb.rabie.us/wp-content/uploads/2026/02/Gemini_Generated_Image_6wgbok6wgbok6wgb.png',
    title: 'Community engagement and humanitarian outreach',
  },
  {
    url: 'https://rateb.rabie.us/wp-content/uploads/2026/02/Gemini_Generated_Image_x1ohy9x1ohy9x1oh.png',
    title: 'Advocacy for peace, justice, and dignity',
  },
  {
    url: 'https://rateb.rabie.us/wp-content/uploads/2025/03/Mahmoud-Abas-President-of-Palestine-1-scaled.jpg',
    title: 'Official meeting with President Mahmoud Abbas of Palestine',
  },
  {
    url: 'https://rateb.rabie.us/wp-content/uploads/2025/04/1111113.jpg',
    title: 'Diplomatic reception and institutional partnership',
  },
  {
    url: 'https://rateb.rabie.us/wp-content/uploads/2025/03/Dr.-Hanan-Ashrawi-Chair-Board-of-Trusties-Birzeit-universit-scaled.jpg',
    title: 'Meeting with Dr. Hanan Ashrawi, Chair of the Board of Trustees, Birzeit University',
  },
  {
    url: 'https://rateb.rabie.us/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-22-at-6.13.20-AM.jpeg',
    title: 'Honoring Mr. Mehdi Hasan, Broadcaster and Journalist',
  },
  {
    url: 'https://rateb.rabie.us/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-24-at-4.12.52-PM-2.jpeg',
    title: 'Reception with His Majesty King Abdullah II of Jordan',
  },
];

mkdirSync(outDir, { recursive: true });
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
let nextId = manifest.length + 1;

for (const item of EXTRA) {
  const exists = manifest.some((m) => m.title === item.title);
  if (exists) continue;

  const res = await fetch(item.url);
  if (!res.ok) {
    console.warn('Skip', item.url, res.status);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = path.extname(new URL(item.url).pathname).toLowerCase() || '.jpg';
  const file = `slide-${String(nextId).padStart(2, '0')}${ext}`;
  writeFileSync(path.join(outDir, file), buf);
  manifest.push({ id: nextId, title: item.title, file });
  console.log('Added', file, item.title);
  nextId += 1;
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log('Total slides:', manifest.length);
