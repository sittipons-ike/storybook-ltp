import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import QuickMenuGrid from './QuickMenuGrid';
import { Row, Spec } from './story-helpers';
import { QUICK_MENU } from '../fixtures';

// ═══════════════════════════════════════════
//  QuickMenuGrid — Figma `menu-nok-more-mobile Var.2`, Type=Default (21086:143142)
//  390×284: a 40 heading row, two 94-tall rows 16 apart, a 32 dots row, 8 below.
// ═══════════════════════════════════════════

const meta: Meta<typeof QuickMenuGrid> = {
  title: 'Features/Home/QuickMenuGrid',
  component: QuickMenuGrid,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = {
  name: 'อย่างที่ Figma วาด',
  render: () => (
    <Row>
      <Spec title="บริการ — 5 + 5" node="21086:143142" size="390×284">
        <QuickMenuGrid rows={QUICK_MENU} />
      </Spec>
    </Row>
  ),
};

/**
 * Figma lays each row out 456 wide inside a 390 frame, so the fifth item is cut off — that
 * is how a horizontally scrolling row is drawn on a fixed canvas. The row scrolls here and
 * the items keep their measured 72 rather than being squeezed to fit five into 390.
 *
 * `ศูนย์ช่วยเหลือ` measures 73 in a 72 slot and Figma draws it at x=-0.5, overrunning the
 * column on both sides. Letting it wrap instead costs the row 18px and breaks the 94 every
 * item shares, so the label is `nowrap`.
 */
export const Overflow: StoryObj = {
  name: 'แถวเลื่อนได้ · label ล้นคอลัมน์',
  render: () => (
    <Row>
      <Spec title="แถวเดียว ชื่อยาวทุกอัน" node="I21086:143142;21085:106382" size="แต่ละอันยัง 72×94">
        <QuickMenuGrid
          title="บริการ"
          rows={[
            [
              { logo: 'gp-nm-service', label: 'ศูนย์ช่วยเหลือ' },
              { logo: 'gp-nm-howto', label: 'วิธีการใช้งาน' },
              { logo: 'gp-nm-lottocheck', label: 'ตรวจสลากฯ' },
              { logo: 'gp-nm-affiliate', label: 'แนะนำเพื่อน' },
              { logo: 'gp-nm-scancheck', label: 'ฝากตรวจ' },
            ],
          ]}
          pages={1}
        />
      </Spec>
    </Row>
  ),
};
