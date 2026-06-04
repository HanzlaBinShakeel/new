#!/usr/bin/env python3
"""
Build hero gallery with ~27 slides:
  1–14 from My Pictures with titles.docx
  15–27 from live site gallery (rateb.rabie.us revslider)
"""
import json
import re
import urllib.request
import zipfile
import xml.etree.ElementTree as ET
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / "My Pictures with titles.docx"
OUT = ROOT / "src/assets/hero-slides"
MANIFEST = ROOT / "src/data/heroSlides.manifest.json"

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"

# Live gallery images (slides 15–27) — leadership / events from rateb.rabie.us
LIVE_GALLERY = [
    {
        "title": "Official meeting with President Mahmoud Abbas of Palestine",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/Mahmoud-Abas-President-of-Palestine-1-scaled.jpg",
    },
    {
        "title": "Meeting with Dr. Hanan Ashrawi, Chair of the Board of Trustees, Birzeit University",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/Dr.-Hanan-Ashrawi-Chair-Board-of-Trusties-Birzeit-universit-scaled.jpg",
    },
    {
        "title": "Leadership dialogue with distinguished guests",
        "url": "https://rateb.rabie.us/wp-content/uploads/2026/02/2222222.jpeg",
    },
    {
        "title": "Community engagement and humanitarian outreach",
        "url": "https://rateb.rabie.us/wp-content/uploads/2026/02/Gemini_Generated_Image_6wgbok6wgbok6wgb.png",
    },
    {
        "title": "Advocacy for peace, justice, and dignity",
        "url": "https://rateb.rabie.us/wp-content/uploads/2026/02/Gemini_Generated_Image_x1ohy9x1ohy9x1oh.png",
    },
    {
        "title": "Institutional leadership and public service",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/04/1111113.jpg",
    },
    {
        "title": "Diplomatic reception and institutional partnership",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-22-at-6.13.20-AM.jpeg",
    },
    {
        "title": "Honoring Dr. Marwan Muasher, former Deputy Prime Minister of Jordan",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/Honoing-Dr.-Marwan-Muasher-the-former-Deputy-Prime-minister-of-Jordan-4.jpg",
    },
    {
        "title": "President Yasser Arafat receiving HCEF delegation",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/Presiden-Yaser-Arafat-Receiving-HCEF-Delgation-.jpg",
    },
    {
        "title": "President Yasser Arafat at his office",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/President-Yaser-Arafat-at-his-Office.jpg",
    },
    {
        "title": "First meeting with His Majesty King Abdullah II of Jordan",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Abdulla-II-First-meeting-1-scaled.jpg",
    },
    {
        "title": "Reception with His Majesty King Abdullah II of Jordan",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Abdulla-II-of-Jordan.jpg",
    },
    {
        "title": "Reception with His Majesty King Hussein of Jordan (Former)",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Hussain-of-Jordan-1952-to-1999-scaled.jpg",
    },
]


def download(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=90) as resp:
        dest.write_bytes(resp.read())


def ext_from_url(url: str) -> str:
    m = re.search(r"\.(jpe?g|png|webp)", url, re.I)
    return m.group(0).lower() if m else ".jpg"


def sync_docx_slides() -> list[dict]:
    OUT.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(DOCX) as z:
        rid_map = {
            m.group(1): m.group(2)
            for m in re.finditer(
                r'Id="([^"]+)"[^>]*Target="([^"]+)"',
                z.read("word/_rels/document.xml.rels").decode(),
            )
        }
        root = ET.fromstring(z.read("word/document.xml"))
        pairs, pending = [], None
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
                pairs.append(
                    {"title": line.replace("Formar", "Former").rstrip(","), "media": pending}
                )
                pending = None

        data = []
        for i, s in enumerate(pairs):
            ext = os.path.splitext(s["media"])[1] or ".png"
            fn = f"slide-{i + 1:02d}{ext}"
            (OUT / fn).write_bytes(z.read(f"word/{s['media']}"))
            data.append({"id": i + 1, "title": s["title"], "file": fn})
        return data


def main():
    manifest = sync_docx_slides()
    print(f"Docx: {len(manifest)} slides")

    for i, slide in enumerate(LIVE_GALLERY, start=len(manifest) + 1):
        if i > 27:
            break
        ext = ext_from_url(slide["url"])
        fn = f"slide-{i:02d}{ext}"
        dest = OUT / fn
        print(f"Live {i}: {fn}")
        download(slide["url"], dest)
        manifest.append({"id": i, "title": slide["title"], "file": fn})

    manifest = manifest[:27]
    for i, entry in enumerate(manifest, start=1):
        entry["id"] = i

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Manifest: {len(manifest)} slides")


if __name__ == "__main__":
    main()
