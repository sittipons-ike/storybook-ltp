import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MissionDetailPage from './MissionDetail';
import AppShell from '../../../ui/patterns/AppShell/AppShell';
import DeviceFrame from '../../../ui/patterns/DeviceFrame/DeviceFrame';
import StatusBar from '../../../ui/components/StatusBar/StatusBar';
import Header from '../../../ui/components/Header/Header';
import {
  DETAIL_CLAIMED,
  DETAIL_COMPLETED,
  DETAIL_IN_PROGRESS,
  DETAIL_OUT_OF_STOCK,
  MISSION_DETAIL_TITLE,
  type MissionDetail,
} from '../fixtures';

// ═══════════════════════════════════════════
//  MSN-210 — รายละเอียดภารกิจ · ticket T1
//
//  Design: Claude Design project b20d61e7 › `Mission Screens.dc.html`, artboards 2b–2d.
//
//  จุด claim เดียวของระบบ (MECH-05) · CTA ปุ่มเดียว 4 สถานะ · ของที่ BP-02 บังคับให้
//  อยู่เหนือปุ่ม — โควตา อายุของรางวัล เงื่อนไข — อยู่เหนือจริงทุกสถานะ
//
//  Placeholder บนหน้านี้ (ตาม DoD ของ ticket):
//    · สิทธิ์คงเหลือ · อายุของรางวัล — "รอข้อมูล" (OPEN-08 · OPEN-13) เขียนเป็น mono
//      เพื่อให้เห็นว่าเป็นช่องว่าง ไม่ใช่คำตอบ
//    · ภาพรางวัล — placeholder ที่บอกตัวเองว่าเป็น placeholder
//  ไม่มีตัวเลขวันของ `PHYSICAL` ที่ไหนเลย — SLA-01 ห้ามไว้ (AC15)
//
//  รีวิวที่ความกว้าง browser ต่ำกว่า 768px (typography ผูกกับ viewport)
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
      maxWidth: 360,
      lineHeight: 1.5,
    }}
  >
    {children}
  </div>
);

const Screen: React.FC<{ mission: MissionDetail }> = ({ mission }) => (
  <DeviceFrame scroll homeIndicator={false}>
    <AppShell
      statusBar={<StatusBar />}
      topNavbar={<Header variant="sub" phoenix title={MISSION_DETAIL_TITLE} />}
    >
      <MissionDetailPage mission={mission} />
    </AppShell>
  </DeviceFrame>
);

const CASES: { caption: string; mission: MissionDetail }[] = [
  {
    caption: 'CTA 1/4 · ยังไม่ครบเงื่อนไข — ปุ่มพาไปทำต่อ · เงื่อนไขแตกเป็น 3 ขั้น',
    mission: DETAIL_IN_PROGRESS,
  },
  {
    caption: 'CTA 2/4 · ครบแล้ว ยังไม่รับ — จุด claim เดียวของระบบ (MECH-05)',
    mission: DETAIL_COMPLETED,
  },
  {
    caption: 'CTA 3/4 · รับแล้ว — ปุ่มปิด แต่ยังมีทางไปปลายทางครบ 3 แบบ (AC7)',
    mission: DETAIL_CLAIMED,
  },
  {
    caption: 'CTA 4/4 · ของหมด — บอกเหตุผล + ทางอื่น ไม่ใช่ pattern ของ error (BP-05) · ไม่มีสถานะหมดเวลา ทุกภารกิจใช้ช่วงแคมเปญเดียวกัน',
    mission: DETAIL_OUT_OF_STOCK,
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

/** AC6 — CTA ครบทุกสถานะในที่เดียว · 4 ไม่ใช่ 5 เพราะไม่มีหมดเวลา */
export const EveryCtaState: StoryObj = {
  name: 'CTA ครบ 4 สถานะ',
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
