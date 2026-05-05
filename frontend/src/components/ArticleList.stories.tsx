import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    id: 1,
    title: 'Aurora Borealis',
    content:
      'An aurora is a natural light display in the sky, predominantly seen in high-latitude regions.',
    image: 'https://placehold.co/600x400/1a1a2e/ffffff?text=Aurora',
  },
  {
    id: 2,
    title: 'Coral Reef',
    content:
      'A coral reef is an underwater ecosystem characterized by reef-building corals.',
    image: 'https://placehold.co/600x400/0e4429/ffffff?text=Coral',
  },
  {
    id: 3,
    title: 'Jazz Music',
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
    onArticleSelect: fn(),
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', {
      name: /articles navigation/i,
    });
    await expect(nav).toBeVisible();
    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [sampleArticles[0]],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
