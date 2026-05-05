import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles = [
  {
    id: 1,
    title: 'Quantum Computing',
    content: 'Quantum computing uses quantum bits or qubits to perform computations.',
  },
  {
    id: 2,
    title: 'Aurora Borealis',
    content: 'An aurora is a natural light display in Earth\'s sky.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
  },
  {
    id: 3,
    title: 'Deep Ocean Exploration',
    content: 'Deep-sea exploration involves diving to depths beyond 200 meters.',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Computing')).toBeVisible();
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Deep Ocean Exploration')).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstArticle = canvas.getByText('Quantum Computing');
    await userEvent.click(firstArticle);
    await expect(args.onArticleSelect).toHaveBeenCalled();
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    const list = canvas.getByRole('list');
    await expect(list).toBeVisible();
    await expect(list.children).toHaveLength(0);
  },
};
