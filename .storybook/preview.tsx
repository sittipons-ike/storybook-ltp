import type { Preview } from '@storybook/react';
import React from 'react';
import MetadataBadge from '../ui/system/MetadataBadge';
// Generated from Figma via design.md + components.json — see tools/README.md.
// Loaded globally so every story can reference --sys-* / component tokens.
import '../ui/foundations/tokens.css';
import './preview.css';
import { installFonts } from './fonts';

installFonts();

const preview: Preview = {
  // The manifest travels with the component. `public: false` is a contract, and a
  // contract nobody can read is only a note to the machine — nine components carry it
  // and in Storybook they looked exactly like the forty that do not. The badge is fixed
  // rather than wrapped around the story on purpose: a decorator in the layout flow
  // would move every story down and change what a visual review is looking at.
  decorators: [
    (Story, context) => (
      <>
        <Story />
        <MetadataBadge title={context.title} />
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    options: {
      // Grouped by scope, then by what a thing is for — never by composition level.
      //
      // The sidebar used to read Atoms / Molecules / Organisms, which put three different
      // questions on one axis once Features arrived: level (how is it composed), type
      // (pattern, page, helper) and scope (whose is it) all sat side by side, so a reader
      // looking for MissionCard had no way to know whether it lived under Molecules or
      // under Features. Worse, the level names answer a question nobody asks while
      // navigating — people look for "date picker", not for "the third organism".
      //
      // One axis now: is it shared, or does it belong to a feature. `Components` holds
      // what every feature may draw on, sub-grouped the way the Standard's own §3.4 tables
      // group the universe — by purpose. `Features/<name>` holds that feature's pages AND
      // its components together, mirroring features/<name>/ on disk one to one.
      //
      // composition_level did not go anywhere: it stays in components.json, the twelfth
      // check enforces it, and every component's `🔍 What Figma states` story shows it.
      // It describes a component; it was never a place to put one.
      storySort: {
        order: [
          'Foundations',
          ['Colors', 'Typography', 'Spacing & Layout', 'Component Tokens'],
          'Components',
          ['Forms', 'Display', 'Feedback', 'Navigation', 'Overlay', 'Layout', 'Commerce'],
          'Patterns',
          'Helpers',
          'Features',
          'System',
        ],
      },
    },
  },
};

export default preview;
