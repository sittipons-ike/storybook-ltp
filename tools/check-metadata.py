#!/usr/bin/env python3
"""Every component, pattern and page carries the Standard's thirteen fields.

Lark Standard §3.7 is explicit that a field keeps its heading even when it holds nothing:
"ฟิลด์ทุกตัวต้องมีหัวข้ออยู่เสมอ ถึงจะไม่มีค่าก็ให้ใส่ null หรือ [] ไว้ ห้ามลบหัวข้อทิ้ง".

The reason is not tidiness. This repo shipped 35 components in four different shapes —
some with `type`, some with `composition_level` instead, none with `public` — and the cost
showed up three ways: a diff read as a change when only the shape differed, no script could
validate what it could not assume was present, and `public` was missing entirely for weeks
without anyone noticing, because absence looks identical to "not applicable".

What this refuses:
  · a missing field, even one whose value would be null or []
  · a value outside the canonical set for type / composition_level / scope
  · composition_level on anything that is not a component, or absent on one that is
  · project/feature that disagree with scope
  · a folder that does not start where scope says it must

Usage: python3 tools/check-metadata.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIB = ROOT / "design-library" / "lotteryplus"
FEATURES = ROOT / "features"

# The thirteen, in the template's order. Order is checked too: a field that appears in a
# different position on one entry is a diff that reads as a change when nothing changed.
FIELDS = [
    "name", "type", "responsibility",
    "composition_level", "dependencies", "slots", "pattern", "organisms",
    "scope", "project", "feature", "public",
    "folder",
]

TYPES = {"component", "pattern", "page", "helper"}
LEVELS = {"atom", "molecule", "organism"}
SCOPES = {"global", "project", "feature"}


def check_entry(where: str, name: str, e: dict) -> list[str]:
    bad = []

    missing = [f for f in FIELDS if f not in e]
    if missing:
        bad.append(f"{where} {name}: missing {missing}")
        return bad  # nothing below can be trusted

    present = [k for k in e if k in FIELDS]
    if present != FIELDS:
        bad.append(f"{where} {name}: the thirteen are out of order — {present}")

    kind, scope, level = e["type"], e["scope"], e["composition_level"]

    if kind not in TYPES:
        bad.append(f"{where} {name}: type {kind!r} is not one of {sorted(TYPES)}")
    if scope not in SCOPES:
        bad.append(f"{where} {name}: scope {scope!r} is not one of {sorted(SCOPES)}")

    # composition_level answers "how is it composed" — only a component is composed.
    if kind == "component":
        if level not in LEVELS:
            bad.append(f"{where} {name}: a component needs composition_level, got {level!r}")
    elif level is not None:
        bad.append(f"{where} {name}: {kind} must carry composition_level: null, got {level!r}")

    if scope == "global" and (e["project"] or e["feature"]):
        bad.append(f"{where} {name}: scope global cannot name a project or feature")
    if scope in ("project", "feature") and not e["project"]:
        bad.append(f"{where} {name}: scope {scope} needs a project")
    if scope == "feature" and not e["feature"]:
        bad.append(f"{where} {name}: scope feature needs a feature")
    if scope == "project" and e["feature"]:
        bad.append(f"{where} {name}: scope project cannot name a feature")

    if not isinstance(e["public"], bool):
        bad.append(f"{where} {name}: public must be true or false, got {e['public']!r}")

    folder = e["folder"] or ""
    expect = "global/" if scope == "global" else f"projects/{e['project']}/"
    if not folder.startswith(expect):
        bad.append(f"{where} {name}: folder must start {expect!r} for scope {scope} — got {folder!r}")

    return bad


def load_yaml_head(path: Path) -> dict:
    """Read the flat scalar/list fields off a page manifest without a YAML dependency.

    The manifests are hand-written and deliberately flat; a real parser would be the right
    answer the moment one grows nesting beyond `organisms:`.
    """
    out, key = {}, None
    for raw in path.read_text(encoding="utf-8").splitlines():
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
            out[key] = []          # a list follows, or the field is empty
        elif val == "null":
            out[key] = None
        elif val in ("true", "false"):
            out[key] = val == "true"
        elif val == "[]":
            out[key] = []
        else:
            out[key] = val.strip('"').strip("'")
    return out


def main() -> int:
    failures, counted = [], {"component": 0, "pattern": 0, "page": 0, "helper": 0}

    comps = json.loads((LIB / "components.json").read_text(encoding="utf-8"))["components"]
    for n, e in comps.items():
        if not isinstance(e, dict) or n.startswith(("_", "$")):
            continue
        failures += check_entry("component", n, e)
        counted[e.get("type", "component")] = counted.get(e.get("type", "component"), 0) + 1

    pats = json.loads((LIB / "patterns.json").read_text(encoding="utf-8"))
    pats = pats.get("patterns", pats)
    for n, e in pats.items():
        if not isinstance(e, dict) or n.startswith(("_", "$")):
            continue
        failures += check_entry("pattern", n, e)
        counted["pattern"] += 1

    if FEATURES.is_dir():
        for man in sorted(FEATURES.glob("*/page.yaml")):
            failures += check_entry("page", man.parent.name, load_yaml_head(man))
            counted["page"] += 1

    if failures:
        print("metadata does not match Lark Standard §3.7:")
        for f in failures:
            print(f"      {f}")
        return 1

    print(f"    components  : {counted['component']}")
    print(f"    helpers     : {counted['helper']}")
    print(f"    patterns    : {counted['pattern']}")
    print(f"    pages       : {counted['page']}")
    print("    rule        : all thirteen fields present, in order, values in the canonical sets")
    return 0


if __name__ == "__main__":
    sys.exit(main())
