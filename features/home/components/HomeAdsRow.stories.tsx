import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import HomeAdsRow from './HomeAdsRow';
import { Row, Spec } from './story-helpers';
import { AD_FEATURE, AD_STACKED } from '../fixtures';

// ═══════════════════════════════════════════
//  HomeAdsRow — Figma `Frame 1000013545` (22244:118774), 390×112
//  Two 175 columns 8 apart inside 16 of side padding: one tall tile, two short ones.
// ═══════════════════════════════════════════

const meta: Meta<typeof HomeAdsRow> = {
  title: 'Features/Home/HomeAdsRow',
  component: HomeAdsRow,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/**
 * Each tile is a picture, not a composition. In Figma they are layered vectors, rasters and
 * gradient text — `Home-Ads` alone holds a `Hidden Box` instance, a 157×82 raster and a
 * gradient headline — and none of it is content the page owns: the Frontend pulls this row
 * from the banner API, where a scheduler swaps the artwork weekly.
 *
 * No `aspectRatio` is declared. The file's own proportions decide, which is what stopped
 * `/profile` stretching its banners 16% wide.
 */
export const Default: StoryObj = {
  name: 'อย่างที่ Figma วาด',
  render: () => (
    <Row>
      <Spec title="โฆษณา 2 ช่อง" node="22244:118774" size="390×112">
        <HomeAdsRow feature={AD_FEATURE} stacked={AD_STACKED} />
      </Spec>
    </Row>
  ),
};

export const OneStacked: StoryObj = {
  name: 'คอลัมน์ขวามีใบเดียว',
  render: () => (
    <Row>
      <Spec title="รูปสั้นใบเดียว" node="—" size="ความสูงมาจากรูป ไม่ใช่จากกรอบ">
        <HomeAdsRow feature={AD_FEATURE} stacked={AD_STACKED.slice(0, 1)} />
      </Spec>
    </Row>
  ),
};
