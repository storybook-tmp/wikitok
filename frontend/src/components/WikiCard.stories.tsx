import type { Meta, StoryObj } from '@storybook/react';
import { WikiCard } from './WikiCard';
import type { WikiArticle } from './WikiCard';

const sampleArticle: WikiArticle = {
  title: 'Aurora Borealis',
  displaytitle: 'Aurora Borealis',
  extract:
    'An aurora, also commonly known as the northern lights or southern lights, is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
  pageid: 2345,
  url: 'https://en.wikipedia.org/wiki/Aurora',
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
    width: 800,
    height: 600,
  },
};

const meta = {
  title: 'AI Generated/Complex/WikiCard',
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: sampleArticle,
  },
};

export const WithoutThumbnail: Story = {
  args: {
    article: {
      ...sampleArticle,
      pageid: 9999,
      title: 'Mathematics',
      displaytitle: 'Mathematics',
      extract: 'Mathematics is an area of knowledge that includes the study of numbers, formulas, shapes, and related structures.',
      thumbnail: undefined as unknown as WikiArticle['thumbnail'],
    },
  },
};
