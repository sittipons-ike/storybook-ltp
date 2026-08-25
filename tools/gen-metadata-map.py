#!/usr/bin/env python3
"""Emit ui/system/metadata.generated.ts — story title → its manifest.

Storybook shows a component; the manifest that governs it lives in a JSON or YAML file
nobody opens while looking at the component. This map is what lets the library put the
two in the same place, so the question "may I use this?" is answered where it is asked
rather than in a file the reader would have to clone the repo to open.

The join is by story-file stem, which is the same key `storybook:` already uses and the
same key check-metadata.py enforces coverage on — so a component cannot appear here with
a manifest the gate has not checked, and cannot go missing without the gate failing first.

Usage: python3 tools/gen-metadata-map.py [--check]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIB = ROOT / "design-library" / "lotteryplus"
FEATURES = ROOT / "features"
OUT = ROOT / "ui" / "system" / "metadata.generated.ts"

FIELDS = [
    "name", "type", "responsibility",
    "composition_level", "dependencies", "slots", "pattern", "organisms",
    "scope", "project", "feature", "public",
    "folder",
]


def parse_flat(text: str) -> dict:
    out, key = {}, None
    for raw in text.splitlines():
        line = raw.split("#")[0].rstrip() if not raw.strip().startswith("#") else ""
        if not line.strip():
            continue
        if line.startswith("  - ") and key:
            out.setdefault(key, []).append(line[4:].strip())
            continue
        m = re.match(r"^([a-z_]+):\s*(.*)$", line)
        if not m:
            continue
        key, val = m.group(1), m.group(2).strip()
        if val == "":
            out[key] = []
        elif val == "null":
            out[key] = None
        elif val in ("true", "false"):
            out[key] = val == "true"
        elif val.startswith("["):
            out[key] = json.loads(val.replace("'", '"'))
        else:
            out[key] = val.strip('"').strip("'")
    return out


def manifests() -> dict[str, dict]:
    """stem → manifest, from every place a manifest may live."""
    by_stem: dict[str, dict] = {}

    comps = json.loads((LIB / "components.json").read_text(encoding="utf-8"))["components"]
    pats = json.loads((LIB / "patterns.json").read_text(encoding="utf-8"))
    pats = pats.get("patterns", pats)
    for src in (comps, pats):
        for name, e in src.items():
            if not isinstance(e, dict) or name.startswith(("_", "$")):
                continue
            sb = e.get("storybook")
            for stem in ([sb] if isinstance(sb, str) else sb or []):
                by_stem[stem] = {k: e.get(k) for k in FIELDS}

    if FEATURES.is_dir():
        for man in sorted(FEATURES.glob("*/*.yaml")):
            for chunk in re.split(r"^---\s*$", man.read_text(encoding="utf-8"), flags=re.M):
                doc = parse_flat(chunk)
                if "name" not in doc:
                    continue
                stem = doc.get("storybook")
                if stem:
                    by_stem[stem] = {k: doc.get(k) for k in FIELDS}
    return by_stem


def story_titles() -> list[tuple[str, str]]:
    """(title, stem) for every story file that declares a title."""
    out = []
    for f in sorted(list((ROOT / "ui").rglob("*.stories.tsx"))
                    + list(FEATURES.rglob("*.stories.tsx"))):
        if "_template" in f.parts:
            continue
        s = f.read_text(encoding="utf-8")
        m = re.search(r"const meta[^=]*=\s*\{.{0,400}?\btitle:\s*'([^']+)'", s, re.S)
        if m:
            stem = f.stem[: -len(".stories")] if f.stem.endswith(".stories") else f.stem
            out.append((m.group(1), stem))
    return out


def build() -> str:
    by_stem = manifests()
    rows = {title: by_stem[stem] for title, stem in story_titles() if stem in by_stem}

    lines = [
        "// ===================================================================",
        "// metadata.generated.ts — GENERATED FILE, DO NOT EDIT BY HAND",
        "// Regenerate: python3 tools/gen-metadata-map.py",
        "//",
        "// Story title -> the manifest that governs it, joined by story-file stem. The",
        "// panel in .storybook/preview.ts reads this so a reader can see the contract",
        "// (scope, public, level) beside the component instead of in a file they would",
        "// have to clone the repo to open.",
        "// ===================================================================",
        "",
        "export interface ComponentMeta {",
        "  name: string;",
        "  type: string;",
        "  responsibility: string;",
        "  composition_level: string | null;",
        "  dependencies: string[];",
        "  slots: unknown[];",
        "  pattern: string | null;",
        "  organisms: string[];",
        "  scope: string;",
        "  project: string | null;",
        "  feature: string | null;",
        "  public: boolean;",
        "  folder: string;",
        "}",
        "",
        "export const METADATA: Record<string, ComponentMeta> = {",
    ]
    for title in sorted(rows):
        lines.append(f"  {json.dumps(title, ensure_ascii=False)}: "
                     f"{json.dumps(rows[title], ensure_ascii=False)},")
    lines += ["};", "",
              "export const metaFor = (title: string): ComponentMeta | undefined =>",
              "  METADATA[title];", ""]
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()
    text = build()
    if args.check:
        if not OUT.exists() or OUT.read_text(encoding="utf-8") != text:
            print("metadata.generated.ts is out of date — run: python3 tools/gen-metadata-map.py")
            return 1
        print("metadata.generated.ts is up to date")
        return 0
    OUT.write_text(text, encoding="utf-8")
    n = text.count('": {')
    print(f"wrote {OUT.relative_to(ROOT)}")
    print(f"  stories with a manifest: {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
