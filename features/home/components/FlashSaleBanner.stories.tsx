import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FlashSaleBanner from './FlashSaleBanner';
import { Row, Spec } from './story-helpers';
import { COUNTDOWN, FLASH_SALE_NOTE, HEADLINE } from '../fixtures';

// ═══════════════════════════════════════════
//  FlashSaleBanner — Figma `Frame 43608` + `Frame 43604` (21084:85070, 85076)
//
//  Two things a hugging box would not reproduce:
//    itemSpacing -8   the note overlaps the artwork rather than following it
//    height 193       the frame is shorter than its contents (167.14 − 8 + 36 = 195.14)
//                     and does not clip, so the space it claims and the space its content
//                     uses are different numbers. The section's 763 is built from 193.
// ═══════════════════════════════════════════

const meta: Meta<typeof FlashSaleBanner> = {
  title: 'Features/Home/FlashSaleBanner',
  component: FlashSaleBanner,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = {
  name: 'นาทีทอง',
  render: () => (
    <Row>
      <Spec title="รูป + บรรทัดที่ซ้อนขึ้น 8 + นับถอยหลัง" node="21084:85070" size="กรอบบน 193 + 16 + 66" onRed>
        <FlashSaleBanner
          headline={HEADLINE}
          headlineAlt="นาทีทอง เลขชุดใหญ่ จัดเต็ม!"
          note={FLASH_SALE_NOTE}
          countdown={COUNTDOWN}
        />
      </Spec>
    </Row>
  ),
};

export const LongerNote: StoryObj = {
  name: 'บรรทัดยาวขึ้น',
  render: () => (
    <Row>
      <Spec title="ข้อความยาวจนขึ้นสองบรรทัด" node="—" size="กรอบยังจอง 193" onRed>
        <FlashSaleBanner
          headline={HEADLINE}
          headlineAlt="นาทีทอง เลขชุดใหญ่ จัดเต็ม!"
          note="เพียง 1,000 ชุดเท่านั้น เริ่มขาย 18:00 น. ของทุกวัน"
          countdown={COUNTDOWN}
        />
      </Spec>
    </Row>
  ),
};
