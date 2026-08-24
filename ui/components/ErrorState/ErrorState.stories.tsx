import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ErrorState from './ErrorState';
import { ERROR_STATE_SPEC } from './tokens';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  ErrorState — Figma `noti-error` (15170:101685), 4 variants.
//  On the logos-and-graphics page, but not artwork: an arrangement.
// ═══════════════════════════════════════════

const meta: Meta<typeof ErrorState> = {
  title: 'Components/Feedback/ErrorState',
  component: ErrorState,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Frame: React.FC<{ label: string; sub: string; children: React.ReactNode }> = ({
  label,
  sub,
  children,
}) => (
  <div style={{ fontFamily: sans }}>
    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 11, fontFamily: mono, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
      {sub}
    </div>
    <div
      style={{
        width: 390,
        padding: `${sys('spacing-5xl')} 0`,
        background: sys('color-background-default'),
        border: `1px solid ${sys('color-border-accent-gray-light')}`,
        borderRadius: sys('radius-lg'),
      }}
    >
      {children}
    </div>
  </div>
);

export const States: StoryObj = {
  name: 'All four states',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 900 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>noti-error</h2>
      <p style={{ margin: '0 0 26px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 660 }}>
        ข้อความทั้งหมดมาจาก Figma ตรงๆ — component นี้ไม่ได้เก็บ copy ไว้เอง ผู้เรียกส่งเข้ามา
      </p>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <Frame label="a-lot-of-users" sub="390×476 · gp-jidrit-lot-of-users">
          <ErrorState
            type="lotOfUsers"
            title="ขออภัย"
            body={'ขณะนี้มีผู้ใช้งานเป็นจำนวนมาก\nกรุณาลองอีกครั้ง'}
            primary={{ label: 'กรุณาลองใหม่อีกครั้ง' }}
          />
        </Frame>
        <Frame label="error-occurred" sub="390×476 · gp-jidrit-error-occurred">
          <ErrorState
            type="errorOccurred"
            title="ขออภัย เกิดข้อผิดพลาด"
            body="ไม่พบหน้าที่คุณต้องการ กรุณาตรวจสอบและลองใหม่อีกครั้ง"
            primary={{ label: 'กรุณาลองใหม่อีกครั้ง' }}
          />
        </Frame>
        <Frame label="system-down" sub="390×476 · gp-jidrit-system-down">
          <ErrorState
            type="systemDown"
            title="ขออภัย ระบบขัดข้อง"
            body={'ขณะนี้มีผู้เข้าชมเป็นจำนวนมาก\nกรุณาลองอีกครั้ง'}
            primary={{ label: 'กรุณาลองใหม่อีกครั้ง' }}
          />
        </Frame>
        <Frame label="internet error" sub="390×384 · ใช้ภาพเดียวกับ system-down">
          <ErrorState
            type="internet"
            title="เกิดข้อผิดพลาด"
            body={'โปรดตรวจสอบการเชื่อต่ออินเตอร์เน็ต\nของคุณแล้วลองใหม่อีกครั้ง'}
            primary={{ label: 'กรุณาลองใหม่อีกครั้ง' }}
            secondary={{ label: 'ข้าม' }}
          />
        </Frame>
      </div>
    </div>
  ),
};

export const NotArtwork: StoryObj = {
  name: '🔍 อยู่หน้ารูป แต่ไม่ใช่รูป',
  render: () => {
    const spec = (ERROR_STATE_SPEC as any).base;
    return (
      <div style={{ fontFamily: sans, maxWidth: 720, lineHeight: 1.8 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 12px' }}>ทำไมถึงเป็น component ไม่ใช่ asset</h2>
        <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 18px' }}>
          `noti-error` อยู่หน้า <code style={{ fontFamily: mono }}>logos-and-graphics</code> เลยดูเหมือนรูป
          แต่พอเปิดดูข้างในคือ <strong>การจัดวาง</strong> ล้วนๆ — ทุกชิ้นเป็นของที่ไลบรารีมีอยู่แล้ว
          ไม่มีอะไรต้องวาดใหม่เลย
        </p>
        <div
          style={{
            border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
            borderLeft: `3px solid ${sys('color-primary-default')}`,
            background: sys('color-primary-soft-light'),
            padding: '16px 20px',
            marginBottom: 20,
            fontFamily: mono,
            fontSize: 12,
            lineHeight: 2,
          }}
        >
          390 กว้าง · pad 0/16 · gap 24
          <br />
          &nbsp;&nbsp;├ Logo 280 &nbsp;&nbsp;&nbsp;&nbsp;← มีใน manifest แล้ว
          <br />
          &nbsp;&nbsp;├ title + body &nbsp;← display/xl-semb + body/m-reg
          <br />
          &nbsp;&nbsp;└ ActionBar &nbsp;&nbsp;&nbsp;← bottom-action-bar2
        </div>
        <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 20px' }}>
          <strong>รูปคือ asset · เลย์เอาต์คือ component</strong> — เส้นแบ่งอยู่ตรงนี้ ภาพประกอบทั้ง 3 อยู่ใน{' '}
          <code style={{ fontFamily: mono }}>assets/logos</code> ส่วนวิธีวางมันอยู่ในไฟล์นี้
        </p>

        <h3 style={{ fontSize: 15, margin: '0 0 8px' }}>ค้างที่ฝั่ง Figma</h3>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.9, color: sys('color-text-secondary-default') }}>
          {Object.values(spec._figma_gaps as Record<string, string>).map((g) => (
            <li key={g} style={{ marginBottom: 6 }}>
              {g}
            </li>
          ))}
        </ul>
      </div>
    );
  },
};
