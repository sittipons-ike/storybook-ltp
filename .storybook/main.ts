import type { StorybookConfig } from '@storybook/react-vite';

// `main.ts` runs in Node, not the browser, but the project has no @types/node — the one
// global it needs is declared here rather than pulling the whole package in for a single
// environment variable.
declare const process: { env: Record<string, string | undefined> };

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

  // Where the built site is mounted. Storybook runs at the domain root in dev and under
  // /<repo>/ on GitHub Pages, and the assets in `staticDirs` are plain files that nothing
  // rewrites — so every font and logo path has to be resolved against this rather than
  // assumed to start at `/`. Assuming it shipped a Storybook whose fonts and 112 logos all
  // 404'd in production while working perfectly on localhost.
  //
  // CI passes the repo name; a local build gets `/` and behaves as before.
  async viteFinal(config) {
    config.base = process.env.STORYBOOK_BASE_PATH || '/';
    return config;
  },
};

export default config;
