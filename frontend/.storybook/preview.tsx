import type { Preview } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import '../src/index.css';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import { buildWikiQueryResponse, mockLikedArticles } from './mockData';

const shareSpy = fn(async () => undefined);
const clipboardWriteTextSpy = fn(async () => undefined);
const alertSpy = fn();
const nativeFetch = globalThis.fetch.bind(globalThis);

const preview: Preview = {
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <div className="min-h-screen bg-black text-white">
          <Story />
        </div>
      </LikedArticlesProvider>
    ),
  ],
  async beforeEach() {
    resetMocks();
    seedBrowserState();
    installBrowserMocks();
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

function resetMocks() {
  shareSpy.mockClear();
  clipboardWriteTextSpy.mockClear();
  alertSpy.mockClear();
}

function seedBrowserState() {
  localStorage.clear();
  localStorage.setItem('lang', 'en');
  localStorage.setItem('likedArticles', JSON.stringify(mockLikedArticles));
}

function installBrowserMocks() {
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    writable: true,
    value: fetchSpy,
  });

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: MockIntersectionObserver,
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
  });
}

const fetchSpy = fn(async (input: RequestInfo | URL, init?: RequestInit) => {
  const requestUrl = getRequestUrl(input);
  if (!requestUrl.includes('wikipedia.org/w/api.php?')) {
    return nativeFetch(input, init);
  }

  const url = new URL(requestUrl);
  const languageId = url.searchParams.get('variant') ?? 'en';

  return new Response(JSON.stringify(buildWikiQueryResponse(languageId, url.host)), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

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

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}
