import React from 'react';
import '../foundations/tokens.css';
import { logoEntry, logoSrc, type LogoName } from './logos.generated';
import './Logo.css';

export interface LogoProps {
  /** File stem from the manifest — `logo-bank-scb`, `gp-quick-menu-nokcash`, and so on. */
  name: LogoName | string;
  /**
   * Rendered size in px, for the square marks — Figma draws them at 80, and the social
   * icons at 32.
   */
  size?: number;
  /**
   * Explicit dimensions, for artwork that is not square. The card faces are 326x205 and
   * would be squashed by a single `size`.
   */
  width?: number;
  height?: number;
  /**
   * Accessible name. Required unless the mark is decorative, in which case pass `''` and
   * it is hidden from assistive technology.
   */
  alt: string;
  className?: string;
}

/**
 * Logo — Lotteryplus Design System
 *
 * A brand mark or illustration from Figma's `logos-and-graphics` page, served as a file.
 *
 * These are deliberately not icons and deliberately not recolourable. 70 of the 107 marks
 * carry unbound multi-colour fills — 229 distinct colours across the page — and several
 * are third-party brand marks that must not be tinted. `Icon` offers a `color` prop; an
 * `<img>` does not, which is why these render as one. The restriction is structural rather
 * than a rule somebody has to remember.
 *
 * Nothing here is bundled: the files live in `ui/assets/logos` and are served by
 * `staticDirs`, so the browser caches them separately and the JavaScript stays small.
 */
const Logo: React.FC<LogoProps> = ({ name, size = 80, width, height, alt, className = '' }) => {
  const src = logoSrc(name);

  if (!src) {
    // A missing mark renders as nothing and says so, rather than silently drawing a gap.
    if (typeof console !== 'undefined') {
      console.error(`[Logo] "${name}" is not in the manifest — run tools/gen-logo-manifest.py`);
    }
    return null;
  }

  const decorative = alt === '';
  const w = width ?? size;
  const h = height ?? size;

  return (
    <img
      className={`ltp-logo ${className}`}
      src={src}
      width={w}
      height={h}
      alt={alt}
      aria-hidden={decorative || undefined}
      role={decorative ? 'presentation' : undefined}
      style={{ width: w, height: h }}
      loading="lazy"
      decoding="async"
    />
  );
};

/** Everything the manifest holds, for galleries and for tests that assert coverage. */
export { LOGOS, logoEntry, logoSrc, LOGO_BASE, type LogoEntry, type LogoName } from './logos.generated';

export default Logo;
