/**
 * The shapes the page tier renders.
 *
 * These are not API responses. Nothing in this repo fetches, and nothing should: this is
 * the designer's copy of the product, where a state is chosen rather than arrived at.
 *
 * So a shape here carries what a page *draws*, not what a server *sends*. The first
 * version of this file copied the Frontend's API envelopes wholesale and ended up with
 * `Profile` at 21 fields for a page that renders 2, and a `Banner` wrapping an array of
 * `{ url, type: 'WEB' | 'MOBILE' }` for a page that shows one picture. That structure
 * described a transport nobody here uses.
 *
 * Field names still match the Frontend where they overlap, so moving a page into the
 * product repo is a matter of feeding it real data rather than rewriting it.
 */

/** Who the page is about. Grows a field when a page actually draws one. */
export interface Profile {
  firstName: string;
  lastName: string;
  /** Shown beside the name in the profile header. */
  memberId: string;
  /** Present once the member links an account — several rows branch on this. */
  bankAccount?: { bankName: string; bankNo: string };
  /** Under 20 cannot buy, which is a state the page has to be able to show. */
  isUnderage?: boolean;
}

/**
 * The four numbers the profile card carries. Strings because a balance outgrows a safe
 * integer — thirteen digits in the Frontend's own mock.
 */
export interface Wallet {
  /** นกแคช — the headline figure. */
  balance: string;
  /** นกพอยต์ */
  points: string;
  /** สลากของฉัน */
  lotteryCount: string;
  /** คูปองส่วนลด */
  coupons: string;
}

/**
 * A banner: a picture that links somewhere.
 *
 * It stays a fixture rather than an asset because a designer swaps it — this week's
 * artwork, next week's, or none at all — while the frame around it never moves. Artwork
 * that is part of the design itself, like the little nok-cash card, is an asset.
 */
export interface Banner {
  src: string;
  alt: string;
  /** Where tapping it goes. Recorded so a page can show the affordance honestly. */
  href?: string;
}

/**
 * The flags that decide whether a section renders at all. Props, so one story can show
 * the page with a section and another without it.
 */
export interface WebConfig {
  isEnabledAffiliate: boolean;
  isEnableNokshop: boolean;
}
