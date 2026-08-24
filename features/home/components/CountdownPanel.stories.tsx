import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CountdownPanel from './CountdownPanel';
import { Row, Spec } from './story-helpers';
import { COUNTDOWN } from '../fixtures';

// ═══════════════════════════════════════════
//  CountdownPanel — Figma `Frame 43604` (21084:85076), 390×66
//  Four white 66×66 blocks at radius 8, a white colon between them, 6 apart.
// ═══════════════════════════════════════════

const meta: Meta<typeof CountdownPanel> = {
  title: 'Features/Home/Components/CountdownPanel',
  component: CountdownPanel,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = {
  name: 'อย่างที่ Figma วาด',
  render: () => (
    <Row>
      <Spec title="นาทีทอง" node="21084:85076" size="390×66 · ช่อง 66×66" onRed>
        <CountdownPanel units={COUNTDOWN} />
      </Spec>
    </Row>
  ),
};

/**
 * Zero padding is the caller's, not the component's — `9` and `09` are different numbers
 * to show, and a panel that pads for you cannot show the first one.
 *
 * The number sits in a 36-tall box against a 48 line-height, which reads like an overflow
 * until you notice Figma sets `textAlignVertical: CENTER`: the line box is centred on the
 * text box, so the glyph lands in the same place either way.
 */
export const Widths: StoryObj = {
  name: 'ตัวเลขกว้างไม่เท่ากัน',
  render: () => (
    <Row>
      <Spec title="เลขหลักเดียว ไม่เติมศูนย์" node="—" size="ช่องยังกว้าง 66" onRed>
        <CountdownPanel
          units={[
            { value: '0', unit: 'วัน' },
            { value: '9', unit: 'ชั่วโมง' },
            { value: '9', unit: 'นาที' },
            { value: '7', unit: 'วินาที' },
          ]}
        />
      </Spec>
      <Spec title="สามหลัก" node="—" size="ช่องยังกว้าง 66" onRed>
        <CountdownPanel
          units={[
            { value: '120', unit: 'วัน' },
            { value: '23', unit: 'ชั่วโมง' },
            { value: '59', unit: 'นาที' },
            { value: '59', unit: 'วินาที' },
          ]}
        />
      </Spec>
    </Row>
  ),
};
