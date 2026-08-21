// ═══════════════════════════════════════════
// Header Design Tokens
//
// No values here. Colours mirror Figma's `colors/top-and-footer` group; layout and
// typography are authored in design-library/lotteryplus/components/top-and-footer.json.
//
// Regenerate: python3 tools/gen-tokens.py
// ═══════════════════════════════════════════

import { component } from '../../foundations/tokens';

const t = component('topfoot');

/**
 * Figma component set `header-bar-mobile` (14924:2118), variants
 * `type=home-page | sub-page | success`.
 *
 * One Figma colour group paints the header, the site footer and — indirectly — the page
 * frame, so every token below is reached through the shared `topfoot` prefix rather than
 * a `header` one. Splitting the prefix would mean renaming the Figma group, which is a
 * Phase 2 decision, not a library one.
 */
export const HEADER = {
  background: t.ref('header-background'),
  foreground: t.ref('header-foreground'),
  width: t.ref('width'),

  phoenixOpacity: t.ref('header-phoenix-opacity'),
  phoenixBlend: t.ref('header-phoenix-blend'),

  homeHeight: t.ref('header-home-height'),
  homePaddingTop: t.ref('header-home-padding-top'),
  homePaddingX: t.ref('header-home-padding-x'),
  homePaddingBottom: t.ref('header-home-padding-bottom'),
  homeGap: t.ref('header-home-gap'),
  homePhoenixWidth: t.ref('header-home-phoenix-width'),
  homePhoenixHeight: t.ref('header-home-phoenix-height'),
  homePhoenixRight: t.ref('header-home-phoenix-right'),
  homePhoenixBottom: t.ref('header-home-phoenix-bottom'),
  wordmarkWidth: t.ref('header-wordmark-width'),
  wordmarkHeight: t.ref('header-wordmark-height'),
  wordmarkRowHeight: t.ref('header-wordmark-row-height'),

  sloganSize: t.ref('header-slogan-size'),
  sloganLineHeight: t.ref('header-slogan-line-height'),
  sloganWeight: t.ref('header-slogan-weight'),

  subHeight: t.ref('header-sub-height'),
  subPaddingX: t.ref('header-sub-padding-x'),
  subGap: t.ref('header-sub-gap'),
  subHeadingPaddingY: t.ref('header-sub-heading-padding-y'),
  subTitleHeight: t.ref('header-sub-title-height'),

  titleSize: t.ref('header-title-size'),
  titleLineHeight: t.ref('header-title-line-height'),
  titleWeight: t.ref('header-title-weight'),


  successHeight: t.ref('header-success-height'),
  successPadding: t.ref('header-success-padding'),
  successGap: t.ref('header-success-gap'),
  successTitleSize: t.ref('header-success-title-size'),
  successTitleLineHeight: t.ref('header-success-title-line-height'),
  successTitleWeight: t.ref('header-success-title-weight'),
  successMetaSize: t.ref('header-success-meta-size'),
  successMetaLineHeight: t.ref('header-success-meta-line-height'),
  successPhoenixWidth: t.ref('header-success-phoenix-width'),
  successPhoenixHeight: t.ref('header-success-phoenix-height'),
  successPhoenixRight: t.ref('header-success-phoenix-right'),
  successPhoenixBottom: t.ref('header-success-phoenix-bottom'),

  appbarHeight: t.ref('header-appbar-height'),
  appbarGap: t.ref('header-appbar-gap'),
  logoSize: t.ref('header-logo-size'),
  actionSize: t.ref('header-action-size'),
  actionPadding: t.ref('header-action-padding'),
  actionRadius: t.ref('header-action-radius'),
  actionBorderWidth: t.ref('header-action-border-width'),
  /**
   * 24px, which is Icon's `md` step. HeaderAction passes the step name rather than this
   * reference, because Icon renders an SVG attribute that cannot take a CSS variable.
   */
  iconSize: t.ref('header-icon-size'),
} as const;

/**
 * Figma component set `header-bar-profile-moblie` (14962:94338), nine variants.
 *
 * Its own set, not a `type` on `header-bar-mobile` — so its own component here. It shares
 * the `topfoot` colour group with the rest of the header family, and borrows one token
 * from `colors/profile` for the show/hide pill.
 */
export const PROFILE_HEADER = {
  height: t.ref('profile-height'),
  paddingX: t.ref('profile-padding-x'),
  paddingY: t.ref('profile-padding-y'),
  gap: t.ref('profile-gap'),

  avatarSize: t.ref('profile-avatar-size'),

  stackGap: t.ref('profile-stack-gap'),
  stackPaddingY: t.ref('profile-stack-padding-y'),

  nameSize: t.ref('profile-name-size'),
  nameLineHeight: t.ref('profile-name-line-height'),
  nameWeight: t.ref('profile-name-weight'),
  chevronSize: t.ref('profile-chevron-size'),

  metaGap: t.ref('profile-meta-gap'),
  metaSize: t.ref('profile-meta-size'),
  metaLineHeight: t.ref('profile-meta-line-height'),
  metaWeight: t.ref('profile-meta-weight'),

  pillHeight: t.ref('profile-pill-height'),
  pillPaddingX: t.ref('profile-pill-padding-x'),
  pillGap: t.ref('profile-pill-gap'),
  pillRadius: t.ref('profile-pill-radius'),
  pillBackground: t.ref('profile-pill-background'),

  notiSize: t.ref('profile-noti-size'),
  badgeSize: t.ref('profile-badge-diameter'),
  badgePaddingX: t.ref('profile-badge-padding-x'),
  badgeRadius: t.ref('profile-badge-radius'),
  badgeBackground: t.ref('profile-badge-background'),
  badgeForeground: t.ref('profile-badge-foreground'),
  badgeTextSize: t.ref('profile-badge-size-text'),
  badgeLineHeight: t.ref('profile-badge-line-height'),
} as const;

/**
 * The avatar size as a number, because Avatar scales from it rather than styling with it.
 * A `var(--…)` reference cannot be multiplied.
 */
export const PROFILE_AVATAR_SIZE =
  Number(t.value('profile-avatar-size').replace('px', '')) || 56;

/** Which control the right well carries. Figma's `type` axis. */
export type ProfileHeaderType = 'lottery' | 'nokplus';

/**
 * The device a mock is drawn at. iPhone 16 in logical points: 393x852, radius 47.
 *
 * Figma's template frames are 390x844 — an iPhone 14-class canvas — so a mock at real
 * iPhone 16 size is 3pt wider and 8pt taller. That difference lands entirely in the `main`
 * slot, which is the point: every other slot is a fixed height and must not move.
 */
export const DEVICE = {
  width: t.ref('device-width'),
  height: t.ref('device-height'),
  radius: t.ref('device-radius'),
  statusBarHeight: t.ref('status-bar-height'),
} as const;

/**
 * Two text layers in `header-bar-mobile` still sit on pre-token styles — the success
 * variant's meta row. Both are 14/24, confirmed correct as drawn (user, 2026-08-21); no
 * role carries that pair yet, so they stay literals until Phase 2 grows one. The success
 * title was resolved the other way the same day: its 22/34 layer in Figma is stale and
 * the binding is now typography/title/lg/semibold. The sub-page subtitle left earlier —
 * the product never shows it.
 */
export const HEADER_UNMIGRATED_TYPE = [
  { style: 'Title/Body/GraphikTH/M-Regular', value: '14/24 Regular', used: 'success meta label', nearest: 'body/m-reg is 14/22' },
  { style: 'Title/GraphikTH/S-SemiBold', value: '14/24 Semibold', used: 'success meta value', nearest: 'body/m-semb is 14/22' },
] as const;

/** Every `--topfoot-*` token declared, for the token-chain story. */
export const topfootTokenNames = (): string[] => t.names();

export const topfootValue = (name: string): string => t.value(name);
