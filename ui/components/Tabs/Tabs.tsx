import React from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data'; // register all icons
import '../../foundations/tokens.css';
import {
  TABS_BASE,
  TABS_BADGE_SIZE,
  TABS_COLORS,
  tabsScheme,
  type TabsVariant,
  type TabsColorScheme,
} from './tokens';
import { sys } from '../../foundations/tokens';
import './Tabs.css';

// ═══════════════════════════════════════════
//  Tabs — Lotteryplus Design System
//  Figma component sets:
//    - "horizontal-tabs-underline" (14370:9654)
//    - "horizontal-tabs_button" (14370:9710)
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via design.md + components.json + components/tabs.json. There
//  are no literal colours, sizes or font values in this file.
// ═══════════════════════════════════════════

export interface TabItem {
  /** Unique key for the tab */
  key: string;
  /** Display label */
  label: string;
  /** Show badge indicator (error icon) */
  showBadge?: boolean;
}

export type { TabsVariant, TabsColorScheme } from './tokens';

export interface TabsProps {
  /** Visual style variant */
  variant?: TabsVariant;
  /** Tab items (2-5 tabs) */
  items: TabItem[];
  /** Currently active tab key */
  activeKey: string;
  /** Tab change handler */
  onChange?: (key: string) => void;
  /** Colour scheme (button variant only). Figma spells these `red` / `black`. */
  colorScheme?: TabsColorScheme;
  /** Additional className */
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  variant = 'underline',
  items,
  activeKey,
  onChange,
  colorScheme = 'primary',
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

/** Label typography — typography/button/md/medium, shared by both variants. */
const labelStyle = (color: string): React.CSSProperties => ({
  fontFamily: TABS_BASE.fontFamily,
  fontSize: TABS_BASE.fontSize,
  fontWeight: TABS_BASE.fontWeight as unknown as React.CSSProperties['fontWeight'],
  lineHeight: TABS_BASE.lineHeight,
  letterSpacing: TABS_BASE.tracking,
  color,
  whiteSpace: 'nowrap',
});

/** Auto Layout: HORIZONTAL, CENTER / CENTER, fill container. */
const itemLayout: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  paddingTop: TABS_BASE.paddingY,
  paddingRight: TABS_BASE.paddingX,
  paddingBottom: TABS_BASE.paddingY,
  paddingLeft: TABS_BASE.paddingX,
  gap: TABS_BASE.gap,
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
}) => (
  <div
    className={`ltp-tabs ltp-tabs--underline ${className}`}
    role="tablist"
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // Bottom rule: colors/tabs/tabs-fg-disable. Figma strokes it INSIDE the 40px frame,
      // so the border must not add to the height.
      borderBottom: `${TABS_BASE.borderWidth} solid ${TABS_COLORS.rule}`,
      boxSizing: 'border-box',
    }}
  >
    {items.map((item, index) => {
      const isSelected = item.key === activeKey;

      return (
        <React.Fragment key={item.key}>
          {/* Divider between tabs (never before the first) — Figma "Line" node */}
          {index > 0 && (
            <div
              aria-hidden="true"
              style={{
                width: TABS_BASE.borderWidth,
                height: TABS_BASE.height,
                backgroundColor: TABS_COLORS.separator,
              }}
            />
          )}

          <button
            type="button"
            className="ltp-tabs__item"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange?.(item.key)}
            style={{
              ...itemLayout,
              height: TABS_BASE.height,

              // Selected draws the indicator; unselected reserves the same space.
              borderBottom: `${TABS_BASE.indicatorWidth} solid ${
                isSelected ? TABS_COLORS.indicator : 'transparent'
              }`,

              // Sit the indicator on top of the container's bottom rule.
              marginBottom: `calc(${TABS_BASE.borderWidth} * -1)`,
            }}
          >
            <span
              style={labelStyle(
                isSelected ? TABS_COLORS.labelSelectedUnderline : TABS_COLORS.labelRest,
              )}
            >
              {item.label}
            </span>

            {/* Badge — filled/Error-2, pinned to the top-right corner */}
            {item.showBadge && (
              <span
                style={{
                  position: 'absolute',
                  top: sys('spacing-xs'),
                  right: sys('spacing-sm'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name="filled-Error-2"
                  size={TABS_BADGE_SIZE as any}
                  customColor={TABS_COLORS.badgeUnderline}
                />
              </span>
            )}
          </button>
        </React.Fragment>
      );
    })}
  </div>
);

// ═══════════════════════════════════════════
//  Button Style Tabs
//  Figma: "horizontal-tabs_button"
// ═══════════════════════════════════════════
const ButtonTabs: React.FC<Omit<TabsProps, 'variant'>> = ({
  items,
  activeKey,
  onChange,
  colorScheme = 'primary',
  className = '',
}) => {
  const scheme = tabsScheme(colorScheme);

  return (
    <div
      className={`ltp-tabs ltp-tabs--button ${className}`}
      role="tablist"
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'stretch',

        borderRadius: TABS_BASE.radius,
        border: `${TABS_BASE.borderWidth} solid ${scheme.accent}`,
        backgroundColor: TABS_COLORS.surface,
        overflow: 'hidden',

        gap: TABS_BASE.itemGap,
        height: TABS_BASE.height,
      }}
    >
      {items.map((item) => {
        const isSelected = item.key === activeKey;

        return (
          <button
            key={item.key}
            type="button"
            className="ltp-tabs__item"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange?.(item.key)}
            style={{
              ...itemLayout,
              backgroundColor: isSelected ? scheme.background : 'transparent',
              borderRadius: isSelected ? TABS_BASE.radiusActive : sys('radius-none'),
            }}
          >
            <span
              style={labelStyle(
                isSelected ? TABS_COLORS.labelSelectedButton : TABS_COLORS.labelRest,
              )}
            >
              {item.label}
            </span>

            {/* Badge — pinned to the top-right corner, unselected tabs only */}
            {item.showBadge && !isSelected && (
              <span
                style={{
                  position: 'absolute',
                  top: sys('spacing-none'),
                  right: sys('spacing-xs'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name="filled-Error-2"
                  size={TABS_BADGE_SIZE as any}
                  customColor={scheme.accent}
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
