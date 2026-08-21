// ═══════════════════════════════════════════
// LottoBoard Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md
// (colours) and design-library/lotteryplus/components/lotto-board.json (layout, sizing
// and typography), and is generated into foundations/tokens.css (CSS custom properties)
// and foundations/tokens.generated.ts (resolved literals).
//
// What this file adds is types and lookup helpers, so the four sub-components render
// with CSS variables while stories and tests can still read the literal a token
// resolves to.
//
// Sub-components and their token namespaces:
//   NumberSearchBox  cell-* / row-*
//   MenuButton       menu-*
//   SetSelect        set-*
//   SearchCard       card-*
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import type { CSSProperties } from 'react';
import { component } from '../../foundations/tokens';

const t = component('lotto-board');

/** `var(--lotto-board-<token>)` — what the components render with. */
export const lottoBoardRef = (token: string, fallback?: string): string => t.ref(token, fallback);

/** The literal a LottoBoard token resolves to. Empty string when it is not declared. */
export const lottoBoardValue = (token: string): string => t.value(token);

/** Every token declared for this component — what the token-chain story enumerates. */
export const lottoBoardTokenNames = (): string[] => t.names();

// ─────────────────────────────────────────
//  Canonical vocabulary
// ─────────────────────────────────────────

/** Canonical states, per the Design System Standard, plus `selected` for the cells. */
export type LottoBoardState =
  | 'rest'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled'
  | 'selected';

export const LOTTO_BOARD_STATES: readonly LottoBoardState[] = [
  'rest',
  'hover',
  'active',
  'focus',
  'disabled',
  'selected',
] as const;

/**
 * SetSelect's state set. Figma still labels these Default / Active / Actived — that
 * rename is queued in figma-rename-map.md; the canonical names are used here.
 */
export type SetSelectState = Extract<LottoBoardState, 'rest' | 'active' | 'selected'>;

export const SET_SELECT_STATES: readonly SetSelectState[] = ['rest', 'active', 'selected'] as const;

/** Figma variant of number-search-box-2 — which cells read as selected. */
export type NumberSearchBoxVariant = 'Empty' | '6' | 'Front 3' | 'Back 3' | 'Back 2' | '1';

export const NUMBER_SEARCH_BOX_VARIANTS: readonly NumberSearchBoxVariant[] = [
  'Empty',
  '6',
  'Front 3',
  'Back 3',
  'Back 2',
  '1',
] as const;

/** Figma "Type" variant, shared by menu-button and search-card. */
export type MenuButtonType = 'All' | 'Single' | 'Set';
export type SearchCardType = MenuButtonType;

export const MENU_BUTTON_TYPES: readonly MenuButtonType[] = ['All', 'Single', 'Set'] as const;

/** Which cells a Figma variant shows as selected. */
export const NUMBER_BOX_VARIANT_MAP: Record<NumberSearchBoxVariant, boolean[]> = {
  Empty: [false, false, false, false, false, false],
  '6': [true, true, true, true, true, true],
  'Front 3': [true, true, true, false, false, false],
  'Back 3': [false, false, false, true, true, true],
  'Back 2': [false, false, false, false, true, true],
  '1': [false, false, false, false, false, true],
};

/** Menu button labels (Thai) — content, not style. */
export const MENU_BUTTON_LABELS: Record<MenuButtonType, string> = {
  All: 'ทั้งหมด',
  Single: 'หวยเดี่ยว',
  Set: 'หวยชุด',
};

// ─────────────────────────────────────────
//  Colours — Tier 2 aliases into colors/lotto-board
// ─────────────────────────────────────────

export const LOTTO_BOARD_COLORS = {
  backgroundWhite: t.ref('background-white'),
  backgroundRed: t.ref('background-red'),
  backgroundDark: t.ref('background-dark'),
  backgroundGray: t.ref('background-gray'),
  backgroundSoftGray: t.ref('background-soft-gray'),
  backgroundDarkGray: t.ref('background-dark-gray'),
  foregroundWhite: t.ref('foreground-white'),
  foregroundDark: t.ref('foreground-dark'),
  foregroundRed: t.ref('foreground-red'),
  foregroundGray: t.ref('foreground-gray'),
  foregroundDarkGray: t.ref('foreground-dark-gray'),
  foregroundDisable: t.ref('foreground-disable'),
  border: t.ref('border'),
} as const;

/** The same palette resolved to literals — for stories, tables and tests. */
export const LOTTO_BOARD_COLOR_VALUES: Record<keyof typeof LOTTO_BOARD_COLORS, string> = {
  backgroundWhite: t.value('background-white'),
  backgroundRed: t.value('background-red'),
  backgroundDark: t.value('background-dark'),
  backgroundGray: t.value('background-gray'),
  backgroundSoftGray: t.value('background-soft-gray'),
  backgroundDarkGray: t.value('background-dark-gray'),
  foregroundWhite: t.value('foreground-white'),
  foregroundDark: t.value('foreground-dark'),
  foregroundRed: t.value('foreground-red'),
  foregroundGray: t.value('foreground-gray'),
  foregroundDarkGray: t.value('foreground-dark-gray'),
  foregroundDisable: t.value('foreground-disable'),
  border: t.value('border'),
};

// ─────────────────────────────────────────
//  Typography roles
// ─────────────────────────────────────────

/**
 * Text roles this component family renders.
 *
 * `number` is the only one whose size / line-height / weight are not backed by a
 * semantic role — 24px/32px Bold has no equivalent in design.md. See the `_source`
 * note in components/lotto-board.json.
 */
export type LottoBoardTextRole = 'title' | 'menu' | 'link' | 'caption' | 'number';

export const LOTTO_BOARD_TEXT_ROLES: readonly LottoBoardTextRole[] = [
  'title',
  'menu',
  'link',
  'caption',
  'number',
] as const;

/** CSS variable references for one text role — spread straight into a style object. */
export const lottoBoardText = (role: LottoBoardTextRole): CSSProperties => ({
  fontFamily: t.ref(`typography-${role}-family`),
  fontSize: t.ref(`typography-${role}-size`),
  fontWeight: t.ref(`typography-${role}-weight`) as CSSProperties['fontWeight'],
  lineHeight: t.ref(`typography-${role}-line-height`),
  letterSpacing: t.ref(`typography-${role}-tracking`),
});

/** Resolved literals for one text role — for stories and tests. */
export const lottoBoardTextValues = (role: LottoBoardTextRole) => ({
  family: t.value(`typography-${role}-family`),
  size: t.value(`typography-${role}-size`),
  weight: t.value(`typography-${role}-weight`),
  lineHeight: t.value(`typography-${role}-line-height`),
  tracking: t.value(`typography-${role}-tracking`),
});

/** The shared type family — every role resolves to the same one. */
export const FONT_FAMILY = t.ref('typography-title-family');

// ─────────────────────────────────────────
//  Layout, sizing and opacity
// ─────────────────────────────────────────

/** NumberSearchBox — the row of digit cells. */
export const NUMBER_BOX = {
  gap: t.ref('cell-gap'),
  padding: t.ref('cell-padding'),
  radius: t.ref('cell-radius'),
  borderWidth: t.ref('cell-border-width'),
  shadow: t.ref('cell-shadow'),
  width: t.ref('cell-width'),
  height: t.ref('cell-height'),
  rowPaddingX: t.ref('row-padding-x'),
} as const;

/** MenuButton — the three type filters. */
export const MENU_BUTTON = {
  gap: t.ref('menu-gap'),
  paddingX: t.ref('menu-padding-x'),
  itemPaddingX: t.ref('menu-item-padding-x'),
  itemRadius: t.ref('menu-item-radius'),
  itemBorderWidth: t.ref('menu-item-border-width'),
  itemWidth: t.ref('menu-item-width'),
  itemHeight: t.ref('menu-item-height'),
} as const;

/** SetSelect — label, thumbnail and stepper. */
export const SET_SELECT = {
  gap: t.ref('set-gap'),
  paddingX: t.ref('set-padding-x'),
  rowGap: t.ref('set-row-gap'),
  imageRadius: t.ref('set-image-radius'),
  imageWidth: t.ref('set-image-width'),
  imageHeight: t.ref('set-image-height'),
  stepperRadius: t.ref('set-stepper-radius'),
  stepperPadding: t.ref('set-stepper-padding'),
  stepperBorderWidth: t.ref('set-stepper-border-width'),
  stepperSize: t.ref('set-stepper-size'),
  quantityPaddingX: t.ref('set-quantity-padding-x'),
  quantityMinWidth: t.ref('set-quantity-min-width'),
} as const;

/** SearchCard — the composite shell. */
export const SEARCH_CARD = {
  gap: t.ref('card-gap'),
  paddingX: t.ref('card-padding-x'),
  headerGap: t.ref('card-header-gap'),
  randomizeWidth: t.ref('randomize-width'),
  randomizeHeight: t.ref('randomize-height'),
  randomizeRadius: t.ref('randomize-radius'),
  randomizeGradient: t.ref('randomize-gradient'),
  randomizeForeground: t.ref('randomize-foreground'),
  randomizeGap: t.ref('randomize-gap'),
  searchHeight: t.ref('search-height'),
  opacityDisabled: t.ref('opacity-disabled'),
  actionsGap: t.ref('card-actions-gap'),
  maxWidth: t.ref('card-max-width'),
} as const;

/** Opacity treatments. Neither has a semantic role — see components/lotto-board.json. */
export const OPACITY = {
  disabled: t.ref('opacity-disabled'),
  limitReached: t.ref('opacity-limit-reached'),
} as const;

/**
 * Icon size stays numeric — it is a component prop on `<Icon size>`, not a style.
 * Mirrors how Button reads `--btn-icon-size`.
 */
export const ICON_SIZE = Number(t.value('set-icon-size').replace('px', '')) || 24;

/** The randomise tile's glyph. Figma sizes it independently of the stepper's. */
export const RANDOMIZE_ICON_SIZE = Number(t.value('randomize-icon-size').replace('px', '')) || 24;

/** Everything the family renders with, in one place. */
export const LOTTO_BOARD = {
  colors: LOTTO_BOARD_COLORS,
  numberBox: NUMBER_BOX,
  menuButton: MENU_BUTTON,
  setSelect: SET_SELECT,
  searchCard: SEARCH_CARD,
  opacity: OPACITY,
  fontFamily: FONT_FAMILY,
  iconSize: ICON_SIZE,
} as const;
