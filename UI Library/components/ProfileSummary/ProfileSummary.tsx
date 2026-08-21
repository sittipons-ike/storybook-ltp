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
 * bottom card is rounded 0/0/16/16 with no border at all; between them sits a 1px row of
 * the block's own red, dashed over in white 4/4. Values that only make sense together, and
 * a page that had to spell them out would be spelling out a drawing.
 *
 * Figma composes the two card interiors from their own component sets — `nokcash-profile`
 * (15006:91960) and `summary-icon-profile` (15006:91931). Neither exists here yet; the
 * `balance` and `counters` slots take whatever a page passes, which is why the Profile page
 * still draws both by hand.
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
        // Figma's 3px gold edge is a stroke with strokeAlign INSIDE on the top side alone:
        // it paints over the card's own 16 of padding and adds nothing to the 80. A CSS
        // `border-top` does add to it — the card measured 81 and the block 188 against
        // Figma's 187 — so the edge is drawn as an inset shadow, which paints without
        // taking space and follows the corner radius the same way.
        boxShadow: `inset 0 ${S.accentWidth} 0 0 ${S.accentColor}`,
      }}
    >
      {balance}
    </div>

    {/*
      Figma's `Line`: 358×1 with a 1px WHITE dashed 4/4 stroke on its top edge and no fill.
      One pixel of the block's red shows through, and the white dashes sit on top of it — so
      what a reader sees is a red dashed line, because the dashes are the part that is not
      red. Drawn here as a gradient rather than `border-top: dashed`, because CSS decides
      dash lengths for itself and Figma states 4 on, 4 off.
    */}
    <div
      style={{
        height: S.ruleHeight,
        background: `repeating-linear-gradient(to right, ${S.ruleColor} 0 ${S.ruleDash}, transparent ${S.ruleDash} calc(${S.ruleDash} + ${S.ruleDashGap}))`,
      }}
    />

    <div
      style={{
        boxSizing: 'border-box',
        padding: S.padding,
        background: 'var(--sys-color-background-default)',
        borderRadius: `0 0 ${S.cardRadius} ${S.cardRadius}`,
        // No border. Figma's lower card has `strokes: []` — its strokeTopWeight and
        // friends report 1, but they say how thick a stroke would be, not that one exists.
      }}
    >
      {counters}
    </div>
  </div>
);

export default ProfileSummary;
