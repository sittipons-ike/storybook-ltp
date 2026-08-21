import React from 'react';
import Stack from '../../patterns/Stack/Stack';
import Surface from '../../patterns/Surface/Surface';
import Alert from '../../components/Alert/Alert';
import Divider from '../../components/Divider/Divider';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import Badge from '../../components/Badge/Badge';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import Logo from '../../logos/Logo';
import type { Banner, Profile as ProfileData, Wallet, WebConfig } from '../../fixtures/types';
import { NOK_CASH_CARD } from './fixtures';

/**
 * _frontend_route: /profile
 * Figma:           [Mobile] Profile (22483:144307), 390 x 1310
 * Frontend page:   src/pages/profile/index.tsx
 *
 * Built from Figma. The first version of this file was built from the Frontend alone and
 * came out wrong in ways the Frontend could not reveal — see components/profile.json.
 */

export interface ProfileMenuItem {
  icon: string;
  title: string;
  /** Shown when the row has nothing linked yet — the Frontend's `isInfoIconShow`. */
  needsAttention?: boolean;
  /** Figma puts "ใหม่!" on ประวัติการถูกรางวัล. */
  badge?: string;
}

export interface ProfilePageProps {
  profile: ProfileData;
  wallet: Wallet;
  config: WebConfig;
  couponBanner: Banner;
  affiliateBanner: Banner;
  nokshopBanner: Banner;
  menu: ProfileMenuItem[];
  help: ProfileMenuItem[];
  onTopUp?: () => void;
}

const thb = (value: string) => Number(value).toLocaleString('en-US');

/**
 * The three counters under the rule. Figma draws each as `summary-icon-profile`,
 * 92 x 42, and the glyphs are `gp-*` marks from the logo set rather than icons.
 */
const STATS = [
  { key: 'points', unit: 'นกพอยต์', logo: 'gp-nokpoints-1' },
  { key: 'lotteryCount', unit: 'สลากของฉัน', logo: 'gp-lottery' },
  { key: 'coupons', unit: 'คูปองส่วนลด', logo: 'gp-coupon' },
] as const;

/** Figma's `Frame 24798`: a 24-tall row, 16 above the content it heads. */
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text role="title-lg-semibold" tone="secondary" as="p">
    {children}
  </Text>
);

/** Figma's `.info-slot-profile`: 56 tall, 16 of padding, an 8 gap, white. */
const MenuRow: React.FC<{ item: ProfileMenuItem; last: boolean }> = ({ item, last }) => (
  <>
    <Stack direction="row" align="center" justify="space-between" padding="2xl" as="li">
      <Stack direction="row" align="center" gap="lg">
        <Icon name={item.icon} size="md" color="tertiary" />
        <Text role="body-md-regular" tone="secondary">{item.title}</Text>
        {item.badge && <Badge label={item.badge} />}
      </Stack>
      <Stack direction="row" align="center" gap="lg" style={{ width: 'auto' }}>
        {item.needsAttention && <Icon name="filled-info" size="sm" color="primary" />}
        <Icon name="arrow-right-S" size="sm" color="tertiary" />
      </Stack>
    </Stack>
    {!last && <Divider tone="light-gray" lineStyle="solid" />}
  </>
);

/**
 * A banner at the picture's own proportions. The first version forced
 * `aspectRatio: 416/96`, lifted from the Frontend's `<Image width={416} height={96}>` —
 * the box the Frontend reserves, not the shape of the artwork. The files are 1432x384
 * (3.73), and stretching them to 4.33 is what made every bird look wider than drawn.
 */
const BannerImage: React.FC<{ banner: Banner }> = ({ banner }) => (
  <img src={banner.src} alt={banner.alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
);

/**
 * ProfilePage — /profile
 *
 * Every piece of data arrives as a prop and nothing is fetched, so each state is one
 * story away rather than whatever the store happens to hold.
 *
 * Spacing goes through Stack and Surface. A page may not name a token directly
 * (check-pages.py): 78 pages writing raw tokens is a rename nobody finishes.
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
  <Stack gap="2xl">
    {/* ── header-profile ──────────────────────────────────────────────────
        Figma's own block, drawn by ProfileSummary: red, rounded 24 at the bottom,
        two white cards joined by a dashed rule. The Frontend has no equivalent. */}
    <ProfileSummary
      banner={
        profile.isUnderage ? (
          <Alert
            title="ยังไม่สามารถซื้อลอตเตอรี่ได้"
            description="จะสามารถใช้บริการได้เมื่ออายุครบ 20 ปี"
          />
        ) : undefined
      }
      balance={
        <Stack direction="row" align="center" justify="space-between" gap="2xl">
          <Stack direction="row" align="center" gap="lg" style={{ width: 'auto' }}>
            <Surface radius="lg" elevation="none" padding="none" clip style={{ width: 'auto' }}>
              {/* Figma's `Card` inside nokcash-profile: 76×48, and it is what makes the
                  balance row 48 tall — the text stack beside it is only 45. */}
              <img src={NOK_CASH_CARD} alt="" width={76} height={48} style={{ display: 'block' }} />
            </Surface>
            <Stack gap="none" style={{ width: 'auto' }}>
              <Text role="body-md-medium" tone="secondary">นกแคชของฉัน</Text>
              <Text role="title-lg-semibold" tone="primary">{thb(wallet.balance)}</Text>
            </Stack>
          </Stack>
          <Button variant="secondary" size="lg" onClick={onTopUp}>
            เติมนกแคช
          </Button>
        </Stack>
      }
      counters={
        <Stack direction="row" align="center" justify="space-between" gap="xl">
          {STATS.map((stat) => (
            <Stack key={stat.unit} direction="row" align="center" gap="sm" style={{ width: 'auto' }}>
              <Logo name={stat.logo} alt="" size={32} />
              <Stack gap="none" style={{ width: 'auto' }}>
                <Text role="title-lg-semibold" tone="primary">{thb(wallet[stat.key])}</Text>
                <Text role="button-xs-medium" tone="tertiary">{stat.unit}</Text>
              </Stack>
            </Stack>
          ))}
        </Stack>
      }
    />

    {/* ── Coupon: everything below the red block. Figma gap 16, side padding 16. ── */}
    <Stack gap="2xl" paddingX="2xl" paddingY="none" style={{ marginBottom: 16 }}>
      <Stack gap="2xl">
        <SectionHeading>คูปองส่วนลด</SectionHeading>
        <BannerImage banner={couponBanner} />
      </Stack>

      <Stack gap="2xl">
        <SectionHeading>ข้อมูลสมาชิก</SectionHeading>
        <Surface as="ul" gap="none" clip style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {menu.map((item, i) => (
            <MenuRow key={item.title} item={item} last={i === menu.length - 1} />
          ))}
        </Surface>
      </Stack>

      <Stack gap="2xl">
        <SectionHeading>บริการ</SectionHeading>
        <Stack gap="2xl">
          {config.isEnabledAffiliate && <BannerImage banner={affiliateBanner} />}
          {config.isEnableNokshop && <BannerImage banner={nokshopBanner} />}
        </Stack>
      </Stack>

      <Stack gap="2xl">
        <SectionHeading>ช่วยเหลือ</SectionHeading>
        <Surface as="ul" gap="none" clip style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {help.map((item, i) => (
            <MenuRow key={item.title} item={item} last={i === help.length - 1} />
          ))}
        </Surface>
      </Stack>
    </Stack>
  </Stack>
);

export default ProfilePage;
