import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';

const meta = {
  component: Article,
  tags: ['ai-generated'],
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'The Great Barrier Reef',
    content:
      'The Great Barrier Reef is the world\'s largest coral reef system, stretching over 2,300 kilometres.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the great barrier reef/i })
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Northern Lights',
    content: 'The aurora borealis is a natural light display in the sky.',
    image: 'https://placehold.co/600x400/0f3460/ffffff?text=Aurora',
  },
};

export const LongContent: Story = {
  args: {
    title: 'History of Science',
    content:
      'The history of science covers the development of science from ancient times to the present. It encompasses a broad range of topics from the early observations of nature and the universe through the development of the scientific method to the modern era of specialization and technological advancement. The earliest roots of science can be traced to Ancient Egypt and Mesopotamia.',
  },
};
