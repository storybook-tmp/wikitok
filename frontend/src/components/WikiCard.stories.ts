import type { Meta, StoryObj } from '@storybook/react-vite';
import { WikiCard, WikiArticle } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
  tags: ['autodocs'],
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticle: WikiArticle = {
  title: 'React (JavaScript library)',
  displaytitle: 'React',
  extract: 'React is a JavaScript library for building user interfaces using a component based approach.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/React',
  thumbnail: {
    source: 'https://via.placeholder.com/800x600',
    width: 800,
    height: 600,
  },
};

const articleWithoutThumbnail: WikiArticle = {
  title: 'Web Development',
  displaytitle: 'Web Development',
  extract: 'Web development refers to the work involved in developing websites and applications for the internet.',
  pageid: 54321,
  url: 'https://en.wikipedia.org/wiki/Web_development',
  thumbnail: {
    source: '',
    width: 0,
    height: 0,
  },
};

export const WithThumbnail: Story = {
  args: {
    article: sampleArticle,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: articleWithoutThumbnail,
  },
};
