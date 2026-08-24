import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ProfileSummary from './ProfileSummary';
import { PROFILE_SUMMARY } from './tokens';
import Text from '../Text/Text';
import Button from '../Button/Button';
import Logo from '../../logos/Logo';
import Stack from '../../patterns/Stack/Stack';
import Surface from '../../patterns/Surface/Surface';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  ProfileSummary — Figma `header-profile` (15006:92124)
//
//  One variant, type=default. Read 2026-08-21.
// ═══════════════════════════════════════════

const meta: Meta<typeof ProfileSummary> = {
  title: 'Components/Layout/ProfileSummary',
  component: ProfileSummary,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Figma's `nokcash-profile` — drawn here rather than imported, because it is not a component yet. */
const Balance: React.FC = () => (
  <Stack direction="row" align="center" justify="space-between" gap="2xl">
    <Stack direction="row" align="center" gap="lg" style={{ width: 'auto' }}>
      <Surface radius="lg" elevation="none" padding="none" clip style={{ width: 'auto' }}>
        <div style={{ width: 76, height: 48, background: sys('color-primary-default') }} />
      </Surface>
      <Stack gap="none" style={{ width: 'auto' }}>
        <Text role="body-md-medium" tone="secondary">นกแคชของฉัน</Text>
        <Text role="title-lg-semibold" tone="primary">2,000,000</Text>
      </Stack>
    </Stack>
    <Button variant="secondary" size="lg">เติมนกแคช</Button>
  </Stack>
);

/** Figma's `summary-icon-profile`, three times. Also not a component yet. */
const COUNTERS: { logo: string; value: string; unit: string }[] = [
  { logo: 'gp-nokpoints-1', value: '500', unit: 'นกพอยต์' },
  { logo: 'gp-lottery', value: '10', unit: 'สลากของฉัน' },
  { logo: 'gp-coupon', value: '20', unit: 'คูปองส่วนลด' },
];

const Counters: React.FC = () => (
  <Stack direction="row" align="center" justify="space-between" gap="xl">
    {COUNTERS.map((c) => (
      <Stack key={c.unit} direction="row" align="center" gap="sm" style={{ width: 'auto' }}>
        <Logo name={c.logo} alt="" size={32} />
        <Stack gap="none" style={{ width: 'auto' }}>
          <Text role="title-lg-semibold" tone="primary">{c.value}</Text>
          <Text role="button-xs-medium" tone="tertiary">{c.unit}</Text>
        </Stack>
      </Stack>
    ))}
  </Stack>
);

// ═══════════════════════════════════════════
export const Default: StoryObj = {
  name: 'The block',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 390 }}>
      <div style={{ fontSize: 11, fontFamily: mono, marginBottom: 8 }}>
        390×187 · 16 + 80 + 1 + 74 + 16
      </div>
      <ProfileSummary balance={<Balance />} counters={<Counters />} />
    </div>
  ),
};

// ═══════════════════════════════════════════
export const Anatomy: StoryObj = {
  name: '🔍 What Figma states',
  render: () => {
    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: '8px 12px',
      fontSize: 11,
      fontWeight: 600,
      color: sys('color-text-tertiary-default'),
      borderBottom: `2px solid ${sys('color-border-accent-gray-soft-light')}`,
    };
    const td: React.CSSProperties = {
      padding: '8px 12px',
      borderBottom: `1px solid ${sys('color-background-light')}`,
      fontSize: 12.5,
      verticalAlign: 'top',
    };
    const rows: [string, string, string][] = [
      ['block', '390×187 · hug', 'padding 16 · radius 0/0/24/24 · brand red'],
      ['upper card', '358×80', 'radius 16/16/0/0 · white · 3px gold edge on the TOP side only'],
      ['the rule', '358×1', 'no fill — one pixel of the block’s red, dashed over in white 4/4'],
      ['lower card', '358×74', 'radius 0/0/16/16 · white · no border on any side'],
      ['gap between them', '0', 'the three stack flush; the seam IS the rule'],
      ['nokcash-profile', '326×48', 'a 76×48 card · 14/22 label over a 16/24 figure · 101×44 button'],
      ['summary-icon-profile', '92×42 ×3', '32px logo · gap 4 · 16/24 figure over a 10/18 unit · SPACE_BETWEEN'],
    ];
    return (
      <div style={{ fontFamily: sans, maxWidth: 760 }}>
        <p style={{ fontSize: 13, lineHeight: 1.7, marginTop: 0 }}>
          เส้นคั่นในกล่องนี้ <strong>ไม่ใช่เส้นสีแดง</strong> — Figma วาดแถบสูง 1px ที่ปล่อยให้พื้นแดงของบล็อกทะลุขึ้นมา
          แล้วขีดเส้นประ<strong>สีขาว</strong> 4/4 ทับ สิ่งที่ตาเห็นเป็นเส้นประสีแดง เพราะช่องว่างระหว่างขีดคือสีแดง
          ตอนแรก library แปลเป็นเส้นประขาวบนการ์ดขาว — ค่าถูกทุกตัว แต่มองไม่เห็นอะไรเลย
        </p>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={th}>ส่วน</th>
              <th style={th}>ขนาด</th>
              <th style={th}>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b, c]) => (
              <tr key={a}>
                <td style={{ ...td, fontFamily: mono }}>{a}</td>
                <td style={{ ...td, fontFamily: mono }}>{b}</td>
                <td style={td}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 12.5, lineHeight: 1.7, color: sys('color-text-secondary-default') }}>
          <strong>ยังขาด:</strong> Figma ทำ <code style={{ fontFamily: mono }}>nokcash-profile</code> และ{' '}
          <code style={{ fontFamily: mono }}>summary-icon-profile</code> เป็น component set แล้ว แต่ library
          ยังไม่มี — ตอนนี้ส่งเข้ามาทาง slot <code style={{ fontFamily: mono }}>balance</code> กับ{' '}
          <code style={{ fontFamily: mono }}>counters</code> แล้วหน้า Profile วาดเอง บันทึกไว้ใน
          component-inventory.json
        </p>
        <pre style={{ fontFamily: mono, fontSize: 11.5, lineHeight: 1.8, margin: 0 }}>
          {Object.entries(PROFILE_SUMMARY)
            .map(([k, v]) => `${k.padEnd(14)} ${v}`)
            .join('\n')}
        </pre>
      </div>
    );
  },
};
