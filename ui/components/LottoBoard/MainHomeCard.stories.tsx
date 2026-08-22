import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MainHomeCard from './MainHomeCard';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  MainHomeCard — Figma `main-home-card` (14854:33344)
//  390×266, radius 16, 16 of padding top and bottom, #FAFAFA → #FFFFFF.
// ═══════════════════════════════════════════

const meta: Meta<typeof MainHomeCard> = {
  title: 'Organisms/LottoBoard/MainHomeCard',
  component: MainHomeCard,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Spec: React.FC<{ title: string; node: string; size: string; children: React.ReactNode }> = ({
  title,
  node,
  size,
  children,
}) => (
  <div style={{ fontFamily: sans }}>
    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{title}</div>
    <div style={{ fontFamily: mono, fontSize: 11, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
      {node} · {size}
    </div>
    <div style={{ width: 390, background: sys('color-background-light') }}>{children}</div>
  </div>
);

/**
 * The bleed is the page's red showing behind the card's top corners, not decoration:
 * `Top-BG` paints to 209 while the header stops at 201.
 */
export const Default: StoryObj = {
  name: 'type=search-card',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 24 }}>
      <Spec title="อย่างที่หน้าแรกใช้" node="21084:85041" size="390×266 · bleed 8">
        <MainHomeCard type="All" />
      </Spec>
      <Spec title="ไม่มี bleed — เทียบให้เห็น" node="—" size="มุมบนอยู่บนพื้นเทาของหน้า">
        <MainHomeCard type="All" bleed={0} />
      </Spec>
    </div>
  ),
};

/** The frame is one thing; what fills it is `SearchCard` and its own three types. */
export const BoardTypes: StoryObj = {
  name: 'สามชนิดของกระดาน',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 24 }}>
      <Spec title="All" node="I21084:85041;14854:25314" size="Type=All">
        <MainHomeCard type="All" />
      </Spec>
      <Spec title="Single" node="—" size="Type=Single">
        <MainHomeCard type="Single" />
      </Spec>
      <Spec title="Set" node="—" size="Type=Set — มี SetSelect เพิ่ม">
        <MainHomeCard type="Set" />
      </Spec>
    </div>
  ),
};

/**
 * Six of the seven variants are not built. They are the board replaced by a state, each with
 * its own illustration and copy that nobody has measured — recorded in
 * `lotto-board.json → _figma_gaps` rather than stubbed, because a variant that renders an
 * empty frame reads as done.
 */
export const NotBuilt: StoryObj = {
  name: 'อีก 6 variant ที่ยังไม่ได้ทำ',
  render: () => (
    <div style={{ fontFamily: sans, padding: 24, maxWidth: 620, lineHeight: 1.8, fontSize: 13 }}>
      <p style={{ marginTop: 0, color: sys('color-text-secondary-default') }}>
        <code style={{ fontFamily: mono }}>main-home-card</code> เป็น set 7 variant ทำแล้ว 1 —
        ที่เหลือคือกระดานถูกแทนที่ด้วยสถานะ แต่ละอันมีภาพประกอบและข้อความของตัวเองที่ยังไม่ได้วัด
        บันทึกไว้ที่ <code style={{ fontFamily: mono }}>_figma_gaps</code> ไม่ได้ทำ stub เปล่าไว้
        เพราะ variant ที่เรนเดอร์กรอบว่างจะอ่านเหมือนทำเสร็จแล้ว
      </p>
      <ul style={{ fontFamily: mono, fontSize: 12, color: sys('color-text-tertiary-default') }}>
        <li>type=sold-out — 390×478</li>
        <li>type=closed-for-service — 390×612</li>
        <li>type=maintenance — 390×660</li>
        <li>type=coming-soon — 390×612</li>
        <li>type=live-broadcast — 390×349</li>
        <li>type=end-live-broadcast — 390×349</li>
      </ul>
    </div>
  ),
};
