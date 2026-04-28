import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    id: 1,
    title: 'Aurora Borealis',
    content:
      "A natural light display in Earth's sky, predominantly seen in high-latitude regions.",
  },
  {
    id: 2,
    title: 'Great Wall of China',
    content:
      'A series of fortifications built across the historical northern borders of ancient Chinese states.',
  },
  {
    id: 3,
    title: 'Octopus',
    content: 'A soft-bodied, eight-limbed mollusc of the order Octopoda.',
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
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    await expect(canvas.getByText('Octopus')).toBeVisible();
    const listItems = canvas.getAllByRole('listitem');
    await expect(listItems).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    const listItems = canvas.getAllByRole('listitem');
    await expect(listItems).toHaveLength(1);
  },
};

export const WithSelectHandler: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await expect(firstItem).toBeVisible();
    await userEvent.click(firstItem);
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
  },
};
