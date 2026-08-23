import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MissionCard, { type MissionCardProps } from './MissionCard';

// ═══════════════════════════════════════════
//  MissionCard — every state the list can hold, side by side.
//
//  Source: prd-dev.md v1.0 AC-301 / AC-503 / §5.2 · ux-gamification.md §4.2 §4.3.
//  scope: feature — it moves to ui/components once a second feature draws one.
// ═══════════════════════════════════════════

const meta: Meta<typeof MissionCard> = {
  title: 'Pages/Mission/MissionCard',
  component: MissionCard,
  parameters: { layout: 'padded' },
};
export default meta;

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 11,
      opacity: 0.6,
      margin: '0 0 8px',
    }}
  >
    {children}
  </div>
);

const base: MissionCardProps = {
  title: 'ภารกิจว่าที่คนจะรวย',
  reward: 'กล่องข้าวร่ำรวย',
  rewardType: 'PHYSICAL',
  condition: 'สะสมครบ 50 ใบในแคมเปญนี้',
  current: 38,
  target: 50,
  milestones: [10, 25, 50],
  unit: 'ใบ',
  daysLeft: 9,
  stockLeft: 500,
};

const CASES: { caption: string; props: MissionCardProps }[] = [
  {
    caption: 'IN_PROGRESS — ครบทั้ง 5 อย่างตาม AC-301',
    props: base,
  },
  {
    caption: 'IN_PROGRESS + PENDING — §5.2.1 SET-01 · เห็นความคืบหน้า แต่ยังไม่นับว่าได้',
    props: {
      ...base,
      reward: '20 นกพอยต์',
      rewardType: 'NOKPOINT',
      title: 'ภารกิจพิชิตใจจิ๊ดริด',
      condition: 'ซื้อ 3 งวดติด + ลองจิ๊ดริด 1 ประเภท',
      current: 2,
      pending: 1,
      target: 3,
      milestones: [1, 2, 3],
      unit: 'งวด',
      stockLeft: undefined,
    },
  },
  {
    caption: 'IN_PROGRESS · ยังไม่เริ่ม — ไม่มีโควตา จึงไม่มีบรรทัดโควตา',
    props: {
      ...base,
      reward: 'โค้ดส่วนลด Thaimart 300 บาท',
      rewardType: 'E_COUPON',
      title: 'ภารกิจศิษย์เอกจิ๊ดริด',
      condition: 'ซื้อ 6 งวดติด + จิ๊ดริดครบ 3 ประเภท',
      current: 0,
      target: 6,
      milestones: [2, 4, 6],
      unit: 'งวด',
      stockLeft: undefined,
    },
  },
  {
    caption: 'COMPLETED — บอกว่าครบแล้ว และให้กดเข้าไปรับ · ไม่มีปุ่มรับบนการ์ด (MECH-05)',
    props: { ...base, state: 'COMPLETED' },
  },
  {
    caption: 'CLAIMED — จบแล้ว เหลือไว้เป็นประวัติ',
    props: { ...base, state: 'CLAIMED', daysLeft: undefined, stockLeft: undefined },
  },
  {
    caption: 'OUT_OF_STOCK — §4.2 แสดงแบบ disabled ไม่ซ่อน · BP-05 บอกเหตุผล ไม่ใช่ error',
    props: {
      ...base,
      reward: 'iPhone 18 Pro',
      title: 'ภารกิจจักรพรรดิ',
      condition: 'สะสมครบ 20,000 ใบในแคมเปญนี้',
      state: 'OUT_OF_STOCK',
      target: 20000,
      stockLeft: 0,
    },
  },
  {
    caption: 'EXPIRED — หมดเวลา · ยังอยู่ในรายการเช่นกัน',
    props: {
      ...base,
      reward: '100 นกพอยต์',
      rewardType: 'NOKPOINT',
      title: 'ภารกิจเชียร์สด',
      condition: 'ดูไลฟ์ประกาศรางวัลที่ 1 ครบ 1 นาที',
      state: 'EXPIRED',
      current: 0,
      target: 1,
      unit: 'ครั้ง',
      milestones: undefined,
      daysLeft: undefined,
      stockLeft: undefined,
    },
  },
];

export const EveryState: StoryObj = {
  name: 'ทุก state',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 390 }}>
      {CASES.map(({ caption, props }) => (
        <div key={caption}>
          <Caption>{caption}</Caption>
          <MissionCard {...props} onOpen={() => {}} />
        </div>
      ))}
    </div>
  ),
};

export const RewardTypes: StoryObj = {
  name: 'รางวัล 3 ชนิด (§2.1.1)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 390 }}>
      <Caption>NOKPOINT · E_COUPON · PHYSICAL — เครื่องหมายบอกชนิดรางวัล ไม่ใช่ภาพสินค้า</Caption>
      <MissionCard {...base} reward="10 นกพอยต์" rewardType="NOKPOINT" title="ภารกิจคนน่ารัก" condition="ซื้อลอตเตอรี่ 2 งวดติดกัน" current={1} target={2} milestones={[1, 2]} unit="งวด" stockLeft={undefined} />
      <MissionCard {...base} reward="บัตรสตาร์บัคส์ 500 บาท" rewardType="E_COUPON" title="ภารกิจเศรษฐีมือใหม่" condition="สะสมครบ 200 ใบในแคมเปญนี้" target={200} milestones={[50, 100, 200]} />
      <MissionCard {...base} />
    </div>
  ),
};
