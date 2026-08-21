import React from 'react';
import '../../foundations/tokens.css';
import { sys } from '../../foundations/tokens';
import Button from '../Button/Button';
import { ACTION_BAR } from './tokens';
import './ActionBar.css';

export interface ActionBarAction {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ActionBarProps {
  /** The committing action. Figma draws exactly this one, full width. */
  primary?: ActionBarAction;
  /**
   * The way out. Figma has not drawn this case; the Frontend gives it a third of the row
   * and 17 pages rely on it, so it is modelled from there.
   */
  secondary?: ActionBarAction;
  /** A line of context above the buttons — a total, a warning, a count. */
  info?: React.ReactNode;
  /** Anything more elaborate than two buttons. Replaces `primary` and `secondary`. */
  children?: React.ReactNode;
  /** Reserve the device's home affordance below the buttons, as the page template does. */
  homeIndicator?: boolean;
  className?: string;
}

/** The 34px strip a modern phone reserves at the bottom edge. */
export const HomeIndicator: React.FC = () => (
  <div className="ltp-action-bar__home-indicator" style={{ height: ACTION_BAR.homeIndicatorHeight }}>
    <span
      style={{
        width: ACTION_BAR.homeIndicatorBarWidth,
        height: ACTION_BAR.homeIndicatorBarHeight,
        borderRadius: ACTION_BAR.homeIndicatorBarRadius,
        background: ACTION_BAR.homeIndicatorForeground,
      }}
    />
  </div>
);

/**
 * ActionBar — Lotteryplus Design System
 *
 * The bar of committing actions pinned to the bottom of a page. It fills the same shell
 * slot as the site Footer, which is why the slot's contract lists both: they are separate
 * components that never appear together.
 *
 * Its colours come from `colors/background` and `colors/navigation-border` rather than
 * `colors/top-and-footer` — which is the clearest evidence that Figma treats it as its own
 * thing, even though it has never drawn it as a component.
 */
const ActionBar: React.FC<ActionBarProps> = ({
  primary,
  secondary,
  info,
  children,
  homeIndicator = false,
  className = '',
}) => (
  <div
    className={`ltp-action-bar ${className}`}
    style={{
      background: ACTION_BAR.background,
      // Figma strokes this line with `strokeAlign: INSIDE`, so it sits within the frame
      // rather than adding to it. An inset shadow is the CSS that means the same thing;
      // `border-top` would make the bar 111px where Figma says 110.
      boxShadow: `inset 0 ${ACTION_BAR.borderWidth} 0 ${ACTION_BAR.border}`,
    }}
  >
    <div style={{ padding: ACTION_BAR.padding }}>
      {info && (
        <p
          className="ltp-action-bar__info"
          style={{
            paddingBottom: ACTION_BAR.padding,
            color: sys('color-text-secondary-default'),
            fontSize: sys('type-button-md-medium-size'),
            lineHeight: sys('type-button-md-medium-line-height'),
            fontWeight: sys('type-button-md-medium-weight'),
          }}
        >
          {info}
        </p>
      )}
      <div className="ltp-action-bar__buttons" style={{ gap: ACTION_BAR.gap }}>
        {children ?? (
          <>
            {secondary && (
              <div className="ltp-action-bar__secondary" style={{ flexBasis: ACTION_BAR.secondaryBasis }}>
                <Button
                  variant="tertiary"
                  size="lg"
                  fullWidth
                  disabled={secondary.disabled}
                  onClick={secondary.onClick}
                >
                  {secondary.label}
                </Button>
              </div>
            )}
            {primary && (
              <div className="ltp-action-bar__primary">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={primary.disabled}
                  onClick={primary.onClick}
                >
                  {primary.label}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    {homeIndicator && <HomeIndicator />}
  </div>
);

export default ActionBar;
