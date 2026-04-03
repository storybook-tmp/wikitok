import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { likedArticlesSeed } from './mock-data';
import { mswHandlers, resetMswState } from './msw-handlers';

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
    resetMswState();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify(likedArticlesSeed));
  },
};

export default preview;
