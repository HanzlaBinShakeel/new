/**
 * Sync hero slides from "My Pictures with titles.docx"
 * Run: node scripts/sync-hero-slides.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const docx = path.join(root, 'My Pictures with titles.docx');
const outDir = path.join(root, 'src/assets/hero-slides');

const py = `
import zipfile, xml.etree.ElementTree as ET, re, os, json
path = ${JSON.stringify(docx)}
out_dir = ${JSON.stringify(outDir)}
os.makedirs(out_dir, exist_ok=True)
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
with zipfile.ZipFile(path) as z:
    rid_map = {m.group(1): m.group(2) for m in re.finditer(r'Id="([^"]+)"[^>]*Target="([^"]+)"', z.read("word/_rels/document.xml.rels").decode())}
    root = ET.fromstring(z.read("word/document.xml"))
    slides, pending = [], None
    for child in root.find(f"{W}body"):
        if child.tag.split('}')[-1] != 'p': continue
        line = ''.join((t.text or '') + (t.tail or '') for t in child.iter(f"{W}t")).strip()
        blips = [rid_map[b.get(f"{R}embed")] for b in child.iter(f"{A}blip") if b.get(f"{R}embed") in rid_map]
        if blips: pending = blips[0]
        elif line and pending:
            slides.append({"title": line.replace("Formar","Former").rstrip(","), "media": pending})
            pending = None
    data = []
    for i, s in enumerate(slides):
        ext = os.path.splitext(s["media"])[1] or ".png"
        fn = f"slide-{i+1:02d}{ext}"
        open(os.path.join(out_dir, fn), "wb").write(z.read(f"word/{s['media']}"))
        data.append({"id": i+1, "title": s["title"], "file": fn})
    open(${JSON.stringify(path.join(root, 'src/data/heroSlides.manifest.json'))}, "w").write(json.dumps(data, indent=2))
    print(len(data))
`;

execSync('python3 scripts/sync-gallery-27.py', { cwd: root, stdio: 'inherit' });
execSync('python3 scripts/retouch-slide-suit.py', { cwd: root, stdio: 'inherit' });
console.log('Hero gallery synced (27 slides).');
