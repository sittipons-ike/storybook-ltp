import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MissionDetailPage from './MissionDetail';
import AppShell from '../../../ui/patterns/AppShell/AppShell';
import DeviceFrame from '../../../ui/patterns/DeviceFrame/DeviceFrame';
import StatusBar from '../../../ui/components/StatusBar/StatusBar';
import Header from '../../../ui/components/Header/Header';
import {
  DETAIL_CLAIMED_COUPON,
  DETAIL_CLAIMED_NOKPOINT,
  DETAIL_CLAIMED_PHYSICAL,
  DETAIL_COMPLETED,
  DETAIL_EXPIRED,
  DETAIL_IN_PROGRESS,
  DETAIL_OUT_OF_STOCK,
  type MissionDetail,
} from '../fixtures';

// ═══════════════════════════════════════════
//  MSN-210 — รายละเอียดภารกิจ · ticket T1
//
//  จุด claim เดียวของระบบ (MECH-05). CTA ปุ่มเดียว เปลี่ยนหน้าไปตามสถานะ 5 แบบ (§4.4),
//  และของที่ BP-02 บังคับให้อยู่เหนือปุ่ม — โควตา · อายุของรางวัล · เงื่อนไข — อยู่เหนือจริง
//  ทุกสถานะ
//
//  Placeholder บนหน้านี้ (ตาม Definition of Done ของ ticket):
//    · อายุคูปอง `[X วัน]`  — TBD, รอ OPEN-13
//    · จำนวนสิทธิ์คงเหลือ    — TBD, รอ OPEN-08
//    · เงื่อนไขฉบับเต็ม      — เว้นที่ไว้ รอทีมกฎหมายรีวิว (R-03)
//  ไม่มีตัวเลขวัน/ระยะเวลาของ `PHYSICAL` ปรากฏที่ไหนเลย — SLA-01 ห้ามไว้ (AC15)
// ═══════════════════════════════════════════

const meta: Meta<typeof MissionDetailPage> = {
  title: 'Pages/Mission/MSN-210 รายละเอียดภารกิจ',
  component: MissionDetailPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 11,
      opacity: 0.6,
      marginBottom: 8,
      maxWidth: 320,
      lineHeight: 1.5,
    }}
  >
    {children}
  </div>
);

const Screen: React.FC<{ mission: MissionDetail }> = ({ mission }) => (
  /* The page's own action bar draws the home strip, so the frame must not draw a second. */
  <DeviceFrame scroll homeIndicator={false}>
    <AppShell statusBar={<StatusBar />} topNavbar={<Header variant="sub" title={mission.title} />}>
      <MissionDetailPage mission={mission} />
    </AppShell>
  </DeviceFrame>
);

const CASES: { caption: string; mission: MissionDetail }[] = [
  {
    caption: 'CTA 1/5 · ยังไม่ครบเงื่อนไข — ปุ่มพาไปทำต่อ (deep link) · เงื่อนไขแตกเป็น 2 ขั้น',
    mission: DETAIL_IN_PROGRESS,
  },
  {
    caption: 'CTA 2/5 · ครบแล้ว ยังไม่รับ — จุด claim เดียวของระบบ (MECH-05)',
    mission: DETAIL_COMPLETED,
  },
  {
    caption: 'CTA 3/5 · รับแล้ว — ลิงก์รองไป NokPoint (AC7)',
    mission: DETAIL_CLAIMED_NOKPOINT,
  },
  {
    caption: 'CTA 3/5 · รับแล้ว — ลิงก์รองไป My Coupon ที่ NokShop (AC7) · มีอายุคูปอง TBD',
    mission: DETAIL_CLAIMED_COUPON,
  },
  {
    caption: 'CTA 3/5 · รับแล้ว — ลิงก์รองไป LINE OA (AC7 · SLA-04) · ไม่มีหน้าติดตามในแอป',
    mission: DETAIL_CLAIMED_PHYSICAL,
  },
  {
    caption: 'CTA 4/5 · ของหมด — บอกเหตุผล + ทางอื่น ไม่ใช่ pattern ของ error (BP-05)',
    mission: DETAIL_OUT_OF_STOCK,
  },
  {
    caption: 'CTA 5/5 · หมดอายุ — ปิดรอบแล้ว แต่ยังมีทางออก (BP-01)',
    mission: DETAIL_EXPIRED,
  },
];

export const InProgress: StoryObj = {
  name: 'ยังไม่ครบเงื่อนไข',
  render: () => (
    <div style={{ padding: 24 }}>
      <Caption>{CASES[0].caption}</Caption>
      <Screen mission={CASES[0].mission} />
    </div>
  ),
};

export const Completed: StoryObj = {
  name: 'ครบแล้ว รอรับรางวัล',
  render: () => (
    <div style={{ padding: 24 }}>
      <Caption>{CASES[1].caption}</Caption>
      <Screen mission={CASES[1].mission} />
    </div>
  ),
};

export const ClaimedThreeWays: StoryObj = {
  name: 'รับแล้ว · ปลายทาง 3 แบบ',
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {CASES.slice(2, 5).map(({ caption, mission }) => (
        <div key={caption}>
          <Caption>{caption}</Caption>
          <Screen mission={mission} />
        </div>
      ))}
    </div>
  ),
};

export const Closed: StoryObj = {
  name: 'ของหมด · หมดอายุ',
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {CASES.slice(5).map(({ caption, mission }) => (
        <div key={caption}>
          <Caption>{caption}</Caption>
          <Screen mission={mission} />
        </div>
      ))}
    </div>
  ),
};

/** CTA ครบทั้ง 5 สถานะเรียงกัน — AC6 ขอให้เห็นครบในที่เดียว */
export const EveryCtaState: StoryObj = {
  name: 'CTA ครบ 5 สถานะ',
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {CASES.map(({ caption, mission }) => (
        <div key={caption}>
          <Caption>{caption}</Caption>
          <Screen mission={mission} />
        </div>
      ))}
    </div>
  ),
};
