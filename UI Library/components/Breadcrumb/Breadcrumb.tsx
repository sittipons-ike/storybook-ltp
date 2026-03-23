import React from 'react';
import {
  BREADCRUMB_COLORS,
  BREADCRUMB_DIMENSIONS,
  TYPOGRAPHY,
} from './tokens';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';

// ═══════════════════════════════════════════
//  Breadcrumb — Lotteryplus Design System
//  Figma component set: "breadcrumb" (14291:136385)
//  5 Variants: Step 1 through Step 5
//  Last item is always active/current page
//  Uses Icon component for item icons & separators
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
  /** Breadcrumb items (1-5). Last item is always the active/current page. */
  items: BreadcrumbItem[];
  /** Click handler for breadcrumb item (not called for active/last item) */
  onItemClick?: (key: string) => void;
  /** Additional className */
  className?: string;
}

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
        gap: BREADCRUMB_DIMENSIONS.containerGap, // spacing-2xl = 16px
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isActive = isLast;
        const showIcon = item.showIcon !== false;
        const showText = item.showText !== false;
        const iconName = item.icon || 'outline-Home';

        return (
          <React.Fragment key={item.key}>
            {/* Separator: arrow-right-S icon between items (not before first) */}
            {index > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon
                  name="arrow-right-S"
                  size={BREADCRUMB_DIMENSIONS.iconSize}
                  customColor={BREADCRUMB_COLORS.icon.separator}
                />
              </span>
            )}

            {/* Breadcrumb item */}
            <span
              role={isActive ? undefined : 'link'}
              tabIndex={isActive ? undefined : 0}
              aria-current={isActive ? 'page' : undefined}
              onClick={!isActive ? () => onItemClick?.(item.key) : undefined}
              onKeyDown={
                !isActive
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
                gap: BREADCRUMB_DIMENSIONS.itemGap, // spacing-lg = 8px
                cursor: isActive ? 'default' : 'pointer',
                flexShrink: 0,
              }}
            >
              {/* Item icon */}
              {showIcon && (
                <Icon
                  name={iconName}
                  size={BREADCRUMB_DIMENSIONS.iconSize}
                  customColor={
                    isActive
                      ? BREADCRUMB_COLORS.icon.active    // colors/icon/icon-fg-primary → #E32321
                      : BREADCRUMB_COLORS.icon.inactive   // colors/icon/icon-fg-secondary → #262626
                  }
                />
              )}

              {/* Item text */}
              {showText && (
                <span
                  style={{
                    fontFamily: isActive
                      ? TYPOGRAPHY.active.fontFamily
                      : TYPOGRAPHY.inactive.fontFamily,
                    fontSize: isActive
                      ? TYPOGRAPHY.active.fontSize
                      : TYPOGRAPHY.inactive.fontSize,
                    fontWeight: isActive
                      ? TYPOGRAPHY.active.fontWeight    // 600 Semibold
                      : TYPOGRAPHY.inactive.fontWeight,  // 400 Regular
                    lineHeight: isActive
                      ? TYPOGRAPHY.active.lineHeight
                      : TYPOGRAPHY.inactive.lineHeight,
                    color: isActive
                      ? BREADCRUMB_COLORS.text.active    // colors/breadcrumb/breadcrumb-fg-red → #E32321
                      : BREADCRUMB_COLORS.text.inactive,  // colors/breadcrumb/breadcrumb-fg-dark → #141414
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
