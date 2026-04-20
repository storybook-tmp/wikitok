import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ArticleList from './ArticleList';

const articles = [
  {
    id: 'ada-lovelace',
    title: 'Ada Lovelace',
    content:
      'Known for notes on the analytical engine that described one of the earliest computer programs.',
    image: '/wiki-logo.svg',
  },
  {
    id: 'apollo-11',
    title: 'Apollo 11',
    content:
      'The spaceflight that first landed humans on the Moon and returned them safely to Earth.',
  },
];

const meta = {
  component: ArticleList,
  args: {
    articles,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultList: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('navigation', { name: /articles navigation/i })).toBeVisible();
    await expect(canvas.getAllByRole('article')).toHaveLength(2);
    await expect(canvas.getByRole('heading', { name: /ada lovelace/i })).toBeVisible();
  },
};

export const ClickSelection: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('listitem', { name: /article: apollo 11/i }));

    await expect(args.onArticleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Apollo 11',
      })
    );
  },
};

export const KeyboardSelection: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const item = canvas.getByRole('listitem', { name: /article: ada lovelace/i });

    item.focus();
    await userEvent.keyboard('{Enter}');

    await expect(args.onArticleSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Ada Lovelace',
      })
    );
  },
};
