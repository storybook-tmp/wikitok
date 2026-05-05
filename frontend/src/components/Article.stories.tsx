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
    title: 'Quantum Mechanics',
    content:
      'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
    await expect(
      canvas.getByText(/Quantum mechanics is a fundamental theory/),
    ).toBeVisible();
  },
};

export const WithImage: Story = {
  args: {
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
    image: 'https://placehold.co/400x300/0f3460/white?text=Aurora',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(
      canvas.getByAltText('Illustration for article: Aurora Borealis'),
    ).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    title: 'Style Check',
    content: 'Verifying that Article.css styles are loaded correctly.',
  },
  play: async ({ canvas }) => {
    const container = canvas.getByRole('article');
    const style = getComputedStyle(container);
    // article-container has padding: 1rem (16px)
    await expect(style.padding).toBe('16px');
  },
};
