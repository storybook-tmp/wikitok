import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const mockArticles: ArticleProps[] = [
  {
    title: 'The History of Computing',
    content:
      'Computing has evolved from mechanical calculators to modern supercomputers.',
  },
  {
    title: 'Marine Biology',
    content:
      'Marine biology is the scientific study of the biology of marine life.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/ocean.jpg/800px-ocean.jpg',
  },
  {
    title: 'Quantum Mechanics',
    content:
      'Quantum mechanics is a fundamental theory in physics that describes the behavior of nature at and below the scale of atoms.',
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
    await expect(canvas.getByText('The History of Computing')).toBeVisible();
    await expect(canvas.getByText('Marine Biology')).toBeVisible();
    await expect(canvas.getByText('Quantum Mechanics')).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The History of Computing')).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(1);
  },
};

export const EmptyList: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: /articles navigation/i });
    await expect(nav).toBeVisible();
    const list = canvas.getByRole('list');
    await expect(list).toBeVisible();
  },
};
