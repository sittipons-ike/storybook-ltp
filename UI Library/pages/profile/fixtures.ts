import type { Banner } from '../../fixtures/types';

import couponBanner from './assets/profile-coupon-menu-banner.png';
import affiliateBanner from './assets/profile-affiliate-menu-banner.png';
import nokshopBanner from './assets/profile-nokshop-menu-banner.png';
import nokCashCard from './assets/nok-cash-nok-cash-card.png';
import coinIcon from './assets/profile-coin-icons.png';
import lotteryIcon from './assets/profile-lottery-icons.png';
import couponIcon from './assets/profile-coupon-icons.png';

/**
 * The three banners this page carries.
 *
 * Fixtures rather than assets because a designer swaps them — this week's artwork,
 * next week's, or none — while the frame around them does not move. The files sit beside
 * the page and are imported, so a missing one is a build error rather than a broken image.
 */
export const COUPON_BANNER: Banner = {
  src: couponBanner,
  alt: 'คูปองส่วนลด',
  href: '/coupon',
};

export const AFFILIATE_BANNER: Banner = {
  src: affiliateBanner,
  alt: 'แนะนำเพื่อน',
  href: '/affiliate',
};

export const NOKSHOP_BANNER: Banner = {
  src: nokshopBanner,
  alt: 'Nok Shop',
  href: '/nok-shop',
};

/**
 * Artwork, not a fixture: the little card beside the balance is part of the design and
 * nobody swaps it. It lives in this page's own assets because no other page draws it.
 */
export const NOK_CASH_CARD = nokCashCard;

/**
 * The three counters under the dashed line, from `constants/profile` →
 * PROFILE_HEADER_CARD_INFO. Artwork, not fixtures: the icons are part of the card.
 */
export const STAT_ICONS = {
  points: coinIcon,
  lotteryCount: lotteryIcon,
  coupons: couponIcon,
} as const;

/** Measured off the Frontend's `<Image width={416} height={96}>`. */
export const BANNER_RATIO = 416 / 96;

/** `<Image width={34} height={34}>` on each counter. */
export const STAT_ICON_SIZE = 34;
