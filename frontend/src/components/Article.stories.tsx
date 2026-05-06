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
      'Computing has evolved from mechanical calculators to modern quantum processors, transforming every aspect of human civilization.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the history of computing/i })
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Deep Ocean Exploration',
    content:
      'The deep ocean remains one of the least explored frontiers on Earth, harboring thousands of undiscovered species.',
    image: 'https://placehold.co/600x400/0e1a2e/ffffff?text=Ocean',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Space Exploration',
    content:
      'From the first satellite launches to modern Mars rovers, space exploration has captured the imagination of billions. The quest to understand our universe continues with ambitious plans for lunar bases, asteroid mining, and eventual human missions to Mars and beyond.',
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'This story verifies that Article.css loaded correctly.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    // .article-container uses padding: 1rem (16px) from Article.css
    await expect(getComputedStyle(article).padding).toBe('16px');
  },
};
