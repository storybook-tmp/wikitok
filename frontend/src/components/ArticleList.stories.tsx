import type { Meta, StoryObj } from '@storybook/react-vite';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const mockArticles: ArticleProps[] = [
  {
    title: 'Introduction to React',
    content: 'React is a JavaScript library for building user interfaces with reusable components.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=300&h=200&fit=crop',
  },
  {
    title: 'Advanced TypeScript',
    content: 'Learn advanced TypeScript patterns and techniques for building scalable applications.',
  },
  {
    title: 'Web Performance Tips',
    content: 'Optimize your web application for better performance and user experience.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=300&h=200&fit=crop',
  },
];

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

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
