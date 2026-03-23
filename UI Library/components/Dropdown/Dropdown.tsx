import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  DROPDOWN_COLORS,
  DROPDOWN_DIMENSIONS,
  DROPDOWN_STATE_MAP,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  SHADOW,
} from './tokens';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import './Dropdown.css';

// ═══════════════════════════════════════════
//  Dropdown — Lotteryplus Design System
//  Figma: "dropdown" component set (14291:131904)
//  States: Default | Hover | Active | Actived | Read Only | Complete | Error-Default | Error
//  Structure: Label → Field → Description (error)
// ═══════════════════════════════════════════

export type DropdownState =
  | 'default'
  | 'hover'
  | 'active'
  | 'actived'
  | 'readOnly'
  | 'complete'
  | 'errorDefault'
  | 'error';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  /** Label text (Figma default: "Field Name") */
  label?: string;
  /** Show label */
  showLabel?: boolean;
  /** Placeholder text (Figma default: "Place Holder") */
  placeholder?: string;
  /** Show required marker "(จำเป็น)" */
  required?: boolean;
  /** Options list */
  options?: DropdownOption[];
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Show error description */
  showDescription?: boolean;
  /** Description / error message text */
  description?: string;
  /** Visual state override (for Storybook demos) */
  state?: DropdownState;
  /** Read only mode */
  readOnly?: boolean;
  /** Complete state */
  complete?: boolean;
  /** Error message — triggers error state and shows description */
  error?: string;
  /** Additional className */
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label = 'Field Name',
  showLabel = true,
  placeholder = 'Place Holder',
  required = false,
  options = [],
  value,
  onChange,
  showDescription,
  description = 'Error Message',
  state: stateProp,
  readOnly = false,
  complete = false,
  error,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Determine the effective state
  const getEffectiveState = useCallback((): DropdownState => {
    if (stateProp) return stateProp;
    if (readOnly) return 'readOnly';
    if (error && value) return 'error';
    if (error) return 'errorDefault';
    if (complete) return 'complete';
    if (isOpen) return 'active';
    if (value && !isOpen) return 'actived';
    if (isHovered) return 'hover';
    return 'default';
  }, [stateProp, readOnly, error, complete, isOpen, value, isHovered]);

  const effectiveState = getEffectiveState();
  const stateConfig = DROPDOWN_STATE_MAP[effectiveState];

  // Selected option label
  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption ? selectedOption.label : '';
  const showPlaceholder = !selectedOption;

  // Whether to show description (error message area)
  const isDescriptionVisible = showDescription !== undefined
    ? showDescription
    : stateConfig.descVisible;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle field click
  const handleFieldClick = () => {
    if (readOnly || effectiveState === 'readOnly') return;
    setIsOpen((prev) => !prev);
  };

  // Handle option select
  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly || effectiveState === 'readOnly') return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen && hoveredIndex >= 0) {
        handleSelect(options[hoveredIndex].value);
      } else {
        setIsOpen((prev) => !prev);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      setHoveredIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      setHoveredIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Description text to display
  const descriptionText = error || description;

  return (
    <div
      ref={wrapperRef}
      className={`ltp-dropdown ${className}`}
      style={{
        // Auto Layout: VERTICAL, gap: spacing-sm = 4px
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.sm, // 4px
      }}
    >
      {/* ── Label Row ── */}
      {/* Figma: HORIZONTAL, paddingLeft:4 = spacing-sm, gap:4 = spacing-sm */}
      {showLabel && label && (
        <div
          className="ltp-dropdown__label"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: DROPDOWN_DIMENSIONS.wrapper.labelPaddingLeft, // spacing-sm = 4px
            gap: DROPDOWN_DIMENSIONS.wrapper.labelInternalGap,         // spacing-sm = 4px
          }}
        >
          {/* Label text: title/m-med → 14px/22px Medium, #262626 */}
          <span
            style={{
              fontFamily: TYPOGRAPHY.label.fontFamily,
              fontSize: TYPOGRAPHY.label.fontSize,
              fontWeight: TYPOGRAPHY.label.fontWeight,
              lineHeight: TYPOGRAPHY.label.lineHeight,
              color: DROPDOWN_COLORS.label.text,
            }}
          >
            {label}
          </span>

          {/* Required marker: label/m-med → 12px/18px Medium, #E32321 */}
          {required && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.required.fontFamily,
                fontSize: TYPOGRAPHY.required.fontSize,
                fontWeight: TYPOGRAPHY.required.fontWeight,
                lineHeight: TYPOGRAPHY.required.lineHeight,
                color: DROPDOWN_COLORS.label.required,
              }}
            >
              (จำเป็น)
            </span>
          )}
        </div>
      )}

      {/* ── Field ── */}
      {/* Figma: HORIZONTAL, padding: 10/8/10/16, gap:8, radius:8 */}
      <button
        type="button"
        className={`ltp-dropdown__field ${
          readOnly || effectiveState === 'readOnly' ? 'ltp-dropdown__field--readonly' : ''
        }`}
        onClick={handleFieldClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          // Padding: spacing-2lg(10) / spacing-lg(8) / spacing-2lg(10) / spacing-2xl(16)
          paddingTop: DROPDOWN_DIMENSIONS.field.paddingTop,       // 10px
          paddingRight: DROPDOWN_DIMENSIONS.field.paddingRight,   // 8px
          paddingBottom: DROPDOWN_DIMENSIONS.field.paddingBottom,  // 10px
          paddingLeft: DROPDOWN_DIMENSIONS.field.paddingLeft,     // 16px

          gap: DROPDOWN_DIMENSIONS.field.gap, // spacing-lg = 8px

          // Corner radius: radius-lg = 8px
          borderRadius: RADIUS.lg,

          // Background
          backgroundColor: stateConfig.bg,

          // Border: varies by state
          border: `${stateConfig.borderWidth}px solid ${stateConfig.border}`,

          // Cursor
          cursor: readOnly || effectiveState === 'readOnly' ? 'default' : 'pointer',

          // Transition
          transition: 'border-color 0.15s ease, background-color 0.15s ease',
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Text — placeholder or selected value */}
        <span
          style={{
            fontFamily: showPlaceholder
              ? TYPOGRAPHY.placeholder.fontFamily
              : TYPOGRAPHY.selectedText.fontFamily,
            fontSize: showPlaceholder
              ? TYPOGRAPHY.placeholder.fontSize
              : TYPOGRAPHY.selectedText.fontSize,
            fontWeight: showPlaceholder
              ? TYPOGRAPHY.placeholder.fontWeight
              : TYPOGRAPHY.selectedText.fontWeight,
            lineHeight: showPlaceholder
              ? TYPOGRAPHY.placeholder.lineHeight
              : TYPOGRAPHY.selectedText.lineHeight,
            color: stateConfig.textColor,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {showPlaceholder ? placeholder : displayText}
        </span>

        {/* Arrow icon: icons-size Size=24, name "arrow-down-S" */}
        <Icon
          name="arrow-down-S"
          size={24}
          customColor={stateConfig.iconColor}
        />
      </button>

      {/* ── Dropdown List (Active state) ── */}
      {/* Figma: "Tabs" frame — padding:8, gap:10, radius:8, border:1px #D4D4D4, shadow:sm */}
      {isOpen && (
        <ul
          className="ltp-dropdown__list"
          role="listbox"
          style={{
            top: '100%',
            marginTop: 4,

            // Container styling
            padding: DROPDOWN_DIMENSIONS.list.padding, // spacing-lg = 8px
            display: 'flex',
            flexDirection: 'column',
            gap: DROPDOWN_DIMENSIONS.list.gap, // spacing-2lg = 10px

            // Background & border
            backgroundColor: DROPDOWN_COLORS.option.bgDefault,   // #FFFFFF
            border: `${BORDER_WIDTH[1]}px solid ${DROPDOWN_COLORS.border.default}`, // 1px #D4D4D4
            borderRadius: RADIUS.lg, // radius-lg = 8px

            // Shadow: dimension/shadow/sm
            boxShadow: SHADOW.sm,
          }}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isItemHovered = hoveredIndex === index;

            // Determine option background
            let optionBg = DROPDOWN_COLORS.option.bgDefault;    // #FFFFFF
            if (isSelected) {
              optionBg = DROPDOWN_COLORS.option.bgSelected;      // #E32321
            } else if (isItemHovered) {
              optionBg = DROPDOWN_COLORS.option.bgHover;         // #E5E5E5
            }

            // Determine option text color
            const optionTextColor = isSelected
              ? DROPDOWN_COLORS.option.textSelected              // #FFFFFF
              : DROPDOWN_COLORS.option.textDefault;              // #262626

            // Typography: selected=Medium, normal=Regular
            const optionTypo = isSelected
              ? TYPOGRAPHY.optionSelected
              : TYPOGRAPHY.optionNormal;

            return (
              <li key={option.value} style={{ listStyle: 'none' }}>
                <button
                  type="button"
                  className="ltp-dropdown__option"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  style={{
                    // Padding: 4/16/4/16 = spacing-sm/spacing-2xl
                    paddingTop: DROPDOWN_DIMENSIONS.option.paddingTop,       // 4px
                    paddingRight: DROPDOWN_DIMENSIONS.option.paddingRight,   // 16px
                    paddingBottom: DROPDOWN_DIMENSIONS.option.paddingBottom, // 4px
                    paddingLeft: DROPDOWN_DIMENSIONS.option.paddingLeft,     // 16px

                    gap: DROPDOWN_DIMENSIONS.option.gap, // spacing-lg = 8px

                    // Radius: radius-lg = 8px
                    borderRadius: RADIUS.lg,

                    // Background
                    backgroundColor: optionBg,

                    // Text
                    fontFamily: optionTypo.fontFamily,
                    fontSize: optionTypo.fontSize,
                    fontWeight: optionTypo.fontWeight,
                    lineHeight: optionTypo.lineHeight,
                    color: optionTextColor,

                    // Transition
                    transition: 'background-color 0.1s ease',
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* ── Description (Error message) ── */}
      {/* Figma: visible in Error states only, paddingLeft:4 */}
      {/* caption/m-reg → 10px/16px Regular, color #E32321 */}
      {isDescriptionVisible && descriptionText && (
        <div
          className="ltp-dropdown__description"
          style={{
            display: 'flex',
            paddingLeft: DROPDOWN_DIMENSIONS.wrapper.descriptionPaddingLeft, // spacing-sm = 4px
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.error.fontFamily,
              fontSize: TYPOGRAPHY.error.fontSize,
              fontWeight: TYPOGRAPHY.error.fontWeight,
              lineHeight: TYPOGRAPHY.error.lineHeight,
              color: DROPDOWN_COLORS.fg.red,
            }}
          >
            {descriptionText}
          </span>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
