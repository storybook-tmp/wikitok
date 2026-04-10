import type { Preview } from '@storybook/react-vite';
import { StrictMode } from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { seededLanguageId, seededLikedArticles } from './mock-data';
import { mswHandlers, resetMswState } from './msw-handlers';

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
  parameters: {
    layout: 'fullscreen',
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
  async beforeEach() {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang', seededLanguageId);
    localStorage.setItem('likedArticles', JSON.stringify(seededLikedArticles));
    document.documentElement.lang = seededLanguageId;
    resetMswState();
  },
};

export default preview;
