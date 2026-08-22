// ═══════════════════════════════════════════
// Shared token access — Lotteryplus Design System
//
// Components render with CSS custom properties from tokens.css; stories and tests read
// the resolved literal from tokens.generated.ts. Both come from the same generator, so a
// table can never claim a value the component does not actually render.
//
// Regenerate: python3 tools/gen-tokens.py
// Verify:     python3 tools/verify-tokens.py
// ═══════════════════════════════════════════

import { TOKEN_VALUES, type TokenName } from './tokens.generated';

export { TOKEN_VALUES, type TokenName };

const exists = (name: string): name is TokenName => name in TOKEN_VALUES;

/** `var(--name)`, with an optional fallback for tokens that are not always declared. */
export const cssVar = (name: string, fallback?: string): string =>
  fallback ? `var(${name}, ${fallback})` : `var(${name})`;

/** The literal a token resolves to, or '' when it is not declared. */
export const tokenValue = (name: string): string => (exists(name) ? TOKEN_VALUES[name] : '');

/** Semantic (Tier 1) token — e.g. `sys('spacing-2xl')` → `var(--sys-spacing-2xl)`. */
export const sys = (path: string): string => cssVar(`--sys-${path}`);

/** Literal behind a semantic token — e.g. `sysValue('spacing-2xl')` → `'16px'`. */
export const sysValue = (path: string): string => tokenValue(`--sys-${path}`);

/**
 * Bind a component's Tier 2 tokens to a prefix.
 *
 * `const t = component('toast')` then `t.ref('background-soft-green')` for the CSS
 * reference and `t.value(...)` for the literal. `t.names()` lists every token declared
 * for that component, which is what the token-chain stories enumerate.
 */
export const component = (prefix: string) => ({
  prefix,
  ref: (token: string, fallback?: string) => cssVar(`--${prefix}-${token}`, fallback),
  value: (token: string) => tokenValue(`--${prefix}-${token}`),
  names: (): string[] =>
    Object.keys(TOKEN_VALUES)
      .filter((n) => n.startsWith(`--${prefix}-`))
      .map((n) => n.slice(prefix.length + 3))
      .sort(),
});

export type ComponentTokens = ReturnType<typeof component>;
