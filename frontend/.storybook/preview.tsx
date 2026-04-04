import { StrictMode } from 'react';
import type { Preview } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { buildWikipediaResponse, fixedNow, mockLikedArticle } from './mock-data';

const shareSpy = fn();
const clipboardWriteTextSpy = fn();
const reloadSpy = fn();
const alertSpy = fn();
const originalFetch = window.fetch.bind(window);

let wikipediaRequestCount = 0;

const preview: Preview = {
  decorators: [
    (Story) => (
      <StrictMode>
        <LikedArticlesProvider>
          <div
            style={{
              width: '100%',
              minHeight: '100vh',
              position: 'relative',
              background: '#000',
            }}
          >
            <Story />
          </div>
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
  },
  async beforeEach() {
    wikipediaRequestCount = 0;
    shareSpy.mockClear();
    clipboardWriteTextSpy.mockClear();
    reloadSpy.mockClear();
    alertSpy.mockClear();

    localStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify([mockLikedArticle]));

    Object.defineProperty(Date, 'now', {
      configurable: true,
      value: () => fixedNow,
    });

    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: shareSpy,
    });

    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: clipboardWriteTextSpy,
      },
    });

    Object.defineProperty(window, 'alert', {
      configurable: true,
      value: alertSpy,
    });

    defineLocationReload();

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: StorybookIntersectionObserver,
    });

    Object.defineProperty(window, 'Image', {
      configurable: true,
      value: StorybookImage,
    });

    Object.defineProperty(window, 'fetch', {
      configurable: true,
      value: createFetchMock(originalFetch),
    });
  },
};

export default preview;

function createFetchMock(originalFetch: typeof window.fetch) {
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const requestUrl = getRequestUrl(input);

    if (requestUrl && isWikipediaApiRequest(requestUrl)) {
      const languageId = requestUrl.searchParams.get('variant') ?? 'en';
      const responseBody = buildWikipediaResponse(languageId, wikipediaRequestCount);
      wikipediaRequestCount += 1;

      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return originalFetch(input, init);
  };
}

function defineLocationReload() {
  try {
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
      value: reloadSpy,
    });
  } catch {
    // Some browsers lock Location methods, but Storybook still renders fine without overriding it.
  }
}

function getRequestUrl(input: RequestInfo | URL) {
  if (input instanceof URL) {
    return input;
  }

  if (typeof input === 'string') {
    return new URL(input, window.location.origin);
  }

  if ('url' in input) {
    return new URL(input.url, window.location.origin);
  }

  return null;
}

function isWikipediaApiRequest(url: URL) {
  return url.hostname.endsWith('wikipedia.org') && url.pathname === '/w/api.php';
}

class StorybookIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '100px';
  readonly thresholds = [0.1];

  constructor(private readonly callback: IntersectionObserverCallback) {
    void this.callback;
  }

  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }

  unobserve() {}
}

class StorybookImage {
  onerror: null | ((event: Event | string) => void) = null;
  onload: null | ((event: Event) => void) = null;

  set src(_value: string) {
    queueMicrotask(() => {
      this.onload?.(new Event('load'));
    });
  }
}
