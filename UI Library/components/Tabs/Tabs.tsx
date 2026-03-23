import React from 'react';
import {
  TAB_COLORS,
  TAB_DIMENSIONS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
} from './tokens';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import './Tabs.css';

// ═══════════════════════════════════════════
//  Tabs — Lotteryplus Design System
//  Figma component sets:
//    - "horizontal-tabs-underline" (14370:9654)
//    - "horizontal-tabs_button" (14370:9710)
//  Two visual styles: "underline" and "button"
//  Uses Icon component for badge indicators
// ═══════════════════════════════════════════

export interface TabItem {
  /** Unique key for the tab */
  key: string;
  /** Display label */
  label: string;
  /** Show badge indicator (error icon) */
  showBadge?: boolean;
}

export type TabVariant = 'underline' | 'button';
export type TabColorScheme = 'red' | 'black';

export interface TabsProps {
  /** Visual style variant */
  variant?: TabVariant;
  /** Tab items (2-5 tabs) */
  items: TabItem[];
  /** Currently active tab key */
  activeKey: string;
  /** Tab change handler */
  onChange?: (key: string) => void;
  /** Color scheme (button variant only): red or black */
  colorScheme?: TabColorScheme;
  /** Additional className */
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  variant = 'underline',
  items,
  activeKey,
  onChange,
  colorScheme = 'red',
  className = '',
}) => {
  if (variant === 'button') {
    return (
      <ButtonTabs
        items={items}
        activeKey={activeKey}
        onChange={onChange}
        colorScheme={colorScheme}
        className={className}
      />
    );
  }

  return (
    <UnderlineTabs
      items={items}
      activeKey={activeKey}
      onChange={onChange}
      className={className}
    />
  );
};

// ═══════════════════════════════════════════
//  Underline Style Tabs
//  Figma: "horizontal-tabs-underline"
// ═══════════════════════════════════════════
const UnderlineTabs: React.FC<Omit<TabsProps, 'variant' | 'colorScheme'>> = ({
  items,
  activeKey,
  onChange,
  className = '',
}) => {
  return (
    <div
      className={`ltp-tabs ltp-tabs--underline ${className}`}
      role="tablist"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // Bottom border: colors/tabs/tabs-fg-disable → #C9C9C9
        borderBottom: `${BORDER_WIDTH[1]}px solid ${TAB_COLORS.border.underline}`,
      }}
    >
      {items.map((item, index) => {
        const isActive = item.key === activeKey;

        return (
          <React.Fragment key={item.key}>
            {/* Separator line between tabs (except before first) */}
            {/* Figma: "Line" node, stroke Color/Border/Border-Disable #E5E5E5 */}
            {index > 0 && (
              <div
                style={{
                  width: 1,
                  height: TAB_DIMENSIONS.underline.height,
                  backgroundColor: TAB_COLORS.border.disable,
                }}
              />
            )}

            {/* Tab item — position:relative for badge positioning */}
            <button
              type="button"
              className="ltp-tabs__item"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange?.(item.key)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,

                // Padding: 8/16/8/16 → spacing-lg / spacing-2xl
                paddingTop: TAB_DIMENSIONS.underline.paddingTop,
                paddingRight: TAB_DIMENSIONS.underline.paddingRight,
                paddingBottom: TAB_DIMENSIONS.underline.paddingBottom,
                paddingLeft: TAB_DIMENSIONS.underline.paddingLeft,

                gap: TAB_DIMENSIONS.underline.gap, // spacing-lg = 8px

                height: TAB_DIMENSIONS.underline.height,

                // Selected: red bottom border (thicker)
                // Unselected: transparent bottom border
                borderBottom: isActive
                  ? `${TAB_DIMENSIONS.underline.selectedBorderWidth}px solid ${TAB_COLORS.border.activeUnderline}`
                  : `${TAB_DIMENSIONS.underline.selectedBorderWidth}px solid transparent`,

                // Shift content up to compensate for thicker border
                marginBottom: isActive ? -1 : -1,
              }}
            >
              {/* Tab text */}
              <span
                style={{
                  fontFamily: TYPOGRAPHY.tab.fontFamily,
                  fontSize: TYPOGRAPHY.tab.fontSize,
                  fontWeight: TYPOGRAPHY.tab.fontWeight,
                  lineHeight: TYPOGRAPHY.tab.lineHeight,
                  color: isActive
                    ? TAB_COLORS.text.primary    // tabs-fg-primary → #E32321
                    : TAB_COLORS.text.secondary, // tabs-fg-secondary → #262626
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>

              {/* Badge icon: filled/Error-2, absolute top-right corner */}
              {item.showBadge && (
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    name="filled-Error-2"
                    size={TAB_DIMENSIONS.badgeSize}
                    customColor={TAB_COLORS.text.primary}
                  />
                </span>
              )}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════
//  Button Style Tabs
//  Figma: "horizontal-tabs_button"
// ═══════════════════════════════════════════
const ButtonTabs: React.FC<Omit<TabsProps, 'variant'>> = ({
  items,
  activeKey,
  onChange,
  colorScheme = 'red',
  className = '',
}) => {
  // Determine color scheme
  const isRed = colorScheme === 'red';
  const activeBg = isRed ? TAB_COLORS.bg.primary : TAB_COLORS.bg.secondary;
  const outerBorder = isRed ? TAB_COLORS.border.primary : TAB_COLORS.border.secondary;

  return (
    <div
      className={`ltp-tabs ltp-tabs--button ${className}`}
      role="tablist"
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'stretch',

        // Outer container: radius-lg, 1px border, white bg
        borderRadius: TAB_DIMENSIONS.button.outerRadius,
        border: `${TAB_DIMENSIONS.button.outerBorderWidth}px solid ${outerBorder}`,
        backgroundColor: TAB_COLORS.bg.white,
        overflow: 'hidden',

        // Gap between tab items: spacing-sm = 4px
        gap: TAB_DIMENSIONS.button.itemGap,

        height: TAB_DIMENSIONS.button.height,
      }}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <button
            key={item.key}
            type="button"
            className="ltp-tabs__item"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(item.key)}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,

              // Padding: 8/16/8/16 → spacing-lg / spacing-2xl
              paddingTop: 8,
              paddingRight: 16,
              paddingBottom: 8,
              paddingLeft: 16,

              gap: TAB_DIMENSIONS.button.item.gap, // spacing-lg = 8px

              // Active: colored bg + inner radius
              backgroundColor: isActive ? activeBg : 'transparent',
              borderRadius: isActive
                ? TAB_DIMENSIONS.button.item.activeRadius  // radius-md = 6
                : 0,
            }}
          >
            {/* Tab text */}
            <span
              style={{
                fontFamily: TYPOGRAPHY.tab.fontFamily,
                fontSize: TYPOGRAPHY.tab.fontSize,
                fontWeight: TYPOGRAPHY.tab.fontWeight,
                lineHeight: TYPOGRAPHY.tab.lineHeight,
                color: isActive
                  ? TAB_COLORS.text.white      // tabs-fg-white → #FFFFFF
                  : TAB_COLORS.text.secondary,  // tabs-fg-secondary → #262626
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>

            {/* Badge icon — absolute top-right corner (only on inactive tabs) */}
            {item.showBadge && !isActive && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name="filled-Error-2"
                  size={TAB_DIMENSIONS.badgeSize}
                  customColor={isRed ? TAB_COLORS.text.primary : TAB_COLORS.text.secondary}
                />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
