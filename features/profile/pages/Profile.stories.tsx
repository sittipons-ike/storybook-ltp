import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ProfilePage, { type ProfileMenuItem } from './Profile';
import AppShell from '../../../ui/patterns/AppShell/AppShell';
import DeviceFrame from '../../../ui/patterns/DeviceFrame/DeviceFrame';
import StatusBar from '../../../ui/components/StatusBar/StatusBar';
import { AVATAR } from '../fixtures';
import NavigationBar from '../../../ui/components/NavigationBar/NavigationBar';
import ProfileHeader from '../../../ui/components/Header/ProfileHeader';
import { AFFILIATE_BANNER, COUPON_BANNER, NOKSHOP_BANNER } from '../fixtures';
import {
  PROFILE,
  PROFILE_NO_BANK,
  PROFILE_UNDERAGE,
  WALLET,
  WALLET_LONG,
  WEB_CONFIG,
} from '../../../ui/fixtures/user';

// ═══════════════════════════════════════════
//  /profile — the first page of the page tier.
//
//  The Frontend can only ever show whichever state its store happens to hold.
//  This is the same page with every state laid out side by side, which is the
//  reason for the tier: it is the designer's copy, not a second implementation.
// ═══════════════════════════════════════════

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/Profile',
  component: ProfilePage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** `src/constants/profile/index.tsx` → PROFILE_INFO_ITEMS, verbatim. */
const MENU: ProfileMenuItem[] = [
  { icon: 'outline-member', title: 'ข้อมูลส่วนตัว' },
  { icon: 'filled-qrcode-scan', title: 'คิวอาร์โค้ดของฉัน' },
  { icon: 'outline-Bank', title: 'บัญชีธนาคาร' },
  { icon: 'outline-truck', title: 'ที่อยู่ของฉัน' },
  { icon: 'outline-History Payment', title: 'ประวัติการถูกรางวัล', badge: 'ใหม่!' },
];

/** `src/components/profile/help-info` — one row. */
const HELP: ProfileMenuItem[] = [{ icon: 'outline-contact', title: 'ติดต่อเจ้าหน้าที่' }];

const BANNERS = {
  couponBanner: COUPON_BANNER,
  affiliateBanner: AFFILIATE_BANNER,
  nokshopBanner: NOKSHOP_BANNER,
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
 * The shell, filled to match Figma's `[Mobile] Profile` (22483:144307): a status bar, the
 * 72-tall profile header, the body, and the navigation bar. Four slots, 47 + 72 + … + 124.
 *
 * The `header` slot stays empty on purpose. The Frontend's page passes `hasHeader`, which
 * draws the 146-tall red block with the wordmark — and Figma's profile page has no such
 * block. Following the Frontend here is what put an extra 146px of red at the top of the
 * first version of this story.
 */
const InShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppShell
    statusBar={<StatusBar />}
    topNavbar={
      <ProfileHeader
        name="เศรษฐีจิ๊ดริดดด..."
        memberId="P6176XXX"
        pillLabel="แสดง"
        avatarSrc={AVATAR}
      />
    }
    bottomNavbar={<NavigationBar selectedKey="profile" fullWidth />}
  >
    {children}
  </AppShell>
);

export const InTheShell: StoryObj = {
  name: 'ในเครื่องจริง',
  render: () => (
    <div style={{ padding: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div>
        <Caption>/profile · iPhone 16 · 393×852</Caption>
        <DeviceFrame>
          <InShell>
            <ProfilePage
              profile={PROFILE}
              wallet={WALLET}
              config={WEB_CONFIG}
              menu={MENU}
              help={HELP}
              {...BANNERS}
            />
          </InShell>
        </DeviceFrame>
      </div>
    </div>
  ),
};

export const EveryState: StoryObj = {
  name: 'ทุก state เรียงกัน',
  render: () => {
    const cases: { caption: string; props: React.ComponentProps<typeof ProfilePage> }[] = [
      {
        caption: 'ปกติ',
        props: { profile: PROFILE, wallet: WALLET, config: WEB_CONFIG, menu: MENU, help: HELP, ...BANNERS },
      },
      {
        caption: 'อายุไม่ถึง 20 — Alert ขึ้น',
        props: { profile: PROFILE_UNDERAGE, wallet: WALLET, config: WEB_CONFIG, menu: MENU, help: HELP, ...BANNERS },
      },
      {
        caption: 'ยังไม่ผูกบัญชีธนาคาร — แถวนั้นมีไอคอน info',
        props: {
          profile: PROFILE_NO_BANK,
          wallet: WALLET,
          config: WEB_CONFIG,
          menu: MENU.map((m) => (m.title === 'บัญชีธนาคาร' ? { ...m, needsAttention: true } : m)),
          help: HELP,
          ...BANNERS,
        },
      },
      {
        caption: 'ปิด affiliate + nokshop — หัวข้อบริการว่าง',
        props: {
          profile: PROFILE,
          wallet: WALLET,
          config: { isEnabledAffiliate: false, isEnableNokshop: false },
          menu: MENU,
          help: HELP,
          ...BANNERS,
        },
      },
      {
        caption: 'ยอดนกแคช 13 หลัก — ตัวเลขจริงจาก mock ของ FE',
        props: { profile: PROFILE, wallet: WALLET_LONG, config: WEB_CONFIG, menu: MENU, help: HELP, ...BANNERS },
      },
    ];

    return (
      <div style={{ padding: 24, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {cases.map(({ caption, props }) => (
          <div key={caption}>
            <Caption>{caption}</Caption>
            <DeviceFrame>
              <InShell>
                <ProfilePage {...props} />
              </InShell>
            </DeviceFrame>
          </div>
        ))}
      </div>
    );
  },
};
