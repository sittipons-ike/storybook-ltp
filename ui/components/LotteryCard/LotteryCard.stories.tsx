import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LotteryCard from './LotteryCard';
import { LOTTERY_CARD_SIZES, lotteryCardSizeValue, LOTTERY_CARD_SPEC } from './tokens';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  LotteryCard — Figma `Card` (14591:60095), 3 sizes.
// ═══════════════════════════════════════════

const meta: Meta<typeof LotteryCard> = {
  title: 'Components/Display/LotteryCard',
  component: LotteryCard,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export const Sizes: StoryObj = {
  name: 'Three sizes',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 760 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Card</h2>
      <p style={{ margin: '0 0 26px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
        หน้าการ์ดเป็นรูป และ Figma ใช้ <strong>คนละไฟล์ต่อขนาด</strong> ไม่ใช่ย่อรูปเดียว —
        component จึงเลือกไฟล์ให้ตรงขนาด ไม่ใช่ resize
      </p>
      <div style={{ display: 'flex', gap: 26, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {LOTTERY_CARD_SIZES.map((s) => {
          const px = lotteryCardSizeValue(s);
          return (
            <div key={s}>
              <LotteryCard size={s} id="P6176766" />
              <div style={{ fontSize: 11, fontFamily: mono, color: sys('color-text-tertiary-default'), marginTop: 8 }}>
                {s.toUpperCase()} · {px.width}×{px.height}
                {s === 's' && ' · ไม่มี id'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

export const Placement: StoryObj = {
  name: '🔍 ทำไม id ต้องระบุต่อขนาด',
  render: () => {
    const spec = (LOTTERY_CARD_SPEC as any).base;
    const td: React.CSSProperties = {
      padding: '6px 12px',
      borderBottom: `1px solid ${sys('color-background-light')}`,
      fontSize: 12,
      fontFamily: mono,
    };
    return (
      <div style={{ fontFamily: sans, maxWidth: 700, lineHeight: 1.8 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 12px' }}>id วางแบบ absolute ไม่ใช่ auto-layout</h2>
        <table style={{ borderCollapse: 'collapse', marginBottom: 20 }}>
          <tbody>
            {[
              ['L', '326×205', '(22, 165)', '6.7% / 80.5%'],
              ['M', '154×96', '(10, 72)', '6.5% / 75.0%'],
              ['S', '76×48', '—', 'Figma ไม่วาด id'],
            ].map(([a, b, c, d]) => (
              <tr key={a}>
                <td style={{ ...td, color: sys('color-primary-default'), width: 40 }}>{a}</td>
                <td style={td}>{b}</td>
                <td style={td}>{c}</td>
                <td style={{ ...td, color: sys('color-text-tertiary-default') }}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 20px' }}>
          สองขนาดวาง id คนละสัดส่วนกัน (80.5% กับ 75%) — ถ้าคำนวณจากอีกอันหนึ่งตัวหนังสือจะเลื่อน
          จึงเก็บค่าแยกต่อขนาดตามที่ Figma ระบุ
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
