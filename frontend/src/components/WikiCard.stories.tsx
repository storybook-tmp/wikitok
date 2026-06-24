import type { Meta, StoryObj } from '@storybook/react-vite';

import type { WikiArticle } from './WikiCard';
import { WikiCard } from './WikiCard';

const thumbnail: WikiArticle['thumbnail'] = {
  source: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#14532d" />
        </linearGradient>
      </defs>
      <rect width="800" height="1200" fill="url(#sky)" />
      <circle cx="620" cy="240" r="92" fill="#f8fafc" fill-opacity="0.9" />
      <path d="M0 930 C160 840 260 980 390 910 C520 840 600 980 800 890 L800 1200 L0 1200 Z" fill="#020617" />
      <path d="M0 1020 C120 970 240 1060 370 1000 C520 930 620 1090 800 1010 L800 1200 L0 1200 Z" fill="#0f172a" />
    </svg>`,
  )}`,
  width: 800,
  height: 1200,
};

const article: WikiArticle = {
  title: 'Aurora',
  displaytitle: 'Aurora over the fjord',
  extract:
    'An unusual cold front cleared the coastline overnight, leaving enough visibility for residents to watch an extended aurora sweep over the water.',
  pageid: 42,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail,
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    article,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Liked: Story = {
  parameters: {
    likedArticles: [article],
  },
};
