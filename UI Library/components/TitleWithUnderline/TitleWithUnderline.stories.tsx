import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TitleWithUnderline from './TitleWithUnderline';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  TitleWithUnderline — no Figma component. From the Frontend's
//  common/title-with-underline, 12 call sites.
// ═══════════════════════════════════════════

const meta: Meta<typeof TitleWithUnderline> = {
  title: 'Molecules/TitleWithUnderline',
  component: TitleWithUnderline,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: mono, fontSize: 11, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
    {children}
  </div>
);

export const Tones: StoryObj = {
  name: 'Tones',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 520 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>title-with-underline</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        ไม่มีใน Figma — ตรวจแล้ว 2026-08-20 สร้างจาก FE (12 ที่ใช้) เส้นสองท่อน:
        ใต้ตัวอักษรเป็น <code style={{ fontFamily: mono }}>border.primary</code> ที่เหลือเป็น{' '}
        <code style={{ fontFamily: mono }}>border.secondary</code> ทั้งคู่ห่างจากเนื้อหา 4px
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <Caption>tone=secondary · ค่าเริ่มต้น</Caption>
          <TitleWithUnderline title="รายการสลากของฉัน" />
        </div>
        <div>
          <Caption>tone=primary</Caption>
          <TitleWithUnderline title="รายการสลากของฉัน" tone="primary" />
        </div>
        <div>
          <Caption>มี icon นำหน้า</Caption>
          <TitleWithUnderline
            title="ตู้เซฟของฉัน"
            icon={<Icon name="outline-safe" size="md" color="inherit" />}
          />
        </div>
        <div>
          <Caption>หัวข้อยาว — เส้นแดงยาวตามตัวอักษร ไม่ตัดบรรทัด</Caption>
          <TitleWithUnderline title="ประวัติการทำรายการทั้งหมดของบัญชีนี้" tone="primary" />
        </div>
      </div>
    </div>
  ),
};
