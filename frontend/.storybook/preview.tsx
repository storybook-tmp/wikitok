import type { Preview } from '@storybook/react-vite';

import '../src/index.css';
import '../src/styles/Article.css';

import { LikedArticlesProvider } from '../src/contexts/LikedArticlesContext';

const mockImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
      <rect width="800" height="1200" fill="#111827" />
      <circle cx="400" cy="320" r="160" fill="#1f2937" />
      <rect x="120" y="620" width="560" height="48" rx="24" fill="#374151" />
      <rect x="180" y="700" width="440" height="32" rx="16" fill="#4b5563" />
      <rect x="220" y="760" width="360" height="32" rx="16" fill="#4b5563" />
    </svg>`,
  );

const mockWikiResponses = [
  {
    query: {
      pages: {
        101: {
          title: 'Aurora Lake',
          pageid: 101,
          extract:
            'Aurora Lake is a fictional article used to keep Storybook stories stable during tests.',
          thumbnail: {
            source: mockImage,
            width: 800,
            height: 1200,
          },
          canonicalurl: 'https://en.wikipedia.org/wiki/Aurora_Lake',
          varianttitles: {
            en: 'Aurora Lake',
          },
        },
        102: {
          title: 'Cinder Peak',
          pageid: 102,
          extract:
            'Cinder Peak is a second mock article so the app can render a feed and likes interactions.',
          thumbnail: {
            source: mockImage,
            width: 800,
            height: 1200,
          },
          canonicalurl: 'https://en.wikipedia.org/wiki/Cinder_Peak',
          varianttitles: {
            en: 'Cinder Peak',
          },
        },
      },
    },
  },
  {
    query: {
      pages: {
        201: {
          title: 'Harbor Lights',
          pageid: 201,
          extract:
            'Harbor Lights rounds out the mocked buffer response so infinite scrolling can append fresh cards.',
          thumbnail: {
            source: mockImage,
            width: 800,
            height: 1200,
          },
          canonicalurl: 'https://en.wikipedia.org/wiki/Harbor_Lights',
          varianttitles: {
            en: 'Harbor Lights',
          },
        },
        202: {
          title: 'Glass Forest',
          pageid: 202,
          extract:
            'Glass Forest gives the app a second unique buffered article and avoids duplicate React keys in tests.',
          thumbnail: {
            source: mockImage,
            width: 800,
            height: 1200,
          },
          canonicalurl: 'https://en.wikipedia.org/wiki/Glass_Forest',
          varianttitles: {
            en: 'Glass Forest',
          },
        },
      },
    },
  },
];

let wikiResponseIndex = 0;

function setupBrowserMocks() {
  if (typeof window === 'undefined') {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds = [];

      disconnect() {}

      observe() {}

      takeRecords() {
        return [];
      }

      unobserve() {}
    }

    window.IntersectionObserver = MockIntersectionObserver;
  }

  if (!('clipboard' in navigator)) {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async () => undefined,
      },
      configurable: true,
    });
  }

  if (!('share' in navigator)) {
    Object.defineProperty(navigator, 'share', {
      value: async () => undefined,
      configurable: true,
    });
  }

  if (typeof window.alert !== 'function') {
    window.alert = () => undefined;
  }

  const existingFetch = globalThis.fetch?.bind(globalThis);

  if (existingFetch && !('storybookWikiMock' in existingFetch)) {
    const mockedFetch: typeof fetch = async (input, init) => {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;

      if (url.includes('/w/api.php?')) {
        const mockWikiResponse =
          mockWikiResponses[wikiResponseIndex % mockWikiResponses.length];
        wikiResponseIndex += 1;

        return new Response(JSON.stringify(mockWikiResponse), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      return existingFetch(input, init);
    };

    Object.defineProperty(mockedFetch, 'storybookWikiMock', {
      value: true,
    });

    globalThis.fetch = mockedFetch;
  }
}

setupBrowserMocks();

const preview: Preview = {
  decorators: [
    (Story) => {
      localStorage.removeItem('likedArticles');
      localStorage.removeItem('lang');

      return (
        <LikedArticlesProvider>
          <Story />
        </LikedArticlesProvider>
      );
    },
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
};

export default preview;
