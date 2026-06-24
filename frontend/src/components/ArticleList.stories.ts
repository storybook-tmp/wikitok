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
    articles: [
      {
        id: 1,
        title: 'Aurora Borealis',
        content: 'Colorful ribbons of light appear when solar particles hit Earth’s atmosphere.',
      },
      {
        id: 2,
        title: 'Deep Sea Life',
        content: 'Many deep sea creatures make their own light to hunt, hide, and communicate.',
        image:
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 3,
        title: 'Ancient Libraries',
        content: 'Libraries preserved knowledge across generations long before the printing press.',
      },
    ],
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleArticle: Story = {
  args: {
    articles: [
      {
        id: 'featured',
        title: 'Featured Story',
        content: 'A focused single-item list is useful when highlighting one recommended article.',
      },
    ],
  },
};
