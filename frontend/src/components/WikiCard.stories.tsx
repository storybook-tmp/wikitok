import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { wikiCardStories } from '../../.storybook/story-fixtures';
import { WikiCard } from './WikiCard';

const meta = {
  component: WikiCard,
} satisfies Meta<typeof WikiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderCard(article: (typeof wikiCardStories)[keyof typeof wikiCardStories]) {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory hide-scroll">
      <WikiCard article={article} />
    </div>
  );
}

export const Default: Story = {
  render: () => renderCard(wikiCardStories.default),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /clockwork tides/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('img', { name: /clockwork tides/i }),
    ).toBeVisible();
    await expect(
      canvas.getByRole('link', { name: /read more/i }),
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Clockwork_Tides');
  },
};

export const AlreadyLiked: Story = {
  render: () => renderCard(wikiCardStories.liked),
  play: async ({ canvas }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await expect(likeButton).toHaveClass('bg-red-500');
    await expect(
      canvas.getByRole('heading', { name: /aurora forest/i }),
    ).toBeVisible();
  },
};

export const LikeToggle: Story = {
  render: () => renderCard(wikiCardStories.interactive),
  play: async ({ canvas, userEvent }) => {
    const likeButton = canvas.getByRole('button', { name: /like article/i });

    await expect(likeButton).not.toHaveClass('bg-red-500');

    await userEvent.click(likeButton);

    await waitFor(() => {
      expect(likeButton).toHaveClass('bg-red-500');
    });
  },
};
