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
    title: 'The Solar System',
    content:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the solar system/i })
    ).toHaveAttribute('aria-labelledby', 'article-title');
  },
};

export const WithImage: Story = {
  args: {
    title: 'Northern Lights',
    content: 'An aurora is a natural light display in the sky.',
    image: 'https://placehold.co/600x400/333/white?text=Aurora',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Philosophy',
    content:
      'Philosophy is the systematized study of general and fundamental questions, such as those about existence, reason, knowledge, values, mind, and language. It is a rational and critical inquiry that reflects on its own methods and assumptions.',
  },
};
