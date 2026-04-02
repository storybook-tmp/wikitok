import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'The Joy of Small Components',
    content:
      'Small, focused components are easier to understand, test, and reuse across a product.',
  },
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
};
