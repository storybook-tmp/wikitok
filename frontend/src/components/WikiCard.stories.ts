import type { Meta, StoryObj } from '@storybook/react-vite';

import type { WikiArticle } from './WikiCard';
import { WikiCard } from './WikiCard';

const thumbnailSource = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
    <rect width="800" height="1200" fill="#111827" />
    <circle cx="400" cy="300" r="180" fill="#60a5fa" opacity="0.35" />
    <circle cx="250" cy="720" r="220" fill="#f59e0b" opacity="0.2" />
    <text x="400" y="620" fill="white" font-size="64" text-anchor="middle" font-family="Arial, sans-serif">
      Aurora Borealis
    </text>
  </svg>`,
)}`;

const article: WikiArticle = {
  title: 'Aurora',
  displaytitle: 'Aurora Borealis',
  extract:
    'The aurora borealis is a natural light display caused by charged particles colliding with Earth’s upper atmosphere.',
  pageid: 101,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source: thumbnailSource,
    width: 800,
    height: 1200,
  },
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

export const AlreadyLiked: Story = {
  parameters: {
    initialLikedArticles: [article],
  },
};
