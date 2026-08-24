import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LotterySection from './LotterySection';
import FlashSaleBanner from './FlashSaleBanner';
import { Row, Spec } from './story-helpers';
import { COUNTDOWN, FLASH_SALE_NOTE, HEADLINE, LOTTERY_SECTIONS } from '../fixtures';

// ═══════════════════════════════════════════
//  LotterySection — Figma `Lottery-1` … `Lottery-4`
//  All four are the same frame with different content, so they are one component.
// ═══════════════════════════════════════════

const meta: Meta<typeof LotterySection> = {
  title: 'Features/Home/Components/LotterySection',
  component: LotterySection,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Shapes: StoryObj = {
  name: 'สามรูปแบบที่หน้านี้ใช้',
  render: () => (
    <Row>
      <Spec title="หัวข้ออย่างเดียว + ปุ่ม" node="21084:85104" size="390×390" onRed>
        <LotterySection {...LOTTERY_SECTIONS[1]} />
      </Spec>

      <Spec title="หัวข้อ + info + คำอธิบาย" node="21084:85117" size="390×499" onRed>
        <LotterySection {...LOTTERY_SECTIONS[2]} />
      </Spec>

      <Spec title="รูปนำแทนหัวข้อ" node="21084:85069" size="390×763" onRed>
        <LotterySection
          {...LOTTERY_SECTIONS[0]}
          banner={
            <FlashSaleBanner
              headline={HEADLINE}
              headlineAlt="นาทีทอง เลขชุดใหญ่ จัดเต็ม!"
              note={FLASH_SALE_NOTE}
              countdown={COUNTDOWN}
            />
          }
        />
      </Spec>
    </Row>
  ),
};

/**
 * The grid is two fixed 170 columns, so an odd count leaves the last card on the left at
 * x=16 rather than stretching it across the row.
 */
export const OddCount: StoryObj = {
  name: 'จำนวนคี่ — ใบสุดท้ายอยู่ซ้าย',
  render: () => (
    <Row>
      <Spec title="3 ใบ" node="21084:85108" size="grid 2 คอลัมน์คงที่" onRed>
        <LotterySection {...LOTTERY_SECTIONS[1]} tiles={LOTTERY_SECTIONS[1].tiles.slice(0, 3)} />
      </Spec>
    </Row>
  ),
};
