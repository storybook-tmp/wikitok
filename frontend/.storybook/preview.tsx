import type { Preview } from '@storybook/react-vite';
import { StrictMode } from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <StrictMode>
        <LikedArticlesProvider>
          <Story />
        </LikedArticlesProvider>
      </StrictMode>
    ),
  ],
  loaders: [mswLoader],
  async beforeEach() {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify([]));
  },
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: mswHandlers,
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
