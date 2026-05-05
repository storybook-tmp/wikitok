import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleArticles = [
  {
    id: 1,
    title: 'Introduction to Astronomy',
    content: 'Astronomy is a natural science that studies celestial objects and phenomena.',
  },
  {
    id: 2,
    title: 'Deep Sea Exploration',
    content: 'Deep-sea exploration is the investigation of physical, chemical, and biological conditions on the sea bed.',
    image: 'https://placehold.co/400x300/006994/white?text=Deep+Sea',
  },
  {
    id: 3,
    title: 'The Renaissance Period',
    content: 'The Renaissance was a period in European history marking the transition from the Middle Ages to modernity.',
  },
];

export const Default: Story = {
  args: {
    articles: sampleArticles,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation')).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    await expect(canvas.getByText('Introduction to Astronomy')).toBeVisible();
  },
};

export const WithSelectionHandler: Story = {
  args: {
    articles: sampleArticles,
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
    articles: [sampleArticles[0]],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1);
    await expect(canvas.getByText('Introduction to Astronomy')).toBeVisible();
  },
};
