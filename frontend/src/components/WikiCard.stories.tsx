import type { Meta, StoryObj } from '@storybook/react';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle: WikiArticle = {
  title: 'Artificial Intelligence',
  displaytitle: 'Artificial Intelligence',
  extract: 'Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals and humans. It is a field of study in computer science.',
  pageid: 123456,
  url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  thumbnail: {
    source: 'https://images.unsplash.com/photo-1677442d019cecf31a7a7a87cfe1667f17b518bcf?w=800&h=600&fit=crop',
    width: 800,
    height: 600,
  },
};

const mockArticleNoImage: WikiArticle = {
  title: 'Philosophy',
  displaytitle: 'Philosophy',
  extract: 'Philosophy is the study of general and fundamental questions about existence, knowledge, values, reason, mind, and language.',
  pageid: 654321,
  url: 'https://en.wikipedia.org/wiki/Philosophy',
  thumbnail: {
    source: 'https://via.placeholder.com/800x600?text=Philosophy',
    width: 800,
    height: 600,
  },
};

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...mockArticleNoImage,
      thumbnail: {
        source: '',
        width: 0,
        height: 0,
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    article: {
      ...mockArticle,
      extract: 'Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals and humans. It is a field of study in computer science. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals. This includes learning from past experiences and optimizing for future outcomes.',
    },
  },
};
