import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'Artificial Intelligence',
    content:
      'AI is intelligence demonstrated by machines, as opposed to natural intelligence displayed by animals and humans.',
  },
  {
    title: 'Machine Learning',
    content:
      'Machine learning is a subset of artificial intelligence that provides systems the ability to learn from data.',
    image: 'https://placehold.co/400x300/2a1a2e/ffffff?text=ML',
  },
  {
    title: 'Neural Networks',
    content:
      'Neural networks are computing systems inspired by biological neural networks that constitute animal brains.',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { articles: sampleArticles },
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: { articles: [sampleArticles[0]] },
};

export const WithSelectHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await expect(firstItem).toHaveAttribute('tabindex', '0');
  },
};
