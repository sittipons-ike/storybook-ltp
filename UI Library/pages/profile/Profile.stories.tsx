import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ProfilePage, { type ProfileMenuItem } from './Profile';
import AppShell from '../../patterns/AppShell/AppShell';
import DeviceFrame from '../../patterns/DeviceFrame/DeviceFrame';
import StatusBar from '../../components/StatusBar/StatusBar';
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import ProfileHeader from '../../components/Header/ProfileHeader';
import { AFFILIATE_BANNER, COUPON_BANNER, NOKSHOP_BANNER } from './fixtures';
import {
  PROFILE,
  PROFILE_NO_BANK,
  PROFILE_UNDERAGE,
  WALLET,
  WALLET_LONG,
  WEB_CONFIG,
} from '../../fixtures/user';

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
 * The shell the Frontend's `<Layout>` builds for this route, filled with our components.
 *
 * `src/pages/profile/index.tsx` passes hasTopNavbar + navbarType=profile + hasHeader +
 * hasBottomNavbar, which maps onto four of AppShell's six slots. The fifth, `statusBar`,
 * has no Frontend equivalent because a browser draws its own — here the mock supplies it.
 */
const InShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppShell
    statusBar={<StatusBar />}
    topNavbar={<ProfileHeader name="สิทธิพร ใจดีมาก" memberId="P240497" />}
    header={<Header variant="home" />}
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
