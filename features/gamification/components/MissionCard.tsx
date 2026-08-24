import React from 'react';
import '../../../ui/foundations/tokens.css';
import { sys } from '../../../ui/foundations/tokens';
import Text from '../../../ui/components/Text/Text';
import MissionProgress, { MissionLadder, MissionTracks } from './MissionProgress';
import type { MissionRung, MissionShape, MissionTrack } from './MissionProgress';

export type { MissionShape } from './MissionProgress';
import './MissionCard.css';

// ═══════════════════════════════════════════
//  MissionCard — features/gamification · scope: feature
//
//  Design: Claude Design project b20d61e7 › `Mission Screens.dc.html` (2026-08-23).
//  Requirements: prd-dev.md v1.0 AC-301 (the five things a card carries), AC-503,
//  MECH-05 · ux-gamification.md §4.2 (ordering) §4.3 (reading order).
//
//  The card has no claim button. Claiming happens on the detail screen and nowhere else
//  (MECH-05) — one claim point is one place to get idempotency right (ST-02).
// ═══════════════════════════════════════════

/** §2.1.1 — the three endings a reward can have. Shown as the band's eyebrow. */
export type RewardKind = 'นกพอยต์' | 'คูปอง' | 'ของส่งถึงบ้าน';

/**
 * Where the mission stands, in the user's terms rather than the state machine's.
 * `pending` is §5.2.1: counted, not settled — visible, but not yet earned (SET-01).
 */
export type MissionTone = 'ready' | 'doing' | 'pending' | 'idle' | 'claimed';


const TONE: Record<MissionTone, { background: string; color: string }> = {
  ready: { background: sys('color-status-success-light'), color: sys('color-status-success-darker') },
  doing: { background: sys('color-primary-light'), color: sys('color-primary-darker') },
  pending: { background: sys('color-status-warning-soft-light'), color: sys('color-status-warning-darker') },
  idle: { background: sys('color-background-light'), color: sys('color-tertiary-accent-lg') },
  claimed: { background: sys('color-status-info-soft-light'), color: sys('color-status-info-darker') },
};

export interface MissionCardProps {
  /** ชื่อภารกิจ — AC-301 #1, second line of the band. */
  name: string;
  /** The reward in the user's words: "กล่องข้าวร่ำรวย" · "10 นกพอยต์". Leads the band. */
  reward: string;
  kind: RewardKind;
  /**
   * The reward, photographed. Campaign material — it arrives through fixtures rather than
   * living in the component, because a new round swaps every one of them.
   */
  image: string;
  /** เงื่อนไขแบบอ่านจบใน 1 บรรทัด — AC-301 #2. */
  cond: string;

  /**
   * AC-301 #3 / prd §6.0 MT-01 — which of the three progress shapes this mission has.
   *
   * `single` reads `current`/`target`; `ladder` reads `rungs`; `pair` reads `tracks`.
   * The shape is a property of the mission group, not a styling choice: drawing a
   * FREQUENCY mission as a single count hides one of the two things it asks for.
   */
  shape: MissionShape;

  /** `single` and `ladder` — the real count, in `unit`. A `pair` counts inside its tracks. */
  current?: number;
  /** `single` — what finishes the mission. */
  target?: number;
  unit?: string;

  /** `ladder` — the rungs, in ascending order. Each pays out on its own. */
  rungs?: MissionRung[];
  /** `pair` — the two counts, both of which must fill. */
  tracks?: MissionTrack[];

  tone: MissionTone;
  /** What the pill says. Written per mission because a refusal owes a reason (BP-05). */
  statusLabel: string;

  /** AC-301 #4 — "เหลืออีก 9 วัน". Empty on a mission that is already finished. */
  daysLabel?: string;
  /**
   * AC-301 #5 / AC-503 — this reward is limited. The number itself is still TBD
   * (OPEN-08), so the card says so rather than showing one.
   */
  quota?: boolean;

  onOpen?: () => void;
  className?: string;
}

/**
 * MissionCard — one row of MSN-201 / MSN-202.
 *
 * Reads in the order §4.3 sets: the reward first, because it is the only reason to stop;
 * then whether it is doable; then where the user stands; then how long and how many are
 * left.
 */
const MissionCard: React.FC<MissionCardProps> = ({
  name,
  reward,
  kind,
  image,
  cond,
  shape,
  current = 0,
  target = 0,
  unit,
  rungs = [],
  tracks = [],
  tone,
  statusLabel,
  daysLabel,
  quota = false,
  onOpen,
  className = '',
}) => (
  <button
    type="button"
    onClick={onOpen}
    className={`ltp-mission-card${onOpen ? ' ltp-mission-card--pressable' : ''} ${className}`}
  >
    <div
      className={`ltp-mission-card__band${
        tone === 'claimed' ? ' ltp-mission-card__band--claimed' : ''
      }`}
    >
      <div className="ltp-mission-card__art">
        {/* The reward's name is right beside it, so the picture adds nothing for a screen
            reader and is marked decorative rather than described twice. */}
        <img src={image} alt="" />
      </div>
      <div className="ltp-mission-card__band-text">
        <span className="ltp-mission-card__kind">{kind}</span>
        <span className="ltp-mission-card__reward">{reward}</span>
        <span className="ltp-mission-card__name">{name}</span>
      </div>
    </div>

    <div className="ltp-mission-card__body">
      {/* A pair spells its condition out as two named rows just below; printing
          "ซื้อต่อเนื่อง 3 งวด + ใช้จิ๊ดริดกล่องสุ่ม 3" above them is the card saying the
          same thing twice within an inch. AC-301 #2 is met by the rows, better. */}
      {shape !== 'pair' && (
        <Text role="body-md-regular" tone="secondary" style={{ textWrap: 'pretty' }}>{cond}</Text>
      )}

      {shape === 'pair' ? (
        /* Each track names itself and prints its own count, so a shared heading above them
           would only repeat what the rows already say. */
        <MissionTracks tracks={tracks} />
      ) : (
        <>
          <div className="ltp-mission-card__progress-head">
            <Text role="caption-lg-regular" tone="tertiary">ความคืบหน้า</Text>
            <Text role="title-lg-semibold" tone="primary" className="ltp-mission-card__count">
              {/* A ladder prints where the user is and stops there. `214/500` beside a bar
                  that is two rungs of three along would be two different answers to the
                  same question — the rung numbers under the rail carry the targets. */}
              {current.toLocaleString('en-US')}
              {shape === 'single' ? `/${target.toLocaleString('en-US')}` : ''}
              {unit ? ` ${unit}` : ''}
            </Text>
          </div>

          {shape === 'ladder' ? (
            <MissionLadder current={current} rungs={rungs} unit={unit} showLabels />
          ) : (
            <MissionProgress current={current} target={target} />
          )}
        </>
      )}

      <div className="ltp-mission-card__meta">
        <span className="ltp-mission-card__pill" style={TONE[tone]}>{statusLabel}</span>
        {daysLabel && <Text role="caption-lg-regular" tone="secondary">{daysLabel}</Text>}
        {quota && <span className="ltp-mission-card__tbd">สิทธิ์คงเหลือ · รอข้อมูล</span>}
      </div>
    </div>
  </button>
);

export interface MissionClosedCardProps {
  name: string;
  reward: string;
  cond: string;
  /**
   * "ของรางวัลหมดแล้ว" — the reason, not a generic unavailable (BP-05).
   *
   * Running out of stock is the only way a mission closes. Every mission shares the
   * campaign's one three-month window, so none can run out of time on its own
   * `[user 2026-08-24]`.
   */
  statusLabel: string;
  onOpen?: () => void;
  className?: string;
}

/**
 * A mission that has run out of stock or run out of time.
 *
 * §4.2 keeps it on the list, greyed, rather than removing it: a mission that disappears
 * reads as the system having lost it (Nielsen #1). It gets a flatter, shorter shape so
 * the eye skips it without having to read it.
 */
export const MissionClosedCard: React.FC<MissionClosedCardProps> = ({
  name,
  reward,
  cond,
  statusLabel,
  onOpen,
  className = '',
}) => (
  <button
    type="button"
    onClick={onOpen}
    className={`ltp-mission-card ltp-mission-card--closed${
      onOpen ? ' ltp-mission-card--pressable' : ''
    } ${className}`}
  >
    <div className="ltp-mission-card__closed-art" />
    <div className="ltp-mission-card__closed-text">
      {/* The design greys these out with #A3A3A3, which measures 2.31:1 on the card's own
          #F5F5F5 — half of what small text needs. `tertiary-accent-lg` is the same scale
          two steps darker and reads 7.17:1, so the card still recedes without going
          unreadable. Text's own `disable` role is #D4D4D4 and is fainter still. */}
      <Text role="title-lg-semibold" style={{ color: sys('color-tertiary-accent-lg') }}>{reward}</Text>
      <Text role="caption-lg-regular" style={{ color: sys('color-tertiary-accent-lg') }}>
        {name} · {cond}
      </Text>
      <span className="ltp-mission-card__pill ltp-mission-card__closed-pill">{statusLabel}</span>
    </div>
  </button>
);

export default MissionCard;
