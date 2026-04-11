import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const sampleArticles: ArticleProps[] = [
  {
    title: 'Mount Everest',
    content:
      "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.",
  },
  {
    title: 'Great Barrier Reef',
    content:
      "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs.",
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Coral_reef_at_palmyra.jpg/800px-Coral_reef_at_palmyra.jpg',
  },
  {
    title: 'Amazon River',
    content:
      'The Amazon River is the largest river in the world by discharge volume of water.',
  },
];

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /mount everest/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /great barrier reef/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /amazon river/i })).toBeVisible();
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
    await expect(canvas.getByRole('list')).toBeVisible();
  },
};

export const WithSelection: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: (article: ArticleProps) => console.log('Selected:', article.title),
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getByRole('listitem', { name: /article: mount everest/i });
    await expect(firstItem).toBeVisible();
    await userEvent.click(firstItem);
    await expect(canvas.getByRole('heading', { name: /mount everest/i })).toBeVisible();
  },
};
