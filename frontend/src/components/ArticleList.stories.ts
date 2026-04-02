import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  args: {
    onArticleSelect: fn(),
    articles: [
      {
        id: 1,
        title: 'Mountains at Dawn',
        content: 'A short read about how early light changes the color of alpine landscapes.',
        image:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 2,
        title: 'Designing Better Reading Flows',
        content: 'Thoughtful spacing, predictable rhythm, and strong headings improve comprehension.',
      },
    ],
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: {
    articles: [
      {
        id: 'featured',
        title: 'Featured Essay',
        content: 'A focused card layout works well when there is only one highlighted article.',
      },
    ],
  },
};
