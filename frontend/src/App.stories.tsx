import type { Meta, StoryObj } from '@storybook/react-vite';

import App from './App';

const sampleResponse = {
  query: {
    pages: {
      1: {
        title: 'Aurora',
        varianttitles: {
          en: 'Aurora over the Fjord',
        },
        extract:
          'Auroras form when charged solar particles collide with atmospheric gases and emit visible light.',
        pageid: 1,
        thumbnail: {
          source:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
          width: 900,
          height: 1200,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Aurora',
      },
      2: {
        title: 'Mangrove',
        varianttitles: {
          en: 'Mangroves at Dusk',
        },
        extract:
          'Mangrove forests stabilize coastlines and create nurseries for fish, birds, and countless invertebrates.',
        pageid: 2,
        thumbnail: {
          source:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
          width: 900,
          height: 1200,
        },
        canonicalurl: 'https://en.wikipedia.org/wiki/Mangrove',
      },
    },
  },
};

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadedFeed: Story = {
  render: () => <LoadedAppStory />,
};

export const LoadingFeed: Story = {
  render: () => <LoadingAppStory />,
};

function installAppMocks(mode: 'loaded' | 'loading') {
  localStorage.setItem('lang', 'en');
  localStorage.setItem('likedArticles', '[]');

  window.IntersectionObserver =
    window.IntersectionObserver ??
    class IntersectionObserver {
      disconnect() {
        return undefined;
      }

      observe() {
        return undefined;
      }

      unobserve() {
        return undefined;
      }

      takeRecords() {
        return [];
      }
    };

  globalThis.fetch =
    mode === 'loading'
      ? (() => new Promise<Response>(() => undefined)) as typeof fetch
      : (async () =>
          new Response(JSON.stringify(sampleResponse), {
            headers: {
              'Content-Type': 'application/json',
            },
          })) as typeof fetch;
}

function LoadedAppStory() {
  installAppMocks('loaded');
  return <App />;
}

function LoadingAppStory() {
  installAppMocks('loading');
  return <App />;
}
