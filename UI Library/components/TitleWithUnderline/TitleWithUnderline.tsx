import React from 'react';
import '../../foundations/tokens.css';
import { TITLE_UNDERLINE as T, type TitleTone } from './tokens';

export interface TitleWithUnderlineProps {
  title: React.ReactNode;
  /** Glyph before the title. */
  icon?: React.ReactNode;
  /** Figma's instance draws the title red; the Frontend offers both. */
  tone?: TitleTone;
  /**
   * The 16 of side padding Figma's `Head` carries. Off when the caller already has it —
   * a page that pads its own column would double it.
   */
  inset?: boolean;
  className?: string;
}

/**
 * TitleWithUnderline — Lotteryplus Design System
 *
 * Figma's `Head` (23599:392870): a section title with a red rule directly under it, and a
 * grey rule running the full width beneath that. **Two stacked rules**, not one line
 * shared between the title and a filler.
 *
 * The Frontend builds it the other way — title and filler side by side on one baseline,
 * `flex items-end` with a red border-bottom on the text and a grey one on the filler —
 * and this component was built from the Frontend first, so it inherited that shape along
 * with a 4px gap (Figma says 8) and a near-black rule where Figma uses the light grey
 * `border.accent.gray-light`. The values are in the overlay, which is where they belong.
 *
 * The record for this component also said Figma had none of it. That was wrong: the check
 * searched the token mirror, which only holds colour groups, and a frame that declares no
 * colour group of its own can never appear there.
 */
const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({
  title,
  icon,
  tone = 'primary',
  inset = true,
  className = '',
}) => (
  <div
    className={className}
    style={{
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingLeft: inset ? T.paddingX : undefined,
      paddingRight: inset ? T.paddingX : undefined,
    }}
  >
    {/* The title column hugs its text, so its rule is exactly as wide as the words. */}
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: T.gap }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: T.iconGap,
            whiteSpace: 'nowrap',
            fontSize: T.titleSize,
            lineHeight: T.titleLineHeight,
            fontWeight: T.titleWeight as unknown as React.CSSProperties['fontWeight'],
            color: tone === 'primary' ? T.colorPrimary : T.colorSecondary,
          }}
        >
          {icon}
          {title}
        </span>
        <span
          aria-hidden
          style={{ height: 0, borderTop: `${T.lineWidth} solid ${T.accentColor}` }}
        />
      </div>
    </div>

    {/* The grey rule runs the whole width, under the red one rather than beside it. */}
    <span aria-hidden style={{ height: 0, borderTop: `${T.lineWidth} solid ${T.ruleColor}` }} />
  </div>
);

export default TitleWithUnderline;
