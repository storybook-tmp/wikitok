import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import type { ArticleProps } from '../types/ArticleProps';
import ArticleList from './ArticleList';

const sampleArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'Mangroves at Midnight',
    content:
      'A quiet exploration of tidal forests, bioluminescent plankton, and the animals that thrive where land meets sea.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Volcanic Gardens',
    content:
      'Fresh lava fields can transform into layered ecosystems once mosses, insects, and seabirds begin the recovery cycle.',
  },
];

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};
