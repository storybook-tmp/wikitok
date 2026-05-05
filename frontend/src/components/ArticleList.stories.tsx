import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'The Solar System',
    content: 'Our solar system consists of the Sun and everything that orbits it.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Solar_sys8.jpg/800px-Solar_sys8.jpg',
  },
  {
    title: 'Deep Sea Creatures',
    content: 'The deep sea is one of the least explored environments on Earth.',
  },
  {
    title: 'Ancient Rome',
    content: 'Ancient Rome was a civilization that began on the Italian Peninsula.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Rome_Colosseum_interior.jpg/800px-Rome_Colosseum_interior.jpg',
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
    await expect(canvas.getByText('The Solar System')).toBeVisible();
    await expect(canvas.getByText('Deep Sea Creatures')).toBeVisible();
    await expect(canvas.getByText('Ancient Rome')).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('The Solar System')).toBeVisible();
  },
};

export const EmptyList: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    const list = canvas.getByRole('list');
    await expect(list).toBeVisible();
    await expect(list.children.length).toBe(0);
  },
};
