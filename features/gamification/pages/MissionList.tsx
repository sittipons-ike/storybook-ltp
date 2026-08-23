import React from 'react';
import Stack from '../../../ui/patterns/Stack/Stack';
import Tabs from '../../../ui/components/Tabs/Tabs';
import Surface from '../../../ui/patterns/Surface/Surface';
import Button from '../../../ui/components/Button/Button';
import Text from '../../../ui/components/Text/Text';
import Skeleton from '../../../ui/components/Skeleton/Skeleton';
import Logo from '../../../ui/logos/Logo';
import MissionCard, { MissionClosedCard } from '../components/MissionCard';
import type { ClosedMission, Mission } from '../fixtures';

/**
 * _frontend_route: /mission
 * Screens:  MSN-200 (page) · MSN-201 (tab ทั้งหมด) · MSN-202 (tab สำเร็จแล้ว)
 *           MSN-900 (empty) · §6.1 loading — skeleton list
 *
 * Design: Claude Design project b20d61e7 › `Mission Screens.dc.html`, artboards 2a and 2e,
 * imported 2026-08-23. Requirements: prd-dev.md v1.0 · ux-gamification.md.
 */

export interface MissionListTab {
  key: string;
  label: string;
}

export interface MissionListEmpty {
  title: string;
  body: string;
  /** A number nobody has settled yet, drawn as such (OPEN-11). Optional. */
  note?: string;
  /** BP-01 — every dead end carries one way out. */
  action: string;
}

export interface MissionListPageProps {
  /** The campaign banner, flush to both edges above the tabs. */
  banner: string;
  bannerAlt?: string;

  tabs: readonly MissionListTab[];
  activeTab: string;
  onTabChange?: (key: string) => void;

  missions: Mission[];
  /** Ran out or ran late. Drawn after the live ones, greyed, never hidden (§4.2). */
  closed?: ClosedMission[];

  empty: MissionListEmpty;
  onEmptyAction?: () => void;

  /** §6.1 — the first load draws the shape of the list, never a blank screen. */
  loading?: boolean;

  onOpenMission?: (id: string) => void;
}

const MissionSkeleton: React.FC = () => (
  <Stack gap="xl">
    {[0, 1, 2].map((i) => (
      <Stack key={i} gap="none">
        <Skeleton width="100%" height={112} />
        <Stack gap="lg" paddingY="xl">
          <Skeleton width="70%" height={22} />
          <Skeleton width="100%" height={8} />
          <Skeleton width="45%" height={22} />
        </Stack>
      </Stack>
    ))}
  </Stack>
);

/**
 * MissionListPage — MSN-200
 *
 * Two tabs and one list. There is no third tab for rewards: a claimed reward lives in
 * NokPoint or in NokShop's My Coupon, which the app already has, and a second place to
 * keep the same thing is a place to lose it (MECH-05 / BP-00).
 *
 * Whichever tab is open, it draws its own cards or its own empty state — the two tabs are
 * empty for different reasons and say so differently (AC-202).
 *
 * Every value arrives as a prop, and spacing goes through Stack; a page may not name a
 * token directly (tools/check-pages.py).
 */
const MissionListPage: React.FC<MissionListPageProps> = ({
  banner,
  bannerAlt = '',
  tabs,
  activeTab,
  onTabChange,
  missions,
  closed = [],
  empty,
  onEmptyAction,
  loading = false,
  onOpenMission,
}) => {
  const nothing = missions.length === 0 && closed.length === 0;

  return (
    <Stack gap="none" grow>
      {/* At its own proportions — the artwork is 3.25:1 and nothing crops or stretches it,
          so the birds stay the shape they were drawn. */}
      <img
        src={banner}
        alt={bannerAlt}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />

      {/* On white, not on the page's own soft-light. The active tab is brand red, which
          reads 4.64:1 on white and 4.44:1 on soft-light — under the 4.5 its 14px label
          needs. Tabs draws no background of its own, so the surface is the page's to
          provide, and the design puts one there for the same reason. */}
      <Surface tone="default" radius="none" elevation="none" padding="none" gap="none">
        <Tabs
          variant="underline"
          items={tabs.map((t) => ({ key: t.key, label: t.label }))}
          activeKey={activeTab}
          onChange={onTabChange}
        />
      </Surface>

      <Stack gap="xl" padding="2xl" grow>
        {loading ? (
          <MissionSkeleton />
        ) : nothing ? (
          /* MSN-900 — why it is empty, and the way out. BP-03 asks for both. */
          <Stack gap="2xl" align="center" justify="center" grow paddingX="4xl" paddingY="5xl">
            {/* The design leaves a 120 placeholder here because it had no illustration to
                hand. The library does: `gp-quick-menu-news` is the bird with the megaphone,
                already in the logo set at the size this slot wants. */}
            <Logo name="gp-quick-menu-news" alt="" size={120} />
            <Stack gap="md" align="center">
              <Text role="display-xl-semibold" tone="secondary" align="center" as="p">
                {empty.title}
              </Text>
              <Text role="body-md-regular" tone="tertiary" align="center" as="p">
                {empty.body}
              </Text>
              {empty.note && (
                <Text role="caption-md-regular" tone="tertiary" align="center" as="p">
                  {empty.note}
                </Text>
              )}
            </Stack>
            <Button variant="primary" size="lg" onClick={onEmptyAction}>{empty.action}</Button>
          </Stack>
        ) : (
          <Stack gap="xl" as="ul" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {missions.map((mission) => (
              <Stack as="li" key={mission.id} gap="none">
                <MissionCard
                  {...mission}
                  onOpen={onOpenMission ? () => onOpenMission(mission.id) : undefined}
                />
              </Stack>
            ))}
            {closed.map((mission) => (
              <Stack as="li" key={mission.id} gap="none">
                <MissionClosedCard
                  {...mission}
                  onOpen={onOpenMission ? () => onOpenMission(mission.id) : undefined}
                />
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default MissionListPage;
