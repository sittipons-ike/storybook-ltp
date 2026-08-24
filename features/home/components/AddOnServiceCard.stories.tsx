import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AddOnServiceCard from './AddOnServiceCard';
import { Row, Spec } from './story-helpers';
import { ADD_ON_SERVICES } from '../fixtures';

// ═══════════════════════════════════════════
//  AddOnServiceCard — Figma `add-on-service` (16821:38580, placed as 21086:148859)
//  A white 358×258 card at 24 padding: a red heading, then rows split by hairlines.
// ═══════════════════════════════════════════

const meta: Meta<typeof AddOnServiceCard> = {
  title: 'Features/Home/Components/AddOnServiceCard',
  component: AddOnServiceCard,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/**
 * The Figma instance holds three rows and hides the first — `Type=Safe Slot, Disabled=Yes`
 * is `visible: false` — which is why the card measures 258 rather than 327. Hidden is not
 * spec, so the rows arrive as a prop and the page passes the two that are shown.
 */
export const AsDrawn: StoryObj = {
  name: 'สองแถวที่ Figma โชว์',
  render: () => (
    <Row>
      <Spec title="บริการเสริม" node="21086:148859" size="358×258" onRed width={390}>
        <div style={{ padding: '0 16px' }}>
          <AddOnServiceCard services={ADD_ON_SERVICES} />
        </div>
      </Spec>
    </Row>
  ),
};

export const ThirdRow: StoryObj = {
  name: 'ถ้าเปิดแถวที่ถูกซ่อนไว้',
  render: () => (
    <Row>
      <Spec title="สามแถว — รับฝากลอตเตอรี่ กลับมา" node="I21086:148859;16821:38126" size="สูงขึ้นเป็น 327" onRed width={390}>
        <div style={{ padding: '0 16px' }}>
          <AddOnServiceCard
            services={[
              { action: { icon: 'outline-safe', label: 'รับฝาก' }, kicker: 'บริการ', name: 'รับฝากลอตเตอรี่' },
              ...ADD_ON_SERVICES,
            ]}
          />
        </div>
      </Spec>
    </Row>
  ),
};
