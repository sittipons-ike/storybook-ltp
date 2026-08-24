import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import NumberSearchBox from './NumberSearchBox';
import MenuButton from './MenuButton';
import SetSelect from './SetSelect';
import SearchCard from './SearchCard';
import {
  lottoBoardValue,
  lottoBoardTokenNames,
  lottoBoardTextValues,
  LOTTO_BOARD_TEXT_ROLES,
  NUMBER_SEARCH_BOX_VARIANTS,
  MENU_BUTTON_TYPES,
  SET_SELECT_STATES,
  type MenuButtonType,
} from './tokens';
import { sysValue } from '../../foundations/tokens';
import ColorBindingsTable from '../../system/ColorBindingsTable';
import '../../foundations/tokens.css';

// ═══════════════════════════════════════════
//  LottoBoard Stories — Lotteryplus Design System
//  Sub-components: NumberSearchBox, MenuButton, SetSelect, SearchCard
//
//  Values shown on this page are read from foundations/tokens.generated.ts, which is
//  generated from Figma. Nothing here is typed by hand, so a table can never claim a
//  value the components do not actually render.
// ═══════════════════════════════════════════

const sans = 'var(--lotto-board-typography-title-family)';
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const muted = 'var(--sys-color-text-tertiary-default)';

/** Small caption used to label demo blocks — token-driven, no literals. */
const note: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 'var(--sys-type-caption-lg-regular-size)',
  lineHeight: 'var(--sys-type-caption-lg-regular-line-height)',
  color: muted,
  margin: 0,
};

// ─────────────────────────────────────────
//  NumberSearchBox Stories
// ─────────────────────────────────────────
const numberSearchBoxMeta: Meta<typeof NumberSearchBox> = {
  title: 'Components/Commerce/LottoBoard/NumberSearchBox',
  component: NumberSearchBox,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '6-digit string, e.g. "123456"',
    },
    variant: {
      control: 'select',
      options: NUMBER_SEARCH_BOX_VARIANTS,
      description: 'Figma variant — which cells read as selected when there is no value',
    },
    disabled: {
      control: 'boolean',
      description: 'Canonical state: disabled',
    },
  },
  args: {
    value: '',
    variant: 'Empty',
    disabled: false,
  },
  parameters: {
    layout: 'centered',
    docs: { source: { type: 'code' } },
  },
};

export default numberSearchBoxMeta;
type NumberSearchBoxStory = StoryObj<typeof NumberSearchBox>;

export const NumberSearchBoxDefault: NumberSearchBoxStory = {
  name: 'NumberSearchBox — Empty',
};

export const NumberSearchBoxFilled: NumberSearchBoxStory = {
  name: 'NumberSearchBox — Filled (6 digits)',
  args: { value: '123456' },
};

export const NumberSearchBoxPartial: NumberSearchBoxStory = {
  name: 'NumberSearchBox — Partial (3 digits)',
  args: { value: '789' },
};

export const NumberSearchBoxVariants: NumberSearchBoxStory = {
  name: 'NumberSearchBox — All Figma Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: sans }}>
      {NUMBER_SEARCH_BOX_VARIANTS.map((variant) => (
        <div key={variant}>
          <p style={{ ...note, marginBottom: 4, paddingLeft: 'var(--lotto-board-row-padding-x)' }}>
            Variant = {variant}
          </p>
          <NumberSearchBox variant={variant} />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
};

const NumberSearchBoxInteractiveComponent = () => {
  const [val, setVal] = useState('');
  return (
    <div style={{ fontFamily: sans }}>
      <p style={{ ...note, marginBottom: 8 }}>Click a cell and type digits. Backspace to delete.</p>
      <NumberSearchBox value={val} onChange={setVal} />
      <p style={{ ...note, marginTop: 8 }}>
        Current value: <code style={{ fontFamily: mono }}>{val || '(empty)'}</code>
      </p>
    </div>
  );
};

export const NumberSearchBoxInteractive: NumberSearchBoxStory = {
  name: 'NumberSearchBox — Interactive',
  render: () => <NumberSearchBoxInteractiveComponent />,
};

// ─────────────────────────────────────────
//  MenuButton Stories
// ─────────────────────────────────────────
export const MenuButtonAllTypes: NumberSearchBoxStory = {
  name: 'MenuButton — All Variants',
  render: () => {
    const MenuButtonDemo = () => {
      const [active, setActive] = useState<MenuButtonType>('All');
      return (
        <div style={{ fontFamily: sans }}>
          <MenuButton activeType={active} onTypeChange={setActive} />
          <p style={{ ...note, marginTop: 8, paddingLeft: 'var(--lotto-board-menu-padding-x)' }}>
            Selected: <code style={{ fontFamily: mono }}>{active}</code>
          </p>
        </div>
      );
    };
    return <MenuButtonDemo />;
  },
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

export const MenuButtonStates: NumberSearchBoxStory = {
  name: 'MenuButton — Each State',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: sans }}>
      {MENU_BUTTON_TYPES.map((type) => (
        <div key={type}>
          <p style={{ ...note, marginBottom: 4, paddingLeft: 'var(--lotto-board-menu-padding-x)' }}>
            Type = {type}
          </p>
          <MenuButton activeType={type} />
        </div>
      ))}
      <div>
        <p style={{ ...note, marginBottom: 4, paddingLeft: 'var(--lotto-board-menu-padding-x)' }}>
          State = disabled
        </p>
        <MenuButton activeType="All" disabled />
      </div>
    </div>
  ),
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

// ─────────────────────────────────────────
//  SetSelect Stories
// ─────────────────────────────────────────
export const SetSelectDefault: NumberSearchBoxStory = {
  name: 'SetSelect — Default',
  render: () => {
    const SetSelectDemo = () => {
      const [qty, setQty] = useState(1);
      return (
        <div style={{ fontFamily: sans, width: 360 }}>
          <SetSelect quantity={qty} onQuantityChange={setQty} />
          <p style={{ ...note, marginTop: 8, paddingLeft: 'var(--lotto-board-set-padding-x)' }}>
            Quantity: <code style={{ fontFamily: mono }}>{qty}</code>
          </p>
        </div>
      );
    };
    return <SetSelectDemo />;
  },
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

export const SetSelectStates: NumberSearchBoxStory = {
  name: 'SetSelect — Canonical States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360, fontFamily: sans }}>
      <p style={{ ...note }}>
        States use the canonical names from the Design System Standard:{' '}
        <code style={{ fontFamily: mono }}>{SET_SELECT_STATES.join(' · ')}</code>. Figma still
        calls them Default / Active / Actived — that rename is queued in figma-rename-map.md.
      </p>
      {SET_SELECT_STATES.map((state) => (
        <div key={state}>
          <p style={{ ...note, marginBottom: 4, paddingLeft: 'var(--lotto-board-set-padding-x)' }}>
            State = {state}
          </p>
          <SetSelect quantity={2} state={state} />
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
};

export const SetSelectDisabled: NumberSearchBoxStory = {
  name: 'SetSelect — Disabled',
  render: () => (
    <div style={{ fontFamily: sans, width: 360 }}>
      <SetSelect quantity={3} disabled />
    </div>
  ),
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

// ─────────────────────────────────────────
//  SearchCard Stories
// ─────────────────────────────────────────
export const SearchCardAll: NumberSearchBoxStory = {
  name: 'SearchCard — Type: All',
  render: () => (
    <div style={{ width: 390, fontFamily: sans }}>
      <SearchCard type="All" />
    </div>
  ),
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

export const SearchCardSingle: NumberSearchBoxStory = {
  name: 'SearchCard — Type: Single',
  render: () => (
    <div style={{ width: 390, fontFamily: sans }}>
      <SearchCard type="Single" />
    </div>
  ),
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

export const SearchCardSet: NumberSearchBoxStory = {
  name: 'SearchCard — Type: Set',
  render: () => (
    <div style={{ width: 390, fontFamily: sans }}>
      <SearchCard type="Set" />
    </div>
  ),
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

export const SearchCardInteractive: NumberSearchBoxStory = {
  name: 'SearchCard — Interactive',
  render: () => {
    const SearchCardDemo = () => {
      const [log, setLog] = useState<string[]>([]);
      const addLog = (msg: string) => setLog((prev) => [...prev.slice(-4), msg]);
      return (
        <div style={{ fontFamily: sans }}>
          <div style={{ width: 390 }}>
            <SearchCard
              type="Set"
              onSearch={(d) => addLog(`Search: "${d}"`)}
              onRandom={() => addLog('Random clicked')}
              onClear={() => addLog('Cleared')}
            />
          </div>
          {log.length > 0 && (
            <div
              style={{ ...note, marginTop: 16, paddingLeft: 'var(--lotto-board-card-padding-x)' }}
            >
              <strong>Event log:</strong>
              {log.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          )}
        </div>
      );
    };
    return <SearchCardDemo />;
  },
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

// ═══════════════════════════════════════════
//  Token Verification — the Tier 2 → Tier 1 chain
//
//  Both columns are read from the generated tokens, so this table cannot drift: if the
//  overlay ref and the semantic token stop agreeing, the row fails on its own.
// ═══════════════════════════════════════════

/** [component token, the --sys-* token its overlay ref points at, or null when fixed] */
const LAYOUT_CHAIN: Array<[string, string | null]> = [
  ['cell-gap', 'spacing-lg'],
  ['cell-padding', 'spacing-lg'],
  ['cell-radius', 'radius-lg'],
  ['cell-border-width', 'border-width-hairline'],
  ['cell-shadow', 'elevation-card'],
  ['cell-width', null],
  ['cell-height', null],
  ['row-padding-x', 'spacing-2xl'],

  ['menu-gap', 'spacing-lg'],
  ['menu-padding-x', 'spacing-2xl'],
  ['menu-item-padding-x', 'spacing-2xl'],
  ['menu-item-radius', 'radius-lg'],
  ['menu-item-border-width', 'border-width-hairline'],
  ['menu-item-width', null],
  ['menu-item-height', null],

  ['set-gap', 'spacing-sm'],
  ['set-padding-x', 'spacing-2xl'],
  ['set-row-gap', 'spacing-2xl'],
  ['set-image-radius', 'radius-lg'],
  ['set-image-width', null],
  ['set-image-height', null],
  ['set-stepper-radius', 'radius-lg'],
  ['set-stepper-padding', 'spacing-xl'],
  ['set-stepper-border-width', 'border-width-hairline'],
  ['set-stepper-size', null],
  ['set-quantity-padding-x', 'spacing-2xl'],
  ['set-quantity-min-width', null],
  ['set-icon-size', null],

  ['card-gap', 'spacing-2xl'],
  ['card-padding-x', 'spacing-2xl'],
  ['card-header-gap', 'spacing-sm'],
  ['card-actions-gap', 'spacing-lg'],
  ['card-max-width', null],

  ['opacity-disabled', null],
  ['opacity-limit-reached', null],
];

/** Text role → the semantic typography role it refs. `null` = no role backs it. */
const TEXT_ROLE_CHAIN: Record<string, string | null> = {
  title: 'title-lg-semibold',
  menu: 'button-md-semibold',
  link: 'underline-md-medium',
  caption: 'label-md-medium',
  number: null,
};

/** `number` borrows family + tracking from this role; every role shares both. */
const NUMBER_SHARED_ROLE = 'body-xl-semibold';

/** Colour token → the semantic colour it refs (as generated into components.json). */
const COLOUR_CHAIN: Array<[string, string, string]> = [
  ['background-white', 'color-background-default', 'Card / cell background'],
  ['background-red', 'color-primary-default', 'Selected menu-button fill'],
  ['background-dark', 'color-secondary-default', 'Stepper plus button fill'],
  ['background-gray', 'color-secondary-light', 'Lottery thumbnail placeholder'],
  ['background-soft-gray', 'color-tertiary-accent-xs', 'Soft surface (available, unused today)'],
  ['background-dark-gray', 'color-tertiary-accent-md', 'Strong surface (available, unused today)'],
  ['foreground-white', 'color-foreground-white', 'Text on red / dark fills'],
  ['foreground-dark', 'color-secondary-default', 'Digit, label and quantity text'],
  ['foreground-red', 'color-primary-default', 'Heading, clear link, selected cell border'],
  ['foreground-gray', 'color-tertiary-default', 'Muted text (available, unused today)'],
  ['foreground-dark-gray', 'color-tertiary-accent-lg', 'Strong muted text (available, unused today)'],
  ['foreground-disable', 'color-secondary-light', 'Disabled text (available, unused today)'],
  ['border', 'color-border-accent-gray-light', 'Cell and stepper hairline'],
];

const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 600,
  color: muted,
  borderBottom: '2px solid var(--sys-color-border-accent-gray-soft-light)',
};

const td: React.CSSProperties = {
  padding: '6px 12px',
  borderBottom: '1px solid var(--sys-color-background-light)',
  fontFamily: mono,
  fontSize: 11,
};

const ChainRow: React.FC<{ token: string; sysToken: string | null }> = ({ token, sysToken }) => {
  const tier2 = lottoBoardValue(token);
  const tier1 = sysToken ? sysValue(sysToken) : '';
  const status = sysToken === null ? '📌' : tier1 && tier1 === tier2 ? '✅' : '❌';
  return (
    <tr>
      <td style={{ ...td, color: 'var(--sys-color-primary-default)' }}>--lotto-board-{token}</td>
      <td style={{ ...td, color: 'var(--sys-color-status-info-default)' }}>
        {sysToken ? `--sys-${sysToken}` : '(fixed — no semantic token)'}
      </td>
      <td style={{ ...td, color: 'var(--sys-color-status-success-dark)' }}>{tier2}</td>
      <td style={{ ...td, fontSize: 14 }}>{status}</td>
    </tr>
  );
};

export const TokenVerification: NumberSearchBoxStory = {
  name: '🔍 Token Verification',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 940 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>LottoBoard token chain</h2>
      <p style={{ ...note, marginBottom: 20, lineHeight: 1.6 }}>
        Every value flows Figma → design.md + components/lotto-board.json → components.json →
        tokens.css. The components render the Tier 2 alias; the alias points at a Tier 1
        semantic token; that resolves to the literal below. Both columns are read from the
        generated tokens, so nothing here is hand-typed. 📌 marks a fixed pixel dimension that
        no semantic token backs — each one is justified in components/lotto-board.json.
      </p>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Layout &amp; sizing</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
        <thead>
          <tr>
            <th style={th}>Tier 2 — component</th>
            <th style={th}>Tier 1 — semantic</th>
            <th style={th}>Value</th>
            <th style={th}>Match</th>
          </tr>
        </thead>
        <tbody>
          {LAYOUT_CHAIN.map(([token, sysToken]) => (
            <ChainRow key={token} token={token} sysToken={sysToken} />
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Typography</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
        <thead>
          <tr>
            <th style={th}>Tier 2 — component</th>
            <th style={th}>Tier 1 — semantic</th>
            <th style={th}>Value</th>
            <th style={th}>Match</th>
          </tr>
        </thead>
        <tbody>
          {LOTTO_BOARD_TEXT_ROLES.flatMap((role) =>
            (['family', 'size', 'line-height', 'weight', 'tracking'] as const).map((prop) => {
              const semantic = TEXT_ROLE_CHAIN[role] ?? NUMBER_SHARED_ROLE;
              // `number` only refs the two props every role shares; its size, line-height
              // and weight are literals, justified in components/lotto-board.json.
              const backed =
                role === 'number' && prop !== 'family' && prop !== 'tracking'
                  ? null
                  : `type-${semantic}-${prop}`;
              return (
                <ChainRow
                  key={`${role}-${prop}`}
                  token={`typography-${role}-${prop}`}
                  sysToken={backed}
                />
              );
            }),
          )}
        </tbody>
      </table>

      <h3 style={{ fontSize: 14, margin: '0 0 8px' }}>Colours</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Tier 2 — component</th>
            <th style={th}>Tier 1 — semantic</th>
            <th style={th}>Value</th>
            <th style={th}>Match</th>
          </tr>
        </thead>
        <tbody>
          {COLOUR_CHAIN.map(([token, sysToken]) => (
            <ChainRow key={token} token={token} sysToken={sysToken} />
          ))}
        </tbody>
      </table>

      <p style={{ ...note, marginTop: 20 }}>
        {lottoBoardTokenNames().length} tokens declared under the{' '}
        <code style={{ fontFamily: mono }}>--lotto-board-*</code> prefix.
      </p>
    </div>
  ),
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
};

// ═══════════════════════════════════════════
//  Text roles — what each role resolves to
// ═══════════════════════════════════════════
export const TextRoles: StoryObj = {
  name: 'Text Roles',
  render: () => (
    <div style={{ fontFamily: sans, maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ ...note, lineHeight: 1.6 }}>
        Five text roles. Four map onto a semantic typography role; <code style={{ fontFamily: mono }}>number</code>{' '}
        does not — 24px/32px Bold has no equivalent in design.md, so only its family and
        tracking are refs.
      </p>
      {LOTTO_BOARD_TEXT_ROLES.map((role) => {
        const v = lottoBoardTextValues(role);
        return (
          <div key={role}>
            <div style={{ ...note, marginBottom: 4 }}>
              <code style={{ fontFamily: mono }}>{role}</code> — {v.size} / {v.lineHeight} /{' '}
              {v.weight}
            </div>
            <div
              style={{
                fontFamily: `var(--lotto-board-typography-${role}-family)`,
                fontSize: `var(--lotto-board-typography-${role}-size)`,
                fontWeight: `var(--lotto-board-typography-${role}-weight)` as never,
                lineHeight: `var(--lotto-board-typography-${role}-line-height)`,
                letterSpacing: `var(--lotto-board-typography-${role}-tracking)`,
                color: 'var(--lotto-board-foreground-dark)',
              }}
            >
              ค้นหาเลขเด็ด 123456
            </div>
          </div>
        );
      })}
    </div>
  ),
  parameters: { layout: 'padded' },
};

// ── Color Bindings ──
export const ColorBindings: StoryObj = {
  name: 'Color Bindings',
  render: () => (
    <ColorBindingsTable
      componentName="LottoBoard"
      figmaId="colors/lotto-board"
      bindings={COLOUR_CHAIN.map(([token, , usage]) => ({
        token: `--lotto-board-${token}`,
        figmaVariable: `colors/lotto-board/lotto-board-${token
          .replace(/^background-/, 'bg-')
          .replace(/^foreground-/, 'fg-')}`,
        hex: lottoBoardValue(token),
        usage,
      }))}
    />
  ),
};
