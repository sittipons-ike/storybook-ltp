#!/usr/bin/env python3
"""Write logo exports from a saved figma_execute result into UI Library/assets/logos/.

The bridge saves large results to a file rather than returning them inline. That file is
the input here, so the artwork goes straight from Figma to disk without passing through a
conversation — which is the only way 107 assets are practical to move.

The export snippet that produces the input lives in tools/README.md.

Usage:
    python3 tools/import-figma-logos.py <saved-result.txt>
"""

from __future__ import annotations

import base64
import json
import re
import sys
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "UI Library" / "assets" / "logos"

# Figma names are human labels: `logo-bank-bay`, `gp-jidrit-leval-5-Disable`,
# `gp-jidrid-wait 2`, `logo-icon/facebook`. The file name has to be stable and safe.
def slug(name: str) -> str:
    s = name.strip().lower().replace("/", "-")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return re.sub(r"-{2,}", "-", s).strip("-")


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: import-figma-logos.py <saved-result.txt>")
        return 2

    raw = Path(sys.argv[1]).read_text(encoding="utf-8", errors="replace")
    payload = json.loads(raw[raw.find("{"):])
    items = payload.get("result", payload)["items"]

    OUT.mkdir(parents=True, exist_ok=True)
    written, skipped = [], []

    for item in items:
        name, kind, data = item["name"], item["kind"], item["data"]
        stem = slug(name)
        if not stem:
            skipped.append(name)
            continue
        if kind == "svg":
            path = OUT / f"{stem}.svg"
            path.write_text(data, encoding="utf-8")
        elif kind == "png":
            path = OUT / f"{stem}.png"
            path.write_bytes(base64.b64decode(data))
        else:
            skipped.append(f"{name} (kind={kind})")
            continue
        written.append((path.name, path.stat().st_size))

    for n, size in sorted(written):
        print(f"  {size:>8,}  {n}")
    print(f"\n  written : {len(written)}")
    if skipped:
        print(f"  skipped : {len(skipped)} — {', '.join(skipped)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
