import type { Preview } from '@storybook/react';
import './preview.css';

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
      storySort: {
        order: ['Verification Report', 'Foundations', ['Colors', 'Typography', 'Spacing & Layout', 'Component Tokens'], 'Components'],
      },
    },
  },
};

export default preview;
