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

# Live revslider backgrounds not always in docx
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
]

# slide index (1-based) -> live full-res URL
UPGRADES_BY_ID = {
    1: "https://rateb.rabie.us/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-24-at-4.12.52-PM-2.jpeg",
    2: "https://rateb.rabie.us/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-24-at-4.12.52-PM-1-1.jpeg",
    3: "https://rateb.rabie.us/wp-content/uploads/2025/03/Prince-Hassan.jpg",
    4: "https://rateb.rabie.us/wp-content/uploads/2025/03/President-Yaser-Arafat-at-his-Office.jpg",
    5: "https://rateb.rabie.us/wp-content/uploads/2025/03/President-Yaser-Arafat-presenting-a-Mother-of-Pear-for-HCEF.jpg-2-scaled.jpg",
    6: "https://rateb.rabie.us/wp-content/uploads/2025/03/Presiden-Yaser-Arafat-Receiving-HCEF-Delgation-.jpg",
    7: "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Hussain-of-Jordan-1952-to-1999-scaled.jpg",
    8: "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Abdulla-II-of-Jordan.jpg",
    10: "https://rateb.rabie.us/wp-content/uploads/2025/03/King-Abdulla-II-First-meeting-1-scaled.jpg",
    11: "https://rateb.rabie.us/wp-content/uploads/2025/03/Honoing-Dr.-Marwan-Muasher-the-former-Deputy-Prime-minister-of-Jordan-4.jpg",
    13: "https://rateb.rabie.us/wp-content/uploads/2025/03/Prince-Hassan.jpg",
}


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=90) as resp:
        dest.write_bytes(resp.read())


def ext_from_url(url: str) -> str:
    m = re.search(r"\.(jpe?g|png|webp)", url, re.I)
    return m.group(0).lower() if m else ".jpg"


def scrape_revslider_urls() -> list[str]:
    req = urllib.request.Request(HOME, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=90).read().decode("utf-8", errors="ignore")
    urls = re.findall(
        r'data-lazyload="//rateb\.rabie\.us/wp-content/uploads/([^"]+\.(?:jpg|jpeg|png))"',
        html,
        re.I,
    )
    seen = set()
    full = []
    for path in urls:
        if "dummy" in path or "rateb2.png" in path or "267_3-bg" in path:
            continue
        if path in seen:
            continue
        seen.add(path)
        full.append(f"https://rateb.rabie.us/wp-content/uploads/{path}")
    return full


def title_from_url(url: str) -> str:
    name = Path(url.split("?")[0]).stem.replace("-", " ").replace("_", " ")
    return name[:1].upper() + name[1:80]


def main():
    manifest = json.loads(MANIFEST.read_text())

    for entry in manifest:
        url = UPGRADES_BY_ID.get(entry["id"])
        if not url:
            continue
        ext = ext_from_url(url)
        new_name = f"slide-{entry['id']:02d}{ext}"
        dest = OUT / new_name
        print(f"Upgrade slide {entry['id']:02d} -> {new_name}")
        download(url, dest)
        old = OUT / entry["file"]
        if old.exists() and old != dest:
            old.unlink()
        entry["file"] = new_name

    existing_titles = {e["title"] for e in manifest}
    existing_urls = set()
    next_num = max(int(re.search(r"slide-(\d+)", e["file"]).group(1)) for e in manifest) + 1

    for slide in EXTRA_SLIDES:
        if slide["title"] in existing_titles:
            continue
        ext = ext_from_url(slide["url"])
        fn = f"slide-{next_num:02d}{ext}"
        print(f"Add {fn}: {slide['title'][:55]}...")
        download(slide["url"], OUT / fn)
        manifest.append({"title": slide["title"], "file": fn})
        existing_titles.add(slide["title"])
        next_num += 1

    for i, entry in enumerate(manifest, start=1):
        entry["id"] = i

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Done — {len(manifest)} slides")


if __name__ == "__main__":
    main()
