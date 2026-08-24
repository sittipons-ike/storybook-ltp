import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Checkbox from './Checkbox';
import {
  checkboxColorValues,
  checkboxTokenNames,
  checkboxValue,
  CHECKBOX_STATES,
  CHECKBOX_CHECKED,
  CHECKBOX_TONES,
  CHECKBOX_VARIANTS,
  CHECKBOX_SPEC,
  type CheckboxChecked,
} from './tokens';
import { sys } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';

// ═══════════════════════════════════════════
//  Checkbox — Lotteryplus Design System
//  Figma component set: checkbox (14291:131502)
//
//  Built 2026-08-17 to close the clearest gap in the library. Geometry corrected
//  2026-08-19 against the Figma component set — the first pass guessed it from the
//  Frontend and got the frame size, the glyph sizes and three invented values wrong.
// ═══════════════════════════════════════════

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'select', options: [false, true, 'indeterminate'] },
    tone: { control: 'inline-radio', options: CHECKBOX_TONES },
    variant: { control: 'inline-radio', options: CHECKBOX_VARIANTS },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    label: 'ยอมรับเงื่อนไขการใช้บริการ',
    checked: false,
    tone: 'success',
    variant: 'default',
    disabled: false,
    error: false,
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/** Controlled wrapper — a checkbox that cannot be ticked is not worth reviewing. */
const Live: React.FC<React.ComponentProps<typeof Checkbox>> = (props) => {
  const [on, setOn] = React.useState<CheckboxChecked>(props.checked ?? false);
  React.useEffect(() => setOn(props.checked ?? false), [props.checked]);
  return <Checkbox {...props} checked={on} onChange={setOn} />;
};

export const Default: Story = {
  render: (args) => <Live {...args} />,
};

export const Tones: Story = {
  name: 'Tones',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: sans }}>
      <p style={{ margin: 0, fontSize: 12, color: sys('color-text-tertiary-default'), maxWidth: 460 }}>
        Figma's second axis, <code style={{ fontFamily: mono }}>Primary Color = Yes | No</code>.
        Green for a preference; brand red where agreeing has consequences.
      </p>
      <Live label="รับข่าวสารและโปรโมชั่น" checked tone="success" />
      <Live label="ยืนยันการจอง — เลขจะถูกล็อก 24 ชั่วโมง" checked tone="primary" />
    </div>
  ),
};

export const Indeterminate: Story = {
  name: 'Indeterminate',
  render: () => {
    const items = ['หวยเดี่ยว', 'หวยชุด', 'หวยจับคู่'];
    const [picked, setPicked] = React.useState<string[]>([items[0]]);
    const all = picked.length === items.length;
    const some = picked.length > 0 && !all;
    return (
      <div style={{ width: 300, fontFamily: sans }}>
        <p style={{ margin: '0 0 10px', fontSize: 12, color: sys('color-text-tertiary-default') }}>
          Figma calls this state <code style={{ fontFamily: mono }}>All Seleted</code>. It is what
          a parent checkbox shows when only some children are ticked.
        </p>
        <Checkbox
          label="เลือกทั้งหมด"
          checked={all ? true : some ? 'indeterminate' : false}
          onChange={(next) => setPicked(next ? [...items] : [])}
        />
        <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
          {items.map((i) => (
            <Checkbox
              key={i}
              label={i}
              checked={picked.includes(i)}
              onChange={(next) =>
                setPicked((p) => (next ? [...p, i] : p.filter((x) => x !== i)))
              }
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

export const Card: Story = {
  name: 'Card variant',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 340, fontFamily: sans }}>
      <p style={{ margin: 0, fontSize: 12, color: sys('color-status-warning-dark') }}>
        Not modelled in Figma — this comes from the Frontend, where it is used in three
        places for a checkbox that is the whole choice rather than one row in a list.
      </p>
      <Live label="รับข่าวสารและโปรโมชั่น" variant="card" fullWidth />
      <Live label="บันทึกข้อมูลไว้ใช้ครั้งถัดไป" variant="card" checked fullWidth />
      <Live label="ตัวเลือกที่ปิดอยู่" variant="card" disabled fullWidth />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ fontFamily: sans, display: 'flex', flexDirection: 'column', gap: 26 }}>
      <p style={{ margin: 0, fontSize: 12, color: sys('color-text-tertiary-default'), maxWidth: 620 }}>
        Figma&apos;s seven states each paint differently, read off all 14 variants on
        2026-08-19. Rest and Disable take a 1px grey border; Hover, Focus and Error take
        1.5px — tone-coloured on the first two, <code style={{ fontFamily: mono }}>#EF4444</code>{' '}
        on Error. Focus adds a drop shadow at 35%. A glyph appears on exactly two states.
      </p>
      <p
        style={{
          margin: 0,
          padding: '10px 14px',
          maxWidth: 620,
          fontSize: 12,
          lineHeight: 1.8,
          borderLeft: `3px solid ${sys('color-status-warning-default')}`,
          background: sys('color-background-light'),
          color: sys('color-text-secondary-default'),
        }}
      >
        <strong>เคยเขียนตรงนี้ว่า &ldquo;Figma ทาสี Hover/Focus/Error เหมือน Empty&rdquo; — ผิด</strong>{' '}
        คำนั้นมาจากการอ่าน <code style={{ fontFamily: mono }}>Outline/Old/Check</code> ซึ่งเป็น
        instance เก่าที่ <em>ซ่อนไว้</em> และ <em>ไม่มี parent</em> ฝังอยู่ในทุก variant ที่ยังไม่ติ๊ก
        ผลคือ component เดิมวาดเครื่องหมายถูกตอนยังไม่ติ๊ก และไม่มีกล่องเลย —
        node ที่ซ่อนอยู่ไม่ใช่สเปก
      </p>

      {CHECKBOX_TONES.map((tone) => (
        <div key={tone}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: sys('color-text-secondary-default'),
              marginBottom: 10,
            }}
          >
            tone: {tone}
          </div>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {CHECKBOX_CHECKED.map((checked) =>
              CHECKBOX_STATES.map((state) => (
                <div key={`${tone}-${String(checked)}-${state}`} style={{ textAlign: 'center' }}>
                  <Checkbox
                    label={String(checked)}
                    checked={checked}
                    tone={tone}
                    disabled={state === 'disabled'}
                    error={state === 'error'}
                    state={state}
                  />
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: mono,
                      color: sys('color-text-tertiary-default'),
                      marginTop: 6,
                    }}
                  >
                    {state}
                  </div>
                  <div style={{ fontSize: 9, fontFamily: mono, color: sys('color-text-state-light-gray') }}>
                    {checkboxColorValues(checked, state, tone).background}
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const InAList: Story = {
  name: 'In a list',
  render: () => {
    const [picked, setPicked] = React.useState<string[]>(['sms']);
    const options = [
      { id: 'sms', label: 'แจ้งเตือนทาง SMS' },
      { id: 'email', label: 'แจ้งเตือนทางอีเมล' },
      { id: 'push', label: 'แจ้งเตือนบนแอป' },
      { id: 'line', label: 'แจ้งเตือนทาง LINE (ปิดชั่วคราว)', disabled: true },
    ];
    return (
      <div style={{ width: 320, fontFamily: sans, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {options.map((o) => (
          <Checkbox
            key={o.id}
            label={o.label}
            checked={picked.includes(o.id)}
            disabled={o.disabled}
            fullWidth
            onChange={(next) =>
              setPicked((p) => (next ? [...p, o.id] : p.filter((x) => x !== o.id)))
            }
          />
        ))}
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            fontFamily: mono,
            color: sys('color-text-tertiary-default'),
          }}
        >
          เลือกไว้: {picked.length ? picked.join(', ') : '—'}
        </div>
      </div>
    );
  },
  parameters: { layout: 'padded' },
};

// ═══════════════════════════════════════════
//  Token chain
// ═══════════════════════════════════════════
export const TokenChain: Story = {
  name: '🔍 Token Chain',
  render: () => {
    const layout: Array<[string, string]> = [
      ['size', '(Figma frame)'],
      ['padding', '--sys-spacing-xs'],
      ['icon-size-rest', '(Figma glyph)'],
      ['icon-size-selected', '(Figma glyph)'],
      ['gap', '--sys-spacing-lg'],
      ['height', '(from Frontend)'],
      ['card-padding', '--sys-spacing-2xl'],
      ['card-radius', '--sys-radius-lg'],
      ['card-border-width', '--sys-border-width-hairline'],
      ['typography-family', '--sys-type-body-md-medium-family'],
      ['typography-size', '--sys-type-body-md-medium-size'],
      ['typography-line-height', '--sys-type-body-md-medium-line-height'],
      ['typography-weight', '--sys-type-body-md-medium-weight'],
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

    const swatch = (hex: string) =>
      hex ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: hex,
              border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
            }}
          />
          {hex}
        </span>
      ) : (
        <span style={{ color: sys('color-text-state-light-gray') }}>—</span>
      );

    return (
      <div style={{ fontFamily: sans, maxWidth: 940 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Checkbox token chain</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
          Values flow Figma → design.md → components.json → tokens.css. Nothing below is
          hand-typed. Entries in brackets have no semantic token behind them; the reason for
          each is recorded in components/checkbox.json.
        </p>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Geometry &amp; typography</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
          <thead>
            <tr>
              <th style={th}>Tier 2 — component</th>
              <th style={th}>Tier 1 — semantic</th>
              <th style={th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {layout.map(([name, sysName]) => (
              <tr key={name}>
                <td style={{ ...td, color: sys('color-primary-default') }}>--checkbox-{name}</td>
                <td style={{ ...td, color: sys('color-status-info-default') }}>{sysName}</td>
                <td style={{ ...td, color: sys('color-status-success-dark') }}>{checkboxValue(name)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
          <thead>
            <tr>
              <th style={th}>Tone</th>
              <th style={th}>Checked</th>
              <th style={th}>State</th>
              <th style={th}>Box</th>
              <th style={th}>Border</th>
              <th style={th}>Width</th>
              <th style={th}>Ring</th>
              <th style={th}>Label</th>
            </tr>
          </thead>
          <tbody>
            {CHECKBOX_TONES.flatMap((tone) =>
              CHECKBOX_CHECKED.flatMap((checked) =>
                CHECKBOX_STATES.map((state) => {
                  const v = checkboxColorValues(checked, state, tone);
                  return (
                    <tr key={`${tone}-${String(checked)}-${state}`}>
                      <td style={{ ...td, fontFamily: sans }}>{tone}</td>
                      <td style={td}>{String(checked)}</td>
                      <td style={td}>{state}</td>
                      <td style={td}>{swatch(v.background)}</td>
                      <td style={td}>{swatch(v.border)}</td>
                      <td style={{ ...td, fontFamily: mono, fontSize: 11 }}>{v.borderWidth}</td>
                      <td style={td}>{v.ring ? swatch(v.ring) : '—'}</td>
                      <td style={td}>{swatch(v.label)}</td>
                    </tr>
                  );
                }),
              ),
            )}
          </tbody>
        </table>

        <p style={{ fontSize: 12, color: sys('color-text-tertiary-default') }}>
          Tokens declared: {checkboxTokenNames().length}
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
      componentName="Checkbox"
      figmaId="14291:131502 · colors/checkbox"
      bindings={checkboxTokenNames()
        .filter((n: string) => checkboxValue(n).startsWith('#'))
        .map((n: string) => ({
          token: `--checkbox-${n}`,
          figmaVariable: `colors/checkbox/checkbox-${n
            .replace(/^background-/, 'bg-')
            .replace(/^foreground-/, 'fg-')}`,
          hex: checkboxValue(n),
          usage: n.replace(/-/g, ' '),
        }))}
    />
  ),
};

export const FigmaGaps: StoryObj = {
  name: '⚠️ Figma Gaps',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 720, lineHeight: 1.7 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 8px' }}>Where this diverges from Figma</h2>
      <p style={{ fontSize: 13, color: sys('color-text-tertiary-default'), margin: '0 0 20px' }}>
        Verified against component set <code style={{ fontFamily: mono }}>14291:131502</code> on
        2026-08-19. Geometry now matches. Three things still do not, and each is a decision
        someone has to make rather than a bug to fix.
      </p>
      {Object.entries((CHECKBOX_SPEC as any).base._figma_gaps).map(([what, why]) => (
        <div
          key={what}
          style={{
            border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
            borderLeft: `3px solid ${sys('color-status-warning-default')}`,
            background: sys('color-status-warning-soft-light'),
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
    </div>
  ),
  parameters: { layout: 'padded' },
};
