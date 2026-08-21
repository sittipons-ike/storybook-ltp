#!/usr/bin/env python3
"""Every icon a component or story names must exist in the icon set.

A missing icon does not throw — `Icon` logs to the console and renders nothing — so a
story can look finished while a control is invisible. Four gallery cells shipped that way
for a whole pass. This turns that into a build failure.

Usage:
    python3 tools/check-icons.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
LIB = REPO / "UI Library"
ICON_DATA = LIB / "icons" / "icon-data.ts"

# Two forms, kept deliberately narrow.
#
# JSX attributes — `<Icon name="x">`, `iconName="x"`, `filledIcon="x"`, `successIcon="x"`.
JSX_ATTR = re.compile(
    r"""\b(?:name|iconName|filledIcon|successIcon)\s*=\s*\{?\s*['"]([A-Za-z0-9_-]+)['"]"""
)
# Object literals — `icon: 'x'` in an item list. Only in .tsx: the same key shape appears
# in tokens.ts as a *token* name (`icon: 'foreground-dark'`) and those are not glyphs.
OBJ_KEY = re.compile(r"""\b(?:icon|filledIcon)\s*:\s*['"]([A-Za-z0-9_ -]+)['"]""")

# Bare strings that follow the icon set's own naming convention. Button's gallery lists its
# icons as a plain array, which neither pattern above reaches — that blind spot let
# `outline-search` render nothing in a story called "With Icons". The prefixes belong to
# the icon set, so matching on them is precise rather than a guess.
# Five names in the set carry spaces — `outline-Red envelope`, `filled-terms and
# conditions`, `outline-History Payment` and friends. A character class without a
# space matches none of them, in the registry or in the source.
BARE_NAME = re.compile(r"""['"]((?:outline|filled)-[A-Za-z0-9_ -]+|arrow-(?:up|down|left|right)-[SL])['"]""")

# `name=` is also how AppShell labels its slots and Colors.stories labels a scale, so the
# attribute patterns only count on a line that mentions an icon. BARE_NAME needs no such
# guard: its prefixes are the icon set's own and nothing else in the library uses them.
CONTEXT = re.compile(r"icon", re.IGNORECASE)

# Known limit, stated rather than hidden: a name passed through a variable
# (`<Icon name={glyph} />`) cannot be resolved statically and is not checked here.

REGISTERED = re.compile(r"^\s*'([A-Za-z0-9_ -]+)'\s*:", re.MULTILINE)

# Names that are known to be absent and why. A gap only belongs here once someone has
# checked Figma and found it missing there too — otherwise the fix is to export the icon,
# not to silence the check. These are reported as warnings and do not fail the build.
KNOWN_GAPS: dict[str, str] = {
    # Empty. Add an entry only after checking Figma and finding the icon missing there too —
    # otherwise the fix is to export the icon, not to silence the check.
}


def main() -> int:
    registry = set(REGISTERED.findall(ICON_DATA.read_text()))
    if not registry:
        print("  could not read the icon registry — is icons/icon-data.ts intact?")
        return 1

    missing: dict[str, list[str]] = {}
    scanned = 0

    for path in sorted(LIB.rglob("*.tsx")) + sorted(LIB.rglob("*.ts")):
        if path.name == "icon-data.ts":
            continue
        scanned += 1
        for lineno, line in enumerate(path.read_text().splitlines(), 1):
            names = list(BARE_NAME.findall(line))
            if CONTEXT.search(line):
                names += JSX_ATTR.findall(line)
                if path.suffix == ".tsx":
                    names += OBJ_KEY.findall(line)
            for name in names:
                if name in registry:
                    continue
                where = f"{path.relative_to(REPO)}:{lineno}"
                places = missing.setdefault(name, [])
                if where not in places:
                    places.append(where)

    known = {n: v for n, v in missing.items() if n in KNOWN_GAPS}
    unknown = {n: v for n, v in missing.items() if n not in KNOWN_GAPS}

    # The registry must equal Figma's own list. Six icons sat in Figma unexported for
    # weeks because "nothing in the code is missing" was the only question ever asked;
    # the other direction — what Figma has that we do not — needs asking too.
    manifest = REPO / "design-library" / "lotteryplus" / "figma-icon-names.json"
    if manifest.exists():
        names = set(json.loads(manifest.read_text(encoding="utf-8"))["names"])
        missing = sorted(names - registry)
        extra = sorted(registry - names)
        for n in missing:
            print(f"  Figma has '{n}' and icon-data.ts does not")
        for n in extra:
            print(f"  icon-data.ts has '{n}' and Figma does not")
        if missing or extra:
            print(f"  registry   : {len(registry)} icons · Figma: {len(names)} — they must match")
            return 1
        print(f"  registry   : {len(registry)} icons, exactly Figma's list")
    else:
        print(f"  registry   : {len(registry)} icons in icons/icon-data.ts")
    print(f"  scanned    : {scanned} source files")
    print(f"  unresolved : {len(unknown)}")

    for name, places in sorted(known.items()):
        print(f"  known gap  : {name} — {KNOWN_GAPS[name]}")
        for p in places:
            print(f"                 {p}")

    for name, places in sorted(unknown.items()):
        print(f"    {name}")
        for p in places:
            print(f"        {p}")

    return 1 if unknown else 0


if __name__ == "__main__":
    sys.exit(main())
