import type { Banner } from '../../fixtures/types';

import couponBanner from './assets/profile-coupon-menu-banner.png';
import affiliateBanner from './assets/profile-affiliate-menu-banner.png';
import nokshopBanner from './assets/profile-nokshop-menu-banner.png';
import nokCashCard from './assets/nok-cash-nok-cash-card.png';

/**
 * The three banners this page carries.
 *
 * They are fixtures rather than assets because that is what they are in the product: the
 * Frontend fetches `{ images: [{ url, type }] }` and the artwork changes on a schedule.
 * The `url` here points at a file checked in beside the page so the story renders without
 * a network; when this moves into the product repo the fetch replaces the fixture and the
 * page does not change, because the page only ever saw a URL.
 */
export const COUPON_BANNER: Banner = {
  images: [{ url: couponBanner, type: 'MOBILE' }],
  redirectUrl: { name: 'coupon', url: '/coupon' },
};

export const AFFILIATE_BANNER: Banner = {
  images: [{ url: affiliateBanner, type: 'MOBILE' }],
  redirectUrl: { name: 'affiliate', url: '/affiliate' },
};

export const NOKSHOP_BANNER: Banner = {
  images: [{ url: nokshopBanner, type: 'MOBILE' }],
  redirectUrl: { name: 'nokshop', url: '/nok-shop' },
};

/**
 * Artwork, not data: the little card next to the balance is part of the design and does
 * not arrive from anywhere. It sits in this page's own assets because no other page uses
 * it — the rule is in fixtures/README.md.
 */
export const NOK_CASH_CARD = nokCashCard;

/** Measured off the Frontend's `<Image width={416} height={96}>`. */
export const BANNER_RATIO = 416 / 96;
