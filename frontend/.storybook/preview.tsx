import { StrictMode } from 'react';
import type { Preview } from '@storybook/react-vite';
import MockDate from 'mockdate';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { mswHandlers, resetStorybookMocks } from './msw-handlers';
import { likedArticlesSeed } from './story-fixtures';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <StrictMode>
        <LikedArticlesProvider>
          <div className="min-h-screen bg-black text-white">
            <Story />
          </div>
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
    resetStorybookMocks();
    MockDate.set('2024-04-01T12:00:00.000Z');
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify(likedArticlesSeed));
  },
};

export default preview;
