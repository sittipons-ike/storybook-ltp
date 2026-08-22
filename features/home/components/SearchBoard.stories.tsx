import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SearchBoard from './SearchBoard';
import { Row, Spec } from './story-helpers';

// ═══════════════════════════════════════════
//  SearchBoard — Figma `main-home-card`, type=search-card (21084:85041)
//  390×266, radius 16, 16 of padding top and bottom, #FAFAFA → #FFFFFF.
// ═══════════════════════════════════════════

const meta: Meta<typeof SearchBoard> = {
  title: 'Features/Home/SearchBoard',
  component: SearchBoard,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/**
 * The red apron: `Top-BG` (`21084:85034`) paints brand red to y=209 while the header stops
 * at 201, so the card's first 8px sit on red rather than on the page's grey. Figma gets
 * there by letting the header overflow a fixed-height `Top-bar` frame; the card carries its
 * own bleed here instead, which keeps the shell's slots honest — a slot that says 154 is 154.
 */
export const Default: StoryObj = {
  name: 'อย่างที่หน้าใช้',
  render: () => (
    <Row>
      <Spec title="แถบแดง 8 อยู่หลังมุมบน" node="21084:85041" size="390×266">
        <SearchBoard type="All" />
      </Spec>
      <Spec title="ไม่มี bleed — เทียบให้เห็น" node="—" size="มุมบนอยู่บนพื้นเทาของหน้า">
        <SearchBoard type="All" bleed={0} />
      </Spec>
    </Row>
  ),
};

/** The card is a frame; what fills it is `LottoBoard`'s `SearchCard` and its own three types. */
export const Types: StoryObj = {
  name: 'สามชนิดของ SearchCard',
  render: () => (
    <Row>
      <Spec title="All" node="I21084:85041;14854:25314" size="Type=All">
        <SearchBoard type="All" />
      </Spec>
      <Spec title="Single" node="—" size="Type=Single">
        <SearchBoard type="Single" />
      </Spec>
      <Spec title="Set" node="—" size="Type=Set — มี SetSelect เพิ่ม">
        <SearchBoard type="Set" />
      </Spec>
    </Row>
  ),
};
