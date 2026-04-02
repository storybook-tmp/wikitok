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
    title: 'The Wonders of Technology',
    content: 'Technology has revolutionized the way we live and work. From communication to transportation, innovation has transformed every aspect of our society.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Beautiful Sunset',
    content: 'A stunning sunset over the ocean, painting the sky with warm colors and creating a peaceful atmosphere.',
    image: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400&h=300&fit=crop',
  },
};
