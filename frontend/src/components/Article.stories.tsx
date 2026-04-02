import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Aurora over the fjord',
    content:
      'A cold-weather weather system swept over the coast overnight, leaving a clear sky, bright stars, and a vivid green ribbon of light over the water.',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {};

export const WithImage: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1517821099601-1a1a92d4481e?auto=format&fit=crop&w=900&q=80',
  },
};
