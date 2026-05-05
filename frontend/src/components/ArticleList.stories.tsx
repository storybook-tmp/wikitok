import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const mockArticles = [
  {
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in Earth\'s sky, predominantly seen in high-latitude regions.',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Aurora',
  },
  {
    title: 'Coral Reef',
    content:
      'A coral reef is an underwater ecosystem characterized by reef-building corals.',
    image: 'https://placehold.co/400x300/0e4429/ffffff?text=Coral',
  },
  {
    title: 'Jazz Music',
    content:
      'Jazz is a music genre that originated in the African-American communities of New Orleans.',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
  args: {
    articles: mockArticles,
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: /articles navigation/i });
    await expect(nav).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
  },
};

export const WithSelectHandler: Story = {
  args: {
    onArticleSelect: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    await expect(args.onArticleSelect).toHaveBeenCalledOnce();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
};

export const EmptyList: Story = {
  args: {
    articles: [],
  },
};
