import type { Meta, StoryObj } from '@storybook/react';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Introduction to React Hooks',
    content: 'React Hooks allow you to use state and other React features without writing a class. Learn the basics of useState and useEffect.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Beautiful Landscape Photography',
    content: 'Discover the art of landscape photography with our comprehensive guide. Learn composition, lighting, and post-processing techniques.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Understanding Web Performance',
    content: 'Web performance is critical for user experience and business metrics. This article explores core web vitals, including Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). We will examine best practices for optimizing these metrics, including image optimization, code splitting, lazy loading, and caching strategies. By implementing these techniques, you can significantly improve your application\'s performance and user satisfaction.',
  },
};
