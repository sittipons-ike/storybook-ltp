import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Avatar from './Avatar';
import { avatarBase, avatarTokenNames, avatarValue, AVATAR_SPEC } from './tokens';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  Avatar — Figma `avatar` (14291:133618), 10 variants across 3 axes.
// ═══════════════════════════════════════════

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Cell: React.FC<{ label: string; onRed?: boolean; children: React.ReactNode }> = ({
  label,
  onRed,
  children,
}) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        padding: 14,
        borderRadius: sys('radius-lg'),
        background: onRed ? sys('color-primary-default') : sys('color-background-light'),
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
    <div style={{ fontSize: 10, fontFamily: mono, color: sys('color-text-tertiary-default'), marginTop: 6 }}>
      {label}
    </div>
  </div>
);

export const Variants: StoryObj = {
  name: 'All variants',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 760 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>avatar</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
        สามแกนตาม Figma: <code style={{ fontFamily: mono }}>Type</code> ·{' '}
        <code style={{ fontFamily: mono }}>On bg Red</code> ·{' '}
        <code style={{ fontFamily: mono }}>Show Edit</code> — วงแหวนกับพื้นหลังของ guest
        จะสลับสีกันระหว่างสองพื้น
      </p>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        <Cell label="member · light">
          <Avatar type="member" surface="light" src="/brand/phoenix-logo.png" alt="สมาชิก" />
        </Cell>
        <Cell label="member · light · edit">
          <Avatar type="member" surface="light" src="/brand/phoenix-logo.png" alt="สมาชิก" showEdit />
        </Cell>
        <Cell label="member · red" onRed>
          <Avatar type="member" surface="red" src="/brand/phoenix-logo.png" alt="สมาชิก" />
        </Cell>
        <Cell label="guest · light">
          <Avatar type="guest" surface="light" alt="ผู้เยี่ยมชม" />
        </Cell>
        <Cell label="guest · light · edit">
          <Avatar type="guest" surface="light" alt="ผู้เยี่ยมชม" showEdit />
        </Cell>
        <Cell label="guest · red" onRed>
          <Avatar type="guest" surface="red" alt="ผู้เยี่ยมชม" />
        </Cell>
      </div>

      <h3 style={{ fontSize: 15, margin: '32px 0 10px' }}>ขนาด</h3>
      <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
        Figma วาดที่ฐาน 40 แล้วขยายทั้งก้อน — หน้า profile ใช้ 56 ซึ่งคือ 1.4× พอดี
        ทุกค่าข้างในจึงคูณตาม ไม่ได้เก็บชุดตัวเลขที่สอง
      </p>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {[24, 32, 40, 56, 72].map((s) => (
          <Cell key={s} label={`${s}px${s === 40 ? ' · base' : s === 56 ? ' · profile' : ''}`}>
            <Avatar type="member" surface="light" size={s} src="/brand/phoenix-logo.png" alt="สมาชิก" />
          </Cell>
        ))}
      </div>
    </div>
  ),
};

export const Scaling: StoryObj = {
  name: '🔍 How the scale is derived',
  render: () => {
    const base = avatarBase();
    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: '7px 12px',
      fontSize: 11,
      fontWeight: 600,
      color: sys('color-text-tertiary-default'),
      borderBottom: `2px solid ${sys('color-border-accent-gray-soft-light')}`,
    };
    const td: React.CSSProperties = {
      padding: '6px 12px',
      borderBottom: `1px solid ${sys('color-background-light')}`,
      fontSize: 12,
      fontFamily: mono,
    };
    const rows: [string, number, number][] = [
      ['frame', base.size, 56],
      ['ring', base.ring, 47],
      ['ring padding', base.ringPadding, 3.5],
      ['ring border', base.ringBorderWidth, 1.96],
      ['inner disc', base.inner, 40],
    ];
    return (
      <div style={{ fontFamily: sans, maxWidth: 700 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>ทำไมค่าถึงเป็นทศนิยม</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
          2.5 กับ 1.4 ไม่ได้อยู่บนสเกล spacing หรือ border-width — และไม่ควรอยู่ มันเป็น{' '}
          <strong>สัดส่วนของ avatar</strong> ไม่ใช่ขั้นของสเกล ค่าพวกนี้แหละที่ทำให้ instance ขนาด 56
          ในหน้า profile ออกมาเป็น 47 / 3.5 / 1.96 / 40 ตรงกับที่ Figma วาด
        </p>
        <table style={{ borderCollapse: 'collapse', marginBottom: 20 }}>
          <thead>
            <tr>
              <th style={th}>ส่วน</th>
              <th style={th}>ฐาน 40</th>
              <th style={th}>× 1.4</th>
              <th style={th}>Figma ที่ 56</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([n, b, figma]) => {
              const scaled = Math.round(b * 1.4 * 100) / 100;
              const same = Math.abs(scaled - figma) < 0.05;
              return (
                <tr key={n}>
                  <td style={{ ...td, color: sys('color-primary-default') }}>{n}</td>
                  <td style={td}>{b}</td>
                  <td style={td}>{scaled}</td>
                  <td style={{ ...td, color: same ? sys('color-status-success-default') : sys('color-status-error-default') }}>
                    {figma}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.8, color: sys('color-text-secondary-default') }}>
          {(AVATAR_SPEC as any).base._figma_gaps['illustration-not-portable']}
        </p>
      </div>
    );
  },
};

export const TokenChain: StoryObj = {
  name: '🔗 Token chain',
  render: () => {
    const probe = React.useRef<HTMLDivElement>(null);
    const [rows, setRows] = React.useState<{ name: string; computed: string; generated: string }[]>([]);
    React.useEffect(() => {
      const el = probe.current;
      if (!el) return;
      const style = getComputedStyle(el);
      setRows(
        avatarTokenNames().map((name) => ({
          name,
          computed: style.getPropertyValue(`--avatar-${name}`).trim(),
          generated: avatarValue(name),
        })),
      );
    }, []);
    const failed = rows.filter((r) => r.computed !== r.generated);
    const td: React.CSSProperties = {
      padding: '5px 12px',
      borderBottom: `1px solid ${sys('color-background-light')}`,
      fontSize: 12,
      fontFamily: mono,
    };
    return (
      <div ref={probe} style={{ fontFamily: sans, maxWidth: 760 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 10px' }}>Token chain</h2>
        {rows.length > 0 && (
          <p
            style={{
              margin: '0 0 16px',
              fontSize: 13,
              fontWeight: 600,
              color: failed.length ? sys('color-status-error-default') : sys('color-status-success-default'),
            }}
          >
            {failed.length ? `${failed.length} / ${rows.length} ไม่ตรง` : `${rows.length} tokens match`}
          </p>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td style={{ ...td, color: sys('color-primary-default') }}>{r.name}</td>
                <td style={td}>{r.computed || '—'}</td>
                <td style={{ ...td, color: sys('color-text-state-light-gray') }}>{r.generated || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
