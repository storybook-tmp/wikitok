import type { Meta, StoryObj } from '@storybook/react';
import ArticleList from './ArticleList';
import { ArticleProps } from '../types/ArticleProps';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const singleArticle: ArticleProps[] = [
  {
    id: '1',
    title: 'Getting Started with TypeScript',
    content: 'Learn the fundamentals of TypeScript and how it can improve your development experience.',
  },
];

const multipleArticles: ArticleProps[] = [
  {
    id: '1',
    title: 'React Best Practices',
    content: 'Explore best practices for building React applications with clean, maintainable code.',
  },
  {
    id: '2',
    title: 'Understanding Redux',
    content: 'A comprehensive guide to Redux state management and how to structure your application.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'CSS Grid Mastery',
    content: 'Master CSS Grid layout with practical examples and real-world use cases.',
  },
];

export const SingleArticle: Story = {
  args: {
    articles: singleArticle,
  },
};

export const MultipleArticles: Story = {
  args: {
    articles: multipleArticles,
  },
};

export const EmptyList: Story = {
  args: {
    articles: [],
  },
};
