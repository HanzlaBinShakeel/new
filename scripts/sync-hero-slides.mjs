/**
 * Sync hero slides from "My Pictures with titles.docx"
 * Run: npm run sync-hero-slides
 */
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
execSync('python3 scripts/sync-hero-slides.py', { cwd: root, stdio: 'inherit' });
console.log('Hero slides synced from docx.');
