import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Header, { HeaderAction } from './Header';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import { HEADER, HEADER_UNMIGRATED_TYPE, topfootTokenNames, topfootValue } from './tokens';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  Header — Figma `header-bar-mobile` (14924:2118)
//
//  Three variants, verified against Figma on 2026-08-19. Every number on this page is
//  read from the component set; nothing is estimated.
// ═══════════════════════════════════════════

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Device: React.FC<{ children: React.ReactNode; label: string; sub: string }> = ({
  children,
  label,
  sub,
}) => (
  <div style={{ fontFamily: sans }}>
    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 11, fontFamily: mono, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
      {sub}
    </div>
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


/** The two counters Figma shows in the home header by default: nok cash and lottery count. */
const Counter: React.FC<{ value: string; icon: string }> = ({ value, icon }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: sys('spacing-sm'),
      color: HEADER.foreground,
      fontSize: sys('type-button-md-semibold-size'),
      fontWeight: sys('type-button-md-semibold-weight'),
    }}
  >
    <Icon name={icon} size="md" color="onBg" />
    {value}
  </span>
);

// ═══════════════════════════════════════════
export const Variants: StoryObj = {
  name: 'Three variants',
  render: () => (
    <div style={{ fontFamily: sans, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ maxWidth: 640 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>header-bar-mobile</h2>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
          Figma keeps all three in one component set with a <code style={{ fontFamily: mono }}>type</code>{' '}
          property, so they are one component here. The Frontend splits the same job across{' '}
          <code style={{ fontFamily: mono }}>components/header</code> and{' '}
          <code style={{ fontFamily: mono }}>navbar/compact-navbar</code> — two files, one idea.
        </p>
      </div>

      <Device label="type=home-page" sub="146px · หน้าหลักที่กดจาก Navbar">
        <Header
          variant="home"
          actionRight={
            <>
              <Counter icon="outline-NokPoints-W" value="1,050" />
              <Counter icon="outline-Lottery" value="10" />
              <HeaderAction icon="filled-navigation" label="เมนู" />
            </>
          }
        />
      </Device>

      <Device label="type=sub-page" sub="56px · หน้าที่ไม่ได้กดจาก Navbar">
        <Header
          variant="sub"
          title="ตู้เซฟของฉัน"
          actionRight={<HeaderAction icon="filled-navigation" label="เมนู" />}
        />
      </Device>

      <Device label="type=success" sub="94px · หน้าจบ flow">
        <Header
          variant="success"
          title="คำสั่งซื้อสำเร็จ"
          metaLabel="หมายเลขคำสั่งซื้อ"
          metaValue="9019677954"
          successIcon={<Icon name="filled-check_circle" size="md" color="onBg" />}
        />
      </Device>
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
      ['type=home-page', '146px', 'padding 8/16/32 · gap 16 · app bar 36 · logo 31 · wordmark row 32'],
      ['type=sub-page', '56px', 'padding 0/16 · gap 8 · action well 36 · icon 24'],
      ['type=success', '94px', 'padding 16 · gap 4'],
      ['background', 'colors/top-and-footer/topfoot-bg-red', '#E32321 — same red for all three'],
      ['foreground', 'Color/Text/Text-Onbgcolor', '#FFFFFF'],
      ['app bar right gap', '12px', "Figma's Frame 1000012514, not an action well"],
      ['action control', 'button · Size=M, Type=Tertiary', '36×36 · radius-lg · 1px border · 6 padding · 24 glyph'],
      ['phoenix · home', '104×104 at −32 right, −18 bottom', 'bleeds past both edges and is clipped'],
      ['phoenix · success', '118×125 at −32 right, −35 bottom', 'not square'],
      ['phoenix · sub', 'hidden', 'Figma turns it off on sub-page'],
      ['phoenix opacity', '70%', 'no semantic role carries 70 — literal, verbatim from Figma'],
      ['phoenix blend', 'HARD_LIGHT', 'catches the gradient behind rather than sitting flat on it'],
    ];

    return (
      <div style={{ fontFamily: sans, maxWidth: 860 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Measured, not estimated</h2>
        <p style={{ margin: '0 0 22px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 620 }}>
          Read off <code style={{ fontFamily: mono }}>header-bar-mobile</code> (14924:2118) on
          2026-08-19. Anything the component needs that Figma does not state is called out in
          the second table rather than quietly filled in.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 34 }}>
          <thead>
            <tr>
              <th style={th}>Variant / property</th>
              <th style={th}>Figma</th>
              <th style={{ ...th, width: '48%' }}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b, c]) => (
              <tr key={a}>
                <td style={{ ...td, fontFamily: mono, color: sys('color-primary-default') }}>{a}</td>
                <td style={{ ...td, fontFamily: mono }}>{b}</td>
                <td style={{ ...td, color: sys('color-text-tertiary-default') }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 15, margin: '0 0 8px' }}>สิ่งที่รอบแรกทำผิด แล้วมาแก้ทีหลัง</h3>
        <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 660 }}>
          รอบแรกวัดแค่ความสูงกับ padding แล้วสรุปว่าตรง — ซึ่งตรงจริง แต่ property อื่นผิดหมด
          บันทึกไว้เพราะ &ldquo;bounding box ตรง&rdquo; ไม่ใช่หลักฐานว่า component ตรง
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 34 }}>
          <thead>
            <tr>
              <th style={th}>จุด</th>
              <th style={th}>เคยทำไว้</th>
              <th style={th}>Figma บอกว่า</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['phoenix opacity', '40% (semantic.opacity.muted — ลอกจาก FE)', '70%'],
              ['phoenix blend', 'ไม่มี', 'HARD_LIGHT'],
              ['phoenix geometry', 'จัตุรัสตัวเดียว translate เป็น %', 'คนละกล่องคนละ offset ต่อ variant · success 118×125'],
              ['icon-right', 'icon เปล่า', 'button Tertiary มีกรอบ เหมือน icon-left'],
              ['app bar logo', 'wordmark 245px กว้างจนแถวล้น', 'bird mark 31×31 · wordmark อยู่ในบล็อก heading'],
              ['font', 'Sarabun (fallback)', 'Graphik TH ของจริง 7 น้ำหนัก'],
            ].map(([a, b, c]) => (
              <tr key={a}>
                <td style={{ ...td, fontFamily: mono, color: sys('color-primary-default') }}>{a}</td>
                <td style={{ ...td, color: sys('color-text-state-light-gray') }}>{b}</td>
                <td style={td}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 15, margin: '0 0 8px' }}>⚠️ Type that never made it into the token system</h3>
        <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 660 }}>
          Four text layers still sit on pre-token styles. Each one is a size/line-height pair
          that no semantic role carries — which is exactly why they were skipped when the rest
          were migrated. Their values are literals in{' '}
          <code style={{ fontFamily: mono }}>top-and-footer.json</code>, not typography refs, so
          they cannot drift silently.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Legacy style</th>
              <th style={th}>Value</th>
              <th style={th}>Used by</th>
              <th style={th}>Nearest role</th>
            </tr>
          </thead>
          <tbody>
            {HEADER_UNMIGRATED_TYPE.map((r) => (
              <tr key={r.style}>
                <td style={{ ...td, fontFamily: mono, fontSize: 11.5 }}>{r.style}</td>
                <td style={{ ...td, fontFamily: mono }}>{r.value}</td>
                <td style={td}>{r.used}</td>
                <td style={{ ...td, color: sys('color-text-tertiary-default') }}>{r.nearest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Real verification: what the browser computes, against what the generator wrote.
//
//  Both sides come from different places — the left from tokens.css as resolved by the
//  live document, the right from tokens.generated.ts. A row can genuinely fail, which is
//  the whole point; a table whose two columns are typed by the same hand cannot.
// ═══════════════════════════════════════════
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
        topfootTokenNames()
          .filter((n) => n.startsWith('header-') || n === 'width')
          .map((name) => ({
            name,
            computed: style.getPropertyValue(`--topfoot-${name}`).trim(),
            generated: topfootValue(name),
          })),
      );
    }, []);

    const th: React.CSSProperties = {
      textAlign: 'left',
      padding: '6px 12px',
      fontSize: 11,
      fontWeight: 600,
      color: sys('color-text-tertiary-default'),
      borderBottom: `2px solid ${sys('color-border-accent-gray-soft-light')}`,
    };
    const td: React.CSSProperties = {
      padding: '5px 12px',
      borderBottom: `1px solid ${sys('color-background-light')}`,
      fontSize: 12,
      fontFamily: mono,
    };

    const failed = rows.filter((r) => r.computed !== r.generated);

    return (
      <div ref={probe} style={{ fontFamily: sans, maxWidth: 860 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Token chain</h2>
        <p style={{ margin: '0 0 6px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
          Left column: the value this document actually resolves{' '}
          <code style={{ fontFamily: mono }}>--topfoot-*</code> to, read with{' '}
          <code style={{ fontFamily: mono }}>getComputedStyle</code>. Right column: what the
          generator wrote into <code style={{ fontFamily: mono }}>tokens.generated.ts</code>.
          Two independent sources, so a mismatch is a real finding.
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
            {failed.length
              ? `${failed.length} of ${rows.length} tokens do not match`
              : `${rows.length} tokens match`}
          </p>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Token</th>
              <th style={th}>Computed in this page</th>
              <th style={th}>Generated</th>
              <th style={th} />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const ok = r.computed === r.generated;
              return (
                <tr key={r.name}>
                  <td style={{ ...td, color: sys('color-primary-default') }}>{r.name}</td>
                  <td style={td}>{r.computed || '—'}</td>
                  <td style={{ ...td, color: sys('color-text-state-light-gray') }}>{r.generated || '—'}</td>
                  <td style={{ ...td, color: ok ? sys('color-status-success-default') : sys('color-status-error-default') }}>
                    {ok ? 'match' : 'differs'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
};
