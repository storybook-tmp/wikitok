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
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Polarlicht_2.jpg/800px-Polarlicht_2.jpg',
  },
  {
    id: 2,
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across northern borders of ancient Chinese states.',
  },
  {
    id: 3,
    title: 'Jazz Music',
    content:
      'Jazz is a music genre that originated in the African-American communities of New Orleans.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Jazz_Musicians.jpg/800px-Jazz_Musicians.jpg',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    await expect(canvas.getByText('Jazz Music')).toBeVisible();
  },
};

export const WithSelection: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, args, userEvent }) => {
    const firstArticle = canvas.getByLabelText('Article: Aurora Borealis');
    await userEvent.click(firstArticle);
    await expect(args.onArticleSelect).toHaveBeenCalledOnce();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
  },
};
