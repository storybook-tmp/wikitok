import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { primaryArticle, serializeLikedArticles } from '../../.storybook/wiki-fixtures';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
  args: {
    article: primaryArticle,
  },
  render: (args) => (
    <div className="bg-black">
      <WikiCard {...args} />
    </div>
  ),
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /aurora over alaska/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /like article/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /share article/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /read more/i })).toHaveAttribute(
      'href',
      primaryArticle.url,
    );
  },
};

export const AlreadyLiked: Story = {
  parameters: {
    runtime: {
      localStorage: {
        likedArticles: serializeLikedArticles([primaryArticle]),
      },
    },
  },
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await expect(likeButton).toHaveClass('bg-red-500');
    await expect(canvas.getByRole('heading', { name: /aurora over alaska/i })).toBeVisible();
  },
};

export const DoubleClickLikesArticle: Story = {
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await expect(likeButton).not.toHaveClass('bg-red-500');
    await userEvent.dblClick(canvas.getByRole('img', { name: /aurora over alaska/i }));

    await waitFor(async () => {
      await expect(likeButton).toHaveClass('bg-red-500');
    });
  },
};
