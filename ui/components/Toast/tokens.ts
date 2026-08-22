// ═══════════════════════════════════════════
// Toast Design Tokens
//
// This file holds NO values. Every value lives in Figma, flows through design.md
// (colours) and design-library/lotteryplus/components/toast.json (layout, sizing,
// typography), and is generated into foundations/tokens.css (CSS custom properties)
// and foundations/tokens.generated.ts (resolved literals).
//
// What this file adds is types and lookup helpers, so Toast.tsx renders with CSS
// variables while stories and tests can still read the literal a token resolves to.
//
// Regenerate the source values: python3 tools/gen-components.py && python3 tools/gen-tokens.py
// Verify them against Figma:    python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('toast');

/** Figma component sets: light-toast (14848:2072) / solid-toast (14848:2109). */
export type ToastVariant = 'light' | 'solid';

/** Figma variant property: type. */
export type ToastType = 'informative' | 'success' | 'warning' | 'error';

export const TOAST_VARIANTS: readonly ToastVariant[] = ['light', 'solid'] as const;

export const TOAST_TYPES: readonly ToastType[] = [
  'informative',
  'success',
  'warning',
  'error',
] as const;

/** Figma's light-toast set ships three types — warning exists only on solid-toast. */
export const TOAST_LIGHT_TYPES: readonly ToastType[] = [
  'informative',
  'success',
  'error',
] as const;

/** Icon component each type renders, per the Figma instance swap. */
export const TOAST_ICONS: Record<ToastType, string> = {
  informative: 'filled-info',
  success: 'filled-check_circle',
  warning: 'filled-Warning-2',
  error: 'filled-Warning-2',
};

export const TOAST_CLOSE_ICON = 'filled-close';

/**
 * Figma models toast colours as a flat hue palette rather than a variant x state
 * matrix, so a type maps onto a hue and the variant picks which slots of that hue
 * are used. Nothing here is a colour — only the tail of a token name.
 */
const HUE: Record<ToastType, string> = {
  informative: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

/** The literal a Toast token resolves to. Empty string when it is not declared. */
export const toastValue = (token: string): string => t.value(token);

/** Every Tier 2 token declared for toast — what the token-chain story enumerates. */
export const toastTokenNames = (): string[] => t.names();

/** Layout, sizing and typography shared by every variant. */
export const TOAST = {
  radius: t.ref('radius'),
  borderWidth: t.ref('border-width'),
  paddingY: t.ref('padding-y'),
  paddingX: t.ref('padding-x'),
  gap: t.ref('gap'),
  closeGap: t.ref('close-gap'),
  textGap: t.ref('text-gap'),
  shadow: t.ref('shadow'),

  iconCircleSize: t.ref('icon-circle-size'),
  iconCirclePadding: t.ref('icon-circle-padding'),
  iconCircleRadius: t.ref('icon-circle-radius'),

  title: {
    fontFamily: t.ref('typography-title-family'),
    fontSize: t.ref('typography-title-size'),
    fontWeight: t.ref('typography-title-weight'),
    lineHeight: t.ref('typography-title-line-height'),
    letterSpacing: t.ref('typography-title-tracking'),
  },
  caption: {
    fontFamily: t.ref('typography-caption-family'),
    fontSize: t.ref('typography-caption-size'),
    fontWeight: t.ref('typography-caption-weight'),
    lineHeight: t.ref('typography-caption-line-height'),
    letterSpacing: t.ref('typography-caption-tracking'),
  },
} as const;

/** Icon sizes stay numeric — `Icon` takes a number prop, not a style. */
const numeric = (token: string, fallback: number): number =>
  Number(toastValue(token).replace('px', '')) || fallback;

export const TOAST_ICON_SIZE = numeric('icon-size', 20);
export const TOAST_CLOSE_ICON_SIZE = numeric('close-icon-size', 20);

export interface ToastColorSlots<T> {
  /** Container fill. */
  background: T;
  /** Container stroke — light-toast only; solid-toast draws no border. */
  border: T | undefined;
  /** Icon circle fill. */
  iconCircle: T;
  /** Icon glyph fill, which sits on the icon circle. */
  icon: T;
  /** Title, caption and close glyph. */
  text: T;
}

/** Token names (without the `--toast-` prefix) for one variant x type. */
export const toastColorTokens = (
  variant: ToastVariant,
  type: ToastType,
): ToastColorSlots<string> => {
  const hue = HUE[type];
  return variant === 'light'
    ? {
        background: `background-soft-${hue}`,
        border: `foreground-${hue}`,
        iconCircle: `foreground-${hue}`,
        icon: 'foreground-white',
        text: 'foreground-dark',
      }
    : {
        background: `background-${hue}`,
        border: undefined,
        iconCircle: `background-soft-${hue}`,
        icon: `background-${hue}`,
        text: 'foreground-white',
      };
};

/** CSS variable references for one variant x type — what Toast.tsx renders with. */
export const toastColors = (
  variant: ToastVariant,
  type: ToastType,
): ToastColorSlots<string> => {
  const tokens = toastColorTokens(variant, type);
  return {
    background: t.ref(tokens.background),
    border: tokens.border ? t.ref(tokens.border) : undefined,
    iconCircle: t.ref(tokens.iconCircle),
    icon: t.ref(tokens.icon),
    text: t.ref(tokens.text),
  };
};

/** Resolved literals for one variant x type — for stories, tables and tests. */
export const toastColorValues = (
  variant: ToastVariant,
  type: ToastType,
): ToastColorSlots<string> => {
  const tokens = toastColorTokens(variant, type);
  return {
    background: toastValue(tokens.background),
    border: tokens.border ? toastValue(tokens.border) : undefined,
    iconCircle: toastValue(tokens.iconCircle),
    icon: toastValue(tokens.icon),
    text: toastValue(tokens.text),
  };
};
