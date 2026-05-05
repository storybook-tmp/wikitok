import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
  },
  {
    title: 'Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications built across northern borders of ancient Chinese states.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
  },
  {
    title: 'Octopus',
    content:
      'An octopus is a soft-bodied, eight-limbed mollusc of the order Octopoda.',
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
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
    await expect(canvas.getByText('Aurora Borealis')).toBeVisible();
    await expect(canvas.getByText('Great Wall of China')).toBeVisible();
    await expect(canvas.getByText('Octopus')).toBeVisible();
  },
};

export const WithSelection: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, args, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledOnce();
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
