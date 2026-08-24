import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Divider from './Divider';
import {
  DIVIDER_TONES,
  DIVIDER_STYLES,
  dividerColorValue,
  dividerTokenNames,
  dividerValue,
  DIVIDER_SPEC,
} from './tokens';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  Divider — the one atom with no Figma component behind it.
//  Built on Figma's `colors/divider` semantic group and the Frontend's dash-line.
// ═══════════════════════════════════════════

const meta: Meta<typeof Divider> = {
  title: 'Components/Display/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export const Tones: StoryObj = {
  name: 'Tones and styles',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 620 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Divider</h2>
      <p style={{ margin: '0 0 26px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        Tone มาจากกลุ่ม <code style={{ fontFamily: mono }}>colors/divider</code> ของ Figma ตรงๆ 5 role
        ไม่ได้เลือกสีใหม่ให้ component นี้
      </p>

      {DIVIDER_STYLES.map((lineStyle) => (
        <div key={lineStyle} style={{ marginBottom: 34 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 14 }}>{lineStyle}</div>
          {DIVIDER_TONES.map((tone) => (
            <div key={tone} style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: mono,
                  color: sys('color-text-tertiary-default'),
                  marginBottom: 6,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{tone}</span>
                <span style={{ color: sys('color-text-state-light-gray') }}>{dividerColorValue(tone)}</span>
              </div>
              <div style={{ background: tone === 'inverse' ? sys('color-background-dark') : undefined, padding: tone === 'inverse' ? 10 : 0 }}>
                <Divider tone={tone} lineStyle={lineStyle} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const InContext: StoryObj = {
  name: 'In a list',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 390 }}>
      <p style={{ margin: '0 0 18px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        ระยะห่างเป็นของ parent ไม่ใช่ของเส้น — เหมือนที่ FE ทำอยู่ 46 จุด ที่ส่ง{' '}
        <code style={{ fontFamily: mono }}>my-2</code> มาเองทุกครั้ง
      </p>
      <div
        style={{
          background: sys('color-background-default'),
          border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
          borderRadius: sys('radius-lg'),
          padding: sys('spacing-2xl'),
        }}
      >
        {['ค่าสลาก', 'ค่าบริการ', 'ส่วนลด'].map((label, i, all) => (
          <React.Fragment key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: `${sys('spacing-lg')} 0` }}>
              <span style={{ color: sys('color-text-tertiary-default') }}>{label}</span>
              <span style={{ fontWeight: 600 }}>{[240, 0, -20][i]} บาท</span>
            </div>
            {i < all.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
};

export const Provenance: StoryObj = {
  name: '⚠️ ไม่มีใน Figma',
  render: () => {
    const ev = (DIVIDER_SPEC as any).base._frontend_evidence;
    return (
      <div style={{ fontFamily: sans, maxWidth: 700, lineHeight: 1.8 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 12px' }}>สร้างจาก token เพราะ Figma ยังไม่มี component</h2>

        <div
          style={{
            border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
            borderLeft: `3px solid ${sys('color-status-warning-default')}`,
            background: sys('color-background-light'),
            padding: '16px 20px',
            marginBottom: 20,
            fontSize: 13,
          }}
        >
          <div style={{ fontFamily: mono, fontSize: 12, marginBottom: 8 }}>หลักฐาน</div>
          <div style={{ lineHeight: 2 }}>
            <strong>Figma component</strong> — ไม่มี ค้นทุกหน้าแล้วเมื่อ 2026-08-19
            <br />
            <strong>Figma token</strong> — มี <code style={{ fontFamily: mono }}>colors/divider</code> 5 role
            <br />
            <strong>Frontend</strong> — {ev.component}
            <br />
            <strong>Figma component tier</strong> — <code style={{ fontFamily: mono }}>carts-divider</code>,{' '}
            <code style={{ fontFamily: mono }}>orders-divider</code> เป็นเส้นทึบ
          </div>
        </div>

        <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 16px' }}>
          <strong>สีที่ FE ใช้ ไม่ได้ลอกมา</strong> — {ev.colours_used}
        </p>

        <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: 0 }}>
          ข้อเสนอ: ให้ Figma วาด divider เป็น component set แล้ว Storybook จะ verify ค่าได้เหมือน component อื่น
          ตอนนี้ verify ได้แค่ชั้น token
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
        dividerTokenNames().map((name) => ({
          name,
          computed: style.getPropertyValue(`--divider-${name}`).trim(),
          generated: dividerValue(name),
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
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Token chain</h2>
        <p style={{ margin: '0 0 6px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
          ซ้ายคือค่าที่หน้านี้ resolve จริงด้วย <code style={{ fontFamily: mono }}>getComputedStyle</code> ขวาคือค่าที่
          generator เขียนไว้ — คนละแหล่ง ถ้าไม่ตรงคือเจอของจริง
        </p>
        {rows.length > 0 && (
          <p
            style={{
              margin: '0 0 18px',
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
                <td
                  style={{
                    ...td,
                    color:
                      r.computed === r.generated
                        ? sys('color-status-success-default')
                        : sys('color-status-error-default'),
                  }}
                >
                  {r.computed === r.generated ? 'match' : 'differs'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
