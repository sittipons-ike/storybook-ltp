import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MissionListPage from './MissionList';
import AppShell from '../../../ui/patterns/AppShell/AppShell';
import DeviceFrame from '../../../ui/patterns/DeviceFrame/DeviceFrame';
import StatusBar from '../../../ui/components/StatusBar/StatusBar';
import Header from '../../../ui/components/Header/Header';
import {
  MISSIONS_CLOSED,
  MISSION_BANNER,
  MISSIONS_DONE,
  MISSIONS_OPEN,
  MISSION_EMPTY,
  MISSION_FEATURE_TITLE,
  MISSION_TABS,
} from '../fixtures';

// ═══════════════════════════════════════════
//  MSN-200 — หน้าภารกิจ · ticket T1
//
//  Design: Claude Design project b20d61e7 › `Mission Screens.dc.html`, artboards 2a · 2e.
//  Requirements: prd-dev.md v1.0 · ux-gamification.md.
//
//  Placeholders on this screen, per the ticket's Definition of Done:
//    · จำนวนสิทธิ์คงเหลือ  — TBD, รอ OPEN-08 · การ์ดบอกว่า "รอข้อมูล" แทนตัวเลข
//    · ภาพรางวัล           — ยังไม่มี artwork · ใช้กล่อง placeholder ที่บอกตัวเองว่าเป็น placeholder
//    · ขั้น STARTER        — TBD, รอ OPEN-07 · ยังไม่มีเงื่อนไขและรางวัล จึงไม่มีการ์ด
//    · วันเริ่มรอบถัดไป     — TBD, รอ OPEN-11 · empty state จึงไม่ระบุวัน (SLA-01)
//
//  รีวิวที่ความกว้าง browser ต่ำกว่า 768px — typography ของ design system ผูกกับ viewport
//  ไม่ใช่ container จอกว้างจะได้ type ขนาด desktop แล้วเทียบขนาดไม่ตรง
// ═══════════════════════════════════════════

const meta: Meta<typeof MissionListPage> = {
  title: 'Features/Gamification/Pages/MSN-200 หน้าภารกิจ',
  component: MissionListPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  /* Reviewer's note, not product copy. It used to be set in a monospace stack to say so,
     but none of those families carries Thai — the caption came out in whatever face the
     device substituted. Sitting outside the device frame already says it is not the design;
     the type only has to be legible. */
  <div
    style={{
      fontSize: 12,
      opacity: 0.6,
      marginBottom: 8,
      maxWidth: 360,
      lineHeight: 1.6,
    }}
  >
    {children}
  </div>
);

/**
 * The shell: the device status strip and the sub-page navbar with the feature name, the
 * way back, and the phoenix watermark. That header is `ui/components/Header` at
 * `variant="sub"` unchanged — the design drew it from the same component.
 *
 * No bottom tab bar. The list is reached from the home banner or the service row
 * (ENT-01 / ENT-02), not from a top-level tab.
 */
const InShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppShell
    statusBar={<StatusBar />}
    topNavbar={<Header variant="sub" phoenix title={MISSION_FEATURE_TITLE} />}
  >
    {children}
  </AppShell>
);

export const TabOpen: StoryObj = {
  name: 'MSN-201 · ทั้งหมด',
  render: () => (
    <div style={{ padding: 24 }}>
      <Caption>
        MSN-201 · เฉพาะภารกิจที่ยังทำไม่เสร็จ — ที่ทำครบแล้วย้ายไปแท็บสำเร็จแล้ว ไม่โผล่ซ้ำสองที่ ·
        การ์ดวาด progress ตามกลุ่มภารกิจ 3 แบบ (prd §6.0): บันไดมีรางวัลทุกหมุด · task เดียวเส้นเดียว ·
        2 task คนละประเภทแยกสองแถว
      </Caption>
      <DeviceFrame scroll>
        <InShell>
          <MissionListPage
            banner={MISSION_BANNER}
            bannerAlt={MISSION_FEATURE_TITLE}
            tabs={MISSION_TABS}
            activeTab="open"
            missions={MISSIONS_OPEN}
            closed={MISSIONS_CLOSED}
            empty={MISSION_EMPTY.open}
          />
        </InShell>
      </DeviceFrame>
    </div>
  ),
};

export const TabDone: StoryObj = {
  name: 'MSN-202 · สำเร็จแล้ว',
  render: () => (
    <div style={{ padding: 24 }}>
      <Caption>
        MSN-202 · ประวัติของที่จบแล้ว — ทำครบรอรับ + รับแล้ว
        ไม่มีปุ่มรับรางวัลบนการ์ด จุด claim อยู่ที่ MSN-210 เท่านั้น (MECH-05)
      </Caption>
      <DeviceFrame scroll>
        <InShell>
          <MissionListPage
            banner={MISSION_BANNER}
            bannerAlt={MISSION_FEATURE_TITLE}
            tabs={MISSION_TABS}
            activeTab="done"
            missions={MISSIONS_DONE}
            empty={MISSION_EMPTY.done}
          />
        </InShell>
      </DeviceFrame>
    </div>
  ),
};

export const Empty: StoryObj = {
  name: 'MSN-900 · ว่าง',
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <Caption>MSN-900 · แท็บทั้งหมด — ตอบว่าทำไมว่าง + ทางออก 1 ทาง (BP-03)</Caption>
        <DeviceFrame>
          <InShell>
            <MissionListPage
              banner={MISSION_BANNER}
            bannerAlt={MISSION_FEATURE_TITLE}
            tabs={MISSION_TABS}
              activeTab="open"
              missions={[]}
              empty={MISSION_EMPTY.open}
            />
          </InShell>
        </DeviceFrame>
      </div>
      <div>
        <Caption>MSN-900 · แท็บสำเร็จแล้ว — คนละเหตุผล จึงคนละข้อความและคนละ CTA</Caption>
        <DeviceFrame>
          <InShell>
            <MissionListPage
              banner={MISSION_BANNER}
            bannerAlt={MISSION_FEATURE_TITLE}
            tabs={MISSION_TABS}
              activeTab="done"
              missions={[]}
              empty={MISSION_EMPTY.done}
            />
          </InShell>
        </DeviceFrame>
      </div>
    </div>
  ),
};

export const Loading: StoryObj = {
  name: 'Loading · โหลดครั้งแรก',
  render: () => (
    <div style={{ padding: 24 }}>
      <Caption>§6.1 · skeleton รูปเดียวกับการ์ดจริง — เห็นโครงหน้าทันที ไม่ใช่จอขาว</Caption>
      <DeviceFrame>
        <InShell>
          <MissionListPage
            banner={MISSION_BANNER}
            bannerAlt={MISSION_FEATURE_TITLE}
            tabs={MISSION_TABS}
            activeTab="open"
            missions={[]}
            empty={MISSION_EMPTY.open}
            loading
          />
        </InShell>
      </DeviceFrame>
    </div>
  ),
};
