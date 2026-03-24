import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import NumberSearchBox from './NumberSearchBox';
import MenuButton from './MenuButton';
import SetSelect from './SetSelect';
import SearchCard from './SearchCard';
import {
  SPACING,
  RADIUS,
  BORDER_WIDTH,
  SHADOW,
  TYPOGRAPHY,
  LOTTO_BOARD_COLORS,
  BUTTON_COLORS,
  NUMBER_BOX,
  MENU_BUTTON,
  SET_SELECT,
  SEARCH_CARD,
} from './tokens';
import type { MenuButtonType } from './tokens';

// ═══════════════════════════════════════════
//  LottoBoard Stories — Lotteryplus Design System
//  Sub-components: NumberSearchBox, MenuButton, SetSelect, SearchCard
// ═══════════════════════════════════════════

// ─────────────────────────────────────────
//  NumberSearchBox Stories
// ─────────────────────────────────────────
const numberSearchBoxMeta: Meta<typeof NumberSearchBox> = {
  title: 'Components/LottoBoard/NumberSearchBox',
  component: NumberSearchBox,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '6-digit string, e.g. "123456"',
    },
    variant: {
      control: 'select',
      options: ['Empty', '6', 'Front 3', 'Back 3', 'Back 2', '1'],
      description: 'Figma variant',
    },
    disabled: {
      control: 'boolean',
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

const NumberSearchBoxInteractiveComponent = () => {
  const [val, setVal] = useState('');
  return (
    <div style={{ fontFamily: TYPOGRAPHY.fontFamily }}>
      <p style={{ fontSize: 13, color: '#737373', marginBottom: 8 }}>
        Click a box and type digits. Backspace to delete.
      </p>
      <NumberSearchBox value={val} onChange={setVal} />
      <p style={{ fontSize: 12, color: '#737373', marginTop: 8 }}>
        Current value: <code>{val || '(empty)'}</code>
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
        <div style={{ fontFamily: TYPOGRAPHY.fontFamily }}>
          <MenuButton activeType={active} onTypeChange={setActive} />
          <p style={{ fontSize: 12, color: '#737373', marginTop: 8, paddingLeft: SPACING['2xl'] }}>
            Active: <code>{active}</code>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: TYPOGRAPHY.fontFamily }}>
      {(['All', 'Single', 'Set'] as const).map((type) => (
        <div key={type}>
          <p style={{ fontSize: 12, color: '#737373', margin: '0 0 4px', paddingLeft: SPACING['2xl'] }}>
            Type = {type}
          </p>
          <MenuButton activeType={type} />
        </div>
      ))}
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
        <div style={{ fontFamily: TYPOGRAPHY.fontFamily, width: 360 }}>
          <SetSelect quantity={qty} onQuantityChange={setQty} />
          <p style={{ fontSize: 12, color: '#737373', marginTop: 8, paddingLeft: SPACING['2xl'] }}>
            Quantity: <code>{qty}</code>
          </p>
        </div>
      );
    };
    return <SetSelectDemo />;
  },
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

export const SetSelectDisabled: NumberSearchBoxStory = {
  name: 'SetSelect — Disabled',
  render: () => (
    <div style={{ fontFamily: TYPOGRAPHY.fontFamily, width: 360 }}>
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
    <div style={{ width: 390, fontFamily: TYPOGRAPHY.fontFamily }}>
      <SearchCard type="All" />
    </div>
  ),
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

export const SearchCardSingle: NumberSearchBoxStory = {
  name: 'SearchCard — Type: Single',
  render: () => (
    <div style={{ width: 390, fontFamily: TYPOGRAPHY.fontFamily }}>
      <SearchCard type="Single" />
    </div>
  ),
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
};

export const SearchCardSet: NumberSearchBoxStory = {
  name: 'SearchCard — Type: Set',
  render: () => (
    <div style={{ width: 390, fontFamily: TYPOGRAPHY.fontFamily }}>
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
        <div style={{ fontFamily: TYPOGRAPHY.fontFamily }}>
          <div style={{ width: 390 }}>
            <SearchCard
              type="Set"
              onSearch={(d) => addLog(`Search: "${d}"`)}
              onRandom={() => addLog('Random clicked')}
              onClear={() => addLog('Cleared')}
            />
          </div>
          {log.length > 0 && (
            <div style={{ marginTop: 16, fontSize: 12, color: '#737373', paddingLeft: SPACING['2xl'] }}>
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
//  Token Verification — Figma vs Storybook
// ═══════════════════════════════════════════
export const TokenVerification: NumberSearchBoxStory = {
  name: 'Token Verification',
  render: () => {
    const checks = [
      // Spacing
      { label: 'Spacing none', figmaVar: 'dimension/spacing/spacing-none', figma: '0px', storybook: `${SPACING.none}px` },
      { label: 'Spacing sm', figmaVar: 'dimension/spacing/spacing-sm', figma: '4px', storybook: `${SPACING.sm}px` },
      { label: 'Spacing lg', figmaVar: 'dimension/spacing/spacing-lg', figma: '8px', storybook: `${SPACING.lg}px` },
      { label: 'Spacing xl', figmaVar: 'dimension/spacing/spacing-xl', figma: '12px', storybook: `${SPACING.xl}px` },
      { label: 'Spacing 2xl', figmaVar: 'dimension/spacing/spacing-2xl', figma: '16px', storybook: `${SPACING['2xl']}px` },
      // Radius
      { label: 'Radius none', figmaVar: 'dimension/breakpoint/radius/radius-none', figma: '0px', storybook: `${RADIUS.none}px` },
      { label: 'Radius lg', figmaVar: 'dimension/breakpoint/radius/radius-lg', figma: '8px', storybook: `${RADIUS.lg}px` },
      // Border
      { label: 'Border Width 1', figmaVar: 'dimension/border-width/1', figma: '1px', storybook: `${BORDER_WIDTH[1]}px` },
      // Shadow
      { label: 'Shadow sm', figmaVar: 'dimension/shadow/sm', figma: '0px 1px 2px 0px rgba(0,0,0,0.06), 0px 1px 3px 0px rgba(0,0,0,0.10)', storybook: SHADOW.sm },
      // Typography
      { label: 'Font Family', figmaVar: 'font-family/Graphik TH', figma: 'Graphik TH', storybook: TYPOGRAPHY.fontFamily },
      { label: 'Title fontSize (title/l-semb)', figmaVar: 'title/l-semb/size', figma: '16px', storybook: `${TYPOGRAPHY.title.fontSize}px` },
      { label: 'Title fontWeight', figmaVar: 'title/l-semb/weight', figma: '600', storybook: `${TYPOGRAPHY.title.fontWeight}` },
      { label: 'Title lineHeight', figmaVar: 'title/l-semb/line-height', figma: '24px', storybook: TYPOGRAPHY.title.lineHeight },
      { label: 'Button fontSize (button/m-semb)', figmaVar: 'button/m-semb/size', figma: '14px', storybook: `${TYPOGRAPHY.button.fontSize}px` },
      { label: 'Button fontWeight', figmaVar: 'button/m-semb/weight', figma: '600', storybook: `${TYPOGRAPHY.button.fontWeight}` },
      { label: 'Button lineHeight', figmaVar: 'button/m-semb/line-height', figma: '22px', storybook: TYPOGRAPHY.button.lineHeight },
      { label: 'Number Box fontSize', figmaVar: '(visual ~24px bold)', figma: '24px', storybook: `${TYPOGRAPHY.numberBox.fontSize}px` },
      // Component dimensions
      { label: 'Number Box width', figmaVar: 'number-search-box-2 box width', figma: '53px', storybook: `${NUMBER_BOX.width}px` },
      { label: 'Number Box height', figmaVar: 'number-search-box-2 box height', figma: '64px', storybook: `${NUMBER_BOX.height}px` },
      { label: 'MenuButton width', figmaVar: 'menu-button btn width', figma: '114px', storybook: `${MENU_BUTTON.buttonWidth}px` },
      { label: 'MenuButton height', figmaVar: 'menu-button btn height', figma: '44px', storybook: `${MENU_BUTTON.buttonHeight}px` },
      { label: 'Stepper button size', figmaVar: 'set-select stepper btn', figma: '48px', storybook: `${SET_SELECT.stepperButtonSize}px` },
      { label: 'Image width', figmaVar: 'set-select image', figma: '72px', storybook: `${SET_SELECT.imageWidth}px` },
      { label: 'Image height', figmaVar: 'set-select image', figma: '69px', storybook: `${SET_SELECT.imageHeight}px` },
      // Colors
      { label: 'lotto-board-bg-white', figmaVar: 'colors/lotto-board/lotto-board-bg-white', figma: '#FFFFFF', storybook: LOTTO_BOARD_COLORS.bgWhite },
      { label: 'lotto-board-bg-dark', figmaVar: 'colors/lotto-board/lotto-board-bg-dark', figma: '#262626', storybook: LOTTO_BOARD_COLORS.bgDark },
      { label: 'lotto-board-bg-gray', figmaVar: 'colors/lotto-board/lotto-board-bg-gray', figma: '#C9C9C9', storybook: LOTTO_BOARD_COLORS.bgGray },
      { label: 'lotto-board-border', figmaVar: 'colors/lotto-board/lotto-board-border', figma: '#D4D4D4', storybook: LOTTO_BOARD_COLORS.border },
      { label: 'lotto-board-fg-dark', figmaVar: 'colors/lotto-board/lotto-board-fg-dark', figma: '#262626', storybook: LOTTO_BOARD_COLORS.fgDark },
      { label: 'lotto-board-fg-red', figmaVar: 'colors/lotto-board/lotto-board-fg-red', figma: '#E32321', storybook: LOTTO_BOARD_COLORS.fgRed },
      { label: 'btn-bg-pri-default', figmaVar: 'colors/button/primary/btn-bg-pri-default', figma: '#E32321', storybook: BUTTON_COLORS.primary.bg },
      { label: 'btn-fg-pri-default', figmaVar: 'colors/button/primary/btn-fg-pri-default', figma: '#FFFFFF', storybook: BUTTON_COLORS.primary.fg },
      { label: 'btn-bg-oncont-default', figmaVar: 'colors/button/on-container/btn-bg-oncont-default', figma: '#FFFFFF', storybook: BUTTON_COLORS.onContainer.bg },
      { label: 'btn-fg-oncont-default', figmaVar: 'colors/button/on-container/btn-fg-oncont-default', figma: '#E32321', storybook: BUTTON_COLORS.onContainer.fg },
    ];

    return (
      <div style={{ fontFamily: "'Graphik TH', sans-serif" }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>LottoBoard Token Verification</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#737373' }}>
          Comparing Figma bound variables vs Storybook token values
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Token</th>
              <th style={{ padding: '8px 12px' }}>Figma Variable Name</th>
              <th style={{ padding: '8px 12px' }}>Figma Value</th>
              <th style={{ padding: '8px 12px' }}>Storybook Value</th>
              <th style={{ padding: '8px 12px' }}>Match</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c) => {
              const figmaClean = c.figma.replace(/\s*\(.*\)/, '').trim();
              const sbClean = c.storybook.replace(/'/g, '').replace(/, sans-serif/, '').trim();
              const match =
                figmaClean.toLowerCase() === sbClean.toLowerCase() ||
                c.figma.includes(sbClean) ||
                sbClean.includes(figmaClean);
              return (
                <tr key={c.label} style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <td style={{ padding: '6px 12px', fontWeight: 500 }}>{c.label}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontSize: 11, color: '#737373' }}>
                    {c.figmaVar}
                  </td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: '#E32321' }}>{c.figma}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: '#3B82F6' }}>{c.storybook}</td>
                  <td style={{ padding: '6px 12px', fontSize: 16 }}>{match ? '\u2705' : '\u274C'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
};
