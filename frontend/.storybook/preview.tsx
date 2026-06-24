import type { Preview } from '@storybook/react-vite';
import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';
import '../src/index.css';
import { fn } from 'storybook/test';
import { createWikiResponse, defaultLikedArticles, fixedTimestamp } from './wikiMockData';

const shareSpy = fn();
const clipboardWriteTextSpy = fn();
const reloadSpy = fn();
const alertSpy = fn();
const downloadSpy = fn();
const sendBeaconSpy = fn();

const originalFetch = globalThis.fetch.bind(globalThis);
const originalAnchorClick = HTMLAnchorElement.prototype.click;

HTMLAnchorElement.prototype.click = function click(this: HTMLAnchorElement) {
  if (this.download || this.href.startsWith('data:application/json')) {
    downloadSpy({
      download: this.download,
      href: this.href,
    });
    return;
  }

  return originalAnchorClick.call(this);
};

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}

function mockWikiFetch(input: RequestInfo | URL, init?: RequestInit) {
  const requestUrl = getRequestUrl(input);

  if (requestUrl.includes('wikipedia.org/w/api.php')) {
    const url = new URL(requestUrl);
    const variant = url.searchParams.get('variant') ?? 'en';

    return Promise.resolve(
      new Response(JSON.stringify(createWikiResponse({
        languageId: variant,
        origin: url.origin,
      })), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }),
    );
  }

  return originalFetch(input, init);
}

function installNavigatorMocks() {
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

  Object.defineProperty(window.navigator, 'sendBeacon', {
    configurable: true,
    value: sendBeaconSpy,
  });
}

function installReloadMock() {
  try {
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
      value: reloadSpy,
    });
  } catch {
    const locationPrototype = Object.getPrototypeOf(window.location) as Location;

    Object.defineProperty(locationPrototype, 'reload', {
      configurable: true,
      value: reloadSpy,
    });
  }
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <LikedArticlesProvider>
        <Story />
      </LikedArticlesProvider>
    ),
  ],
  async beforeEach() {
    Date.now = () => fixedTimestamp;
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('lang', 'en');
    localStorage.setItem('likedArticles', JSON.stringify(defaultLikedArticles));

    shareSpy.mockClear();
    clipboardWriteTextSpy.mockClear();
    reloadSpy.mockClear();
    alertSpy.mockClear();
    downloadSpy.mockClear();
    sendBeaconSpy.mockClear();

    installNavigatorMocks();
    installReloadMock();

    window.alert = alertSpy as typeof window.alert;
    window.fetch = mockWikiFetch as typeof window.fetch;
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
