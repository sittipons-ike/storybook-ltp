import type { MissionCardProps, MissionState } from './components/MissionCard';

/**
 * Designer state for the mission feature.
 *
 * Every mission below is a row of prd-dev.md v1.0 §6.1 (FREQUENCY) or §6.2 (VOLUME) —
 * name, condition and reward verbatim. The tier names in those tables are internal and
 * never appear here, because MECH-02 forbids the word reaching the UI at all.
 *
 * What is invented, and marked as such:
 *   `current` / `pending` / `daysLeft` — a plausible moment in the campaign, so the states
 *   have something to draw. No document fixes them.
 *   `stockLeft` — dummy. Quotas are TBD across the board (OPEN-08); the number is here to
 *   prove the slot exists, not to be believed.
 */

export interface Mission extends MissionCardProps {
  id: string;
}

/** OPEN-08 — every quota in §6.2 is still TBD. These stand in for the shape, not the size. */
const TBD_STOCK = { new_rich: 500, round_rich: 120, tycoon: 40, magnate: 8, emperor: 3 };

/**
 * §6.1 FREQUENCY — the Jidrid ladder. "Jidrid ≥N ประเภท" counts distinct box sizes
 * (JID-01), so the condition line says ประเภท, never ครั้ง.
 *
 * ⚠️ The ladder is missing its first rung: OPEN-07 (ขั้น STARTER, จบในงวดเดียว) has no
 * condition and no reward yet, and it is the rung the 72% would actually clear. Nothing is
 * invented for it here — an empty slot is the honest way to show a gap.
 */
export const FREQUENCY_MISSIONS: Mission[] = [
  {
    id: 'freq-lovely',
    title: 'ภารกิจคนน่ารัก',
    reward: '10 นกพอยต์',
    rewardType: 'NOKPOINT',
    condition: 'ซื้อลอตเตอรี่ 2 งวดติดกัน',
    current: 1,
    target: 2,
    milestones: [1, 2],
    unit: 'งวด',
    daysLeft: 9,
  },
  {
    id: 'freq-jidrid-fan',
    title: 'ภารกิจพิชิตใจจิ๊ดริด',
    reward: '20 นกพอยต์',
    rewardType: 'NOKPOINT',
    condition: 'ซื้อ 3 งวดติด + ลองจิ๊ดริด 1 ประเภท',
    current: 2,
    pending: 1,
    target: 3,
    milestones: [1, 2, 3],
    unit: 'งวด',
    daysLeft: 9,
  },
  {
    id: 'freq-regular',
    title: 'ภารกิจขาประจำตัวตึง',
    reward: 'โค้ดส่วนลด Thaimart 100 บาท',
    rewardType: 'E_COUPON',
    condition: 'ซื้อ 4 งวดติด + ลองจิ๊ดริด 2 ประเภท',
    current: 1,
    target: 4,
    milestones: [1, 2, 3, 4],
    unit: 'งวด',
    daysLeft: 9,
  },
  {
    id: 'freq-master',
    title: 'ภารกิจศิษย์เอกจิ๊ดริด',
    reward: 'โค้ดส่วนลด Thaimart 300 บาท',
    rewardType: 'E_COUPON',
    condition: 'ซื้อ 6 งวดติด + จิ๊ดริดครบ 3 ประเภท',
    current: 0,
    target: 6,
    milestones: [2, 4, 6],
    unit: 'งวด',
    daysLeft: 9,
  },
];

/** §6.2 VOLUME — counted in tickets over the campaign. */
export const VOLUME_MISSIONS: Mission[] = [
  {
    id: 'vol-beginner',
    title: 'ภารกิจว่าที่คนจะรวย',
    reward: 'กล่องข้าวร่ำรวย',
    rewardType: 'PHYSICAL',
    condition: 'สะสมครบ 50 ใบในแคมเปญนี้',
    current: 38,
    target: 50,
    milestones: [10, 25, 50],
    unit: 'ใบ',
    daysLeft: 9,
    stockLeft: TBD_STOCK.new_rich,
  },
  {
    id: 'vol-easy',
    title: 'ภารกิจเศรษฐีมือใหม่',
    reward: 'บัตรสตาร์บัคส์ 500 บาท',
    rewardType: 'E_COUPON',
    condition: 'สะสมครบ 200 ใบในแคมเปญนี้',
    current: 38,
    target: 200,
    milestones: [50, 100, 200],
    unit: 'ใบ',
    daysLeft: 9,
    stockLeft: TBD_STOCK.round_rich,
  },
  {
    id: 'vol-normal',
    title: 'ภารกิจเศรษฐีป้ายแดง',
    reward: 'หูฟัง Sony',
    rewardType: 'PHYSICAL',
    condition: 'สะสมครบ 500 ใบในแคมเปญนี้',
    current: 38,
    target: 500,
    milestones: [200, 350, 500],
    unit: 'ใบ',
    daysLeft: 9,
    stockLeft: TBD_STOCK.tycoon,
  },
  {
    id: 'vol-hard',
    title: 'ภารกิจเศรษฐีประจำงวด',
    reward: 'กระเป๋าเดินทาง',
    rewardType: 'PHYSICAL',
    condition: 'สะสมครบ 1,000 ใบในแคมเปญนี้',
    current: 38,
    target: 1000,
    milestones: [500, 750, 1000],
    unit: 'ใบ',
    daysLeft: 9,
    stockLeft: TBD_STOCK.magnate,
  },
];

/**
 * MSN-201 — tab ทั้งหมด.
 *
 * Order is §4.2, applied by `sortMissions` rather than hand-arranged, so the rule is the
 * thing being reviewed and not one lucky arrangement of it.
 */
export const MISSIONS_OPEN: Mission[] = [
  ...FREQUENCY_MISSIONS,
  ...VOLUME_MISSIONS,
  {
    id: 'vol-legend-out',
    title: 'ภารกิจจักรพรรดิ',
    reward: 'iPhone 18 Pro',
    rewardType: 'PHYSICAL',
    condition: 'สะสมครบ 20,000 ใบในแคมเปญนี้',
    state: 'OUT_OF_STOCK',
    current: 38,
    target: 20000,
    unit: 'ใบ',
    daysLeft: 9,
    stockLeft: 0,
  },
  {
    id: 'engage-live-expired',
    title: 'ภารกิจเชียร์สด',
    reward: '100 นกพอยต์',
    rewardType: 'NOKPOINT',
    condition: 'ดูไลฟ์ประกาศรางวัลที่ 1 ครบ 1 นาที',
    state: 'EXPIRED',
    current: 0,
    target: 1,
    unit: 'ครั้ง',
  },
];

/** MSN-202 — tab สำเร็จแล้ว. Both endings the tab can hold: waiting to claim, and claimed. */
export const MISSIONS_DONE: Mission[] = [
  {
    id: 'freq-lovely-done',
    title: 'ภารกิจคนน่ารัก',
    reward: '10 นกพอยต์',
    rewardType: 'NOKPOINT',
    condition: 'ซื้อลอตเตอรี่ 2 งวดติดกัน',
    state: 'COMPLETED',
    daysLeft: 9,
    stockLeft: TBD_STOCK.new_rich,
  },
  {
    id: 'engage-follow-done',
    title: 'ภารกิจกดติดตามเพจ',
    reward: '50 นกพอยต์',
    rewardType: 'NOKPOINT',
    condition: 'กดติดตามเพจนกพลัส',
    state: 'CLAIMED',
  },
  {
    id: 'vol-beginner-done',
    title: 'ภารกิจว่าที่คนจะรวย',
    reward: 'กล่องข้าวร่ำรวย',
    rewardType: 'PHYSICAL',
    condition: 'สะสมครบ 50 ใบในแคมเปญนี้',
    state: 'CLAIMED',
  },
];

/**
 * §4.2 — near the finish first (goal-gradient), then near the deadline, then untouched,
 * then the ones that are closed, which stay visible and greyed rather than disappearing.
 */
const GROUP: Record<MissionState, number> = {
  COMPLETED: 0,
  IN_PROGRESS: 0,
  CLAIMED: 1,
  EXPIRED: 3,
  OUT_OF_STOCK: 3,
};

export const sortMissions = (missions: Mission[]): Mission[] =>
  [...missions].sort((a, b) => {
    const ga = GROUP[a.state ?? 'IN_PROGRESS'];
    const gb = GROUP[b.state ?? 'IN_PROGRESS'];
    if (ga !== gb) return ga - gb;

    const share = (m: Mission) => (m.target ? (m.current ?? 0) / m.target : 0);
    const started = (m: Mission) => (share(m) > 0 ? 0 : 1);
    if (started(a) !== started(b)) return started(a) - started(b);
    if (share(a) !== share(b)) return share(b) - share(a);

    return (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity);
  });

/** The feature's own name, from user-flow.md's entry points. */
export const MISSION_FEATURE_TITLE = 'ภารกิจคนจะรวย';

/** AC-302 — two tabs, and no reward tab (MECH-05). */
export const MISSION_TABS = [
  { key: 'open', label: 'ทั้งหมด' },
  { key: 'done', label: 'สำเร็จแล้ว' },
] as const;

/**
 * MSN-900 — BP-03 / AC-202: an empty state answers why it is empty and what to do next.
 * The next-round date is left out on purpose: OPEN-11 has not set the campaign window, and
 * SLA-01 forbids showing a date nobody has confirmed.
 */
export const MISSION_EMPTY = {
  open: {
    title: 'ยังไม่มีภารกิจในรอบนี้',
    body: 'ภารกิจรอบใหม่จะเปิดพร้อมงวดถัดไป\nระหว่างนี้ซื้อลอตเตอรี่สะสมไว้ได้เลย',
    action: 'กลับหน้าแรก',
  },
  done: {
    title: 'ยังไม่มีภารกิจที่สำเร็จ',
    body: 'ทำภารกิจในแท็บทั้งหมดให้ครบเงื่อนไข\nแล้วกลับมารับรางวัลที่นี่',
    action: 'ดูภารกิจทั้งหมด',
  },
} as const;

// ═══════════════════════════════════════════
//  MSN-210 — รายละเอียดภารกิจ
//
//  The detail screen carries everything the card could not: the sub-steps a compound
//  condition breaks into (§4.4 "แตกเป็นขั้นย่อย ถ้ามี"), the quota, how long the reward
//  itself lasts, and the terms that come with its type.
// ═══════════════════════════════════════════

/** One rung of a compound condition — §6.1's missions are all "ซื้อ N งวด + จิ๊ดริด M ประเภท". */
export interface MissionStep {
  label: string;
  current: number;
  target: number;
  unit?: string;
  /** Counted but not settled yet (§5.2.1 SET-01). */
  pending?: number;
}

export interface MissionDetail extends Mission {
  /** ช่วงเวลาแคมเปญ — a real window, not an SLA. §4.4 puts it in the hero. */
  campaignWindow: string;
  steps?: MissionStep[];
  /**
   * How long the reward lasts once claimed. OPEN-13 has not set it, so the placeholder
   * stays visible and labelled rather than being quietly dropped — §2.2 moved this line
   * here when onboarding was deferred, and BP-10 says the screen has to explain itself.
   */
  rewardValidity?: string;
  /** The terms that belong to this reward type. Shown above the CTA (BP-02 / BP-06). */
  terms: string[];
  /** What "ไปทำภารกิจ" should say and where it goes, per mission. */
  actionLabel?: string;
}

/** §2.1.1 — the terms differ by reward type, so they are written per type, not shared. */
const TERMS: Record<'NOKPOINT' | 'E_COUPON' | 'PHYSICAL', string[]> = {
  NOKPOINT: [
    'แต้มเข้าบัญชีนกพอยต์เดิมของคุณทันทีที่กดรับ',
    '1 ภารกิจ รับได้ 1 สิทธิ์ต่อ 1 บัญชี ต่อ 1 แคมเปญ',
  ],
  E_COUPON: [
    'กดรับแล้วระบบจะพาไปที่คูปองของฉันใน NokShop',
    'คูปองใช้ได้ครั้งเดียว และไม่แลกเปลี่ยนเป็นเงินสด',
    '1 ภารกิจ รับได้ 1 สิทธิ์ต่อ 1 บัญชี ต่อ 1 แคมเปญ',
  ],
  PHYSICAL: [
    'กดรับแล้วกรอกที่อยู่จัดส่ง ทีมงานจะติดต่อกลับตามข้อมูลที่ให้ไว้',
    'หากติดต่อไม่ได้ตามข้อมูลที่ให้ไว้ ถือว่าสละสิทธิ์',
    'ของรางวัลมีจำนวนจำกัด หมดแล้วหมดเลย และไม่แลกเปลี่ยนเป็นเงินสด',
    '1 ภารกิจ รับได้ 1 สิทธิ์ต่อ 1 บัญชี ต่อ 1 แคมเปญ',
  ],
};

const CAMPAIGN_WINDOW = '1 – 30 กันยายน 2569';

/** OPEN-13 — nobody has set how long a coupon lives. The bracket is the ticket's own
 *  placeholder, kept visible so the gap is reviewed rather than forgotten. */
const COUPON_VALIDITY = 'ใช้ได้ภายใน [X วัน] หลังกดรับ · TBD รอ OPEN-13';

const detail = (
  mission: Mission,
  extra: Omit<MissionDetail, keyof Mission | 'campaignWindow' | 'terms'> &
    Partial<Pick<MissionDetail, 'campaignWindow' | 'terms'>>,
): MissionDetail => ({
  ...mission,
  campaignWindow: CAMPAIGN_WINDOW,
  terms: TERMS[mission.rewardType],
  ...extra,
});

const byId = (id: string): Mission => {
  const found = [...MISSIONS_OPEN, ...MISSIONS_DONE].find((m) => m.id === id);
  if (!found) throw new Error(`fixtures: no mission ${id}`);
  return found;
};

/** ยังไม่ครบเงื่อนไข — CTA พาไปทำต่อ */
export const DETAIL_IN_PROGRESS: MissionDetail = detail(byId('freq-jidrid-fan'), {
  steps: [
    { label: 'ซื้อลอตเตอรี่ต่อเนื่อง 3 งวด', current: 2, pending: 1, target: 3, unit: 'งวด' },
    { label: 'ลองจิ๊ดริดหยิบโชคอย่างน้อย 1 ประเภท', current: 0, target: 1, unit: 'ประเภท' },
  ],
  actionLabel: 'ไปลองจิ๊ดริดหยิบโชค',
});

/** ครบแล้ว ยังไม่รับ — จุด claim เดียวของระบบ (MECH-05) */
export const DETAIL_COMPLETED: MissionDetail = detail(
  { ...byId('vol-beginner'), state: 'COMPLETED', current: 50 },
  {
    steps: [{ label: 'ซื้อลอตเตอรี่สะสมครบ 50 ใบ', current: 50, target: 50, unit: 'ใบ' }],
    rewardValidity: 'ทีมงานจะติดต่อกลับตามข้อมูลที่ให้ไว้',
  },
);

/** รับแล้ว — ต้องมีทางไปปลายทางของรางวัลชนิดนั้น (AC7) */
export const DETAIL_CLAIMED_NOKPOINT: MissionDetail = detail(
  { ...byId('freq-lovely'), state: 'CLAIMED', current: 2 },
  { steps: [{ label: 'ซื้อลอตเตอรี่ต่อเนื่อง 2 งวด', current: 2, target: 2, unit: 'งวด' }] },
);

export const DETAIL_CLAIMED_COUPON: MissionDetail = detail(
  { ...byId('vol-easy'), state: 'CLAIMED', current: 200 },
  {
    steps: [{ label: 'ซื้อลอตเตอรี่สะสมครบ 200 ใบ', current: 200, target: 200, unit: 'ใบ' }],
    rewardValidity: COUPON_VALIDITY,
  },
);

export const DETAIL_CLAIMED_PHYSICAL: MissionDetail = detail(
  { ...byId('vol-beginner'), state: 'CLAIMED', current: 50 },
  { steps: [{ label: 'ซื้อลอตเตอรี่สะสมครบ 50 ใบ', current: 50, target: 50, unit: 'ใบ' }] },
);

/** ของหมด — เงื่อนไขไม่ผ่าน ไม่ใช่ระบบพัง (BP-05) */
export const DETAIL_OUT_OF_STOCK: MissionDetail = detail(byId('vol-legend-out'), {
  steps: [{ label: 'ซื้อลอตเตอรี่สะสมครบ 20,000 ใบ', current: 38, target: 20000, unit: 'ใบ' }],
});

/** หมดอายุ */
export const DETAIL_EXPIRED: MissionDetail = detail(byId('engage-live-expired'), {
  steps: [{ label: 'ดูไลฟ์ประกาศรางวัลที่ 1 ต่อเนื่อง 1 นาที', current: 0, target: 1, unit: 'ครั้ง' }],
});
