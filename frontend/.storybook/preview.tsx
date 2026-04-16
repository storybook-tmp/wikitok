import type { Preview } from '@storybook/react-vite';
import MockDate from 'mockdate';
import { mswLoader, initialize } from 'msw-storybook-addon';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { defaultLikedArticles, resetWikiFixtureState } from './wiki-fixtures';
import { mswHandlers } from './msw-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', width: '100%' }}>
        <LikedArticlesProvider>
          <Story />
        </LikedArticlesProvider>
      </div>
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
    resetWikiFixtureState();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify(defaultLikedArticles));
    MockDate.set('2024-04-01T12:00:00.000Z');

    return () => {
      MockDate.reset();
      localStorage.clear();
      sessionStorage.clear();
    };
  },
};

export default preview;
