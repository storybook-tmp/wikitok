import type { Meta, StoryObj } from '@storybook/react-vite';

import Article from './Article';
import '../styles/Article.css';

const meta = {
  title: 'AI Generated/Simple/Article',
  component: Article,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    title: 'The origins of Wikipedia',
    content:
      'Wikipedia began as an experiment in collaborative knowledge sharing and grew into one of the most visited reference sites on the web.',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    image:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400"><rect width="100%25" height="100%25" fill="%23111827"/><text x="50%25" y="50%25" fill="%23ffffff" font-family="Arial" font-size="36" text-anchor="middle">Featured article image</text></svg>',
  },
};
