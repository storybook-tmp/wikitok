import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import './preview.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { mswHandlers } from './msw-handlers';
import { savedLikedArticles } from './wiki-fixtures';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
  loaders: [mswLoader],
  async beforeEach() {
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify(savedLikedArticles));
  },
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
    msw: {
      handlers: mswHandlers,
    },
  },
};

export default preview;
