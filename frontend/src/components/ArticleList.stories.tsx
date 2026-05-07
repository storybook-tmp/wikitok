import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import ArticleList from './ArticleList';

const articles = [
  {
    title: 'Ada Lovelace',
    content:
      'Notes on the Analytical Engine included what is often considered the first computer program.',
    image: '/wiki-logo.svg',
  },
  {
    title: 'Grace Hopper',
    content:
      'A compiler pioneer whose work shaped practical programming languages.',
    image: '/wiki-logo.svg',
  },
];

const meta = {
  component: ArticleList,
  tags: ['ai-generated'],
  args: {
    articles,
    onArticleSelect: fn(),
  },
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('navigation', { name: /articles navigation/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: /ada lovelace/i }),
    ).toBeVisible();
  },
};

export const Selectable: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText(/article: ada lovelace/i));

    await expect(args.onArticleSelect).toHaveBeenCalledWith(articles[0]);
  },
};

