import type { Meta, StoryObj } from '@storybook/react';
import ArticleList from './ArticleList';
import '../styles/Article.css';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'The History of Computing',
        content: 'Computing has evolved from mechanical calculators to modern quantum computers.',
      },
      {
        id: 2,
        title: 'Space Exploration',
        content: 'Humanity has been exploring space since the launch of Sputnik in 1957.',
      },
      {
        id: 3,
        title: 'Marine Biology',
        content: 'The ocean covers over 70% of the Earth and is home to millions of species.',
      },
    ],
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [
      {
        id: 1,
        title: 'Only Article',
        content: 'This list contains just one article.',
      },
    ],
  },
};
