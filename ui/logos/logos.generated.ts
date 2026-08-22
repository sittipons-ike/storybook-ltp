// ===================================================================
// logos.generated.ts — GENERATED FILE, DO NOT EDIT BY HAND
// Regenerate: python3 tools/gen-logo-manifest.py
//
// Built by listing ui/assets/logos, so every entry is a file that
// exists. Marks are served from that directory via `staticDirs`; they are not
// bundled and they are deliberately not recolourable — several are third-party
// brand marks and none may be tinted.
// ===================================================================

import { asset } from '../foundations/asset';

export interface LogoEntry {
  /** File stem, and the name Logo takes. */
  name: string;
  file: string;
  format: 'svg' | 'png';
  group: string;
  bytes: number;
}

export const LOGOS: readonly LogoEntry[] = [
  { name: "affiliate-tranfered", file: "affiliate-tranfered.png", format: "png", group: "other", bytes: 27869 },
  { name: "card-lottery-l", file: "card-lottery-l.png", format: "png", group: "other", bytes: 272240 },
  { name: "card-lottery-m", file: "card-lottery-m.png", format: "png", group: "other", bytes: 91325 },
  { name: "card-lottery-s", file: "card-lottery-s.png", format: "png", group: "other", bytes: 32332 },
  { name: "gp-coupon", file: "gp-coupon.png", format: "png", group: "graphic", bytes: 17376 },
  { name: "gp-gift-box", file: "gp-gift-box.png", format: "png", group: "gift", bytes: 28442 },
  { name: "gp-gift-empty-state-recieve", file: "gp-gift-empty-state-recieve.png", format: "png", group: "gift", bytes: 20638 },
  { name: "gp-gift-empty-state-send", file: "gp-gift-empty-state-send.png", format: "png", group: "gift", bytes: 26843 },
  { name: "gp-gift-red-envelope", file: "gp-gift-red-envelope.png", format: "png", group: "gift", bytes: 27750 },
  { name: "gp-gift-surprise", file: "gp-gift-surprise.png", format: "png", group: "gift", bytes: 41484 },
  { name: "gp-gift", file: "gp-gift.png", format: "png", group: "gift", bytes: 34064 },
  { name: "gp-jidrid-about-to-expire", file: "gp-jidrid-about-to-expire.png", format: "png", group: "jidrit", bytes: 36497 },
  { name: "gp-jidrid-buy-lottery", file: "gp-jidrid-buy-lottery.png", format: "png", group: "jidrit", bytes: 20116 },
  { name: "gp-jidrid-lottery", file: "gp-jidrid-lottery.png", format: "png", group: "jidrit", bytes: 25952 },
  { name: "gp-jidrid-money", file: "gp-jidrid-money.png", format: "png", group: "jidrit", bytes: 23382 },
  { name: "gp-jidrid-nokpionts", file: "gp-jidrid-nokpionts.png", format: "png", group: "jidrit", bytes: 30892 },
  { name: "gp-jidrid-overpayment", file: "gp-jidrid-overpayment.png", format: "png", group: "jidrit", bytes: 24370 },
  { name: "gp-jidrid-payment-success", file: "gp-jidrid-payment-success.png", format: "png", group: "jidrit", bytes: 26874 },
  { name: "gp-jidrid-success", file: "gp-jidrid-success.png", format: "png", group: "jidrit", bytes: 21882 },
  { name: "gp-jidrid-wait-2", file: "gp-jidrid-wait-2.png", format: "png", group: "jidrit", bytes: 23328 },
  { name: "gp-jidrid-wait", file: "gp-jidrid-wait.png", format: "png", group: "jidrit", bytes: 23478 },
  { name: "gp-jidrid-wrong", file: "gp-jidrid-wrong.png", format: "png", group: "jidrit", bytes: 26297 },
  { name: "gp-jidrit-check", file: "gp-jidrit-check.png", format: "png", group: "jidrit", bytes: 19653 },
  { name: "gp-jidrit-error-occurred", file: "gp-jidrit-error-occurred.png", format: "png", group: "jidrit", bytes: 22025 },
  { name: "gp-jidrit-gift-open", file: "gp-jidrit-gift-open.png", format: "png", group: "jidrit", bytes: 38465 },
  { name: "gp-jidrit-leval-1-disable", file: "gp-jidrit-leval-1-disable.png", format: "png", group: "jidrit", bytes: 17836 },
  { name: "gp-jidrit-leval-1", file: "gp-jidrit-leval-1.png", format: "png", group: "jidrit", bytes: 17216 },
  { name: "gp-jidrit-leval-2-disable", file: "gp-jidrit-leval-2-disable.png", format: "png", group: "jidrit", bytes: 15688 },
  { name: "gp-jidrit-leval-2", file: "gp-jidrit-leval-2.png", format: "png", group: "jidrit", bytes: 15116 },
  { name: "gp-jidrit-leval-3-disable", file: "gp-jidrit-leval-3-disable.svg", format: "svg", group: "jidrit", bytes: 17436 },
  { name: "gp-jidrit-leval-3", file: "gp-jidrit-leval-3.svg", format: "svg", group: "jidrit", bytes: 17379 },
  { name: "gp-jidrit-leval-4-disable", file: "gp-jidrit-leval-4-disable.png", format: "png", group: "jidrit", bytes: 18102 },
  { name: "gp-jidrit-leval-4", file: "gp-jidrit-leval-4.png", format: "png", group: "jidrit", bytes: 17161 },
  { name: "gp-jidrit-leval-5-disable", file: "gp-jidrit-leval-5-disable.svg", format: "svg", group: "jidrit", bytes: 15871 },
  { name: "gp-jidrit-leval-5", file: "gp-jidrit-leval-5.svg", format: "svg", group: "jidrit", bytes: 15823 },
  { name: "gp-jidrit-lot-of-users", file: "gp-jidrit-lot-of-users.png", format: "png", group: "jidrit", bytes: 20498 },
  { name: "gp-jidrit-ok", file: "gp-jidrit-ok.png", format: "png", group: "jidrit", bytes: 23420 },
  { name: "gp-jidrit-open", file: "gp-jidrit-open.png", format: "png", group: "jidrit", bytes: 38778 },
  { name: "gp-jidrit-search-disable", file: "gp-jidrit-search-disable.png", format: "png", group: "jidrit", bytes: 26443 },
  { name: "gp-jidrit-search", file: "gp-jidrit-search.png", format: "png", group: "jidrit", bytes: 25695 },
  { name: "gp-jidrit-system-down", file: "gp-jidrit-system-down.png", format: "png", group: "jidrit", bytes: 24854 },
  { name: "gp-jidrit-thankyou", file: "gp-jidrit-thankyou.png", format: "png", group: "jidrit", bytes: 24617 },
  { name: "gp-jidrit-warning", file: "gp-jidrit-warning.png", format: "png", group: "jidrit", bytes: 24171 },
  { name: "gp-jidritlucky-1-sold-out", file: "gp-jidritlucky-1-sold-out.png", format: "png", group: "jidrit", bytes: 27007 },
  { name: "gp-jidritlucky-1", file: "gp-jidritlucky-1.png", format: "png", group: "jidrit", bytes: 37675 },
  { name: "gp-jidritlucky-10-sold-out", file: "gp-jidritlucky-10-sold-out.png", format: "png", group: "jidrit", bytes: 27876 },
  { name: "gp-jidritlucky-10", file: "gp-jidritlucky-10.png", format: "png", group: "jidrit", bytes: 45719 },
  { name: "gp-jidritlucky-3-sold-out", file: "gp-jidritlucky-3-sold-out.png", format: "png", group: "jidrit", bytes: 27600 },
  { name: "gp-jidritlucky-3", file: "gp-jidritlucky-3.png", format: "png", group: "jidrit", bytes: 44921 },
  { name: "gp-jidritlucky-5-sold-out", file: "gp-jidritlucky-5-sold-out.png", format: "png", group: "jidrit", bytes: 27507 },
  { name: "gp-jidritlucky-5", file: "gp-jidritlucky-5.png", format: "png", group: "jidrit", bytes: 45571 },
  { name: "gp-lottery", file: "gp-lottery.png", format: "png", group: "graphic", bytes: 26421 },
  { name: "gp-lottory-all", file: "gp-lottory-all.svg", format: "svg", group: "graphic", bytes: 19387 },
  { name: "gp-lottory-set", file: "gp-lottory-set.svg", format: "svg", group: "graphic", bytes: 19247 },
  { name: "gp-lottory-single", file: "gp-lottory-single.svg", format: "svg", group: "graphic", bytes: 18315 },
  { name: "gp-lottory", file: "gp-lottory.png", format: "png", group: "graphic", bytes: 4724 },
  { name: "gp-mysafe", file: "gp-mysafe.png", format: "png", group: "graphic", bytes: 28718 },
  { name: "gp-nm-affiliate", file: "gp-nm-affiliate.png", format: "png", group: "nav-menu", bytes: 59969 },
  { name: "gp-nm-gift", file: "gp-nm-gift.png", format: "png", group: "nav-menu", bytes: 33522 },
  { name: "gp-nm-howto", file: "gp-nm-howto.png", format: "png", group: "nav-menu", bytes: 41938 },
  { name: "gp-nm-lottocheck", file: "gp-nm-lottocheck.png", format: "png", group: "nav-menu", bytes: 47162 },
  { name: "gp-nm-news", file: "gp-nm-news.png", format: "png", group: "nav-menu", bytes: 38152 },
  { name: "gp-nm-nokcash", file: "gp-nm-nokcash.png", format: "png", group: "nav-menu", bytes: 44118 },
  { name: "gp-nm-nokpoint", file: "gp-nm-nokpoint.png", format: "png", group: "nav-menu", bytes: 42495 },
  { name: "gp-nm-nokshop", file: "gp-nm-nokshop.png", format: "png", group: "nav-menu", bytes: 53454 },
  { name: "gp-nm-scancheck", file: "gp-nm-scancheck.png", format: "png", group: "nav-menu", bytes: 43895 },
  { name: "gp-nm-service", file: "gp-nm-service.png", format: "png", group: "nav-menu", bytes: 39003 },
  { name: "gp-nokcard", file: "gp-nokcard.png", format: "png", group: "graphic", bytes: 10868 },
  { name: "gp-nokpoints-1", file: "gp-nokpoints-1.png", format: "png", group: "graphic", bytes: 33271 },
  { name: "gp-nokpoints-2", file: "gp-nokpoints-2.png", format: "png", group: "graphic", bytes: 20205 },
  { name: "gp-quick-menu-affiliate", file: "gp-quick-menu-affiliate.png", format: "png", group: "quick-menu", bytes: 48601 },
  { name: "gp-quick-menu-check-lottery", file: "gp-quick-menu-check-lottery.png", format: "png", group: "quick-menu", bytes: 33706 },
  { name: "gp-quick-menu-how-to", file: "gp-quick-menu-how-to.png", format: "png", group: "quick-menu", bytes: 38131 },
  { name: "gp-quick-menu-jidritlucky", file: "gp-quick-menu-jidritlucky.png", format: "png", group: "quick-menu", bytes: 34801 },
  { name: "gp-quick-menu-news", file: "gp-quick-menu-news.png", format: "png", group: "quick-menu", bytes: 37922 },
  { name: "gp-quick-menu-nokcare", file: "gp-quick-menu-nokcare.png", format: "png", group: "quick-menu", bytes: 26594 },
  { name: "gp-quick-menu-nokcash", file: "gp-quick-menu-nokcash.png", format: "png", group: "quick-menu", bytes: 38087 },
  { name: "gp-quick-menu-nokfast", file: "gp-quick-menu-nokfast.png", format: "png", group: "quick-menu", bytes: 34841 },
  { name: "gp-quick-menu-nokpoint", file: "gp-quick-menu-nokpoint.png", format: "png", group: "quick-menu", bytes: 40184 },
  { name: "gp-quick-menu-noksafe", file: "gp-quick-menu-noksafe.png", format: "png", group: "quick-menu", bytes: 31785 },
  { name: "gp-quick-menu-nokshop", file: "gp-quick-menu-nokshop.png", format: "png", group: "quick-menu", bytes: 26298 },
  { name: "gp-quick-menu-noksocial", file: "gp-quick-menu-noksocial.png", format: "png", group: "quick-menu", bytes: 25158 },
  { name: "gp-tab-menu-jidritlucky", file: "gp-tab-menu-jidritlucky.png", format: "png", group: "tab-menu", bytes: 34351 },
  { name: "gp-tab-menu-search-all", file: "gp-tab-menu-search-all.png", format: "png", group: "tab-menu", bytes: 29623 },
  { name: "gp-tab-menu-set", file: "gp-tab-menu-set.png", format: "png", group: "tab-menu", bytes: 32639 },
  { name: "logo-bank-bay", file: "logo-bank-bay.svg", format: "svg", group: "bank", bytes: 3598 },
  { name: "logo-bank-bbl", file: "logo-bank-bbl.svg", format: "svg", group: "bank", bytes: 2080 },
  { name: "logo-bank-gsb", file: "logo-bank-gsb.png", format: "png", group: "bank", bytes: 18170 },
  { name: "logo-bank-kbank", file: "logo-bank-kbank.svg", format: "svg", group: "bank", bytes: 7089 },
  { name: "logo-bank-ktb", file: "logo-bank-ktb.svg", format: "svg", group: "bank", bytes: 5834 },
  { name: "logo-bank-scb", file: "logo-bank-scb.svg", format: "svg", group: "bank", bytes: 565 },
  { name: "logo-bank-ttb", file: "logo-bank-ttb.svg", format: "svg", group: "bank", bytes: 1448 },
  { name: "logo-bank-uob", file: "logo-bank-uob.svg", format: "svg", group: "bank", bytes: 1511 },
  { name: "logo-facebook", file: "logo-facebook.svg", format: "svg", group: "brand", bytes: 709 },
  { name: "logo-icon-facebook-default", file: "logo-icon-facebook-default.svg", format: "svg", group: "social-icon", bytes: 992 },
  { name: "logo-icon-facebook-hover", file: "logo-icon-facebook-hover.svg", format: "svg", group: "social-icon", bytes: 956 },
  { name: "logo-icon-line-default", file: "logo-icon-line-default.svg", format: "svg", group: "social-icon", bytes: 2928 },
  { name: "logo-icon-line-hover", file: "logo-icon-line-hover.svg", format: "svg", group: "social-icon", bytes: 3055 },
  { name: "logo-icon-link-default", file: "logo-icon-link-default.svg", format: "svg", group: "social-icon", bytes: 2634 },
  { name: "logo-icon-link-hover", file: "logo-icon-link-hover.svg", format: "svg", group: "social-icon", bytes: 1579 },
  { name: "logo-icon-x-default", file: "logo-icon-x-default.svg", format: "svg", group: "social-icon", bytes: 1039 },
  { name: "logo-icon-x-hover", file: "logo-icon-x-hover.svg", format: "svg", group: "social-icon", bytes: 983 },
  { name: "logo-line", file: "logo-line.svg", format: "svg", group: "brand", bytes: 2759 },
  { name: "logo-truemoney", file: "logo-truemoney.svg", format: "svg", group: "brand", bytes: 8008 },
  { name: "logo-x", file: "logo-x.svg", format: "svg", group: "brand", bytes: 708 },
  { name: "order-cancel", file: "order-cancel.png", format: "png", group: "other", bytes: 27357 },
  { name: "order-expire", file: "order-expire.png", format: "png", group: "other", bytes: 26289 },
  { name: "order-success", file: "order-success.png", format: "png", group: "other", bytes: 36591 },
  { name: "payment-cancel", file: "payment-cancel.png", format: "png", group: "other", bytes: 26371 },
  { name: "service", file: "service.png", format: "png", group: "other", bytes: 20841 },
  { name: "won-prize-lotbai", file: "won-prize-lotbai.png", format: "png", group: "other", bytes: 46279 },
  { name: "won-prize", file: "won-prize.png", format: "png", group: "other", bytes: 48008 },
] as const;

export type LogoName = (typeof LOGOS)[number]['name'];

/** Where the marks are served from — see `staticDirs` in .storybook/main.ts. */
export const LOGO_BASE = 'logos';

const BY_NAME = new Map(LOGOS.map((l) => [l.name, l]));

export const logoEntry = (name: string): LogoEntry | undefined => BY_NAME.get(name);

export const logoSrc = (name: string): string | undefined => {
  const entry = BY_NAME.get(name);
  return entry ? asset(`${LOGO_BASE}/${entry.file}`) : undefined;
};
