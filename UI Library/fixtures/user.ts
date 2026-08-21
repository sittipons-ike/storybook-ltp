import type { Profile, Wallet, WebConfig } from './types';

/**
 * Values from `lotteryplus-frontend-main/src/mock/data/user.ts` and `wallet.ts` — what the
 * Frontend's own MSW handlers serve. Real values, so a page is tested against what it will
 * actually hold rather than against `Lorem ipsum`.
 */
export const PROFILE: Profile = {
  // The Frontend's mock carries 'T' / 'T' — placeholder initials that make a card look
  // wrong in a way that is the mock's fault, not the design's. Thai names of realistic
  // length instead.
  firstName: 'สิทธิพร',
  lastName: 'ใจดีมาก',
  memberId: 'P240497',
  bankAccount: { bankName: 'BBL', bankNo: '1234567890' },
};

/** Has not linked an account yet — the branch the member-info rows read. */
export const PROFILE_NO_BANK: Profile = { ...PROFILE, bankAccount: undefined };

/** Under 20, which is what the page's Alert renders on. */
export const PROFILE_UNDERAGE: Profile = { ...PROFILE, isUnderage: true };

/**
 * `MOCK_WALLET`, verbatim: 5,239,822,249,018. Thirteen digits, and it is in the Frontend's
 * mock because a balance that long is what finds a card that assumed four.
 */
export const WALLET_LONG: Wallet = {
  balance: '5239822249018',
  points: '500',
  lotteryCount: '10',
  coupons: '20',
};

/** The ordinary case. */
export const WALLET: Wallet = {
  balance: '2000000',
  points: '500',
  lotteryCount: '10',
  coupons: '20',
};

export const WEB_CONFIG: WebConfig = { isEnabledAffiliate: true, isEnableNokshop: true };
