import React from 'react';
import '../../../ui/foundations/tokens.css';
import Surface from '../../../ui/patterns/Surface/Surface';
import Stack from '../../../ui/patterns/Stack/Stack';
import Text from '../../../ui/components/Text/Text';
import Badge from '../../../ui/components/Badge/Badge';
import Divider from '../../../ui/components/Divider/Divider';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import MissionProgress from './MissionProgress';
import './MissionCard.css';

// ═══════════════════════════════════════════
//  MissionCard — features/gamification · scope: feature
//
//  Source: prd-dev.md v1.0 — AC-301 (the five things a card must carry), AC-302,
//  AC-503 (quota shown before the user starts), §5.2 (state machine), MECH-05.
//  Layout order: ux-gamification.md §4.3.
//
//  MECH-05 is why there is no claim button here. Claiming happens on the mission detail
//  screen and nowhere else, so the card's only job is to be readable and to open.
// ═══════════════════════════════════════════

/** §5.1 `Reward.type`. Decides the glyph and the mark's tint, nothing else. */
export type RewardType = 'NOKPOINT' | 'E_COUPON' | 'PHYSICAL';

/** §5.2, trimmed to what the list can be in: LOCKED never reaches a card. */
export type MissionState =
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CLAIMED'
  | 'EXPIRED'
  | 'OUT_OF_STOCK';

const MARK: Record<RewardType, { icon: string; tint: string; label: string }> = {
  NOKPOINT: { icon: 'filled-NokPoints', tint: 'nokpoint', label: 'นกพอยต์' },
  E_COUPON: { icon: 'filled-discount', tint: 'coupon', label: 'คูปองส่วนลด' },
  PHYSICAL: { icon: 'filled-GiftBox', tint: 'physical', label: 'ของรางวัล' },
};

/**
 * The status line under the reward. Two of these are refusals, and BP-05 asks refusals to
 * give a reason rather than borrow the language of an error, which is why they are
 * spelled out here instead of sharing one "unavailable" string.
 */
const STATUS: Partial<Record<MissionState, { label: string; tone: 'success' | 'tertiary' }>> = {
  COMPLETED: { label: 'ทำครบแล้ว กดเข้าไปรับรางวัล', tone: 'success' },
  CLAIMED: { label: 'รับรางวัลแล้ว', tone: 'tertiary' },
  EXPIRED: { label: 'หมดเวลาแล้ว', tone: 'tertiary' },
  OUT_OF_STOCK: { label: 'ของรางวัลหมดแล้ว', tone: 'tertiary' },
};

export interface MissionCardProps {
  /** §5.1 `Mission.id`. */
  id?: string;
  /** ชื่อภารกิจ — AC-301 #1. */
  title: string;
  /** The reward, in the user's words: "หูฟัง Sony" · "20 นกพ้อย". AC-301 #1. */
  reward: string;
  rewardType: RewardType;
  /** เงื่อนไขแบบอ่านจบใน 1 บรรทัด — AC-301 #2. */
  condition: string;

  state?: MissionState;

  /** AC-301 #3 — the real numbers, plus the checkpoints between them. */
  current?: number;
  target?: number;
  pending?: number;
  milestones?: number[];
  unit?: string;

  /** AC-301 #4 — how many days are left. A number, so the copy stays in one place. */
  daysLeft?: number;
  /** AC-301 #5 / AC-503 — how many are left, when the reward is limited. */
  stockLeft?: number;

  onOpen?: () => void;
  className?: string;
}

/**
 * MissionCard — one row of MSN-201 / MSN-202.
 *
 * Reads top to bottom in the order §4.3 sets: the reward first, because it is the only
 * reason to stop and read; then whether it is doable; then where the user stands; then how
 * long is left and how many are left.
 */
const MissionCard: React.FC<MissionCardProps> = ({
  title,
  reward,
  rewardType,
  condition,
  state = 'IN_PROGRESS',
  current = 0,
  target = 0,
  pending = 0,
  milestones,
  unit,
  daysLeft,
  stockLeft,
  onOpen,
  className = '',
}) => {
  const closed = state === 'EXPIRED' || state === 'OUT_OF_STOCK';
  const mark = MARK[rewardType];
  const status = STATUS[state];
  const showProgress = state === 'IN_PROGRESS' && target > 0;
  const showFooter = daysLeft !== undefined || stockLeft !== undefined;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`ltp-mission-card${closed ? ' ltp-mission-card--closed' : ''}${
        onOpen ? ' ltp-mission-card--pressable' : ''
      } ${className}`}
    >
      <Surface radius="2xl" elevation="card" padding="2xl" gap="xl">
        <Stack direction="row" gap="2xl" align="flex-start">
          <span
            className={`ltp-mission-card__mark ltp-mission-card__mark--${
              closed ? 'closed' : mark.tint
            }`}
          >
            <Icon
              name={mark.icon}
              size="lg"
              color={closed ? 'tertiary' : 'primary'}
              aria-label={mark.label}
            />
          </span>

          <Stack gap="none">
            {/* §4.3 order 1 — the reward leads, the mission name qualifies it. */}
            <Text role="title-lg-semibold" tone="secondary">{reward}</Text>
            <Text role="caption-lg-regular" tone="tertiary">{title}</Text>
          </Stack>

          <span style={{ display: 'flex', flex: '0 0 auto' }}>
            <Icon name="arrow-right-S" size="sm" color="tertiary" />
          </span>
        </Stack>

        {/* §4.3 order 2 — AC-301 asks this to be readable in one line, so it gets the
            card's full width rather than the column left over beside the mark. */}
        <Text role="body-md-regular" tone="secondary">{condition}</Text>

        {status && (
          <Text role="body-md-medium" tone={status.tone}>{status.label}</Text>
        )}

        {showProgress && (
          <MissionProgress
            current={current}
            target={target}
            pending={pending}
            milestones={milestones}
            unit={unit}
            muted={closed}
          />
        )}

        {showFooter && (
          <>
            <Divider tone="light-gray" lineStyle="solid" />
            <Stack direction="row" align="center" justify="space-between" gap="lg">
              {/* §4.3 order 4 — "ต้องรีบไหม" */}
              {daysLeft !== undefined ? (
                <Stack direction="row" align="center" gap="sm" style={{ width: 'auto' }}>
                  <Icon name="filled-clock" size="2xs" color="tertiary" />
                  <Text role="caption-lg-regular" tone="tertiary">
                    {daysLeft > 0 ? `เหลืออีก ${daysLeft} วัน` : 'วันสุดท้าย'}
                  </Text>
                </Stack>
              ) : (
                <span />
              )}

              {/* §4.3 order 5 / AC-503 — "ยังทันไหม", before the user starts.
                  When the mission is already closed the status line above has said so, and
                  a badge repeating it is the same sentence twice. */}
              {stockLeft !== undefined &&
                (stockLeft > 0 ? (
                  <Text role="caption-lg-regular" tone="tertiary">
                    เหลือ {stockLeft.toLocaleString('th-TH')} สิทธิ์
                  </Text>
                ) : (
                  state !== 'OUT_OF_STOCK' && <Badge label="ของหมดแล้ว" tone="neutral" />
                ))}
            </Stack>
          </>
        )}
      </Surface>
    </button>
  );
};

export default MissionCard;
