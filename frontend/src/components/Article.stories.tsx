import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Exploring Deep-Sea Ecosystems',
    content:
      'Hydrothermal vents support unique ecosystems powered by chemosynthesis instead of sunlight, making them some of the most unusual habitats on Earth.',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=900&q=80',
  },
};

export const TextOnly: Story = {
  args: {
    title: 'Urban Beekeeping Basics',
    content:
      'Small rooftop apiaries can support local pollinators when they are placed thoughtfully, watered regularly, and managed with nearby neighbors in mind.',
    image: undefined,
  },
};
