import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const ltpTheme = create({
  base: 'light',
  brandTitle: 'Lotteryplus Design System',
  fontBase: "'Graphik TH', 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontCode: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",

  // Brand colors
  colorPrimary: '#E32321',
  colorSecondary: '#E32321',

  // UI
  appBg: '#FAFAFA',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E5E5E5',
  appBorderRadius: 8,

  // Text colors
  textColor: '#262626',
  textInverseColor: '#FFFFFF',

  // Toolbar
  barTextColor: '#737373',
  barSelectedColor: '#E32321',
  barBg: '#FFFFFF',
});

addons.setConfig({
  theme: ltpTheme,
});
