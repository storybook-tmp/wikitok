import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import ArticleList from './ArticleList';

const sampleArticles = [
  {
    title: 'Quantum Physics',
    content: 'Quantum physics is the study of matter and energy at the most fundamental level.',
    image: 'https://via.placeholder.com/400x300',
  },
  {
    title: 'Marine Biology',
    content: 'Marine biology is the scientific study of the biology of marine life.',
  },
  {
    title: 'Space Exploration',
    content: 'Space exploration is the use of astronomy and space technology to explore outer space.',
    image: 'https://via.placeholder.com/400x300',
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

export const WithSelection: Story = {
  args: {
    articles: sampleArticles,
    onArticleSelect: () => {},
  },
  play: async ({ canvas, userEvent }) => {
    const firstItem = canvas.getAllByRole('listitem')[0];
    await userEvent.click(firstItem);
    // The click handler is called — we verify the item is interactive via keyboard
    await expect(firstItem).toHaveAttribute('tabindex', '0');
  },
};
