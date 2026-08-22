---
scope: tokens-only
name: Lotteryplus
version: 7.1.0
description: >
  Lotteryplus Design System — token bridge layer.
  VALUES are mirrored verbatim from Figma "Design Systems Web App Lotteryplus V.7.1"
  (fileKey inmmHQID7awAWFcEJzedZa, pulled 2026-08-17 via figma-console MCP).
  NAMING follows the 7 Solutions Design System Standard (Lark Wiki "Structure - Design system").
  Where Figma naming diverges from the Standard, this file uses the Standard name and the
  divergence is recorded in ./figma-rename-map.md for the Phase 2 Figma rename.

source_of_truth:
  structure_and_naming: 'Lark Wiki — Structure - Design system (7 Solutions Team)'
  values: 'Figma — Design Systems Web App Lotteryplus V.7.1 (inmmHQID7awAWFcEJzedZa)'
  pulled_at: '2026-08-17'
  figma_collections: ['.1-primitive (489)', 'typography (170, modes: mobile/desktop/Tablet)', '2-semantic (394)', '3-component (268)']

primitive:
  a11y:
    contrast-min-aa-body:   4.5
    contrast-min-aa-large:  3.0
    touch-target-min-px:    44
    focus-ring-min-px:      2
    motion-prefers-reduced: true

  colors:
    # ── Base atoms ──
    # Figma: colors/base/*  — alpha stops kept as-is (used by overlay roles)
    base:
      white:       '#FFFFFF'
      black:       '#000000'
      black-60:    '#00000099'
      black-80:    '#000000CC'
      white-60:    '#FFFFFF99'
      transparent: 'transparent'

    # ── midnight — CUSTOM brand neutral (not Tailwind) ──
    # Figma: colors/midnight/*  — the "second voice" ladder. secondary.* draws from here.
    midnight:
      50:  '#FAFAFA'
      100: '#C9C9C9'
      200: '#A1A1A1'
      300: '#787878'
      400: '#4F4F4F'
      500: '#262626'   # secondary.default
      600: '#202020'
      700: '#1A1A1A'
      800: '#141414'
      900: '#0D0D0D'
      950: '#080808'

    # ── red — Tailwind red with 2 BRAND OVERRIDES ──
    # Figma: colors/red/*
    #   500 = #E32321  (Tailwind red.500 is #EF4444) ← LOCKED brand red
    #   100 = #FFE2E2  (Tailwind red.100 is #FECACA) ← brand tint
    # All other stops are Tailwind v3.4 verbatim.
    red:
      50:  '#FEF2F2'
      100: '#FFE2E2'   # ← brand override
      200: '#FECACA'
      300: '#FCA5A5'
      400: '#F87171'
      500: '#E32321'   # ← BRAND RED (locked)
      600: '#DC2626'
      700: '#B91C1C'
      800: '#991B1B'
      900: '#7F1D1D'
      950: '#450A0A'

    # ── neutral — Tailwind v3.4 verbatim ──
    neutral:
      50:  '#FAFAFA'
      100: '#F5F5F5'
      200: '#E5E5E5'
      300: '#D4D4D4'
      400: '#A3A3A3'
      500: '#737373'
      600: '#525252'
      700: '#404040'
      800: '#262626'
      900: '#171717'
      950: '#0A0A0A'

    # ── yellow — Tailwind v3.4 verbatim (warning channel) ──
    yellow:
      50:  '#FEFCE8'
      100: '#FEF9C3'
      200: '#FEF08A'
      300: '#FDE047'
      400: '#FACC15'
      500: '#EAB308'
      600: '#CA8A04'
      700: '#A16207'
      800: '#854D0E'
      900: '#713F12'
      950: '#422006'

    # ── green — Tailwind v3.4 verbatim (success channel) ──
    green:
      50:  '#F0FDF4'
      100: '#DCFCE7'
      200: '#BBF7D0'
      300: '#86EFAC'
      400: '#4ADE80'
      500: '#22C55E'
      600: '#16A34A'
      700: '#15803D'
      800: '#166534'
      900: '#14532D'
      950: '#052E16'

    # ── blue — Tailwind v3.4 verbatim (info channel) ──
    blue:
      50:  '#EFF6FF'
      100: '#DBEAFE'
      200: '#BFDBFE'
      300: '#93C5FD'
      400: '#60A5FA'
      500: '#3B82F6'
      600: '#2563EB'
      700: '#1D4ED8'
      800: '#1E40AF'
      900: '#1E3A8A'
      950: '#172554'

    # NOTE: Figma .1-primitive also carries the full Tailwind palette (slate, gray, zinc,
    # stone, orange, amber, lime, emerald, teal, cyan, sky, indigo, violet, purple,
    # fuschia[sic], pink, rose) — 22 hues total. Only the 6 hues above are referenced by
    # the semantic layer, so only these are mirrored here to keep tokens.css lean.
    # See ## Known Gaps for the governance rule on adopting an unreferenced hue.

  typography:
    family:
      # Figma stores only the face name (`Graphik TH`) because Figma has the font
      # installed. Code does not: Graphik TH is commercial and not bundled, so the token
      # carries the fallback stack. Sarabun sits second for Thai glyph coverage —
      # without it, Thai text drops to a browser default with no diacritic tuning.
      sans: "'Graphik TH', 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    # weight — Figma: weight/{Thin,Light,Regular,Medium,Semibold,Bold,Black} (PascalCase → kebab here)
    weight:
      thin:     100
      light:    300
      regular:  400
      medium:   500
      semibold: 600
      bold:     700
      black:    900
    # size / line-height — RESPONSIVE PRIMITIVES.
    # Figma `typography` collection has 3 modes: mobile · desktop · Tablet (Tablet == desktop).
    # Values below are { mobile, desktop } — the responsive split lives at the PRIMITIVE tier
    # in this system (not at the semantic role), mirroring Figma exactly.
    size:
      2xs: { mobile: 8,  desktop: 10 }
      xs:  { mobile: 10, desktop: 12 }
      sm:  { mobile: 12, desktop: 14 }
      md:  { mobile: 14, desktop: 16 }
      lg:  { mobile: 16, desktop: 20 }
      xl:  { mobile: 20, desktop: 24 }
      2xl: { mobile: 28, desktop: 32 }
      3xl: { mobile: 32, desktop: 48 }
      4xl: { mobile: 40, desktop: 56 }
      5xl: { mobile: 48, desktop: 64 }
    line-height:
      2xs: { mobile: 12, desktop: 16 }
      xs:  { mobile: 16, desktop: 18 }
      sm:  { mobile: 18, desktop: 22 }
      md:  { mobile: 22, desktop: 24 }
      lg:  { mobile: 24, desktop: 36 }
      xl:  { mobile: 36, desktop: 42 }
      2xl: { mobile: 42, desktop: 48 }
      3xl: { mobile: 48, desktop: 54 }
      4xl: { mobile: 54, desktop: 60 }
      5xl: { mobile: 60, desktop: 66 }
    tracking:
      normal: 0

  # ── Numeric scales — Figma verbatim ──
  spacing:      { 0: 0, 2: 2, 4: 4, 6: 6, 8: 8, 10: 10, 12: 12, 16: 16, 20: 20, 24: 24, 32: 32, 40: 40, 48: 48, 56: 56, 64: 64, 72: 72, 80: 80 }
  radius:       { 0: 0, 2: 2, 4: 4, 6: 6, 8: 8, 12: 12, 16: 16, 20: 20, 24: 24, 32: 32, 40: 40, 48: 48, 56: 56, 64: 64, 72: 72, 9999: 9999 }
  border-width: { 0: 0, 1: 1, 2: 2, 4: 4, 6: 6, 8: 8, 10: 10, 12: 12, 14: 14, 16: 16 }
  blur:         { 0: 0, 4: 4, 8: 8, 12: 12, 16: 16, 24: 24, 40: 40, 64: 64 }
  opacity:      { 0: 0, 5: 5, 10: 10, 15: 15, 20: 20, 25: 25, 30: 30, 35: 35, 40: 40, 45: 45, 50: 50, 55: 55, 60: 60, 65: 65, 70: 70, 75: 75, 80: 80, 85: 85, 90: 90, 95: 95, 100: 100 }
  breakpoints:  { 321: 321, 361: 361, 390: 390, 768: 768, 1024: 1024, 1280: 1280, 1440: 1440, 1920: 1920 }

  # ── Shadows — decomposed, Figma verbatim ──
  # Figma models 2-layer shadows via `-2` suffixed sub-tokens. Preserved here as `layers[]`.
  shadow:
    none:
      layers:
        - { x: 0, y: 0, blur: 0, spread: 0, color: '{primitive.colors.base.black}@0%' }
    2xs:
      layers:
        - { x: 0, y: 1, blur: 0, spread: 0, color: '#0000000D' }
    xs:
      layers:
        - { x: 0, y: 1, blur: 2, spread: 0, color: '#0000000D' }
    sm:
      layers:
        - { x: 0, y: 1, blur: 3, spread: 0, color: '#0000001A' }
        - { x: 0, y: 1, blur: 2, spread: 0, color: '#0000000F' }
    md:
      layers:
        - { x: 0, y: 4, blur: 6, spread: -1, color: '#0000001A' }
        - { x: 0, y: 2, blur: 4, spread: -1, color: '#0000000F' }
    lg:
      layers:
        - { x: 0, y: 10, blur: 15, spread: -3, color: '#0000001A' }
        - { x: 0, y: 4,  blur: 6,  spread: -2, color: '#0000000D' }
    xl:
      layers:
        - { x: 0, y: 20, blur: 25, spread: -5, color: '#0000001A' }
        - { x: 0, y: 10, blur: 10, spread: -5, color: '#0000000A' }
    2xl:
      layers:
        - { x: 0, y: 25, blur: 50, spread: -12, color: '#00000040' }
    inner:
      inset: true
      layers:
        - { x: 0, y: 2, blur: 4, spread: 0, color: '#0000000F' }

semantic:
  colors:
    # ── text ──
    # NOTE ON CONVENTION: Figma names text roles after the COLOR ROLE they draw from
    # (primary = brand red, secondary = midnight, tertiary = grey), NOT after visual
    # hierarchy. Body copy uses `text.secondary`, not `text.primary`. This is intentional
    # and matches the Frontend implementation. Do not "fix" it to a hierarchy convention.
    text:
      primary:
        default: { light: '{primitive.colors.red.500}' }
        darker:  { light: '{primitive.colors.red.900}' }
      secondary:
        default: { light: '{primitive.colors.midnight.500}' }   # ← body copy default
        darker:  { light: '{primitive.colors.midnight.900}' }
      tertiary:
        default: { light: '{primitive.colors.neutral.500}' }
        darker:  { light: '{primitive.colors.neutral.900}' }
      inverse:     { light: '{primitive.colors.neutral.50}' }
      on-bgcolor:  { light: '{primitive.colors.base.white}' }
      state:
        disable:         { light: '{primitive.colors.neutral.300}' }
        light-gray:      { light: '{primitive.colors.neutral.300}' }
        dark-gray:       { light: '{primitive.colors.neutral.800}' }
        error:           { light: '{primitive.colors.red.500}' }
        error-darker:    { light: '{primitive.colors.red.900}' }
        warning:         { light: '{primitive.colors.yellow.500}' }
        warning-darker:  { light: '{primitive.colors.yellow.900}' }
        success:         { light: '{primitive.colors.green.500}' }
        success-darker:  { light: '{primitive.colors.green.900}' }
        info:            { light: '{primitive.colors.blue.500}' }
        info-darker:     { light: '{primitive.colors.blue.900}' }

    # ── foreground ──
    foreground:
      white:      { light: '{primitive.colors.base.white}' }
      black:      { light: '{primitive.colors.base.black}' }
      primary:    { light: '{primitive.colors.red.500}' }
      light:      { light: '{primitive.colors.neutral.50}' }
      gray-light: { light: '{primitive.colors.neutral.200}' }
      gray-soft-light: { light: '{primitive.colors.neutral.100}' }

    # ── background ──
    background:
      default:         { light: '{primitive.colors.base.white}' }
      soft-light:      { light: '{primitive.colors.neutral.50}' }
      light:           { light: '{primitive.colors.neutral.100}' }
      gray-soft-light: { light: '{primitive.colors.neutral.200}' }
      gray-light:      { light: '{primitive.colors.neutral.300}' }
      gray:            { light: '{primitive.colors.neutral.400}' }
      dark:            { light: '{primitive.colors.neutral.800}' }
      darker:          { light: '{primitive.colors.neutral.900}' }
      super-darker:    { light: '{primitive.colors.base.black}' }
      accent:
        red:              { light: '{primitive.colors.red.500}' }
        red-dark:         { light: '{primitive.colors.red.700}' }
        red-darker:       { light: '{primitive.colors.red.900}' }
        red-light:        { light: '{primitive.colors.red.300}' }
        red-soft-light:   { light: '{primitive.colors.red.50}' }
        yellow:           { light: '{primitive.colors.yellow.500}' }
        yellow-dark:      { light: '{primitive.colors.yellow.700}' }
        yellow-darker:    { light: '{primitive.colors.yellow.900}' }
        yellow-light:     { light: '{primitive.colors.yellow.300}' }
        yellow-soft-light: { light: '{primitive.colors.yellow.50}' }
        green:            { light: '{primitive.colors.green.500}' }
        green-dark:       { light: '{primitive.colors.green.700}' }
        green-darker:     { light: '{primitive.colors.green.900}' }
        green-light:      { light: '{primitive.colors.green.300}' }
        green-soft-light: { light: '{primitive.colors.green.50}' }
        blue:             { light: '{primitive.colors.blue.500}' }
        blue-dark:        { light: '{primitive.colors.blue.700}' }
        blue-darker:      { light: '{primitive.colors.blue.900}' }
        blue-light:       { light: '{primitive.colors.blue.300}' }
        blue-soft-light:  { light: '{primitive.colors.blue.50}' }

    # ── SCALE ROLES ──
    # Every scale role carries the 5 canonical stops (soft-light, light, default, dark, darker)
    # PLUS an `accent` sub-scale (md, lg, xl, disabled). The accent stops are the intermediate
    # palette the COMPONENT tier draws interaction states from — they are named by position,
    # never by state, so states stay in the component tier per the Standard.
    #   ladder: soft-light(50) · light(100) · accent.md(400) · default(500) · accent.lg(600)
    #           · accent.xl(700) · dark(800) · darker(900)
    primary:
      soft-light: { light: '{primitive.colors.red.50}' }
      light:      { light: '{primitive.colors.red.100}' }
      default:    { light: '{primitive.colors.red.500}' }
      dark:       { light: '{primitive.colors.red.800}' }
      darker:     { light: '{primitive.colors.red.900}' }
      accent:
        md:       { light: '{primitive.colors.red.400}' }
        lg:       { light: '{primitive.colors.red.600}' }
        xl:       { light: '{primitive.colors.red.700}' }
        disabled: { light: '{primitive.colors.neutral.100}' }

    secondary:
      soft-light: { light: '{primitive.colors.midnight.50}' }
      light:      { light: '{primitive.colors.midnight.100}' }
      default:    { light: '{primitive.colors.midnight.500}' }
      dark:       { light: '{primitive.colors.midnight.800}' }
      darker:     { light: '{primitive.colors.midnight.950}' }
      accent:
        md:       { light: '{primitive.colors.midnight.400}' }
        lg:       { light: '{primitive.colors.midnight.500}' }
        xl:       { light: '{primitive.colors.midnight.700}' }
        disabled: { light: '{primitive.colors.neutral.100}' }

    tertiary:
      soft-light: { light: '{primitive.colors.neutral.50}' }
      light:      { light: '{primitive.colors.neutral.100}' }
      default:    { light: '{primitive.colors.neutral.500}' }
      dark:       { light: '{primitive.colors.neutral.800}' }
      darker:     { light: '{primitive.colors.neutral.900}' }
      accent:
        xs:       { light: '{primitive.colors.neutral.200}' }
        md:       { light: '{primitive.colors.neutral.400}' }
        lg:       { light: '{primitive.colors.neutral.600}' }
        xl:       { light: '{primitive.colors.neutral.700}' }
        disabled: { light: '{primitive.colors.neutral.100}' }

    status:
      # error deliberately shares the brand red ladder — Thai consumer convention.
      # ALWAYS reference status.error in component code so the two can be split later.
      error:
        soft-light: { light: '{primitive.colors.red.50}' }
        light:      { light: '{primitive.colors.red.100}' }
        default:    { light: '{primitive.colors.red.500}' }
        dark:       { light: '{primitive.colors.red.800}' }
        darker:     { light: '{primitive.colors.red.900}' }
        accent:
          md:       { light: '{primitive.colors.red.400}' }
          lg:       { light: '{primitive.colors.red.600}' }
          xl:       { light: '{primitive.colors.red.700}' }
          disabled: { light: '{primitive.colors.neutral.100}' }
      warning:
        soft-light: { light: '{primitive.colors.yellow.50}' }
        light:      { light: '{primitive.colors.yellow.100}' }
        default:    { light: '{primitive.colors.yellow.500}' }
        dark:       { light: '{primitive.colors.yellow.800}' }
        darker:     { light: '{primitive.colors.yellow.900}' }
        accent:
          md:       { light: '{primitive.colors.yellow.400}' }
          lg:       { light: '{primitive.colors.yellow.600}' }
          xl:       { light: '{primitive.colors.yellow.700}' }
          disabled: { light: '{primitive.colors.neutral.100}' }
      success:
        soft-light: { light: '{primitive.colors.green.50}' }
        light:      { light: '{primitive.colors.green.100}' }
        default:    { light: '{primitive.colors.green.500}' }
        dark:       { light: '{primitive.colors.green.800}' }
        darker:     { light: '{primitive.colors.green.900}' }
        accent:
          md:       { light: '{primitive.colors.green.400}' }
          lg:       { light: '{primitive.colors.green.600}' }
          xl:       { light: '{primitive.colors.green.700}' }
          disabled: { light: '{primitive.colors.neutral.100}' }
      info:
        soft-light: { light: '{primitive.colors.blue.50}' }
        light:      { light: '{primitive.colors.blue.100}' }
        default:    { light: '{primitive.colors.blue.500}' }
        dark:       { light: '{primitive.colors.blue.800}' }
        darker:     { light: '{primitive.colors.blue.900}' }
        accent:
          md:       { light: '{primitive.colors.blue.400}' }
          lg:       { light: '{primitive.colors.blue.600}' }
          xl:       { light: '{primitive.colors.blue.700}' }
          disabled: { light: '{primitive.colors.neutral.100}' }

    # ── border ──
    border:
      primary:          { light: '{primitive.colors.red.500}' }
      primary-darker:   { light: '{primitive.colors.red.900}' }
      secondary:        { light: '{primitive.colors.midnight.500}' }
      secondary-darker: { light: '{primitive.colors.midnight.900}' }
      tertiary:         { light: '{primitive.colors.neutral.500}' }
      tertiary-darker:  { light: '{primitive.colors.neutral.900}' }
      disable:          { light: '{primitive.colors.neutral.300}' }
      on-bgcolor:       { light: '{primitive.colors.base.white}' }
      error:            { light: '{primitive.colors.red.500}' }
      error-darker:     { light: '{primitive.colors.red.900}' }
      warning:          { light: '{primitive.colors.yellow.500}' }
      warning-darker:   { light: '{primitive.colors.yellow.900}' }
      success:          { light: '{primitive.colors.green.500}' }
      success-darker:   { light: '{primitive.colors.green.900}' }
      info:             { light: '{primitive.colors.blue.500}' }
      info-darker:      { light: '{primitive.colors.blue.900}' }
      accent:
        light:            { light: '{primitive.colors.neutral.100}' }
        gray-soft-light:  { light: '{primitive.colors.neutral.200}' }
        gray-light:       { light: '{primitive.colors.neutral.300}' }
        gray:             { light: '{primitive.colors.neutral.400}' }
        dark:             { light: '{primitive.colors.neutral.800}' }
        darker:           { light: '{primitive.colors.neutral.900}' }
        super-darker:     { light: '{primitive.colors.base.black}' }
        red:              { light: '{primitive.colors.red.500}' }
        red-dark:         { light: '{primitive.colors.red.700}' }
        red-darker:       { light: '{primitive.colors.red.900}' }
        red-light:        { light: '{primitive.colors.red.300}' }
        red-soft-light:   { light: '{primitive.colors.red.50}' }
        yellow:           { light: '{primitive.colors.yellow.500}' }
        yellow-dark:      { light: '{primitive.colors.yellow.700}' }
        yellow-darker:    { light: '{primitive.colors.yellow.900}' }
        yellow-light:     { light: '{primitive.colors.yellow.300}' }
        yellow-soft-light: { light: '{primitive.colors.yellow.50}' }
        green:            { light: '{primitive.colors.green.500}' }
        green-dark:       { light: '{primitive.colors.green.700}' }
        green-darker:     { light: '{primitive.colors.green.900}' }
        green-light:      { light: '{primitive.colors.green.300}' }
        green-soft-light: { light: '{primitive.colors.green.50}' }
        blue:             { light: '{primitive.colors.blue.500}' }
        blue-dark:        { light: '{primitive.colors.blue.700}' }
        blue-darker:      { light: '{primitive.colors.blue.900}' }
        blue-light:       { light: '{primitive.colors.blue.300}' }
        blue-soft-light:  { light: '{primitive.colors.blue.50}' }

    # ── divider ──
    divider:
      primary:    { light: '{primitive.colors.red.500}' }
      dark-gray:  { light: '{primitive.colors.neutral.800}' }
      gray:       { light: '{primitive.colors.neutral.500}' }
      light-gray: { light: '{primitive.colors.neutral.300}' }
      inverse:    { light: '{primitive.colors.neutral.50}' }

    # ── overlay ──
    overlay:
      default: { light: '{primitive.colors.base.black-60}' }
      inverse: { light: '{primitive.colors.base.white-60}' }
      heavy:   { light: '{primitive.colors.base.black-80}' }

  # ── typography roles ──
  # Composition: { family, size, line-height, weight, tracking }.
  # `size` / `line-height` refs are RESPONSIVE primitives ({ mobile, desktop }) — the
  # responsive split resolves at build time, so roles need no `responsive:` block.
  # Weight variants are separate leaves (Figma models them as distinct text styles).
  typography:
    display:
      5xl:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.5xl}', line-height: '{primitive.typography.line-height.5xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
      4xl:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.4xl}', line-height: '{primitive.typography.line-height.4xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
      3xl:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.3xl}', line-height: '{primitive.typography.line-height.3xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
      2xl:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.2xl}', line-height: '{primitive.typography.line-height.2xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
      xl:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.xl}', line-height: '{primitive.typography.line-height.xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
      lg:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.lg}', line-height: '{primitive.typography.line-height.lg}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
    heading:
      h1:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.3xl}', line-height: '{primitive.typography.line-height.3xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
      h2:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.2xl}', line-height: '{primitive.typography.line-height.2xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
      h3:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.xl}', line-height: '{primitive.typography.line-height.xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.xl}', line-height: '{primitive.typography.line-height.xl}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
      h4:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.lg}', line-height: '{primitive.typography.line-height.lg}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.lg}', line-height: '{primitive.typography.line-height.lg}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
    title:
      lg:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.lg}', line-height: '{primitive.typography.line-height.lg}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
      md:
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
    sub-title:
      lg:
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
      md:
        regular:  { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.sm}', line-height: '{primitive.typography.line-height.sm}', weight: '{primitive.typography.weight.regular}', tracking: '{primitive.typography.tracking.normal}' }
    body:
      xl:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.xl}', line-height: '{primitive.typography.line-height.xl}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.xl}', line-height: '{primitive.typography.line-height.xl}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
        regular:  { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.xl}', line-height: '{primitive.typography.line-height.xl}', weight: '{primitive.typography.weight.regular}', tracking: '{primitive.typography.tracking.normal}' }
      lg:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.lg}', line-height: '{primitive.typography.line-height.lg}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.lg}', line-height: '{primitive.typography.line-height.lg}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
        regular:  { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.lg}', line-height: '{primitive.typography.line-height.lg}', weight: '{primitive.typography.weight.regular}', tracking: '{primitive.typography.tracking.normal}' }
      md:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
        regular:  { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.regular}', tracking: '{primitive.typography.tracking.normal}' }
    button:
      md:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
      xs:
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.xs}', line-height: '{primitive.typography.line-height.sm}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
    label:
      md:
        semibold: { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.sm}', line-height: '{primitive.typography.line-height.sm}', weight: '{primitive.typography.weight.semibold}', tracking: '{primitive.typography.tracking.normal}' }
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.sm}', line-height: '{primitive.typography.line-height.sm}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}' }
        regular:  { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.sm}', line-height: '{primitive.typography.line-height.sm}', weight: '{primitive.typography.weight.regular}', tracking: '{primitive.typography.tracking.normal}' }
    caption:
      lg:
        regular:  { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.sm}', line-height: '{primitive.typography.line-height.sm}', weight: '{primitive.typography.weight.regular}', tracking: '{primitive.typography.tracking.normal}' }
      md:
        regular:  { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.xs}', line-height: '{primitive.typography.line-height.xs}', weight: '{primitive.typography.weight.regular}', tracking: '{primitive.typography.tracking.normal}' }
    underline:
      md:
        medium:   { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.medium}', tracking: '{primitive.typography.tracking.normal}', text-decoration: underline }
        regular:  { family: '{primitive.typography.family.sans}', size: '{primitive.typography.size.md}', line-height: '{primitive.typography.line-height.md}', weight: '{primitive.typography.weight.regular}', tracking: '{primitive.typography.tracking.normal}', text-decoration: underline }

  # ── spacing (t-shirt) ──
  # DEPRECATED: `2lg` (10px) — a Figma-legacy half-step between lg(8) and xl(12) with no
  # canonical t-shirt name. Decision 2026-08-17: retire it. It stays here until Figma drops
  # it, because removing it from design.md alone would make Storybook disagree with Figma —
  # exactly the drift this pipeline exists to remove. Retirement order:
  #   1. designer picks the replacement for Dropdown's 10px padding (8 or 12) — changes field height
  #   2. remove spacing-2lg in Figma
  #   3. re-pull, drop this line, migrate Dropdown
  # Known consumers: ui/components/Dropdown (field paddingTop/Bottom, list gap).
  spacing:
    none: '{primitive.spacing.0}'
    xs:   '{primitive.spacing.2}'
    sm:   '{primitive.spacing.4}'
    md:   '{primitive.spacing.6}'
    lg:   '{primitive.spacing.8}'
    2lg:  '{primitive.spacing.10}'   # DEPRECATED — see note above
    xl:   '{primitive.spacing.12}'
    2xl:  '{primitive.spacing.16}'
    3xl:  '{primitive.spacing.20}'
    4xl:  '{primitive.spacing.24}'
    5xl:  '{primitive.spacing.32}'
    6xl:  '{primitive.spacing.40}'
    7xl:  '{primitive.spacing.48}'
    8xl:  '{primitive.spacing.56}'
    9xl:  '{primitive.spacing.64}'
    10xl: '{primitive.spacing.72}'
    11xl: '{primitive.spacing.80}'

  # ── radius (t-shirt) ──
  radius:
    none: '{primitive.radius.0}'
    xs:   '{primitive.radius.2}'
    sm:   '{primitive.radius.4}'
    md:   '{primitive.radius.6}'
    lg:   '{primitive.radius.8}'    # DEFAULT for interactive surfaces
    xl:   '{primitive.radius.12}'
    2xl:  '{primitive.radius.16}'
    3xl:  '{primitive.radius.20}'
    4xl:  '{primitive.radius.24}'
    5xl:  '{primitive.radius.32}'
    6xl:  '{primitive.radius.40}'
    7xl:  '{primitive.radius.48}'
    8xl:  '{primitive.radius.56}'
    9xl:  '{primitive.radius.64}'
    10xl: '{primitive.radius.72}'
    full: '{primitive.radius.9999}'

  # ── border-width (t-shirt) ──
  # Figma exposes these numerically at the semantic tier (dimension/border-width/N),
  # which violates the Standard's "semantic = t-shirt" rule. Named here per Standard;
  # the Figma rename is queued in ./figma-rename-map.md.
  border-width:
    none:     '{primitive.border-width.0}'
    hairline: '{primitive.border-width.1}'
    thin:     '{primitive.border-width.2}'
    thick:    '{primitive.border-width.4}'
    heavy:    '{primitive.border-width.6}'
    2xl:      '{primitive.border-width.8}'
    3xl:      '{primitive.border-width.10}'
    4xl:      '{primitive.border-width.12}'
    5xl:      '{primitive.border-width.14}'
    6xl:      '{primitive.border-width.16}'

  # ── blur (t-shirt) — Figma already Standard-compliant ──
  blur:
    none: '{primitive.blur.0}'
    xs:   '{primitive.blur.4}'
    sm:   '{primitive.blur.8}'
    md:   '{primitive.blur.12}'
    lg:   '{primitive.blur.16}'
    xl:   '{primitive.blur.24}'
    2xl:  '{primitive.blur.40}'
    3xl:  '{primitive.blur.64}'

  # ── opacity ──
  # Figma carries all 21 numeric stops at the semantic tier (`dimension/opacity/N`), which
  # breaks the Standard's "semantic names by intent, not by number" rule and gives a
  # component no way to say *why* something is 50%. Only three stops are used in practice,
  # so they are named for the job they do. The numeric ladder stays available at the
  # primitive tier. Queued for the Figma rename (see figma-rename-map.md).
  opacity:
    disabled: '{primitive.opacity.50}'   # ToggleSwitch, LottoBoard — non-interactive
    muted:    '{primitive.opacity.40}'   # LottoBoard — reached its selection limit
    subtle:   '{primitive.opacity.25}'   # Loading — spinner track behind the arc
    full:     '{primitive.opacity.100}'
    none:     '{primitive.opacity.0}'

  # ── elevation (named depth → shadow primitive) ──
  elevation:
    none:     '{primitive.shadow.none}'
    flat:     '{primitive.shadow.2xs}'
    raised:   '{primitive.shadow.xs}'
    card:     '{primitive.shadow.sm}'
    floating: '{primitive.shadow.md}'   # dropdown
    popover:  '{primitive.shadow.lg}'   # toast / popover
    modal:    '{primitive.shadow.xl}'
    hero:     '{primitive.shadow.2xl}'
    inner:    '{primitive.shadow.inner}'

  # ── breakpoints (t-shirt, mobile-first) ──
  # Figma names these device-first (mobile-321 … desktop-1920). Renamed to the Standard
  # t-shirt scale here. NOTE: 8 tiers vs the Standard's 7 — `3xl` is a deviation, see Known Gaps.
  breakpoints:
    2xs: '{primitive.breakpoints.321}'
    xs:  '{primitive.breakpoints.361}'
    sm:  '{primitive.breakpoints.390}'
    md:  '{primitive.breakpoints.768}'
    lg:  '{primitive.breakpoints.1024}'
    xl:  '{primitive.breakpoints.1280}'
    2xl: '{primitive.breakpoints.1440}'
    3xl: '{primitive.breakpoints.1920}'

  iconography:
    style: 'tbd'          # populated by design-icon-builder
    stroke-width: 'tbd'
    grid: 24
    sizes:
      sm: 'tbd'
      md: 'tbd'
      lg: 'tbd'

mood:
  primary: 'bold-tech'
  secondary: ['friendly-warm']
  reference:
    - 'Figma — Design Systems Web App Lotteryplus V.7.1 (inmmHQID7awAWFcEJzedZa)'
    - 'Lark Wiki — Structure - Design system (7 Solutions Team)'
    - './docs/decisions/0001-phase0-token-source-of-truth.md'
---

# Lotteryplus Design System — Tokens

## Overview

**Mood & Tone.** Lotteryplus is `bold-tech` — a transactional consumer product where people commit money against a clock (24-hour reservation holds, fixed draw schedules). The brand red does the heavy lifting; a custom near-black `midnight` ladder is the counterpoint that keeps everything else quiet. Not playful, not editorial. The product should read as **confident convenience**: at any moment it is obvious what the primary action is.

**Reference provenance.** Every value in the frontmatter was pulled live from Figma `Design Systems Web App Lotteryplus V.7.1` on 2026-08-17 via the figma-console MCP bridge — four collections (`.1-primitive` 489 vars, `typography` 170 vars across mobile/desktop/Tablet modes, `2-semantic` 394 vars, `3-component` 268 vars). Naming follows the 7 Solutions Standard on Lark Wiki. Where the two disagree, the Standard name is used here and the Figma-side rename is queued in [figma-rename-map.md](figma-rename-map.md).

**Design dials:** VARIANCE 4 · MOTION 3 · DENSITY 6   [derived from: transactional lottery UX — consistency outranks variance, restrained motion builds trust, moderate density for number-dense surfaces like LottoBoard]

## Mood & Tone

| Decision | Choice | Why |
|---|---|---|
| Radius default | `{semantic.radius.lg}` (8px) | consumer-friendly, never sharp on interactive surfaces |
| Elevation | `{semantic.elevation.card}` for surfaces; `modal`/`popover` for floating only | flat surface layering preferred over shadow stacking |
| Border-width | `{semantic.border-width.hairline}` (1px) default | minimal visual weight |
| Spacing density | `{semantic.spacing.lg}` (8px) default gap | number-dense surfaces need tight rhythm |
| Brand hue | custom `red.500` = `#E32321` | LOCKED — Lotteryplus signature, non-negotiable |
| Neutral counterpoint | custom `midnight` ladder | true neutral reads cold next to the brand red |
| Weight ceiling | `semibold` (600) | `bold` is shouty on Thai script |
| Line-height | 1.4–1.6× throughout | Thai vowels sit above and below the baseline |

## Primitives

Raw values, no meaning attached. Numeric stops per the Standard.

### Colors
Six hues are mirrored from Figma because six are what the semantic layer actually references:

| Hue | Source | Note |
|---|---|---|
| `base` | Figma `colors/base/*` | includes alpha stops (`black-60`, `black-80`, `white-60`) used by overlays |
| `midnight` | **custom** | 11-stop near-black ladder. Not Tailwind. Backs every `secondary.*` role |
| `red` | Tailwind + **2 brand overrides** | `500` = `#E32321`, `100` = `#FFE2E2`. All other stops Tailwind v3.4 verbatim |
| `neutral` | Tailwind v3.4 | greys, disabled states, dividers |
| `yellow` | Tailwind v3.4 | warning channel |
| `green` | Tailwind v3.4 | success channel |
| `blue` | Tailwind v3.4 | info channel |

### Typography
`size` and `line-height` are **responsive primitives** — each stop carries a `{ mobile, desktop }` pair, mirroring Figma's three-mode typography collection (Tablet resolves identically to desktop). This is why semantic typography roles carry no `responsive:` block: the responsiveness already lives one tier down.

Ten stops (`2xs` → `5xl`), seven weights, one family (`Graphik TH`).

### Numeric scales
`spacing` 0–80 · `radius` 0–72 + `9999` · `border-width` 0–16 · `blur` 0–64 · `opacity` 0–100 (step 5) · `breakpoints` 321–1920.

### Shadows
Decomposed into `x / y / blur / spread / color`. Figma models two-layer shadows through `-2` suffixed sub-tokens; those are preserved here as a `layers[]` array so `sm`, `md`, `lg`, and `xl` keep both layers intact.

## Semantic Tokens

Role names, t-shirt scales, every value a `{primitive.*}` ref. Light mode only — dark mode is not defined in Figma (see Known Gaps).

### The 5-stop + accent pattern

Every scale role (`primary`, `secondary`, `tertiary`, `status.*`) carries the five canonical stops plus an `accent` sub-scale. Reading the primary ladder left to right by lightness:

```
soft-light(50) → light(100) → accent.md(400) → default(500) → accent.lg(600) → accent.xl(700) → dark(800) → darker(900)
```

The `accent` stops exist so the **component tier** has somewhere to draw interaction states from without inventing values. They are named by position on the ladder, never by state, which keeps states in the component tier where the Standard puts them. For example the Button's primary variant maps `hover → accent.xl`, `focus → accent.lg`, `active → darker` — all in `components.json`, none of it here.

### A convention worth knowing before you use `text.*`

Figma names text roles after the **colour role** they draw from, not after visual hierarchy:

| Role | Resolves to | Used for |
|---|---|---|
| `{semantic.colors.text.primary.default}` | `red.500` `#E32321` | brand-coloured text, emphasis, links to primary actions |
| `{semantic.colors.text.secondary.default}` | `midnight.500` `#262626` | **body copy — this is the default reading colour** |
| `{semantic.colors.text.tertiary.default}` | `neutral.500` `#737373` | supporting text, metadata |

Body text is `text.secondary`, not `text.primary`. The Frontend implementation already follows this. Do not "correct" it to a hierarchy-based convention — it would silently repaint every screen.

### Role inventory

| Group | Stops |
|---|---|
| `text` | `primary` / `secondary` / `tertiary` × {default, darker} · `inverse` · `on-bgcolor` · `state.*` (disable, light-gray, dark-gray, error, warning, success, info + darker) |
| `foreground` | white, black, primary, light, gray-light, gray-soft-light |
| `background` | default, soft-light, light, gray-soft-light, gray-light, gray, dark, darker, super-darker + `accent.*` (red/yellow/green/blue × 5 tints) |
| `primary` `secondary` `tertiary` | soft-light, light, default, dark, darker + `accent.{md, lg, xl, disabled}` (tertiary also has `accent.xs`) |
| `status` | error / warning / success / info, each the full 5-stop + accent set |
| `border` | role variants + darker, disable, on-bgcolor, status set, + `accent.*` (28 stops) |
| `divider` | primary, dark-gray, gray, light-gray, inverse |
| `overlay` | default (black 60%), inverse (white 60%), heavy (black 80%) |

### Typography roles

Nine families of role — `display`, `heading`, `title`, `sub-title`, `body`, `button`, `label`, `caption`, `underline` — each sized on the t-shirt scale, with weight as the leaf. So a role path reads `{semantic.typography.body.md.regular}`: family, then size, then weight.

Thirty-five roles total, matching Figma's 36 text styles one-to-one (`label/m-reg-strike` is a decoration variant folded into `label.md.regular`).

### Reading a token

```
{semantic.colors.primary.default} → {primitive.colors.red.500} → #E32321 → "primary CTA, brand surfaces, active states"
{semantic.colors.text.secondary.default} → {primitive.colors.midnight.500} → #262626 → "body copy"
{semantic.radius.lg} → {primitive.radius.8} → 8px → "buttons, text fields, cards (default)"
{semantic.spacing.2xl} → {primitive.spacing.16} → 16px → "component internal padding"
```

## Layout

Grid definitions come from Figma's `grid/*` primitives, one set per breakpoint:

| Breakpoint | Columns | Margin | Gutter |
|---|---|---|---|
| `sm` (390px) | 4 | 16px | 16px |
| `md` (768px) | 6 | 32px | 32px |
| `3xl` (1920px) | 12 | 352px | 32px |

Row grids: 32px and 56px bands at 390px; 96px at 768px and 1920px.

## Do's and Don'ts

### Do
- Reference `{semantic.*}` in components — never reach past it into `{primitive.*}`.
- Use `text.secondary` for body copy (see the convention note above).
- Draw interaction states from the `accent` sub-scale, and declare them in `components.json`, not here.
- Keep `status.error` in code even though it resolves to the brand red — a future split becomes a one-line change.
- Test at `2xs` (321px); a meaningful share of Thai users are on older, narrower devices.
- Pair colour with text or icon — colour alone never carries state.
- Keep line-height as specified; Thai script breaks visually below 1.4×.
- Respect the 44px touch-target floor from `{primitive.a11y.touch-target-min-px}`.

### Don't
- Don't put `#E32321` on white for body text under 14px — it clears AA (4.6:1) but fails AAA. Large CTAs and brand surfaces only.
- Don't substitute pure `#000000` for `secondary.default` — the `midnight` ladder exists precisely because true black clashes beside the brand red.
- Don't stack two primary buttons. LottoBoard cells are the one sanctioned exception, because each cell is an independent action.
- Don't use `weight.bold` (700) or above — `semibold` is the ceiling for Thai.
- Don't add tokens ad-hoc; propose in the MR, get DS-owner review, land in this file first.
- Don't write Tailwind arbitrary values (`text-[#E32321]`) — that defeats the entire chain.
- Don't mix surface-based and shadow-based elevation in one screen; pick one.
- Don't introduce a new hue by copying a hex — adopt it from Figma's primitive collection so the two stay aligned.

## Responsive Behavior

Mobile-first. Base styles target `sm` (390px) and scale up.

- **Typography** resolves per mode at the primitive tier — `mobile` below `md`, `desktop` at `md` and above. Tablet is identical to desktop by design.
- **Grid** steps 4 → 6 → 12 columns across `sm` → `md` → `3xl`.
- **Modals** are full-screen sheets below `md`, centred dialogs at `md` and above.
- **LottoBoard** shows 5 columns below `sm`, 10 columns at `sm` and above.
- **Touch targets** hold at ≥ 44px on every tier.

## Iteration Guide

- **New token** → add to Figma first, re-pull, update this file, regenerate `tokens.css`. Never hand-edit a value here; this file mirrors Figma and hand-edits reintroduce exactly the drift this system exists to remove.
- **New hue** → adopt from Figma's primitive collection (16 unreferenced Tailwind hues are already there) and mirror the full 11-stop ladder.
- **Components** → `design-component-builder` emits `components.json`.
- **Icons** → `design-icon-builder` fills the `iconography` block and downloads SVGs.
- **Pages / patterns** → `design-ui-builder` emits `ui.json` + `patterns.json`.
- **Versioning** — `version` tracks the Figma file version (currently 7.1.0). Major on token rename, minor on additions, patch on value corrections.

## Known Gaps

- **Dark mode is undefined.** Figma has a single mode (`LP-light-mode`) across every colour collection. All semantic leaves carry `light` only. Adding dark means adding a Figma mode first.
- **`semantic.spacing.2lg` (10px) is deprecated** (decided 2026-08-17). It survives in this file only until Figma drops it; removing it here first would put Storybook out of step with Figma. Dropdown is the one consumer and its field height changes on migration, so a designer picks 8 or 12 before the Figma edit lands. Separately, the Frontend has a `radius.2lg` of 10px in `tailwind.config.js` that has no counterpart in Figma's radius ladder at all — that one is pure FE invention and retires during Phase 5.
- **Standard deviations carried forward for value fidelity**, queued for the Phase 2 Figma rename:
  - `semantic.spacing` and `semantic.radius` extend to `10xl`/`11xl`; the Standard's documented ladder stops at `9xl`.
  - `semantic.border-width` is numeric in Figma at the semantic tier; renamed to t-shirt here.
  - `semantic.opacity` is 21 numeric stops in Figma (`dimension/opacity/N`). This file exposes the three that are actually used, named for the job they do (`disabled`, `muted`, `subtle`) plus `full`/`none`, because `opacity.50` tells a reader nothing about why. The numeric ladder stays at the primitive tier.

### Two things that read like gaps but are not

- **Icon colour has no semantic role, and does not need one.** Figma models it at the component tier (`colors/icon/*`), which is right — Icon is a component. Other components reach for `semantic.colors.foreground.*` instead; Breadcrumb does exactly this. What would be wrong is a component referencing `--icon-*`, since refs flow downward only.
- **Fixed component dimensions have no `sizing` scale, and should not.** A 53×64 lottery cell, a 51×31 toggle track and a 40px progress circle are frame sizes belonging to one component each, not shared design decisions. They live in that component's overlay. Material and Carbon draw the same line.
- **Breakpoints keep 8 tiers** (`2xs`→`3xl`, decided 2026-08-17) rather than the Standard's 7. Figma carries both 1440 and 1920 and both are in use, so the ladder grows a `3xl` tier instead of retiring a real breakpoint.
- **Figma naming defects found during the pull** (all in [figma-rename-map.md](figma-rename-map.md)): `colors/text/tertiary-defualt` (typo), `colors/border/onbgcolor` (missing kebab), `colors/fuschia/*` (Tailwind spells it `fuchsia`), `weight/Semibold` (PascalCase), `size/s|m|l` (should be `sm`/`md`/`lg`), and the entire component tier's `btn-bg-*`/`btn-fg-*` abbreviations plus `default`/`focused`/`pressed` state names.
- **`writing/*` variables are not design tokens.** Figma stores ~19 Thai copy strings as variables (`writing/home/ค้นหา` etc.) in both the primitive and semantic collections. They are excluded from this file; microcopy belongs in an i18n layer.
- **`grid/*` is documented prose here, not tokenised.** Figma's grid variables are Figma-layout-guide metadata, not values a stylesheet consumes.
- **Contrast: `#E32321` on white is 4.6:1.** Passes AA body, fails AAA. Accepted — brand recognition is non-negotiable — but it constrains the brand red to large text and CTAs.
- **`Graphik TH` is proprietary.** Self-hosted webfont licence required; no CDN fallback is configured.
- **No `motion` group anywhere, at any tier.** Loading, ToggleSwitch, Dropdown and Button all hold transition timings as bare strings because there is nothing to point at. Four durations are in real use (`0.1s`, `0.15s`, `0.2s`, `1s`) and three easings (`ease`, `ease-in-out`, `linear`) — a small, well-bounded set. Adding it means authoring the variables in Figma *and* extending the Lark Standard, which does not cover motion at all.
- **`iconography.sizes` are still `'tbd'`.** Nine components bind an icon size in Figma and none can reference a token for it. Running `design-icon-builder` closes this.
- **No typography role uses `weight.bold` (700).** LottoBoard's number display is 24/32/700 in Figma and has no role that matches — the weight ceiling documented above is `semibold`, so the display number is the one place the rule is broken in practice.
- **Gradients cannot be tokenised as variables.** Figma has a `colors/gradient/*` group but all four entries resolve to null: a Figma COLOR variable holds a solid fill only, so a gradient has nowhere to live. NavigationBar's add-to-cart button paints a raw `#F85C2A → #D80F0D` linear gradient bound to nothing, and no primitive hue is close to `#F85C2A`. The way out is a Figma **Paint Style** (which does support gradients) pulled through the styles API, rather than a variable.
- **`elevation.modal` has no consumer.** Verified 2026-08-17: every Figma modal variant binds `shadow/md`, which this file names `elevation.floating`. Either Figma's modal moves up to `shadow/xl` or the role mapping changes — a naming decision, not a pixel one.
- **Component and page tiers are partly built.** Figma's `3-component` collection has 268 variables across 25 groups. Thirteen have a Storybook component; the rest (`carts`, `orders`, `home`, `profile`, `lottery`, `top-and-footer`, `jidrit-lucky`, `bottom sheet`, `card`, `checkbox`) are app surfaces with tokens but no library component. Tooltip is the reverse: a library component with no Figma group.

## Agent Prompt Guide

1. **"Build the booking confirmation page from design.md"**
   → `{semantic.colors.primary.default}` for the confirm CTA, `{semantic.colors.status.success.soft-light}` for the success banner, `{semantic.typography.heading.h2.semibold}` for the title, `{semantic.spacing.4xl}` for card padding.

2. **"Build LottoBoard — 5 columns below sm, 10 at sm and up"**
   → `{semantic.spacing.sm}` cell gap, `{semantic.radius.sm}` corners, `{semantic.colors.primary.default}` when selected with `{semantic.colors.text.on-bgcolor}` on top.

3. **"Build the reservation countdown for the 24-hour hold"**
   → `{semantic.typography.heading.h3.semibold}` for the time, `{semantic.colors.status.warning.default}` under two hours, `{semantic.colors.status.error.default}` under thirty minutes.

4. **"Style the Admin QR-generation panel"**
   → input on `{semantic.colors.background.default}` with `{semantic.colors.border.tertiary}`, primary button for generate, `{semantic.colors.text.state.disable}` for expired orders.

5. **"Build the cancellation confirmation modal"**
   → `{semantic.colors.overlay.default}` backdrop, `{semantic.elevation.modal}`, `{semantic.radius.2xl}` corners, `{semantic.colors.status.error.default}` for confirm and `{semantic.colors.secondary.default}` for keep-booking.
