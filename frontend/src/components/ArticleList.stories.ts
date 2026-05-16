import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  tags: ['autodocs'],
  args: {
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles: ArticleProps[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'Learn the basics of React and build your first component.',
    image: 'https://via.placeholder.com/400x300',
  },
  {
    id: '2',
    title: 'Understanding State Management',
    content: 'Explore different patterns for managing application state.',
  },
];

export const WithArticles: Story = {
  args: {
    articles: sampleArticles,
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
