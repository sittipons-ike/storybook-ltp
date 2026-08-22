import React from 'react';
import '../../foundations/tokens.css';
import Text from '../Text/Text';

export type BadgeTone = 'error' | 'success' | 'warning' | 'info' | 'neutral';

const TONE: Record<BadgeTone, { bg: string; text: 'on-bgcolor' }> = {
  error: { bg: '--sys-color-status-error-default', text: 'on-bgcolor' },
  success: { bg: '--sys-color-status-success-default', text: 'on-bgcolor' },
  warning: { bg: '--sys-color-status-warning-default', text: 'on-bgcolor' },
  info: { bg: '--sys-color-status-info-default', text: 'on-bgcolor' },
  neutral: { bg: '--sys-color-background-dark', text: 'on-bgcolor' },
};

export interface BadgeProps {
  label: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

/**
 * Badge — Lotteryplus Design System
 *
 * A small pill of text riding beside a label. The Frontend calls this
 * `common/new-feature-label` and draws exactly one of them — "ใหม่!" on the prize-history
 * row — as `h-[18px] rounded-full bg-red px-2.5 text-white`.
 *
 * Named `Badge` rather than `NewFeatureLabel` because the shape is not about new features:
 * the Lark Standard §3.4 lists `badge` as canonical, the Frontend's own inventory has a
 * separate `notification/badge` at three usages, and a pill that can only ever say "ใหม่!"
 * is a string with a border. The tone axis is what makes it reusable.
 *
 * No Figma component — verified absent 2026-08-20 when the icon audit swept every page.
 */
const Badge: React.FC<BadgeProps> = ({ label, tone = 'error', className = '' }) => (
  <span
    className={className}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      height: 18,
      padding: '0 var(--sys-spacing-2lg)',
      borderRadius: 'var(--sys-radius-full)',
      background: `var(${TONE[tone].bg})`,
    }}
  >
    <Text role="caption-md-regular" tone={TONE[tone].text}>
      {label}
    </Text>
  </span>
);

export default Badge;
