import type { Preview } from '@storybook/react-vite';
import MockDate from 'mockdate';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { globalMswHandlers, resetMswHandlerState } from './msw-handlers';

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
      handlers: globalMswHandlers,
    },
  },
  async beforeEach() {
    resetMswHandlerState();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify([]));
    MockDate.set('2024-04-01T12:00:00.000Z');

    return () => {
      MockDate.reset();
      localStorage.clear();
      sessionStorage.clear();
    };
  },
};

export default preview;
