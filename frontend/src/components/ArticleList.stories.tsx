import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    id: 1,
    title: 'The Theory of Relativity',
    content:
      'Albert Einstein\'s theory of relativity is one of the most important scientific discoveries of the 20th century.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/800px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
  },
  {
    id: 2,
    title: 'Quantum Mechanics',
    content:
      'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.',
  },
  {
    id: 3,
    title: 'The Great Wall of China',
    content:
      'The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/800px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
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
    await expect(canvas.getByText('The Theory of Relativity')).toBeVisible();
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
    await expect(canvas.getByText('The Great Wall of China')).toBeVisible();
  },
};

export const WithSelection: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstItem = canvas.getByLabelText('Article: The Theory of Relativity');
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledOnce();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
    await expect(canvas.getByText('The Theory of Relativity')).toBeVisible();
  },
};
