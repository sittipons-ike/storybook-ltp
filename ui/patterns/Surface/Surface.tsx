import React from 'react';
import '../../foundations/tokens.css';
import Stack, { type Space } from '../Stack/Stack';

/** Figma's `semantic.elevation` roles, by name. */
export type Elevation =
  | 'none' | 'flat' | 'raised' | 'card' | 'floating' | 'popover' | 'modal' | 'hero' | 'inner';

/** The page-level backgrounds a card can sit on. */
export type SurfaceTone = 'default' | 'soft-light' | 'light' | 'primary';

/** `primary` is the brand red; the rest are page backgrounds. */
const TONE_VAR: Record<SurfaceTone, string> = {
  default: '--sys-color-background-default',
  'soft-light': '--sys-color-background-soft-light',
  light: '--sys-color-background-light',
  primary: '--sys-color-primary-default',
};

export interface SurfaceProps {
  children?: React.ReactNode;
  /** Corner radius, by name. `2xl` (16) is what the Frontend's cards use. */
  radius?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  elevation?: Elevation;
  tone?: SurfaceTone;
  padding?: Space;
  paddingX?: Space;
  paddingY?: Space;
  gap?: Space;
  direction?: 'column' | 'row';
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  /** Clip children to the radius — needed when rows run edge to edge inside. */
  clip?: boolean;
  as?: 'div' | 'section' | 'ul' | 'li';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Surface — Lotteryplus Design System
 *
 * A raised panel: a background, a radius and a shadow, with a Stack inside it.
 *
 * It exists because the page tier kept needing one. `/profile` alone draws three — the
 * balance card, the member-info list, the help list — and the Frontend spells each as
 * `rounded-2xl bg-default shadow-base` in its own CSS module. Written at the page level
 * that is three tokens per card, which `check-pages.py` refuses and should: a page that
 * knows what `--sys-elevation-card` is called is a page the rename has to visit.
 *
 * So the card gets a name, and the page asks for `elevation="card"` instead.
 *
 * Structural rather than drawn, like Stack: Figma has no `Surface` component because in
 * Figma this is just a frame with a fill and an effect. The name is for this side.
 */
const Surface: React.FC<SurfaceProps> = ({
  children,
  radius = '2xl',
  elevation = 'card',
  tone = 'default',
  padding,
  paddingX,
  paddingY,
  gap,
  direction = 'column',
  align,
  justify,
  clip = false,
  as = 'div',
  className = '',
  style,
}) => (
  <Stack
    as={as}
    direction={direction}
    gap={gap}
    padding={padding}
    paddingX={paddingX}
    paddingY={paddingY}
    align={align}
    justify={justify}
    className={className}
    style={{
      borderRadius: `var(--sys-radius-${radius})`,
      background: `var(${TONE_VAR[tone]})`,
      boxShadow: `var(--sys-elevation-${elevation})`,
      overflow: clip ? 'hidden' : undefined,
      ...style,
    }}
  >
    {children}
  </Stack>
);

export default Surface;
