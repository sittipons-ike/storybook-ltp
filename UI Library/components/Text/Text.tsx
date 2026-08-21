import React from 'react';
import '../../foundations/tokens.css';

/**
 * The type roles, by name. A page says `role="body-md-regular"`, never a size and never a
 * `var(--sys-type-…)`.
 *
 * Every role in `semantic.typography` is spelled out rather than composed from parts,
 * because the set is closed: a role that is not on this list does not exist, and a page
 * asking for one should fail to compile rather than render at a size nobody designed.
 */
export type TextRole =
  | 'display-5xl-semibold' | 'display-4xl-semibold' | 'display-3xl-semibold'
  | 'display-2xl-semibold' | 'display-xl-semibold' | 'display-lg-semibold'
  | 'heading-h1-semibold' | 'heading-h2-semibold' | 'heading-h3-semibold'
  | 'heading-h3-medium' | 'heading-h4-semibold' | 'heading-h4-medium'
  | 'title-lg-semibold' | 'title-md-medium'
  | 'sub-title-lg-medium' | 'sub-title-md-regular'
  | 'body-xl-semibold' | 'body-xl-medium' | 'body-xl-regular'
  | 'body-lg-semibold' | 'body-lg-medium' | 'body-lg-regular'
  | 'body-md-semibold' | 'body-md-medium' | 'body-md-regular'
  | 'label-md-semibold' | 'label-md-medium' | 'label-md-regular'
  | 'button-md-semibold' | 'button-md-medium' | 'button-xs-medium'
  | 'caption-lg-regular' | 'caption-md-regular'
  | 'underline-md-medium' | 'underline-md-regular';

/** The text colours a page is allowed to name. */
export type TextTone =
  | 'primary' | 'secondary' | 'tertiary'
  | 'primary-darker' | 'secondary-darker' | 'tertiary-darker'
  | 'inverse' | 'on-bgcolor'
  | 'error' | 'warning' | 'success' | 'info' | 'disable';

const TONE_VAR: Record<TextTone, string> = {
  primary: '--sys-color-text-primary-default',
  secondary: '--sys-color-text-secondary-default',
  tertiary: '--sys-color-text-tertiary-default',
  'primary-darker': '--sys-color-text-primary-darker',
  'secondary-darker': '--sys-color-text-secondary-darker',
  'tertiary-darker': '--sys-color-text-tertiary-darker',
  inverse: '--sys-color-text-inverse',
  'on-bgcolor': '--sys-color-text-on-bgcolor',
  error: '--sys-color-text-state-error',
  warning: '--sys-color-text-state-warning',
  success: '--sys-color-text-state-success',
  info: '--sys-color-text-state-info',
  disable: '--sys-color-text-state-disable',
};

export interface TextProps {
  children?: React.ReactNode;
  role?: TextRole;
  tone?: TextTone;
  as?: 'span' | 'p' | 'div' | 'strong' | 'h1' | 'h2' | 'h3' | 'h4';
  /** Keep to one line and ellipsize. */
  truncate?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Text — Lotteryplus Design System
 *
 * Applies one typography role. Nothing else.
 *
 * The Frontend has the same component — `common/typography/seo`, 17 call sites — and the
 * inventory listed it as a strong candidate the library was missing. It matters more here
 * than there: the page tier may not touch a token, so without this a page can only reach
 * for a raw font-size, which is exactly the string a rename cannot find.
 *
 * Roles are responsive by construction. `body-md-regular` is 14/22 on a phone and 16/24 on
 * a desktop because the token underneath changes at the breakpoint — the page never learns
 * that this happened, which is the point.
 */
const Text: React.FC<TextProps> = ({
  children,
  role = 'body-md-regular',
  tone = 'secondary',
  as: Tag = 'span',
  truncate = false,
  align,
  className = '',
  style,
}) => (
  <Tag
    className={className}
    style={{
      margin: 0,
      fontFamily: `var(--sys-type-${role}-family)`,
      fontSize: `var(--sys-type-${role}-size)`,
      lineHeight: `var(--sys-type-${role}-line-height)`,
      fontWeight: `var(--sys-type-${role}-weight)` as unknown as React.CSSProperties['fontWeight'],
      letterSpacing: `var(--sys-type-${role}-tracking)`,
      color: `var(${TONE_VAR[tone]})`,
      textAlign: align,
      ...(truncate
        ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }
        : null),
      ...style,
    }}
  >
    {children}
  </Tag>
);

export default Text;
