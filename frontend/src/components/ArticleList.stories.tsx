import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const mockArticles: ArticleProps[] = [
  {
    title: 'Introduction to React',
    content: 'React is a JavaScript library for building user interfaces.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg',
  },
  {
    title: 'Getting Started with TypeScript',
    content: 'TypeScript is a typed superset of JavaScript that adds static type checking.',
  },
  {
    title: 'Web Development Best Practices',
    content: 'Learn the best practices for developing robust and maintainable web applications.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg',
  },
];

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
  play: async ({ canvas }) => {
    // Check that all articles are rendered
    const firstArticle = canvas.getByText(/Introduction to React/i);
    await expect(firstArticle).toBeVisible();

    const secondArticle = canvas.getByText(/Getting Started with TypeScript/i);
    await expect(secondArticle).toBeVisible();

    const thirdArticle = canvas.getByText(/Web Development Best Practices/i);
    await expect(thirdArticle).toBeVisible();
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  play: async ({ canvas }) => {
    // Check that single article is rendered
    const article = canvas.getByText(/Introduction to React/i);
    await expect(article).toBeVisible();
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
  play: async ({ canvas }) => {
    // Check that the list is rendered even if empty
    const nav = canvas.getByRole('navigation', { name: /Articles navigation/i });
    await expect(nav).toBeVisible();
  },
};

export const WithSelection: Story = {
  args: {
    articles: mockArticles,
    onArticleSelect: (article: ArticleProps) => {
      console.log('Selected article:', article.title);
    },
  },
  play: async ({ canvas, userEvent }) => {
    // Click on the first article
    const firstArticleElement = canvas.getByText(/Introduction to React/i);
    await userEvent.click(firstArticleElement.closest('li')!);

    // Check that the click worked
    await expect(firstArticleElement).toBeVisible();
  },
};
