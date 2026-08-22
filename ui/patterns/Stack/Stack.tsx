import React from 'react';
import '../../foundations/tokens.css';

/**
 * The spacing ladder, by name. A page says `gap="2xl"`, never `16` and never
 * `var(--sys-spacing-2xl)`.
 *
 * `2lg` is on the ladder but deliberately absent here: it is 10px, it is not a canonical
 * t-shirt stop, and it is already marked for retirement (figma-rename-map.md §5.1). A new
 * page should not be able to reach for it.
 */
export type Space =
  | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

const space = (value?: Space) => (value ? `var(--sys-spacing-${value})` : undefined);

export interface StackProps {
  children?: React.ReactNode;
  /** Stacked (default) or in a row. */
  direction?: 'column' | 'row';
  gap?: Space;
  padding?: Space;
  paddingX?: Space;
  paddingY?: Space;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
  /** Cap the content width — a phone-width page inside a desktop Storybook frame. */
  maxWidth?: number | string;
  grow?: boolean;
  as?: 'div' | 'section' | 'main' | 'ul' | 'li' | 'nav';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Stack — Lotteryplus Design System
 *
 * The only place the page tier is allowed to express space.
 *
 * Pages compose components; they must not reach past them for a token, because every raw
 * token written at the page level is one more string a rename has to find, and there will
 * eventually be 78 pages against 30 components. `check-pages.py` enforces that. Without
 * somewhere legitimate to put a gap, though, the rule just pushes pages into writing bare
 * numbers, which is worse — a `16` says nothing about which step of the ladder it is.
 *
 * So spacing gets a component. `gap="2xl"` is the name of a step; what it resolves to is
 * this file's problem, and it stays correct through the rename.
 *
 * Structural, not drawn: Figma has no Stack and should not — it is the auto-layout frame
 * every design already uses, given a name on this side.
 */
const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  gap,
  padding,
  paddingX,
  paddingY,
  align,
  justify,
  wrap = false,
  maxWidth,
  grow = false,
  as: Tag = 'div',
  className = '',
  style,
}) => (
  <Tag
    className={className}
    style={{
      display: 'flex',
      boxSizing: 'border-box',
      flexDirection: direction,
      gap: space(gap),
      // Four longhands, never the shorthand. React writes style properties in key order
      // and an `undefined` longhand *removes* what a shorthand set before it — so
      // `padding: 16px` followed by `paddingLeft: undefined` leaves no padding at all,
      // silently. Resolving each side first means there is nothing to undo.
      paddingTop: space(paddingY ?? padding),
      paddingRight: space(paddingX ?? padding),
      paddingBottom: space(paddingY ?? padding),
      paddingLeft: space(paddingX ?? padding),
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : undefined,
      width: '100%',
      maxWidth,
      flex: grow ? 1 : undefined,
      minWidth: 0,
      ...style,
    }}
  >
    {children}
  </Tag>
);

export default Stack;
