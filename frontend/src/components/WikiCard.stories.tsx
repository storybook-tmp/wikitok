import type { Meta, StoryObj } from '@storybook/react';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticle: WikiArticle = {
  title: 'JavaScript',
  displaytitle: 'JavaScript Programming Language',
  extract: 'JavaScript is a versatile programming language that runs in web browsers and enables interactive web pages. It supports functional and object-oriented programming paradigms.',
  pageid: 12345,
  url: 'https://en.wikipedia.org/wiki/JavaScript',
  thumbnail: {
    source: 'https://via.placeholder.com/640x400?text=JavaScript',
    width: 640,
    height: 400,
  },
};

export const Default: Story = {
  args: {
    article: sampleArticle,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...sampleArticle,
      thumbnail: {
        source: '',
        width: 0,
        height: 0,
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    article: {
      ...sampleArticle,
      displaytitle: 'A Very Long Title That Describes The Topic In Great Detail And Could Span Multiple Lines',
      title: 'Long Title',
    },
  },
};
