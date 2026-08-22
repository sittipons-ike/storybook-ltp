import React, { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '../../icons/Icon';
import '../../icons/icon-data';
import '../../foundations/tokens.css';
import {
  DROPDOWN,
  DROPDOWN_LIST,
  DROPDOWN_TEXT,
  dropdownDescriptionVisible,
  dropdownField,
  dropdownIconSize,
  dropdownOption,
  dropdownTypography,
  type DropdownState,
  type DropdownStatus,
} from './tokens';
import './Dropdown.css';

// ═══════════════════════════════════════════
//  Dropdown — Lotteryplus Design System
//  Figma: "dropdown" component set (14291:131904)
//
//  Figma models eight flat states; they decompose onto two canonical axes —
//  interaction state (rest | hover | active | focus | disabled | selected) and
//  validation status (default | complete | error). See DROPDOWN_FIGMA_STATES.
//
//  Every style value is a CSS custom property from foundations/tokens.css, which is
//  generated from Figma via design.md + components.json. There are no literal colours,
//  sizes or font values in this file.
// ═══════════════════════════════════════════

export type { DropdownState, DropdownStatus } from './tokens';

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
  /** Interaction-state override (for Storybook demos) */
  state?: DropdownState;
  /** Validation-status override (for Storybook demos) */
  status?: DropdownStatus;
  /** Read only — renders the canonical `disabled` state */
  readOnly?: boolean;
  /** Complete — renders the canonical `complete` status */
  complete?: boolean;
  /** Error message — triggers the `error` status and shows the description */
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
  status: statusProp,
  readOnly = false,
  complete = false,
  error,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Canonical state precedence: disabled beats active beats focus beats selected
  // beats hover.
  const resolvedState = useCallback((): DropdownState => {
    if (stateProp) return stateProp;
    if (readOnly) return 'disabled';
    if (isOpen) return 'active';
    if (isFocused) return 'focus';
    if (value) return 'selected';
    if (isHovered) return 'hover';
    return 'rest';
  }, [stateProp, readOnly, isOpen, isFocused, value, isHovered]);

  const resolvedStatus = useCallback((): DropdownStatus => {
    if (statusProp) return statusProp;
    if (error) return 'error';
    if (complete) return 'complete';
    return 'default';
  }, [statusProp, error, complete]);

  const state = resolvedState();
  const status = resolvedStatus();
  const isDisabled = state === 'disabled';

  const field = dropdownField(state, status);
  const iconSize = dropdownIconSize();

  // Selected option label
  const selectedOption = options.find((o) => o.value === value);
  const displayText = selectedOption ? selectedOption.label : '';
  const showPlaceholder = !selectedOption;

  // Whether to show description (error message area)
  const isDescriptionVisible =
    showDescription !== undefined ? showDescription : dropdownDescriptionVisible(status);

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
    if (isDisabled) return;
    setIsOpen((prev) => !prev);
  };

  // Handle option select
  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return;

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

  const labelType = dropdownTypography('label');
  const requiredType = dropdownTypography('required');
  const valueType = dropdownTypography('value');
  const descriptionType = dropdownTypography('description');

  // React types fontWeight as a literal union; every weight here is a CSS var.
  const weight = (w: string) => w as unknown as React.CSSProperties['fontWeight'];

  return (
    <div
      ref={wrapperRef}
      className={`ltp-dropdown ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: DROPDOWN.wrapperGap,
      }}
    >
      {/* ── Label row ── */}
      {showLabel && label && (
        <div
          className="ltp-dropdown__label"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: DROPDOWN.labelPaddingLeft,
            gap: DROPDOWN.labelGap,
          }}
        >
          <span
            style={{
              fontFamily: labelType.fontFamily,
              fontSize: labelType.fontSize,
              fontWeight: weight(labelType.fontWeight),
              lineHeight: labelType.lineHeight,
              letterSpacing: labelType.letterSpacing,
              color: DROPDOWN_TEXT.label,
            }}
          >
            {label}
          </span>

          {required && (
            <span
              style={{
                fontFamily: requiredType.fontFamily,
                fontSize: requiredType.fontSize,
                fontWeight: weight(requiredType.fontWeight),
                lineHeight: requiredType.lineHeight,
                letterSpacing: requiredType.letterSpacing,
                color: DROPDOWN_TEXT.required,
              }}
            >
              (จำเป็น)
            </span>
          )}
        </div>
      )}

      {/* ── Field ── */}
      <button
        type="button"
        className={`ltp-dropdown__field ${isDisabled ? 'ltp-dropdown__field--readonly' : ''}`}
        onClick={handleFieldClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          paddingTop: DROPDOWN.fieldPaddingY,
          paddingRight: DROPDOWN.fieldPaddingRight,
          paddingBottom: DROPDOWN.fieldPaddingY,
          paddingLeft: DROPDOWN.fieldPaddingLeft,

          gap: DROPDOWN.fieldGap,
          borderRadius: DROPDOWN.radius,
          backgroundColor: field.background,
          border: `${field.borderWidth} solid ${field.border}`,

          // Focus ring — --dropdown-ring-active, brand red at 40%.
          boxShadow: field.ring
            ? `0 0 0 ${DROPDOWN.borderWidthActive} ${field.ring}`
            : 'none',

          cursor: isDisabled ? 'default' : 'pointer',
          transition: 'border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease',
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={isDisabled}
      >
        {/* Text — placeholder or selected value */}
        <span
          style={{
            fontFamily: valueType.fontFamily,
            fontSize: valueType.fontSize,
            fontWeight: weight(valueType.fontWeight),
            lineHeight: valueType.lineHeight,
            letterSpacing: valueType.letterSpacing,
            color: field.foreground,
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {showPlaceholder ? placeholder : displayText}
        </span>

        <Icon name="arrow-down-S" size={iconSize} customColor={field.icon} />
      </button>

      {/* ── Open list ── */}
      {isOpen && (
        <ul
          className="ltp-dropdown__list"
          role="listbox"
          style={{
            top: '100%',
            marginTop: DROPDOWN.listOffset,

            padding: DROPDOWN.listPadding,
            display: 'flex',
            flexDirection: 'column',
            gap: DROPDOWN.listGap,

            backgroundColor: DROPDOWN_LIST.background,
            border: `${DROPDOWN.borderWidth} solid ${DROPDOWN_LIST.border}`,
            borderRadius: DROPDOWN.radius,
            boxShadow: DROPDOWN.elevation,
          }}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isItemHovered = hoveredIndex === index;
            const optionColors = dropdownOption(isSelected, isItemHovered);
            const optionType = dropdownTypography(
              isSelected ? 'option-selected' : 'option',
            );

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
                    paddingTop: DROPDOWN.optionPaddingY,
                    paddingRight: DROPDOWN.optionPaddingX,
                    paddingBottom: DROPDOWN.optionPaddingY,
                    paddingLeft: DROPDOWN.optionPaddingX,

                    gap: DROPDOWN.optionGap,
                    borderRadius: DROPDOWN.radius,
                    backgroundColor: optionColors.background,

                    fontFamily: optionType.fontFamily,
                    fontSize: optionType.fontSize,
                    fontWeight: weight(optionType.fontWeight),
                    lineHeight: optionType.lineHeight,
                    letterSpacing: optionType.letterSpacing,
                    color: optionColors.foreground,

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

      {/* ── Description (error message) ── */}
      {isDescriptionVisible && descriptionText && (
        <div
          className="ltp-dropdown__description"
          style={{
            display: 'flex',
            paddingLeft: DROPDOWN.descriptionPaddingLeft,
          }}
        >
          <span
            style={{
              fontFamily: descriptionType.fontFamily,
              fontSize: descriptionType.fontSize,
              fontWeight: weight(descriptionType.fontWeight),
              lineHeight: descriptionType.lineHeight,
              letterSpacing: descriptionType.letterSpacing,
              color: DROPDOWN_TEXT.description,
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
