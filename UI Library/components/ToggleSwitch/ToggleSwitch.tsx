import React from 'react';
import '../../foundations/tokens.css';
import {
  TOGGLE,
  TOGGLE_COLORS,
  trackBackground,
  knobOffset,
  type ToggleSwitchState,
} from './tokens';
import './ToggleSwitch.css';

// ═══════════════════════════════════════════
//  Toggle Switch — Lotteryplus Design System
//  Figma: "toggle-switch" component set (14291:131527)
//  Variants: active=true (green/right) | active=false (gray/left)
//  Structure: Track (pill) → Knob (circle)
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via design.md + components.json + the toggle-switch overlay.
//  There are no literal colours, sizes, or font values in this file.
// ═══════════════════════════════════════════

export interface ToggleSwitchProps {
  /** Current active (selected) state */
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

  // Canonical state: disabled beats selected beats rest. Hover / active / focus are
  // handled by CSS pseudo-classes — the switch has no colour change for them in Figma.
  const state: ToggleSwitchState = disabled ? 'disabled' : active ? 'selected' : 'rest';

  const transition = `${TOGGLE.transitionDuration} ${TOGGLE.transitionTiming}`;

  return (
    <button
      type="button"
      className={`ltp-toggle-switch ltp-toggle-switch--${state} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      role="switch"
      aria-checked={active}
      aria-label={ariaLabel}
      data-state={state}
    >
      {/* ── Track (pill shape) ──
          Figma: "Toggle" frame — --toggle-track-width x --toggle-track-height
          Fill: --toggle-background-green (ON) / --toggle-background-soft-gray (OFF)
          Corner radius: --toggle-radius → --sys-radius-full */}
      <div
        className="ltp-toggle-switch__track"
        style={{
          width: TOGGLE.trackWidth,
          height: TOGGLE.trackHeight,
          borderRadius: TOGGLE.radius,
          backgroundColor: trackBackground(active),
          position: 'relative',
          transition: `background-color ${transition}`,
        }}
      >
        {/* ── Knob (circle) ──
            Figma: "Knob" frame — --toggle-knob-size, inset --toggle-knob-inset
            Fill: --toggle-foreground-white
            Shadow: --toggle-knob-shadow → --sys-elevation-floating */}
        <div
          className="ltp-toggle-switch__knob"
          style={{
            width: TOGGLE.knobSize,
            height: TOGGLE.knobSize,
            borderRadius: TOGGLE.radius,
            backgroundColor: TOGGLE_COLORS.knob,
            boxShadow: TOGGLE.knobShadow,
            position: 'absolute',
            top: TOGGLE.knobInset,
            left: knobOffset(active),
            transition: `left ${transition}`,
          }}
        />
      </div>
    </button>
  );
};

export default ToggleSwitch;
