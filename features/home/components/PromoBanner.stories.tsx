import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PromoBanner from './PromoBanner';
import { Row, Spec } from './story-helpers';
import { PROMO_BANNERS } from '../fixtures';

// ═══════════════════════════════════════════
//  PromoBanner — Figma `Banner Promote` (22244:118794), 390×120
//  A 358-wide banner inside 16 of side padding, 16 above the dots: 96 + 16 + 8 = 120.
// ═══════════════════════════════════════════

const meta: Meta<typeof PromoBanner> = {
  title: 'Features/Home/Components/PromoBanner',
  component: PromoBanner,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/**
 * The banner is artwork: `Home-Banner` (`22244:118800`) is a radius-16 card with a two-stop
 * gradient, a 258×260 radial glow bleeding past its own frame, four isolation groups of
 * birds and two gradient-filled headlines. It is also the slot the Frontend fills from the
 * banner API. Both facts point the same way — one `<img>`, and the `alt` carries the words.
 */
export const Default: StoryObj = {
  name: 'สามใบ — มีจุดบอกหน้า',
  render: () => (
    <Row>
      <Spec title="แบนเนอร์ + จุด" node="22244:118794" size="390×120">
        <PromoBanner banners={PROMO_BANNERS} />
      </Spec>
      <Spec title="อยู่ใบที่ 2" node="—" size="pill ย้ายตาม active">
        <PromoBanner banners={PROMO_BANNERS} active={1} />
      </Spec>
    </Row>
  ),
};

/** One banner draws no dots: a single dot is a control that cannot be used. */
export const SingleAndEmpty: StoryObj = {
  name: 'ใบเดียว · ไม่มีเลย',
  render: () => (
    <Row>
      <Spec title="ใบเดียว — ไม่มีจุด" node="—" size="สูง 96 ไม่ใช่ 120">
        <PromoBanner banners={PROMO_BANNERS.slice(0, 1)} />
      </Spec>
      <Spec title="ไม่มีแบนเนอร์รอบนี้" node="—" size="บล็อกหายทั้งก้อน ไม่เหลือช่องว่าง">
        <PromoBanner banners={[]} />
      </Spec>
    </Row>
  ),
};
