import type { Meta, StoryObj } from '@storybook/react-vite';

import { WikiCard, type WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Northern lights',
  displaytitle: 'Northern lights',
  extract:
    'Auroras appear when charged particles from the Sun collide with Earth’s atmosphere.',
  pageid: 108,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source: 'https://picsum.photos/seed/wiki-card/1280/1920',
    width: 1280,
    height: 1920,
  },
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: sampleArticle,
  },
};

export const AlreadyLiked: Story = {
  args: {
    article: sampleArticle,
  },
  parameters: {
    initialLikedArticles: [sampleArticle],
  },
};
