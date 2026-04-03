import type { Preview } from '@storybook/react-vite';
import { StrictMode } from 'react';
import { fn } from 'storybook/test';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { createWikipediaResponse, likedArticlesSeed } from './mockWikiData';

const originalFetch = globalThis.fetch.bind(globalThis);
const shareSpy = fn();
const clipboardWriteTextSpy = fn();
const reloadSpy = fn();
const alertSpy = fn();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '100px';
  readonly thresholds = [0.1];

  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }

  unobserve() {}
}

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
  async beforeEach() {
    let wikipediaRequestCount = 0;

    localStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify(likedArticlesSeed));
    sessionStorage.clear();

    shareSpy.mockClear();
    clipboardWriteTextSpy.mockClear();
    reloadSpy.mockClear();
    alertSpy.mockClear();

    globalThis.fetch = async (input, init) => {
      const requestUrl =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;

      if (requestUrl.includes('wikipedia.org/w/api.php')) {
        const response = createWikipediaResponse(requestUrl, wikipediaRequestCount);
        wikipediaRequestCount += 1;

        return new Response(JSON.stringify(response), {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 200,
        });
      }

      return originalFetch(input, init);
    };

    Object.defineProperty(globalThis, 'IntersectionObserver', {
      configurable: true,
      value: MockIntersectionObserver,
      writable: true,
    });

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: MockIntersectionObserver,
      writable: true,
    });

    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: shareSpy,
    });

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: clipboardWriteTextSpy,
      },
    });

    Object.defineProperty(window, 'alert', {
      configurable: true,
      value: alertSpy,
      writable: true,
    });

    try {
      Object.defineProperty(window.location, 'reload', {
        configurable: true,
        value: reloadSpy,
      });
    } catch {
      Object.defineProperty(Location.prototype, 'reload', {
        configurable: true,
        value: reloadSpy,
      });
    }
  },
};

export default preview;
