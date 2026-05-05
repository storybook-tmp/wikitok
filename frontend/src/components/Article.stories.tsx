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
      'The Great Barrier Reef is the world\'s largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the great barrier reef/i })
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
    image: 'https://via.placeholder.com/600x400/0d1b2a/ffffff?text=Aurora',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Encyclopedia of Philosophy',
    content:
      'Philosophy is the systematized study of general and fundamental questions, such as those about existence, reason, knowledge, values, mind, and language. It is a rational and critical inquiry that reflects on its own methods and assumptions. Historically, many of the individual sciences, such as physics and psychology, formed part of philosophy.',
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Style Verification',
    content: 'This story verifies that Article.css loaded correctly.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    // .article-container has padding: 1rem (16px) — fails if Article.css did not load.
    await expect(getComputedStyle(article).padding).toBe('16px');
  },
};
