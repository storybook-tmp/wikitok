import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: [
      { id: 1, title: 'First Article', content: 'Content of the first article about science and discovery.' },
      { id: 2, title: 'Second Article', content: 'Content of the second article about history and culture.' },
      { id: 3, title: 'Third Article', content: 'Content of the third article about technology and innovation.' },
    ],
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [
      { id: 1, title: 'Only Article', content: 'This is the only article in the list.' },
    ],
  },
};
