#!/usr/bin/env python3
"""Reduce white specks on dark suits in hero slide 03 (Prince Hassan conversation)."""
import os
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SLIDE = ROOT / "src/assets/hero-slides/slide-03.jpg"

try:
    from PIL import Image, ImageFilter
except ImportError:
    print("Pillow not installed; skip retouch")
    raise SystemExit(0)


def retouch(path: Path):
    img = Image.open(path).convert("RGB")
    arr = np.asarray(img, dtype=np.float32)
    lum = arr.mean(axis=2)
    # Dark suit / background: not sky, not skin highlights
    dark = lum < 120
    # Small white dust spots on dark areas
    spots = dark & (lum > 72) & (arr.max(axis=2) - arr.min(axis=2) < 55)
    if not spots.any():
        print("No spots mask; saving mild pass")
    blurred = np.asarray(img.filter(ImageFilter.GaussianBlur(radius=2)), dtype=np.float32)
    out = arr.copy()
    out[spots] = blurred[spots] * 0.55 + arr[spots] * 0.45
    # Slightly deepen very bright specks
    hot = dark & (lum > 95) & (arr.max(axis=2) > 200)
    out[hot] *= 0.82
    Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(path, optimize=True)
    print("Retouched", path)


if __name__ == "__main__":
    if SLIDE.exists():
        retouch(SLIDE)
    else:
        # try jpg from re-sync
        for ext in (".jpg", ".jpeg", ".png"):
            p = SLIDE.with_suffix(ext)
            if p.exists():
                retouch(p)
                break
