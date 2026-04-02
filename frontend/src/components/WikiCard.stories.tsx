import type { Meta, StoryObj } from '@storybook/react-vite';

import { WikiCard, type WikiArticle } from './WikiCard';

const article: WikiArticle = {
  title: 'Aurora',
  displaytitle: 'Aurora',
  extract:
    'An aurora is a natural light display in Earth’s sky, usually visible in high-latitude regions and caused by disturbances in the magnetosphere.',
  pageid: 1001,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source:
      'https://images.unsplash.com/photo-1508261303786-75f0f4290c2e?auto=format&fit=crop&w=1200&q=80',
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
    article,
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unliked: Story = {};

export const Liked: Story = {
  parameters: {
    likedArticles: [article],
  },
};
