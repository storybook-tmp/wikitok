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
    content: 'Computing has evolved from mechanical calculators to modern quantum processors.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article')).toHaveAttribute(
      'aria-labelledby',
      'article-title'
    );
  },
};

export const WithImage: Story = {
  args: {
    title: 'Marine Biology',
    content: 'The ocean is home to an incredible diversity of life forms.',
    image: 'https://placehold.co/600x400/0a2a3a/ffffff?text=Ocean',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Encyclopedia Entry',
    content: 'Lorem ipsum dolor sit amet. '.repeat(30),
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Style Verification',
    content: 'Checking that Article.css loaded correctly.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    // Article.css: .article-container { padding: 1rem } = 16px
    await expect(getComputedStyle(article).padding).toBe('16px');
  },
};
