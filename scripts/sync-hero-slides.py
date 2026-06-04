#!/usr/bin/env python3
"""Sync hero slides from My Pictures with titles.docx"""
import zipfile
import xml.etree.ElementTree as ET
import re
import os
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / "My Pictures with titles.docx"
OUT_DIR = ROOT / "src/assets/hero-slides"
MANIFEST = ROOT / "src/data/heroSlides.manifest.json"

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"

OUT_DIR.mkdir(parents=True, exist_ok=True)

with zipfile.ZipFile(DOCX) as z:
    rid_map = {
        m.group(1): m.group(2)
        for m in re.finditer(
            r'Id="([^"]+)"[^>]*Target="([^"]+)"',
            z.read("word/_rels/document.xml.rels").decode(),
        )
    }
    root = ET.fromstring(z.read("word/document.xml"))
    slides, pending = [], None
    for child in root.find(f"{W}body"):
        if child.tag.split("}")[-1] != "p":
            continue
        line = "".join((t.text or "") + (t.tail or "") for t in child.iter(f"{W}t")).strip()
        blips = [
            rid_map[b.get(f"{R}embed")]
            for b in child.iter(f"{A}blip")
            if b.get(f"{R}embed") in rid_map
        ]
        if blips:
            pending = blips[0]
        elif line and pending:
            slides.append(
                {"title": line.replace("Formar", "Former").rstrip(","), "media": pending}
            )
            pending = None

    data = []
    for i, s in enumerate(slides):
        ext = os.path.splitext(s["media"])[1] or ".png"
        fn = f"slide-{i + 1:02d}{ext}"
        (OUT_DIR / fn).write_bytes(z.read(f"word/{s['media']}"))
        data.append({"id": i + 1, "title": s["title"], "file": fn})

MANIFEST.write_text(json.dumps(data, indent=2) + "\n")
print(f"Synced {len(data)} slides")
