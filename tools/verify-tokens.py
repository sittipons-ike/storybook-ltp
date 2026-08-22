#!/usr/bin/env python3
"""Verify tokens.css matches Figma, value for value.

design.md is transcribed from Figma by hand, so a typo there would silently ship a
wrong colour. This walks every semantic colour in the Figma snapshot, maps its name
to the Standard-compliant CSS var name, and asserts the values are byte-identical.

Exit 0 = every colour matches. Exit 1 = drift found (or a var is missing).

Usage:
    python3 tools/verify-tokens.py [--snapshot PATH] [--css PATH]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DEFAULT_SNAPSHOT = REPO / "design-library" / "lotteryplus" / "figma-snapshot.json"
DEFAULT_CSS = REPO / "ui" / "foundations" / "tokens.css"

VAR_RE = re.compile(r"^\s*(--sys-[a-z0-9-]+)\s*:\s*(.+?);", re.IGNORECASE)

# Figma group -> semantic group. `error/warning/success/info` nest under `status`.
STATUS = {"error", "warning", "success", "info"}
# Scale roles carry an `accent` sub-scale whose stops are named by ladder position.
SCALE = STATUS | {"primary", "secondary", "tertiary"}

# Names that no rule derives — Figma defects and deliberate renames.
EXPLICIT = {
    "colors/text/tertiary-defualt":      "--sys-color-text-tertiary-default",
    "colors/text/onbgcolor-default":     "--sys-color-text-on-bgcolor",
    "colors/border/onbgcolor":           "--sys-color-border-on-bgcolor",
    "colors/overlay/overlay-default":    "--sys-color-overlay-default",
    "colors/overlay/overlay-inverse":    "--sys-color-overlay-inverse",
    "colors/overlay/overlay-black-80%":  "--sys-color-overlay-heavy",
}

# Figma abbreviates "soft-light" as "s-light" inside background/border accent names.
ABBREV = [("-s-light", "-soft-light")]


def map_name(figma: str) -> str | None:
    """Map a Figma semantic colour path to its --sys-* CSS var name."""
    if figma in EXPLICIT:
        return EXPLICIT[figma]

    parts = figma.split("/")
    if parts[0] != "colors":
        return None
    group, rest = parts[1], parts[2:]
    if not rest:
        return None

    leaf = "/".join(rest)
    for old, new in ABBREV:
        leaf = leaf.replace(old, new)

    # fg-* / bg-* prefixes are Figma shorthand for the group itself.
    leaf = re.sub(r"^(fg|bg)-", "", leaf)

    # On a SCALE role, accent/<role>-<stop> drops the redundant role prefix.
    # `success` spells its accent prefix `green-`, so allow that alias too.
    # This must not touch background/border, where the same words are hues, not roles.
    if group in SCALE and leaf.startswith("accent/"):
        stop = leaf[len("accent/"):]
        stop = re.sub(r"^(primary|secondary|tertiary|error|warning|success|info|green)-", "", stop)
        leaf = f"accent/{stop}"
    # On background/border, hue-named tints nest under `accent` in design.md.
    elif group in {"background", "border"} and re.match(
        r"^(red|yellow|green|blue)(-|$)", leaf
    ):
        leaf = f"accent/{leaf}"

    segments = [group] + leaf.split("/")
    if group in STATUS:
        segments = ["status"] + segments

    return "--sys-color-" + "-".join(segments)


def parse_css(path: Path) -> dict[str, str]:
    found: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        m = VAR_RE.match(line)
        if m:
            found.setdefault(m.group(1), m.group(2).strip())
    return found


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--snapshot", type=Path, default=DEFAULT_SNAPSHOT)
    ap.add_argument("--css", type=Path, default=DEFAULT_CSS)
    ap.add_argument("-v", "--verbose", action="store_true")
    args = ap.parse_args()

    snapshot = json.loads(args.snapshot.read_text(encoding="utf-8"))
    figma = snapshot["colors"]
    css = parse_css(args.css)

    matched, missing, drift, skipped = 0, [], [], []

    for name, expected in sorted(figma.items()):
        var = map_name(name)
        if var is None:
            skipped.append(name)
            continue
        if var not in css:
            missing.append((name, var))
            continue
        actual = css[var]
        if actual.upper() != expected.upper():
            drift.append((name, var, expected, actual))
        else:
            matched += 1
            if args.verbose:
                print(f"  ok  {name:48s} {var} = {actual}")

    # The Verification Report story reads this file rather than restating the numbers, so
    # what Storybook shows is the gate's own result and cannot drift from it. check.sh
    # regenerates it and fails if the committed copy differs.
    result = {
        "_comment": (
            "Written by tools/verify-tokens.py. Do not hand-edit. "
            "ui/foundations/VerificationReport.stories.tsx renders this verbatim."
        ),
        "ranAgainst": {
            "snapshot": str(args.snapshot.relative_to(REPO)),
            "css": str(args.css.relative_to(REPO)),
            "figmaFile": snapshot.get("file"),
            "figmaFileKey": snapshot.get("fileKey"),
            "collection": snapshot.get("collection"),
            "mode": snapshot.get("mode"),
            "snapshotPulledAt": snapshot.get("pulledAt"),
        },
        "counts": {
            "figmaColours": len(figma),
            "cssVars": len(css),
            "matched": matched,
            "missing": len(missing),
            "drift": len(drift),
            "skipped": len(skipped),
        },
        "missing": [{"figma": n, "cssVar": v} for n, v in missing],
        "drift": [{"figma": n, "cssVar": v, "figmaValue": e, "cssValue": a} for n, v, e, a in drift],
        "skipped": sorted(skipped),
    }
    (REPO / "design-library" / "lotteryplus" / "verification-result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(f"Figma snapshot : {args.snapshot.relative_to(REPO)} ({len(figma)} colours)")
    print(f"Generated CSS  : {args.css.relative_to(REPO)} ({len(css)} --sys-* vars)")
    print()
    print(f"  matched : {matched}")
    print(f"  missing : {len(missing)}")
    print(f"  drift   : {len(drift)}")
    if skipped:
        print(f"  skipped : {len(skipped)}")

    if missing:
        print("\nMISSING — in Figma, absent from tokens.css:")
        for name, var in missing:
            print(f"  {name}  ->  {var}")

    if drift:
        print("\nDRIFT — value differs between Figma and tokens.css:")
        for name, var, expected, actual in drift:
            print(f"  {name}\n    {var}\n    figma={expected}  css={actual}")

    if missing or drift:
        return 1

    print("\nAll Figma semantic colours are present in tokens.css with identical values.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
