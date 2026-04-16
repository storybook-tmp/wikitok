import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticles = [
  {
    title: 'Introduction to React',
    content: 'React is a JavaScript library for building user interfaces with reusable components.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=300&h=200&fit=crop',
  },
  {
    title: 'Web Development Basics',
    content: 'Learn the fundamentals of HTML, CSS, and JavaScript for web development.',
  },
  {
    title: 'Advanced TypeScript',
    content: 'Master TypeScript type system, generics, and advanced patterns for type-safe development.',
  },
];

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
};
