#!/usr/bin/env python3
"""Assert that the icons Figma draws are the icons the source uses.

check-icons.py answers a different question: does every icon name in the source
resolve to something in icon-data.ts? A name can resolve and still be the wrong
picture -- a wallet where Figma draws a bird, a bell where Figma draws a burger --
and that is the failure this file exists to catch.

An overlay opts in by recording `base._figma_icons.nodes`, one record per Figma
node: the node id, the source files that render it, and every icon that node
instantiates. The set of icons in those sources must EQUAL the recorded set. An
extra icon fails as loudly as a missing one, because an extra is an icon nobody
checked against Figma.

Coverage is printed rather than assumed: an overlay with no record is counted as
unrecorded, so the number of components still trusting the weaker gate is visible.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIB = ROOT / "ui"
DESIGN = ROOT / "design-library"
SEARCH_ROOTS = (LIB / "components", LIB / "patterns")

# The same shape check-icons.py treats as a bare icon name, so the two gates
# disagree about nothing: prefix, then the set's own characters.
# Hyphens are part of the name, not a separator: the set ships outline-NokPoints-W
# and outline-eye-off, and a regex that stops at the first hyphen silently matches
# neither -- which reads exactly like a missing icon.
ICON_RE = re.compile(r"""["'](((outline|filled)-[A-Za-z0-9_ -]+)|(arrow-[a-z]+-[SL]))["']""")


def find_source(component, filename):
    """A story or component file, wherever its folder lives."""
    for root in SEARCH_ROOTS:
        path = root / component / filename
        if path.exists():
            return path
    return None


def icons_in(paths):
    names = set()
    for path in paths:
        for match in ICON_RE.finditer(path.read_text(encoding="utf-8")):
            names.add(match.group(1))
    return names


def check(name, entry, failures):
    """One overlay. Returns True if it carried a record to check."""
    spec = (entry.get("base") or {}).get("_figma_icons")
    if not spec:
        return False

    # `storybook` is a bare string for a component that ships one, and a list for one that
    # ships several. Iterating the string yields characters, which look like missing folders.
    stories = entry.get("storybook") or []
    if isinstance(stories, str):
        stories = [stories]
    records = spec.get("nodes") or []
    if not records:
        # A record that checks nothing is worse than no record: it counts as covered.
        failures.append(f"{name}: _figma_icons carries no `nodes`, so it verifies nothing")
        return True

    for record in records:
        node, wanted = record["node"], {
            k: v for k, v in record["icons"].items() if not k.startswith("_")
        }
        paths, missing_files = [], []
        for filename in record["sources"]:
            hit = next(
                (p for c in stories if (p := find_source(c, filename))), None
            )
            (paths.append(hit) if hit else missing_files.append(filename))

        for gone in missing_files:
            failures.append(f"{name} ({node}): records source '{gone}', which does not exist")
        if not paths:
            continue

        used = icons_in(paths)
        where = ", ".join(p.name for p in paths)
        for icon in sorted(set(wanted) - used):
            failures.append(f"{name} ({node}): Figma draws '{icon}' but {where} does not use it")
        for icon in sorted(used - set(wanted)):
            failures.append(f"{name} ({node}): {where} uses '{icon}', which Figma does not draw there")
    return True


def recordable(entry):
    """A component can only be held to Figma if it has both a node and source to check."""
    stories = entry.get("storybook")
    if isinstance(stories, str):
        stories = [stories]
    return bool(entry.get("figma_node")) and bool(stories)


def main():
    failures, covered, missing_record, not_applicable = [], 0, [], 0

    for project in sorted(p for p in DESIGN.iterdir() if p.is_dir()):
        index = project / "components.json"
        if not index.exists():
            continue
        for name, entry in sorted(json.loads(index.read_text(encoding="utf-8"))["components"].items()):
            if check(name, entry, failures):
                covered += 1
            elif recordable(entry):
                missing_record.append(name)
            else:
                not_applicable += 1

    if failures:
        print("icons that do not match Figma:")
        for line in failures:
            print(f"      {line}")
        return 1

    print(f"  matched against Figma : {covered}")
    if missing_record:
        # Not a failure yet, but it is debt with a name rather than a number.
        print(f"  no record yet         : {len(missing_record)} — {', '.join(missing_record)}")
    print(f"  nothing to check      : {not_applicable} (no figma_node, or no component in the library)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
