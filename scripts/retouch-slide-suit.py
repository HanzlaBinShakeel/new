#!/usr/bin/env python3
"""Reduce bright white spots on suits in hero slide images."""
import sys
from pathlib import Path

try:
    from PIL import Image, ImageFilter
    import numpy as np
except ImportError:
    print("Install: pip3 install Pillow numpy")
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
SLIDES_DIR = ROOT / "src/assets/hero-slides"

# Slides with outdoor suits / known hotspot issues
TARGETS = ["slide-03.png", "slide-03.jpg", "slide-15.jpg", "slide-15.jpeg"]


def retouch(path: Path) -> None:
    im = Image.open(path).convert("RGB")
    arr = np.array(im, dtype=np.float32)
    h, w = arr.shape[:2]

    brightness = arr.mean(axis=2)
    # Hotspots: very bright but not blown-out sky (exclude top 25% and very high values)
    y_idx = np.arange(h)[:, None]
    region = y_idx > int(h * 0.22)
    hotspot = region & (brightness > 200) & (brightness < 248)

    # Slightly darken and add warmth to suit highlights
    for c in range(3):
        channel = arr[:, :, c]
        channel[hotspot] *= 0.88
        arr[:, :, c] = channel

    # Gentle local contrast on center crop (where subjects sit)
    x0, x1 = int(w * 0.05), int(w * 0.95)
    y0, y1 = int(h * 0.15), int(h * 0.92)
    center = arr[y0:y1, x0:x1]
    center_img = Image.fromarray(np.clip(center, 0, 255).astype(np.uint8))
    center_img = center_img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=4))
    arr[y0:y1, x0:x1] = np.array(center_img, dtype=np.float32)

    out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    out.save(path, quality=92, optimize=True)
    print(f"Retouched {path.name}")


def main():
    for name in TARGETS:
        p = SLIDES_DIR / name
        if p.exists():
            retouch(p)
    # Also retouch any slide-03.* after upgrade
    for p in SLIDES_DIR.glob("slide-03.*"):
        if p.suffix.lower() in {".png", ".jpg", ".jpeg"}:
            retouch(p)


if __name__ == "__main__":
    main()
