import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  args: {
    title: 'The Secret Life of Tides',
    content:
      'Coastal ecosystems depend on tidal rhythms that shape habitats, food cycles, and migration routes across the shoreline.',
  },
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
  },
};
