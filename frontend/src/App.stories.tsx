import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { expect, userEvent, within } from 'storybook/test';

import App from './App';
import {
  createWikiApiResponse,
  likedWikiArticles,
  sampleWikiArticle,
  secondWikiArticle,
} from './storybook/fixtures';

class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];

  disconnect() {}

  observe() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {}
}

class MockImage {
  onerror: ((event: Event) => void) | null = null;
  onload: ((event: Event) => void) | null = null;

  set src(_value: string) {
    queueMicrotask(() => {
      this.onload?.(new Event('load'));
    });
  }
}

function AppStoryEnvironment({ children }: { children: ReactNode }) {
  const restoreRef = useRef<(() => void) | null>(null);

  if (!restoreRef.current) {
    const originalFetch = globalThis.fetch;
    const originalImage = globalThis.Image;
    const originalIntersectionObserver = globalThis.IntersectionObserver;
    const responseBody = createWikiApiResponse([
      sampleWikiArticle,
      secondWikiArticle,
    ]);

    const mockFetch: typeof fetch = async () =>
      new Response(JSON.stringify(responseBody), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });

    globalThis.fetch = mockFetch;
    globalThis.Image = MockImage as unknown as typeof Image;
    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    restoreRef.current = () => {
      globalThis.fetch = originalFetch;
      globalThis.Image = originalImage;
      globalThis.IntersectionObserver = originalIntersectionObserver;
    };
  }

  useEffect(() => {
    return () => {
      restoreRef.current?.();
      restoreRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

const meta = {
  title: 'AI Generated/Complex/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    language: 'en',
  },
  decorators: [
    (Story) => (
      <AppStoryEnvironment>
        <Story />
      </AppStoryEnvironment>
    ),
  ],
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FeedLoaded: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.findByRole('link', { name: sampleWikiArticle.displaytitle }),
    ).resolves.toBeInTheDocument();
  },
};

export const LikesPanelOpen: Story = {
  parameters: {
    likedArticles: likedWikiArticles,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Likes' }));
    await expect(
      canvas.findByPlaceholderText('Search liked articles...'),
    ).resolves.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Export' })).toBeVisible();
  },
};
