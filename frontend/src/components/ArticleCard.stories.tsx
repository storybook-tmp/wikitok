import type { Meta, StoryObj } from '@storybook/react';
import ArticleCard from './ArticleCard';

const meta = {
  title: 'AI Generated/Complex/ArticleCard',
  component: ArticleCard,
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive guide covers everything you need to get started building amazing web applications.',
    imageUrl: 'https://via.placeholder.com/400x300?text=Web+Development',
    isLiked: false,
    onLike: (liked) => console.log('Like toggled:', liked),
    onShare: () => console.log('Share clicked'),
  },
};

export const Liked: Story = {
  args: {
    title: 'Advanced React Patterns',
    description: 'Explore advanced React patterns and best practices for building scalable and maintainable applications.',
    imageUrl: 'https://via.placeholder.com/400x300?text=React+Patterns',
    isLiked: true,
    onLike: (liked) => console.log('Like toggled:', liked),
    onShare: () => console.log('Share clicked'),
  },
};

export const NoImage: Story = {
  args: {
    title: 'TypeScript Guide',
    description: 'A comprehensive guide to TypeScript, covering type annotations, interfaces, generics, and more.',
    isLiked: false,
    onLike: (liked) => console.log('Like toggled:', liked),
    onShare: () => console.log('Share clicked'),
  },
};
