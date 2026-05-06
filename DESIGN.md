---
version: alpha
name: Lotteryplus
description: Design system for Lotteryplus web app — Thai-first consumer lottery experience with bold red brand and dark neutral counterpoint.
colors:
  # ── Brand / Semantic ──
  primary: "#E32321"
  primary-dark: "#991B1B"
  primary-darker: "#7F1D1D"
  primary-soft: "#FEF2F2"
  primary-light: "#FFE2E2"
  secondary: "#262626"
  secondary-dark: "#141414"
  secondary-darker: "#080808"
  secondary-soft: "#FAFAFA"
  secondary-light: "#C9C9C9"
  tertiary: "#737373"

  # ── Status ──
  info: "#3B82F6"
  info-dark: "#1E40AF"
  info-soft: "#EFF6FF"
  success: "#22C55E"
  success-dark: "#166534"
  success-soft: "#F0FDF4"
  warning: "#EAB308"
  warning-dark: "#854D0E"
  warning-soft: "#FEFCE8"
  error: "#E32321"
  error-dark: "#991B1B"
  error-soft: "#FEF2F2"

  # ── Surface ──
  surface-00: "#FFFFFF"
  surface-01: "#FAFAFA"
  surface-02: "#F5F5F5"
  surface-03: "#E5E5E5"
  overlay: "#000000"

  # ── Text ──
  text-primary: "#262626"
  text-secondary: "#737373"
  text-disabled: "#D4D4D4"
  text-on-primary: "#FFFFFF"
  text-inverse: "#FAFAFA"

  # ── Border ──
  border-default: "#D4D4D4"
  border-subtle: "#E5E5E5"
  border-strong: "#262626"

typography:
  display-3xl:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 48px
    lineHeight: 60px
    fontWeight: 600
  heading-h1:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 32px
    lineHeight: 48px
    fontWeight: 600
  heading-h2:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 28px
    lineHeight: 42px
    fontWeight: 600
  heading-h3:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 20px
    lineHeight: 36px
    fontWeight: 600
  heading-h4:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 16px
    lineHeight: 24px
    fontWeight: 600
  body-l:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 16px
    lineHeight: 24px
    fontWeight: 400
  body-m:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 14px
    lineHeight: 22px
    fontWeight: 400
  label-m:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 12px
    lineHeight: 18px
    fontWeight: 400
  caption:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 10px
    lineHeight: 16px
    fontWeight: 400
  button:
    fontFamily: "Graphik TH, sans-serif"
    fontSize: 14px
    lineHeight: 22px
    fontWeight: 600

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  "2xl": 16px
  "3xl": 20px
  "4xl": 24px
  full: 9999px

spacing:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  "2xl": 16px
  "3xl": 20px
  "4xl": 24px
  "5xl": 32px
  "6xl": 40px
  "7xl": 48px
  "8xl": 56px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
    typography: "{typography.button}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-on-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
    typography: "{typography.button}"
  button-tertiary:
    backgroundColor: "{colors.surface-00}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
    typography: "{typography.button}"
  text-field:
    backgroundColor: "{colors.surface-00}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
    typography: "{typography.body-m}"
  modal:
    backgroundColor: "{colors.surface-00}"
    rounded: "{rounded.2xl}"
---

# Lotteryplus Design System

## Overview

Lotteryplus is a Thai-first consumer lottery web application. The design system favors **bold, decisive choices** over subtle ones — this is a transactional product where users make money decisions under time pressure (draws happen on fixed schedules), so clarity and confidence outrank elegance.

**Brand voice in visuals:**
- **Bold red (#E32321)** is the load-bearing color — used for primary actions, brand surfaces, and live/active states.
- **Deep neutral (#262626)** is the counterpoint — secondary actions and primary text, never sleepy gray.
- White space is generous, but density returns inside number-heavy components (LottoBoard, results tables).

**What this system optimizes for:**
- **Trust under transaction** — users buying tickets need to see immediately what's primary vs. secondary.
- **Mobile-first responsive** — typography scales mobile → tablet → desktop with three breakpoints, never relying on viewport scaling alone.
- **Thai language fitment** — Graphik TH chosen for Thai diacritic clarity at 14px body size.

## Colors

### Primary (#E32321)

The brand red. Use for **single primary action per view** — "ซื้อ" (buy), "ยืนยัน" (confirm), submit-style CTAs. Never use for destructive actions; we accept the WCAG-borderline tradeoff because brand recognition is non-negotiable for a consumer product, and we pair it with `text-on-primary` (#FFFFFF) which clears 4.6:1.

**Do:**
- One primary button per screen.
- Primary brand surfaces (header logo background, active tab indicator).
- Loading/active state for live draws.

**Don't:**
- Don't use for error-only contexts — `error` token aliases the same hex but reads differently. Use `error` semantically.
- Don't use as text color on white below 14px / Semibold — contrast is 4.6:1, fails AAA for small body text.

### Secondary (#262626)

Deep neutral. The "second voice" of the system — secondary buttons, primary body text on white surfaces, strong borders.

**Do:**
- Body text default.
- Secondary CTAs ("ยกเลิก" / cancel, back navigation).
- Strong dividers between major sections.

**Don't:**
- Don't substitute pure black (#000000) — pure black creates harsh contrast with #E32321 nearby. The 95% black we use is intentional.

### Status colors

`info` (#3B82F6), `success` (#22C55E), `warning` (#EAB308), `error` (#E32321) — each pairs with `-soft` (background) and `-dark` (text-on-soft) tokens.

**Do:**
- Use `success-soft` background + `success-dark` text for confirmation messages — never just colored text on white.
- `error` shares hex with `primary` deliberately — Thai consumer apps blur the line and we follow convention. **But always use the `error` token** in component code so we can split them later if needed.

### Surface levels

`surface-00` (white) → `surface-03` (#E5E5E5). Use to express elevation in flat (non-shadow) layouts. For shadow-based elevation see Elevation section.

## Typography

**Font:** Graphik TH (sans-serif). Loaded via self-hosted webfont — no Google Fonts CDN, for Thai script subset performance.

**Type scale is responsive** across mobile / tablet / desktop. Tokens in YAML reflect **desktop** sizes; mobile shrinks each step roughly one notch (e.g. `body-m` 14px desktop → 14px mobile, but `display-3xl` 48px desktop → 32px mobile).

**Weights used:** Regular (400), Medium (500), Semibold (600). We do not use Bold (700) or above — Semibold is heavy enough on Thai script and avoids the "shouty" feel.

**Hierarchy intent:**
- `display-*` — marketing/hero only, never inside transactional flows.
- `heading-h1` to `heading-h4` — structural hierarchy in app pages.
- `body-l` (16) is default reading size, `body-m` (14) for dense interfaces (tables, forms).
- `label-m` (12) for form labels, `caption` (10) sparingly — only for legal/timestamp microcopy.
- `button` is its own token — same metrics as `body-m-semb` but the semantic separation matters for token export.

**Line-height is generous** (1.5–1.6×) to accommodate Thai vowels above and below the baseline.

## Layout

### Spacing scale

4px-grid based, with `xs` (2px) as a half-step for icon nudging only. Do not invent values — if you reach for "9px", reach for `lg` (8) or `2lg` (10) instead.

**Common patterns:**
- Component internal padding: `2xl` (16px) horizontal default.
- Stacked form fields: `4xl` (24px) vertical gap.
- Card → card: `5xl` (32px) vertical, `4xl` (24px) horizontal.
- Section → section: `7xl` (48px) on desktop, `5xl` (32px) on mobile.

### Breakpoints

- **mobile**: 321 / 361 / 390px (test all three — Thai users skew toward older devices)
- **tablet**: 768px
- **desktop**: 1024 / 1280 / 1440 / 1920px

Mobile-first writing: default styles target 361px, scale up.

## Elevation & Depth

Two systems coexist:

1. **Surface elevation** (preferred) — change `surface-00` → `surface-01` → `surface-02` to indicate layering. Used for cards on neutral backgrounds, nested panels.
2. **Shadow elevation** — used only for floating UI: dropdowns (`md`), modals (`xl`), toasts (`lg`).

**Avoid mixing** within a single screen — pick a system and stay consistent.

## Shapes

`rounded.lg` (8px) is the **default** for interactive elements (buttons, text fields, cards). `rounded.2xl` (16px) for modals and large surfaces. `rounded.full` for avatars, badges, and round icon buttons.

We do not use sharp corners (`rounded.none`) on interactive elements — this is a friendly consumer product, not enterprise software.

## Components

### Button

Five types: `primary`, `secondary`, `tertiary` (outlined), `outline` (text-on-transparent), `link`.

Three sizes: `L` (44px height, mobile-tap-friendly default), `M` (36px, dense layouts), `S` (28px, secondary toolbar actions).

**State coverage:** every button covers `default | hover | focused | pressed | disabled` — see [Button/tokens.ts](UI%20Library/components/Button/tokens.ts) for exact mappings.

**Do:**
- One `primary` button per logical decision point.
- Use `L` size on mobile primary CTAs always.

**Don't:**
- Don't stack two primaries side-by-side. Ever.
- Don't use `link` style for destructive actions — it reads "navigation."

### TextField

Single source for all text input. Default state has `border-default`, focuses to `primary` border + 2px ring.

**Validation pattern:** error state uses `error` border + `error-dark` helper text + soft pink (`error-soft`) background only when filled with bad data.

### Modal

Always uses `overlay` token (60% black) on top of content. Modal surface is `surface-00` with `rounded.2xl` and `shadow.xl`. Close affordance is required (top-right "×") in addition to outside-click dismiss.

### LottoBoard (domain-specific)

The number-picking surface. Density-optimized — `spacing-sm` (4px) gaps between number cells. Active selection uses `primary` background; this is **the one place we override "1 primary per screen"** because every cell is conceptually one independent action.

## Do's and Don'ts

### Do
- **Use semantic tokens** (`primary`, `error`, `text-secondary`) — never reach into primitive palette (`red.500`) directly in components.
- **Pair color with text style** — color alone is never the sole signifier of state (a11y).
- **Test at 321px mobile** for every new screen — many Thai users are on smaller/older devices.
- **Lint before merging** — `npx @google/design.md lint DESIGN.md` should pass.

### Don't
- **Don't introduce new tokens ad-hoc** — propose in PR description, get DS owner review.
- **Don't use Tailwind arbitrary values** (`text-[#E32321]`) — defeats the system. Use `text-primary` from generated config.
- **Don't ship pure-color icon-only buttons** without aria-label — Thai screen readers depend on it.
- **Don't override `line-height`** in component styles — Thai script breaks visually if line-height drops below 1.4×.
