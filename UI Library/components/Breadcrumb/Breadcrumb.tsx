import React from 'react';
import '../../foundations/tokens.css';
import Icon, { type IconSize } from '../../icons/Icon';
import '../../icons/icon-data';
import {
  BREADCRUMB_BASE,
  BREADCRUMB_ICON_SIZE,
  BREADCRUMB_SEPARATOR_COLOR,
  breadcrumbColors,
  breadcrumbFontWeight,
  type BreadcrumbState,
} from './tokens';

// ═══════════════════════════════════════════
//  Breadcrumb — Lotteryplus Design System
//  Figma component set: "breadcrumb" (14291:136385)
//  5 variants: Step 1 through Step 5
//  The last crumb is the current page — canonical state `selected`.
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via design.md + components.json. There are no literal colours,
//  sizes or font values in this file.
// ═══════════════════════════════════════════

export interface BreadcrumbItem {
  /** Unique key for the breadcrumb item */
  key: string;
  /** Display label text */
  label: string;
  /** Icon name (defaults to "outline-Home") */
  icon?: string;
  /** Show icon for this item (default true) */
  showIcon?: boolean;
  /** Show text for this item (default true) */
  showText?: boolean;
}

export interface BreadcrumbProps {
  /** Breadcrumb items (1-5). The last item is the current page — state `selected`. */
  items: BreadcrumbItem[];
  /** Click handler for a breadcrumb item (not called for the `selected` item) */
  onItemClick?: (key: string) => void;
  /** Additional className */
  className?: string;
}

const ICON_SIZE = BREADCRUMB_ICON_SIZE as IconSize;

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onItemClick,
  className = '',
}) => {
  return (
    <nav
      className={`ltp-breadcrumb ${className}`}
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: BREADCRUMB_BASE.gap,
      }}
    >
      {items.map((item, index) => {
        // The last crumb is the current page: canonical state `selected`.
        const state: BreadcrumbState =
          index === items.length - 1 ? 'selected' : 'rest';
        const isSelected = state === 'selected';
        const colors = breadcrumbColors(state);
        const showIcon = item.showIcon !== false;
        const showText = item.showText !== false;
        const iconName = item.icon || 'outline-Home';

        return (
          <React.Fragment key={item.key}>
            {/* Separator: arrow-right-S chevron between crumbs (not before the first) */}
            {index > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: BREADCRUMB_SEPARATOR_COLOR,
                }}
              >
                <Icon name="arrow-right-S" size={ICON_SIZE} color="inherit" />
              </span>
            )}

            {/* Breadcrumb item */}
            <span
              className={`ltp-breadcrumb__item ltp-breadcrumb__item--${state}`}
              role={isSelected ? undefined : 'link'}
              tabIndex={isSelected ? undefined : 0}
              aria-current={isSelected ? 'page' : undefined}
              onClick={!isSelected ? () => onItemClick?.(item.key) : undefined}
              onKeyDown={
                !isSelected
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onItemClick?.(item.key);
                      }
                    }
                  : undefined
              }
              style={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: BREADCRUMB_BASE.itemGap,
                cursor: isSelected ? 'default' : 'pointer',
                flexShrink: 0,
              }}
            >
              {/* Item icon — inherits the wrapper's colour so the token stays a var */}
              {showIcon && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: colors.icon,
                  }}
                >
                  <Icon name={iconName} size={ICON_SIZE} color="inherit" />
                </span>
              )}

              {/* Item text — typography/label/md, regular at rest, semibold when selected */}
              {showText && (
                <span
                  style={{
                    fontFamily: BREADCRUMB_BASE.fontFamily,
                    fontSize: BREADCRUMB_BASE.fontSize,
                    fontWeight: breadcrumbFontWeight(
                      state,
                    ) as unknown as React.CSSProperties['fontWeight'],
                    lineHeight: BREADCRUMB_BASE.lineHeight,
                    letterSpacing: BREADCRUMB_BASE.tracking,
                    color: colors.text,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              )}
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
