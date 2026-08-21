#!/usr/bin/env python3
"""Every typography token binds a role, or names itself as debt. Nothing in between.

The lotto board's digits shipped as 24/32 weight 700 — matching no Figma layer and no
role — and survived for days because nothing forced typography to bind. This makes the
invented value a build failure.

Rule, per overlay token:
  * a key ending in -line-height / -weight / -family / -tracking is typography, always
  * a key ending in -size is typography only when a sibling with the same prefix carries
    one of the suffixes above — a lone `avatar-size` is geometry and none of this file's
    business
  * a typography token must either reference `{design.semantic.typography...}` or appear
    by name in that overlay's `base._unmigrated_type`, whose entry says why no role fits
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OVERLAYS = ROOT / "design-library" / "lotteryplus" / "components"

ALWAYS = ("-line-height", "-weight", "-family", "-tracking")
ROLE = re.compile(r"^\{design\.semantic\.typography\.")
REF = re.compile(r"^\{design\.")


def suffix_split(key):
    for s in ALWAYS + ("-size",):
        if key.endswith(s):
            return key[: -len(s)], s
    return None, None


def check(name, base, failures):
    tokens = {k: v for k, v in base.items() if not k.startswith("_") and isinstance(v, (str, int, float))}
    allow = set(k for k in (base.get("_unmigrated_type") or {}) if not k.startswith("_"))

    # A `-size` beside a `-weight` or `-family` is a font size. A `-size` beside only a
    # unitless `-line-height` is geometry — the badge's 16px circle uses line-height: 1
    # to centre its count, and a diameter is not typography. A px line-height, though,
    # marks a real text style (the success meta row), so it counts.
    prefixes_with_typo = set()
    for k, v in tokens.items():
        prefix, s = suffix_split(k)
        if s in ("-weight", "-family", "-tracking"):
            prefixes_with_typo.add(prefix)
        elif s == "-line-height" and (ROLE.match(str(v)) or str(v).endswith("px")):
            prefixes_with_typo.add(prefix)

    used_allow = set()
    for k, v in sorted(tokens.items()):
        prefix, s = suffix_split(k)
        if s is None:
            continue
        if s == "-size" and prefix not in prefixes_with_typo:
            continue  # geometry
        value = str(v)
        if ROLE.match(value):
            continue
        if REF.match(value):
            # a non-typography ref on a typography key is its own smell — spacing as a
            # font size would slip through a plain literal check
            failures.append(f"{name}: `{k}` refs {value}, which is not a typography role")
            continue
        if k in allow:
            used_allow.add(k)
            continue
        failures.append(
            f"{name}: `{k}` = {value} — a typography literal with no role bound and no "
            f"_unmigrated_type entry naming it"
        )
    for stale in sorted(allow - used_allow):
        failures.append(
            f"{name}: _unmigrated_type lists `{stale}`, which is no longer a typography "
            f"literal — remove the stale entry"
        )


def main():
    failures, checked = [], 0
    for path in sorted(OVERLAYS.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        base = data.get("base") or {}
        check(path.stem, base, failures)
        checked += 1

    if failures:
        print("typography that neither binds a role nor names itself as debt:")
        for line in failures:
            print(f"      {line}")
        return 1

    print(f"  overlays checked      : {checked}")
    print("  rule                  : bind a typography role, or record the literal by name")
    return 0


if __name__ == "__main__":
    sys.exit(main())
