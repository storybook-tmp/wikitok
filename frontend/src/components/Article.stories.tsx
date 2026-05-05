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
    title: 'The History of Computing',
    content:
      'Computing has evolved from mechanical devices to quantum processors over centuries of innovation.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the history of computing/i })
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Deep Ocean Creatures',
    content: 'The deep sea is home to some of the most unusual creatures on Earth.',
    image: 'https://placehold.co/400x300/0f3460/ffffff?text=Ocean',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Encyclopedia Entry',
    content: 'A very detailed article about many things. '.repeat(50),
  },
};
