import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Alert from './Alert';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  Alert — no Figma component. From the Frontend's common/alert.
//  One call site, kept because the Lark Standard §3.4 lists it as canonical.
// ═══════════════════════════════════════════

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export const Default: StoryObj = {
  name: 'Alert',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 560 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>alert</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        ไม่มีใน Figma — ตรวจแล้ว 2026-08-20 สร้างจาก FE ตามกฎที่แก้ไว้
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Alert
          title="ยังยืนยันตัวตนไม่สำเร็จ"
          description="กรุณายืนยันตัวตนก่อนทำรายการซื้อสลาก"
        />
        <Alert title="หัวข้ออย่างเดียว ไม่มีคำอธิบาย" />
      </div>
    </div>
  ),
};

export const WhyNotToast: StoryObj = {
  name: 'ทำไมไม่รวมกับ Toast',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 620 }}>
      <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        inventory เคยตั้งข้อสงสัยว่า alert อาจถูกแทนที่ด้วย toast แล้ว — คำตอบคือคนละตัว
      </p>
      <table style={{ borderCollapse: 'collapse', fontSize: 13, width: '100%' }}>
        <thead>
          <tr>
            {['', 'Toast', 'Alert'].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderBottom: `2px solid ${sys('color-border-accent-gray-light')}`,
                  fontFamily: mono,
                  fontSize: 11,
                  color: sys('color-text-tertiary-default'),
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['อายุ', 'ชั่วคราว หายเอง', 'อยู่ถาวรในหน้า'],
            ['ตำแหน่ง', 'ลอยมุมจอ ซ้อนกันได้', 'อยู่ใน flow ของฟอร์ม'],
            ['ชนิด', '4 แบบ (info/success/warning/error)', 'แบบเดียว — warning'],
            ['ปิดได้', 'มีปุ่มปิด', 'ปิดไม่ได้'],
          ].map(([label, toast, alert]) => (
            <tr key={label}>
              <td style={{ padding: '8px 12px', fontFamily: mono, fontSize: 11 }}>{label}</td>
              <td style={{ padding: '8px 12px' }}>{toast}</td>
              <td style={{ padding: '8px 12px' }}>{alert}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ margin: '20px 0 0', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        รวมกันแปลว่า component เดียวมีสอง lifecycle
      </p>
    </div>
  ),
};

export const TokenChain: StoryObj = {
  name: 'สีที่ FE hardcode = สีของระบบ',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 620 }}>
      <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        FE เขียน <code style={{ fontFamily: mono }}>border-[#EAB308] bg-[#FEFCE8]</code> ตรงๆ
        ซึ่งตรงกับ role ที่ระบบมีชื่ออยู่แล้วทุกไบต์ — overlay เลยผูก role ไม่ใช่ copy hex
      </p>
      {[
        ['#EAB308', 'status.warning.default', 'color-status-warning-default'],
        ['#FEFCE8', 'status.warning.soft-light', 'color-status-warning-soft-light'],
      ].map(([hex, role, token]) => (
        <div key={hex} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: sys('radius-md'),
              background: sys(token),
              border: `1px solid ${sys('color-border-accent-gray-light')}`,
            }}
          />
          <code style={{ fontFamily: mono, fontSize: 12 }}>{hex}</code>
          <span style={{ color: sys('color-text-tertiary-default') }}>→</span>
          <code style={{ fontFamily: mono, fontSize: 12 }}>{role}</code>
        </div>
      ))}
    </div>
  ),
};
