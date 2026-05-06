import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Article from './Article';
import '../styles/Article.css';

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
      'The history of computing is longer than the history of computing hardware and modern computing technology and includes the history of methods intended for pen and paper.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the history of computing/i })
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Space Exploration',
    content:
      'Space exploration is the use of astronomy and space technology to explore outer space.',
    image: 'https://placehold.co/600x400/0d1b2a/ffffff?text=Space',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Philosophy',
    content:
      'Philosophy is the systematized study of general and fundamental questions, such as those about existence, reason, knowledge, values, mind, and language. It requires sustained inquiry into the conditions and implications of concepts, methods, and conclusions across diverse domains of thought.',
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'Verifying that Article.css is loaded correctly.',
  },
  play: async ({ canvas }) => {
    const content = canvas.getByText('Verifying that Article.css is loaded correctly.');
    // Article.css sets .article-content { line-height: 1.6 } — fails if CSS did not load
    await expect(getComputedStyle(content).lineHeight).not.toBe('normal');
  },
};
