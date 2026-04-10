import type { Preview } from '@storybook/react-vite';
import MockDate from 'mockdate';
import { StrictMode } from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { mswHandlers } from './msw-handlers';
import { resetMockWikipediaState, seededLikedArticles } from './mock-wiki-data';

initialize({
  quiet: true,
  onUnhandledRequest({ request }) {
    const url = new URL(request.url);

    if (request.destination === 'image' || url.hostname === 'vitals.vercel-insights.com') {
      return;
    }

    throw new Error(`Unhandled request in Storybook: ${request.method} ${request.url}`);
  },
});

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <StrictMode>
        <LikedArticlesProvider>
          <Story />
        </LikedArticlesProvider>
      </StrictMode>
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
    clearCookies();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify(seededLikedArticles));
    resetMockWikipediaState();
    MockDate.reset();
    MockDate.set('2024-04-01T12:00:00.000Z');
  },
};

export default preview;

function clearCookies() {
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim();

    if (!name) {
      continue;
    }

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
