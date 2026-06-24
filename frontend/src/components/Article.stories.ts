import type { Meta, StoryObj } from '@storybook/react';
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
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces with reusable components.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Web Development Guide',
    content: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
  },
};
