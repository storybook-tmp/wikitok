import type { Meta, StoryObj } from '@storybook/react-vite';
import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Introduction to React',
    content: 'React is a JavaScript library for building user interfaces with reusable components.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Beautiful Landscape',
    content: 'A serene mountain landscape with snow-capped peaks and pristine valleys.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
};
