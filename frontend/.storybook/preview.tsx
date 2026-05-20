import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
