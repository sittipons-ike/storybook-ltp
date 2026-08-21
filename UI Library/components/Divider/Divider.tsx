import React from 'react';
import '../../foundations/tokens.css';
import { DIVIDER, dividerColor, type DividerStyle, type DividerTone } from './tokens';
import './Divider.css';

export interface DividerProps {
  /** Which of Figma's five `colors/divider` roles the line takes. */
  tone?: DividerTone;
  /** `dashed` matches the Frontend's dash-line; `solid` matches Figma's carts and orders dividers. */
  lineStyle?: DividerStyle;
  /**
   * Vertical space above and below.
   *
   * Zero by default, and deliberately so: across 46 Frontend call sites the spacing is
   * passed by the parent (`my-2` and so on), never owned by the divider. Making it a prop
   * with a zero default keeps that arrangement while giving the common case a name.
   */
  spacing?: string | number;
  className?: string;
}

/**
 * Divider — Lotteryplus Design System
 *
 * A rule between blocks of content. It is an `<hr>`, so assistive technology announces a
 * separator without any extra markup.
 *
 * Figma ships no divider component — checked across every page on 2026-08-19 — but it does
 * declare a `colors/divider` group with five roles, so this component is built on those
 * rather than on a colour picked for it. The Frontend's `common/dash-line` (46 usages)
 * supplies the shape: a full-width 1px top border.
 *
 * The Frontend's own colours are Tailwind greys that predate this
 * palette and appear nowhere in it. They are recorded in divider.json rather than copied.
 */
const Divider: React.FC<DividerProps> = ({
  tone = 'light-gray',
  lineStyle = 'dashed',
  spacing = DIVIDER.spacing,
  className = '',
}) => (
  <hr
    className={`ltp-divider ltp-divider--${lineStyle} ltp-divider--${tone} ${className}`}
    style={{
      borderTopWidth: DIVIDER.thickness,
      borderTopStyle: lineStyle,
      borderTopColor: dividerColor(tone),
      marginTop: spacing,
      marginBottom: spacing,
    }}
  />
);

export default Divider;
