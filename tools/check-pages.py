#!/usr/bin/env python3
"""Hold the page tier to the rule that makes the Phase 2 rename survivable.

A page composes components. It must not reach past them for a raw token, because
every `sys('color-text-primary-default')` written at the page level is one more
string the rename has to find. Components are allowed to — that is their job, and
there are 30 of them. Pages are not, and there will eventually be 78.

Enforced:
  * no `sys(...)` / `component(...)` calls
  * no bare `--sys-*` or component-tier custom properties
  * no literal colours
  * every page carries a `_frontend_route`, so a page cannot exist without saying
    which Frontend route it stands for

Coverage is printed rather than assumed: with no pages yet this passes and says so,
which is the truth, not a green light earned by having nothing to check.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# Pages live inside their feature: features/<name>/pages/*.tsx. The old ui/pages
# location is scanned too so a stray page cannot hide there unchecked.
FEATURES = ROOT / "features"
LEGACY_PAGES = ROOT / "ui" / "pages"
INVENTORY = ROOT / "design-library" / "lotteryplus" / "page-inventory.json"

RAW_TOKEN = re.compile(r"\bsys\s*\(|\bcomponent\s*\(")
CSS_VAR = re.compile(r"var\(\s*--(?:sys-|[a-z][a-z0-9-]*-)")
HEX = re.compile(r"#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b")
FUNC_COLOR = re.compile(r"\b(?:rgba?|hsla?)\s*\(")
ROUTE = re.compile(r"_frontend_route")

# A page names its route in a comment or a const; either satisfies the rule.
def offences(path):
    found = []
    for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        stripped = line.strip()
        if stripped.startswith("//") or stripped.startswith("*"):
            continue          # prose may quote a token to explain why it is not used
        for pattern, what in (
            (RAW_TOKEN, "reads a token directly — go through a component instead"),
            (CSS_VAR, "reads a CSS custom property directly"),
            (HEX, "literal colour"),
            (FUNC_COLOR, "literal colour"),
        ):
            if pattern.search(line):
                found.append((n, what, stripped[:70]))
                break
    return found


def main():
    files = []
    if FEATURES.is_dir():
        # _template holds skeletons, not pages
        files += [f for f in FEATURES.rglob("pages/*.tsx") if "_template" not in f.parts]
    if LEGACY_PAGES.is_dir():
        files += list(LEGACY_PAGES.rglob("*.tsx"))
    files = sorted(files)
    if not files:
        print("  pages checked         : 0 (no pages authored yet)")
        return 0

    routes = set()
    if INVENTORY.exists():
        data = json.loads(INVENTORY.read_text(encoding="utf-8"))
        routes = {p["route"] for p in data.get("first_six", [])}

    failures, checked, unrouted = [], 0, []
    for path in files:
        rel = path.relative_to(ROOT)
        text = path.read_text(encoding="utf-8")
        if ".stories." not in path.name and not ROUTE.search(text):
            unrouted.append(str(rel))
        for n, what, snippet in offences(path):
            failures.append(f"{rel}:{n}: {what}\n        {snippet}")
        checked += 1

    for name in unrouted:
        failures.append(f"{name}: no _frontend_route — a page must say which route it stands for")

    if failures:
        print("pages that break the composition rule:")
        for line in failures:
            print(f"      {line}")
        return 1

    print(f"  pages checked         : {checked}")
    print(f"  routes in inventory   : {len(routes)} selected, 78 total in the Frontend")
    return 0


if __name__ == "__main__":
    sys.exit(main())
