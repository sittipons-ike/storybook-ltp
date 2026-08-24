import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ActionBar from './ActionBar';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  ActionBar — the only component here with no Figma component set behind it.
//
//  Figma draws it once, inside the page template, under the misleading name `Navbar`.
//  The Frontend ships it as components/common/footer-button, 17 call sites.
// ═══════════════════════════════════════════

const meta: Meta<typeof ActionBar> = {
  title: 'Components/Layout/ActionBar',
  component: ActionBar,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Device: React.FC<{ children: React.ReactNode; label: string; sub?: string }> = ({
  children,
  label,
  sub,
}) => (
  <div style={{ fontFamily: sans }}>
    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{label}</div>
    {sub && (
      <div style={{ fontSize: 11, fontFamily: mono, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
        {sub}
      </div>
    )}
    <div
      style={{
        width: 390,
        border: `1px solid ${sys('color-border-accent-gray-light')}`,
        borderRadius: sys('radius-lg'),
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  </div>
);

export const Cases: StoryObj = {
  name: 'Every case',
  render: () => (
    <div style={{ fontFamily: sans, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <div style={{ maxWidth: 640 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>ActionBar</h2>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
          หน้าที่: แถบปุ่มที่ปักอยู่ขอบล่าง ใช้ slot <code style={{ fontFamily: mono }}>footer</code>{' '}
          ร่วมกับ Footer — หน้าหนึ่งมีได้อย่างใดอย่างหนึ่ง ไม่มีพร้อมกัน
        </p>
      </div>

      <Device label="Primary only" sub="แบบเดียวที่ Figma วาดไว้ · ปุ่มเต็มความกว้าง 44px">
        <ActionBar primary={{ label: 'ชำระเงิน' }} />
      </Device>

      <Device label="Primary + home indicator" sub="ตาม template หน้า Order Page — รวม 110px">
        <ActionBar primary={{ label: 'ชำระเงิน' }} homeIndicator />
      </Device>

      <Device label="Secondary + primary" sub="Figma ไม่ได้วาด · มาจาก FE (secondary กว้าง 1/3)">
        <ActionBar secondary={{ label: 'ยกเลิก' }} primary={{ label: 'ยืนยัน' }} />
      </Device>

      <Device label="With info line" sub="บรรทัดบอกยอด/คำเตือน เหนือปุ่ม">
        <ActionBar info="ยอดชำระทั้งหมด 240 บาท" primary={{ label: 'ชำระเงิน' }} />
      </Device>

      <Device label="Disabled primary">
        <ActionBar primary={{ label: 'ชำระเงิน', disabled: true }} />
      </Device>
    </div>
  ),
};

export const Provenance: StoryObj = {
  name: '⚠️ ไม่มีใน Figma',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 700, lineHeight: 1.8 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 12px' }}>ทำไม component นี้ถึงถูกสร้าง ทั้งที่ Figma ไม่มี</h2>

      <div
        style={{
          border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
          borderLeft: `3px solid ${sys('color-primary-default')}`,
          background: sys('color-primary-soft-light'),
          padding: '16px 20px',
          marginBottom: 20,
          fontSize: 13.5,
        }}
      >
        <div style={{ fontFamily: mono, fontSize: 12, marginBottom: 8 }}>หลักฐาน 3 ทาง</div>
        <div style={{ lineHeight: 2 }}>
          <strong>Figma</strong> — ไม่มี component set มีแค่ frame ที่วาดไว้ใน page template ชื่อ{' '}
          <code style={{ fontFamily: mono }}>Navbar</code> (ชื่อชวนสับสน มันไม่ใช่ navbar)
          <br />
          <strong>Frontend</strong> — <code style={{ fontFamily: mono }}>common/footer-button</code> ถูกเรียกใช้ 17 จุด
          <br />
          <strong>Standard §3.3</strong> — ใช้จริง ≥2 จุด = มีสิทธิ์เป็นของ shared
        </div>
      </div>

      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 16px' }}>
        สีของมันคือหลักฐานที่ชัดที่สุดว่า Figma เองก็มองว่ามันเป็นคนละตัวกับ footer — มันดึงจาก{' '}
        <code style={{ fontFamily: mono }}>colors/background</code> กับ{' '}
        <code style={{ fontFamily: mono }}>colors/navigation-border</code> ไม่ใช่{' '}
        <code style={{ fontFamily: mono }}>colors/top-and-footer</code> ที่ footer ใช้
      </p>

      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 16px' }}>
        ส่วนที่ยังไม่มีใครยืนยัน: <strong>layout สองปุ่ม</strong> Figma วาดแค่ปุ่มเดียวเต็มความกว้าง
        ส่วน secondary ที่กว้าง 1/3 มาจาก FE ฝั่งเดียว — ถ้าจะให้ตรงกันทั้งสองทาง Figma ต้องวาดเคสนี้เพิ่ม
      </p>

      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: 0 }}>
        ข้อเสนอ: ให้ Figma componentise ตัวนี้ แล้ว Storybook จะ verify ค่าได้เหมือน component อื่น
        ตอนนี้ verify ได้แค่บางส่วน เพราะไม่มี component ให้เทียบ
      </p>
    </div>
  ),
};
