import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'centered',
  },
  args: {
    content:
      'Explore a short summary that feels readable in isolation and still leaves room for the full article experience.',
    title: 'Storybook and Component-Driven UI',
  },
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {};

export const WithImage: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    title: 'Visual article presentation',
  },
};
