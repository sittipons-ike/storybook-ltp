import React from 'react';
import '../../../ui/foundations/tokens.css';
import { sys } from '../../../ui/foundations/tokens';
import Stack from '../../../ui/patterns/Stack/Stack';
import Button from '../../../ui/components/Button/Button';
import Surface from '../../../ui/patterns/Surface/Surface';
import Text from '../../../ui/components/Text/Text';
import Divider from '../../../ui/components/Divider/Divider';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import MissionProgress, { MissionLadder, MissionTracks } from './MissionProgress';
import type { MissionRung, MissionShape, MissionTrack } from './MissionProgress';
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

/**
 * Colours handed to `Text` as inline style rather than through a class.
 *
 * Text sets its tone with an inline `color`, and inline beats a class no matter how the
 * stylesheet is written — styling one of these from the outside with a CSS rule silently
 * does nothing. `style` is spread last inside Text, so it wins.
 *
 * The hero's secondary lines are white, not the design's `primary-light`: that tint reads
 * 3.80:1 on brand red and white reads 4.64:1.
 */
const HERO_META = { color: sys('color-text-on-bgcolor') } as const;
const BANNER_TITLE = { color: sys('color-status-success-darker') } as const;
const BANNER_BODY = { color: sys('color-status-success-dark') } as const;

export interface MissionHeroProps {
  reward: string;
  /** The reward, photographed. Campaign material, so it arrives through fixtures. */
  image: string;
  campaignWindow: string;
}

/**
 * The block under the header: the reward photographed full-bleed, with its name and the
 * window it runs in over the lower edge.
 *
 * Two lines and no more. The mission's name moved down to the conditions card, where the
 * thing it names actually is, and the reward type left altogether — "ปลายทางของรางวัล"
 * in the facts block already says where this one ends up, and said it in a full sentence
 * rather than a two-word tag.
 */
export const MissionHero: React.FC<MissionHeroProps> = ({ reward, image, campaignWindow }) => (
  <div className="ltp-mission-block__hero">
    <div className="ltp-mission-block__art">
      {/* Decorative: the reward's name is written across it. */}
      <img src={image} alt="" />
      {/* Inside the picture's box, not beside it. As a sibling its `inset: 0` resolved
          against the whole hero, so the fade finished at the bottom of the text instead of
          at the seam — the picture met the text block's solid red at about 6% and drew a
          line there. Three rounds of tuning could not fix a gradient ending in the wrong
          place. */}
      <div className="ltp-mission-block__scrim" aria-hidden="true" />
    </div>
    <div className="ltp-mission-block__hero-text">
      <span className="ltp-mission-block__reward">{reward}</span>
      <Text role="caption-lg-regular" style={HERO_META}>{campaignWindow}</Text>
    </div>
  </div>
);

export interface MissionProgressCardProps {
  /** prd §6.0 MT-01 — which of the three pictures this mission's progress is. */
  shape: MissionShape;
  /** `pair` — the mission's name heads its two tasks, the way a step list is headed. */
  name?: string;
  current?: number;
  target?: number;
  unit?: string;
  /** `ladder` — the rungs, and what waits at each. */
  rungs?: MissionRung[];
  /** `pair` — the two counts, both of which must fill. */
  tracks?: MissionTrack[];
  /** "เหลืออีก 12 ใบ · เหลืออีก 9 วัน" — what is left, counted both ways. */
  note: string;
}

/** Where the user stands. Drops out entirely once the mission is finished. */
export const MissionProgressCard: React.FC<MissionProgressCardProps> = ({
  shape,
  name,
  current = 0,
  target = 0,
  unit = '',
  rungs = [],
  tracks = [],
  note,
}) => (
  <Surface radius="2xl" elevation="card" padding="2xl" gap="lg">
    {shape === 'pair' ? (
      <>
        {/* No headline number: the two counts are in different units, so there is no one
            number that stands for both. Each row says its own. */}
        <Stack gap="none">
          <Text role="title-lg-semibold" tone="secondary">{name}</Text>
          <Text role="caption-lg-regular" tone="tertiary">ต้องทำให้ครบทั้ง 2 อย่าง</Text>
        </Stack>
        <MissionTracks tracks={tracks} />
      </>
    ) : (
      <>
        <Stack direction="row" align="baseline" justify="space-between" gap="lg">
          <Text role="title-lg-semibold" tone="secondary">ความคืบหน้า</Text>
          <Text role="display-xl-semibold" tone="primary" className="ltp-mission-block__count">
            {current.toLocaleString('en-US')}
            {shape === 'single' ? `/${target.toLocaleString('en-US')}` : ''} {unit}
          </Text>
        </Stack>
        {shape === 'ladder' ? (
          <MissionLadder current={current} rungs={rungs} unit={unit} showLabels />
        ) : (
          <MissionProgress current={current} target={target} showLabels />
        )}
      </>
    )}
    <Text role="caption-lg-regular" tone="tertiary">{note}</Text>
  </Surface>
);

/** What each rung of the ladder is worth, and whether it has been paid. */
const RUNG: Record<MissionRung['state'], { icon: string; label: string; className: string }> = {
  claimed: { icon: 'filled-check', label: 'รับแล้ว', className: 'ltp-mission-rung--claimed' },
  ready: { icon: 'filled-gift', label: 'รอรับรางวัล', className: 'ltp-mission-rung--ready' },
  locked: { icon: 'outline-radio-button', label: 'ยังไม่ถึง', className: 'ltp-mission-rung--locked' },
};

/**
 * The ladder, spelled out: what each rung costs and what it pays.
 *
 * The rail above shows position; this shows the deal. A user asked to walk from 214 to 500
 * deserves to see the thing waiting at 500 before deciding, and the two rungs already
 * behind them are the evidence that the deal is real.
 */
export const MissionRungList: React.FC<{ name: string; rungs: MissionRung[]; unit?: string }> = ({
  name,
  rungs,
  unit = '',
}) => (
  <Surface radius="2xl" elevation="card" padding="2xl" gap="xl">
    {/* The mission's name heads its rungs for the same reason it heads a step list: on a
        ladder, the rungs are what the mission asks for. */}
    <Stack gap="none">
      <Text role="title-lg-semibold" tone="secondary">{name}</Text>
      <Text role="caption-lg-regular" tone="tertiary">ถึงหมุดไหน รับรางวัลหมุดนั้นได้เลย</Text>
    </Stack>
    <Stack gap="lg">
      {rungs.map((rung) => (
        <Stack
          key={rung.at}
          direction="row"
          align="center"
          gap="lg"
          className={`ltp-mission-rung ${RUNG[rung.state].className}`}
        >
          <span className="ltp-mission-rung__mark">
            <Icon name={RUNG[rung.state].icon} size="2xs" color="inherit" />
          </span>
          <span className="ltp-mission-rung__art">
            {/* The reward is named on the line beside it, so the picture is decoration for
                a screen reader rather than a second telling. */}
            <img src={rung.image} alt="" />
          </span>
          <Stack gap="none" className="ltp-mission-rung__text">
            <Text role="body-md-semibold" tone="secondary">{rung.reward}</Text>
            <Text role="caption-lg-regular" tone="tertiary">
              ถึง {rung.at.toLocaleString('en-US')}{unit ? ` ${unit}` : ''}
            </Text>
          </Stack>
          <span className="ltp-mission-rung__state">{RUNG[rung.state].label}</span>
        </Stack>
      ))}
    </Stack>
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
      <Text role="title-lg-semibold" style={BANNER_TITLE}>{title}</Text>
      <Text role="caption-lg-regular" style={BANNER_BODY}>{body}</Text>
    </Stack>
  </Stack>
);

/**
 * The three standings a rung can be in. Real icons from the set, not `✓` and `•` typed as
 * text: a glyph is at the mercy of whichever font falls back, it does not take a colour or
 * a size the way the rest of the UI does, and a screen reader announces it.
 */
const MARK: Record<MissionStep['state'], { className: string; icon?: string }> = {
  done: { className: 'ltp-mission-block__mark--done', icon: 'filled-check' },
  wait: { className: 'ltp-mission-block__mark--wait', icon: 'filled-clock' },
  todo: { className: 'ltp-mission-block__mark--todo' },
};

/**
 * The mission's name, and the conditions it asks for, broken into rungs.
 *
 * §6.1's missions are compound — "ซื้อ 6 งวดติด + จิ๊ดริดครบ 3 ประเภท" — and BP-10 leaves
 * this screen to explain them with no onboarding behind it, so each rung gets its own line
 * and its own standing.
 */
export const MissionSteps: React.FC<{ name: string; steps: MissionStep[] }> = ({
  name,
  steps,
}) => (
  <Surface radius="2xl" elevation="card" padding="2xl" gap="xl">
    {/* The mission's name heads the list of what it asks for — the two belong together,
        and in the hero it was a second line competing with the reward it sat under. */}
    <Stack gap="none">
      <Text role="title-lg-semibold" tone="secondary">{name}</Text>
      <Text role="caption-lg-regular" tone="tertiary">เงื่อนไขที่ต้องทำให้ครบ</Text>
    </Stack>
    {steps.map((step) => (
      <Stack direction="row" align="flex-start" gap="none" key={step.text} className="ltp-mission-block__step">
        <span className={`ltp-mission-block__mark ${MARK[step.state].className}`}>
          {MARK[step.state].icon && (
            <Icon name={MARK[step.state].icon as string} size="2xs" color="inherit" />
          )}
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

    {/* Text links, in brand red — which is what the design draws, and what passes.
        `Button variant="link"` is the reuse-first choice and was the first attempt, but the
        design system paints it `status-info-default` (#3B82F6), and blue on white measures
        3.68:1 against the 4.5 that 14px text needs. Red reads 4.64. That is a defect in the
        shared link variant rather than in this screen — raised separately; it is not fixed
        here because every other page using it would move with it. */}
    {links && links.length > 0 && (
      <div className="ltp-mission-block__links">
        {links.map((label) => (
          <button
            key={label}
            type="button"
            className="ltp-mission-block__link"
            onClick={onLink ? () => onLink(label) : undefined}
          >
            {label}
          </button>
        ))}
      </div>
    )}
  </div>
);
