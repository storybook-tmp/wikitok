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
    title: 'Solar System',
    content:
      'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it.',
  },
  {
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across the historical northern borders of ancient Chinese states.',
  },
  {
    title: 'Jazz',
    content:
      'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana.',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Solar System')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    await expect(canvas.getByText('Jazz')).toBeVisible();
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstArticle = canvas.getByText('Solar System');
    await userEvent.click(firstArticle);
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
    await expect(list.children.length).toBe(0);
  },
};
