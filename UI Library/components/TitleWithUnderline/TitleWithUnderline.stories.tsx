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
        Figma: <code style={{ fontFamily: mono }}>Head</code> (23599:392870) หน้า carts — เส้น{' '}
        <strong>ซ้อนกันสองเส้น</strong> แดงใต้ตัวอักษรกว้างเท่าคำ แล้วเทา{' '}
        <code style={{ fontFamily: mono }}>border.accent.gray-light</code> เต็มความกว้างอยู่ใต้ลงไปอีกชั้น
      </p>
      <p style={{ margin: '0 0 24px', padding: '12px 14px', fontSize: 13, lineHeight: 1.7,
                  background: sys('color-status-warning-soft-light'),
                  borderLeft: `3px solid ${sys('color-status-warning-default')}`,
                  color: sys('color-text-secondary-default') }}>
        เคยบันทึกไว้ว่า Figma ไม่มีตัวนี้ — <strong>ผิด</strong> ตอนนั้นค้นแต่ใน token mirror
        ซึ่งเก็บเฉพาะกลุ่มสี frame ที่ไม่มีกลุ่มสีของตัวเองจึงไม่มีทางโผล่ · ของเดิมที่สร้างจาก FE
        วางเส้นแดงกับเส้นเทา<strong>เรียงข้างกันบนเส้นเดียว</strong> ซึ่งคนละโครงกับ Figma
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
