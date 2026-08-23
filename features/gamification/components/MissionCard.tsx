import React from 'react';
import '../../../ui/foundations/tokens.css';
import { sys } from '../../../ui/foundations/tokens';
import Text from '../../../ui/components/Text/Text';
import MissionProgress from './MissionProgress';
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

  /** AC-301 #3 — the real count, and the marks along the way. */
  current: number;
  target: number;
  marks?: number[];
  unit?: string;

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
  current,
  target,
  marks,
  unit,
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
      <Text role="body-md-regular" tone="secondary" style={{ textWrap: 'pretty' }}>{cond}</Text>

      <div className="ltp-mission-card__progress-head">
        <Text role="caption-lg-regular" tone="tertiary">ความคืบหน้า</Text>
        <Text role="title-lg-semibold" tone="primary" className="ltp-mission-card__count">
          {current.toLocaleString('en-US')}/{target.toLocaleString('en-US')}
          {unit ? ` ${unit}` : ''}
        </Text>
      </div>

      <MissionProgress current={current} target={target} marks={marks} />

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
  /** "ของรางวัลหมดแล้ว" · "หมดเวลาแล้ว" — the reason, not a generic unavailable. */
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
      {/* The grey the design greys these out with is #A3A3A3, and no `colors/text` role
          declares it — Text's `disable` is #D4D4D4, which is too faint to read. It comes
          from the tertiary accent scale instead, passed through rather than approximated. */}
      <Text role="title-lg-semibold" style={{ color: sys('color-tertiary-accent-md') }}>{reward}</Text>
      <Text role="caption-lg-regular" style={{ color: sys('color-tertiary-accent-md') }}>
        {name} · {cond}
      </Text>
      <span className="ltp-mission-card__pill ltp-mission-card__closed-pill">{statusLabel}</span>
    </div>
  </button>
);

export default MissionCard;
