import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import HomePage from './Home';
import AppShell from '../../../ui/patterns/AppShell/AppShell';
import DeviceFrame from '../../../ui/patterns/DeviceFrame/DeviceFrame';
import StatusBar from '../../../ui/components/StatusBar/StatusBar';
import NavigationBar from '../../../ui/components/NavigationBar/NavigationBar';
import Header, { HeaderAction } from '../../../ui/components/Header/Header';
import HeaderCounter from '../../../ui/components/Header/HeaderCounter';
import {
  AD_FEATURE,
  AD_STACKED,
  ADD_ON_SERVICES,
  COUNTDOWN,
  FLASH_SALE_NOTE,
  HEADLINE,
  LOTTERY_SECTIONS,
  PROMO_BANNERS,
  QUICK_MENU,
  SEO,
} from '../fixtures';

// ═══════════════════════════════════════════
//  / — the home page.
//
//  Figma `home-page(mobile)` (21085:96373), 390 x 4651, read node by node on 2026-08-22.
//  The Frontend can only ever show whichever state its store happens to hold; this is the
//  same page with the states that matter laid out side by side.
// ═══════════════════════════════════════════

const meta: Meta<typeof HomePage> = {
  title: 'Features/Home/Pages/Home',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const FLASH_SALE = {
  headline: HEADLINE,
  headlineAlt: 'นาทีทอง เลขชุดใหญ่ จัดเต็ม!',
  note: FLASH_SALE_NOTE,
  countdown: COUNTDOWN,
};

const BASE = {
  adFeature: AD_FEATURE,
  adStacked: AD_STACKED,
  promoBanners: PROMO_BANNERS,
  flashSale: FLASH_SALE,
  sections: LOTTERY_SECTIONS,
  quickMenu: QUICK_MENU,
  seo: SEO,
  addOnServices: ADD_ON_SERVICES,
};

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 11,
      opacity: 0.6,
      marginBottom: 8,
    }}
  >
    {children}
  </div>
);

/**
 * The shell, filled to match Figma's `Top-bar` (`21084:85177`) and
 * `navigation-bar/Mobile-v2 state=home` (`21084:85180`).
 *
 * The `header` slot stays empty: `header-bar-mobile type=home-page` is 154 tall and carries
 * the app bar, the wordmark and the slogan in one block, and Figma puts it in the navbar
 * position with nothing under it. Filling both slots is what put an extra red block at the
 * top of the first `/profile` story.
 */
const InShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppShell
    statusBar={<StatusBar />}
    topNavbar={
      <Header
        variant="home"
        actionRight={
          <>
            <HeaderCounter icon="outline-NokPoints-W" value="1,050" label="นกแคช" />
            <HeaderCounter icon="outline-Lottery" value="10" label="สลากของฉัน" />
            <HeaderAction icon="filled-navigation" label="เมนู" />
          </>
        }
      />
    }
    bottomNavbar={<NavigationBar selectedKey="home" fullWidth />}
  >
    {children}
  </AppShell>
);

export const InTheShell: StoryObj = {
  name: 'ในเครื่องจริง',
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        <Caption>/ · iPhone 16 · 393×852</Caption>
        <DeviceFrame>
          <InShell>
            <HomePage {...BASE} />
          </InShell>
        </DeviceFrame>
      </div>
    </div>
  ),
};

export const EveryState: StoryObj = {
  name: 'ทุก state เรียงกัน',
  render: () => {
    const cases: { caption: string; props: React.ComponentProps<typeof HomePage> }[] = [
      { caption: 'ปกติ', props: BASE },
      {
        caption: 'นาทีทองจบแล้ว — บล็อกนับถอยหลังหาย',
        props: { ...BASE, flashSale: undefined },
      },
      {
        caption: 'ไม่มีแบนเนอร์รอบนี้ — แถบหายทั้งก้อน',
        props: { ...BASE, promoBanners: [] },
      },
      {
        caption: 'เหลือหมวดเดียว — เลขท้าย 2 ตัว หมด',
        props: { ...BASE, flashSale: undefined, sections: LOTTERY_SECTIONS.slice(1, 3) },
      },
      {
        caption: 'แถวสุดท้ายมีใบเดียว',
        props: {
          ...BASE,
          flashSale: undefined,
          sections: [{ ...LOTTERY_SECTIONS[1], tiles: LOTTERY_SECTIONS[1].tiles.slice(0, 3) }],
        },
      },
      {
        caption: 'หัวการ์ดยาวเกินแถว — ต้องย่อ ไม่ใช่ดันการ์ด',
        props: {
          ...BASE,
          flashSale: undefined,
          sections: [
            {
              ...LOTTERY_SECTIONS[2],
              tiles: LOTTERY_SECTIONS[2].tiles.map((t, i) =>
                i === 0 ? { ...t, category: 'เลขท้ายพิเศษ', number: '999999', stock: '1,200' } : t,
              ),
            },
          ],
        },
      },
    ];

    return (
      <div style={{ padding: 24, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {cases.map(({ caption, props }) => (
          <div key={caption}>
            <Caption>{caption}</Caption>
            <DeviceFrame>
              <InShell>
                <HomePage {...props} />
              </InShell>
            </DeviceFrame>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * The page unrolled, out of the phone. 4,651px of Figma is hard to review 852 at a time,
 * and the scroll container hides where one block ends and the next begins.
 */
export const FullLength: StoryObj = {
  name: 'ทั้งหน้า ไม่ต้องเลื่อน',
  render: () => (
    <div style={{ padding: 24 }}>
      <Caption>/ · 390 กว้าง · เต็มความสูง 4651 ของ Figma</Caption>
      <div style={{ width: 390, overflow: 'hidden' }}>
        <Header
          variant="home"
          actionRight={
            <>
              <HeaderCounter icon="outline-NokPoints-W" value="1,050" label="นกแคช" />
              <HeaderCounter icon="outline-Lottery" value="10" label="สลากของฉัน" />
              <HeaderAction icon="filled-navigation" label="เมนู" />
            </>
          }
        />
        <HomePage {...BASE} />
      </div>
    </div>
  ),
};
