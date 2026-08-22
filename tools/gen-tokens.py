#!/usr/bin/env python3
"""Generate tokens.css (2-tier: --sys-* / --comp-*) from design.md.

Tier 1 (--sys-*) comes from design.md's `semantic` block, with every {primitive.*}
ref resolved to a literal value. Tier 2 (--comp-*) comes from components.json when it
exists; until then only Tier 1 is emitted.

Naming follows the 7 Solutions Design System Standard: dots in a token path become
dashes, and the top-level group is singularised (colors -> color).

Usage:
    python3 tools/gen-tokens.py [--design PATH] [--components PATH] [--out PATH]
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

REPO = Path(__file__).resolve().parent.parent
DEFAULT_DESIGN = REPO / "design-library" / "lotteryplus" / "design.md"
DEFAULT_COMPONENTS = REPO / "design-library" / "lotteryplus" / "components.json"
DEFAULT_OUT = REPO / "ui" / "foundations" / "tokens.css"

# Semantic group -> CSS var segment. Groups absent here keep their own name.
GROUP_ALIAS = {
    "colors": "color",
    "breakpoints": "breakpoint",
    "typography": "type",
}

# Breakpoint tier the desktop typography mode kicks in at.
DESKTOP_FROM = "md"

REF_RE = re.compile(r"^\{([a-z0-9_.\-]+)\}$", re.IGNORECASE)
ALPHA_RE = re.compile(r"^(\{[^}]+\}|#[0-9A-Fa-f]+)@(\d+)%$")


class ResolveError(Exception):
    pass


def read_frontmatter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ResolveError(f"{path} has no YAML frontmatter")
    end = text.find("\n---", 3)
    if end == -1:
        raise ResolveError(f"{path} frontmatter is not terminated")
    return yaml.safe_load(text[3:end])


def dig(tree: dict, dotted: str):
    node = tree
    for part in dotted.split("."):
        if isinstance(node, dict) and part in node:
            node = node[part]
        elif isinstance(node, dict) and part.isdigit() and int(part) in node:
            node = node[int(part)]
        else:
            raise ResolveError(f"unresolved path: {dotted}")
    return node


def hex_with_alpha(base: str, percent: int) -> str:
    """Append an 8-bit alpha channel to a #RRGGBB value."""
    base = base.strip()
    if not base.startswith("#"):
        return base
    rgb = base[1:7]
    alpha = round(255 * percent / 100)
    return f"#{rgb}{alpha:02X}".upper()


def resolve(value, doc: dict, depth: int = 0):
    """Resolve a design.md value to a literal, following {primitive.*} refs."""
    if depth > 12:
        raise ResolveError("ref chain too deep (cycle?)")

    if isinstance(value, str):
        alpha = ALPHA_RE.match(value.strip())
        if alpha:
            inner, percent = alpha.group(1), int(alpha.group(2))
            return hex_with_alpha(str(resolve(inner, doc, depth + 1)), percent)
        ref = REF_RE.match(value.strip())
        if ref:
            return resolve(dig(doc, ref.group(1)), doc, depth + 1)
        return value

    if isinstance(value, dict):
        # Mode wrapper: {light: ...} — light is the only mode defined today.
        if set(value) <= {"light", "dark"} and "light" in value:
            return resolve(value["light"], doc, depth + 1)
        # Responsive primitive: {mobile: N, desktop: N}
        if set(value) == {"mobile", "desktop"}:
            return {k: resolve(v, doc, depth + 1) for k, v in value.items()}
        return value

    return value


def css_shadow(shadow: dict, doc: dict) -> str:
    layers = []
    for layer in shadow.get("layers", []):
        color = resolve(layer["color"], doc)
        parts = [f"{layer['x']}px", f"{layer['y']}px", f"{layer['blur']}px"]
        if layer.get("spread"):
            parts.append(f"{layer['spread']}px")
        prefix = "inset " if shadow.get("inset") else ""
        layers.append(prefix + " ".join(parts) + f" {color}")
    return ", ".join(layers) if layers else "none"


def var_name(path: list[str]) -> str:
    group, *rest = path
    head = GROUP_ALIAS.get(group, group)
    return "--sys-" + "-".join([head, *rest])


def px(value) -> str:
    return f"{value}px" if isinstance(value, (int, float)) else str(value)


# Token names ending in one of these hold a unitless number. `font-weight: 500px` is not a
# weight the browser will accept — it drops the declaration and the text renders at
# whatever it inherited, silently. Two tokens shipped that way before this existed.
UNITLESS_SUFFIXES = ("-weight", "-opacity", "-basis", "-count", "-index", "-flex")


def dimension(name: str, value) -> str:
    """`px(value)`, unless the token's name says it carries no unit."""
    if isinstance(value, (int, float)) and name.endswith(UNITLESS_SUFFIXES):
        return str(value)
    return px(value)


def collect(doc: dict):
    """Walk semantic.* and return (static vars, desktop-only overrides)."""
    semantic = doc["semantic"]
    static: list[tuple[str, str, str]] = []   # (group, name, value)
    responsive: list[tuple[str, str]] = []    # (name, desktop value)

    # Opacity emits as a percentage. The primitive ladder is authored 0-100 to mirror
    # Figma, and bare `opacity: 50` is invalid CSS — `50%` is the form that works in the
    # opacity property and inside color-mix alike.
    percent = {"opacity"}
    raw_string = {"typography"}

    def walk(node, path: list[str]):
        group = path[0]

        if group == "iconography":
            return

        # Elevation roles are refs into primitive.shadow.*, which resolve to a dict of
        # layers rather than a scalar. Compose those into a box-shadow string.
        if group == "elevation":
            shadow = resolve(node, doc) if isinstance(node, str) else node
            if isinstance(shadow, dict) and "layers" in shadow:
                static.append((group, var_name(path), css_shadow(shadow, doc)))
                return

        if isinstance(node, dict):
            resolved = resolve(node, doc)
            if isinstance(resolved, dict) and set(resolved) == {"mobile", "desktop"}:
                static.append((group, var_name(path), px(resolved["mobile"])))
                responsive.append((var_name(path), px(resolved["desktop"])))
                return
            if resolved is not node:
                node = resolved
            if isinstance(node, dict):
                for key, child in node.items():
                    walk(child, path + [str(key)])
                return

        value = resolve(node, doc)
        if isinstance(value, dict) and set(value) == {"mobile", "desktop"}:
            static.append((group, var_name(path), px(value["mobile"])))
            responsive.append((var_name(path), px(value["desktop"])))
            return

        name = var_name(path)
        if group in raw_string and path[-1] in {"family", "weight", "tracking", "text-decoration"}:
            static.append((group, name, str(value)))
        elif group in percent:
            static.append((group, name, f"{value}%"))
        elif isinstance(value, str):
            static.append((group, name, str(value)))
        elif isinstance(value, (int, float)):
            static.append((group, name, px(value)))
        else:
            static.append((group, name, str(value)))

    for group, node in semantic.items():
        walk(node, [group])

    return static, responsive


def emit(doc: dict, components: dict | None, design_path: Path) -> str:
    static, responsive = collect(doc)
    meta = doc.get("source_of_truth", {})

    out: list[str] = []
    out.append("/* ===================================================================")
    out.append(" * tokens.css — GENERATED FILE, DO NOT EDIT BY HAND")
    out.append(f" * Source:    {design_path.name}")
    out.append(f" * Values:    {meta.get('values', 'n/a')}")
    out.append(f" * Naming:    {meta.get('structure_and_naming', 'n/a')}")
    out.append(f" * Regenerate: python3 tools/gen-tokens.py")
    out.append(" *")
    out.append(" * TIER 1  --sys-*   semantic, cross-component intent")
    out.append(" * TIER 2  --comp-*  per-component alias, points at a --sys-* var")
    out.append(" * =================================================================== */")
    out.append("")
    out.append(":root {")

    current = None
    for group, name, value in static:
        if group != current:
            out.append("")
            out.append(f"  /* ── {group} ── */")
            current = group
        out.append(f"  {name}: {value};")

    out.append("}")

    if responsive:
        bp = resolve(doc["semantic"]["breakpoints"][DESKTOP_FROM], doc)
        out.append("")
        out.append(f"/* Typography resolves to its desktop mode from the `{DESKTOP_FROM}` tier up. */")
        out.append(f"@media (min-width: {bp}px) {{")
        out.append("  :root {")
        for name, value in responsive:
            out.append(f"    {name}: {value};")
        out.append("  }")
        out.append("}")

    if components:
        index = {name: value for _, name, value in static}
        out.append("")
        out.append("/* ── TIER 2 — component aliases ── */")
        out.append(":root {")
        for name, value, _lit, _desk, _alpha in component_vars(components, doc, index):
            out.append(f"  {name}: {value};")
        out.append("}")

    out.append("")
    return "\n".join(out)


def emit_ts(doc: dict, components: dict | None) -> str:
    """Emit tokens.generated.ts — resolved literals for docs, stories and tests."""
    static, responsive = collect(doc)
    index = {name: value for _, name, value in static}
    desktop = dict(responsive)
    # A Tier 2 alias inherits its mode from the Tier 1 token it points at, so resolving
    # component refs a second time against this overlay gives their desktop literals.
    desktop_index = {**index, **desktop}

    lines: list[str] = []
    lines.append("// ===================================================================")
    lines.append("// tokens.generated.ts — GENERATED FILE, DO NOT EDIT BY HAND")
    lines.append("// Regenerate: python3 tools/gen-tokens.py")
    lines.append("//")
    lines.append("// Every value here traces to Figma via design.md + components.json.")
    lines.append("// Import these in stories and tests so a verification table can never")
    lines.append("// drift from what the component actually renders.")
    lines.append("// ===================================================================")
    lines.append("")
    # json.dumps, not f-string quoting: token values legitimately contain single quotes
    # (a font stack is `'Graphik TH', 'Sarabun', …`) and naive wrapping produces a file
    # that will not parse.
    import json as _json

    def entry(name: str, value) -> str:
        return f"  {_json.dumps(str(name))}: {_json.dumps(str(value))},"

    lines.append("/** Resolved literal values, keyed by CSS custom property name. */")
    lines.append("export const TOKEN_VALUES = {")
    for _group, name, value in static:
        lines.append(entry(name, value))
    alpha_names: list[str] = []
    if components:
        for name, _css, lit, desk, alpha in component_vars(components, doc, index, desktop_index):
            lines.append(entry(name, lit))
            if desk is not None:
                desktop[name] = desk
            if alpha:
                alpha_names.append(name)
    lines.append("} as const;")
    lines.append("")
    lines.append("/**")
    lines.append(" * Values that change at the `md` breakpoint and above.")
    lines.append(" *")
    lines.append(" * Includes Tier 2 aliases, not just `--sys-*`: a component token pointing at a")
    lines.append(" * responsive typography role is responsive too, and a checker comparing it against")
    lines.append(" * the mobile literal at desktop width would report a mismatch that is not one.")
    lines.append(" */")
    lines.append("export const TOKEN_VALUES_DESKTOP = {")
    for name, value in desktop.items():
        lines.append(entry(name, value))
    lines.append("} as const;")
    lines.append("")
    lines.append("/**")
    lines.append(" * Tokens whose CSS is a `color-mix()` while the literal above is a flattened hex.")
    lines.append(" *")
    lines.append(" * Same colour, never the same string — the CSS keeps the alias chain to `--sys-*`")
    lines.append(" * alive, the literal is what a table prints. A textual comparison must skip these")
    lines.append(" * rather than call them drift.")
    lines.append(" */")
    lines.append("export const TOKEN_VALUES_ALPHA: readonly string[] = [")
    for name in alpha_names:
        lines.append(f"  {_json.dumps(name)},")
    lines.append("] as const;")
    lines.append("")
    lines.append("export type TokenName = keyof typeof TOKEN_VALUES;")
    lines.append("")
    lines.append("/** The CSS reference a component renders with, e.g. `var(--btn-radius)`. */")
    lines.append("export const cssVar = (name: TokenName, fallback?: string): string =>")
    lines.append("  fallback ? `var(${name}, ${fallback})` : `var(${name})`;")
    lines.append("")
    lines.append("/** The resolved literal behind a token — for docs, tables and assertions. */")
    lines.append("export const tokenValue = (name: TokenName): string => TOKEN_VALUES[name];")
    lines.append("")
    return "\n".join(lines)


def sys_ref(ref: str) -> str:
    """Turn a {design.semantic.*} ref — optionally with @N% — into a CSS value.

    Alpha is expressed with color-mix so the alias chain to --sys-* survives instead of
    being flattened into a literal hex.
    """
    ref = str(ref).strip()
    alpha = ALPHA_RE.match(ref)
    percent = None
    if alpha:
        ref, percent = alpha.group(1), int(alpha.group(2))

    match = REF_RE.match(ref)
    if not match:
        return ref

    path = match.group(1).split(".")
    if path[0] == "design":
        path = path[1:]
    if path and path[0] == "semantic":
        path = path[1:]

    var = f"var({var_name(path)})"
    if percent is not None:
        return f"color-mix(in srgb, {var} {percent}%, transparent)"
    return var


def literal(ref, doc: dict, static_index: dict[str, str]):
    """Resolve a components.json ref all the way down to a literal value.

    `static_index` decides which mode the answer is in: pass the mobile index for the
    mobile literal, the desktop-overlaid one for the desktop literal. A Tier 2 alias to a
    responsive Tier 1 token has two correct answers, and saying so is the difference
    between a verification page that can be trusted and one that reports 145 phantom
    mismatches at desktop width.
    """
    if not isinstance(ref, str):
        return px(ref)

    ref = ref.strip()
    alpha = ALPHA_RE.match(ref)
    percent = None
    if alpha:
        ref, percent = alpha.group(1), int(alpha.group(2))

    match = REF_RE.match(ref)
    if not match:
        return ref

    path = match.group(1).split(".")
    if path[0] == "design":
        path = path[1:]
    if path and path[0] == "semantic":
        path = path[1:]

    value = static_index.get(var_name(path), "")
    if percent is not None and value.startswith("#"):
        return hex_with_alpha(value, percent)
    return value


def is_alpha_ref(ref) -> bool:
    """True when the CSS side is a color-mix and the literal side is a flattened hex.

    The two are the same colour but never the same string, so a textual comparison has to
    know to leave them alone rather than report them.
    """
    return isinstance(ref, str) and bool(ALPHA_RE.match(ref.strip()))


def component_vars(components: dict, doc: dict, static_index: dict[str, str],
                   desktop_index: dict[str, str] | None = None):
    """Flatten components.json into Tier 2 tokens.

    Yields (css_var_name, css_value, resolved_literal). The literal is what Storybook's
    verification tables compare against Figma. Keys starting with `_` are human
    annotations and never reach the output.
    """
    skip = {"states", "extends", "reason", "expires", "review_owner"}

    for comp_name, comp in sorted(components.get("components", {}).items()):
        prefix = comp.get("css_prefix", comp_name)

        def emit(name: str, ref):
            css = sys_ref(ref) if isinstance(ref, str) else dimension(name, ref)
            lit = literal(ref, doc, static_index)
            desk = literal(ref, doc, desktop_index) if desktop_index else lit
            return name, css, lit, (desk if desk != lit else None), is_alpha_ref(ref)

        # Flat palette — most components are modelled this way in Figma, with no
        # variant x state matrix. Button is the exception.
        for key, ref in comp.get("tokens", {}).items():
            if not key.startswith("_"):
                yield emit(f"--{prefix}-{key}", ref)

        for key, ref in comp.get("base", {}).items():
            if not key.startswith("_"):
                yield emit(f"--{prefix}-{key}", ref)

        for size, spec in comp.get("sizes", {}).items():
            for key, ref in spec.items():
                if not key.startswith("_"):
                    yield emit(f"--{prefix}-{size}-{key}", ref)

        groups = list(comp.get("variants", {}).items())
        groups += list(comp.get("variant_extensions", {}).items())

        for variant, spec in groups:
            for key, ref in spec.items():
                if not key.startswith("_") and key not in skip:
                    yield emit(f"--{prefix}-{variant}-{key}", ref)

            for state, props in spec.get("states", {}).items():
                for prop, ref in props.items():
                    if not prop.startswith("_"):
                        yield emit(f"--{prefix}-{variant}-{prop}-{state}", ref)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--design", type=Path, default=DEFAULT_DESIGN)
    ap.add_argument("--components", type=Path, default=DEFAULT_COMPONENTS)
    ap.add_argument("--out", type=Path, default=DEFAULT_OUT)
    args = ap.parse_args()

    doc = read_frontmatter(args.design)
    components = None
    if args.components.exists():
        import json
        components = json.loads(args.components.read_text(encoding="utf-8"))

    css = emit(doc, components, args.design)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(css, encoding="utf-8")

    ts_path = args.out.with_name("tokens.generated.ts")
    ts_path.write_text(emit_ts(doc, components), encoding="utf-8")

    tier1 = sum(1 for line in css.splitlines() if line.strip().startswith("--sys-"))
    tier2 = sum(
        1 for line in css.splitlines()
        if line.strip().startswith("--") and not line.strip().startswith("--sys-")
    )
    print(f"wrote {args.out.relative_to(REPO)}")
    print(f"  tier 1 (--sys-*):  {tier1} declarations")
    if components:
        print(f"  tier 2 (component): {tier2} declarations")
    else:
        print("  tier 2:            skipped (components.json not built yet)")
    print(f"wrote {ts_path.relative_to(REPO)}")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except ResolveError as exc:
        print(f"error: {exc}", file=sys.stderr)
        sys.exit(1)
