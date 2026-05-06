import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  TOOLTIP_COLORS,
  TOOLTIP_DIMENSIONS,
  TYPOGRAPHY,
  RADIUS,
  SHADOW,
} from './tokens';
import type { TooltipPosition } from './tokens';

// ═══════════════════════════════════════════
//  Tooltip — Lotteryplus Design System
//  Figma: tool-tip page
//  Structure: Content (bg + title + body) + Arrow
//  Positioning: top | bottom | left | right
//  Uses Icon component for trigger
// ═══════════════════════════════════════════

export interface TooltipProps {
  /** Tooltip title (bold) */
  title?: string;
  /** Tooltip body/description */
  content: string;
  /** Arrow/tooltip position relative to trigger */
  position?: TooltipPosition;
  /** Trigger element — if not provided, shows tooltip always */
  children?: React.ReactNode;
  /** Show tooltip (controlled) */
  visible?: boolean;
  /** Max width */
  maxWidth?: number;
  /** Additional className */
  className?: string;
}

// Arrow SVG component matching Figma's 16×8 arrow
const Arrow: React.FC<{ position: TooltipPosition }> = ({ position }) => {
  const { width: w, height: h } = TOOLTIP_DIMENSIONS.arrow; // 16×8
  const color = TOOLTIP_COLORS.arrow;
  const isHorizontal = position === 'left' || position === 'right';

  // For top/bottom: 16×8 SVG, for left/right: 8×16 SVG (swapped)
  const svgW = isHorizontal ? h : w;
  const svgH = isHorizontal ? w : h;

  // Draw arrow path directly for each position (no CSS rotation needed)
  const paths: Record<TooltipPosition, string> = {
    top:    `M${w / 2} ${h}L0 0H${w}L${w / 2} ${h}Z`,     // ▽ points down
    bottom: `M${w / 2} 0L0 ${h}H${w}L${w / 2} 0Z`,         // △ points up
    left:   `M${h} ${w / 2}L0 0V${w}L${h} ${w / 2}Z`,      // ▷ points right
    right:  `M0 ${w / 2}L${h} 0V${w}L0 ${w / 2}Z`,         // ◁ points left
  };

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      fill="none"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path d={paths[position]} fill={color} />
    </svg>
  );
};

// Tooltip bubble (content + arrow)
const TooltipBubble: React.FC<{
  title?: string;
  content: string;
  position: TooltipPosition;
  maxWidth: number;
}> = ({ title, content, position, maxWidth }) => {
  const isVertical = position === 'top' || position === 'bottom';
  // Arrow goes between content and trigger:
  // top/left: content first, then arrow (arrow closer to trigger)
  // bottom/right: arrow first, then content (arrow closer to trigger)
  const arrowBeforeContent = position === 'bottom' || position === 'right';

  const arrowEl = <Arrow position={position} />;

  const contentEl = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        padding: TOOLTIP_DIMENSIONS.content.padding,
        borderRadius: RADIUS.s,
        backgroundColor: TOOLTIP_COLORS.bg,
        maxWidth,
        minWidth: TOOLTIP_DIMENSIONS.content.minWidth,
        boxShadow: SHADOW.tooltip,
      }}
    >
      {title && (
        <span
          style={{
            fontFamily: TYPOGRAPHY.title.fontFamily,
            fontSize: TYPOGRAPHY.title.fontSize,
            fontWeight: TYPOGRAPHY.title.fontWeight,
            lineHeight: TYPOGRAPHY.title.lineHeight,
            color: TOOLTIP_COLORS.text,
          }}
        >
          {title}
        </span>
      )}
      <span
        style={{
          fontFamily: TYPOGRAPHY.body.fontFamily,
          fontSize: TYPOGRAPHY.body.fontSize,
          fontWeight: TYPOGRAPHY.body.fontWeight,
          lineHeight: TYPOGRAPHY.body.lineHeight,
          color: TOOLTIP_COLORS.text,
        }}
      >
        {content}
      </span>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
      }}
    >
      {arrowBeforeContent && arrowEl}
      {contentEl}
      {!arrowBeforeContent && arrowEl}
    </div>
  );
};

const Tooltip: React.FC<TooltipProps> = ({
  title,
  content,
  position = 'top',
  children,
  visible: controlledVisible,
  maxWidth = TOOLTIP_DIMENSIONS.content.maxWidth,
  className = '',
}) => {
  const [hovered, setHovered] = useState(false);
  const isVisible = controlledVisible !== undefined ? controlledVisible : hovered;

  // If no children, just render the bubble (for demo/storybook)
  if (!children) {
    return (
      <TooltipBubble
        title={title}
        content={content}
        position={position}
        maxWidth={maxWidth}
      />
    );
  }

  // Position offsets
  const positionStyles: Record<TooltipPosition, React.CSSProperties> = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 4 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 4 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 4 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 4 },
  };

  return (
    <div
      className={`ltp-tooltip ${className}`}
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Trigger */}
      {children}

      {/* Tooltip bubble */}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            ...positionStyles[position],
            pointerEvents: 'none',
          }}
        >
          <TooltipBubble
            title={title}
            content={content}
            position={position}
            maxWidth={maxWidth}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
