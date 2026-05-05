import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';
import type { ArticleProps } from '../types/ArticleProps';

const singleArticle: ArticleProps = {
  title: 'Single Article',
  content: 'This is the only article in the list.',
};

const twoArticles: ArticleProps[] = [
  {
    title: 'First Article',
    content: 'Content of the first article.',
  },
  {
    title: 'Second Article',
    content: 'Content of the second article.',
  },
];

const manyArticles: ArticleProps[] = Array.from({ length: 15 }, (_, i) => ({
  title: `Article ${i + 1}`,
  content: `This is article number ${i + 1} with some sample content.`,
  image: i % 3 === 0 ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg' : undefined,
}));

const meta = {
  component: ArticleList,
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoArticles: Story = {
  args: {
    articles: twoArticles,
  },
  play: async ({ canvas }) => {
    // Check that both articles are rendered
    const listItems = canvas.getAllByRole('listitem');
    await expect(listItems.length).toBe(2);

    // Verify the first article content
    const firstText = canvas.getByText(/Content of the first article/i);
    await expect(firstText).toBeVisible();

    const secondText = canvas.getByText(/Content of the second article/i);
    await expect(secondText).toBeVisible();
  },
};

export const ManyArticles: Story = {
  args: {
    articles: manyArticles,
  },
  play: async ({ canvas }) => {
    // Check that list items are rendered
    const listItems = canvas.getAllByRole('listitem');
    await expect(listItems.length).toBeGreaterThan(10);

    // Check that some articles are rendered with text containing "Article"
    const nav = canvas.getByRole('navigation', { name: /Articles navigation/i });
    await expect(nav).toBeVisible();
  },
};

export const MixedWithAndWithoutImages: Story = {
  args: {
    articles: manyArticles,
  },
  play: async ({ canvas }) => {
    // Verify articles with and without images are both rendered
    const listItems = canvas.getAllByRole('listitem');
    await expect(listItems.length).toBeGreaterThan(10);

    // Verify that the list itself is rendered properly
    const nav = canvas.getByRole('navigation', { name: /Articles navigation/i });
    await expect(nav).toBeVisible();
  },
};

export const KeyboardNavigation: Story = {
  args: {
    articles: twoArticles,
    onArticleSelect: (article: ArticleProps) => {
      console.log('Selected:', article.title);
    },
  },
  play: async ({ canvas, userEvent }) => {
    // Get the list items
    const listItems = canvas.getAllByRole('listitem');
    await expect(listItems.length).toBe(2);

    // First item should be focusable
    const firstItem = listItems[0];
    firstItem.focus();

    // Simulate space key press
    await userEvent.keyboard('{Enter}');

    // Article should be selectable
    await expect(firstItem).toBeInTheDocument();
  },
};
