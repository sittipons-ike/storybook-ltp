import React from 'react';
import './Icon.css';

export type IconSize = 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 72;
export type IconColor = 'primary' | 'secondary' | 'tertiary' | 'onBg' | 'inherit';

export interface IconProps {
  /** Icon name matching Figma component name */
  name: string;
  /** Icon size in px — matches Figma icons-size variants */
  size?: IconSize;
  /** Semantic color from design system */
  color?: IconColor;
  /** Custom color override (hex) */
  customColor?: string;
  /** Additional class */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

const COLOR_MAP: Record<IconColor, string> = {
  primary: '#E32321',
  secondary: '#262626',
  tertiary: '#737373',
  onBg: '#FFFFFF',
  inherit: 'currentColor',
};

/**
 * Icon component — Lotteryplus Design System
 *
 * Renders inline SVG icons exported from Figma.
 * Uses the `icons-size` component set properties:
 *   - Size: 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 72
 *   - Colors: Primary | Secondary | Tertiary | On BG
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'secondary',
  customColor,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const fill = customColor || COLOR_MAP[color];
  const iconData = ICONS[name];

  if (!iconData) {
    return (
      <span
        className={`ltp-icon ltp-icon--missing ${className}`}
        style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.5, color: '#C9C9C9' }}
        title={`Icon not found: ${name}`}
      >
        ?
      </span>
    );
  }

  return (
    <svg
      className={`ltp-icon ${className}`}
      width={size}
      height={size}
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
//  Frame: icons (14291:110788) — 155 components
// ═══════════════════════════════════════════

type IconData = { paths: string[]; fillRule?: 'evenodd' | 'nonzero' };

// This will be populated by the icon export script
export const ICONS: Record<string, IconData> = {};

// Helper to register icons (used by generated icon-data file)
export function registerIcons(icons: Record<string, IconData>) {
  Object.assign(ICONS, icons);
}

export default Icon;
