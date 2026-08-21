import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AppShell from './AppShell';
import BareScreen from '../BareScreen/BareScreen';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Button from '../../components/Button/Button';
import Header, { HeaderAction } from '../../components/Header/Header';
import { DEVICE, HEADER } from '../../components/Header/tokens';
import ActionBar from '../../components/ActionBar/ActionBar';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import { sys } from '../../foundations/tokens';
import patterns from '../../../design-library/lotteryplus/patterns.json';

// ═══════════════════════════════════════════
//  Patterns — the frames a page is built in
//
//  Derived on 2026-08-19 by parsing the `<Layout>` call on all 81 Frontend pages.
//  Everything on this page traces back to that measurement; nothing is invented.
// ═══════════════════════════════════════════

const meta: Meta<typeof AppShell> = {
  title: 'Patterns/App Shell',
  component: AppShell,
  parameters: { layout: 'padded' },
};
export default meta;

const spec = patterns as any;
const shell = spec.patterns['app-shell'];

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Phone: React.FC<{ children: React.ReactNode; label?: string; sub?: string }> = ({
  children,
  label,
  sub,
}) => (
  <div style={{ fontFamily: sans }}>
    {label && (
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{label}</div>
    )}
    {sub && (
      <div
        style={{
          fontSize: 11,
          fontFamily: mono,
          color: sys('color-text-tertiary-default'),
          marginBottom: 8,
        }}
      >
        {sub}
      </div>
    )}
    <div
      style={{
        width: 300,
        height: 420,
        borderRadius: sys('radius-2xl'),
        border: `1px solid ${sys('color-border-accent-gray-light')}`,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  </div>
);

// ═══════════════════════════════════════════
//  Every composition that actually occurs
// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
//  Shared with every story below. All measured, none invented:
//  the status strip is 47px because both Figma templates draw it at 47, the counters and
//  the hamburger are the app-bar row Figma puts in `type=home-page`, and the frame is a
//  real iPhone 16.
// ═══════════════════════════════════════════

const deviceFrame: React.CSSProperties = {
  width: DEVICE.width,
  height: DEVICE.height,
  border: `1px solid ${sys('color-border-accent-gray-light')}`,
  borderRadius: DEVICE.radius,
  overflow: 'hidden',
};

/** The 47px strip Figma draws above every template. A device affordance, not a component. */
const StatusBar: React.FC = () => (
  <div
    style={{
      height: DEVICE.statusBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${sys('spacing-5xl')}`,
      background: sys('color-primary-default'),
      color: sys('color-foreground-white'),
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    <span>9:41</span>
    <span style={{ letterSpacing: 2, opacity: 0.9 }}>▮▮▮</span>
  </div>
);
/** The two counters Figma puts in the home header's app bar. */
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
const CartRow: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      padding: sys('spacing-2xl'),
      background: sys('color-background-default'),
      borderRadius: sys('radius-lg'),
      display: 'flex',
      flexDirection: 'column',
      gap: sys('spacing-lg'),
    }}
  >
    <div style={{ fontSize: 13, fontWeight: 600 }}>คำสั่งซื้อ 901967795{n}</div>
    <div style={{ fontSize: 12, color: sys('color-text-tertiary-default') }}>
      ลอตเตอรี่ · เวลาที่ซื้อสำเร็จ 05/06/66 16:50
    </div>
  </div>
);

export const Compositions: StoryObj = {
  name: 'Compositions in use',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 1040 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Eight compositions, one shell</h2>
      <p
        style={{
          margin: '0 0 8px',
          fontSize: 13,
          color: sys('color-text-tertiary-default'),
          maxWidth: 620,
          lineHeight: 1.7,
        }}
      >
        The Frontend's 81 pages call <code style={{ fontFamily: mono }}>&lt;Layout&gt;</code>{' '}
        with {spec.$meta.derived_from.flag_combinations_found} different flag combinations. Group
        them by which structural slots are switched on and{' '}
        {spec.$meta.derived_from.structural_shapes_found} shapes remain — and those eight are
        this one shell with four optional slots. The variety was in flags, not in structure.
      </p>
      <p style={{ margin: '0 0 24px', fontSize: 12, color: sys('color-text-state-light-gray') }}>
        Dashed boxes are empty slots. This is the frame, not a page.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
        {shell.compositions.map((c: any) => (
          <Phone
            key={c.slots.join('+')}
            label={`${c.pages} ${c.pages === 1 ? 'page' : 'pages'}`}
            sub={c.slots.join(' + ')}
          >
            {/* Only the slots this composition uses are outlined — an unused slot is
                absent from the frame, not an empty box inside it. */}
            <AppShell showSlots={c.slots} />
          </Phone>
        ))}
        <Phone label="7 pages" sub="bare-screen">
          <BareScreen showSlots />
        </Phone>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════
//  Filled with real components
// ═══════════════════════════════════════════
export const Filled: StoryObj = {
  name: 'Filled with real components',
  render: () => {
    const [tab, setTab] = React.useState('safe');
    return (
      <div style={{ fontFamily: sans, maxWidth: 1000 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>The same shell, filled</h2>
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 13,
            color: sys('color-text-tertiary-default'),
            maxWidth: 640,
            lineHeight: 1.7,
          }}
        >
          Every slot below takes a real library component — Header, NavigationBar, ActionBar.
          Nothing on this page is drawn for the story.
        </p>
        <p
          style={{
            margin: '0 0 26px',
            padding: '10px 14px',
            maxWidth: 640,
            fontSize: 12.5,
            lineHeight: 1.8,
            borderLeft: `3px solid ${sys('color-border-accent-gray-light')}`,
            background: sys('color-background-light'),
            color: sys('color-text-secondary-default'),
          }}
        >
          หน้านี้เคยวาดแถบ &ldquo;Lotteryplus&rdquo; ขึ้นมาเองเป็น <code style={{ fontFamily: mono }}>div</code>{' '}
          เปล่าๆ ซึ่งไม่มีอยู่ใน Figma แก้แล้วเมื่อ 2026-08-19 — ตอนนี้ทั้งสองตัวอย่างใช้ทรงเดียวกับ
          template ของ Figma ต่างกันแค่เนื้อหาที่เสียบเข้าไป
        </p>

        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>หน้าหลัก · เต็มรูปแบบ</div>
            <div
              style={{
                fontSize: 11,
                fontFamily: mono,
                color: sys('color-text-tertiary-default'),
                marginBottom: 10,
              }}
            >
              status-bar + header(home · 146) + main + bottom-navbar
            </div>
            <div style={deviceFrame}>
              <AppShell
                statusBar={<StatusBar />}
                header={
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
                }
                bottomNavbar={<NavigationBar selectedKey={tab} onItemClick={setTab} fullWidth />}
              >
                <div style={{ padding: sys('spacing-2xl'), display: 'flex', flexDirection: 'column', gap: sys('spacing-lg') }}>
                  {[1, 2, 3].map((n) => (
                    <CartRow key={n} n={n} />
                  ))}
                </div>
              </AppShell>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>หน้ารอง · มีปุ่มสองปุ่ม</div>
            <div
              style={{
                fontSize: 11,
                fontFamily: mono,
                color: sys('color-text-tertiary-default'),
                marginBottom: 10,
              }}
            >
              status-bar + top-navbar(sub · 56) + main + footer(action-bar)
            </div>
            <div style={deviceFrame}>
              <AppShell
                statusBar={<StatusBar />}
                topNavbar={
                  // Figma ships the sub-page header with its subtitle hidden — one line
                  // is the default, and the shell shows the default. The two-line form
                  // stays in Header's own stories, labelled as the opt-in it is.
                  <Header
                    variant="sub"
                    title="ตู้เซฟของฉัน"
                    actionRight={<HeaderAction icon="filled-navigation" label="เมนู" />}
                  />
                }
                footer={
                  <ActionBar
                    secondary={{ label: 'ยกเลิก' }}
                    primary={{ label: 'ยืนยัน' }}
                    homeIndicator
                  />
                }
              >
                <div style={{ padding: sys('spacing-2xl'), display: 'flex', flexDirection: 'column', gap: sys('spacing-lg') }}>
                  {[1, 2, 3, 4].map((n) => (
                    <CartRow key={n} n={n} />
                  ))}
                </div>
              </AppShell>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Figma's own two templates, assembled from library components
//
//  `Guidline-UI Template › Layout` on the Re-naming Tokens file. Read on 2026-08-19 and
//  rebuilt here out of Header, NavigationBar and ActionBar — if the shell were wrong, or
//  a component's numbers were, these two would not line up with the Figma frames.
// ═══════════════════════════════════════════





export const FigmaTemplates: StoryObj = {
  name: '📐 Figma Template UI',
  render: () => {
    const [tab, setTab] = React.useState('order');

    return (
      <div style={{ fontFamily: sans, maxWidth: 1000 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Figma&apos;s two page templates</h2>
        <p style={{ margin: '0 0 8px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
          จาก <code style={{ fontFamily: mono }}>Guidline-UI Template › Layout</code> — ทีมดีไซน์วางไว้ 2 แบบ
          และเขียนกติกากำกับไว้ข้างๆ ทั้งสองหน้านี้ประกอบขึ้นจาก component ในไลบรารีล้วนๆ ไม่มีอะไรวาดขึ้นมาใหม่
        </p>
        <p style={{ margin: '0 0 10px', fontSize: 12.5, lineHeight: 1.75, color: sys('color-text-tertiary-default'), maxWidth: 640 }}>
          ทั้ง 2 แบบใช้ shell ตัวเดียวกับที่วัดมาจาก 81 หน้าของ Frontend — ต่างกันแค่ว่าเปิด slot ไหน
        </p>
        <p
          style={{
            margin: '0 0 26px',
            padding: '10px 14px',
            maxWidth: 640,
            fontSize: 12.5,
            lineHeight: 1.8,
            borderLeft: `3px solid ${sys('color-border-accent-gray-light')}`,
            background: sys('color-background-light'),
            color: sys('color-text-secondary-default'),
          }}
        >
          <strong>Figma เปิด slot บนแค่ช่องเดียว ส่วน Frontend เปิดสองช่อง</strong>{' '}
          <code style={{ fontFamily: mono }}>type=home-page</code> สูง 146px มี app bar
          (โลโก้ · 1,050 · 10 · hamburger) รวมอยู่ในตัวเลย ส่วน Frontend แยกเป็น TopNavbar
          กับ Header คนละ component — shell เลยเก็บไว้ 2 slot ตามฝั่ง FE แล้ว template ของ Figma
          ก็แค่ปล่อย <code style={{ fontFamily: mono }}>top-navbar</code> ว่างไว้
        </p>

        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>หน้าหลักที่กดจาก Navbar</div>
            <div style={{ fontSize: 11, fontFamily: mono, color: sys('color-text-tertiary-default'), marginBottom: 10 }}>
iPhone 16 · 393×852 — status-bar + header(home · 146) + main + bottom-navbar
            </div>
            <div style={deviceFrame}>
              <AppShell
                statusBar={<StatusBar />}
                header={
                  <Header
                    variant="home"
                    actionRight={
                      <span style={{ display: 'flex', alignItems: 'center', gap: sys('spacing-xl') }}>
                        <Counter icon="outline-NokPoints-W" value="1,050" />
                        <Counter icon="outline-Lottery" value="10" />
                        <HeaderAction icon="filled-navigation" label="เมนู" />
                      </span>
                    }
                  />
                }
                bottomNavbar={<NavigationBar selectedKey={tab} onItemClick={setTab} fullWidth />}
              >
                <div style={{ padding: sys('spacing-2xl'), display: 'flex', flexDirection: 'column', gap: sys('spacing-lg') }}>
                  {[1, 2, 3].map((n) => (
                    <CartRow key={n} n={n} />
                  ))}
                </div>
              </AppShell>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>หน้าที่ไม่ได้กดจาก Navbar</div>
            <div style={{ fontSize: 11, fontFamily: mono, color: sys('color-text-tertiary-default'), marginBottom: 10 }}>
iPhone 16 · 393×852 — status-bar + top-navbar(sub · 56) + main + footer(action-bar)
            </div>
            <div style={deviceFrame}>
              <AppShell
                statusBar={<StatusBar />}
                topNavbar={
                  <Header
                    variant="sub"
                    title="รายละเอียดคำสั่งซื้อ"
                    actionRight={<HeaderAction icon="filled-navigation" label="เมนู" />}
                  />
                }
                footer={<ActionBar primary={{ label: 'ชำระเงิน' }} homeIndicator />}
              >
                <div style={{ padding: sys('spacing-2xl'), display: 'flex', flexDirection: 'column', gap: sys('spacing-lg') }}>
                  {[1, 2, 3, 4].map((n) => (
                    <CartRow key={n} n={n} />
                  ))}
                </div>
              </AppShell>
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: 15, margin: '34px 0 8px' }}>กติกาที่ทีมดีไซน์เขียนกำกับไว้</h3>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', fontSize: 12.5, lineHeight: 1.9 }}>
          {(['main-page', 'sub-page'] as const).map((k) => (
            <ul key={k} style={{ margin: 0, paddingLeft: 20, maxWidth: 420, color: sys('color-text-secondary-default') }}>
              {shell.figma_templates[k].rules_written_by_the_designer.map((r: string) => (
                <li key={r} style={{ marginBottom: 4 }}>
                  {r}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <h3 style={{ fontSize: 15, margin: '34px 0 8px' }}>
          ⚠️ Component ที่หาไม่เจอใน Figma — template แก้แล้ว ที่อื่นยังค้าง
        </h3>
        <div
          style={{
            maxWidth: 820,
            padding: '14px 18px',
            border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
            borderLeft: `3px solid ${sys('color-status-error-default')}`,
            fontSize: 12.5,
            lineHeight: 1.9,
            color: sys('color-text-secondary-default'),
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            {shell.figma_templates._orphaned_components.status}
          </div>
          <div style={{ fontFamily: mono, fontSize: 11.5, marginBottom: 8 }}>
            {shell.figma_templates._orphaned_components.checked}
          </div>
          {shell.figma_templates._orphaned_components.finding}
          <div style={{ marginTop: 10 }}>
            <strong>ตัวที่ยังอยู่บนหน้าจริง:</strong>
            <ul style={{ margin: '4px 0 0', paddingLeft: 20 }}>
              {Object.entries(shell.figma_templates._orphaned_components.live_equivalents).map(([k, v]) => (
                <li key={k}>
                  <code style={{ fontFamily: mono, fontSize: 11.5 }}>{k}</code> — {String(v)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 style={{ fontSize: 15, margin: '30px 0 8px' }}>จุดที่ Figma กับ Frontend ไม่ตรงกัน</h3>
        <table style={{ borderCollapse: 'collapse', maxWidth: 820 }}>
          <tbody>
            {Object.entries(shell.figma_vs_frontend)
              .filter(([k]) => !k.startsWith('_'))
              .map(([k, v]) => (
                <tr key={k}>
                  <td
                    style={{
                      padding: '7px 12px 7px 0',
                      fontFamily: mono,
                      fontSize: 12,
                      color: sys('color-primary-default'),
                      verticalAlign: 'top',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {k}
                  </td>
                  <td
                    style={{
                      padding: '7px 0',
                      fontSize: 12.5,
                      lineHeight: 1.7,
                      color: sys('color-text-secondary-default'),
                    }}
                  >
                    {String(v)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  The slot contract
// ═══════════════════════════════════════════
export const SlotContract: StoryObj = {
  name: '🔍 Slot contract',
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

    return (
      <div style={{ fontFamily: sans, maxWidth: 900 }}>
        <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Slot contract</h2>
        <p style={{ margin: '0 0 22px', fontSize: 13, color: sys('color-text-tertiary-default'), maxWidth: 620, lineHeight: 1.7 }}>
          Read from{' '}
          <code style={{ fontFamily: mono }}>design-library/lotteryplus/patterns.json</code> —
          the counts are measurements, not estimates.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
          <thead>
            <tr>
              <th style={th}>Slot</th>
              <th style={th}>Required</th>
              <th style={th}>FE pages</th>
              <th style={th}>Figma</th>
              <th style={th}>Accepts</th>
              <th style={{ ...th, width: '42%' }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {shell.slots.map((s: any) => (
              <tr key={s.name}>
                <td style={{ ...td, fontFamily: mono, color: sys('color-primary-default') }}>{s.name}</td>
                <td style={td}>{s.required ? 'yes' : 'optional'}</td>
                <td style={{ ...td, fontFamily: mono }}>{s.present_in}</td>
                <td style={{ ...td, fontFamily: mono }}>
                  {s.figma_templates ? `${s.figma_templates} templates` : '—'}
                </td>
                <td style={{ ...td, fontFamily: mono, fontSize: 11 }}>{s.accepts.join(', ')}</td>
                <td style={{ ...td, color: sys('color-text-tertiary-default') }}>{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 15, margin: '0 0 8px' }}>Props that look structural but are not</h3>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: sys('color-text-tertiary-default'), maxWidth: 620, lineHeight: 1.7 }}>
          The Frontend's Layout carries these too. None of them changes the frame, so none
          becomes a slot — modelling them as slots is how a pattern turns into a god-object.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
          <tbody>
            {Object.entries(shell.not_slots)
              .filter(([k]) => !k.startsWith('_'))
              .map(([k, v]) => (
                <tr key={k}>
                  <td style={{ ...td, fontFamily: mono, width: 180 }}>{k}</td>
                  <td style={{ ...td, color: sys('color-text-tertiary-default') }}>{String(v)}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <h3 style={{ fontSize: 15, margin: '0 0 8px' }}>Still open</h3>
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8, maxWidth: 660 }}>
          {spec.open_questions.map((q: string) => (
            <li key={q} style={{ marginBottom: 8, color: sys('color-text-secondary-default') }}>
              {q}
            </li>
          ))}
        </ol>
      </div>
    );
  },
};

// ═══════════════════════════════════════════
//  Why the Frontend layout is not the pattern
// ═══════════════════════════════════════════
export const WhyNotPortTheLayout: StoryObj = {
  name: '⚠️ Why not port the Layout',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 700, lineHeight: 1.75 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 10px' }}>Why the Frontend&apos;s Layout is not this pattern</h2>
      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 16px' }}>
        The obvious move when adding a shell to a design system is to copy the one the app
        already has. Here that would have been a mistake, and the reason is worth recording.
      </p>

      <div
        style={{
          border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
          borderLeft: `3px solid ${sys('color-primary-default')}`,
          background: sys('color-primary-soft-light'),
          padding: '16px 20px',
          marginBottom: 18,
        }}
      >
        <div style={{ fontFamily: mono, fontSize: 12, marginBottom: 8 }}>
          components/layout/index.tsx
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: sys('color-text-secondary-default'), lineHeight: 1.9 }}>
          import 10 API modules
          <br />
          import 11 Zustand stores
        </div>
      </div>

      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 16px' }}>
        The shell fetches the cart, the profile, the wallet, order counts and web config on
        mount. That makes it a page container, not a frame. Porting it would pull the entire
        data layer into the design system, and every story would then need ten API mocks
        before it could render a rectangle.
      </p>

      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 16px' }}>
        So the <em>shape</em> was modelled instead of the code copied — which is what the
        Standard means by a pattern holding slots. The Frontend keeps its Layout with all its
        data; the design system holds the frame that Layout is an instance of. Both describe
        the same five slots, and neither has to know about the other.
      </p>

      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: 0 }}>
        This also sets the boundary for pages. Of {spec.$meta.derived_from.pages_measured}{' '}
        Frontend pages, 191 of 374 business components import a store, an API module or the
        router. Those cannot render here without heavy mocking — which is an argument for a
        second Storybook inside the Frontend repo, where the stores and MSW already live,
        rather than for dragging them into this one.
      </p>
    </div>
  ),
};
