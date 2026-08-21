// ═══════════════════════════════════════════
// Avatar Design Tokens
//
// No values here. Figma has the component set (14291:133618) but no `colors/avatar`
// variable group, so the colours are authored in
// design-library/lotteryplus/components/avatar.json against the semantic layer.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('avatar');

/** Figma's `Type` axis. */
export type AvatarType = 'member' | 'guest' | 'illustration';

/**
 * Figma's `On bg Red` axis, named for what it means rather than what it sits on: the ring
 * and the guest disc invert between the two.
 */
export type AvatarSurface = 'red' | 'light';

/**
 * Every dimension is measured at Figma's 40px base and scaled from there.
 *
 * The profile header instances this at 56 and every inner value scales with it — 34 to 47,
 * 2.5 to 3.5, 1.4 to 1.96, 29 to 40. That is 1.4x throughout, so the component takes a
 * size and multiplies rather than carrying a second set of numbers for every place it
 * happens to be used.
 */
export const AVATAR_BASE = {
  size: 40,
  ring: 34,
  ringPadding: 2.5,
  ringBorderWidth: 1.4,
  inner: 29,
  glyph: 16,
  edit: 12,
  editGlyph: 8,
} as const;

const num = (name: string, fallback: number) =>
  Number(t.value(name).replace('px', '')) || fallback;

/** Read the base geometry back out of the generated tokens, so it cannot drift from them. */
export const avatarBase = () => ({
  size: num('size', AVATAR_BASE.size),
  ring: num('ring-size', AVATAR_BASE.ring),
  ringPadding: num('ring-padding', AVATAR_BASE.ringPadding),
  ringBorderWidth: num('ring-border-width', AVATAR_BASE.ringBorderWidth),
  inner: num('inner-size', AVATAR_BASE.inner),
  glyph: num('glyph-size', AVATAR_BASE.glyph),
  edit: num('edit-size', AVATAR_BASE.edit),
  editGlyph: num('edit-glyph-size', AVATAR_BASE.editGlyph),
});

export const AVATAR = {
  ringOnRed: t.ref('ring-on-red'),
  ringOnLight: t.ref('ring-on-light'),
  guestBackgroundOnRed: t.ref('guest-background-on-red'),
  guestBackgroundOnLight: t.ref('guest-background-on-light'),
  guestGlyphOnRed: t.ref('guest-glyph-on-red'),
  guestGlyphOnLight: t.ref('guest-glyph-on-light'),
  illustrationBackground: t.ref('illustration-background'),
  editBackground: t.ref('edit-background'),
  editGlyph: t.ref('edit-glyph'),
} as const;

export const avatarTokenNames = (): string[] => t.names();
export const avatarValue = (name: string): string => t.value(name);

export { default as AVATAR_SPEC } from '../../../design-library/lotteryplus/components/avatar.json';
