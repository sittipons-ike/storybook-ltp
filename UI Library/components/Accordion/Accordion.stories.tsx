import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Accordion from './Accordion';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  Accordion — canonical in the Lark Standard §3.4, absent from Figma.
//  From the Frontend's common/accordion, 3 call sites.
// ═══════════════════════════════════════════

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      margin: 0,
      padding: `${sys('spacing-lg')} 0`,
      fontSize: sys('type-body-md-regular-size'),
      lineHeight: sys('type-body-md-regular-line-height'),
      color: sys('color-text-secondary-default'),
    }}
  >
    {children}
  </p>
);

export const Default: StoryObj = {
  name: 'ปิด / เปิด',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 520 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>accordion</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        Standard §3.4 บอกว่า <code style={{ fontFamily: mono }}>accordion-item</code> เป็น molecule
        มาตรฐาน แต่ Figma ไม่มี — ช่องว่างอยู่ฝั่ง Figma ไม่ใช่ฝั่งไลบรารี สร้างจาก FE (3 ที่ใช้)
        เนื้อหา mount/unmount ไม่ animate ความสูง ตามที่ FE ทำ
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Accordion title="เงื่อนไขการรับรางวัล">
          <Body>ผู้ถูกรางวัลต้องนำสลากฉบับจริงมาแสดงภายใน 2 ปีนับจากวันที่ออกรางวัล</Body>
        </Accordion>
        <Accordion title="วิธีการชำระเงิน" defaultOpen>
          <Body>รองรับพร้อมเพย์ บัตรเครดิต และนกแคช — เปิดค้างไว้ด้วย defaultOpen</Body>
        </Accordion>
      </div>
    </div>
  ),
};

export const Controlled: StoryObj = {
  name: 'Controlled — เปิดได้ทีละอัน',
  render: () => {
    const Inner = () => {
      const [openKey, setOpenKey] = useState<string | null>('a');
      const items = [
        { key: 'a', title: 'สลากคืออะไร', body: 'สลากกินแบ่งรัฐบาลออกโดยสำนักงานสลากฯ' },
        { key: 'b', title: 'ซื้อได้กี่ใบ', body: 'ไม่จำกัดจำนวน แต่ต้องยืนยันตัวตนก่อน' },
        { key: 'c', title: 'ขึ้นเงินอย่างไร', body: 'ขึ้นเงินผ่านแอปได้ทันทีเมื่อผลออก' },
      ];
      return (
        <div style={{ fontFamily: sans, maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {items.map((item) => (
            <Accordion
              key={item.key}
              title={item.title}
              open={openKey === item.key}
              onOpenChange={(next) => setOpenKey(next ? item.key : null)}
            >
              <Body>{item.body}</Body>
            </Accordion>
          ))}
        </div>
      );
    };
    return <Inner />;
  },
};
