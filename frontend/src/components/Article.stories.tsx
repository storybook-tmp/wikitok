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
      'Computing has evolved from mechanical calculators to modern quantum computers over several centuries.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the history of computing/i })
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Ocean Exploration',
    content: 'The deep ocean remains one of the least explored areas on Earth.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Clouds_over_the_Atlantic_Ocean.jpg/800px-Clouds_over_the_Atlantic_Ocean.jpg',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Encyclopedia Entry',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};
