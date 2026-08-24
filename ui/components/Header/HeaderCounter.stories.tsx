import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import HeaderCounter from './HeaderCounter';
import Header, { HeaderAction } from './Header';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  HeaderCounter — Figma `Button / CTA Button / Medium` in `appbar-main` (21282:140831)
//  A 24 icon and a button/md/semibold number, 4 apart, white on the red bar.
// ═══════════════════════════════════════════

const meta: Meta<typeof HeaderCounter> = {
  title: 'Components/Layout/Header/HeaderCounter',
  component: HeaderCounter,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const Spec: React.FC<{ title: string; node: string; size: string; children: React.ReactNode }> = ({
  title,
  node,
  size,
  children,
}) => (
  <div style={{ fontFamily: sans }}>
    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{title}</div>
    <div style={{ fontFamily: mono, fontSize: 11, color: sys('color-text-tertiary-default'), marginBottom: 8 }}>
      {node} · {size}
    </div>
    <div style={{ width: 390, overflow: 'hidden' }}>{children}</div>
  </div>
);

/**
 * Figma models it as a button frame with its fill turned off (`visible: false`), so there is
 * no chip — an icon and a number.
 *
 * Which icons is the component's decision, and the home header's are `outline-NokPoints-W`
 * and `outline-Lottery` at 24. The numbers are not: a balance and a ticket count belong to
 * whoever is signed in, so Header takes the assembled row as `actionRight`.
 */
export const InTheHeader: StoryObj = {
  name: 'ในหัวจริง',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 24 }}>
      <Spec title="home header" node="21282:143458" size="390×154">
        <Header
          variant="home"
          actionRight={
            <>
              <HeaderCounter icon="outline-NokPoints-W" value="1,050" label="นกแคช" />
              <HeaderCounter icon="outline-Lottery" value="10" label="สลากของฉัน" />
              <HeaderAction icon="filled-navigation" label="เมนู" />
            </>
          }
        />
      </Spec>
      <Spec title="ยอดยาว" node="—" size="แถวยืดตามเลข ไม่ตัด">
        <Header
          variant="home"
          actionRight={
            <>
              <HeaderCounter icon="outline-NokPoints-W" value="5,239,822" label="นกแคช" />
              <HeaderAction icon="filled-navigation" label="เมนู" />
            </>
          }
        />
      </Spec>
    </div>
  ),
};

/** On its own, against the bar's red, so the pairing of icon and number can be read. */
export const Alone: StoryObj = {
  name: 'ตัวเดียว',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, background: sys('color-background-accent-red') }}>
      <HeaderCounter icon="outline-NokPoints-W" value="1,050" label="นกแคช" />
      <HeaderCounter icon="outline-Lottery" value="10" label="สลากของฉัน" />
    </div>
  ),
};
