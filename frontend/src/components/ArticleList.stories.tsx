import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    id: 1,
    title: 'Quantum Mechanics',
    content: 'Quantum mechanics is a fundamental theory in physics.',
  },
  {
    id: 2,
    title: 'Aurora Borealis',
    content: 'An aurora is a natural light display in Earth\'s sky.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
  },
  {
    id: 3,
    title: 'Great Wall of China',
    content: 'The Great Wall of China is a series of fortifications.',
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
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstArticle = canvas.getByText('Quantum Mechanics');
    await expect(firstArticle).toBeVisible();
    await userEvent.click(firstArticle);
    await expect(args.onArticleSelect).toHaveBeenCalled();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
  },
};
