import React from 'react';
import '../../foundations/tokens.css';
import { LOADING, loadingSize, type LoadingSize } from './tokens';
import './Loading.css';

// ═══════════════════════════════════════════
//  Loading — Lotteryplus Design System
//  Figma: "Loading" component (14291:131477)
//  Structure: 56×56 container → 44.8×44.8 frame
//    → Track ring (overlay-heavy, element opacity 25%)
//    → Spinning arc (foreground-white, or primary on Figma's Variant2)
//  Animation: CSS rotate 360° infinite linear
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via components.figma.json + components/loading.json. There are
//  no literal colours, sizes, or durations in this file.
// ═══════════════════════════════════════════

export type { LoadingSize };

/**
 * Figma's `Property 1` axis. `Default` paints the arc `loading-fg-white`; `Variant2`
 * paints it `colors/primary/default`. The library had only the first until 2026-08-19.
 */
export type LoadingTone = 'white' | 'primary';

export interface LoadingProps {
  /** Size preset, or an explicit pixel number. `default` matches Figma (56px). */
  size?: LoadingSize | number;
  /** Animation duration override (CSS time value) */
  duration?: string;
  /** Pause the animation */
  paused?: boolean;
  /** Custom track color (overrides the token) */
  trackColor?: string;
  /** Which of Figma's two variants to render — white arc or brand-red arc. */
  tone?: LoadingTone;
  /** Custom arc color (overrides both the tone and the token) */
  arcColor?: string;
  /** Additional className */
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'default',
  duration,
  paused = false,
  tone = 'white',
  trackColor,
  arcColor,
  className = '',
}) => {
  // A number is an explicit pixel override; a preset resolves to a --loading-size-* var.
  const box = typeof size === 'number' ? `${size}px` : loadingSize(size);

  return (
    <div
      className={`ltp-loading ${paused ? 'ltp-loading--paused' : ''} ${className}`}
      style={{
        width: box,
        height: box,
        padding: LOADING.padding,
        borderRadius: LOADING.radius,
      }}
      role="status"
      aria-label="Loading"
    >
      {/*
        SVG exported from the Figma "Loading" component.
        ViewBox 0 0 56 56 matches the Figma component frame; the rendered box is sized
        by CSS so it can carry a token rather than a hard-coded attribute.
      */}
      <svg
        className="ltp-loading__spinner"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: box,
          height: box,
          ...(duration ? { animationDuration: duration } : null),
        }}
      >
        {/* Track ring — Figma: Vector (14291:131479)
            Fill: colors/loading/loading-bg-black-80% → --loading-background-black-80
            Opacity: --loading-track-opacity (element level, 25%) */}
        <path
          d="M28 7.46667C23.9389 7.46667 19.969 8.67093 16.5923 10.9272C13.2156 13.1834 10.5838 16.3903 9.02967 20.1422C7.47555 23.8942 7.06893 28.0228 7.86121 32.0059C8.65349 35.9889 10.6091 39.6476 13.4807 42.5193C16.3524 45.3909 20.0111 47.3465 23.9941 48.1388C27.9772 48.9311 32.1058 48.5245 35.8578 46.9703C39.6097 45.4162 42.8166 42.7844 45.0728 39.4077C47.3291 36.031 48.5333 32.0611 48.5333 28C48.5333 22.5542 46.37 17.3315 42.5193 13.4808C38.6685 9.63 33.4458 7.46667 28 7.46667ZM28 42.9333C25.0465 42.9333 22.1593 42.0575 19.7035 40.4166C17.2477 38.7757 15.3337 36.4435 14.2034 33.7148C13.0731 30.986 12.7774 27.9834 13.3536 25.0867C13.9298 22.1899 15.3521 19.529 17.4405 17.4405C19.529 15.3521 22.1899 13.9298 25.0867 13.3536C27.9834 12.7774 30.986 13.0731 33.7147 14.2034C36.4435 15.3337 38.7757 17.2477 40.4166 19.7035C42.0575 22.1593 42.9333 25.0465 42.9333 28C42.9333 31.9606 41.36 35.7589 38.5595 38.5595C35.7589 41.36 31.9606 42.9333 28 42.9333Z"
          style={{
            fill: trackColor || LOADING.trackFill,
            opacity: LOADING.trackOpacity,
          }}
        />

        {/* Spinning arc — Figma: Vector (14291:131480)
            Fill: colors/loading/loading-fg-white → --loading-foreground-white */}
        <path
          d="M24.528 7.76535C20.3526 8.46978 16.4971 10.4479 13.4896 13.4286C10.4821 16.4094 8.46968 20.2471 7.728 24.416C7.63893 24.8144 7.63298 25.2268 7.71053 25.6276C7.78808 26.0283 7.94746 26.4088 8.17871 26.7452C8.40997 27.0815 8.70812 27.3666 9.05453 27.5825C9.40094 27.7984 9.78817 27.9405 10.192 28C10.919 28.0697 11.6449 27.8563 12.2186 27.4043C12.7923 26.9523 13.1696 26.2965 13.272 25.5734C13.7808 22.4695 15.2566 19.6056 17.489 17.3899C19.7214 15.1743 22.5964 13.7201 25.704 13.2347C26.3375 13.1492 26.9188 12.8376 27.3407 12.3574C27.7626 11.8771 27.9967 11.2606 28 10.6214C27.9965 10.1927 27.8989 9.76999 27.7142 9.38312C27.5296 8.99624 27.2623 8.65458 26.9312 8.38225C26.6001 8.10991 26.2133 7.91353 25.7981 7.80694C25.3829 7.70035 24.9493 7.68615 24.528 7.76535Z"
          style={{ fill: arcColor || (tone === 'primary' ? LOADING.arcPrimary : LOADING.arcFill) }}
        />
      </svg>

      {/* Screen reader text */}
      <span className="ltp-loading__sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
