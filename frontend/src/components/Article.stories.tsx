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
    title: 'The Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /great wall/i })
    ).toHaveAttribute('aria-labelledby', 'article-title');
  },
};

export const WithImage: Story = {
  args: {
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
    image: 'https://via.placeholder.com/600x400',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Quantum Computing',
    content:
      'Quantum computing is a type of computation whose operations can harness the phenomena of quantum mechanics, such as superposition, interference, and entanglement. Devices that perform quantum computations are known as quantum computers. Though current quantum computers may be too small to outperform usual (classical) computers for practical applications, larger realizations are believed to be capable of solving certain computational problems.',
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'Verifying that Article.css styles are loaded.',
  },
  play: async ({ canvas }) => {
    // Article.css sets .article-content { line-height: 1.6 } — fails if CSS did not load
    const content = canvas.getByText(/verifying that article\.css/i);
    await expect(getComputedStyle(content).lineHeight).toBe('25.6px');
  },
};
