import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CarouselDots from './CarouselDots';
import { Row, Spec } from './story-helpers';

// ═══════════════════════════════════════════
//  CarouselDots — Figma `Navigation` (9005:33166…33168)
//  Active: 16×8 pill, radius 4, brand red. Others: 8×8 grey circles. 8 apart.
// ═══════════════════════════════════════════

const meta: Meta<typeof CarouselDots> = {
  title: 'Features/Home/CarouselDots',
  component: CarouselDots,
  parameters: { layout: 'padded' },
};
export default meta;

/**
 * Figma draws the set with three slots and hides the ones a carousel does not need — the
 * quick menu's third dot is `visible: false`, which is why its instance measures 32 wide
 * and the banner's measures 48. So the count is a prop rather than three fixed dots.
 */
export const Counts: StoryObj = {
  name: 'จำนวนหน้า',
  render: () => (
    <Row>
      <Spec title="แบนเนอร์ — 3 หน้า" node="22244:121667" size="กว้าง 48" width={120}>
        <div style={{ padding: 12 }}>
          <CarouselDots count={3} active={0} />
        </div>
      </Spec>
      <Spec title="quick menu — 2 หน้า" node="I21086:143142;20032:6924" size="กว้าง 32" width={120}>
        <div style={{ padding: 12 }}>
          <CarouselDots count={2} active={0} />
        </div>
      </Spec>
      <Spec title="อยู่หน้าที่ 2" node="—" size="pill ย้ายตาม active" width={120}>
        <div style={{ padding: 12 }}>
          <CarouselDots count={3} active={1} />
        </div>
      </Spec>
    </Row>
  ),
};
