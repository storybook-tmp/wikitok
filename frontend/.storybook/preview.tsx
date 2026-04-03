import type { Preview } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import {
  buildMockWikipediaResponse,
  mockLikedArticles,
} from './wiki-mocks';

const shareSpy = fn();
const clipboardSpy = fn();
const alertSpy = fn();
const reloadSpy = fn();
const downloadSpy = fn();
const originalFetch = globalThis.fetch.bind(globalThis);
let activeStoryId = '';
let wikiRequestCount = 0;

const preview: Preview = {
  decorators: [
    (Story, context) => {
      prepareStoryEnvironment(context.id);

      return (
        <LikedArticlesProvider>
          <Story />
        </LikedArticlesProvider>
      );
    },
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
  },
  async beforeEach(context) {
    prepareStoryEnvironment(context.id, true);
  },
};

export default preview;

function prepareStoryEnvironment(storyId: string, force = false) {
  if (!force && activeStoryId === storyId) {
    return;
  }

  activeStoryId = storyId;
  wikiRequestCount = 0;
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem('lang', 'en');
  localStorage.setItem('likedArticles', JSON.stringify(mockLikedArticles));
  document.documentElement.lang = 'en';

  globalThis.fetch = ((
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => {
    const requestUrl = getRequestUrl(input);
    if (requestUrl.startsWith('https://') && requestUrl.includes('/w/api.php?')) {
      const response = buildMockWikipediaResponse(requestUrl, wikiRequestCount);
      wikiRequestCount += 1;
      return Promise.resolve(
        new Response(JSON.stringify(response), {
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }

    return originalFetch(input, init);
  }) as typeof fetch;

  Object.defineProperty(globalThis.navigator, 'share', {
    configurable: true,
    value: async (...args: unknown[]) => {
      shareSpy(...args);
    },
  });

  Object.defineProperty(globalThis.navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: async (...args: unknown[]) => {
        clipboardSpy(...args);
      },
    },
  });

  globalThis.alert = ((...args: unknown[]) => {
    alertSpy(...args);
  }) as typeof alert;

  try {
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
      value: (...args: unknown[]) => {
        reloadSpy(...args);
      },
    });
  } catch {
    // Ignore browsers that lock the reload property.
  }

  Object.defineProperty(HTMLAnchorElement.prototype, 'click', {
    configurable: true,
    value: (...args: unknown[]) => {
      downloadSpy(...args);
    },
  });

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: MockIntersectionObserver,
  });
}

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [];

  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }

  unobserve() {}
}
