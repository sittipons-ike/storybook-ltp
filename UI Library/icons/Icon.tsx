import React from 'react';
import '../foundations/tokens.css';
import { component } from '../foundations/tokens';
import './Icon.css';

const t = component('icon');

/**
 * Size steps mirror Figma's `icons-size` component set (14291:110788) — ten sizes.
 * Figma models these as components rather than variables, so the values live in
 * `design-library/lotteryplus/components/icon.json` and are generated into
 * `--icon-size-*`. Consumers pass a number; the union is what the design system offers.
 */
export const ICON_SIZES = {
  '2xs': 12,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 56,
  '4xl': 64,
  '5xl': 72,
} as const;

export type IconSizeName = keyof typeof ICON_SIZES;
export type IconSize = (typeof ICON_SIZES)[IconSizeName];

/** Colour roles Figma declares in `colors/icon/*`. */
export type IconColor = 'primary' | 'secondary' | 'tertiary' | 'onBg' | 'inherit';

export interface IconProps {
  /** Icon name matching the Figma component name */
  name: string;
  /** Size in px, or a t-shirt step from the `icons-size` set */
  size?: IconSize | IconSizeName;
  /** Semantic colour from the design system */
  color?: IconColor;
  /** Explicit colour override — a token reference such as `var(--btn-primary-foreground-rest)` */
  customColor?: string;
  /** Additional class */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Figma's `colors/icon/*` group, resolved through Tier 2. `inherit` has no token because
 * it is a mechanism, not a colour — it hands the decision to the parent's `color`.
 */
const COLOR_TOKEN: Record<IconColor, string> = {
  primary: t.ref('foreground-primary'),
  secondary: t.ref('foreground-secondary'),
  tertiary: t.ref('foreground-tertiary'),
  onBg: t.ref('foreground-white'),
  inherit: 'currentColor',
};

const resolveSize = (size: IconSize | IconSizeName): number =>
  typeof size === 'number' ? size : ICON_SIZES[size];

/**
 * Icon — Lotteryplus Design System
 *
 * Renders inline SVG paths exported from Figma's `icons` frame.
 *
 * Note on `fill`: the value lands on the SVG presentation attribute, which browsers map
 * to CSS, so a `var(--…)` reference resolves there as it would in a style. That is what
 * lets callers pass a component token straight through.
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'secondary',
  customColor,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const fill = customColor || COLOR_TOKEN[color];
  const px = resolveSize(size);
  const iconData = ICONS[name];

  if (!iconData) {
    // Loud on purpose: a missing icon renders as a small grey "?" that is easy to scroll
    // past in review and impossible to miss in production. `filled-Randomize` shipped this
    // way — referenced by SearchCard, never drawn in Figma, never noticed.
    console.error(`[Icon] "${name}" is not registered in icon-data.ts`);
    return (
      <span
        className={`ltp-icon ltp-icon--missing ${className}`}
        style={{
          width: px,
          height: px,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: px * 0.5,
          color: t.ref('missing-foreground'),
        }}
        title={`Icon not found: ${name}`}
      >
        ?
      </span>
    );
  }

  return (
    <svg
      className={`ltp-icon ${className}`}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      {iconData.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={fill}
          fillRule={iconData.fillRule || 'nonzero'}
          clipRule={iconData.fillRule === 'evenodd' ? 'evenodd' : undefined}
        />
      ))}
    </svg>
  );
};

// ═══════════════════════════════════════════
//  Icon path data — exported from Figma
//  Source: "Design Systems Web App Lotteryplus V.7.1"
//  Frame: icons (14291:110788)
// ═══════════════════════════════════════════

type IconData = { paths: string[]; fillRule?: 'evenodd' | 'nonzero' };

export const ICONS: Record<string, IconData> = {};

/** Populated by the generated icon-data file. */
export function registerIcons(icons: Record<string, IconData>) {
  Object.assign(ICONS, icons);
}

/** Every registered icon name, for stories and audits. */
export const iconNames = (): string[] => Object.keys(ICONS).sort();

export default Icon;
