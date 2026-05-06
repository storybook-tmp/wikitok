import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const sampleArticles: ArticleProps[] = [
  {
    id: 1,
    title: 'Aurora Borealis',
    content:
      'An aurora borealis is a natural light display predominantly seen in high-latitude regions.',
  },
  {
    id: 2,
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across the historical northern borders.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  {
    id: 3,
    title: 'Deep Ocean Exploration',
    content:
      'Deep ocean exploration involves investigating the deepest parts of the ocean using submersible vehicles.',
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
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /great wall of china/i })
    ).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1);
    await expect(
      canvas.getByRole('heading', { name: /aurora borealis/i })
    ).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
    await userEvent.click(items[0]);
  },
};
