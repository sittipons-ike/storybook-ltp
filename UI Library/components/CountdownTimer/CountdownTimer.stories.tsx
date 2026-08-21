import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CountdownTimer from './CountdownTimer';
import { TIMER_TONES } from './tokens';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  CountdownTimer — no Figma component. From the Frontend's
//  common/notification/timer + useCountdown. One call site, kept because the
//  PRD's 24-hour reservation flow runs on it.
// ═══════════════════════════════════════════

const meta: Meta<typeof CountdownTimer> = {
  title: 'Atoms/CountdownTimer',
  component: CountdownTimer,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Stories must not read the clock at render time, so every target is an offset. */
const inMinutes = (n: number) => Date.now() + n * 60_000;

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: mono, fontSize: 11, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
    {children}
  </div>
);

export const Tones: StoryObj = {
  name: 'Tones',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 560 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>countdown-timer</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        ไม่มีใน Figma — ตรวจแล้ว 2026-08-20 สร้างจาก FE ตามกฎที่แก้ไว้ FE แยกเป็น boolean สามตัว
        (<code style={{ fontFamily: mono }}>isFloated</code> ·{' '}
        <code style={{ fontFamily: mono }}>isRedBackground</code> ·{' '}
        <code style={{ fontFamily: mono }}>isSideBarColor</code>) ที่ขัดกันเองได้ — ที่นี่รวมเป็นแกนเดียว{' '}
        <code style={{ fontFamily: mono }}>tone</code> เพราะทุกที่ใช้จริงเลือกได้แค่อันเดียวอยู่แล้ว
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {TIMER_TONES.map((tone) => (
          <div key={tone}>
            <Caption>tone={tone}</Caption>
            <div
              style={{
                display: 'inline-flex',
                padding: sys('spacing-lg'),
                borderRadius: sys('radius-lg'),
                background: tone === 'default' ? sys('color-background-gray-soft-light') : undefined,
                border: `1px solid ${sys('color-border-accent-gray-light')}`,
              }}
            >
              <CountdownTimer expiresAt={inMinutes(95)} tone={tone} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Floating: StoryObj = {
  name: 'floating — ห้อยบนการ์ด',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 560 }}>
      <p style={{ margin: '0 0 24px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        FE ห่อด้วย <code style={{ fontFamily: mono }}>notification</code> ที่ทั้งตัวมีแค่{' '}
        <code style={{ fontFamily: mono }}>relative flex flex-col items-center</code> — เป็น
        positioning context ซึ่งเป็นหน้าที่ของผู้เรียก ไม่ใช่ component เลยไม่ยกมา
        ตัว floating ส่ง <code style={{ fontFamily: mono }}>position:absolute</code> อย่างเดียว
        ระยะ inset ผู้เรียกกำหนดเอง
      </p>

      <div style={{ display: 'flex', gap: 24 }}>
        {(['default', 'red'] as const).map((tone) => (
          <div key={tone} style={{ position: 'relative', width: 200 }}>
            <Caption>floating · tone={tone}</Caption>
            <div style={{ position: 'relative' }}>
              <CountdownTimer
                expiresAt={inMinutes(23 * 60)}
                tone={tone}
                floating
                style={{ left: '50%', transform: 'translateX(-50%)', top: -18 }}
              />
              <div
                style={{
                  height: 96,
                  borderRadius: sys('radius-lg'),
                  border: `1px solid ${sys('color-border-accent-gray-light')}`,
                  background: sys('color-background-soft-light'),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Expired: StoryObj = {
  name: 'หมดเวลา',
  render: () => (
    <div style={{ fontFamily: sans }}>
      <Caption>expiresAt อยู่ในอดีต — clamp ที่ศูนย์ ไม่ติดลบ</Caption>
      <CountdownTimer expiresAt={inMinutes(-120)} tone="red" />
    </div>
  ),
};
