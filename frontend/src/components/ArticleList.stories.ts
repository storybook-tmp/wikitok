import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import '../styles/Article.css';

import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  args: {
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadingQueue: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'City Gardens Are Transforming Rooftops',
        content:
          'Urban farming projects are helping residents turn unused rooftops into productive green spaces.',
        image:
          'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 2,
        title: 'How Libraries Became Community Hubs',
        content:
          'Many public libraries now host workshops, maker spaces, and after-school programs alongside traditional collections.',
      },
    ],
  },
};

export const CompactList: Story = {
  args: {
    articles: [
      {
        id: 'a',
        title: 'Arctic Wildlife Migration',
        content: 'Scientists are using satellite tags to better understand migration changes.',
      },
      {
        id: 'b',
        title: 'Restoring Wetland Habitats',
        content: 'Conservation teams are rebuilding wetlands to reduce flooding and improve biodiversity.',
      },
      {
        id: 'c',
        title: 'Community Solar Projects',
        content: 'Neighborhood cooperatives are making solar access more affordable for renters.',
      },
    ],
  },
};
