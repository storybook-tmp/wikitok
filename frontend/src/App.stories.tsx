import { useEffect, useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import App from './App';

const storyImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23020517'/%3E%3Cstop offset='100%25' stop-color='%231d4ed8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='800' fill='url(%23bg)'/%3E%3Ccircle cx='220' cy='180' r='120' fill='%23fef08a' fill-opacity='0.8'/%3E%3Cpath d='M0 620 Q200 520 420 590 T920 560 T1200 600 V800 H0 Z' fill='%23111827'/%3E%3Cpath d='M0 700 Q300 600 560 680 T1200 650 V800 H0 Z' fill='%23030712'/%3E%3C/svg%3E";

const appArticlesResponse = {
  query: {
    pages: {
      1: {
        title: 'Aurora',
        varianttitles: { en: 'Aurora over the Arctic' },
        extract:
          'Auroras appear when solar particles meet Earth’s upper atmosphere and energize gases in the sky.',
        pageid: 1,
        thumbnail: {
          source: storyImage,
          width: 1200,
          height: 800,
        },
        canonicalurl: 'https://example.com/articles/aurora',
      },
      2: {
        title: 'Coral Reef',
        varianttitles: { en: 'Coral Reef' },
        extract:
          'Coral reefs support a huge range of marine life and are among the most diverse ecosystems on Earth.',
        pageid: 2,
        thumbnail: {
          source: storyImage,
          width: 1200,
          height: 800,
        },
        canonicalurl: 'https://example.com/articles/coral-reef',
      },
    },
  },
};

const mockFetch: typeof fetch = async () =>
  new Response(JSON.stringify(appArticlesResponse), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

function MockAppEnvironment({ children }: { children: React.ReactNode }) {
  const originalFetchRef = useRef(globalThis.fetch);
  const originalIntersectionObserverRef = useRef(globalThis.IntersectionObserver);

  globalThis.fetch = mockFetch;
  globalThis.IntersectionObserver = class MockIntersectionObserver
    implements IntersectionObserver
  {
    readonly root = null;
    readonly rootMargin = '0px';
    readonly thresholds = [0];

    disconnect() {}

    observe() {}

    takeRecords() {
      return [];
    }

    unobserve() {}
  };

  useEffect(() => {
    return () => {
      globalThis.fetch = originalFetchRef.current;
      globalThis.IntersectionObserver = originalIntersectionObserverRef.current;
    };
  }, []);

  return <>{children}</>;
}

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MockAppEnvironment>
        <Story />
      </MockAppEnvironment>
    ),
  ],
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultFeed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Aurora over the Arctic')).toBeInTheDocument();
  },
};

export const AboutOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'About' }));
    await expect(canvas.getByText('About WikiTok')).toBeInTheDocument();
  },
};
