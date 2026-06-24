import { createElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { LikedArticlesProvider } from '../contexts/LikedArticlesContext';
import { WikiCard, type WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Solar Garden',
  displaytitle: 'Solar Garden',
  extract:
    'A solar garden is a shared photovoltaic installation that lets multiple people benefit from the same renewable energy project.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Solar_power',
  thumbnail: {
    source: createThumbnailDataUrl('Solar Garden'),
    width: 1200,
    height: 800,
  },
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    article: sampleArticle,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ article }) => renderWikiCard(article, []),
};

export const Liked: Story = {
  render: ({ article }) => renderWikiCard(article, [article]),
};

function renderWikiCard(article: WikiArticle, likedArticles: WikiArticle[]) {
  localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

  return createElement(
    LikedArticlesProvider,
    null,
    createElement(WikiCard, { article }),
  );
}

function createThumbnailDataUrl(label: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#082f49" />
          <stop offset="100%" stop-color="#22c55e" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" />
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
