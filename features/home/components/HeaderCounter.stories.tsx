import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import HeaderCounter from './HeaderCounter';
import Header, { HeaderAction } from '../../../ui/components/Header/Header';
import { Row, Spec } from './story-helpers';

// ═══════════════════════════════════════════
//  HeaderCounter — Figma `Button / CTA Button / Medium` in `appbar-main` (21282:140831)
//  A 24 icon and a button/md/semibold number, 4 apart, white on the red bar.
// ═══════════════════════════════════════════

const meta: Meta<typeof HeaderCounter> = {
  title: 'Features/Home/HeaderCounter',
  component: HeaderCounter,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/**
 * Figma models it as a button frame with its fill turned off (`visible: false`), so there
 * is no chip — an icon and a number.
 *
 * It is a component rather than something the story assembles because `check-pages.py`
 * holds `pages/*` — stories included — to composing: a story may not name a token, and a
 * counter is nothing but tokens.
 */
export const InTheHeader: StoryObj = {
  name: 'ในหัวจริง',
  render: () => (
    <Row>
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
    </Row>
  ),
};
