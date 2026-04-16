import type { Meta, StoryObj } from '@storybook/react';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const meta = {
  title: 'AI Generated/Medium/ArticleList',
  component: ArticleList,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArticles: ArticleProps[] = [
  {
    title: 'Introduction to React',
    content: 'React is a JavaScript library for building user interfaces with reusable components. It uses a declarative programming style.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
  },
  {
    title: 'State Management Best Practices',
    content: 'Managing state properly is crucial for maintaining scalable React applications. Learn about different state management patterns and libraries.',
  },
  {
    title: 'Building Accessible Components',
    content: 'Accessibility is an important aspect of web development. Create inclusive applications that work for everyone.',
    image: 'https://images.unsplash.com/photo-1633356713697-2dc6b87b72d9?w=400&h=300&fit=crop',
  },
];

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
};
