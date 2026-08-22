#!/usr/bin/env python3
"""Build components.json from the Figma component-tier mirror.

Figma models most components as a flat palette — `toast-bg-soft-green`, `modal-fg-dark` —
rather than the variant x state matrix Button uses. This script mirrors those groups into
components.json with Standard-compliant names, resolving each Figma alias into a
`{design.semantic.*}` ref.

Button is hand-authored (it has a real variant/state matrix) and is preserved untouched.

Usage:
    python3 tools/gen-components.py [--check]

    --check  exit 1 if the file on disk differs from what would be generated
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
LIB = REPO / "design-library" / "lotteryplus"
FIGMA_MIRROR = LIB / "components.figma.json"
COMPONENTS = LIB / "components.json"
OVERLAY_DIR = LIB / "components"

# Editorial metadata — a human decides these, not the pull. Groups absent here are
# skipped (they are app surfaces, not design-system components).
#
# `storybook` names the folder under `ui/components/`, or None when Figma has
# tokens for a surface the library does not model as a component. A list when one Figma
# colour group backs several components — `colors/top-and-footer` paints the header, the
# site footer and the sticky action bar, and splitting the group to match would be a
# rename of Figma, not of the library.
#
# `figma_group` is normally derived (`colors/<group>`) and therefore absent here. Spelling
# it as None marks the inverse case — a component the library models that Figma has no
# colour group for. Those groups contribute nothing to the mirror, so `build()` seeds them
# explicitly and their overlay in components/<name>.json carries the colours too.
META: dict[str, dict] = {
    "icon": {
        "responsibility": "Render a single pictogram",
        "composition_level": "atom", "scope": "global",
        "dependencies": [], "prefix": "icon", "storybook": "icons",
    },
    "breadcrumb": {
        "responsibility": "Show the path back through a page hierarchy",
        "composition_level": "molecule", "scope": "global",
        "dependencies": ["link", "icon"], "prefix": "breadcrumb", "storybook": "Breadcrumb",
    },
    "checkbox": {
        "responsibility": "Toggle one option on or off",
        "composition_level": "atom", "scope": "global",
        "dependencies": ["icon"], "prefix": "checkbox", "storybook": "Checkbox",
    },
    "dropdown": {
        "responsibility": "Pick one option from a list",
        "composition_level": "molecule", "scope": "global",
        "dependencies": ["input", "icon", "list-item"], "prefix": "dropdown", "storybook": "Dropdown",
    },
    "loading": {
        "responsibility": "Signal that work is in progress",
        "composition_level": "atom", "scope": "global",
        "dependencies": [], "prefix": "loading", "storybook": "Loading",
    },
    "toggle-switch": {
        "responsibility": "Switch a setting between two states",
        "composition_level": "atom", "scope": "global",
        "dependencies": [], "prefix": "toggle", "storybook": "ToggleSwitch",
    },
    "radio-buttons": {
        "responsibility": "Pick exactly one option from a small set",
        "composition_level": "atom", "scope": "global",
        "dependencies": [], "prefix": "radio", "storybook": "RadioButton",
    },
    "progress-bars": {
        "responsibility": "Show how far along a task is",
        "composition_level": "atom", "scope": "global",
        "dependencies": [], "prefix": "progress", "storybook": "ProgressBar",
    },
    "text-field": {
        "responsibility": "Accept a line of typed input",
        "composition_level": "atom", "scope": "global",
        "dependencies": ["label", "icon"], "prefix": "text-field", "storybook": "TextField",
    },
    "navigation-bar": {
        "responsibility": "Move between the top-level areas of the app",
        "composition_level": "organism", "scope": "global",
        "dependencies": ["icon", "link"], "prefix": "navigation", "storybook": "NavigationBar",
    },
    "tabs": {
        "responsibility": "Switch between sibling views in place",
        "composition_level": "organism", "scope": "global",
        "dependencies": ["tab-item"], "prefix": "tabs", "storybook": "Tabs",
    },
    "modal": {
        "responsibility": "Interrupt the flow for a decision that cannot wait",
        "composition_level": "organism", "scope": "global",
        "dependencies": ["button", "icon", "overlay"], "prefix": "modal", "storybook": "Modal",
    },
    "toast": {
        "responsibility": "Report the outcome of an action without blocking",
        "composition_level": "molecule", "scope": "global",
        "dependencies": ["icon"], "prefix": "toast", "storybook": "Toast",
    },
    # The exception: Figma V.7.1 has no `colors/tooltip` group, so nothing about Tooltip
    # arrives through the mirror. `figma_group: None` keeps the entry alive anyway and
    # components/tooltip.json supplies the colours as well as the layout.
    "tooltip": {
        "responsibility": "Explain an element on hover or focus, without taking focus itself",
        "composition_level": "molecule", "scope": "global",
        "dependencies": ["icon"], "prefix": "tooltip", "storybook": "Tooltip",
        "figma_group": None,
    },
    # Figma has no `colors/divider` component group and no divider component set — only a
    # semantic `colors/divider` family. `figma_group: None` keeps the entry alive and the
    # overlay binds those semantic roles directly.
    # ── FE-sourced components (authority rule amended 2026-08-20: Figma wins when it
    # exists; when it does not, the Frontend is the authority). Each overlay carries a
    # _verified_from proving the Figma absence was checked, not assumed.
    "skeleton": {
        "responsibility": "Hold a place while content loads",
        "composition_level": "atom", "scope": "global",
        "dependencies": [], "prefix": "skeleton", "storybook": "Skeleton",
        "figma_group": None,
    },
    "title-with-underline": {
        "responsibility": "Head a section with the brand underline treatment",
        "composition_level": "molecule", "scope": "global",
        "dependencies": ["icon"], "prefix": "title-underline", "storybook": "TitleWithUnderline",
        "figma_group": None,
    },
    "accordion": {
        "responsibility": "Reveal and hide a block of content on demand",
        "composition_level": "molecule", "scope": "global",
        "dependencies": ["icon"], "prefix": "accordion", "storybook": "Accordion",
        "figma_group": None,
    },
    "infinity-scroll": {
        "responsibility": "Load the next page when the end scrolls into view",
        # Lark §3.7: a helper is its own `type`, not a rung on the atomic ladder — it has
        # no composition_level, no variants, no states, and it lives under helpers/.
        "type": "helper", "scope": "global",
        "dependencies": [], "prefix": "infinite-scroll", "storybook": "InfiniteScroll",
        "figma_group": None,
    },
    "countdown-timer": {
        "responsibility": "Count a reservation down to its deadline",
        "composition_level": "atom", "scope": "global",
        "dependencies": [], "prefix": "timer", "storybook": "CountdownTimer",
        "figma_group": None,
    },
    "alert": {
        "responsibility": "Warn inline without interrupting",
        "composition_level": "molecule", "scope": "global",
        "dependencies": ["icon"], "prefix": "alert", "storybook": "Alert",
        "figma_group": None,
    },
    "image-upload": {
        "responsibility": "Take an image from the user and show what they picked",
        "composition_level": "molecule", "scope": "global",
        "dependencies": ["icon", "button", "loading"], "prefix": "upload", "storybook": "ImageUpload",
        "figma_group": None,
    },
    "divider": {
        "responsibility": "Separate content without introducing a new surface",
        "composition_level": "atom", "scope": "global",
        "dependencies": [], "prefix": "divider", "storybook": "Divider",
        "figma_group": None,
    },
    # Figma has the component set but no `colors/avatar` group — it borrows
    # `colors/top-and-footer`. `figma_group: None` keeps the entry and the overlay carries
    # the colours, same arrangement as Tooltip.
    "avatar": {
        "responsibility": "Show who someone is at a glance",
        "composition_level": "atom", "scope": "global",
        "dependencies": ["icon"], "prefix": "avatar", "storybook": "Avatar",
        "figma_group": None,
    },
    "card": {
        "responsibility": "Show a lottery card face with its id",
        "composition_level": "atom", "scope": "project",
        "dependencies": ["logo"], "prefix": "card", "storybook": "LotteryCard",
        "project": "lotteryplus",
    },
    # Figma has no `colors/error-state` group — `noti-error` borrows `colors/home`. Same
    # arrangement as Tooltip, Divider and Avatar.
    "error-state": {
        "responsibility": "Explain why a screen has nothing to show, and offer the way out",
        "composition_level": "organism", "scope": "global",
        "dependencies": ["logo", "action-bar"], "prefix": "error-state",
        "storybook": "ErrorState", "figma_group": None,
    },
    "lotto-board": {
        "responsibility": "Pick lottery numbers from a dense grid",
        "composition_level": "organism", "scope": "project",
        "dependencies": ["button", "text-field", "dropdown"], "prefix": "lotto-board",
        "storybook": "LottoBoard", "project": "lotteryplus",
    },
    "carts": {
        "responsibility": "Review the tickets chosen before checkout",
        "composition_level": "organism", "scope": "project",
        "dependencies": ["card", "button"], "prefix": "carts", "storybook": None,
        "project": "lotteryplus",
    },
    "orders": {
        "responsibility": "Show the state of a placed order",
        "composition_level": "organism", "scope": "project",
        "dependencies": ["card", "badge"], "prefix": "orders", "storybook": None,
        "project": "lotteryplus",
    },
    "lottery": {
        "responsibility": "Display a single lottery ticket",
        "composition_level": "molecule", "scope": "project",
        "dependencies": ["card"], "prefix": "lottery", "storybook": None,
        "project": "lotteryplus",
    },
    "jidrit-lucky": {
        "responsibility": "Present the Jidrit lucky-number feature",
        "composition_level": "organism", "scope": "feature",
        "dependencies": ["card", "button"], "prefix": "jidrit", "storybook": None,
        "project": "lotteryplus", "feature": "jidrit-lucky",
    },
    "top-and-footer": {
        "responsibility": "Frame every page with a header and footer",
        "composition_level": "organism", "scope": "project",
        "dependencies": ["navigation-bar", "icon", "button"], "prefix": "topfoot",
        "storybook": ["Header", "Footer", "ActionBar"],
        "project": "lotteryplus",
    },
    "home": {
        "responsibility": "Surface the entry points on the landing page",
        "composition_level": "organism", "scope": "project",
        "dependencies": ["card", "button"], "prefix": "home", "storybook": None,
        "project": "lotteryplus",
    },
    "profile": {
        "responsibility": "Show and edit the signed-in user's details",
        "composition_level": "organism", "scope": "project",
        "dependencies": ["avatar", "text-field", "button"], "prefix": "profile", "storybook": None,
        "project": "lotteryplus",
    },
    "bottom sheet": {
        "responsibility": "Raise a panel from the bottom edge on mobile",
        "composition_level": "organism", "scope": "global",
        "dependencies": ["overlay"], "prefix": "bottom-sheet", "storybook": "BottomSheet",
    },
}

# Figma alias path -> semantic path. Ordered; first match wins.
ALIAS_RULES: list[tuple[re.Pattern, str]] = [
    (re.compile(r"^(success|warning|error|info)/accent/(?:green|warning|error|info)-(\w+)$"),
     r"status.\1.accent.\2"),
    (re.compile(r"^(success|warning|error|info)/accent/(\w+)$"), r"status.\1.accent.\2"),
    (re.compile(r"^(success|warning|error|info)/(.+)$"), r"status.\1.\2"),
    (re.compile(r"^(primary|secondary|tertiary)/accent/(?:primary|secondary|tertiary)-(\w+)$"),
     r"\1.accent.\2"),
    (re.compile(r"^(primary|secondary|tertiary)/accent/(\w+)$"), r"\1.accent.\2"),
    (re.compile(r"^foreground/fg-(.+)$"), r"foreground.\1"),
    (re.compile(r"^background/bg-(.+)$"), r"background.\1"),
    (re.compile(r"^border/accent/(.+)$"), r"border.accent.\1"),
    (re.compile(r"^overlay/overlay-black-80%$"), "overlay.heavy"),
    (re.compile(r"^overlay/overlay-(default|inverse)$"), r"overlay.\1"),
]

# Figma abbreviates soft-light as s-light in accent tint names.
ABBREV = [("-s-light", "-soft-light")]

# A handful of Figma tokens hold a literal instead of an alias. Each is a semantic colour
# at 40% (0x66), so expressing them as alpha refs keeps them on the alias chain — change
# the brand red and the focus ring follows, which a frozen hex would not.
RAW_TO_REF = {
    "#E3232166": "{design.semantic.colors.primary.default}@40%",
    "#22C55E66": "{design.semantic.colors.status.success.default}@40%",
    "#D4D4D466": "{design.semantic.colors.border.accent.gray-light}@40%",
}


def to_ref(alias: str) -> str:
    """Turn a Figma semantic path into a {design.semantic.colors.*} ref."""
    if alias.startswith("RAW "):
        raw = alias[4:]
        return RAW_TO_REF.get(raw, raw)

    for old, new in ABBREV:
        alias = alias.replace(old, new)

    for pattern, repl in ALIAS_RULES:
        if pattern.match(alias):
            return "{design.semantic.colors." + pattern.sub(repl, alias) + "}"

    return "{design.semantic.colors." + alias.replace("/", ".") + "}"


def token_name(group: str, prefix: str, raw: str) -> str:
    """Standard-compliant token name: property spelled out, prefix stripped."""
    name = raw
    for candidate in (f"{prefix}-", f"{group}-"):
        if name.startswith(candidate):
            name = name[len(candidate):]
            break
    # `bd-bg-*` (field focus outline) and `eff-bg-*` (radio ripple) are both the
    # canonical `ring` property under Figma-local spellings.
    name = re.sub(r"^(bd|eff)-bg-", "ring-", name)
    name = re.sub(r"^bg-", "background-", name)
    name = re.sub(r"^fg-", "foreground-", name)
    if name in {"bg", "fg"}:
        name = "background" if name == "bg" else "foreground"
    return name.replace("%", "").replace(" ", "-")


def build(mirror: dict) -> dict:
    grouped: dict[str, dict[str, str]] = {}
    for path, alias in mirror["tokens"].items():
        group, _, leaf = path.partition("/")
        if group not in META:
            continue
        prefix = META[group]["prefix"]
        grouped.setdefault(group, {})[token_name(group, prefix, leaf)] = to_ref(alias)

    # Components Figma has no colour group for contribute no tokens above, so seed them
    # here or they would be dropped along with their overlay. Only `figma_group: None`
    # opts in — an absent key still means "derive it from the group name".
    for group, meta in META.items():
        if "figma_group" in meta and meta["figma_group"] is None:
            grouped.setdefault(group, {})

    components: dict[str, dict] = {}
    for group, tokens in grouped.items():
        meta = META[group]
        name = group.replace(" ", "-")
        scope = meta["scope"]

        folder = f"global/components/{name}"
        if meta.get("type") == "helper":
            folder = f"global/helpers/{name}"
        elif scope == "project":
            folder = f"projects/{meta.get('project', 'lotteryplus')}/components/{name}"
        elif scope == "feature":
            folder = (
                f"projects/{meta.get('project', 'lotteryplus')}"
                f"/features/{meta.get('feature', name)}/components/{name}"
            )

        entry = {
            "name": name,
            "responsibility": meta["responsibility"],
        }
        # §3.7: helpers carry `type`, everything on the atomic ladder carries
        # `composition_level` — never both.
        if meta.get("type") == "helper":
            entry["type"] = "helper"
        else:
            entry["composition_level"] = meta["composition_level"]
        entry |= {
            "dependencies": meta["dependencies"],
            "scope": scope,
            "shared": scope == "global",
            "folder": folder,
            "css_prefix": meta["prefix"],
            "storybook": meta["storybook"],
            "figma_group": meta.get("figma_group", f"colors/{group}"),
            "tokens": dict(sorted(tokens.items())),
        }
        if "project" in meta:
            entry["project"] = meta["project"]
        if "feature" in meta:
            entry["feature"] = meta["feature"]

        # Overlay: layout, sizing and typography that Figma keeps outside the colour
        # collection. Authored per component in components/<name>.json so several people
        # (or agents) can work on different components without colliding on one file.
        overlay_path = OVERLAY_DIR / f"{name}.json"
        if overlay_path.exists():
            overlay = json.loads(overlay_path.read_text(encoding="utf-8"))
            overlay.pop("_comment", None)
            for key, value in overlay.items():
                if key == "tokens":
                    entry["tokens"].update(value)
                    entry["tokens"] = dict(sorted(entry["tokens"].items()))
                else:
                    entry[key] = value

        components[name] = entry

    return components


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()

    mirror = json.loads(FIGMA_MIRROR.read_text(encoding="utf-8"))
    existing = json.loads(COMPONENTS.read_text(encoding="utf-8"))

    generated = build(mirror)
    # Button is hand-authored — it has a real variant x state matrix.
    merged = {"button": existing["components"]["button"]}
    merged.update(dict(sorted(generated.items())))
    existing["components"] = merged

    text = json.dumps(existing, indent=2, ensure_ascii=False) + "\n"

    if args.check:
        if COMPONENTS.read_text(encoding="utf-8") != text:
            print("components.json is out of date — run: python3 tools/gen-components.py")
            return 1
        print("components.json is up to date")
        return 0

    COMPONENTS.write_text(text, encoding="utf-8")
    total = sum(len(c.get("tokens", {})) for c in generated.values())
    modelled = sum(1 for c in generated.values() if c["storybook"])
    print(f"wrote {COMPONENTS.relative_to(REPO)}")
    print(f"  components : {len(merged)} (button hand-authored + {len(generated)} generated)")
    print(f"  flat tokens: {total}")
    print(f"  with a Storybook component: {modelled}/{len(generated)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
