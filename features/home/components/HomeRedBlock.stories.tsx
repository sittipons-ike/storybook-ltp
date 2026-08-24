import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import HomeRedBlock from './HomeRedBlock';
import Text from '../../../ui/components/Text/Text';
import { Row, Spec } from './story-helpers';

// ═══════════════════════════════════════════
//  HomeRedBlock — Figma `Lottery` (21084:85067 and 21084:85173)
//  The brand-red ground the lottery sections and the service card sit on.
// ═══════════════════════════════════════════

const meta: Meta<typeof HomeRedBlock> = {
  title: 'Features/Home/Components/HomeRedBlock',
  component: HomeRedBlock,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const Filler: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ padding: '0 16px' }}>
    <Text role="title-lg-semibold" tone="on-bgcolor" as="p" align="center">
      {label}
    </Text>
  </div>
);

/**
 * It exists so the page never says "red". `check-pages.py` refuses a page that names a
 * colour, and it is right to: the section background is a decision the design system owns,
 * not a string a page repeats.
 */
export const TwoShapes: StoryObj = {
  name: 'สองรูปแบบ',
  render: () => (
    <Row>
      <Spec title="บล็อกหมวดสลาก" node="21084:85067" size="มุมบน 24 · gap 32 · ล่าง 32">
        <HomeRedBlock>
          <Filler label="หมวดที่หนึ่ง" />
          <Filler label="หมวดที่สอง" />
        </HomeRedBlock>
      </Spec>
      <Spec title="บล็อกบริการเสริม" node="21084:85173" size="ไม่มีมุม · บน 16 · ล่าง 32">
        <HomeRedBlock flat>
          <Filler label="บริการเสริม" />
        </HomeRedBlock>
      </Spec>
    </Row>
  ),
};
