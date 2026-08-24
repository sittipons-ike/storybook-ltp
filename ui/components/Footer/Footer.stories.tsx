import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Footer from './Footer';
import { sys } from '../../foundations/tokens';

// ═══════════════════════════════════════════
//  Footer — Figma `footer-mobile`, 390×190.
//  Designed, but the Frontend does not render a footer below 1280px.
// ═══════════════════════════════════════════

const meta: Meta<typeof Footer> = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: { layout: 'padded' },
};
export default meta;

const sans = "'Graphik TH', sans-serif";
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// The five channels used to be declared here with stand-in icons — a bell for Facebook, a
// tick for TikTok — which resolved fine and drew the wrong thing. They are the component's
// own artwork (the glyphs live inside `footer-mobile` in Figma), so they moved into
// Footer.tsx as defaults. `<Footer />` now draws what Figma draws with nothing passed.

export const Default: StoryObj = {
  name: 'footer-mobile',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 700 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 6px' }}>Footer</h2>
      <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.75, color: sys('color-text-tertiary-default') }}>
        พื้นหลัง <code style={{ fontFamily: mono }}>topfoot-bg-red-dark</code> เข้มกว่า header หนึ่งขั้น —
        คู่นี้แหละคือที่มาของชื่อกลุ่ม <code style={{ fontFamily: mono }}>top-and-footer</code>
      </p>
      <p
        style={{
          margin: '0 0 20px',
          padding: '10px 14px',
          fontSize: 12.5,
          lineHeight: 1.8,
          borderLeft: `3px solid ${sys('color-border-accent-gray-light')}`,
          background: sys('color-background-light'),
          color: sys('color-text-secondary-default'),
        }}
      >
        <strong>วัดสูงได้ 192px ไม่ใช่ 190 — อันนี้ถูกแล้ว</strong> อย่าไปแก้ Figma วาดตัวนี้เป็น mobile
        (390) แต่ typography token เป็น responsive พอเปิดที่จอกว้าง ≥768px มันเข้าโหมด desktop ป้าย
        &ldquo;ติดตามเรา :&rdquo; เลยเป็น 16/24 แทน 14/22 → สูงขึ้น 2px ย่อจอลงต่ำกว่า 768 เมื่อไหร่ ได้ 190
        เป๊ะทันที (ยืนยันแล้วที่ 375px)
      </p>
      <div
        style={{
          width: 390,
          border: `1px solid ${sys('color-border-accent-gray-light')}`,
          borderRadius: sys('radius-lg'),
          overflow: 'hidden',
        }}
      >
        <Footer />
      </div>
    </div>
  ),
};

export const NotShipped: StoryObj = {
  name: '⚠️ ออกแบบไว้ แต่ยังไม่ได้ใช้',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 700, lineHeight: 1.8 }}>
      <h2 style={{ fontSize: 20, margin: '0 0 12px' }}>Figma กับ Frontend ไม่ตรงกันตรงนี้จริงๆ</h2>

      <div
        style={{
          border: `1px solid ${sys('color-border-accent-gray-soft-light')}`,
          borderLeft: `3px solid ${sys('color-status-warning-default')}`,
          background: sys('color-background-light'),
          padding: '16px 20px',
          marginBottom: 20,
          fontFamily: mono,
          fontSize: 12,
          lineHeight: 2,
        }}
      >
        Figma&nbsp;&nbsp;&nbsp;&nbsp;footer-mobile · 390×190 · วาดเสร็จแล้ว
        <br />
        Frontend&nbsp;&nbsp;components/footer → if (!isDesktop) return null&nbsp;&nbsp;// ตัดที่ 1280px
      </div>

      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: '0 0 16px' }}>
        แปลว่า footer บนมือถือถูกออกแบบไว้แล้ว แต่ไม่เคยขึ้นจอผู้ใช้เลย component นี้จึงสร้างตามที่ Figma
        วาด ไม่ใช่ตามที่ FE ทำ — เพราะกติกาที่ตกลงกันคือ Figma เป็นเจ้าของค่า
      </p>

      <p style={{ fontSize: 13.5, color: sys('color-text-secondary-default'), margin: 0 }}>
        ต้องตัดสินใจ: ปล่อย footer มือถือให้ขึ้นจริง หรือลบดีไซน์ทิ้ง — ค้างไว้แบบนี้แปลว่ามีดีไซน์ที่ไม่มีใครดูแล
        คำถามนี้อยู่ใน <code style={{ fontFamily: mono }}>patterns.json → open_questions</code> แล้ว
      </p>
    </div>
  ),
};
