#!/usr/bin/env python3
"""Build the logo manifest from what is actually on disk.

The Logo component needs to know which marks exist and in what format. Reading the
directory rather than hand-keeping a list means the manifest cannot claim a file that is
not there — the failure mode a design system can least afford in an asset registry.

Usage:
    python3 tools/gen-logo-manifest.py [--check]
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
LOGOS = REPO / "ui" / "assets" / "logos"
# Not inside assets/: that directory is served verbatim by `staticDirs`, and a
# TypeScript module has no business being downloadable alongside the artwork.
OUT = REPO / "ui" / "logos" / "logos.generated.ts"

# Prefix -> the group a mark belongs to. Figma's own naming, not a taxonomy invented here.
GROUPS = [
    ("logo-bank-", "bank"),
    ("logo-icon-", "social-icon"),
    ("logo-", "brand"),
    ("gp-quick-menu-", "quick-menu"),
    ("gp-tab-menu-", "tab-menu"),
    ("gp-nm-", "nav-menu"),
    ("gp-jidrit", "jidrit"),
    ("gp-jidrid", "jidrit"),
    ("gp-gift", "gift"),
    ("gp-", "graphic"),
]


def group_of(stem: str) -> str:
    for prefix, name in GROUPS:
        if stem.startswith(prefix):
            return name
    return "other"


def build() -> str:
    files = sorted(p for p in LOGOS.iterdir() if p.suffix in {".svg", ".png"})
    entries = [
        {"name": p.stem, "file": p.name, "format": p.suffix.lstrip("."),
         "group": group_of(p.stem), "bytes": p.stat().st_size}
        for p in files
    ]

    lines = [
        "// ===================================================================",
        "// logos.generated.ts — GENERATED FILE, DO NOT EDIT BY HAND",
        "// Regenerate: python3 tools/gen-logo-manifest.py",
        "//",
        "// Built by listing ui/assets/logos, so every entry is a file that",
        "// exists. Marks are served from that directory via `staticDirs`; they are not",
        "// bundled and they are deliberately not recolourable — several are third-party",
        "// brand marks and none may be tinted.",
        "// ===================================================================",
        "",
        "import { asset } from '../foundations/asset';",
        "",
        "export interface LogoEntry {",
        "  /** File stem, and the name Logo takes. */",
        "  name: string;",
        "  file: string;",
        "  format: 'svg' | 'png';",
        "  group: string;",
        "  bytes: number;",
        "}",
        "",
        "export const LOGOS: readonly LogoEntry[] = [",
    ]
    for e in entries:
        lines.append(
            "  { name: %s, file: %s, format: %s, group: %s, bytes: %d },"
            % (json.dumps(e["name"]), json.dumps(e["file"]),
               json.dumps(e["format"]), json.dumps(e["group"]), e["bytes"])
        )
    lines.append("] as const;")
    lines.append("")
    lines.append("export type LogoName = (typeof LOGOS)[number]['name'];")
    lines.append("")
    lines.append("/** Where the marks are served from — see `staticDirs` in .storybook/main.ts. */")
    lines.append("export const LOGO_BASE = 'logos';")
    lines.append("")
    lines.append("const BY_NAME = new Map(LOGOS.map((l) => [l.name, l]));")
    lines.append("")
    lines.append("export const logoEntry = (name: string): LogoEntry | undefined => BY_NAME.get(name);")
    lines.append("")
    lines.append("export const logoSrc = (name: string): string | undefined => {")
    lines.append("  const entry = BY_NAME.get(name);")
    lines.append("  return entry ? asset(`${LOGO_BASE}/${entry.file}`) : undefined;")
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()

    if not LOGOS.exists():
        print("  no logos directory — nothing to do")
        return 0

    text = build()
    if args.check and OUT.exists() and OUT.read_text(encoding="utf-8") == text:
        print("  manifest is up to date")
        return 0

    OUT.write_text(text, encoding="utf-8")
    count = text.count("{ name:")
    svg = text.count("format: \"svg\"")
    png = text.count("format: \"png\"")
    total = sum(p.stat().st_size for p in LOGOS.iterdir() if p.is_file())
    print(f"  wrote {OUT.relative_to(REPO)}")
    print(f"  marks : {count}  ({svg} svg, {png} png)")
    print(f"  size  : {total / 1024:.0f} KB on disk, none of it bundled")
    return 0


if __name__ == "__main__":
    sys.exit(main())
