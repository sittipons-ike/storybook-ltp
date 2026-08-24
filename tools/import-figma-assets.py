#!/usr/bin/env python3
"""Write a saved figma_execute export into a feature's own assets directory.

Same conveyance as import-figma-logos.py — the bridge saves a large result to a file, and
that file is read here so the artwork never passes through a conversation. The difference
is the destination: logos are shared and land in ui/assets/logos, while a picture only one
page draws belongs beside that page, in features/<name>/assets.

The export snippet that produces the input lives in tools/README.md.

Usage:
    python3 tools/import-figma-assets.py <saved-result.txt> <features/<name>/assets>
"""

from __future__ import annotations

import base64
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def slug(name: str) -> str:
    s = name.strip().lower().replace("/", "-")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return re.sub(r"-{2,}", "-", s).strip("-")


def main() -> int:
    if len(sys.argv) < 3:
        print("usage: import-figma-assets.py <saved-result.txt> <out-dir>")
        return 2

    raw = Path(sys.argv[1]).read_text(encoding="utf-8", errors="replace")
    payload = json.loads(raw[raw.find("{"):])
    items = payload.get("result", payload)["items"]

    out = (ROOT / sys.argv[2]).resolve()
    out.mkdir(parents=True, exist_ok=True)

    written, skipped = [], []
    for item in items:
        stem, kind, data = slug(item["name"]), item["kind"], item.get("data", "")
        if not stem or kind not in ("png", "svg"):
            skipped.append(f"{item['name']} (kind={kind})")
            continue
        path = out / f"{stem}.{kind}"
        if kind == "svg":
            path.write_text(data, encoding="utf-8")
        else:
            path.write_bytes(base64.b64decode(data))
        written.append((path.name, path.stat().st_size))

    for n, size in sorted(written):
        print(f"  {size:>9,}  {n}")
    print(f"\n  written : {len(written)} → {out.relative_to(ROOT)}")
    if skipped:
        print(f"  skipped : {len(skipped)} — {', '.join(skipped)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
