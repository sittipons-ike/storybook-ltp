import React from 'react';
import Stack from '../../../ui/patterns/Stack/Stack';
import Surface from '../../../ui/patterns/Surface/Surface';
import Text from '../../../ui/components/Text/Text';
import Button from '../../../ui/components/Button/Button';
import Divider from '../../../ui/components/Divider/Divider';
import Accordion from '../../../ui/components/Accordion/Accordion';
import ActionBar from '../../../ui/components/ActionBar/ActionBar';
import Icon from '../../../ui/icons/Icon';
import '../../../ui/icons/icon-data';
import MissionProgress from '../components/MissionProgress';
import type { MissionDetail, MissionStep } from '../fixtures';
import type { MissionState, RewardType } from '../components/MissionCard';

/**
 * _frontend_route: /mission/:id
 * Screens:  MSN-210 รายละเอียดภารกิจ — จุด claim เดียวของระบบ (MECH-05)
 *
 * Built from features/gamification/prd-dev.md v1.0 and ux-gamification.md §4.4. No Figma
 * frame stands behind it; the mock was taken out of scope on 2026-08-23.
 *
 * Two rules shape the whole layout:
 *   BP-02 — quota, how long the reward lasts, and the terms all sit ABOVE the CTA.
 *   BP-10 — onboarding was deferred, so this screen has to explain itself. Nothing here
 *           may assume the user was told anything beforehand.
 */

/** §4.4 — one CTA, five faces. Every other control on the screen is secondary to it. */
const CTA: Record<MissionState, { label: string; disabled: boolean }> = {
  IN_PROGRESS: { label: 'ไปทำภารกิจ', disabled: false },
  COMPLETED: { label: 'รับรางวัล', disabled: false },
  CLAIMED: { label: 'รับรางวัลแล้ว', disabled: true },
  OUT_OF_STOCK: { label: 'ของรางวัลหมดแล้ว', disabled: true },
  EXPIRED: { label: 'หมดเวลาแล้ว', disabled: true },
};

/**
 * AC7 — once claimed, the screen has to hand the reward over to wherever it actually
 * lives. BP-00: the mission system never keeps anything, it only points.
 */
const DESTINATION: Record<RewardType, { label: string; icon: string }> = {
  NOKPOINT: { label: 'ไปดูนกพอยต์ของฉัน', icon: 'filled-NokPoints' },
  E_COUPON: { label: 'ไปที่คูปองของฉัน', icon: 'filled-discount' },
  // SLA-04 — CRM cannot report back, so LINE OA is the only place to ask.
  PHYSICAL: { label: 'สอบถามสถานะที่ LINE OA', icon: 'filled-Calling' },
};

export interface MissionDetailPageProps {
  mission: MissionDetail;

  /** IN_PROGRESS — deep link to wherever the condition can be met. */
  onGoToMission?: () => void;
  /** COMPLETED — opens MSN-300, the claim sheet for this reward type. */
  onClaim?: () => void;
  /** CLAIMED — NokPoint · My Coupon · LINE OA, whichever this reward went to. */
  onGoToDestination?: () => void;
  /** OUT_OF_STOCK · EXPIRED — BP-01, no screen is a dead end. */
  onSeeOtherMissions?: () => void;
}

/** A sub-step of a compound condition, with its own count. */
const Step: React.FC<{ step: MissionStep; muted: boolean }> = ({ step, muted }) => {
  const done = step.current >= step.target;
  return (
    <Stack gap="lg">
      <Stack direction="row" align="flex-start" gap="lg">
        <span style={{ display: 'flex', flex: '0 0 auto', paddingTop: 2 }}>
          <Icon
            name={done ? 'filled-check_circle' : 'outline-radio-button'}
            size="sm"
            color={done && !muted ? 'primary' : 'tertiary'}
          />
        </span>
        <Text role="body-md-regular" tone="secondary">{step.label}</Text>
      </Stack>
      <MissionProgress
        current={step.current}
        target={step.target}
        pending={step.pending}
        unit={step.unit}
        muted={muted}
      />
    </Stack>
  );
};

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack direction="row" align="flex-start" gap="lg" as="li">
    <span style={{ display: 'flex', flex: '0 0 auto', paddingTop: 6 }}>
      <Icon name="filled-radio-button" size="2xs" color="tertiary" />
    </span>
    <Text role="caption-lg-regular" tone="tertiary">{children}</Text>
  </Stack>
);

/**
 * MissionDetailPage — MSN-210
 *
 * The one place in the product where a reward is claimed. Everything else — the card, the
 * popup, the follow-up — leads here and does not claim on its own, because one claim point
 * is one place to get idempotency right (MECH-05 / ST-02).
 *
 * Every value arrives as a prop, and spacing goes through Stack and Surface; a page may
 * not name a token directly (tools/check-pages.py).
 */
const MissionDetailPage: React.FC<MissionDetailPageProps> = ({
  mission,
  onGoToMission,
  onClaim,
  onGoToDestination,
  onSeeOtherMissions,
}) => {
  const state = mission.state ?? 'IN_PROGRESS';
  const closed = state === 'OUT_OF_STOCK' || state === 'EXPIRED';
  const cta = CTA[state];
  const destination = DESTINATION[mission.rewardType];

  const onPrimary =
    state === 'COMPLETED' ? onClaim : state === 'IN_PROGRESS' ? onGoToMission : undefined;
  const primaryLabel =
    state === 'IN_PROGRESS' && mission.actionLabel ? mission.actionLabel : cta.label;

  return (
    <Stack gap="none" grow>
      <Stack gap="2xl" padding="2xl" grow>
        {/* ── Hero — §4.4: the reward, the mission, the window it runs in ── */}
        <Surface radius="2xl" elevation="card" padding="2xl" gap="lg">
          <Text role="caption-lg-regular" tone="tertiary">{mission.title}</Text>
          <Text role="heading-h4-semibold" tone="secondary">{mission.reward}</Text>
          <Stack direction="row" align="center" gap="sm">
            <Icon name="filled-calendar" size="2xs" color="tertiary" />
            <Text role="caption-lg-regular" tone="tertiary">
              ระยะเวลาแคมเปญ {mission.campaignWindow}
            </Text>
          </Stack>
        </Surface>

        {/* ── Progress — where the user stands, and how long is left ── */}
        {mission.target !== undefined && mission.target > 0 && (
          <Surface radius="2xl" elevation="card" padding="2xl" gap="xl">
            <Stack direction="row" align="center" justify="space-between" gap="lg">
              <Text role="body-md-semibold" tone="secondary">ความคืบหน้าของคุณ</Text>
              {mission.daysLeft !== undefined && (
                <Stack direction="row" align="center" gap="sm" style={{ width: 'auto' }}>
                  <Icon name="filled-clock" size="2xs" color="tertiary" />
                  <Text role="caption-lg-regular" tone="tertiary">
                    {mission.daysLeft > 0 ? `เหลืออีก ${mission.daysLeft} วัน` : 'วันสุดท้าย'}
                  </Text>
                </Stack>
              )}
            </Stack>
            <MissionProgress
              current={mission.current ?? 0}
              target={mission.target}
              pending={mission.pending}
              milestones={mission.milestones}
              unit={mission.unit}
              muted={closed}
            />
          </Surface>
        )}

        {/* ── เงื่อนไข — broken into its rungs, because §6.1's missions are compound and
             BP-10 leaves this screen to explain them on its own ── */}
        {mission.steps && mission.steps.length > 0 && (
          <Surface radius="2xl" elevation="card" padding="2xl" gap="2xl">
            <Text role="body-md-semibold" tone="secondary">เงื่อนไขภารกิจ</Text>
            {mission.steps.map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && <Divider tone="light-gray" lineStyle="solid" />}
                <Step step={step} muted={closed} />
              </React.Fragment>
            ))}
          </Surface>
        )}

        {/* ── โควตา · อายุของรางวัล · เงื่อนไข — BP-02 keeps all three above the CTA, and
             §2.2 moved the reward's own lifespan here when onboarding was deferred ── */}
        <Surface radius="2xl" elevation="card" padding="2xl" gap="xl">
          <Text role="body-md-semibold" tone="secondary">รางวัลและเงื่อนไขการรับ</Text>

          <Stack gap="lg">
            {mission.stockLeft !== undefined && (
              <Stack direction="row" align="center" gap="lg">
                <Icon name="filled-Box" size="sm" color="tertiary" />
                <Text role="body-md-regular" tone="secondary">
                  {mission.stockLeft > 0
                    ? `เหลืออีก ${mission.stockLeft.toLocaleString('th-TH')} สิทธิ์`
                    : 'ของรางวัลหมดแล้ว'}
                </Text>
              </Stack>
            )}
            {mission.rewardValidity && (
              <Stack direction="row" align="center" gap="lg">
                <Icon name="filled-Hourglass" size="sm" color="tertiary" />
                <Text role="body-md-regular" tone="secondary">{mission.rewardValidity}</Text>
              </Stack>
            )}
          </Stack>

          <Stack gap="lg" as="ul" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {mission.terms.map((term) => (
              <Bullet key={term}>{term}</Bullet>
            ))}
          </Stack>

          <Accordion title="เงื่อนไขการแลกรับรางวัลฉบับเต็ม">
            <Text role="caption-lg-regular" tone="tertiary">
              เนื้อหาฉบับเต็มรอทีมกฎหมายรีวิว (R-03) · หน้านี้เว้นที่ไว้ให้แล้ว
            </Text>
          </Accordion>
        </Surface>
      </Stack>

      {/* ── CTA เดียว 5 สถานะ (§4.4) · info คือบรรทัดที่ BP-02 บังคับให้อยู่เหนือปุ่ม
           Sticky, because the terms above it are long and a CTA that scrolls away is a CTA
           the user has to hunt for. `homeIndicator` reserves the strip the device draws its
           own bar on — without it the label sits under the bar. ── */}
      <div style={{ position: 'sticky', bottom: 0 }}>
      <ActionBar
        homeIndicator
        info={
          closed ? (
            <Text role="caption-lg-regular" tone="tertiary">
              {state === 'OUT_OF_STOCK'
                ? 'ภารกิจอื่นยังมีรางวัลเหลืออยู่'
                : 'ภารกิจนี้ปิดรอบแล้ว รอบหน้าเปิดพร้อมงวดถัดไป'}
            </Text>
          ) : state === 'CLAIMED' ? (
            <Text role="caption-lg-regular" tone="tertiary">
              รับรางวัลนี้ไปแล้ว 1 สิทธิ์ — ของอยู่ที่ปลายทางด้านล่าง
            </Text>
          ) : undefined
        }
      >
        <Stack gap="lg">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={cta.disabled}
            onClick={onPrimary}
          >
            {primaryLabel}
          </Button>

          {/* AC7 — the secondary link is the whole point of the claimed state. */}
          {state === 'CLAIMED' && (
            <Button variant="link" size="lg" fullWidth onClick={onGoToDestination}>
              {destination.label}
            </Button>
          )}

          {/* BP-01 — a refusal still has to lead somewhere. */}
          {closed && (
            <Button variant="link" size="lg" fullWidth onClick={onSeeOtherMissions}>
              ดูภารกิจอื่น
            </Button>
          )}
        </Stack>
      </ActionBar>
      </div>
    </Stack>
  );
};

export default MissionDetailPage;
