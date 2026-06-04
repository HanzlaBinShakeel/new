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


def retouch(path: Path) -> None:
    im = Image.open(path).convert("RGB")
    arr = np.array(im, dtype=np.float32)
    h, w = arr.shape[:2]

    y_idx = np.arange(h)[:, None]
    x_idx = np.arange(w)[None, :]
    brightness = arr.mean(axis=2)

    # Subject area: lower 80%, center 75% width (where suits appear)
    subject = (
        (y_idx > int(h * 0.18))
        & (y_idx < int(h * 0.95))
        & (x_idx > int(w * 0.12))
        & (x_idx < int(w * 0.88))
    )
    hotspot = subject & (brightness > 178) & (brightness < 252)

    # Pull highlights down and warm shadows on navy suits
    for c in range(3):
        ch = arr[:, :, c]
        ch[hotspot] = ch[hotspot] * 0.82 + (20 if c == 0 else 15 if c == 1 else 10)
        arr[:, :, c] = ch

    # Second pass: extreme spots only
    hotspot2 = subject & (brightness > 210) & (brightness < 245)
    for c in range(3):
        ch = arr[:, :, c]
        ch[hotspot2] *= 0.78
        arr[:, :, c] = ch

    x0, x1 = int(w * 0.05), int(w * 0.95)
    y0, y1 = int(h * 0.12), int(h * 0.94)
    center = np.clip(arr[y0:y1, x0:x1], 0, 255).astype(np.uint8)
    center_img = Image.fromarray(center)
    center_img = center_img.filter(ImageFilter.UnsharpMask(radius=1.0, percent=35, threshold=6))
    arr[y0:y1, x0:x1] = np.array(center_img, dtype=np.float32)

    out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    out.save(path, quality=94, optimize=True)
    print(f"Retouched {path.name}")


def main():
    for p in sorted(SLIDES_DIR.glob("slide-03.*")):
        if p.suffix.lower() in {".png", ".jpg", ".jpeg"}:
            retouch(p)


if __name__ == "__main__":
    main()
