import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import '../src/index.css';
import { mswHandlers } from './msw-handlers';
import { mockLikedArticles } from './wiki-fixtures';

initialize(
  {
    onUnhandledRequest: 'bypass',
  },
  mswHandlers,
);

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
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
    const originalConsoleLog = console.log;

    console.log = (...args) => {
      if (args[0] === 'Article data:') {
        return;
      }

      originalConsoleLog(...args);
    };

    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify(mockLikedArticles));
    sessionStorage.clear();

    return () => {
      console.log = originalConsoleLog;
    };
  },
};

export default preview;
