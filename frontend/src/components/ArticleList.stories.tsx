import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'Machine Learning',
    content:
      'Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience.',
  },
  {
    title: 'Neural Networks',
    content:
      'A neural network is a network or circuit of biological neurons, or in a modern sense, an artificial neural network composed of artificial neurons.',
    image: 'https://placehold.co/400x300/2d3436/ffffff?text=Neural',
  },
  {
    title: 'Data Science',
    content:
      'Data science is an interdisciplinary academic field that uses statistics, scientific computing, and methods to extract knowledge from data.',
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
    await expect(items.length).toBe(3);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};

export const WithSelection: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
  },
};
