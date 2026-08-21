/**
 * Shapes copied from the Frontend, not imported from it.
 *
 * Importing `@/types/...` would tie this library to a checkout of
 * `lotteryplus-frontend-main`. Each type below names the file it was copied from, so when
 * the Frontend's shape changes the drift shows up in a diff instead of hiding behind a
 * path alias. Only the fields the page tier actually renders are carried across.
 */

/** src/types/user/index.ts — `Profile` */
export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  nickName: string;
  gender: 'MALE' | 'FEMALE' | string;
  phone: string;
  bankName: string;
  bankNo: string;
  address: Address;
  lineId: string;
  name: string;
  banExpiredAt: string | null;
  suspended: boolean;
  birthDate: string;
  birthDay: Birthday;
  verifyStatus: string;
  profileImageURL: string;
  achievement: string[];
  tier: string;
}

/** src/types/user/index.ts — `Address` */
export interface Address {
  province: string;
  subdistrict: string;
  district: string;
  zipcode: string;
  addressDetail: string;
}

/** src/types/user/index.ts — `Birthday` */
export interface Birthday {
  year: number;
  month: number;
  day: number;
}

/** src/types — `UserNokCashBalance`. A string because the balance outgrows a safe integer. */
export interface Wallet {
  balance: string;
}

/**
 * src/types/ads-banner — the shape every banner arrives in. `url` is what makes a banner
 * data rather than artwork: it is fetched, it is scheduled, and it changes weekly.
 */
export interface BannerImage {
  url: string;
  type: 'WEB' | 'MOBILE';
}

export interface Banner {
  images: BannerImage[];
  redirectUrl?: { name: string; url: string };
}

/**
 * src/store/config — the flags that decide which sections a page renders at all.
 * They are props here, so a story can show the page with a section on and with it off.
 */
export interface WebConfig {
  isEnabledAffiliate: boolean;
  isEnableNokshop: boolean;
}
