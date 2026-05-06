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
      'The history of computing hardware covers the developments from early simple devices to aid calculation to modern day computers.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article')
    ).toHaveAccessibleName('The History of Computing');
  },
};

export const WithImage: Story = {
  args: {
    title: 'Space Exploration',
    content:
      'Space exploration is the use of astronomy and space technology to explore outer space.',
    image: 'https://placehold.co/600x400/1a1a2e/ffffff?text=Space',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Philosophy',
    content:
      'Philosophy is the systematized study of general and fundamental questions, such as those about existence, reason, knowledge, values, mind, and language. It is a rational and critical inquiry that reflects on its own methods and assumptions. Historically, many of the individual sciences, such as physics and psychology, formed part of philosophy.',
  },
};
