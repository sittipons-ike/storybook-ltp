import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../UI Library/**/*.stories.@(ts|tsx)'],
  // The header carries two brand marks. They live in the design system rather than being
  // read out of lotteryplus-frontend-main/public, so a story does not depend on the
  // Frontend checkout sitting next to this one.
  staticDirs: ['../UI Library/assets'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
