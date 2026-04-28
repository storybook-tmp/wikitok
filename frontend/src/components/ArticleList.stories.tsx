import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'Aurora Borealis',
    content:
      "An aurora is a natural light display in Earth's sky, predominantly seen in high-latitude regions.",
  },
  {
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across the northern borders of ancient Chinese states.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  {
    title: 'Jazz',
    content:
      'Jazz is a music genre that originated in the African-American communities of New Orleans.',
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
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    await expect(canvas.getByText('Jazz')).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, args }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    firstItem.click();
    await expect(args.onArticleSelect).toHaveBeenCalledWith(sampleArticles[0]);
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    const list = canvas.getByRole('list');
    await expect(list).toBeVisible();
    const items = canvas.queryAllByRole('listitem');
    await expect(items).toHaveLength(0);
  },
};
