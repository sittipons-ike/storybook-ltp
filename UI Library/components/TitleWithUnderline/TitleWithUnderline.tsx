import React from 'react';
import '../../foundations/tokens.css';
import { TITLE_UNDERLINE, type TitleTone } from './tokens';

export interface TitleWithUnderlineProps {
  title: React.ReactNode;
  /** Glyph before the title — the Frontend passes one on about half its 12 call sites. */
  icon?: React.ReactNode;
  /** The Frontend's `titleColor`: primary (brand red) or secondary (near-black). */
  tone?: TitleTone;
  className?: string;
}

/**
 * TitleWithUnderline — Lotteryplus Design System
 *
 * No Figma component exists (verified absent 2026-08-20). Built from the Frontend's
 * `common/title-with-underline` — 12 call sites — per the amended authority rule.
 *
 * Two rules drawn as borders: `border.primary` under the text block, `border.secondary`
 * carrying on for the rest of the row. Both sit 4px under their content, so the red
 * segment reads as an underline of the title, not a border of the container.
 */
const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({
  title,
  icon,
  tone = 'secondary',
  className = '',
}) => (
  <div className={className} style={{ display: 'flex', width: '100%', alignItems: 'flex-end' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: TITLE_UNDERLINE.gap,
        paddingBottom: TITLE_UNDERLINE.underlinePadding,
        borderBottom: `${TITLE_UNDERLINE.underlineWidth} solid ${TITLE_UNDERLINE.accentColor}`,
        whiteSpace: 'nowrap',
        fontSize: TITLE_UNDERLINE.titleSize,
        lineHeight: TITLE_UNDERLINE.titleLineHeight,
        fontWeight: TITLE_UNDERLINE.titleWeight as unknown as React.CSSProperties['fontWeight'],
        color: tone === 'primary' ? TITLE_UNDERLINE.colorPrimary : TITLE_UNDERLINE.colorSecondary,
      }}
    >
      {icon}
      <span>{title}</span>
    </div>
    <div
      style={{
        flex: 1,
        minWidth: 0,
        paddingBottom: TITLE_UNDERLINE.underlinePadding,
        borderBottom: `${TITLE_UNDERLINE.underlineWidth} solid ${TITLE_UNDERLINE.ruleColor}`,
        alignSelf: 'stretch',
      }}
    />
  </div>
);

export default TitleWithUnderline;
