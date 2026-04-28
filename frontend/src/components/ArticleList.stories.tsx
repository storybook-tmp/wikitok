import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const mockArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'Quantum Computing',
    content:
      'Quantum computing harnesses quantum mechanics to process information in fundamentally new ways.',
  },
  {
    id: 2,
    title: 'Artificial Intelligence',
    content:
      'AI systems can perform tasks that typically require human intelligence, such as visual perception and decision-making.',
    image: 'https://placehold.co/400x300/333/fff?text=AI',
  },
  {
    id: 3,
    title: 'Blockchain Technology',
    content:
      'Blockchain is a distributed ledger technology that enables secure, transparent, and tamper-proof record-keeping.',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Computing')).toBeVisible();
    await expect(canvas.getByText('Artificial Intelligence')).toBeVisible();
    await expect(canvas.getByText('Blockchain Technology')).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Computing')).toBeVisible();
    await expect(canvas.getByText(/quantum mechanics/i)).toBeVisible();
  },
};

export const EmptyList: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    const list = canvas.getByRole('list');
    await expect(list).toBeVisible();
  },
};
