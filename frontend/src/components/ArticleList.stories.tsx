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
    title: 'Quantum Mechanics',
    content: 'Quantum mechanics is a fundamental theory in physics.',
  },
  {
    title: 'Aurora Borealis',
    content: 'An aurora is a natural light display in Earth\'s sky.',
  },
  {
    title: 'Great Wall of China',
    content: 'The Great Wall of China is a series of fortifications.',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstItem = canvas.getByLabelText('Article: Quantum Mechanics');
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: /articles/i });
    await expect(nav).toBeVisible();
    const list = canvas.getByRole('list');
    await expect(list.children.length).toBe(0);
  },
};
