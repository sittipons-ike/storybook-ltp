import React from 'react';
import {
  TOGGLE_COLORS,
  TOGGLE_DIMENSIONS,
  TOGGLE_ANIMATION,
  SHADOW,
  RADIUS,
  SPACING,
} from './tokens';
import './ToggleSwitch.css';

// ═══════════════════════════════════════════
//  Toggle Switch — Lotteryplus Design System
//  Figma: "toggle-switch" component set (14291:131527)
//  Variants: active=true (green/right) | active=false (gray/left)
//  Structure: Track (pill) → Knob (circle)
//  Knob has shadow-md and slides with CSS transition
// ═══════════════════════════════════════════

export interface ToggleSwitchProps {
  /** Current active state */
  active?: boolean;
  /** Change handler */
  onChange?: (active: boolean) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Aria label */
  ariaLabel?: string;
  /** Additional className */
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  active = false,
  onChange,
  disabled = false,
  ariaLabel = 'Toggle',
  className = '',
}) => {
  const handleClick = () => {
    if (disabled) return;
    onChange?.(!active);
  };

  // Track background: green when ON, soft gray when OFF
  const trackBg = active
    ? TOGGLE_COLORS.track.on    // #22C55E → colors/toggle-switch/toggle-bg-green
    : TOGGLE_COLORS.track.off;  // #E5E5E5 → colors/toggle-switch/toggle-bg-soft-gray

  // Knob position: x:22 when ON, x:2 when OFF
  const knobX = active
    ? TOGGLE_DIMENSIONS.knobPosition.on   // 22px
    : TOGGLE_DIMENSIONS.knobPosition.off; // 2px

  return (
    <button
      type="button"
      className={`ltp-toggle-switch ${className}`}
      onClick={handleClick}
      disabled={disabled}
      role="switch"
      aria-checked={active}
      aria-label={ariaLabel}
    >
      {/* ── Track (pill shape) ──
          Figma: "Toggle" frame 51×31
          Fill: toggle-bg-green (ON) / toggle-bg-soft-gray (OFF)
          CornerRadius: radius-full (9999) */}
      <div
        className="ltp-toggle-switch__track"
        style={{
          width: TOGGLE_DIMENSIONS.track.width,   // 51px
          height: TOGGLE_DIMENSIONS.track.height,  // 31px
          borderRadius: RADIUS.full,               // 9999 → radius-full
          backgroundColor: trackBg,
          position: 'relative',
          transition: `background-color ${TOGGLE_ANIMATION.duration} ${TOGGLE_ANIMATION.timingFunction}`,
        }}
      >
        {/* ── Knob (circle) ──
            Figma: "Knob" frame 27×27
            Fill: toggle-fg-white (#FFFFFF)
            Shadow: dimension/shadow/md (2× DROP_SHADOW)
            Position: x:2,y:2 (OFF) → x:22,y:2 (ON) */}
        <div
          className="ltp-toggle-switch__knob"
          style={{
            width: TOGGLE_DIMENSIONS.knob.size,    // 27px
            height: TOGGLE_DIMENSIONS.knob.size,   // 27px
            borderRadius: RADIUS.full,             // 9999 → radius-full
            backgroundColor: TOGGLE_COLORS.knob.fill, // #FFFFFF → toggle-fg-white
            boxShadow: SHADOW.md,                  // dimension/shadow/md
            position: 'absolute',
            top: TOGGLE_DIMENSIONS.knobPosition.y,  // 2px
            left: knobX,                            // 2px (OFF) or 22px (ON)
            transition: `left ${TOGGLE_ANIMATION.duration} ${TOGGLE_ANIMATION.timingFunction}`,
          }}
        />
      </div>
    </button>
  );
};

export default ToggleSwitch;
