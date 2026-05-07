import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { articleListItems } from '../../.storybook/mock-data';
import ArticleList from './ArticleList';

const meta = {
  component: ArticleList,
  parameters: {
    layout: 'padded',
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoArticles: Story = {
  args: {
    articles: articleListItems,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('navigation', { name: /Articles navigation/i }),
    ).toBeVisible();
    await expect(canvas.getByText('Storybook Runtime')).toBeVisible();
    await expect(canvas.getByText('Browser Testing')).toBeVisible();
  },
};

export const ClickSelection: Story = {
  args: {
    articles: articleListItems,
    onArticleSelect: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const firstArticle = canvas.getByRole('listitem', {
      name: /Article: Storybook Runtime/i,
    });

    if (!args.onArticleSelect) {
      throw new Error('Expected onArticleSelect to be configured');
    }

    await userEvent.click(firstArticle);
    await expect(args.onArticleSelect).toHaveBeenCalledWith(
      articleListItems[0],
    );
  },
};

export const KeyboardSelection: Story = {
  args: {
    articles: articleListItems,
    onArticleSelect: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const secondArticle = canvas.getByRole('listitem', {
      name: /Article: Browser Testing/i,
    });

    if (!args.onArticleSelect) {
      throw new Error('Expected onArticleSelect to be configured');
    }

    secondArticle.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onArticleSelect).toHaveBeenCalledWith(
      articleListItems[1],
    );
  },
};

