import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MissionListPage from './MissionList';
import AppShell from '../../../ui/patterns/AppShell/AppShell';
import DeviceFrame from '../../../ui/patterns/DeviceFrame/DeviceFrame';
import StatusBar from '../../../ui/components/StatusBar/StatusBar';
import Header from '../../../ui/components/Header/Header';
import {
  MISSIONS_DONE,
  MISSIONS_OPEN,
  MISSION_EMPTY,
  MISSION_FEATURE_TITLE,
  MISSION_TABS,
} from '../fixtures';

// ═══════════════════════════════════════════
//  MSN-200 — หน้าภารกิจ · ticket T1
//
//  Built from features/gamification/prd-dev.md v1.0 and ux-gamification.md. No Figma
//  frame stands behind it — the mock was taken out of scope on 2026-08-23.
//
//  Placeholders on this screen, per the ticket's Definition of Done:
//    · จำนวนสิทธิ์คงเหลือ  — TBD, รอ OPEN-08 (โควตาต่อรางวัลยังเป็น TBD ทั้งคอลัมน์)
//    · ขั้น STARTER        — TBD, รอ OPEN-07 · ยังไม่มีเงื่อนไขและรางวัล จึงไม่มีการ์ด
//    · วันเริ่มรอบถัดไป     — TBD, รอ OPEN-11 · empty state จึงไม่ระบุวัน (SLA-01)
//
//  Each tab is its own story rather than a click, because a review has to see both at once.
// ═══════════════════════════════════════════

const meta: Meta<typeof MissionListPage> = {
  title: 'Pages/Mission/MSN-200 หน้าภารกิจ',
  component: MissionListPage,
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

/**
 * The shell the page sits in: the device status strip and the sub-page navbar carrying the
 * feature name and the way back.
 *
 * No bottom tab bar. The mission list is reached from the home banner or the service row
 * (ENT-01 / ENT-02), not from a top-level tab, and drawing one would promise a destination
 * the app does not have.
 */
const InShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppShell
    statusBar={<StatusBar />}
    topNavbar={<Header variant="sub" title={MISSION_FEATURE_TITLE} />}
  >
    {children}
  </AppShell>
);

export const TabOpen: StoryObj = {
  name: 'MSN-201 · ทั้งหมด',
  render: () => (
    <div style={{ padding: 24 }}>
      <Caption>
        MSN-201 · เรียงตาม §4.2 — ใกล้สำเร็จ → ใกล้หมดเวลา → ยังไม่เริ่ม → ของหมด/หมดอายุ (disabled ไม่ซ่อน)
      </Caption>
      <DeviceFrame scroll>
        <InShell>
          <MissionListPage
            tabs={MISSION_TABS}
            activeTab="open"
            missions={MISSIONS_OPEN}
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
        MSN-202 · ประวัติภารกิจที่จบแล้ว · ไม่มีปุ่มรับรางวัลบนการ์ด — จุด claim อยู่ที่ MSN-210 เท่านั้น (MECH-05)
      </Caption>
      <DeviceFrame scroll>
        <InShell>
          <MissionListPage
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

/** Every state of the screen side by side — the review view. */
export const EveryState: StoryObj = {
  name: 'ทุก state เรียงกัน',
  render: () => {
    const cases = [
      { caption: 'MSN-201 · ทั้งหมด', tab: 'open', missions: MISSIONS_OPEN, empty: MISSION_EMPTY.open, loading: false },
      { caption: 'MSN-202 · สำเร็จแล้ว', tab: 'done', missions: MISSIONS_DONE, empty: MISSION_EMPTY.done, loading: false },
      { caption: 'MSN-900 · ทั้งหมด ว่าง', tab: 'open', missions: [], empty: MISSION_EMPTY.open, loading: false },
      { caption: 'MSN-900 · สำเร็จแล้ว ว่าง', tab: 'done', missions: [], empty: MISSION_EMPTY.done, loading: false },
      { caption: 'Loading', tab: 'open', missions: [], empty: MISSION_EMPTY.open, loading: true },
    ];

    return (
      <div style={{ padding: 24, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {cases.map(({ caption, tab, missions, empty, loading }) => (
          <div key={caption}>
            <Caption>{caption}</Caption>
            <DeviceFrame scroll>
              <InShell>
                <MissionListPage
                  tabs={MISSION_TABS}
                  activeTab={tab}
                  missions={missions}
                  empty={empty}
                  loading={loading}
                />
              </InShell>
            </DeviceFrame>
          </div>
        ))}
      </div>
    );
  },
};
