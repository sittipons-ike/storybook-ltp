import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SeoPanel from './SeoPanel';
import { Row, Spec } from './story-helpers';
import { SEO } from '../fixtures';

// ═══════════════════════════════════════════
//  SeoPanel — Figma `SEO Support` (21084:85163), 390×210
//  A heading, a hairline, and a body that runs 1,488px if you let it.
// ═══════════════════════════════════════════

const meta: Meta<typeof SeoPanel> = {
  title: 'Features/Home/Components/SeoPanel',
  component: SeoPanel,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/**
 * Figma writes the heading as one text layer with two sizes in it (28/42 then 20/36) and
 * the body as one with four (14/22 then 10/16). A mixed-size text node is two roles wearing
 * one layer, so the component takes them apart.
 */
export const Folded: StoryObj = {
  name: 'พับไว้ — อย่างที่หน้าใช้',
  render: () => (
    <Row>
      <Spec title="body พับที่ 34" node="21084:85163" size="390×210">
        <SeoPanel {...SEO} />
      </Spec>
    </Row>
  ),
};

/**
 * The fade is `Rectangle 37` (`21084:85171`): 390 × 64, the section's red from zero alpha
 * to full, running down. It is pinned to the *top* of the folded body and allowed to run
 * past it — Figma puts it at y=128.5 against a body starting at 128 — so the ramp is only
 * about half-opaque where the last visible line is. Anchoring it to the bottom instead puts
 * the opaque end on the text and greys out the first line, which is what it did at first.
 */
export const Expanded: StoryObj = {
  name: 'กางออก — ไม่มีเงาไล่สี',
  render: () => (
    <Row>
      <Spec title="expanded" node="—" size="ไม่ตัด ไม่มี overlay">
        <SeoPanel {...SEO} expanded />
      </Spec>
    </Row>
  ),
};
