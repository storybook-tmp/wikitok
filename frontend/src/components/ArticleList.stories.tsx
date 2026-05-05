import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'Quantum Computing',
    content: 'Quantum computing uses quantum-mechanical phenomena such as superposition and entanglement to perform computation.',
  },
  {
    title: 'Machine Learning',
    content: 'Machine learning is a subset of artificial intelligence that provides systems the ability to learn from data.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kernel_Machine.svg/800px-Kernel_Machine.svg.png',
  },
  {
    title: 'Blockchain Technology',
    content: 'A blockchain is a distributed ledger with growing lists of records that are securely linked together via cryptographic hashes.',
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

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};

export const WithSelection: Story = {
  args: {
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    // Verifies the list item is interactive/clickable (no error = success)
    await expect(firstItem).toHaveAttribute('tabindex', '0');
  },
};
