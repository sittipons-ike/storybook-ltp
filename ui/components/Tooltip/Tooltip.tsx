import React, { useState } from 'react';
import '../../foundations/tokens.css';
import { TOOLTIP, TOOLTIP_ARROW, type TooltipPosition } from './tokens';

// ═══════════════════════════════════════════
//  Tooltip — Lotteryplus Design System
//  Figma: tool-tip page
//  Structure: Content (bg + title + body) + Arrow
//  Positioning: top | bottom | left | right
//
//  Every style value is a CSS custom property from foundations/tokens.css. There are no
//  literal colours, sizes or font values in this file. Note the exception this component
//  carries: Figma has no `colors/tooltip` group, so the colour tokens behind these vars
//  are authored against the semantic layer rather than mirrored — see ./tokens.ts.
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
  /** Max width, in px. Defaults to the `--tooltip-max-width` token. */
  maxWidth?: number;
  /** Additional className */
  className?: string;
}

/** Stacking order, not a design token — design.md models no z-index scale. */
const BUBBLE_Z_INDEX = 1000;

/** Caret — an SVG path, so its geometry is numeric (see TOOLTIP_ARROW in ./tokens). */
const Arrow: React.FC<{ position: TooltipPosition }> = ({ position }) => {
  const { width: w, height: h } = TOOLTIP_ARROW;
  const isHorizontal = position === 'left' || position === 'right';

  // For top/bottom: w×h SVG, for left/right: h×w SVG (swapped)
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
      <path d={paths[position]} style={{ fill: TOOLTIP.arrowBackground }} />
    </svg>
  );
};

// Tooltip bubble (content + arrow)
const TooltipBubble: React.FC<{
  title?: string;
  content: string;
  position: TooltipPosition;
  maxWidth?: number;
}> = ({ title, content, position, maxWidth }) => {
  const isVertical = position === 'top' || position === 'bottom';
  // Arrow goes between content and trigger:
  // top/left: content first, then arrow (arrow closer to trigger)
  // bottom/right: arrow first, then content (arrow closer to trigger)
  const arrowBeforeContent = position === 'bottom' || position === 'right';

  const arrowEl = <Arrow position={position} />;

  const textStyle = (role: typeof TOOLTIP.title | typeof TOOLTIP.body): React.CSSProperties => ({
    fontFamily: role.fontFamily,
    fontSize: role.fontSize,
    fontWeight: role.fontWeight as unknown as React.CSSProperties['fontWeight'],
    lineHeight: role.lineHeight,
    letterSpacing: role.letterSpacing,
    color: TOOLTIP.foreground,
  });

  const contentEl = (
    <div
      className="ltp-tooltip__content"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: TOOLTIP.gap,
        padding: TOOLTIP.padding,
        borderRadius: TOOLTIP.radius,
        backgroundColor: TOOLTIP.background,
        maxWidth: maxWidth ?? TOOLTIP.maxWidth,
        minWidth: TOOLTIP.minWidth,
        boxShadow: TOOLTIP.shadow,
      }}
    >
      {title && (
        <span className="ltp-tooltip__title" style={textStyle(TOOLTIP.title)}>
          {title}
        </span>
      )}
      <span className="ltp-tooltip__body" style={textStyle(TOOLTIP.body)}>
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
  maxWidth,
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

  // Position offsets — the gap to the trigger is `--tooltip-offset`.
  const positionStyles: Record<TooltipPosition, React.CSSProperties> = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: TOOLTIP.offset,
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: TOOLTIP.offset,
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: TOOLTIP.offset,
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: TOOLTIP.offset,
    },
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
            zIndex: BUBBLE_Z_INDEX,
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
