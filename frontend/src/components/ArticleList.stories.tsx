import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  { id: 1, title: 'Quantum Computing', content: 'Quantum computing harnesses quantum mechanics to process information.' },
  { id: 2, title: 'Neural Networks', content: 'Neural networks are computing systems inspired by biological neural networks.', image: 'https://placehold.co/400x300/2a1a3e/ffffff?text=AI' },
  { id: 3, title: 'Blockchain', content: 'A blockchain is a distributed ledger technology.' },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { articles: mockArticles },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: { articles: [mockArticles[0]] },
};

export const WithSelectHandler: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const items = canvas.getAllByRole('listitem');
    await userEvent.click(items[0]);
    await expect(items[0]).toHaveAttribute('aria-label', 'Article: Quantum Computing');
  },
};
