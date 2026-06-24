import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import type { ArticleProps } from '../types/ArticleProps';

import ArticleList from './ArticleList';

const sampleArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'Quiet cities at sunrise',
    content:
      'A short reflection on how early mornings change the mood of familiar streets.',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Sketching interface ideas',
    content:
      'Loose drafts help teams explore more directions before committing to polished UI.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  },
];

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};
