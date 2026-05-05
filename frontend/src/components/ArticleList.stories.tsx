import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    id: 1,
    title: 'Quantum Computing',
    content:
      'Quantum computing is a type of computation that harnesses quantum mechanical phenomena.',
  },
  {
    id: 2,
    title: 'Machine Learning',
    content:
      'Machine learning is a subset of artificial intelligence that provides systems the ability to learn.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/800px-Scikit_learn_logo_small.svg.png',
  },
  {
    id: 3,
    title: 'Blockchain Technology',
    content:
      'A blockchain is a distributed ledger with growing lists of records that are securely linked together.',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
  args: {
    articles: sampleArticles,
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
  },
};

export const WithSelectHandler: Story = {
  args: {
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
