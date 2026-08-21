# Decision 0001 — Phase 0: Token Source of Truth (verified against Figma V.7.1)

> Date: 2026-08-17
> Verified live via figma-console MCP against `Design Systems Web App Lotteryplus V.7.1` (fileKey `inmmHQID7awAWFcEJzedZa`)
> Status: ✅ Q0.1, Q0.2 resolved by evidence · ⏳ Q0.3, Q0.4 need team decision

---

## Q0.1 — `warning` hue: yellow vs amber

**RESOLVED — yellow.**

| Source | Value | Verdict |
|---|---|---|
| Figma `colors/warning/default` | `#EAB308` → alias `colors/yellow/500` | ✅ source of truth |
| Storybook UI Library | `#EAB308` | ✅ correct |
| FE `--warning-default` | `#f59e0b` (Tailwind amber.500) | ❌ **drift — must fix** |

Full Figma warning ladder (all alias `colors/yellow/*`):
`soft-light #FEFCE8 (50) · light #FEF9C3 (100) · default #EAB308 (500) · dark #854D0E (800) · darker #713F12 (900)`
Accent: `warning-md #FACC15 (400) · warning-lg #CA8A04 (600) · warning-xl #A16207 (700)`

## Q0.2 — `secondary` ladder: neutral custom vs stone

**RESOLVED — custom hue `midnight` (Figma primitive).**

| Stop | Figma (`colors/midnight/*`) | Storybook | FE | Verdict |
|---|---|---|---|---|
| default (500) | `#262626` | `#262626` ✅ | `#262626` ✅ | — |
| dark (800) | `#141414` | `#141414` ✅ | `#1c1917` (stone.900) ❌ | FE drift |
| darker (950) | `#080808` | `#080808` ✅ | `#000000` ❌ | FE drift |
| light (100) | `#C9C9C9` | `#C9C9C9` ✅ | `#d6d3d1` (stone.300) ❌ | FE drift |
| accent md (400) | `#4F4F4F` | `#4F4F4F` (btn hover) ✅ | — missing | FE gap |
| accent xl (700) | `#1A1A1A` | `#1A1A1A` (btn pressed) ✅ | — missing | FE gap |

## Q0.2b — `primary` ladder (bonus verification)

**Figma custom `red` ladder — `#E32321` sits at stop 500 (not Tailwind red).**

| Role | Figma | Storybook | FE | Verdict |
|---|---|---|---|---|
| default | `#E32321` → `red/500` | ✅ | ✅ | — |
| dark | `#991B1B` → `red/800` | ✅ | `#b91c1c` ❌ (Figma dark = 991B1B; FE uses B91C1C) | FE drift |
| darker | `#7F1D1D` → `red/900` | ✅ | ✅ | — |
| light | `#FFE2E2` → `red/100` | ✅ | `#fca5a5` (Tailwind red.300) ❌ | FE drift |
| soft-light | `#FEF2F2` → `red/50` | ✅ | ✅ | — |

⚠️ Note for `design-library/lotteryplus/design.md`: generated file placed `#E32321` at `brand.600` — Figma primitive names it `red/500`. Update design.md ladder to match Figma stop numbering (`brand.500 = #E32321`).

## Structural finding — Figma already has 3-tier collections

Figma variable collections: `1-primitive` → `2-semantic` → `3-component` (e.g. `colors/button/secondary/btn-bg-sec-default` aliases `colors/secondary/default`). Matches Lark standard's 3-layer concept. ✅

**BUT** Figma's component tier uses non-canonical vocabulary:
- `btn-bg-*` / `btn-fg-*` (abbreviated — standard requires `background`/`foreground`)
- states `default/focused/pressed` (standard requires `rest/focus/active`)

→ Vocabulary migration (Phase 2) must include **Figma variable renames**, not just code. Otherwise Figma↔code drift persists at naming level.

## Decisions locked

1. **warning = yellow ladder** (`#EAB308` family). FE migrates off amber.
2. **secondary = midnight custom hue** as primitive in design.md; FE migrates off stone.
3. **primary = custom red ladder with `#E32321` @ stop 500**; FE fixes `primary-dark` (`#991B1B`) + `primary-light` (`#FFE2E2`).
4. **Source-of-truth chain: Figma → design.md → Storybook (tokens.css) → FE.**

## Q0.3 — Variant disposition (RESOLVED 2026-08-17)

- **`outline`, `link`** → **keep**, promote to `variant-extensions` with `reason + expires + extends` metadata.
- **`green`, `green_line`, `green_light`** → **deprecate** — not part of DS. FE removes during adoption (Phase 5).
- `red_outline`, `transparent` → fold into `outline` variant styling / `ghost` canonical — confirm per-usage during Phase 5.

## Q0.4 — Ownership chain (DEFERRED)

Design side proceeds first — design lead prepares proposal before assigning owners per hop.

## Q0.5 — Figma variable rename (RESOLVED — automated)

Executed by Claude via figma-console MCP (`figma_rename_variable` / `figma-rename-tokens` skill) — non-destructive, preserves bindings/values/modes. Scheduled in Phase 2 pipeline alongside code renames so Figma + code flip vocabulary in the same window. Designer approves rename map before execution (hybrid auto-suggest + approval).
