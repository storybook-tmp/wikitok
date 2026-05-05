import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';
import '../styles/Article.css';

const sampleArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'Quantum Computing',
    content:
      'Quantum computing is a type of computation that harnesses quantum mechanical phenomena such as superposition, interference, and entanglement.',
  },
  {
    id: 2,
    title: 'Machine Learning',
    content:
      'Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/ml.jpg/800px-ml.jpg',
  },
  {
    id: 3,
    title: 'Blockchain Technology',
    content:
      'A blockchain is a distributed ledger with growing lists of records that are securely linked together via cryptographic hashes.',
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
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('navigation', { name: /articles navigation/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /quantum computing/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /machine learning/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /blockchain technology/i }),
    ).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /quantum computing/i }),
    ).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(
      canvas.getByRole('heading', { name: /quantum computing/i }),
    ).toBeVisible();
  },
};
