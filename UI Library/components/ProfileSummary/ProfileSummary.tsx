import React from 'react';
import '../../foundations/tokens.css';
import { PROFILE_SUMMARY as S } from './tokens';

export interface ProfileSummaryProps {
  /** The balance row — card art, label, figure, and the top-up control. */
  balance: React.ReactNode;
  /** The counters under the rule. */
  counters: React.ReactNode;
  /** Anything above the cards, inside the red — the underage Alert, in practice. */
  banner?: React.ReactNode;
  className?: string;
}

/**
 * ProfileSummary — Lotteryplus Design System
 *
 * Figma's `header-profile`: a red block, rounded 24 on its bottom corners only, holding
 * two white cards that read as one.
 *
 * The seam is the whole reason this is a component rather than two Surfaces on a page.
 * The top card is rounded 16/16/0/0 and carries a 3px gold edge along its top only; the
 * bottom card is rounded 0/0/16/16 with a 1px white border all round; between them sits a
 * 1px white rule dashed 4/4, with 16 above it. Six values that only make sense together,
 * and a page that had to spell them out would be spelling out a drawing.
 *
 * The Frontend has none of it — `profile-header-card` is one white card on the page
 * background — so this shape exists only in Figma. Measured 2026-08-21.
 */
const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  balance,
  counters,
  banner,
  className = '',
}) => (
  <div
    className={className}
    style={{
      boxSizing: 'border-box',
      width: '100%',
      padding: S.padding,
      background: S.background,
      borderRadius: `0 0 ${S.radius} ${S.radius}`,
    }}
  >
    {banner && <div style={{ marginBottom: S.padding }}>{banner}</div>}

    <div
      style={{
        boxSizing: 'border-box',
        padding: S.padding,
        background: 'var(--sys-color-background-default)',
        borderRadius: `${S.cardRadius} ${S.cardRadius} 0 0`,
        // Figma sets a 3px INSIDE stroke on the top edge alone, which is a border-top
        // under border-box — no inset shadow needed, because nothing else is stroked.
        borderTop: `${S.accentWidth} solid ${S.accentColor}`,
      }}
    >
      {balance}
    </div>

    <div
      style={{
        paddingTop: S.ruleGap,
        background: 'var(--sys-color-background-default)',
      }}
    >
      <div
        style={{
          height: 0,
          borderTop: `${S.borderWidth} dashed ${S.borderColor}`,
          marginLeft: S.padding,
          marginRight: S.padding,
        }}
      />
    </div>

    <div
      style={{
        boxSizing: 'border-box',
        padding: S.padding,
        background: 'var(--sys-color-background-default)',
        borderRadius: `0 0 ${S.cardRadius} ${S.cardRadius}`,
        border: `${S.borderWidth} solid ${S.borderColor}`,
        borderTop: 'none',
      }}
    >
      {counters}
    </div>
  </div>
);

export default ProfileSummary;
