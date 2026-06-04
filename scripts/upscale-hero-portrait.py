#!/usr/bin/env python3
"""Upscale the original hero portrait (same image, sharper for large displays)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PORTRAIT = ROOT / "src/assets/hero-portrait.png"

try:
    from PIL import Image, ImageFilter
except ImportError:
    raise SystemExit("Pillow required")

SCALE = 3

def main():
    img = Image.open(PORTRAIT).convert("RGBA")
    w, h = img.size
    up = img.resize((w * SCALE, h * SCALE), Image.Resampling.LANCZOS)
    up = up.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=2))
    up.save(PORTRAIT, optimize=True)
    print(f"Upscaled hero-portrait.png to {up.size[0]}x{up.size[1]}")


if __name__ == "__main__":
    main()
