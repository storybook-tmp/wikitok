import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/index.css';
import '../src/styles/Article.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

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
