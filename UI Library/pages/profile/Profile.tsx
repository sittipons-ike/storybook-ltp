import React from 'react';
import Stack from '../../patterns/Stack/Stack';
import Surface from '../../patterns/Surface/Surface';
import Alert from '../../components/Alert/Alert';
import Divider from '../../components/Divider/Divider';
import TitleWithUnderline from '../../components/TitleWithUnderline/TitleWithUnderline';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import type { Banner, Profile as ProfileData, Wallet, WebConfig } from '../../fixtures/types';
import { BANNER_RATIO, NOK_CASH_CARD } from './fixtures';

/**
 * _frontend_route: /profile
 * Frontend page:   src/pages/profile/index.tsx
 * Frontend body:   src/components/profile/index.tsx
 */

export interface ProfileMenuItem {
  icon: string;
  title: string;
  /** Shown when the row has nothing linked yet — the Frontend's `isInfoIconShow`. */
  needsAttention?: boolean;
}

export interface ProfilePageProps {
  profile: ProfileData;
  wallet: Wallet;
  config: WebConfig;
  /** The three banners. */
  couponBanner: Banner;
  affiliateBanner: Banner;
  nokshopBanner: Banner;
  /** Rows under ข้อมูลสมาชิก. Data, because the Frontend keeps them in a constants file. */
  menu: ProfileMenuItem[];
  /** Rows under ช่วยเหลือ. */
  help: ProfileMenuItem[];
}

const thb = (satang: string) => Number(satang).toLocaleString('en-US');

/**
 * A tappable row: icon, label, chevron. The Frontend draws this as `profile-info/info`
 * in two places with the same markup, so it is one thing here.
 */
const MenuRow: React.FC<{ item: ProfileMenuItem; last: boolean }> = ({ item, last }) => (
  <>
    <Stack direction="row" align="center" justify="space-between" padding="2xl" as="li">
      <Stack direction="row" align="center" gap="lg">
        <Icon name={item.icon} size="md" color="tertiary" />
        <span>{item.title}</span>
      </Stack>
      <Stack direction="row" align="center" gap="lg" style={{ width: 'auto' }}>
        {item.needsAttention && <Icon name="outline-Error-1" size="sm" color="tertiary" />}
        <Icon name="arrow-right-S" size="sm" color="tertiary" />
      </Stack>
    </Stack>
    {!last && <Divider tone="light-gray" lineStyle="solid" />}
  </>
);

/** A banner is a picture that links somewhere. Its ratio is fixed; its artwork is not. */
const BannerImage: React.FC<{ banner: Banner }> = ({ banner }) => (
  <img
    src={banner.src}
    alt={banner.alt}
    style={{ display: 'block', width: '100%', aspectRatio: BANNER_RATIO }}
  />
);

/**
 * ProfilePage — /profile
 *
 * The body of the Frontend's profile route, composed from this library and nothing else.
 *
 * It takes every piece of data as a prop and fetches nothing. That is what makes it the
 * designer's copy rather than a second implementation: the real page can only show
 * whichever state its store happens to hold, while here each state is one story away —
 * underage, no bank account, affiliate off, a balance long enough to break the card.
 *
 * Spacing goes through Stack. A page may not reach for a token directly (check-pages.py),
 * because 78 pages writing raw tokens is a rename nobody can finish.
 */
const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  wallet,
  config,
  couponBanner,
  affiliateBanner,
  nokshopBanner,
  menu,
  help,
}) => (
  <Stack gap="2xl" paddingX="2xl" paddingY="2xl" maxWidth={448}>
    {profile.isUnderage && (
      <Alert
        title="ยังไม่สามารถซื้อลอตเตอรี่ได้"
        description="จะสามารถใช้บริการได้เมื่ออายุครบ 20 ปี"
      />
    )}

    {/* ── นกแคช ─────────────────────────────── */}
    <Surface direction="row" align="center" justify="space-between" gap="2xl" padding="2xl">
      <Stack direction="row" align="center" gap="lg" style={{ width: 'auto' }}>
        <Surface radius="lg" elevation="none" padding="none" style={{ width: 'auto' }} clip>
          <img src={NOK_CASH_CARD} alt="" width={69} height={44} style={{ display: 'block' }} />
        </Surface>
        <Stack gap="none" style={{ width: 'auto' }}>
          <span>นกแคชของฉัน</span>
          <strong>{thb(wallet.balance)}</strong>
        </Stack>
      </Stack>
      <span>{profile.firstName} {profile.lastName}</span>
    </Surface>

    {/* ── คูปองส่วนลด ────────────────────────── */}
    <Stack gap="lg">
      <TitleWithUnderline title="คูปองส่วนลด" />
      <BannerImage banner={couponBanner} />
    </Stack>

    {/* ── ข้อมูลสมาชิก ───────────────────────── */}
    <Stack gap="lg">
      <TitleWithUnderline title="ข้อมูลสมาชิก" />
      <Surface as="ul" gap="none" clip style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {menu.map((item, i) => (
          <MenuRow key={item.title} item={item} last={i === menu.length - 1} />
        ))}
      </Surface>
    </Stack>

    {/* ── บริการ ─────────────────────────────── */}
    <Stack gap="lg">
      <TitleWithUnderline title="บริการ" />
      {config.isEnabledAffiliate && <BannerImage banner={affiliateBanner} />}
      {config.isEnableNokshop && <BannerImage banner={nokshopBanner} />}
    </Stack>

    {/* ── ช่วยเหลือ ──────────────────────────── */}
    <Stack gap="lg">
      <TitleWithUnderline title="ช่วยเหลือ" />
      <Surface as="ul" gap="none" clip style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {help.map((item, i) => (
          <MenuRow key={item.title} item={item} last={i === help.length - 1} />
        ))}
      </Surface>
    </Stack>
  </Stack>
);

export default ProfilePage;
