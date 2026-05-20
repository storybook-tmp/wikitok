import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const mockArticle: WikiArticle = {
  title: 'Artificial Intelligence',
  displaytitle: 'Artificial Intelligence',
  extract: 'Artificial intelligence (AI) is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by animals and humans.',
  pageid: 1234567,
  url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  thumbnail: {
    source: 'https://images.unsplash.com/photo-1677442d019de0894c94a4962c2932afd345605b?w=400&h=300&fit=crop',
    width: 400,
    height: 300,
  },
};

const mockArticleNoThumbnail: WikiArticle = {
  title: 'Programming',
  displaytitle: 'Programming',
  extract: 'Computer programming is the process of performing particular computations, usually by designing and building an executable computer program.',
  pageid: 9876543,
  url: 'https://en.wikipedia.org/wiki/Computer_programming',
  thumbnail: {
    source: '',
    width: 0,
    height: 0,
  },
};

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

export const WithThumbnail: Story = {
  args: {
    article: mockArticle,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: mockArticleNoThumbnail,
  },
};
