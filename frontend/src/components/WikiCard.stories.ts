import type { Meta, StoryObj } from '@storybook/react-vite';

import { WikiCard } from './WikiCard';

const baseArticle = {
  title: 'Storybook',
  displaytitle: 'Storybook',
  extract:
    'Storybook is a frontend workshop for building UI components and pages in isolation.',
  pageid: 34421,
  url: 'https://storybook.js.org/',
  thumbnail: {
    source:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200"><defs><linearGradient id="g" x1="0%25" x2="100%25" y1="0%25" y2="100%25"><stop offset="0%25" stop-color="%23111827"/><stop offset="100%25" stop-color="%23334155"/></linearGradient></defs><rect width="100%25" height="100%25" fill="url(%23g)"/><text x="50%25" y="48%25" fill="%23ffffff" font-family="Arial" font-size="56" text-anchor="middle">Storybook</text><text x="50%25" y="55%25" fill="%23cbd5e1" font-family="Arial" font-size="28" text-anchor="middle">UI components in isolation</text></svg>',
    width: 800,
    height: 1200,
  },
} as const;

const meta = {
  title: 'AI Generated/Medium/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    article: baseArticle,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LikedState: Story = {
  beforeEach: () => {
    localStorage.setItem('likedArticles', JSON.stringify([baseArticle]));
  },
};
