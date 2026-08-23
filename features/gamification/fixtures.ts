import type { MissionCardProps, MissionClosedCardProps } from './components/MissionCard';

import missionBanner from './assets/mission-banner.png';
import rewardNokpoint from './assets/reward-nokpoint.png';
import rewardVoucher from './assets/reward-voucher.png';
import rewardStarbucks from './assets/reward-starbucks.png';
import rewardBento from './assets/reward-bento.png';
import rewardHeadphones from './assets/reward-headphones.png';
import rewardLuggage from './assets/reward-luggage.png';
import rewardAppleWatch from './assets/reward-apple-watch.png';
import rewardDyson from './assets/reward-dyson.png';
import rewardIphone from './assets/reward-iphone.png';

/**
 * Reward artwork, supplied by the team 2026-08-23 and downsampled to 320px.
 *
 * It is campaign data, not design material — a new round swaps every picture while the
 * frame around it stays — so it arrives through this file and the components take it as a
 * prop. The files are imported rather than served from a static directory, so a missing
 * one is a build error instead of a hole on a phone.
 *
 * Three things worth knowing before these ship:
 *   · `nokpoint` has "+100 Point" drawn into the artwork, and §6.1 pays 10 and 20 points.
 *     A card that says 10 นกพอยต์ beside a picture saying +100 contradicts itself, which
 *     is exactly what value INTEGRITY rules out. It is used here because it is the only
 *     point artwork there is — a plain coin, or one per denomination, closes it.
 *   · `iphone` is a photograph of an iPhone **17** Pro; §6.2 lists the reward as an
 *     iPhone 18 Pro. Flagged rather than quietly relabelled.
 *   · `dyson` arrived named `amplifyer.png`; the picture is the Dyson Purifier Big+Quiet
 *     that §6.2 names, so it is filed under what it shows.
 */
export const REWARD = {
  nokpoint: rewardNokpoint,
  voucher: rewardVoucher,
  starbucks: rewardStarbucks,
  bento: rewardBento,
  headphones: rewardHeadphones,
  luggage: rewardLuggage,
  appleWatch: rewardAppleWatch,
  dyson: rewardDyson,
  iphone: rewardIphone,
} as const;

/**
 * Designer state for the mission feature.
 *
 * Missions, rewards and conditions are rows of prd-dev.md v1.0 §6.1 (FREQUENCY) and §6.2
 * (VOLUME), verbatim. The tier names in those tables are internal and never appear here —
 * MECH-02 keeps the word out of the UI entirely.
 *
 * The moment in the campaign — counts, days left, which mission is where — comes from the
 * Claude Design file `Mission Screens.dc.html` (project b20d61e7, 2026-08-23), so the
 * built screens and the design show the same story.
 *
 * Nothing here invents a number the product has not settled: quotas are a flag rather than
 * a count (OPEN-08), reward lifetimes read "รอข้อมูล" (OPEN-13), and no date is given for
 * the next round (OPEN-11).
 */

export interface Mission extends MissionCardProps {
  id: string;
}

export interface ClosedMission extends MissionClosedCardProps {
  id: string;
}

/** MSN-201 · tab ทั้งหมด — every state a live mission can be in, in reading order (§4.2). */
export const MISSIONS_OPEN: Mission[] = [
  {
    id: 'freq-lovely',
    name: 'ภารกิจคนน่ารัก',
    reward: '10 นกพอยต์',
    kind: 'นกพอยต์',
    image: REWARD.nokpoint,
    cond: 'ซื้อลอตเตอรี่ 2 งวดติดกัน',
    current: 2,
    target: 2,
    marks: [1, 2],
    unit: 'งวด',
    tone: 'ready',
    statusLabel: 'ทำครบ รอรับรางวัล',
    daysLabel: 'เหลืออีก 12 วัน',
  },
  {
    id: 'vol-beginner',
    name: 'ภารกิจว่าที่คนจะรวย',
    reward: 'กล่องข้าวร่ำรวย',
    kind: 'ของส่งถึงบ้าน',
    image: REWARD.bento,
    cond: 'สะสมครบ 50 ใบในแคมเปญนี้',
    current: 38,
    target: 50,
    marks: [10, 25, 40, 50],
    unit: 'ใบ',
    tone: 'doing',
    statusLabel: 'กำลังทำอยู่',
    daysLabel: 'เหลืออีก 9 วัน',
    quota: true,
  },
  {
    id: 'freq-jidrid-fan',
    name: 'ภารกิจพิชิตใจจิ๊ดริด',
    reward: '20 นกพอยต์',
    kind: 'นกพอยต์',
    image: REWARD.nokpoint,
    cond: 'ซื้อ 3 งวดติด + ลองจิ๊ดริด 1 ประเภท',
    current: 2,
    target: 3,
    marks: [1, 2, 3],
    unit: 'งวด',
    // §5.2.1 SET-01 — the third round is counted but not settled, so it shows and does
    // not complete the mission.
    tone: 'pending',
    statusLabel: 'กำลังตรวจสอบยอด · 1 งวดยังไม่ยืนยัน',
    daysLabel: 'เหลืออีก 4 วัน',
  },
  {
    id: 'vol-easy',
    name: 'ภารกิจเศรษฐีมือใหม่',
    reward: 'บัตรสตาร์บัคส์ 500 บาท',
    kind: 'คูปอง',
    image: REWARD.starbucks,
    cond: 'สะสมครบ 200 ใบในแคมเปญนี้',
    current: 120,
    target: 200,
    marks: [50, 100, 150, 200],
    unit: 'ใบ',
    tone: 'doing',
    statusLabel: 'กำลังทำอยู่',
    daysLabel: 'เหลืออีก 9 วัน',
    quota: true,
  },
  {
    id: 'freq-master',
    name: 'ภารกิจศิษย์เอกจิ๊ดริด',
    reward: 'โค้ดส่วนลด Thaimart 300 บาท',
    kind: 'คูปอง',
    image: REWARD.voucher,
    cond: 'ซื้อ 6 งวดติด + จิ๊ดริดครบ 3 ประเภท',
    current: 0,
    target: 6,
    marks: [2, 4, 6],
    unit: 'งวด',
    tone: 'idle',
    statusLabel: 'ยังไม่เริ่ม',
    daysLabel: 'เหลืออีก 9 วัน',
    quota: true,
  },
  {
    id: 'vol-very-hard',
    name: 'ภารกิจเจ้าสัว',
    reward: 'Apple Watch',
    kind: 'ของส่งถึงบ้าน',
    image: REWARD.appleWatch,
    cond: 'สะสมครบ 3,000 ใบในแคมเปญนี้',
    current: 0,
    target: 3000,
    marks: [500, 1500, 3000],
    unit: 'ใบ',
    tone: 'idle',
    statusLabel: 'ยังไม่เริ่ม',
    daysLabel: 'เหลืออีก 9 วัน',
    quota: true,
  },
  {
    id: 'freq-regular',
    name: 'ภารกิจขาประจำตัวตึง',
    reward: 'โค้ดส่วนลด Thaimart 100 บาท',
    kind: 'คูปอง',
    image: REWARD.voucher,
    cond: 'ซื้อ 4 งวดติด + ลองจิ๊ดริด 2 ประเภท',
    current: 4,
    target: 4,
    marks: [2, 3, 4],
    unit: 'งวด',
    tone: 'claimed',
    statusLabel: 'รับรางวัลแล้ว',
  },
];

/** §4.2 — still on the list, greyed. Hiding them reads as the system having lost them. */
export const MISSIONS_CLOSED: ClosedMission[] = [
  {
    id: 'vol-normal-out',
    name: 'ภารกิจเศรษฐีป้ายแดง',
    reward: 'หูฟัง Sony',
    cond: 'สะสมครบ 500 ใบในแคมเปญนี้',
    statusLabel: 'ของรางวัลหมดแล้ว',
  },
  {
    id: 'vol-hard-expired',
    name: 'ภารกิจเศรษฐีประจำงวด',
    reward: 'กระเป๋าเดินทาง',
    cond: 'สะสมครบ 1,000 ใบในแคมเปญนี้',
    statusLabel: 'หมดเวลาแล้ว',
  },
];

/** MSN-202 · tab สำเร็จแล้ว — what is finished, waiting or collected. */
export const MISSIONS_DONE: Mission[] = [
  MISSIONS_OPEN[0],
  MISSIONS_OPEN[6],
];

// ═══════════════════════════════════════════
//  MSN-210 — รายละเอียดภารกิจ
// ═══════════════════════════════════════════

/** A rung of a compound condition. `done` · `wait` (in progress) · `todo` (not reached). */
export interface MissionStep {
  state: 'done' | 'wait' | 'todo';
  text: string;
  meta: string;
}

/**
 * A line in "สิ่งที่ต้องรู้ก่อนกด". `pending` marks a value the product has not settled:
 * it renders as a machine value so a reviewer cannot mistake it for a real answer.
 */
export interface MissionFact {
  label: string;
  value: string;
  pending?: boolean;
}

export interface MissionDetail {
  name: string;
  reward: string;
  kind: MissionCardProps['kind'];
  image: string;
  /** The eyebrow above the reward — the type, plus where it lands when there is room. */
  kindLabel: string;
  campaignWindow: string;

  progress?: {
    current: number;
    target: number;
    marks: number[];
    unit: string;
    /** "เหลืออีก 12 ใบ · เหลืออีก 9 วัน" — what is left, in both currencies. */
    note: string;
  };
  /** Shown instead of the progress card once the mission is finished. */
  banner?: { title: string; body: string };

  steps: MissionStep[];
  facts: MissionFact[];
  terms: string;

  cta: { label: string; disabled?: boolean };
  /** AC7 — where the reward actually lives, once it has been claimed. */
  links?: string[];
}

const CAMPAIGN = 'ช่วงแคมเปญ 1 ส.ค. – 30 ก.ย. 2569';

/** CTA 1/5 — ยังไม่ครบเงื่อนไข */
export const DETAIL_IN_PROGRESS: MissionDetail = {
  name: 'ภารกิจว่าที่คนจะรวย',
  reward: 'กล่องข้าวร่ำรวย',
  kind: 'ของส่งถึงบ้าน',
  image: REWARD.bento,
  kindLabel: 'ของส่งถึงบ้าน',
  campaignWindow: CAMPAIGN,
  progress: {
    current: 38,
    target: 50,
    marks: [10, 25, 40, 50],
    unit: 'ใบ',
    note: 'เหลืออีก 12 ใบ · เหลืออีก 9 วัน',
  },
  steps: [
    { state: 'done', text: 'สะสมลอตเตอรี่ในแคมเปญนี้ครบ 25 ใบ', meta: 'ผ่านแล้ว' },
    { state: 'wait', text: 'สะสมต่อให้ครบ 40 ใบ', meta: 'ตอนนี้ 38 ใบ · เหลืออีก 2 ใบ' },
    { state: 'todo', text: 'สะสมต่อให้ครบ 50 ใบ', meta: 'เหลืออีก 12 ใบ' },
  ],
  facts: [
    { label: 'สิทธิ์คงเหลือ', value: 'รอข้อมูล', pending: true },
    { label: 'อายุของรางวัลหลังกดรับ', value: 'รอข้อมูล', pending: true },
    { label: 'การจัดส่ง', value: 'กรอกที่อยู่แล้วทีมงานติดต่อกลับ' },
  ],
  terms:
    'รางวัลนับตามยอดที่ยืนยันแล้วในแคมเปญนี้เท่านั้น · หนึ่งบัญชีรับรางวัลนี้ได้ 1 ครั้ง · ถ้าระบบนับยอดผิด บริษัทรับผิดชอบและแก้ให้',
  cta: { label: 'ไปทำภารกิจ' },
};

/** CTA 2/5 — ครบแล้ว ยังไม่รับ · จุด claim เดียวของระบบ (MECH-05) */
export const DETAIL_COMPLETED: MissionDetail = {
  name: 'ภารกิจคนน่ารัก',
  reward: '10 นกพอยต์',
  kind: 'นกพอยต์',
  image: REWARD.nokpoint,
  kindLabel: 'นกพอยต์ · เข้าบัญชีทันที',
  campaignWindow: CAMPAIGN,
  banner: { title: 'ทำครบแล้ว 2/2 งวด', body: 'ยอดทั้งสองงวดยืนยันแล้ว' },
  steps: [
    { state: 'done', text: 'ซื้อลอตเตอรี่งวด 1 ส.ค. 2569', meta: 'ยืนยันยอดแล้ว' },
    { state: 'done', text: 'ซื้อลอตเตอรี่งวด 16 ส.ค. 2569', meta: 'ยืนยันยอดแล้ว' },
  ],
  facts: [
    { label: 'สิทธิ์คงเหลือ', value: 'รอข้อมูล', pending: true },
    { label: 'ปลายทางของรางวัล', value: 'เข้าบัญชีนกพอยต์ทันทีที่กดรับ' },
    { label: 'ต้องกดรับภายใน', value: 'รอข้อมูล', pending: true },
  ],
  terms: 'นกพอยต์ที่ได้ใช้ได้ตามเงื่อนไขนกพอยต์เดิมของแอป · หนึ่งบัญชีรับรางวัลนี้ได้ 1 ครั้ง',
  cta: { label: 'รับรางวัล' },
};

/** CTA 3/5 — รับแล้ว · AC7 ปลายทางครบ 3 แบบ */
export const DETAIL_CLAIMED: MissionDetail = {
  ...DETAIL_COMPLETED,
  banner: { title: 'รับรางวัลแล้ว', body: 'แต้มเข้าบัญชีนกพอยต์เรียบร้อย' },
  facts: [
    { label: 'ปลายทางของรางวัล', value: 'เข้าบัญชีนกพอยต์แล้ว' },
  ],
  terms: 'ของที่รับแล้วดูได้จากที่เดิมของแอป · ถ้ายอดไม่เข้า ทักไปที่ LINE OA ได้เลย',
  cta: { label: 'รับรางวัลแล้ว', disabled: true },
  links: ['ไปดูนกพอยต์', 'ไปที่คูปองของฉัน', 'สอบถามที่ LINE OA'],
};

/** CTA 4/5 — ของหมด */
export const DETAIL_OUT_OF_STOCK: MissionDetail = {
  name: 'ภารกิจเศรษฐีป้ายแดง',
  reward: 'หูฟัง Sony',
  kind: 'ของส่งถึงบ้าน',
  image: REWARD.headphones,
  kindLabel: 'ของส่งถึงบ้าน',
  campaignWindow: CAMPAIGN,
  progress: {
    current: 120,
    target: 500,
    marks: [100, 250, 400, 500],
    unit: 'ใบ',
    note: 'ยอดที่สะสมไว้ยังอยู่ · แต่รางวัลนี้หมดแล้ว',
  },
  steps: [{ state: 'wait', text: 'สะสมลอตเตอรี่ในแคมเปญนี้ครบ 500 ใบ', meta: 'ตอนนี้ 120 ใบ' }],
  facts: [{ label: 'สิทธิ์คงเหลือ', value: '0 สิทธิ์' }],
  terms: 'ภารกิจนี้ปิดรับรางวัลแล้วในรอบนี้ · รอบถัดไปเริ่มเมื่อไหร่ยังไม่ยืนยัน',
  cta: { label: 'ของรางวัลหมดแล้ว', disabled: true },
  links: ['ดูภารกิจอื่น'],
};

/** CTA 5/5 — หมดอายุ */
export const DETAIL_EXPIRED: MissionDetail = {
  name: 'ภารกิจเศรษฐีประจำงวด',
  reward: 'กระเป๋าเดินทาง',
  kind: 'ของส่งถึงบ้าน',
  image: REWARD.luggage,
  kindLabel: 'ของส่งถึงบ้าน',
  campaignWindow: 'ช่วงแคมเปญ สิ้นสุด 30 ก.ย. 2569',
  progress: {
    current: 240,
    target: 1000,
    marks: [250, 500, 750, 1000],
    unit: 'ใบ',
    note: 'รอบนี้ปิดแล้ว',
  },
  steps: [{ state: 'todo', text: 'สะสมลอตเตอรี่ในแคมเปญนี้ครบ 1,000 ใบ', meta: 'ปิดรอบที่ 240 ใบ' }],
  facts: [{ label: 'ช่วงแคมเปญ', value: 'สิ้นสุด 30 ก.ย. 2569' }],
  terms: 'ยอดที่สะสมไว้ในรอบนี้ไม่ถูกยกไปรอบถัดไป · รอบถัดไปเริ่มเมื่อไหร่ยังไม่ยืนยัน',
  cta: { label: 'หมดเวลาแล้ว', disabled: true },
  links: ['ดูภารกิจอื่น'],
};

// ═══════════════════════════════════════════
//  หน้าและสถานะร่วม
// ═══════════════════════════════════════════

/**
 * The campaign banner at the top of the list. Artwork, and campaign artwork at that — the
 * next round replaces it — so it travels with the fixtures like the reward shots do.
 * 1560x480 as supplied, downsampled to 1170 (3x of the 390 it renders at).
 */
export const MISSION_BANNER = missionBanner;

export const MISSION_FEATURE_TITLE = 'ภารกิจคนจะรวย';
export const MISSION_DETAIL_TITLE = 'รายละเอียดภารกิจ';

/** AC-302 — two tabs, and no reward tab (MECH-05). */
export const MISSION_TABS = [
  { key: 'open', label: 'ทั้งหมด' },
  { key: 'done', label: 'สำเร็จแล้ว' },
] as const;

/**
 * MSN-900 — BP-03 / AC-202: say why it is empty, and what to do next. The two tabs are
 * empty for different reasons, so they say different things and offer different ways out.
 */
export const MISSION_EMPTY = {
  open: {
    title: 'ยังไม่มีภารกิจในรอบนี้',
    body: 'รอบนี้ยังไม่มีภารกิจเปิดให้ทำ พอเปิดรอบใหม่จะขึ้นที่หน้านี้',
    note: 'วันที่รอบถัดไปเริ่ม · รอข้อมูล',
    action: 'กลับหน้าแรก',
  },
  done: {
    title: 'ยังไม่มีภารกิจที่สำเร็จ',
    body: 'ภารกิจที่ทำครบแล้วจะมาอยู่ที่แท็บนี้',
    action: 'ดูภารกิจทั้งหมด',
  },
} as const;
