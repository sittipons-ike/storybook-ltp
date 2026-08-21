#!/usr/bin/env python3
"""Repair icon path data that the Figma export corrupted.

Two icons — `filled-Male` and `filled-Female` — shipped with `nan` coordinates, so the
browser rejects the whole `d` attribute and the glyph renders as nothing. Figma's source
geometry is clean, so this rebuilds the paths from it.

Figma returns a vector's path in the vector's own coordinate space; the vector sits at an
offset inside the 24x24 component frame. Translating by that offset puts the path back in
the viewBox the Icon component renders with.

Usage:
    python3 tools/fix-icon-paths.py --source /tmp/figma_paths.json [--dry-run]

The source JSON is `{ "<icon-name>": { "dx": N, "dy": N, "data": "<figma path>" } }`,
captured from the Desktop Bridge (see tools/README.md).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ICON_DATA = REPO / "UI Library" / "icons" / "icon-data.ts"

# Paths from Figma use absolute M/L/C/Z only — no arcs, so every number is a coordinate
# and a translate is just addition. Assert that rather than assume it.
ALLOWED_COMMANDS = set("MLCZ")

TOKEN = re.compile(r"([A-Za-z])|(-?\d*\.?\d+(?:e-?\d+)?)")


def fmt(n: float) -> str:
    """Match the existing file's compact style: trim trailing zeros, cap precision."""
    s = f"{round(n, 4):.4f}".rstrip("0").rstrip(".")
    return s if s not in ("-0", "") else "0"


def translate(data: str, dx: float, dy: float) -> str:
    tokens = [(m.group(1), m.group(2)) for m in TOKEN.finditer(data)]

    commands = {c for c, _ in tokens if c}
    unknown = commands - ALLOWED_COMMANDS
    if unknown:
        raise ValueError(f"unsupported path commands {sorted(unknown)} — translate would corrupt them")

    out: list[str] = []
    pending: list[float] = []
    axis = 0

    def flush():
        nonlocal pending
        for i, v in enumerate(pending):
            out.append(fmt(v + (dx if i % 2 == 0 else dy)))
        pending = []

    for cmd, num in tokens:
        if cmd:
            flush()
            out.append(cmd)
            axis = 0
        else:
            pending.append(float(num))
    flush()

    # Re-join in the file's compact form: no space after a command, single space between
    # numbers, so it reads the same as every other entry.
    text = ""
    for tok in out:
        if tok.isalpha():
            text += tok
        else:
            text += (" " if text and text[-1] not in "MLCZ " else "") + tok
    return text


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", type=Path, required=True)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    source = json.loads(args.source.read_text(encoding="utf-8"))
    text = ICON_DATA.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)

    patched = 0
    for name, spec in source.items():
        fixed = translate(spec["data"], spec["dx"], spec["dy"])
        if re.search(r"nan|infinity|undefined", fixed, re.I):
            print(f"error: rebuilt path for {name} still has bad tokens", file=sys.stderr)
            return 1

        found = False
        for i, line in enumerate(lines):
            m = re.match(rf"^(  '{re.escape(name)}': \{{ paths: \[\")(.*?)(\"\].*)$", line)
            if not m:
                continue
            before = m.group(2)
            lines[i] = f"{m.group(1)}{fixed}{m.group(3)}\n"
            found = True
            patched += 1
            bad = len(re.findall(r"nan", before, re.I))
            print(f"{name}: {bad} bad tokens -> clean, {len(before)} -> {len(fixed)} chars")
            break
        if not found:
            print(f"warning: {name} not found in icon-data.ts (or its shape differs)", file=sys.stderr)

    if args.dry_run:
        print("\ndry run — nothing written")
        return 0

    ICON_DATA.write_text("".join(lines), encoding="utf-8")
    print(f"\nwrote {ICON_DATA.relative_to(REPO)} ({patched} icons repaired)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
