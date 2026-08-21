import React from 'react';
import Stack from '../../patterns/Stack/Stack';
import Surface from '../../patterns/Surface/Surface';
import Alert from '../../components/Alert/Alert';
import Divider from '../../components/Divider/Divider';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import Badge from '../../components/Badge/Badge';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import type { Banner, Profile as ProfileData, Wallet, WebConfig } from '../../fixtures/types';
import { BANNER_RATIO, NOK_CASH_CARD, STAT_ICONS, STAT_ICON_SIZE } from './fixtures';

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
  /** `new-feature-label` — the Frontend puts "ใหม่!" on ประวัติการถูกรางวัล. */
  badge?: string;
}

export interface ProfilePageProps {
  profile: ProfileData;
  wallet: Wallet;
  config: WebConfig;
  /** Called when เติมนกแคช is pressed. */
  onTopUp?: () => void;
  /** The three banners. */
  couponBanner: Banner;
  affiliateBanner: Banner;
  nokshopBanner: Banner;
  /** Rows under ข้อมูลสมาชิก. Data, because the Frontend keeps them in a constants file. */
  menu: ProfileMenuItem[];
  /** Rows under ช่วยเหลือ. */
  help: ProfileMenuItem[];
}

const thb = (value: string) => Number(value).toLocaleString('en-US');

/** `constants/profile` → PROFILE_HEADER_CARD_INFO, in order. */
const STATS = [
  { key: 'points', unit: 'นกพอยต์' },
  { key: 'lotteryCount', unit: 'สลากของฉัน' },
  { key: 'coupons', unit: 'คูปองส่วนลด' },
] as const;

/**
 * A tappable row: icon, label, chevron. The Frontend draws this as `profile-info/info`
 * in two places with the same markup, so it is one thing here.
 */
const MenuRow: React.FC<{ item: ProfileMenuItem; last: boolean }> = ({ item, last }) => (
  <>
    <Stack direction="row" align="center" justify="space-between" padding="2xl" as="li">
      <Stack direction="row" align="center" gap="lg">
        <Icon name={item.icon} size="md" color="tertiary" />
        <Text role="body-md-regular" tone="secondary">{item.title}</Text>
        {item.badge && <Badge label={item.badge} />}
      </Stack>
      <Stack direction="row" align="center" gap="lg" style={{ width: 'auto' }}>
        {/* The Frontend shows a filled red info mark on a row with nothing linked yet. */}
        {item.needsAttention && <Icon name="filled-info" size="sm" color="primary" />}
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
  onTopUp,
}) => (
  <Stack gap="2xl" paddingX="2xl" paddingY="2xl" maxWidth={448}>
    {profile.isUnderage && (
      <Alert
        title="ยังไม่สามารถซื้อลอตเตอรี่ได้"
        description="จะสามารถใช้บริการได้เมื่ออายุครบ 20 ปี"
      />
    )}

    {/* ── นกแคช ─────────────────────────────── */}
    <Surface padding="2xl" gap="none">
      {/* นกแคช + เติมนกแคช — `profile_card_main_body`: space-between, gap-4 */}
      <Stack direction="row" align="center" justify="space-between" gap="2xl">
        <Stack direction="row" align="center" gap="lg" style={{ width: 'auto' }}>
          <Surface radius="lg" elevation="none" padding="none" style={{ width: 'auto' }} clip>
            <img src={NOK_CASH_CARD} alt="" width={69} height={44} style={{ display: 'block' }} />
          </Surface>
          <Stack gap="none" style={{ width: 'auto' }}>
            <Text role="label-md-regular" tone="secondary">นกแคชของฉัน</Text>
            <Text role="title-lg-semibold" tone="primary">{thb(wallet.balance)}</Text>
          </Stack>
        </Stack>
        <Button variant="secondary" size="lg" onClick={onTopUp}>
          เติมนกแคช
        </Button>
      </Stack>

      {/* The dashed rule the Frontend draws in brand red, `mt-4` above and `pt-4` below. */}
      <Divider tone="primary" lineStyle="dashed" spacing={16} />

      {/* Three counters — `header-card-info`, space-between, pt-4 */}
      <Stack direction="row" align="center" justify="space-between" gap="sm">
        {STATS.map((stat) => (
          <Stack
            key={stat.unit}
            direction="row"
            align="center"
            justify="center"
            gap="lg"
            style={{ width: 'auto' }}
          >
            <img src={STAT_ICONS[stat.key]} alt="" width={STAT_ICON_SIZE} height={STAT_ICON_SIZE} />
            <Stack gap="none" style={{ width: 'auto' }}>
              <Text role="body-md-semibold" tone="primary">{thb(wallet[stat.key])}</Text>
              <Text role="button-xs-medium" tone="tertiary">{stat.unit}</Text>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Surface>

    {/* ── คูปองส่วนลด ────────────────────────── */}
    <Stack gap="lg">
      <Text role="title-lg-semibold" tone="secondary" as="p">คูปองส่วนลด</Text>
      <BannerImage banner={couponBanner} />
    </Stack>

    {/* ── ข้อมูลสมาชิก ───────────────────────── */}
    <Stack gap="lg">
      <Text role="title-lg-semibold" tone="secondary" as="p">ข้อมูลสมาชิก</Text>
      <Surface as="ul" gap="none" clip style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {menu.map((item, i) => (
          <MenuRow key={item.title} item={item} last={i === menu.length - 1} />
        ))}
      </Surface>
    </Stack>

    {/* ── บริการ ─────────────────────────────── */}
    <Stack gap="lg">
      <Text role="title-lg-semibold" tone="secondary" as="p">บริการ</Text>
      {config.isEnabledAffiliate && <BannerImage banner={affiliateBanner} />}
      {config.isEnableNokshop && <BannerImage banner={nokshopBanner} />}
    </Stack>

    {/* ── ช่วยเหลือ ──────────────────────────── */}
    <Stack gap="lg">
      <Text role="title-lg-semibold" tone="secondary" as="p">ช่วยเหลือ</Text>
      <Surface as="ul" gap="none" clip style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {help.map((item, i) => (
          <MenuRow key={item.title} item={item} last={i === help.length - 1} />
        ))}
      </Surface>
    </Stack>
  </Stack>
);

export default ProfilePage;
