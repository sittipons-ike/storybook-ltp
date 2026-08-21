#!/usr/bin/env python3
"""Generate the Phase 2 before->after rename table from a fresh variable pull.

Rules come from figma-rename-map.md, which transcribes the Lark Standard
("Structure - Design system", 7 Solutions Team). This file makes the map
executable: same 11 rules, applied to the pull the caller provides, so the
table the designer approves is generated, never hand-maintained.

Input : the auto-saved figma_execute result holding {file, collections, vars}
Output: design-library/lotteryplus/figma-rename-table.md
"""
import json
import sys
import collections

PULL = sys.argv[1]
OUT = "design-library/lotteryplus/figma-rename-table.md"

# ── vocabulary, all from the map / design.md ─────────────────────────────
SIZE = {"s": "sm", "m": "md", "l": "lg"}
WEIGHT_ABBR = {"reg": "regular", "med": "medium", "semb": "semibold"}
FAMILIES = {"body", "heading", "display", "button", "label", "sub-title",
            "title", "caption", "underline"}
# component-tier state words (R2). `default` is a state HERE and a stop at the
# semantic tier — design.md line 297 lists the five canonical semantic stops
# (soft-light, light, default, dark, darker), which is why R2 never touches
# the semantic collection.
STATES = {"default": "rest", "focused": "focus", "pressed": "active",
          "actived": "selected", "defualt": "rest",
          "hover": "hover", "disabled": "disabled"}
VARIANTS = {"pri": "primary", "sec": "secondary", "ter": "tertiary",
            "out": "outline", "oncont": "on-container"}
PROPS = {"bg": "background", "fg": "foreground"}
BREAKPOINT = {"mobile-321": "2xs", "mobile-361": "xs", "mobile-390": "sm",
              "tablet-768": "md", "desktop-1024": "lg", "desktop-1280": "xl",
              "desktop-1440": "2xl", "desktop-1920": "3xl"}
BORDER_WIDTH = {"0": "none", "1": "hairline", "2": "thin", "4": "thick",
                "6": "heavy", "8": "2xl", "10": "3xl", "12": "4xl",
                "14": "5xl", "16": "6xl"}
OPACITY = {"0": "none", "25": "subtle", "40": "muted", "50": "disabled",
           "100": "full"}
ROLES = {"primary", "secondary", "tertiary", "link", "success", "error",
         "warning", "info"}
SEM_TAILS = {"default", "hover", "active", "focus", "disabled", "error",
             "defualt"}

SCRATCH = {"no-1", "no-2", "no-3", "no-4", "no-5", "no-6", "Boolean", "Boolean 2"}


def excluded(name):
    return (name.startswith(("grid/", "writing/")) or name in SCRATCH)


def kebab_spaces(name, rules):
    if " " in name:
        rules.add("R11")
        name = name.replace(" ", "-")
    return name


def fix_typos(name, rules):
    if "defualt" in name:
        rules.add("R7")
        name = name.replace("defualt", "default")
    if "fuschia" in name:
        rules.add("fix")
        name = name.replace("fuschia", "fuchsia")
    if "onbgcolor" in name:
        rules.add("R7")
        name = name.replace("onbgcolor", "on-bgcolor")
    return name


def rn_typography(name, rules, decisions):
    segs = name.split("/")
    if segs[0] == "size" and len(segs) == 2 and segs[1] in SIZE:
        rules.add("R4"); return f"size/{SIZE[segs[1]]}"
    if segs[0] == "line-height" and len(segs) == 2 and segs[1] in SIZE:
        rules.add("R4"); return f"line-height/{SIZE[segs[1]]}"
    if segs[0] == "weight" and len(segs) == 2 and segs[1] != segs[1].lower():
        rules.add("R5"); return f"weight/{segs[1].lower()}"
    if segs[0] in FAMILIES and len(segs) == 3:
        role, prop = segs[1], segs[2]
        prop2 = prop.replace(" ", "-")
        if prop2 != prop:
            rules.add("R11")
        parts = role.split("-")
        if len(parts) >= 2 and parts[-1] in WEIGHT_ABBR:
            size = "-".join(parts[:-1])
            size2 = SIZE.get(size, size)
            if size in SIZE:
                rules.add("R4")
            rules.add("typo-role")
            return f"{segs[0]}/{size2}/{WEIGHT_ABBR[parts[-1]]}/{prop2}"
        if "strike" in role:
            decisions.append((name, "strike role: weight plus text-decoration baked into one name"))
            return name
        return f"{segs[0]}/{segs[1]}/{prop2}"
    return name


def rn_semantic(name, rules, decisions):
    segs = name.split("/")
    if segs[0] == "breakpoint" and len(segs) == 2:
        if segs[1] in BREAKPOINT:
            rules.add("R9"); return f"breakpoint/{BREAKPOINT[segs[1]]}"
        return name
    if segs[0] == "dimension" and len(segs) == 3:
        kind, stop = segs[1], segs[2]
        if kind == "border-width":
            if stop in BORDER_WIDTH:
                rules.add("R8"); return f"dimension/border-width/{BORDER_WIDTH[stop]}"
            return name
        if kind == "opacity":
            if stop in OPACITY:
                rules.add("R8b"); return f"dimension/opacity/{OPACITY[stop]}"
            decisions.append((name, "numeric opacity stop with no semantic intent - design.md keeps the numeric ladder at the primitive tier; needs a designer decision (move down or delete)"))
            return name
        if kind == "spacing" and stop == "spacing-2lg":
            decisions.append((name, "RETIRE pending designer pick of 8 or 12 for Dropdown field padding (map section 5.1)"))
            return name
        return name
    if segs[0] == "colors":
        # R10 - accent drops the redundant role/hue prefix
        if len(segs) == 4 and segs[2] == "accent":
            last = segs[3]
            for pre in (segs[1] + "-", "green-"):
                if last.startswith(pre):
                    rules.add("R10")
                    return "/".join(segs[:3] + [last[len(pre):]])
            return name
        # R6 - role and stop joined by dash become a path
        last = segs[-1]
        parts = last.split("-")
        if len(parts) == 2 and parts[0] in ROLES and parts[1] in SEM_TAILS:
            rules.add("R6")
            return "/".join(segs[:-1] + [parts[0], parts[1]])
        # R1 - bg/fg spelled out, word-wise
        words = last.split("-")
        if any(w in PROPS for w in words):
            rules.add("R1")
            words = [PROPS.get(w, w) for w in words]
            return "/".join(segs[:-1] + ["-".join(words)])
    return name


def rn_component(name, rules, decisions):
    segs = name.split("/")
    segs = [("on-container" if s == "on-cont" else s) for s in segs]
    if "on-cont" in name:
        rules.add("R3")
    last = segs[-1]
    words = last.split("-")
    out = []
    for i, w in enumerate(words):
        if w in PROPS:
            rules.add("R1"); out.append(PROPS[w])
        elif w in VARIANTS:
            rules.add("R3")
            # the variant is already the parent group; dropping it would change
            # meaning, so it expands in place exactly as the map's section 4 shows
            # -- except the map DROPS it (btn-bg-pri-default -> btn-background-rest).
            continue
        elif i == len(words) - 1 and w in STATES:
            if STATES[w] != w:
                rules.add("R2")
            out.append(STATES[w])
        else:
            out.append(w)
    return "/".join(segs[:-1] + ["-".join(out)])


def main():
    data = json.load(open(PULL))["result"]
    vars_ = data["vars"]
    rows = collections.defaultdict(list)   # collection -> (before, after, rules)
    decisions = []
    counts = collections.Counter()

    for v in vars_:
        col, name = v["c"], v["n"]
        if excluded(name):
            counts[(col, "excluded")] += 1
            continue
        rules = set()
        n = kebab_spaces(name, rules)
        n = fix_typos(n, rules)
        if col == "typography":
            n = rn_typography(n, rules, decisions)
        elif col == "2-semantic":
            n = rn_semantic(n, rules, decisions)
        elif col == "3-component":
            n = rn_component(n, rules, decisions)
        # primitive: numbers are correct at that tier; only typos/spaces apply
        if n != name:
            rows[col].append((name, n, sorted(rules)))
            counts[(col, "rename")] += 1
        else:
            counts[(col, "keep")] += 1

    with open(OUT, "w", encoding="utf-8") as f:
        f.write("# Phase 2 Rename Table — before → after\n\n")
        f.write(f"> Generated by tools/gen-rename-table.py from a live pull of `{data['file']}` — never hand-edited.\n")
        f.write("> Rules: figma-rename-map.md (transcribing the Lark Standard).\n")
        f.write("> Status: **AWAITING DESIGNER APPROVAL** — nothing runs before sign-off.\n\n")
        f.write("## Totals\n\n| Collection | rename | keep | excluded |\n|---|---|---|---|\n")
        for col in ["3-component", "typography", "2-semantic", ".1-primitive"]:
            f.write(f"| `{col}` | **{counts[(col,'rename')]}** | {counts[(col,'keep')]} | {counts[(col,'excluded')]} |\n")
        total = sum(counts[(c, "rename")] for c in ["3-component", "typography", "2-semantic", ".1-primitive"])
        f.write(f"\n**{total} renames** · {len(decisions)} items need a decision first (last section).\n\n")
        for col in ["3-component", "typography", "2-semantic", ".1-primitive"]:
            if not rows[col]:
                continue
            f.write(f"\n## {col} — {len(rows[col])}\n\n| Before | After | Rules |\n|---|---|---|\n")
            for before, after, r in sorted(rows[col]):
                f.write(f"| `{before}` | `{after}` | {' '.join(r)} |\n")
        f.write("\n## Needs a decision before execution\n\n")
        f.write("| Variable | Question |\n|---|---|\n")
        for name, q in sorted(set(decisions)):
            f.write(f"| `{name}` | {q} |\n")
        f.write("| `no-1` … `no-6`, `Boolean`, `Boolean 2` | orphaned scratch variables — delete or namespace |\n")
    print(f"wrote {OUT}")
    for col in ["3-component", "typography", "2-semantic", ".1-primitive"]:
        print(f"  {col:14} rename {counts[(col,'rename')]:4}  keep {counts[(col,'keep')]:4}  excluded {counts[(col,'excluded')]:3}")
    print(f"  decisions: {len(set(decisions))}")


if __name__ == "__main__":
    main()
