import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';
import '../styles/Article.css';

const mockArticles = [
  {
    id: 1,
    title: 'Theory of Relativity',
    content: 'The theory of relativity by Albert Einstein.',
  },
  {
    id: 2,
    title: 'Great Barrier Reef',
    content: "The world's largest coral reef system.",
  },
  {
    id: 3,
    title: 'Apollo 11',
    content: 'The first spaceflight to land humans on the Moon.',
  },
];

const meta: Meta<typeof ArticleList> = {
  component: ArticleList,
  tags: ['ai-generated'],
};

export default meta;
type Story = StoryObj<typeof ArticleList>;

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Theory of Relativity')).toBeVisible();
    await expect(canvas.getByText('Great Barrier Reef')).toBeVisible();
    await expect(canvas.getByText('Apollo 11')).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
    await userEvent.click(items[0]);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(mockArticles[0]);
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
