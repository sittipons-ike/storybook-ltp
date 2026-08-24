import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LotteryTile from './LotteryTile';
import { Row, Spec } from './story-helpers';
import { TICKET_FACE } from '../fixtures';

// ═══════════════════════════════════════════
//  LotteryTile — Figma `lottery-card`, Device=Mobile
//  Set 170×124 (21084:85095) · Select 170×196 (21084:85127)
// ═══════════════════════════════════════════

const meta: Meta<typeof LotteryTile> = {
  title: 'Features/Home/Components/LotteryTile',
  component: LotteryTile,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const SET = {
  type: 'set' as const,
  face: TICKET_FACE,
  faceAlt: 'สลากชุด เลข 850390',
  setSize: { label: 'เลขชุด', value: '5', unit: 'ใบ' },
  setPrize: { value: '30', unit: 'ล้าน' },
};

const SELECT = {
  type: 'select' as const,
  face: TICKET_FACE,
  faceAlt: 'สลาก เลขท้าย 39',
  category: 'เลขท้าย',
  number: '39',
  stock: '60',
  quantity: '5',
};

export const BothTypes: StoryObj = {
  name: 'สองชนิด',
  render: () => (
    <Row>
      <Spec title="Type=Set" node="21084:85095" size="170×124" onRed width={202}>
        <div style={{ padding: 16 }}>
          <LotteryTile {...SET} />
        </div>
      </Spec>
      <Spec title="Type=Select" node="21084:85127" size="170×196" onRed width={202}>
        <div style={{ padding: 16 }}>
          <LotteryTile {...SELECT} />
        </div>
      </Spec>
    </Row>
  ),
};

/**
 * The heading band is pinned to 32 and the category is the part that gives way.
 *
 * Without that, a long category wraps, the band grows to 74, the tile becomes 238 and the
 * tile beside it in the row grows with it — one long name and the whole row is a different
 * height. The number and the stock are what the card is for, so the name ellipsizes.
 */
export const LongHeading: StoryObj = {
  name: 'หัวยาวเกินแถว',
  render: () => (
    <Row>
      <Spec title="ปกติ" node="I21084:85127;14291:138124" size="แถบหัว 32" onRed width={202}>
        <div style={{ padding: 16 }}>
          <LotteryTile {...SELECT} />
        </div>
      </Spec>
      <Spec title="ชื่อหมวดยาว — ย่อ ไม่ดันการ์ด" node="—" size="แถบหัวยัง 32" onRed width={202}>
        <div style={{ padding: 16 }}>
          <LotteryTile {...SELECT} category="เลขท้ายพิเศษประจำงวด" number="999999" stock="1,200" />
        </div>
      </Spec>
    </Row>
  ),
};
