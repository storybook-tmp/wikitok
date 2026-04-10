import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { articleStories } from '../../.storybook/story-fixtures';
import '../styles/Article.css';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  args: {
    articles: articleStories,
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('navigation', { name: /articles navigation/i }),
    ).toBeVisible();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
};

export const ClickSelection: Story = {
  args: {
    onArticleSelect: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('listitem', { name: /article: aurora forest/i }),
    );

    await expect(args.onArticleSelect).toHaveBeenCalledTimes(1);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(articleStories[0]);
  },
};

export const KeyboardSelection: Story = {
  args: {
    onArticleSelect: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(
      canvas.getByRole('listitem', { name: /article: aurora forest/i }),
    ).toBeVisible();

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');

    await expect(args.onArticleSelect).toHaveBeenCalledTimes(1);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(articleStories[0]);
  },
};
