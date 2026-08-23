import React from 'react';
import Stack from '../../../ui/patterns/Stack/Stack';
import Tabs from '../../../ui/components/Tabs/Tabs';
import Button from '../../../ui/components/Button/Button';
import Text from '../../../ui/components/Text/Text';
import Logo from '../../../ui/logos/Logo';
import Skeleton from '../../../ui/components/Skeleton/Skeleton';
import MissionCard from '../components/MissionCard';
import { sortMissions, type Mission } from '../fixtures';

/**
 * _frontend_route: /mission
 * Screens:  MSN-200 (page) · MSN-201 (tab ทั้งหมด) · MSN-202 (tab สำเร็จแล้ว)
 *           MSN-900 (empty) · §6.1 loading — skeleton list, and switching tabs
 *
 * Built from features/gamification/prd-dev.md v1.0 + ux-gamification.md. There is no
 * Figma frame behind this page: the mock was taken out of scope on 2026-08-23, so the
 * documents are the only authority and the design system supplies every value.
 */

export interface MissionListTab {
  key: string;
  label: string;
}

export interface MissionListEmpty {
  title: string;
  /** Line breaks are honoured — the copy is written as two lines. */
  body: string;
  /** BP-01 — every dead end carries one way out. */
  action: string;
}

export interface MissionListPageProps {
  tabs: readonly MissionListTab[];
  activeTab: string;
  onTabChange?: (key: string) => void;

  missions: Mission[];
  empty: MissionListEmpty;
  onEmptyAction?: () => void;

  /** §6.1 — the first load draws the shape of the list, never a blank screen. */
  loading?: boolean;

  onOpenMission?: (id: string) => void;
}

/**
 * §6.1 — the skeleton mirrors the card it stands in for, so the page does not jump when
 * the real list lands.
 */
const MissionSkeleton: React.FC = () => (
  <Stack gap="2xl">
    {[0, 1, 2].map((i) => (
      <Stack key={i} gap="lg">
        <Stack direction="row" gap="2xl" align="center">
          <Skeleton width={56} height={56} />
          <Stack gap="sm">
            <Skeleton width="60%" height={24} />
            <Skeleton width="85%" height={18} />
          </Stack>
        </Stack>
        <Skeleton width="100%" height={8} />
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
  tabs,
  activeTab,
  onTabChange,
  missions,
  empty,
  onEmptyAction,
  loading = false,
  onOpenMission,
}) => (
  <Stack gap="none" grow>
    <Tabs
      variant="underline"
      items={tabs.map((t) => ({ key: t.key, label: t.label }))}
      activeKey={activeTab}
      onChange={onTabChange}
    />

    <Stack gap="2xl" padding="2xl" grow>
      {loading ? (
        <MissionSkeleton />
      ) : missions.length === 0 ? (
        /* MSN-900 — why it is empty, and the way out. BP-03 asks for both. */
        <Stack gap="4xl" align="center" justify="center" grow paddingY="7xl">
          <Logo name="gp-quick-menu-news" alt="" size={120} />
          <Stack gap="lg" align="center">
            <Text role="title-lg-semibold" tone="secondary" align="center" as="p">
              {empty.title}
            </Text>
            <Text
              role="body-md-regular"
              tone="tertiary"
              align="center"
              as="p"
              style={{ whiteSpace: 'pre-line' }}
            >
              {empty.body}
            </Text>
          </Stack>
          <Button variant="secondary" size="lg" onClick={onEmptyAction}>
            {empty.action}
          </Button>
        </Stack>
      ) : (
        <Stack gap="2xl" as="ul" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {sortMissions(missions).map((mission) => (
            <Stack as="li" key={mission.id} gap="none">
              <MissionCard
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

export default MissionListPage;
