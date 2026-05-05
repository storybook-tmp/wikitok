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
      'Computing has evolved from simple mechanical calculators to powerful quantum computers over centuries of innovation.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the history of computing/i })
    ).toHaveAttribute('aria-labelledby', 'article-title');
  },
};

export const WithImage: Story = {
  args: {
    title: 'Space Exploration',
    content: 'Humanity has always looked to the stars with wonder and curiosity.',
    image: 'https://via.placeholder.com/600x400',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Encyclopedia Entry',
    content: 'A detailed exploration of this fascinating topic. '.repeat(15),
  },
};
