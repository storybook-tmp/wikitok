import type { Meta, StoryObj } from '@storybook/react-vite';

import '../styles/Article.css';

import Article from './Article';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Discovering Deep-Sea Life',
    content:
      'Marine biologists have identified several new species thriving near hydrothermal vents, highlighting how resilient life can be in extreme environments.',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {};

export const WithImage: Story = {
  args: {
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  },
};
