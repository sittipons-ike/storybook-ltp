import React from 'react';
import '../../foundations/tokens.css';
import { SKELETON } from './tokens';
import './Skeleton.css';

export interface SkeletonProps {
  /** The shape. The Frontend passes Tailwind classes; here the caller passes dimensions. */
  width?: number | string;
  height?: number | string;
  /** Round the placeholder fully — for avatar-shaped content. */
  circle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Skeleton — Lotteryplus Design System
 *
 * No Figma component exists (verified absent 2026-08-20). Built from the Frontend's
 * `common/skeleton` — one pulsing div, 6px radius, `background.gray-soft-light` —
 * per the amended authority rule: Figma wins when it exists; here it does not.
 *
 * Pairs with Loading: Loading says "working", Skeleton says "this shape is coming".
 */
const Skeleton: React.FC<SkeletonProps> = ({ width, height, circle = false, className = '', style }) => (
  <span
    aria-hidden
    className={`ltp-skeleton ${className}`}
    style={{
      width,
      height,
      borderRadius: circle ? '50%' : SKELETON.radius,
      background: SKELETON.background,
      ...style,
    }}
  />
);

export default Skeleton;
