#!/usr/bin/env python3
"""Refuse a literal colour in component code, and name the few that are allowed.

A hex in a component is a colour the rename cannot find and the theme cannot reach. The
rule has been in the gate since the first pass, as a `grep` with two `grep -v` filters
after it — one for `.stories.tsx`, one for `icon-data.ts`.

Those filters are what this script replaces. A whole file waved through is a blind spot
that grows, and removing a `grep -v` once already turned up four real duplicate keys hiding
behind the word "known" (MEMORY 2026-08-20). Two changes:

  * **Component code** — exceptions are per literal, not per file, and each carries the
    reason and the Figma node it was read from. It fails on a literal that is not listed,
    and equally on a listed literal that is no longer in the code, so the list cannot
    quietly become the blind spot it replaced.

  * **Stories** — still not enforced, but no longer invisible. The count is printed every
    run. Turning the 44 that are there today into tokens is its own piece of work, and
    silently carrying them was how five third-party brand colours sat in
    `Footer.stories.tsx` for weeks without anyone being able to see them.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCANNED = ["ui/components", "ui/icons", "ui/system", "ui/patterns", "ui/logos"]
SUFFIXES = {".ts", ".tsx", ".css"}

HEX = re.compile(r"#[0-9A-Fa-f]{6}\b")

# Prose may name a colour to explain something — `check-pages.py` makes the same allowance,
# for the same reason: a comment renders nothing. Only whole comment lines are skipped, so a
# literal with a comment after it on the same line is still caught. `{/*` is here because
# JSX comments are the ones component files actually use.
COMMENT = re.compile(r"^\s*(//|\*|/\*|\{/\*)")

# (path relative to the repo, literal) -> why it may stay.
#
# The bar: a colour that is not ours to choose. A brand's own hex is the brand's, and
# binding it to a Lotteryplus token would make somebody else's logo drift when our palette
# moves. Anything that is ours belongs in design.md.
ALLOWED: dict[tuple[str, str], str] = {
    ("ui/components/Footer/Footer.tsx", "#337FFF"):
        "Facebook blue — fill of `icon` 1 in `Frame 43983` (14291:133487)",
    ("ui/components/Footer/Footer.tsx", "#000000"):
        "TikTok and X both draw on black — fills of `icon` 2 and 3 (14291:133491, 133498)",
    ("ui/components/Footer/Footer.tsx", "#3ACE01"):
        "LINE green — fill of `icon` 4 in `Frame 43983` (14291:133500)",
    ("ui/components/Footer/Footer.tsx", "#FF0000"):
        "YouTube red — fill of `icon` 5 in `Frame 43983` (14291:133504)",
}

# Generated from Figma's own export; the hexes are inside SVG path data the exporter wrote,
# not a colour anybody chose here. Excluded as a file because a per-literal list of
# generated output would be a list of the generator.
GENERATED = {"ui/icons/icon-data.ts"}


def main() -> int:
    component_hits: dict[tuple[str, str], list[int]] = {}
    story_hits: dict[str, set[str]] = {}
    scanned = 0

    for folder in SCANNED:
        base = ROOT / folder
        if not base.is_dir():
            continue
        for path in sorted(base.rglob("*")):
            if path.suffix not in SUFFIXES:
                continue
            rel = str(path.relative_to(ROOT))
            if rel in GENERATED:
                continue
            scanned += 1
            for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
                if COMMENT.match(line):
                    continue
                for hexcode in HEX.findall(line):
                    if ".stories." in path.name:
                        story_hits.setdefault(rel, set()).add(hexcode.upper())
                    else:
                        component_hits.setdefault((rel, hexcode.upper()), []).append(n)

    unlisted = {k: v for k, v in component_hits.items() if k not in ALLOWED}
    stale = [k for k in ALLOWED if k not in component_hits]

    if unlisted or stale:
        if unlisted:
            print("literal colours with no entry in tools/check-literal-colours.py:")
            for (rel, hexcode), lines in sorted(unlisted.items()):
                print(f"      {rel}:{','.join(str(n) for n in lines)}: {hexcode}")
        if stale:
            print("allowed literals no longer in the code — delete the entry:")
            for rel, hexcode in sorted(stale):
                print(f"      {rel}: {hexcode}")
        return 1

    story_total = sum(len(v) for v in story_hits.values())
    print(f"  files scanned         : {scanned}")
    print(f"  in component code     : {len(component_hits)} — all listed, each names a brand that owns the colour")
    print(f"  in stories (not yet enforced) : {story_total} across {len(story_hits)} files")
    for rel in sorted(story_hits):
        print(f"      {rel}: {len(story_hits[rel])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
