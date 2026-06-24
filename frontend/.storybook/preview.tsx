import type { Preview } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import {
  createWikipediaResponse,
  defaultLanguageId,
  likedArticles,
} from './wikiFixtures';

const alertSpy = fn();
const clipboardWriteTextSpy = fn();
const reloadSpy = fn();
const sendBeaconSpy = fn(() => true);
const shareSpy = fn();

const preview: Preview = {
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
  async beforeEach() {
    localStorage.clear();
    localStorage.setItem('lang', defaultLanguageId);
    localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

    setMockProperty(globalThis, 'fetch', createWikipediaFetchMock(globalThis.fetch.bind(globalThis)));
    setMockProperty(window, 'IntersectionObserver', MockIntersectionObserver);
    setMockProperty(navigator, 'share', shareSpy);
    setMockProperty(navigator, 'sendBeacon', sendBeaconSpy);
    setMockProperty(navigator, 'clipboard', {
      writeText: clipboardWriteTextSpy,
    });
    setMockProperty(window.location, 'reload', reloadSpy);
    setMockProperty(window, 'alert', alertSpy);
  },
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
};

export default preview;

function createWikipediaFetchMock(originalFetch: typeof fetch): typeof fetch {
  let batchIndex = 0;

  return async (input, init) => {
    const requestUrl =
      typeof input === 'string' || input instanceof URL ? input.toString() : input.url;

    if (isWikipediaApiRequest(requestUrl)) {
      const url = new URL(requestUrl);
      const languageId = url.searchParams.get('variant') ?? defaultLanguageId;
      const responseBody = createWikipediaResponse(languageId, batchIndex);
      batchIndex += 1;

      return new Response(JSON.stringify(responseBody), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return originalFetch(input, init);
  };
}

function isWikipediaApiRequest(requestUrl: string) {
  try {
    const url = new URL(requestUrl);
    return url.hostname.endsWith('.wikipedia.org') && url.pathname === '/w/api.php';
  } catch {
    return false;
  }
}

function setMockProperty<T extends object>(
  target: T,
  property: PropertyKey,
  value: unknown,
) {
  try {
    Object.defineProperty(target, property, {
      configurable: true,
      writable: true,
      value,
    });
  } catch {
    Reflect.set(target, property, value);
  }
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];

  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }

  unobserve() {}
}
