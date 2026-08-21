import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BottomSheet from './BottomSheet';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import {
  bottomSheetTokenNames,
  bottomSheetValue,
  BOTTOM_SHEET_UNUSED_TOKENS,
  BOTTOM_SHEET_SPEC,
  DISMISS_THRESHOLD,
} from './tokens';
import { sys } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  BottomSheet — Lotteryplus Design System
//  Figma group: colors/bottom sheet (5 tokens)
//
//  Built 2026-08-17. Mobile-first product, so a sheet is a primary interaction
//  surface — five real Frontend usages cleared the Standard's evidence bar.
// ═══════════════════════════════════════════

const meta: Meta<typeof BottomSheet> = {
  title: 'Organisms/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    showHandle: { control: 'boolean' },
    showScrim: { control: 'boolean' },
  },
  parameters: { layout: 'fullscreen' },
};

export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/**
 * Every demo renders inside a phone-sized frame with `contained`, so the sheet is
 * positioned against that box rather than the Storybook viewport. A sheet shown
 * full-viewport in a docs page covers the docs.
 */
const Phone: React.FC<{ children: React.ReactNode; height?: number }> = ({
  children,
  height = 460,
}) => (
  <div
    style={{
      position: 'relative',
      width: 360,
      height,
      overflow: 'hidden',
      borderRadius: sys('radius-2xl'),
      border: `1px solid ${sys('color-border-accent-gray-light')}`,
      background: sys('color-background-light'),
      fontFamily: sans,
    }}
  >
    {children}
  </div>
);

const Backdrop: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: 20, fontSize: 13, color: sys('color-text-tertiary-default') }}>
    <div style={{ fontSize: 15, fontWeight: 600, color: sys('color-text-secondary-default') }}>
      หน้าเลือกเลข
    </div>
    <p style={{ lineHeight: 1.7 }}>
      เนื้อหาของหน้าอยู่ด้านหลัง sheet — ลากที่แถบด้านบนลงมาเกิน {DISMISS_THRESHOLD}px
      หรือแตะพื้นหลัง หรือกด Esc เพื่อปิด
    </p>
    {children}
  </div>
);

export const Default: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <Phone>
        <Backdrop>
          <Button variant="primary" size="md" onClick={() => setOpen(true)}>
            เปิด sheet
          </Button>
        </Backdrop>
        <BottomSheet open={open} onClose={() => setOpen(false)} contained title="เลือกงวด">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>เลือกงวด</div>
            {['16 มี.ค. 2568', '1 มี.ค. 2568', '16 ก.พ. 2568'].map((d) => (
              <div
                key={d}
                style={{
                  padding: '12px 14px',
                  borderRadius: sys('radius-lg'),
                  background: sys('color-background-soft-light'),
                  fontSize: 14,
                }}
              >
                {d}
              </div>
            ))}
          </div>
        </BottomSheet>
      </Phone>
    );
  },
};

export const WithActions: StoryObj = {
  name: 'With actions',
  render: () => {
    const [open, setOpen] = React.useState(true);
    const [agreed, setAgreed] = React.useState(false);
    return (
      <Phone height={500}>
        <Backdrop>
          <Button variant="primary" size="md" onClick={() => setOpen(true)}>
            เปิด sheet
          </Button>
        </Backdrop>
        <BottomSheet open={open} onClose={() => setOpen(false)} contained title="ยืนยันการจอง">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>ยืนยันการจอง</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: sys('color-text-tertiary-default') }}>
              เลขที่จองจะถูกล็อกไว้ 24 ชั่วโมง มารับที่บริษัทภายในเวลาที่กำหนด
            </p>
            <Checkbox
              label="รับทราบเงื่อนไขการรับของ"
              checked={agreed}
              onChange={setAgreed}
              variant="card"
              fullWidth
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="outline" size="lg" fullWidth onClick={() => setOpen(false)}>
                ยกเลิก
              </Button>
              <Button variant="primary" size="lg" fullWidth onClick={() => setOpen(false)}>
                ยืนยัน
              </Button>
            </div>
          </div>
        </BottomSheet>
      </Phone>
    );
  },
};

export const NoHandle: StoryObj = {
  name: 'Without handle',
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <Phone height={380}>
        <Backdrop />
        <BottomSheet open={open} onClose={() => setOpen(false)} contained showHandle={false} title="ไม่มีแถบลาก">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>ไม่มีแถบลาก</div>
            <p style={{ margin: 0, fontSize: 13, color: sys('color-text-tertiary-default'), lineHeight: 1.7 }}>
              ซ่อนแถบลากเมื่อไม่อยากให้ปัดปิดได้ — เหลือทางปิดคือแตะพื้นหลังกับกด Esc
            </p>
            <Button variant="primary" size="lg" fullWidth onClick={() => setOpen(false)}>
              เข้าใจแล้ว
            </Button>
          </div>
        </BottomSheet>
      </Phone>
    );
  },
};

export const Closed: StoryObj = {
  name: 'Closed',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Phone height={340}>
        <Backdrop>
          <Button variant="primary" size="md" onClick={() => setOpen(true)}>
            เปิด sheet
          </Button>
        </Backdrop>
        <BottomSheet open={open} onClose={() => setOpen(false)} contained title="ตัวอย่าง">
          <div style={{ paddingBottom: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>เปิดแล้ว</div>
            <Button variant="outline" size="md" fullWidth onClick={() => setOpen(false)}>
              ปิด
            </Button>
          </div>
        </BottomSheet>
      </Phone>
    );
  },
};

// ═══════════════════════════════════════════
//  Token chain
// ═══════════════════════════════════════════
export const TokenChain: StoryObj = {
  name: '🔍 Token Chain',
  render: () => {
    const rows: Array<[string, string]> = [
      ['background-white', '--sys-color-background-default'],
      ['foreground-dark', '--sys-color-foreground-black'],
      ['foreground-gray', '--sys-color-background-gray'],
      ['scrim', '--sys-color-overlay-default'],
      ['radius-top', '--sys-radius-4xl'],
      ['padding-x', '--sys-spacing-2xl'],
      ['padding-bottom', '--sys-spacing-2xl'],
      ['handle-padding-y', '--sys-spacing-xl'],
      ['handle-padding-x', '--sys-spacing-2xl'],
      ['handle-radius', '(Figma 2.5)'],
      ['handle-width', '(Figma 54)'],
      ['handle-height', '(Figma 4)'],
      ['handle-icon-size', '(Figma 16)'],
      ['max-height', '(fixed)'],
      ['dismiss-threshold', '(fixed)'],
      ['transition-duration', '(no motion group)'],
      ['transition-timing', '(no motion group)'],
    ];

    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: '8px 12px',
      fontSize: 11,
      fontWeight: 600,
      color: sys('color-text-tertiary-default'),
      borderBottom: `2px solid ${sys('color-border-accent-gray-soft-light')}`,
    };
    const td: React.CSSProperties = {
      padding: '6px 12px',
      borderBottom: `1px solid ${sys('color-background-light')}`,
      fontFamily: mono,
      fontSize: 11,
    };

    return (
      <div style={{ fontFamily: sans, maxWidth: 900, padding: 24 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>BottomSheet token chain</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
          Values flow Figma → design.md → components.json → tokens.css. Nothing below is
          hand-typed. Entries marked <code style={{ fontFamily: mono }}>(fixed)</code> have no
          semantic token behind them; the reason for each is recorded in
          components/bottom-sheet.json.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 22 }}>
          <thead>
            <tr>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, sysName]) => {
              const v = bottomSheetValue(name);
              return (
                <tr key={name}>
                  <td style={{ ...td, color: sys('color-primary-default') }}>--bottom-sheet-{name}</td>
                  <td style={{ ...td, color: sys('color-status-info-default') }}>{sysName}</td>
                  <td style={{ ...td, color: sys('color-status-success-dark') }}>
                    {v.startsWith('#') ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 3,
                            background: v,
                            border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
                          }}
                        />
                        {v}
                      </span>
                    ) : (
                      v || '—'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p style={{ fontSize: 12, color: sys('color-text-tertiary-default'), lineHeight: 1.6 }}>
          Declared by Figma, unused here:{' '}
          {BOTTOM_SHEET_UNUSED_TOKENS.map((n) => (
            <code key={n} style={{ fontFamily: mono, marginRight: 8 }}>
              --bottom-sheet-{n}
            </code>
          ))}
          — they exist for a sheet with a branded header, which the library does not model yet.
          Total tokens declared: {bottomSheetTokenNames().length}.
        </p>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="BottomSheet"
      figmaId="colors/bottom sheet"
      bindings={bottomSheetTokenNames()
        .filter((n) => bottomSheetValue(n).startsWith('#'))
        .map((n) => ({
          token: `--bottom-sheet-${n}`,
          figmaVariable: `colors/bottom sheet/bottom sheet-${n
            .replace(/^background-/, 'bg-')
            .replace(/^foreground-/, 'fg-')}`,
          hex: bottomSheetValue(n),
          usage: n.replace(/-/g, ' '),
        }))}
    />
  ),
};

export const BuildNotes: StoryObj = {
  name: '⚠️ Corrections',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 720, lineHeight: 1.7, padding: 24 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 8px' }}>What the Figma check corrected</h2>
      <p style={{ fontSize: 13, color: sys('color-text-tertiary-default'), margin: '0 0 20px' }}>
        Built 2026-08-17 while the Figma Desktop Bridge was offline, so the geometry was
        derived from the Frontend. Verified against component set{' '}
        <code style={{ fontFamily: mono }}>20052:11505</code> on 2026-08-19 — five values were
        wrong. The colours, which came from the mirrored token group, were all correct.
      </p>

      {Object.entries((BOTTOM_SHEET_SPEC as any).base._corrections).map(([what, why]) => (
        <div
          key={what}
          style={{
            border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
            borderLeft: `3px solid ${sys('color-status-success-default')}`,
            background: sys('color-status-success-soft-light'),
            padding: '14px 18px',
            marginBottom: 10,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, fontFamily: mono }}>
            {what}
          </div>
          <div style={{ fontSize: 13, color: sys('color-text-secondary-default') }}>
            {String(why)}
          </div>
        </div>
      ))}

      <h3 style={{ fontSize: 15, margin: '24px 0 8px' }}>Still open</h3>
      <div
        style={{
          border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
          borderLeft: `3px solid ${sys('color-status-warning-default')}`,
          background: sys('color-status-warning-soft-light'),
          padding: '14px 18px',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
          The handlebar carries two 16px icons
        </div>
        <div style={{ fontSize: 13, color: sys('color-text-secondary-default') }}>
          Figma&apos;s Handlebar row has optional leading and trailing icon slots
          (<code style={{ fontFamily: mono }}>filled-Home</code> and{' '}
          <code style={{ fontFamily: mono }}>filled-close</code> in the component). This
          implementation renders neither — whether they are a real part of the pattern or
          leftovers in the Figma file needs a designer to say.
        </div>
      </div>

      <p style={{ fontSize: 12, color: sys('color-text-tertiary-default'), marginTop: 18 }}>
        Motion is still two string literals: design.md has no motion group at any tier.
      </p>
    </div>
  ),
  parameters: { layout: 'padded' },
};
