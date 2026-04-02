import { createElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from 'storybook/test';

import type { WikiArticle } from '../components/WikiCard';
import { LikedArticlesProvider, useLikedArticles } from './LikedArticlesContext';

const sampleArticle: WikiArticle = {
  title: 'Forest Corridor',
  displaytitle: 'Forest Corridor',
  extract:
    'A forest corridor links fragmented habitats so plants and animals can move more freely through a landscape.',
  pageid: 401,
  url: 'https://en.wikipedia.org/wiki/Wildlife_corridor',
  thumbnail: {
    source: createThumbnailDataUrl('Forest Corridor'),
    width: 1200,
    height: 800,
  },
};

const meta = {
  title: 'AI Generated/Complex/LikedArticlesProvider',
  component: LikedArticlesProvider,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LikedArticlesProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyCollection: Story = {
  render: () => renderProviderStory([]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Liked count: 0/i)).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /like sample article/i }));
    await expect(canvas.getByText(/Liked count: 1/i)).toBeVisible();
  },
};

export const WithSeededArticle: Story = {
  render: () => renderProviderStory([sampleArticle]),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Liked count: 1/i)).toBeVisible();
    await expect(canvas.getByText(/Forest Corridor/i)).toBeVisible();
    await expect(canvas.getByRole('button', { name: /unlike sample article/i })).toBeVisible();
  },
};

function renderProviderStory(seed: WikiArticle[]) {
  localStorage.setItem('likedArticles', JSON.stringify(seed));

  return createElement(
    LikedArticlesProvider,
    null,
    createElement(LikedArticlesHarness),
  );
}

function LikedArticlesHarness() {
  const { likedArticles, isLiked, toggleLike } = useLikedArticles();

  return createElement(
    'section',
    {
      style: {
        maxWidth: 420,
        display: 'grid',
        gap: '0.75rem',
        padding: '1.5rem',
        borderRadius: '1rem',
        background: '#111827',
        color: 'white',
      },
    },
    createElement('h2', null, 'Liked Articles Provider'),
    createElement('p', null, `Liked count: ${likedArticles.length}`),
    createElement(
      'button',
      {
        type: 'button',
        onClick: () => toggleLike(sampleArticle),
        style: {
          padding: '0.75rem 1rem',
          borderRadius: '999px',
          border: '1px solid #374151',
          background: '#1f2937',
          color: 'white',
          cursor: 'pointer',
        },
      },
      isLiked(sampleArticle.pageid) ? 'Unlike sample article' : 'Like sample article',
    ),
    likedArticles.length === 0
      ? createElement('p', null, 'No liked articles saved yet.')
      : createElement(
          'ul',
          {
            style: {
              display: 'grid',
              gap: '0.5rem',
              paddingLeft: '1.25rem',
            },
          },
          likedArticles.map((article) =>
            createElement('li', { key: article.pageid }, article.displaytitle),
          ),
        ),
  );
}

function createThumbnailDataUrl(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="#166534" />
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="white"
        font-family="sans-serif"
        font-size="84"
      >
        ${label}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
