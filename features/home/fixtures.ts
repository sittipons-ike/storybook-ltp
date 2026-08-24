import type { HomeAd } from './components/HomeAdsRow';
import type { Promo } from './components/PromoBanner';
import type { QuickMenuItem } from './components/QuickMenuGrid';
import type { AddOnService } from './components/AddOnServiceCard';
import type { LotterySectionProps } from './components/LotterySection';

import headline from './assets/home-headline.png';
import ticketFace from './assets/lottery-ticket-face.png';
import adJidrit from './assets/home-ads-jidrit.png';
import adTop10 from './assets/home-ads-top10.png';
import adLottoCheck from './assets/home-ads-lottocheck.png';
import bannerScan from './assets/home-banner-scan.png';

/**
 * What the home page draws, as data.
 *
 * Fixtures rather than assets for anything a scheduler swaps — the ad tiles and the promo
 * banner come from the Frontend's banner API and change weekly — and assets for artwork
 * that is part of the design, like the นาทีทอง headline and the ticket face.
 *
 * Every picture is imported rather than served from a static directory, so a missing file
 * is a build error instead of a broken image at runtime.
 */

/** `Headline_V6 2` (`21084:85073`) — 390 x 167, the นาทีทอง artwork. */
export const HEADLINE = headline;

/**
 * `Full_watermark 1` (`I21084:85095;14291:138147;14291:138121`) — 170 x 84.
 *
 * The ticket face is one picture with the lottery number printed into it. Real data would
 * bring one file per number; here every tile shows the same face, and the number a tile
 * claims lives in its `faceAlt` so a screen reader still reads something true.
 */
export const TICKET_FACE = ticketFace;

/** `Frame 1000013545` (`22244:118774`) — the two ad tiles under the search card. */
export const AD_FEATURE: HomeAd = {
  src: adJidrit,
  alt: 'จิ๊ดริดหยิบโชค — คลิกเลย!',
  href: '/jidrit-lucky',
};

export const AD_STACKED: HomeAd[] = [
  { src: adTop10, alt: '10 อันดับ เลขขายดีประจำวัน', href: '/top-ten' },
  { src: adLottoCheck, alt: 'ทำนายฝัน — ใหม่!', href: '/dream' },
];

/** `Banner Promote` (`22244:118794`). Figma draws three dots, so three banners. */
export const PROMO_BANNERS: Promo[] = [
  { src: bannerScan, alt: 'ฝากตรวจหวยใบ รู้ผลทันทีทาง LINE', href: '/scan-lottery' },
  { src: bannerScan, alt: 'ฝากตรวจหวยใบ รู้ผลทันทีทาง LINE', href: '/scan-lottery' },
  { src: bannerScan, alt: 'ฝากตรวจหวยใบ รู้ผลทันทีทาง LINE', href: '/scan-lottery' },
];

/** `Frame 43604` (`21084:85076`) — the countdown as Figma draws it. */
export const COUNTDOWN = [
  { value: '00', unit: 'วัน' },
  { value: '09', unit: 'ชั่วโมง' },
  { value: '09', unit: 'นาที' },
  { value: '57', unit: 'วินาที' },
];

/** `Quick Menu` rows one and two of `menu-nok-more-mobile Var.2` (`21086:143142`). */
export const QUICK_MENU: QuickMenuItem[][] = [
  [
    { logo: 'gp-nm-nokcash', label: 'เติมนกแคช', href: '/nok-cash' },
    { logo: 'gp-nm-nokshop', label: 'นกช็อป', href: '/nok-shop' },
    { logo: 'gp-nm-lottocheck', label: 'ตรวจสลากฯ', href: '/lotto-check' },
    { logo: 'gp-nm-affiliate', label: 'แนะนำเพื่อน', href: '/affiliate' },
    { logo: 'gp-nm-news', label: 'ข่าวสาร', href: '/news' },
  ],
  [
    { logo: 'gp-nm-nokpoint', label: 'นกพอยต์', href: '/nok-point' },
    { logo: 'gp-nm-scancheck', label: 'ฝากตรวจ', href: '/scan-check' },
    { logo: 'gp-nm-howto', label: 'วิธีการใช้งาน', href: '/how-to' },
    { logo: 'gp-nm-gift', label: 'ของขวัญ', href: '/gift' },
    { logo: 'gp-nm-service', label: 'ศูนย์ช่วยเหลือ', href: '/help' },
  ],
];

/**
 * `add-on-service` (`21086:148859`) — the two rows the instance shows.
 *
 * The third row Figma holds, `รับฝากลอตเตอรี่`, is `visible: false` on this page. It is
 * left out rather than passed disabled, because hidden is not spec.
 */
export const ADD_ON_SERVICES: AddOnService[] = [
  {
    action: { icon: 'outline-truck', label: 'จัดส่ง' },
    kicker: 'บริการ',
    name: 'การจัดส่งลอตเตอรี่',
  },
  {
    action: { icon: 'outline-Lottery-Set', label: 'สลาก 80' },
    kicker: 'บริการ',
    name: 'ซื้อสลากด้วยตนเอง',
  },
];

/** `SEO Support` (`21084:85163`), verbatim from `21084:85165` and `21084:85169`. */
export const SEO = {
  title: 'ค้นหาลอตเตอรี่ออนไลน์',
  subtitle: 'ซื้อง่ายที่ ลอตเตอรี่พลัส.com',
  lead: 'ค้นหาลอตเตอรี่ออนไลน์หมายเลขที่ต้องการแล้วซื้อได้เลย',
  body:
    'ไม่ต้องหาสลากเลขที่ต้องการตามแผงอีกต่อไป เพราะลูกค้าสามารถค้นหาลอตเตอรี่ออนไลน์เลขที่ต้องการซื้อได้เลยที่ลอตเตอรี่พลัส ' +
    'เพียงกรอกเลขสลากลงไป เรามีช่องให้กรอกเลขที่ต้องการซื้อได้ถึง 6 หลัก จากนั้นกดปุ่มค้นหาสลากกินแบ่งรัฐบาลได้ทั้งแบบเดี่ยวและแบบชุด ' +
    'แล้วเลือกลอตเตอรี่เลขที่ต้องการ หลังจากนั้นกดซื้อได้เลยทันที เพียงเท่านี้คุณก็จะมีเลขไว้ลุ้นรางวัลในทุก ๆ งวดของการออกรางวัลแล้ว',
};

/** A `Type=Set` tile, as `Lottery-1` draws it. */
const setTile = (number: string) => ({
  type: 'set' as const,
  face: TICKET_FACE,
  faceAlt: `สลากชุด เลข ${number}`,
  setSize: { label: 'เลขชุด', value: '5', unit: 'ใบ' },
  setPrize: { value: '30', unit: 'ล้าน' },
});

/** A `Type=Select` tile, as `Lottery-2` … `Lottery-4` draw it. */
const selectTile = (category: string, number: string, stock: string) => ({
  type: 'select' as const,
  face: TICKET_FACE,
  faceAlt: `สลาก ${category} ${number}`,
  category,
  number,
  stock,
  quantity: '5',
});

/**
 * The five sections of the red block, in Figma's order.
 *
 * The first has no title — a picture and a countdown head it instead — which is why
 * `LotterySection` takes a `banner` as well as a `title`.
 */
export const LOTTERY_SECTIONS: Omit<LotterySectionProps, 'banner'>[] = [
  {
    tiles: [
      setTile('123456'), setTile('234567'),
      setTile('345678'), setTile('456789'),
      setTile('567890'), setTile('678901'),
    ],
    action: { label: 'ดูเลขทั้งหมด' },
  },
  {
    title: 'เลขชุด',
    tiles: [setTile('112233'), setTile('223344'), setTile('334455'), setTile('445566')],
    action: { label: 'ดูเลขทั้งหมด' },
  },
  {
    title: 'เลขท้าย 2 ตัว',
    subtitle: 'ซื้อลอตเตอรี่ เลขท้าย 2 ตัว (คละเลขหน้า)',
    info: true,
    tiles: [
      selectTile('เลขท้าย', '39', '60'), selectTile('เลขท้าย', '39', '60'),
      selectTile('เลขท้าย', '39', '60'), selectTile('เลขท้าย', '39', '60'),
    ],
  },
  {
    title: 'เลขท้าย 3 ตัว',
    subtitle: 'ซื้อลอตเตอรี่ เลขท้าย 3 ตัว (คละเลขหน้า)',
    info: true,
    tiles: [
      selectTile('เลขท้าย', '435', '60'), selectTile('เลขท้าย', '252', '60'),
      selectTile('เลขท้าย', '634', '60'), selectTile('เลขท้าย', '854', '60'),
    ],
  },
  {
    title: 'เลขหน้า 3 ตัว',
    subtitle: 'ซื้อลอตเตอรี่ เลขหน้า 2 ตัว (คละเลขหน้า)',
    info: true,
    tiles: [
      selectTile('เลขหน้า', '252', '60'), selectTile('เลขหน้า', '747', '60'),
      selectTile('เลขหน้า', '975', '60'), selectTile('เลขหน้า', '463', '60'),
    ],
  },
];

/** `เพียง 1,000 ชุดเท่านั้น` — `21084:85075`. */
export const FLASH_SALE_NOTE = 'เพียง 1,000 ชุดเท่านั้น';
