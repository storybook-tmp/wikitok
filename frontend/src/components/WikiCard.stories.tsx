import type { Meta, StoryObj } from '@storybook/react';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  tags: ['autodocs'],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticle: WikiArticle = {
  title: 'Artificial Intelligence',
  displaytitle: 'Artificial Intelligence',
  extract: 'Artificial intelligence (AI) is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by animals and humans.',
  pageid: 123,
  url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  thumbnail: {
    source: 'https://images.unsplash.com/photo-1677442d019cecf374f495f4a21ad489dcb5cc0d?w=400&h=300&fit=crop',
    width: 400,
    height: 300,
  },
};

const articleWithoutImage: WikiArticle = {
  title: 'Philosophy of Mind',
  displaytitle: 'Philosophy of Mind',
  extract: 'Philosophy of mind is the philosophical study of the nature of the mind, mental events, mental functions, mental properties, consciousness and their relationship to the physical body.',
  pageid: 456,
  url: 'https://en.wikipedia.org/wiki/Philosophy_of_mind',
  thumbnail: {
    source: '',
    width: 0,
    height: 0,
  },
};

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const WithoutImage: Story = {
  args: {
    article: articleWithoutImage,
  },
};
