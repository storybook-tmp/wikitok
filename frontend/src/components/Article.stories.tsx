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
      'Computing has evolved from mechanical calculators to powerful microprocessors over centuries of innovation.',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: /the history of computing/i })
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Marine Biology',
    content:
      'Marine biology is the scientific study of the biology of marine life, organisms in the sea.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Reef.jpg/800px-Reef.jpg',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Quantum Physics',
    content:
      'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science. Classical physics, the collection of theories that existed before the advent of quantum mechanics, describes many aspects of nature at an ordinary scale, while quantum mechanics explains the aspects of nature at small scales.',
  },
};

export const CssCheck: Story = {
  args: {
    title: 'CSS Verification',
    content: 'This story verifies that Article.css loaded correctly.',
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article');
    // Article.css sets .article-container { padding: 1rem } — should resolve to 16px
    await expect(getComputedStyle(article).padding).toBe('16px');
  },
};
