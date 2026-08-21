import type { Profile, Wallet, WebConfig } from './types';

/**
 * Lifted from `lotteryplus-frontend-main/src/mock/data/user.ts` → `USER_API_MOCK.me`,
 * which is what the Frontend's own MSW handler serves for `/user/me`.
 *
 * Two fields were changed and both are noted. Everything else is verbatim, including the
 * emoji in `name` — real data has emoji in it, and a page that breaks on one should break
 * here rather than in production.
 */
export const PROFILE: Profile = {
  id: '654b2255c6026fcf03340b3d',
  userId: 'P240497',
  // The Frontend's mock carries 'T' / 'T' — placeholder initials that make a profile card
  // look wrong in a way that is the mock's fault, not the design's. Real Thai names of
  // realistic length, so the card is tested against what it will actually hold.
  firstName: 'สิทธิพร',
  lastName: 'ใจดีมาก',
  nickName: 'SeeYouSpaceCowboy',
  gender: 'MALE',
  phone: '1234567890',
  bankName: 'BBL',
  bankNo: '1234567890',
  address: {
    province: 'กรุงเทพมหานคร',
    subdistrict: '',
    district: '',
    zipcode: '',
    addressDetail: '',
  },
  lineId: 'U43b1862dfb99d55c24c2874336bbfa72',
  name: 'T🌴',
  banExpiredAt: null,
  suspended: false,
  birthDate: '1994-07-08T17:00:00Z',
  birthDay: { year: 2537, month: 7, day: 8 },
  verifyStatus: 'UNKNOWN',
  profileImageURL: '/test.png',
  achievement: [],
  tier: 'BRONZE',
};

/** A member who has not linked a bank account — the branch `profile-info` reads. */
export const PROFILE_NO_BANK: Profile = { ...PROFILE, bankName: '', bankNo: '' };

/** Under 20, which is the condition the page's Alert renders on. */
export const PROFILE_UNDER_20: Profile = {
  ...PROFILE,
  birthDay: { year: 2551, month: 7, day: 8 },
  birthDate: '2008-07-08T17:00:00Z',
};

/**
 * `src/mock/data/wallet.ts` → `MOCK_WALLET`, verbatim.
 * 5,239,822,249,018 — thirteen digits. It is in the mock because a balance that long is
 * what finds a card that assumed four.
 */
export const WALLET: Wallet = { balance: '5239822249018' };

/** A balance of the length a member actually carries, for the ordinary case. */
export const WALLET_TYPICAL: Wallet = { balance: '1050' };

/** Both flags on. Stories turn them off individually to show the sections disappearing. */
export const WEB_CONFIG: WebConfig = {
  isEnabledAffiliate: true,
  isEnableNokshop: true,
};
