#!/usr/bin/env node
/**
 * Re-fetch About content from rateb.rabie.us WordPress API.
 * Run: npm run sync-about-content
 */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function fetchPage(slug) {
  const url = `https://rateb.rabie.us/wp-json/wp/v2/pages?slug=${slug}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'RatebSiteSync/1.0' } });
  if (!res.ok) throw new Error(`Failed ${slug}: ${res.status}`);
  const data = await res.json();
  return data[0]?.content?.rendered ?? '';
}

function stripHtml(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const [bioHtml, cvHtml] = await Promise.all([
  fetchPage('biography-bio'),
  fetchPage('curriculum-vitae'),
]);

const out = join(ROOT, 'src/data/_sync-preview.txt');
writeFileSync(
  out,
  `=== BIOGRAPHY (${new Date().toISOString()}) ===\n\n${stripHtml(bioHtml)}\n\n=== CV ===\n\n${stripHtml(cvHtml).slice(0, 8000)}\n`,
  'utf8'
);

console.log('Wrote preview to src/data/_sync-preview.txt');
console.log('Update src/data/aboutContent.js manually from this preview if content changed on WP.');
