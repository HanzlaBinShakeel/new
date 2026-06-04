#!/usr/bin/env python3
"""Extract hero slides + titles from My Pictures with titles.docx"""
import json
import os
import re
import zipfile
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(ROOT, "My Pictures with titles.docx")
OUT_DIR = os.path.join(ROOT, "src", "assets", "hero-slides")
MANIFEST = os.path.join(ROOT, "src", "data", "heroSlides.manifest.json")

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    with zipfile.ZipFile(DOCX) as z:
        rels = z.read("word/_rels/document.xml.rels").decode()
        rid_map = {
            m.group(1): m.group(2)
            for m in re.finditer(r'Id="([^"]+)"[^>]*Target="([^"]+)"', rels)
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
                title = line.replace("Formar", "Former").rstrip(",").strip()
                slides.append({"title": title, "media": pending})
                pending = None

        data = []
        for i, s in enumerate(slides):
            ext = os.path.splitext(s["media"])[1] or ".png"
            fn = f"slide-{i + 1:02d}{ext.lower()}"
            with open(os.path.join(OUT_DIR, fn), "wb") as f:
                f.write(z.read(f"word/{s['media']}"))
            data.append({"id": i + 1, "title": s["title"], "file": fn})

    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
        f.write("\n")
    print(f"Synced {len(data)} slides from docx")


if __name__ == "__main__":
    main()
