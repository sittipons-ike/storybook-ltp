import React from 'react';
import Stack from '../../../ui/patterns/Stack/Stack';
import {
  MissionDoneBanner,
  MissionFacts,
  MissionFooter,
  MissionHero,
  MissionProgressCard,
  MissionSteps,
} from '../components/MissionDetailBlocks';
import type { MissionDetail } from '../fixtures';

/**
 * _frontend_route: /mission/:id
 * Screens:  MSN-210 รายละเอียดภารกิจ — จุด claim เดียวของระบบ (MECH-05)
 *
 * Design: Claude Design project b20d61e7 › `Mission Screens.dc.html`, artboards 2b–2d,
 * imported 2026-08-23. Requirements: prd-dev.md v1.0 · ux-gamification.md §4.4.
 */

export interface MissionDetailPageProps {
  mission: MissionDetail;
  /** The CTA. What it does depends on the state the mission is in; the page only fires it. */
  onCta?: () => void;
  /** AC7 / BP-01 — the secondary way out, by label. */
  onLink?: (label: string) => void;
}

/**
 * MissionDetailPage — MSN-210
 *
 * The one place in the product where a reward is claimed. The card, the popup and the
 * follow-up all lead here and none of them claims on its own, because one claim point is
 * one place to get idempotency right (MECH-05 / ST-02).
 *
 * The page reads in the order §4.4 sets and BP-02 enforces: what you get, how far you are,
 * what is required, and then — still above the button — what it costs you to say yes.
 *
 * Every value arrives as a prop, and spacing goes through Stack; a page may not name a
 * token directly (tools/check-pages.py), which is why the sections are components.
 */
const MissionDetailPage: React.FC<MissionDetailPageProps> = ({ mission, onCta, onLink }) => (
  <Stack gap="none" grow>
    <MissionHero
      reward={mission.reward}
      image={mission.image}
      campaignWindow={mission.campaignWindow}
    />

    <Stack gap="xl" padding="2xl" grow>
      {mission.banner ? (
        <MissionDoneBanner title={mission.banner.title} body={mission.banner.body} />
      ) : (
        mission.progress && <MissionProgressCard {...mission.progress} />
      )}

      <MissionSteps name={mission.name} steps={mission.steps} />

      {/* BP-02 — the last thing before the button, never the first thing after it. */}
      <MissionFacts facts={mission.facts} terms={mission.terms} />
    </Stack>

    <MissionFooter
      cta={mission.cta}
      onCta={onCta}
      links={mission.links}
      onLink={onLink}
    />
  </Stack>
);

export default MissionDetailPage;
