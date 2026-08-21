import type { Preview } from '@storybook/react';
// Generated from Figma via design.md + components.json — see tools/README.md.
// Loaded globally so every story can reference --sys-* / component tokens.
import '../UI Library/foundations/tokens.css';
import './preview.css';
import { installFonts } from './fonts';

installFonts();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    options: {
      // Atomic design, read in the order it is meant to be read: the token tier first,
      // then atoms building up to organisms, then the frames pages sit in. `composition_level`
      // in components.json decides which group a component lands in — the sidebar is
      // generated from the spec, not arranged by hand.
      storySort: {
        order: [
          'Foundations',
          ['Colors', 'Typography', 'Spacing & Layout', 'Component Tokens'],
          'Atoms',
          'Molecules',
          'Organisms',
          'Patterns',
          'System',
        ],
      },
    },
  },
};

export default preview;
