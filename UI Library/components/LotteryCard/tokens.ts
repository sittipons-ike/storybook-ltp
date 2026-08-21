// ═══════════════════════════════════════════
// LotteryCard Design Tokens
//
// Colours mirror Figma's `colors/card` group; sizes and the id placement are authored in
// design-library/lotteryplus/components/card.json against Figma's `Card` (14591:60095).
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('card');

/** Figma's `Size` axis. */
export type LotteryCardSize = 'l' | 'm' | 's';

export const LOTTERY_CARD_SIZES: readonly LotteryCardSize[] = ['l', 'm', 's'] as const;

/**
 * Per size, because Figma states them per size.
 *
 * The id is positioned absolutely on each variant rather than laid out, and the two
 * offsets are not the same fraction of the card — 6.7% / 80.5% on L against 6.5% / 75% on
 * M — so deriving one from the other would move the text.
 */
export const lotteryCardSize = (size: LotteryCardSize) => ({
  width: t.ref(`${size}-width`),
  height: t.ref(`${size}-height`),
  idX: size === 's' ? undefined : t.ref(`${size}-id-x`),
  idY: size === 's' ? undefined : t.ref(`${size}-id-y`),
});

export const lotteryCardSizeValue = (size: LotteryCardSize) => ({
  width: Number(t.value(`${size}-width`).replace('px', '')) || 0,
  height: Number(t.value(`${size}-height`).replace('px', '')) || 0,
});

export const LOTTERY_CARD = {
  idGap: t.ref('id-gap'),
  idForeground: t.ref('foreground-white'),
  idSize: t.ref('typography-id-size'),
  idLineHeight: t.ref('typography-id-line-height'),
  idWeight: t.ref('typography-id-weight'),
} as const;

/** The face artwork, one raster per size — Figma uses three different images, not one scaled. */
export const lotteryCardFace = (size: LotteryCardSize) => `card-lottery-${size}`;

export const cardTokenNames = (): string[] => t.names();
export const cardValue = (name: string): string => t.value(name);

export { default as LOTTERY_CARD_SPEC } from '../../../design-library/lotteryplus/components/card.json';
