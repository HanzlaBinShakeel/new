#!/usr/bin/env python3
"""Download full-resolution hero/gallery images from rateb.rabie.us revslider."""
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/assets/hero-slides"
MANIFEST = ROOT / "src/data/heroSlides.manifest.json"
HOME = "https://rateb.rabie.us/"

# Extra slides on live site (beyond docx) — title + URL
EXTRA_SLIDES = [
    {
        "title": "Official meeting with President Mahmoud Abbas of Palestine",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/Mahmoud-Abas-President-of-Palestine-1-scaled.jpg",
    },
    {
        "title": "Meeting with Dr. Hanan Ashrawi, Chair of the Board of Trustees, Birzeit University",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/03/Dr.-Hanan-Ashrawi-Chair-Board-of-Trusties-Birzeit-universit-scaled.jpg",
    },
    {
        "title": "Diplomatic reception and institutional partnership",
        "url": "https://rateb.rabie.us/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-22-at-6.13.20-AM.jpeg",
    },
    {
        "title": "Leadership dialogue with distinguished guests",
        "url": "https://rateb.rabie.us/wp-content/uploads/2026/02/2222222.jpeg",
    },
]

# Replace docx slides with higher-res live versions when available
UPGRADES = {
    "slide-01.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-24-at-4.12.52-PM-2.jpeg",
    "slide-02.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-24-at-4.12.52-PM-1-1.jpeg",
    "slide-03.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/Prince-Hassan.jpg",
    "slide-07.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Hussain-of-Jordan-1952-to-1999-scaled.jpg",
    "slide-08.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Abdulla-II-of-Jordan.jpg",
    "slide-04.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/President-Yaser-Arafat-at-his-Office.jpg",
    "slide-05.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/President-Yaser-Arafat-presenting-a-Mother-of-Pear-for-HCEF.jpg-2-scaled.jpg",
    "slide-06.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/Presiden-Yaser-Arafat-Receiving-HCEF-Delgation-.jpg",
    "slide-10.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Abdulla-II-First-meeting-1-scaled.jpg",
    "slide-11.png": "https://rateb.rabie.us/wp-content/uploads/2025/03/Honoing-Dr.-Marwan-Muasher-the-former-Deputy-Prime-minister-of-Jordan-4.jpg",
}


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        dest.write_bytes(resp.read())


def ext_from_url(url: str) -> str:
    m = re.search(r"\.(jpe?g|png|webp)", url, re.I)
    return m.group(0).lower() if m else ".jpg"


def main():
    manifest = json.loads(MANIFEST.read_text())

    for entry in manifest:
        url = UPGRADES.get(entry["file"])
        if not url:
            continue
        ext = ext_from_url(url)
        new_name = Path(entry["file"]).stem + ext
        dest = OUT / new_name
        print(f"Upgrade {entry['file']} -> {new_name}")
        download(url, dest)
        if new_name != entry["file"]:
            old = OUT / entry["file"]
            if old.exists():
                old.unlink()
        entry["file"] = new_name

    existing_titles = {e["title"] for e in manifest}
    next_num = max(int(re.search(r"slide-(\d+)", e["file"]).group(1)) for e in manifest) + 1
    next_id = max(e["id"] for e in manifest) + 1
    for slide in EXTRA_SLIDES:
        if slide["title"] in existing_titles:
            continue
        ext = ext_from_url(slide["url"])
        fn = f"slide-{next_num:02d}{ext}"
        dest = OUT / fn
        print(f"Add {fn}: {slide['title'][:50]}...")
        download(slide["url"], dest)
        manifest.append({"id": next_id, "title": slide["title"], "file": fn})
        existing_titles.add(slide["title"])
        next_num += 1
        next_id += 1

    # Re-number ids sequentially
    for i, entry in enumerate(manifest, start=1):
        entry["id"] = i

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Done — {len(manifest)} slides in manifest")


if __name__ == "__main__":
    main()
