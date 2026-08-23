import React from 'react';
import '../../../ui/foundations/tokens.css';
import Stack from '../../../ui/patterns/Stack/Stack';
import Button from '../../../ui/components/Button/Button';
import Surface from '../../../ui/patterns/Surface/Surface';
import Text from '../../../ui/components/Text/Text';
import Divider from '../../../ui/components/Divider/Divider';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import MissionProgress from './MissionProgress';
import type { MissionFact, MissionStep } from '../fixtures';
import './MissionDetailBlocks.css';

// ═══════════════════════════════════════════
//  MissionDetailBlocks — features/gamification · scope: feature
//
//  The four sections MSN-210 is made of. Design: Claude Design project b20d61e7 ›
//  `Mission Screens.dc.html`, artboards 2b–2d (2026-08-23).
//
//  They are components rather than page markup for one reason: they carry tokens, and the
//  page tier may not (tools/check-pages.py). The page decides which of them appear.
// ═══════════════════════════════════════════

export interface MissionHeroProps {
  /** The reward type, as an eyebrow — which of the three endings this one has (§2.1.1). */
  kindLabel: string;
  reward: string;
  name: string;
  campaignWindow: string;
}

/**
 * The red block under the header: what you get, for which mission, within which window.
 *
 * The artwork is a marked placeholder. Reward images are campaign material that does not
 * exist yet, and a stand-in that admits what it is beats a stock photo that lies.
 */
export const MissionHero: React.FC<MissionHeroProps> = ({
  kindLabel,
  reward,
  name,
  campaignWindow,
}) => (
  <div className="ltp-mission-block__hero">
    <div className="ltp-mission-block__art">
      <span className="ltp-mission-block__art-label">ภาพรางวัล 358×150 · {reward}</span>
    </div>
    <Stack gap="sm">
      <span className="ltp-mission-block__kind">{kindLabel}</span>
      <span className="ltp-mission-block__reward">{reward}</span>
      <Text role="body-md-regular" className="ltp-mission-block__hero-meta">{name}</Text>
      <Text role="caption-lg-regular" className="ltp-mission-block__hero-meta">{campaignWindow}</Text>
    </Stack>
  </div>
);

export interface MissionProgressCardProps {
  current: number;
  target: number;
  marks: number[];
  unit: string;
  /** "เหลืออีก 12 ใบ · เหลืออีก 9 วัน" — what is left, counted both ways. */
  note: string;
}

/** Where the user stands. Drops out entirely once the mission is finished. */
export const MissionProgressCard: React.FC<MissionProgressCardProps> = ({
  current,
  target,
  marks,
  unit,
  note,
}) => (
  <Surface radius="2xl" elevation="card" padding="2xl" gap="lg">
    <Stack direction="row" align="baseline" justify="space-between" gap="lg">
      <Text role="title-lg-semibold" tone="secondary">ความคืบหน้า</Text>
      <Text role="display-xl-semibold" tone="primary" className="ltp-mission-block__count">
        {current.toLocaleString('en-US')}/{target.toLocaleString('en-US')} {unit}
      </Text>
    </Stack>
    <MissionProgress current={current} target={target} marks={marks} />
    <Text role="caption-lg-regular" tone="tertiary">{note}</Text>
  </Surface>
);

/** Shown in place of the progress card once there is nothing left to count. */
export const MissionDoneBanner: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <Stack
    direction="row"
    align="center"
    gap="none"
    padding="2xl"
    className="ltp-mission-block__banner"
  >
    <span className="ltp-mission-block__banner-mark">
      <Icon name="filled-check" size="xs" color="onBg" />
    </span>
    <Stack gap="none">
      <Text role="title-lg-semibold" className="ltp-mission-block__banner-title">{title}</Text>
      <Text role="caption-lg-regular" className="ltp-mission-block__banner-body">{body}</Text>
    </Stack>
  </Stack>
);

const MARK: Record<MissionStep['state'], { className: string; glyph: string }> = {
  done: { className: 'ltp-mission-block__mark--done', glyph: '✓' },
  wait: { className: 'ltp-mission-block__mark--wait', glyph: '•' },
  todo: { className: 'ltp-mission-block__mark--todo', glyph: '' },
};

/**
 * เงื่อนไขภารกิจ, broken into its rungs.
 *
 * §6.1's missions are compound — "ซื้อ 6 งวดติด + จิ๊ดริดครบ 3 ประเภท" — and BP-10 leaves
 * this screen to explain them with no onboarding behind it, so each rung gets its own line
 * and its own standing.
 */
export const MissionSteps: React.FC<{ steps: MissionStep[] }> = ({ steps }) => (
  <Surface radius="2xl" elevation="card" padding="2xl" gap="xl">
    <Text role="title-lg-semibold" tone="secondary">เงื่อนไข</Text>
    {steps.map((step) => (
      <Stack direction="row" align="flex-start" gap="none" key={step.text} className="ltp-mission-block__step">
        <span className={`ltp-mission-block__mark ${MARK[step.state].className}`}>
          {MARK[step.state].glyph}
        </span>
        <Stack gap="none">
          <Text role="body-md-regular" tone="secondary" style={{ textWrap: 'pretty' }}>
            {step.text}
          </Text>
          <Text role="caption-lg-regular" tone="tertiary">{step.meta}</Text>
        </Stack>
      </Stack>
    ))}
  </Surface>
);

/**
 * สิ่งที่ต้องรู้ก่อนกด — BP-02.
 *
 * Quota, how long the reward lasts, where it goes, and the terms. All of it above the CTA,
 * in its own tint, because a condition the user meets after committing is the one that
 * turns into a complaint (R-05).
 *
 * Values the product has not settled render as machine text (`รอข้อมูล`) rather than as
 * copy, so a reviewer can see the gap instead of reading past it (OPEN-08, OPEN-13).
 */
export const MissionFacts: React.FC<{ facts: MissionFact[]; terms: string }> = ({
  facts,
  terms,
}) => (
  <div className="ltp-mission-block__facts">
    <Text role="body-md-semibold" tone="secondary">สิ่งที่ต้องรู้ก่อนกด</Text>
    <Stack gap="md">
      {facts.map((fact) => (
        <div className="ltp-mission-block__fact" key={fact.label}>
          <Text role="caption-lg-regular" tone="tertiary">{fact.label}</Text>
          {fact.pending ? (
            <span className="ltp-mission-block__pending">{fact.value}</span>
          ) : (
            <Text role="caption-lg-regular" tone="secondary" align="right">{fact.value}</Text>
          )}
        </div>
      ))}
    </Stack>
    <Divider tone="light-gray" lineStyle="solid" />
    <Text role="caption-lg-regular" tone="tertiary" style={{ textWrap: 'pretty' }}>{terms}</Text>
  </div>
);

export interface MissionFooterProps {
  cta: { label: string; disabled?: boolean };
  onCta?: () => void;
  /** AC7 / BP-01 — where to go instead, by label. */
  links?: string[];
  onLink?: (label: string) => void;
}

/**
 * The bar the one CTA lives in (§4.4).
 *
 * Sticky, because the terms above it are long and a CTA that scrolls away is one the user
 * has to hunt for. A disabled CTA still leaves the links underneath: a refusal that offers
 * nothing is a dead end, and BP-01 does not allow one.
 */
export const MissionFooter: React.FC<MissionFooterProps> = ({ cta, onCta, links, onLink }) => (
  <div className="ltp-mission-block__footer">
    <Button
      variant="primary"
      size="lg"
      fullWidth
      disabled={cta.disabled}
      onClick={cta.disabled ? undefined : onCta}
    >
      {cta.label}
    </Button>

    {links && links.length > 0 && (
      <div className="ltp-mission-block__links">
        {links.map((label) => (
          <Button
            key={label}
            variant="link"
            size="lg"
            onClick={onLink ? () => onLink(label) : undefined}
          >
            {label}
          </Button>
        ))}
      </div>
    )}
  </div>
);
